import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItem } from '../../redux/slices/cart/slice';
import { CartItemState } from '../../redux/slices/cart/types';
import { setIsOpened } from '../../redux/slices/popup/slice';
import styles from './Popap.module.scss';
import { RootState } from '../../redux/store';

const typeNames = ['традиционное', 'тонкое'];
const sizeNames = ['маленькая', 'средняя', 'большая'];

const Popap: React.FC = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state: RootState) => state.popap);

  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const cartItem = useSelector(selectCartItem(product.id));

  const addedItem = cartItem ? cartItem.count : 0;

  const addToCart = () => {
    const { id, title, price, imageUrl, sizes } = product;
    const item: CartItemState = {
      id,
      title,
      price,
      imageUrl,
      size: sizes[activeSize],
      type: typeNames[activeType],
      count: 0,
    };
    dispatch(addItem(item));
  };

  if (!product) {
    return '';
  }

  return (
    <>
      <div onClick={() => dispatch(setIsOpened(false))} className={styles.overlay}></div>
      <div className={styles.container}>
        <img width={500} src={product.imageUrl} alt="pizza" />
        <img
          onClick={() => dispatch(setIsOpened(false))}
          className={styles.closeIcon}
          width={20}
          src="/img/icons/delete.svg"
          alt="close"
        />
        <div className={styles.info}>
          <div className={styles.top}>
            <div className={styles.desc}>
              <h4>{product.title}</h4>
              <p>
                Размер {product.sizes[activeSize]} см, {typeNames[activeType]} тесто
              </p>
              <p>{product.desc}</p>
            </div>
            <div className="pizza-block__selector">
              <ul>
                {sizeNames.map((size, i) => (
                  <li
                    onClick={() => setActiveSize(i)}
                    className={activeSize === i ? 'active' : ''}
                    key={size}>
                    {size}
                  </li>
                ))}
              </ul>
              <ul>
                {typeNames.map((type, i) => (
                  <li
                    onClick={() => setActiveType(i)}
                    className={activeType === i ? 'active' : ''}
                    key={type}>
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.footer}>
            <span>Цена {product.price} руб.</span>
            <button onClick={() => addToCart()} className="button button--add">
              <span>Добавить в корзину</span>
              {addedItem > 0 && <i>{cartItem?.count}</i>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popap;
