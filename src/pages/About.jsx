import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, Award, ShieldCheck } from 'lucide-react';

const About = () => {
  const stats = [
    { label: "Petani Lokal", value: "50+", icon: <Leaf size={20} /> },
    { label: "Outlet Gerai", value: "12", icon: <Award size={20} /> },
    { label: "Pecinta Kopi", value: "25k", icon: <Users size={20} /> },
  ];

  return (
    <div className="pt-20 overflow-hidden bg-[#FDFBF7]">

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#D4AF37] font-black tracking-[0.4em] text-xs uppercase mb-4 block">
                The Journey
              </span>
              <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-tight text-[#3E2723]">
                Menyedu Cerita dalam <span className="italic text-[#D4AF37]">Setiap Cangkir</span>
              </h2>
              <div className="space-y-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                  Kopi Kirkan bermula dari sebuah garasi kecil dengan mimpi besar: membawa kemewahan kopi artisan ke tangan setiap orang tanpa kehilangan rasa kehangatan rumah.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed font-light">
                  Nama **"Kirkan"** lahir dari semangat untuk memberikan apa yang orang "pikirkan" tentang rasa kopi ideal—seimbang, berkarakter, dan menenangkan. Kami percaya kopi bukan sekadar minuman, tapi jembatan antar manusia.
                </p>
              </div>

              <div className="flex gap-8 mt-12 pt-10 border-t border-beige">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 text-[#D4AF37] mb-1">
                      {stat.icon}
                      <span className="text-2xl font-bold text-[#3E2723]">{stat.value}</span>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31"
                  className="w-full h-full object-cover"
                  alt="Interior Kopi Kirkan"
                />
              </div>

              <div className="absolute -top-6 -right-6 w-full h-full border-2 border-[#D4AF37] rounded-[3rem] -z-0" />
              <div className="absolute -bottom-8 -left-8 bg-[#3E2723] text-white p-8 rounded-3xl hidden lg:block z-20">
                <ShieldCheck size={40} className="text-[#D4AF37] mb-4" />
                <p className="text-sm font-serif">Kualitas Terjamin & <br />Bahan 100% Organik</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#F2E8D5]/30">
        <div className="container mx-auto px-6 text-center mb-20">
          <h2 className="text-4xl font-serif text-[#3E2723]">Pilar Utama Kami</h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mt-4"></div>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Filosofi",
              desc: "Kami menjaga keseimbangan antara teknik seduh modern dan tradisi pengolahan biji kopi Nusantara.",
              img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
            },
            {
              title: "Visi",
              desc: "Menjadi 'Third Space'—ruang kreatif ketiga bagi setiap komunitas untuk berbagi ide dan inspirasi.",
              img: "https://images.unsplash.com/photo-1521017432531-fbd92d768814"
            },
            {
              title: "Kualitas",
              desc: "Hanya menggunakan 100% biji Arabika pilihan yang disortir manual untuk menjaga konsistensi rasa.",
              img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e"
            }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="h-48 overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-serif mb-4 text-[#3E2723]">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed font-light">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-32 container mx-auto px-6">
        <div className="bg-[#3E2723] rounded-[4rem] p-16 md:p-24 text-center text-[#F2E8D5] relative overflow-hidden">
           <div className="relative z-10">
             <h2 className="text-4xl font-serif mb-6 italic">"Bukan sekadar kopi, ini tentang manusia dibaliknya."</h2>
             <p className="max-w-2xl mx-auto text-[#F2E8D5]/60 text-lg">
               Setiap cangkir yang Anda nikmati turut berkontribusi pada kesejahteraan petani kopi di Gayo, Toraja, hingga Jawa Barat.
             </p>
           </div>

           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/20 to-transparent opacity-50" />
        </div>
      </section>
    </div>
  );
};

export default About;