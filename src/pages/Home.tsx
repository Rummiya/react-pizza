import React from 'react';
import { useSelector } from 'react-redux';

import { selectFilter, setCategoryId } from '../redux/slices/filter.slice';
import { fetchProducts } from '../redux/slices/product.slice';

import Card from '../components/Card';
import Skeleton from '../components/Card/Skeleton';
import Categories from '../components/Categories';
import ErrorStatus from '../components/ErrorStatus';
import Popup from '../components/Popup';
import SortPopup from '../components/SortPopup';

import EmptyPage from '../components/EmptyPage';
import { RootState, useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
	const dispatch = useAppDispatch();
	const { items, status } = useSelector((state: RootState) => state.product);
	const { searchValue, categoryId, sort, sortOrder } =
		useSelector(selectFilter);
	const { isOpened } = useSelector((state: RootState) => state.popup);

	// React.useEffect(() => {
	//   if (isMounted.current) {
	//     const queryString = qs.stringify({
	//       categoryId: categoryId,
	//       sortProperty: sort.sortProperty,
	//       sortOrder: sortOrder,
	//     });

	//     navigate(`?${queryString}`);
	//   }
	//   isMounted.current = true;
	// }, [sort, categoryId, sortOrder]);

	// React.useEffect(() => {
	//   if (window.location.search) {
	//     const params = qs.parse(window.location.search.substring(1)) as SearchProductsParams;
	//     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy.sortProperty);

	//     if (sort) {
	//       params.sortBy = sort;
	//     }

	//     dispatch(setFilters(params));
	//   }
	// }, []);

	React.useEffect(() => {
		const getData = async () => {
			const category = categoryId > 0 ? `category=${categoryId}` : '';
			const sortBy = sort;

			dispatch(fetchProducts({ category, sortBy, sortOrder }));
		};
		getData();
	}, [categoryId, sort.sortProperty, sortOrder]);

	const changeCategoryId = React.useCallback((i: number) => {
		dispatch(setCategoryId(i));
	}, []);

	const renderCards = () => {
		const filteredProduct = items.filter(item =>
			item.title.toLowerCase().includes(searchValue.toLowerCase())
		);

		return status === 'error' ? (
			<ErrorStatus />
		) : status === 'loading' ? (
			<div className='content__items'>
				{[...new Array(10)].map((_, i) => (
					<Skeleton key={i} />
				))}
			</div>
		) : !filteredProduct.length ? (
			<EmptyPage
				title={`По запросу "${searchValue}" ничего не найдено `}
				description='Попробуйте поменять поисковой запрос.'
			/>
		) : (
			// <div className='container container--cart'>
			// 	<div className='cart cart--empty'>
			// 		<h2>😕</h2>
			// 		<p>Попробуйте поменять поисковой запрос.</p>
			// 		<img src='/img/empty-cart.png' alt='Empty cart' />
			// 	</div>
			// </div>
			<div className='content__items'>
				{filteredProduct.map(item => (
					<Card key={item.id} {...item} />
				))}
			</div>
		);
	};

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					categoryId={categoryId}
					changeCategoryId={changeCategoryId}
				/>
				<SortPopup sort={sort} sortOrder={sortOrder} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{renderCards()}
			{isOpened && <Popup />}
		</div>
	);
};

export default Home;
