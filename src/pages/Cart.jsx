import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('kopikirkan_cart')) || [];
    setCartItems(savedCart);
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('kopikirkan_cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdate'));
  };

  const handleQuantityChange = (id, amount) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + amount;
        return { ...item, quantity: newQty < 1 ? 1 : newQty };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    updateCart(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      // Mengantisipasi jika format harga berupa string '35k' atau langsung angka
      const priceStr = String(item.price);
      const numericPrice = priceStr.includes('k') 
        ? parseInt(priceStr.replace('k', '')) * 1000 
        : parseInt(priceStr);
      return acc + (numericPrice * item.quantity);
    }, 0);
  };

  return (
    // block & text-left ditambahkan untuk mengisolasi efek flex/center liar dari parent component
    <div className="block text-left w-full min-h-screen pt-32 pb-20 bg-[#FDFBF7] text-coffee-dark">
      <div className="w-[90%] max-w-[1280px] mx-auto">
        
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-10 text-[#3E2723]">
          Keranjang Belanja
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm w-full">
            <div className="w-16 h-16 bg-[#FDFBF7] rounded-full flex items-center justify-center text-gray-300 mx-auto mb-4">
              <ShoppingCart size={28} />
            </div>
            <h3 className="text-xl font-medium mb-1">Keranjangmu Masih Kosong</h3>
            <p className="text-gray-400 text-sm mb-6">Kamu belum memilih menu kopi artisan terbaik kami.</p>
            <Link to="/menu" className="inline-block bg-[#3E2723] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-gold hover:text-coffee-dark transition-all">
              Lihat Menu Kopi
            </Link>
          </div>
        ) : (
          /* Menggunakan CSS Grid 12 Kolom untuk akurasi tata letak yang stabil */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
            
            {/* === SEKSI KIRI: LIST ITEM BELANJAAN (Mengambil 8 dari 12 kolom) === */}
            <div className="lg:col-span-8 space-y-4 w-full">
              {cartItems.map((item) => {
                const priceStr = String(item.price);
                const itemPriceRaw = priceStr.includes('k') 
                  ? parseInt(priceStr.replace('k', '')) * 1000 
                  : parseInt(priceStr);
                  
                return (
                  <div 
                    key={item.id} 
                    className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full"
                  >
                    {/* Blok Gambar & Deskripsi Teks */}
                    <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto flex-grow">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 md:w-24 md:w-24 rounded-xl object-cover flex-shrink-0 shadow-sm" 
                      />
                      <div className="min-w-0 flex-grow">
                        <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest block mb-0.5">
                          {item.cat || 'Coffee'}
                        </span>
                        <h4 className="font-serif text-lg md:text-xl font-bold text-[#3E2723] leading-tight mb-1 truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm font-semibold text-gray-500">
                          Rp {itemPriceRaw.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>

                    {/* Blok Kontrol Kuantitas & Aksi Hapus */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 flex-shrink-0">
                      <div className="flex items-center gap-3 bg-[#FDFBF7] border border-gray-200 rounded-full px-3 py-1.5">
                        <button 
                          onClick={() => handleQuantityChange(item.id, -1)} 
                          className="p-1 text-gray-500 hover:text-[#D4AF37] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm md:text-base font-bold w-6 text-center select-none text-[#3E2723]">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, 1)} 
                          className="p-1 text-gray-500 hover:text-[#D4AF37] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button 
                        onClick={() => handleRemoveItem(item.id)} 
                        className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* === SEKSI KANAN: RINGKASAN HARGA (Mengambil 4 dari 12 kolom) === */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:sticky lg:top-32 h-fit w-full">
              <h3 className="font-serif text-lg font-bold text-[#3E2723] mb-4 border-b border-gray-100 pb-3">
                Ringkasan Pesanan
              </h3>
              
              <div className="space-y-4 text-sm pb-4 border-b border-dashed border-gray-200">
                <div className="flex justify-between text-gray-500">
                  <span>Total Kuantitas</span>
                  <span className="font-bold text-[#3E2723]">
                    {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Pcs
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Ongkos Kirim</span>
                  <span className="text-emerald-600 font-medium">Gratis</span>
                </div>
              </div>

              <div className="flex justify-between items-center my-6">
                <span className="text-sm font-bold text-gray-700">Total Bayar</span>
                <span className="text-xl md:text-2xl font-bold text-[#3E2723]">
                  Rp {calculateTotal().toLocaleString('id-ID')}
                </span>
              </div>

              <Link 
                to="/checkout"
                className="w-full bg-[#3E2723] text-white py-3.5 px-4 rounded-full font-bold text-sm hover:bg-[#D4AF37] hover:text-white transition-all flex items-center justify-center gap-2 group shadow-sm tracking-wider"
              >
                <span>LANJUT PESAN</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;