import React from 'react';
import { User, Mail, Calendar, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  
  // Ambil data dari props, jika kosong ambil dari localStorage sebagai cadangan kedua
  const localData = localStorage.getItem('kaeru_user');
  const currentUser = user || (localData ? JSON.parse(localData) : null) || {
    name: "Handra Putra Alma",
    email: "handra@example.com",
    memberSince: "Maret 2026"
  };

  const handleLogout = async () => {
    // 1. Ambil JSON string asli dari localStorage
    const storedUser = localStorage.getItem('kaeru_user');

    try {
      // 2. Kirim langsung string tersebut ke backend tanpa parse ulang
      if (storedUser) {
        await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: storedUser // Mengirim string JSON asli secara bersih ke backend
        });
      }
    } catch (error) {
      console.error("Gagal mengirim log logout ke backend:", error);
    }

    // 3. Bersihkan data dari browser dan kosongkan state global
    localStorage.removeItem('kaeru_user');
    if (setUser) setUser(null); 
    
    // 4. Arahkan kembali ke halaman login
    alert("Anda telah berhasil keluar.");
    navigate('/login');
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#FDFBF7] px-6 flex items-center justify-center text-left">
      <div className="w-full max-w-md">
        
        <h2 className="text-3xl font-serif text-[#3E2723] mb-8 text-center font-bold">
          Akun Saya
        </h2>

        {/* Kartu Profil Tunggal */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col items-center">
          
          {/* Avatar Lingkaran */}
          <div className="w-24 h-24 bg-[#FDFBF7] rounded-full border border-gray-200 flex items-center justify-center text-[#3E2723] mb-4">
            <User size={40} />
          </div>

          {/* Nama Pengguna */}
          <h3 className="font-serif text-2xl font-bold text-[#3E2723] mb-6">
            {currentUser?.name}
          </h3>

          {/* Detail Informasi Akun */}
          <div className="w-full space-y-4 border-t border-gray-100 pt-6 text-sm">
            <div className="flex items-center gap-4 text-gray-600 bg-[#FDFBF7] p-3 rounded-xl border border-gray-50">
              <Mail size={16} className="text-[#D4AF37] flex-shrink-0" />
              <span className="truncate font-medium">{currentUser?.email}</span>
            </div>
            
            <div className="flex items-center gap-4 text-gray-600 bg-[#FDFBF7] p-3 rounded-xl border border-gray-50">
              <Calendar size={16} className="text-[#D4AF37] flex-shrink-0" />
              <span className="font-medium">Bergabung sejak: {currentUser?.memberSince || "Maret 2026"}</span>
            </div>
          </div>

          {/* Tombol Keluar Akun */}
          <button 
            onClick={handleLogout}
            className="w-full bg-red-50 text-red-600 border border-red-100 mt-8 py-3.5 rounded-full font-bold text-sm tracking-wider hover:bg-red-100 hover:text-red-700 transition-all flex items-center justify-center gap-2 shadow-none"
          >
            <LogOut size={16} /> KELUAR AKUN
          </button>

        </div>

      </div>
    </div>
  );
};

export default Profile;