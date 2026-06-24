import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Coffee, Clock, MapPin, Star, Award, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const features = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Biji Pilihan",
      desc: "Hanya menggunakan 100% biji Arabika dari petani lokal terbaik."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Freshly Roasted",
      desc: "Dipanggang setiap hari untuk menjaga kesegaran dan aroma."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Dibuat dengan Hati",
      desc: "Barista kami memastikan setiap cangkir adalah sebuah karya seni."
    }
  ];

  return (
    <div className="overflow-hidden bg-[#FDFBF7]">

      <section className="relative min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[#D4AF37] font-bold tracking-[0.3em] text-xs uppercase mb-4 block"
            >
              Established 2026 
            </motion.span>
            <h1 className="text-6xl md:text-8xl font-serif text-[#3E2723] leading-[1.1] mb-6">
              Nikmati Kopi <br /> 
              <span className="text-[#D4AF37] italic">Artisan</span> Terbaik
            </h1>
            <p className="text-gray-600 text-lg mb-10 max-w-md leading-relaxed">
              Dari pegunungan Nusantara hingga ke meja Anda. Kami mengkurasi setiap biji untuk pengalaman rasa yang tak terlupakan.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link to="/menu" className="bg-[#3E2723] text-white px-10 py-5 rounded-full flex items-center gap-3 hover:bg-[#5D4037] transition-all shadow-xl shadow-coffee-dark/20 group">
                Cek Menu <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/about" className="px-10 py-5 rounded-full border border-[#3E2723] text-[#3E2723] font-bold hover:bg-[#3E2723] hover:text-white transition-all">
                Cerita Kami
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" 
                alt="Premium Coffee" 
                className="w-full h-[600px] object-cover"
              />
            </div>
            
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl z-20 hidden lg:block border border-beige"
            >
              <div className="flex items-center gap-5">
                <div className="bg-[#F2E8D5] p-4 rounded-2xl text-[#3E2723]">
                  <Coffee size={32} />
                </div>
                <div>
                  <p className="text-sm font-black text-[#3E2723] uppercase tracking-tighter">100% Arabica</p>
                  <p className="text-xs text-gray-400 font-medium">Biji Lokal Puntang</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              className="absolute top-20 -right-10 bg-white p-6 rounded-3xl shadow-2xl z-20 hidden lg:block border border-beige"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                    </div>
                  ))}
                </div>
                <div className="ml-2">
                  <div className="flex text-gold">
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                  </div>
                  <p className="text-[10px] font-bold text-gray-500">2k+ Happy Customers</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-10 rounded-[2.5rem] bg-white border border-beige hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-beige/30 rounded-2xl flex items-center justify-center text-[#3E2723] mb-8 group-hover:bg-[#3E2723] group-hover:text-white transition-colors">
                {f.icon}
              </div>
              <h3 className="text-2xl font-serif text-[#3E2723] mb-4">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 container mx-auto px-6">
        <div className="bg-[#3E2723] rounded-[4rem] p-16 md:p-24 relative overflow-hidden text-center">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-serif text-beige mb-8">
              Siap Menemukan Rasa <br /> Baru Hari Ini?
            </h2>
            <Link 
              to="/store" 
              className="inline-block bg-gold text-coffee-dark px-12 py-5 rounded-full font-black tracking-widest uppercase hover:bg-white transition-all shadow-2xl"
            >
              Temukan Outlet Kami
            </Link>
          </div>

          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
             <div className="absolute top-10 left-10"><Coffee size={100} /></div>
             <div className="absolute bottom-10 right-10 rotate-12"><Coffee size={150} /></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;