import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectFilter, setFilters, setCategoryId } from '../redux/slices/filter/slice';
import { fetchProducts } from '../redux/slices/product/slice';

import qs from 'qs';

import Card from '../components/Card';
import Skeleton from '../components/Card/Skeleton';
import Categories from '../components/Categories';
import SortPopup, { sortList } from '../components/SortPopup';
import Popap from '../components/Popap/Popap';
import { RootState, useAppDispatch } from '../redux/store';
import ErrorStatus from '../components/ErrorStatus';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isMounted = React.useRef(false);

  const { items, status } = useSelector((state: RootState) => state.product);
  const { searchValue, categoryId, sort, sortOrder } = useSelector(selectFilter);
  const { isOpened } = useSelector((state: RootState) => state.popap);

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
    const filteredProduct = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    return status === 'error' ? (
      <ErrorStatus />
    ) : status === 'loading' ? (
      [...new Array(10)].map((_, i) => <Skeleton key={i} />)
    ) : (
      filteredProduct.map((item) => <Card key={item.id} {...item} />)
    );
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} changeCategoryId={changeCategoryId} />
        <SortPopup sort={sort} sortOrder={sortOrder} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{renderCards()}</div>
      {isOpened && <Popap />}
    </div>
  );
};

export default Home;
