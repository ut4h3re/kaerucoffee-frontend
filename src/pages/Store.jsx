import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, ExternalLink, Coffee } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const outlets = [
  { 
    name: "Kaeru Coffee - Depok", 
    address: "Ruko De Arcade, Jl. Boulevard Grand Depok City, Tirtajaya, Kec. Sukmajaya, Kota Depok, Jawa Barat 16412", 
    hours: "07:00 - 22:00",
    phone: "+62 21-555-0192",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop"
  },
];

const Store = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="pt-32 pb-20 bg-[#FDFBF7] min-h-screen"
    >
      <div className="container mx-auto px-6">

        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-gold font-bold tracking-[0.4em] text-xs uppercase mb-4 block">Our Presence</span>
            <h2 className="text-5xl font-serif text-coffee-dark mb-6">Kunjungi Ruang Kami</h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-500 text-lg font-light leading-relaxed">
              Temukan kehangatan Kaeru Coffee di kota Depok. Setiap gerai dirancang khusus untuk memberikan kenyamanan maksimal bagi produktivitas dan cerita Anda.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
          {outlets.map((store, i) => (
            <motion.div
              key={i}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="overflow-hidden border-none shadow-2xl group bg-white rounded-[2.5rem]">
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={store.image} 
                    alt={store.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <span className="bg-white/90 backdrop-blur-md text-coffee-dark text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                      Open Now
                    </span>
                  </div>
                </div>

                <CardContent className="p-10">
                  <h3 className="text-2xl font-serif mb-6 text-coffee-dark group-hover:text-gold transition-colors">
                    {store.name}
                  </h3>
                  
                  <div className="space-y-4 text-sm text-gray-600">
                    <div className="flex items-start gap-4">
                      <div className="bg-beige/50 p-2 rounded-lg text-gold">
                        <MapPin size={18} />
                      </div>
                      <p className="leading-relaxed">{store.address}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="bg-beige/50 p-2 rounded-lg text-gold">
                        <Clock size={18} />
                      </div>
                      <p>{store.hours}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="bg-beige/50 p-2 rounded-lg text-gold">
                        <Phone size={18} />
                      </div>
                      <p>{store.phone}</p>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-gray-100 flex justify-between items-center">
                    <button className="flex items-center gap-2 text-[11px] font-black tracking-widest text-coffee-dark hover:text-gold transition-all uppercase">
                      Get Direction <ExternalLink size={14} />
                    </button>
                    <div className="text-beige">
                      <Coffee size={24} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="mt-24 p-12 rounded-[3rem] bg-beige/30 border border-beige flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <h4 className="text-2xl font-serif text-coffee-dark mb-2">Tertarik Menjadi Partner?</h4>
            <p className="text-gray-500">Bawa pengalaman Kaeru Coffee ke lingkungan Anda melalui program kemitraan kami.</p>
          </div>
          <button className="bg-coffee-dark text-white px-10 py-4 rounded-full font-bold hover:bg-gold transition-all shadow-lg whitespace-nowrap">
            Hubungi Partnership
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Store;