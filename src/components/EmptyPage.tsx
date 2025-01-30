import { Link } from 'react-router-dom';

type Props = {
	title: string;
	description?: string;
	haveBtn?: boolean;
};

const EmptyPage: React.FC<Props> = ({
	title,
	description = '',
	haveBtn = false,
}) => (
	<div className='container container--cart'>
		<div className='cart cart--empty'>
			<h2>{title}😕</h2>
			<p>{description}</p>
			<img src='/img/empty-cart.png' alt='Empty cart' />

			{haveBtn && (
				<Link to='/' className='button button--black'>
					<span>Вернуться назад</span>
				</Link>
			)}
		</div>
	</div>
);

export default EmptyPage;
