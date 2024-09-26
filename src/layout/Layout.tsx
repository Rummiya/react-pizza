import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import React from 'react';

const Layout: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
