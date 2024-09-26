import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './layout/Layout';
import Home from './pages/Home';
import CartEmpty from './components/CartEmpty';

import './scss/app.scss';

const Cart = React.lazy(() => import(/*webpackChunkName: 'Cart' */ './pages/Cart'));
const NotFound = React.lazy(() => import(/*webpackChunkName: 'NotFound' */ './pages/NotFound'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route
            path="cart"
            element={
              <Suspense fallback={<CartEmpty />}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<CartEmpty />}>
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
