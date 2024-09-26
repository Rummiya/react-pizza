import React from 'react';
import { useDispatch } from 'react-redux';
import { setSort, setSortOrder } from '../redux/slices/filter/slice';
import { SortOrder, SortPropertyEnum, SortState } from '../redux/slices/filter/types';

export const sortList: SortState[] = [
  { name: 'популярности', sortProperty: SortPropertyEnum.RATING },
  { name: 'цене', sortProperty: SortPropertyEnum.PRICE },
  { name: 'алфавиту', sortProperty: SortPropertyEnum.TITLE },
];

type SortPopupProps = {
  sort: SortState;
  sortOrder: SortOrder;
};

const SortPopup: React.FC<SortPopupProps> = React.memo(({ sort, sortOrder }) => {
  const sortRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const onSelected = (obj: SortState) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const handleSortClick = (e: MouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleSortClick);

    return () => document.body.removeEventListener('click', handleSortClick);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div onClick={() => setOpen(!open)} className="sort__label">
        <svg
          className={open ? 'sort-opened' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj: SortState) => (
              <li key={obj.name}>
                <span
                  className={sort.name === obj.name ? 'active' : ''}
                  onClick={() => onSelected(obj)}>
                  {obj.name}
                </span>
                <div className="sort-tabs">
                  <button
                    className={sortOrder === 'asc' ? 'sort-btn active' : 'sort-btn'}
                    onClick={() => dispatch(setSortOrder('asc'))}>
                    ▲
                  </button>
                  <button
                    className={sortOrder === 'desc' ? 'sort-btn active' : 'sort-btn'}
                    onClick={() => dispatch(setSortOrder('desc'))}>
                    ▼
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;
