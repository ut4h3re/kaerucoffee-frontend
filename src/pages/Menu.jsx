import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, IceCream, Cookie, Plus } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All', icon: null },
  { id: 'Coffee', name: 'Coffee', icon: <Coffee size={16} /> },
  { id: 'Non-Coffee', name: 'Non-Coffee', icon: <IceCream size={16} /> },
  { id: 'Pastry', name: 'Pastry', icon: <Cookie size={16} /> },
];

const menuItems = [
  { 
    id: 1, 
    name: "Caramel Macchiato", 
    price: "35k", 
    cat: "Coffee", 
    desc: "Espresso dengan susu creamy dan saus karamel premium.",
    image: "https://images.unsplash.com/photo-1485808191679-5f6333f3f01f" 
  },
  { 
    id: 2, 
    name: "Aren Latte", 
    price: "28k", 
    cat: "Coffee", 
    desc: "Kopi susu kekinian dengan gula aren asli pilihan.",
    image: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f" 
  },
  { 
    id: 3, 
    name: "Matcha Latte", 
    price: "32k", 
    cat: "Non-Coffee", 
    desc: "Bubuk matcha Jepang murni dengan tekstur susu yang lembut.",
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7" 
  },
  { 
    id: 4, 
    name: "Croissant Almond", 
    price: "25k", 
    cat: "Pastry", 
    desc: "Pastry renyah dengan isian dan topping kacang almond.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a" 
  },
  { 
    id: 5, 
    name: "Cold Brew Lemon", 
    price: "30k", 
    cat: "Coffee", 
    desc: "Kopi seduh dingin 12 jam dengan sensasi kesegaran lemon.",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c" 
  },
  { 
    id: 6, 
    name: "Pain au Chocolat", 
    price: "24k", 
    cat: "Pastry", 
    desc: "Roti klasik Prancis dengan cokelat batang lumer di dalamnya.",
    image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd" 
  },
];

const Menu = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredItems = activeTab === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.cat === activeTab);

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

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${
                activeTab === cat.id 
                ? 'bg-[#3E2723] text-white border-[#3E2723] shadow-lg' 
                : 'bg-white text-[#3E2723] border-[#F2E8D5] hover:border-[#D4AF37]'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

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
                    <button className="bg-[#3E2723] text-white p-2 rounded-full hover:bg-[#D4AF37] transition-colors">
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