import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const MenuCard = ({ item }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-beige hover:shadow-xl transition-all duration-300"
    >
      <div className="relative overflow-hidden rounded-xl h-48 mb-4">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        {item.isBestSeller && (
          <Badge className="absolute top-2 right-2 bg-gold text-black">Best Seller</Badge>
        )}
      </div>
      
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-serif text-xl font-bold">{item.name}</h3>
        <div className="flex items-center gap-1 text-gold">
          <Star size={14} fill="currentColor" />
          <span className="text-xs text-coffee-dark font-bold">{item.rating}</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.desc}</p>
      
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-coffee">Rp {item.price}k</span>
        <button className="bg-coffee-dark text-beige p-2 rounded-full hover:bg-gold hover:text-black transition-colors">
          <ShoppingBag size={18} />
        </button>
      </div>
    </motion.div>
  );
};