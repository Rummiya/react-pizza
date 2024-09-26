import React from 'react';

type CategoryProps = {
  categoryId: number;
  changeCategoryId: (i: number) => void;
};

const Categories: React.FC<CategoryProps> = React.memo(({ categoryId, changeCategoryId }) => {
  const categoryList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categoryList.map((value, i) => (
          <li
            key={value}
            onClick={() => changeCategoryId(i)}
            className={categoryId === i ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
