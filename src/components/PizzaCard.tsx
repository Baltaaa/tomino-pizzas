import React from 'react';
import { PizzaItem } from '../types/pizza';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  item: PizzaItem;
  onAdd: (item: PizzaItem) => void;
}

export const PizzaCard = ({ item, onAdd }: Props) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-orange-100 hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-orange-600">
          ${item.price}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>
        <Button 
          onClick={() => onAdd(item)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-6 flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Agregar al pedido
        </Button>
      </div>
    </motion.div>
  );
};