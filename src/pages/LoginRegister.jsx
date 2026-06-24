import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ArrowLeft, Coffee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginRegister = ({ setUser }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setError('');
    setFormData({ name: '', email: '', password: '' }); // Reset form saat ganti mode
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setIsLoading(true);
    
    if (mode === 'login') {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Gagal masuk akun.');
        }

        // Simpan data ke session & local storage
        localStorage.setItem('kaeru_user', JSON.stringify(data));
        if (setUser) setUser(data); 
        
        alert(`Selamat datang kembali, ${data.name}!`);
        navigate('/'); // Langsung arahkan ke Dashboard utama
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
      
    } else if (mode === 'register') {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Gagal mendaftarkan akun.');
        }

        alert("Akun berhasil dibuat! Silakan masuk menggunakan akun baru Anda.");
        setFormData({ name: '', email: '', password: '' });
        setMode('login'); 
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
      
    } else if (mode === 'forgot') {
      // Simulasi forgot password frontend
      alert("Link reset password telah dikirim ke email Anda.");
      handleModeChange('login');
      setIsLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: mode === 'register' ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { opacity: 0, x: mode === 'register' ? -50 : 50, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-[#FDFBF7] px-6 text-left">
      <div className="w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl overflow-hidden grid lg:grid-cols-12 min-h-[650px] border border-gray-100">
        
        {/* Panel Info Samping (Hanya Desktop) */}
        <div className="lg:col-span-5 relative bg-[#3E2723] p-12 flex flex-col justify-between overflow-hidden hidden lg:flex">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 to-transparent opacity-60 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-[#D4AF37] font-serif text-2xl font-bold">
              <Coffee size={28} />
              <span>Kaeru Coffee</span>
            </div>
          </div>
          <div className="relative z-10 text-white">
            <p className="text-[#D4AF37] font-bold uppercase tracking-[0.3em] text-xs mb-3">Artisan Experience</p>
            <h2 className="text-4xl font-serif leading-tight mb-4">Menyeduh Kehangatan di Setiap Ruang</h2>
            <p className="text-white/60 font-light text-sm leading-relaxed">
              Masuk ke akun Anda untuk menikmati promo eksklusif, melacak pesanan, dan membaca jurnal kopi terbaru kami.
            </p>
          </div>
          <div className="relative z-10 text-white/40 font-mono text-[11px]">
            © 2026 Kaeru Coffee Co.
          </div>
        </div>

        {/* Panel Form Input */}
        <div className="lg:col-span-7 p-8 sm:p-16 flex flex-col justify-center relative bg-white">
          <AnimatePresence mode="wait">
            
            {mode === 'login' && (
              <motion.div key="login" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                <div>
                  <span className="text-[#D4AF37] font-bold tracking-[0.3em] text-xs uppercase mb-2 block">Welcome Back</span>
                  <h3 className="text-4xl font-serif text-[#3E2723]">Silakan Masuk</h3>
                </div>

                {error && <div className="bg-red-50 text-red-600 text-xs px-4 py-3 rounded-xl border border-red-100 font-medium">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nama@email.com" 
                        className="w-full pl-12 pr-4 rounded-full bg-gray-50 border border-transparent py-3.5 text-sm focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-all" 
                        required 
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center px-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Password</label>
                      <button type="button" onClick={() => handleModeChange('forgot')} className="text-[11px] font-bold text-[#D4AF37] hover:underline" disabled={isLoading}>Lupa Password?</button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••" 
                        className="w-full pl-12 pr-4 rounded-full bg-gray-50 border border-transparent py-3.5 text-sm focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-all" 
                        required 
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-[#3E2723] text-white py-4 rounded-full text-sm font-bold tracking-[0.2em] hover:bg-[#D4AF37] hover:text-[#3E2723] transition-all shadow-lg flex justify-center items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'MEMPROSES...' : 'MASUK'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                <p className="text-center text-sm text-gray-400 font-light">
                  Belum punya akun?{' '}
                  <button onClick={() => handleModeChange('register')} className="text-[#3E2723] font-bold hover:underline" disabled={isLoading}>Daftar Sekarang</button>
                </p>
              </motion.div>
            )}

            {mode === 'register' && (
              <motion.div key="register" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                <div>
                  <span className="text-[#D4AF37] font-bold tracking-[0.3em] text-xs uppercase mb-2 block">Join the Club</span>
                  <h3 className="text-4xl font-serif text-[#3E2723]">Buat Akun Baru</h3>
                </div>

                {error && <div className="bg-red-50 text-red-600 text-xs px-4 py-3 rounded-xl border border-red-100 font-medium">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nama Lengkap Anda" 
                        className="w-full pl-12 pr-4 rounded-full bg-gray-50 border border-transparent py-3.5 text-sm focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-all" 
                        required 
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nama@email.com" 
                        className="w-full pl-12 pr-4 rounded-full bg-gray-50 border border-transparent py-3.5 text-sm focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-all" 
                        required 
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Minimal 8 karakter" 
                        className="w-full pl-12 pr-4 rounded-full bg-gray-50 border border-transparent py-3.5 text-sm focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-all" 
                        required 
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-[#3E2723] text-white py-4 rounded-full text-sm font-bold tracking-[0.2em] hover:bg-[#D4AF37] hover:text-[#3E2723] transition-all shadow-lg mt-4 disabled:opacity-50"
                  >
                    {isLoading ? 'MENDAFTARKAN...' : 'BUAT AKUN'}
                  </button>
                </form>

                <p className="text-center text-sm text-gray-400 font-light">
                  Sudah memiliki akun?{' '}
                  <button onClick={() => handleModeChange('login')} className="text-[#3E2723] font-bold hover:underline" disabled={isLoading}>Masuk di sini</button>
                </p>
              </motion.div>
            )}

            {mode === 'forgot' && (
              <motion.div key="forgot" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                <div>
                  <button onClick={() => handleModeChange('login')} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#D4AF37] transition-colors mb-4" disabled={isLoading}>
                    <ArrowLeft size={14} /> Kembali ke Login
                  </button>
                  <span className="text-[#D4AF37] font-bold tracking-[0.3em] text-xs uppercase mb-2 block">Reset Password</span>
                  <h3 className="text-4xl font-serif text-[#3E2723]">Lupa Kata Sandi?</h3>
                  <p className="text-gray-400 text-sm font-light mt-3 leading-relaxed">
                    Masukkan email Anda yang terdaftar. Kami akan mengirimkan tautan aman untuk mengatur ulang password Anda.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nama@email.com" 
                        className="w-full pl-12 pr-4 rounded-full bg-gray-50 border border-transparent py-3.5 text-sm focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-all" 
                        required 
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-[#3E2723] text-white py-4 rounded-full text-sm font-bold tracking-[0.2em] hover:bg-[#D4AF37] hover:text-[#3E2723] transition-all shadow-lg disabled:opacity-50"
                  >
                    {isLoading ? 'MENGIRIM...' : 'KIRIM LINK RESET'}
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default LoginRegister;