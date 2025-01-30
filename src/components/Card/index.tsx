import React from 'react';
import { useDispatch } from 'react-redux';

import { getProduct, setIsOpened } from '../../redux/slices/popup.slice';

type CardProps = {
	id: number;
	title: string;
	desc: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
};

const Card: React.FC<CardProps> = ({
	id,
	title,
	desc,
	price,
	imageUrl,
	sizes,
	types,
}) => {
	const dispatch = useDispatch();

	const setPopap = () => {
		const item = {
			id,
			title,
			desc,
			price,
			imageUrl,
			sizes,
			types,
		};

		dispatch(getProduct(item));
		dispatch(setIsOpened(true));
	};

	return (
		<div onClick={() => setPopap()} className='pizza-block'>
			<div className='pizza-block__top'>
				<img className='pizza-block__image' src={imageUrl} alt='Pizza' />
				<h4 className='pizza-block__title'>{title}</h4>
				<p className='pizza-block__desc'>{desc}</p>
			</div>
			<div className='pizza-block__bottom'>
				<div className='pizza-block__price'>от {price} ₽</div>
				<button className='button button--add button--select'>
					<span>Выбрать</span>
				</button>
			</div>
		</div>
	);
};

export default Card;
