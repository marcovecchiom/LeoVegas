import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import '../../app.scss';

/**
 * This is the Layout component. It is the main component of our application.
 * It is responsible for rendering the Header component and the Outlet component.
 * The Header component is the top navigation bar of our application.
 * The Outlet component is the main content of our application.
 * It is rendered depending on the current route.
 *
 * @returns {JSX.Element} - The Layout component.
 */
const Layout = () => {
  return (
    <main className="App">
      <Header />
      <Outlet />
    </main>
  );
};

export default Layout;
