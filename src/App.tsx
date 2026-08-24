import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#171A1F] selection:bg-[#17324D] selection:text-white">
        <Navbar />
        <div className="flex-1">
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
