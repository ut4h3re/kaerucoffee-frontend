import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu as MenuIcon, X, User, Coffee, LayoutDashboard, LogOut } from 'lucide-react';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const updateBadgeCount = () => {
    const cart = JSON.parse(localStorage.getItem('kopikirkan_cart')) || [];
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalItems);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    updateBadgeCount();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('cartUpdate', updateBadgeCount);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('cartUpdate', updateBadgeCount);
    };
  }, []);

  const handleLogout = async () => {
    // Tutup dropdown dan mobile menu terlebih dahulu
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);

    // 1. Ambil data string JSON user asli dari localStorage secara bersih
    const storedUser = localStorage.getItem('kaeru_user');

    try {
      // 2. Kirim langsung data tersebut ke backend
      if (storedUser) {
        await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: storedUser 
        });
      }
    } catch (error) {
      console.error("Gagal mengirim log logout ke backend:", error);
    }

    // 3. Bersihkan sisa sesi di sisi client browser
    localStorage.removeItem('kaeru_user');
    if (setUser) setUser(null); 
    
    // 4. Alihkan halaman secara bersih menuju login
    alert("Anda telah berhasil keluar.");
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'News', path: '/news' },
    { name: 'Store', path: '/store' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center relative">

        <Link to="/" className="text-2xl font-serif font-bold text-coffee-dark tracking-tighter">
          KAERU<span className="text-gold">COFFEE</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-medium hover:text-gold transition-colors text-coffee-dark"
            >
              {link.name}
            </Link>
          ))}
          
          <Link to="/cart" className="relative bg-coffee-dark text-white p-2.5 rounded-full hover:bg-gold hover:text-coffee-dark transition-all flex items-center justify-center shadow-md">
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-coffee-dark font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow shadow-none">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Profile Dropdown Menu */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`border-2 p-2 rounded-full transition-all flex items-center justify-center shadow-sm ${
                user?.role === 'admin' 
                  ? 'border-gold text-gold bg-coffee-dark' 
                  : 'border-coffee-dark text-coffee-dark hover:bg-coffee-dark hover:text-white'
              }`}
            >
              <User size={18} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-4 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-3 z-50 text-left">
                <div className="px-4 py-2 border-b border-gray-100 mb-2">
                  <p className="text-[11px] text-gray-400 font-medium">Selamat Datang,</p>
                  <p className="text-sm font-bold text-coffee-dark truncate">
                    {user?.name || "Pelanggan Kaeru"}
                  </p>
                </div>
                
                {user ? (
                  <>
                    {user.role === 'admin' ? (
                      <Link 
                        to="/admin/dashboard" 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-amber-600 bg-amber-50 rounded-xl mx-2 transition-all font-bold"
                      >
                        <LayoutDashboard size={16} />
                        <span>Panel Admin</span>
                      </Link>
                    ) : (
                      <Link 
                        to="/profile" 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gold rounded-xl mx-2 transition-all"
                      >
                        <User size={16} className="text-gold" />
                        <span>Profil Saya</span>
                      </Link>
                    )}

                    <button 
                      onClick={handleLogout}
                      className="w-[calc(100%-16px)] flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl mx-2 text-left transition-all mt-1"
                    >
                      <LogOut size={16} />
                      <span>Keluar Akun</span>
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/login" 
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gold rounded-xl mx-2 transition-all"
                  >
                    <Coffee size={16} className="text-gold" />
                    <span>Masuk / Daftar Akun</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative p-2 text-coffee-dark">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-gold text-coffee-dark font-black text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-none">
                {cartCount}
              </span>
            )}
          </Link>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-coffee-dark">
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar/Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg py-6 px-6 flex flex-col gap-4 border-t border-gray-50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium border-b border-gray-50 pb-2 text-coffee-dark hover:text-gold transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex flex-col gap-2 pt-2">
            {user ? (
              <>
                <Link 
                  to={user.role === 'admin' ? "/admin/dashboard" : "/profile"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-full bg-amber-50 border border-amber-200 text-[#3E2723] text-sm font-bold"
                >
                  {user.role === 'admin' ? "⚙️ Dashboard Admin" : "Profil Saya"}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-center py-3 rounded-full bg-red-50 text-red-600 text-sm font-bold"
                >
                  Keluar Akun
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-full bg-coffee-dark text-white text-sm font-bold"
              >
                Masuk / Daftar
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;