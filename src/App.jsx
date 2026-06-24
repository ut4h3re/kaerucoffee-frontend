import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Profile from '@/pages/Profile';
import LoginRegister from '@/pages/LoginRegister';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Dashboard from '@/pages/Dashboard';
import Menu from '@/pages/Menu';
import About from '@/pages/About'; 
import News from '@/pages/News';
import Store from '@/pages/Store';
import Contact from '@/pages/Contact';
import Cart from '@/pages/Cart'; 
import Checkout from '@/pages/Checkout';

function MainLayout({ user, setUser }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login';

  return (
    <div className="bg-beige min-h-screen font-sans text-coffee-dark flex flex-col">
      {!isAuthPage && <Navbar user={user} setUser={setUser} />}
      
      <main className="flex-grow">
        <Routes>
          {/* Alihkan ke dashboard utama (/) jika user sudah login tapi coba buka halaman /login */}
          <Route path="/login" element={user ? <Navigate to="/" /> : <LoginRegister setUser={setUser} />} />
          
          {/* Proteksi halaman profil: tendang ke /login jika belum berstatus login */}
          <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" />} />
          
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/store" element={<Store />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} /> 
          <Route path="/checkout" element={user ? <Checkout user={user} /> : <Navigate to="/login" />} />
        </Routes>
      </main>
      
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('kaeru_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <Router>
      <MainLayout user={user} setUser={setUser} />
    </Router>
  );
}

export default App;