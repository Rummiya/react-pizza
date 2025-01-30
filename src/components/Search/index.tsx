import debounce from 'lodash.debounce';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filter.slice';
import styles from './Search.module.scss';

const Search: React.FC = () => {
	const dispatch = useDispatch();
	const [value, setValue] = React.useState('');
	const inputRef = React.useRef<HTMLInputElement>(null);

	const testDebounce = React.useCallback(
		debounce((str: string) => {
			dispatch(setSearchValue(str));
		}, 350),
		[]
	);

	const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		testDebounce(e.target.value);
	};

	const onClear = () => {
		dispatch(setSearchValue(''));
		setValue('');
		inputRef.current?.focus();
	};

	return (
		<div className={styles.search}>
			<img className={styles.icon} src='/img/icons/search.svg' alt='search' />
			<input
				{...inputRef}
				value={value}
				onChange={e => changeInput(e)}
				className={styles.input}
				type='text'
				placeholder='Поиск пиццы...'
			/>
			{value && (
				<div onClick={() => onClear()} className={styles.deleteBlock}>
					<img
						className={styles.iconDel}
						src='/img/icons/delete.svg'
						alt='delete'
					/>
				</div>
			)}
		</div>
	);
};

export default Search;
