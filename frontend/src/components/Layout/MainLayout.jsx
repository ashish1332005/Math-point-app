import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import BottomNav from '../Dashboard/BottomNav';
const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-[49px] pb-28 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav variant="public" />
    </div>
  );
};

export default MainLayout;
