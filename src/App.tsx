import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import CartEmpty from './components/EmptyPage';
import Layout from './layout/Layout';
import Home from './pages/Home';

import './scss/app.scss';

const Cart = React.lazy(
	() => import(/*webpackChunkName: 'Cart' */ './pages/Cart')
);
const NotFound = React.lazy(
	() => import(/*webpackChunkName: 'NotFound' */ './pages/NotFound')
);

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route path='' element={<Home />} />
					<Route
						path='cart'
						element={
							<Suspense fallback={<CartEmpty title='Корзина пуста' />}>
								<Cart />
							</Suspense>
						}
					/>
					<Route
						path='*'
						element={
							<Suspense fallback={<CartEmpty title='not found' />}>
								<NotFound />
							</Suspense>
						}
					/>
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
