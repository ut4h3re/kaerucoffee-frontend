import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">

      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" 
          className="w-full h-full object-cover scale-105"
          alt="Coffee Aesthetic"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 text-center text-white px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-6xl md:text-8xl mb-4 text-beige"
        >
          Kopi Kirkan
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-2xl mb-8 font-light tracking-widest uppercase"
        >
          Artisan Coffee & Cozy Atmosphere
        </motion.p>

        <motion.div 
          className="flex gap-4 justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button size="lg" className="bg-gold hover:bg-gold/80 text-black px-8 rounded-none">
            ORDER NOW
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none">
            EXPLORE MENU
          </Button>
        </motion.div>
      </div>
    </section>
  );
};