"use client";

import React from 'react';
import { PizzaItem } from '../types/pizza';
import { Button } from './ui/button';
import { Plus, Minus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  item: PizzaItem;
  onAdd: (item: PizzaItem) => void;
  quantity?: number;
  onUpdateQty?: (delta: number) => void;
}

export const PizzaCard = ({ item, onAdd, quantity = 0, onUpdateQty }: Props) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#1e1e1e] rounded-[24px] overflow-hidden border border-white/5 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-500/5 transition-all duration-300 group flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden bg-zinc-900">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-4 right-4 bg-[#E52321] text-white px-3 py-1 rounded-full text-sm font-black shadow-md tracking-wider">
          ${item.price}
        </div>
        {item.category === 'Especiales' && (
          <div className="absolute top-4 left-4 bg-amber-500 text-black px-3 py-0.5 rounded-full text-xs font-black tracking-widest uppercase">
            Especial
          </div>
        )}
        {item.category === 'Promos' && (
          <div className="absolute top-4 left-4 bg-[#E52321] text-white px-3 py-0.5 rounded-full text-xs font-black tracking-widest uppercase animate-pulse">
            Combo
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#FDFBF7] mb-2 group-hover:text-red-500 transition-colors">
            {item.name}
          </h3>
          <p className="text-zinc-400 text-sm mb-5 line-clamp-2 min-h-[40px]">
            {item.description}
          </p>
        </div>
        
        <div className="min-h-[48px]">
          <AnimatePresence mode="wait">
            {quantity > 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center justify-between bg-zinc-800 rounded-xl p-1 border border-zinc-700"
              >
                <Button
                  onClick={() => onUpdateQty?.(-1)}
                  size="icon"
                  className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg h-10 w-10 transition-colors"
                >
                  <Minus size={14} />
                </Button>
                
                <span className="font-extrabold text-sm text-white select-none">
                  {quantity} agregados
                </span>
                
                <Button
                  onClick={() => onUpdateQty?.(1)}
                  size="icon"
                  className="bg-[#E52321] hover:bg-red-700 text-white rounded-lg h-10 w-10 transition-colors"
                >
                  <Plus size={14} />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button 
                  onClick={() => onAdd(item)}
                  className="w-full bg-[#E52321] hover:bg-red-700 text-white rounded-xl py-6 flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-xs transition-transform duration-200 active:scale-95"
                >
                  <Plus size={16} />
                  Agregar al pedido
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};