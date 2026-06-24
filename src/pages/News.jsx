import React from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';
import { Input } from "@/components/ui/input";

const articles = [
  {
    id: 1,
    title: "Seni Roasting: Rahasia di Balik Aroma Kopi Kirkan",
    excerpt: "Bagaimana proses roasting menentukan karakter rasa yang unik pada setiap biji kopi kami...",
    date: "12 Mei 2026",
    author: "Admin",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e"
  },
  {
    id: 2,
    title: "5 Tips Menyeduh Kopi Manual Brew di Rumah",
    excerpt: "Panduan lengkap memilih rasio air dan kopi untuk hasil seduhan ala barista profesional...",
    date: "10 Mei 2026",
    author: "Head Barista",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Mengenal Biji Arabika Puntang yang Sedang Tren",
    excerpt: "Mengapa kopi asal Jawa Barat ini menjadi primadona di kedai kami bulan ini? Simak ulasannya...",
    date: "08 Mei 2026",
    author: "Roaster",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=600&auto=format&fit=crop"
  }
];

const News = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-20 container mx-auto px-6 min-h-screen"
    >

      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-xl">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gold font-bold tracking-[0.3em] text-xs uppercase mb-3 block"
          >
            Our Journal
          </motion.span>
          <h2 className="text-5xl font-serif text-coffee-dark mb-4">Coffee Journal</h2>
          <p className="text-gray-500 font-light text-lg">
            Eksplorasi dunia kopi, teknik menyeduh, hingga cerita di balik setiap biji bersama Kaeru Coffee.
          </p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            className="pl-12 pr-4 py-6 rounded-full border-beige bg-white shadow-sm focus:ring-gold" 
            placeholder="Cari artikel..." 
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {articles.map((post, index) => (
          <motion.article 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -12 }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-3xl mb-6 h-72 shadow-xl">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-white/90 backdrop-blur-sm text-coffee-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Lifestyle
                </span>
              </div>
            </div>

            <div className="flex gap-5 text-[11px] text-gold font-bold uppercase tracking-widest mb-4">
              <span className="flex items-center gap-2">
                <Calendar size={14} className="text-coffee-dark/30" /> {post.date}
              </span>
              <span className="flex items-center gap-2">
                <User size={14} className="text-coffee-dark/30" /> By {post.author}
              </span>
            </div>

            <h3 className="text-2xl font-serif mb-4 group-hover:text-gold transition-colors leading-snug">
              {post.title}
            </h3>
            
            <p className="text-gray-500 font-light leading-relaxed mb-6 line-clamp-2">
              {post.excerpt}
            </p>

            <button className="flex items-center gap-2 text-xs font-black tracking-[0.2em] text-coffee-dark group-hover:text-gold transition-all">
              READ MORE <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.article>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-24 p-12 rounded-[3rem] bg-coffee-dark text-beige text-center relative overflow-hidden"
      >
        <div className="relative z-10">
          <h3 className="text-3xl font-serif mb-4 text-gold">Dapatkan Update Mingguan</h3>
          <p className="text-beige/60 mb-8 max-w-md mx-auto">Berlangganan untuk mendapatkan tips menyeduh dan promo eksklusif.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input className="rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/40 px-6" placeholder="Email Anda" />
            <button className="bg-gold text-coffee-dark px-8 py-3 rounded-full font-bold hover:bg-white transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default News;