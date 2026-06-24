import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, IceCream, Cookie, Plus } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All', icon: null },
  { id: 'Coffee', name: 'Coffee', icon: <Coffee size={16} /> },
  { id: 'Non-Coffee', name: 'Non-Coffee', icon: <IceCream size={16} /> },
  { id: 'Pastry', name: 'Pastry', icon: <Cookie size={16} /> },
];

const Menu = () => {
  const [activeTab, setActiveTab] = useState('all');
  // --- STATE BARU: Untuk menampung menu dari database phpMyAdmin ---
  const [menuItems, setMenuItems] = useState([]);

  // --- AMBIL DATA DARI BACKEND SAAT HALAMAN DIBUKA ---
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`) // Sesuaikan port ini dengan port server Node.js Anda (misal 5000 atau 8080)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gagal mengambil data dari server');
        }
        return res.json();
      })
      .then((data) => {
        // Mapping struktur kolom database MySQL agar sesuai dengan kebutuhan variabel di UI React
        const formattedData = data.map((item) => ({
          id: item.id,
          name: item.name,
          // Mengonversi angka murni (misal: 35000) dari DB menjadi format tampilan ringkas (35k) seperti desain asli Anda
          price: item.price >= 1000 ? `${Math.floor(item.price / 1000)}k` : item.price,
          cat: item.category, // mencocokkan kolom 'category' dari MySQL
          desc: item.desc || "Menu racikan terbaik yang dibuat spesial untuk Anda.", // deskripsi fallback jika kolom DB kosong
          image: item.image_url && item.image_url.startsWith('http') 
            ? item.image_url 
            : `/images/${item.image_url || 'default-coffee.jpg'}` // Jalur gambar lokal atau URL eksternal
        }));
        setMenuItems(formattedData);
      })
      .catch((err) => console.error('❌ Terjadi kesalahan koneksi API menu:', err));
  }, []);

  // --- LOGIKA FILTER KATEGORI (Mencocokkan id kategori dengan kolom cat) ---
  const filteredItems = activeTab === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.cat.toLowerCase() === activeTab.toLowerCase());

  // === FUNGSI TAMBAH KE KERANJANG BELANJA ===
  const addToCart = (item) => {
    // 1. Ambil data keranjang lama dari localStorage (jika ada)
    const existingCart = JSON.parse(localStorage.getItem('kopikirkan_cart')) || [];
    
    // 2. Cek apakah produk tersebut sudah dimasukkan sebelumnya
    const itemIndex = existingCart.findIndex(cartItem => cartItem.id === item.id);

    if (itemIndex > -1) {
      // Jika sudah ada, naikkan jumlah kuantitasnya
      existingCart[itemIndex].quantity += 1;
    } else {
      // Jika belum ada, masukkan data baru dengan kuantitas awal 1
      existingCart.push({ ...item, quantity: 1 });
    }

    // 3. Simpan kembali ke localStorage
    localStorage.setItem('kopikirkan_cart', JSON.stringify(existingCart));

    // 4. Kirim sinyal (Custom Event) agar badge angka di Navbar langsung ikut berubah secara real-time
    window.dispatchEvent(new Event('cartUpdate'));
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#FDFBF7]">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#D4AF37] font-bold tracking-[0.3em] text-xs uppercase mb-3 block"
          >
            Handcrafted Flavors
          </motion.span>
          <h1 className="text-5xl md:text-6xl font-serif text-[#3E2723] mb-4">Our Menu</h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
        </div>

        {/* --- BAGIAN TOMBOL KATEGORI --- */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${
                activeTab.toLowerCase() === cat.id.toLowerCase() 
                ? 'bg-[#3E2723] text-white border-[#3E2723] shadow-lg' 
                : 'bg-white text-[#3E2723] border-[#F2E8D5] hover:border-[#D4AF37]'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* --- BAGIAN DISPLAY KARTU MENU --- */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white p-4 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-[#F2E8D5]/50"
              >
                <div className="relative overflow-hidden rounded-[1.5rem] h-52 mb-6">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-[#3E2723]">
                    {item.price}
                  </div>
                </div>

                <div className="px-2 pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">{item.cat}</span>
                      <h3 className="text-xl font-serif text-[#3E2723]">{item.name}</h3>
                    </div>
                    {/* BIND FUNGSI ADD TO CART */}
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-[#3E2723] text-white p-2 rounded-full hover:bg-[#D4AF37] hover:scale-110 transition-all"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* JIKA MENU DI DATABASE KOSONG */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-gray-400 font-light">
            Belum ada menu tersedia untuk kategori ini di database.
          </div>
        )}

        <div className="mt-20 text-center p-10 border-2 border-dashed border-[#F2E8D5] rounded-[3rem]">
          <p className="text-[#3E2723]/60 italic font-serif">
            "Semua menu kami menggunakan bahan organik dan diproses secara artisan setiap hari."
          </p>
        </div>
      </div>
    </div>
  );
};

  export default Menu;