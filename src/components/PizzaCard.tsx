"use client";

import React, { useState } from 'react';
import { PizzaItem } from '../types/pizza';
import { Button } from './ui/button';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  item: PizzaItem;
  onAdd: (item: PizzaItem, size: "Entera" | "Media") => void;
  quantityEntera?: number;
  quantityMedia?: number;
  onUpdateQtyEntera?: (delta: number) => void;
  onUpdateQtyMedia?: (delta: number) => void;
  isAgotado?: boolean;
}

export const PizzaCard = ({ 
  item, 
  onAdd, 
  quantityEntera = 0, 
  quantityMedia = 0, 
  onUpdateQtyEntera, 
  onUpdateQtyMedia,
  isAgotado = false
}: Props) => {
  const [selectedSize, setSelectedSize] = useState<"Entera" | "Media">("Entera");
  const canHaveSize = item.category === "Clásicas" || item.category === "Especiales";

  const totalQuantity = quantityEntera + quantityMedia;

  const handleAdd = () => {
    if (isAgotado) return;
    onAdd(item, canHaveSize ? selectedSize : "Entera");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-[#1e1e1e] rounded-[16px] sm:rounded-[24px] overflow-hidden border transition-all duration-300 group flex flex-col h-full ${
        isAgotado 
          ? "border-red-900/50 opacity-60" 
          : "border-white/5 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-500/5"
      }`}
    >
      <div className="relative h-28 sm:h-40 md:h-48 overflow-hidden bg-zinc-900">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-[#E52321] text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-sm font-black shadow-md tracking-wider">
          {canHaveSize && selectedSize === "Media" ? `$${Math.round(item.price / 2)}` : `$${item.price}`}
        </div>

        {isAgotado && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-[#E52321] text-white px-3 py-1.5 rounded-lg text-xs md:text-sm font-black tracking-widest uppercase shadow-lg">
              AGOTADO
            </span>
          </div>
        )}

        {item.category === 'Especiales' && !isAgotado && (
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-amber-500 text-black px-2 py-0.5 rounded-full text-[8px] sm:text-xs font-black tracking-widest uppercase">
            Especial
          </div>
        )}
        {item.category === 'Promos' && !isAgotado && (
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-[#E52321] text-white px-2 py-0.5 rounded-full text-[8px] sm:text-xs font-black tracking-widest uppercase animate-pulse">
            Combo
          </div>
        )}
      </div>

      <div className="p-3 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-sm sm:text-lg md:text-xl font-bold text-[#FDFBF7] mb-1 sm:mb-2 group-hover:text-red-500 transition-colors line-clamp-1">
            {item.name}
          </h3>
          <p className="text-zinc-400 text-[10px] sm:text-xs md:text-sm mb-3 sm:mb-4 line-clamp-2 min-h-[30px] sm:min-h-[40px] leading-tight">
            {item.description}
          </p>
        </div>

        {/* Entera / Media selector */}
        {canHaveSize && !isAgotado && (
          <div className="grid grid-cols-2 gap-1.5 bg-zinc-900 p-1 rounded-lg mb-3">
            <button
              onClick={() => setSelectedSize("Entera")}
              className={`text-[9px] sm:text-[11px] py-1 rounded font-bold transition-all ${
                selectedSize === "Entera" 
                  ? "bg-[#E52321] text-white shadow-sm" 
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Entera
            </button>
            <button
              onClick={() => setSelectedSize("Media")}
              className={`text-[9px] sm:text-[11px] py-1 rounded font-bold transition-all ${
                selectedSize === "Media" 
                  ? "bg-[#E52321] text-white shadow-sm" 
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Media (½)
            </button>
          </div>
        )}

        <div className="min-h-[36px] sm:min-h-[48px]">
          <AnimatePresence mode="wait">
            {isAgotado ? (
              <Button 
                disabled
                className="w-full bg-zinc-800 text-zinc-500 rounded-lg sm:rounded-xl py-3 sm:py-6 h-auto text-[9px] sm:text-xs font-bold uppercase tracking-wider"
              >
                No Disponible
              </Button>
            ) : (
              // Si ya tiene ítems de la opción elegida, mostramos sumadores/restadores específicos
              (selectedSize === "Entera" && quantityEntera > 0) || (selectedSize === "Media" && quantityMedia > 0) || (!canHaveSize && totalQuantity > 0) ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center justify-between bg-zinc-800 rounded-lg sm:rounded-xl p-0.5 sm:p-1 border border-zinc-700"
                >
                  <Button
                    onClick={() => {
                      if (!canHaveSize) {
                        onUpdateQtyEntera?.(-1);
                      } else if (selectedSize === "Entera") {
                        onUpdateQtyEntera?.(-1);
                      } else {
                        onUpdateQtyMedia?.(-1);
                      }
                    }}
                    size="icon"
                    className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-md sm:rounded-lg h-7 w-7 sm:h-10 sm:w-10 transition-colors"
                  >
                    <Minus size={10} className="sm:size-3.5" />
                  </Button>
                  
                  <span className="font-extrabold text-[10px] sm:text-sm text-white select-none text-center flex-1">
                    {!canHaveSize ? `${totalQuantity} agregados` : selectedSize === "Entera" ? `${quantityEntera} Enteras` : `${quantityMedia} Medias`}
                  </span>
                  
                  <Button
                    onClick={() => {
                      if (!canHaveSize) {
                        onUpdateQtyEntera?.(1);
                      } else if (selectedSize === "Entera") {
                        onUpdateQtyEntera?.(1);
                      } else {
                        onUpdateQtyMedia?.(1);
                      }
                    }}
                    size="icon"
                    className="bg-[#E52321] hover:bg-red-700 text-white rounded-md sm:rounded-lg h-7 w-7 sm:h-10 sm:w-10 transition-colors"
                  >
                    <Plus size={10} className="sm:size-3.5" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Button 
                    onClick={handleAdd}
                    className="w-full bg-[#E52321] hover:bg-red-700 text-white rounded-lg sm:rounded-xl py-3 sm:py-6 h-auto flex items-center justify-center gap-1 sm:gap-2 font-bold uppercase tracking-wider text-[9px] sm:text-xs transition-transform duration-200 active:scale-95"
                  >
                    <Plus size={12} className="sm:size-4" />
                    Agregar {canHaveSize && selectedSize === "Media" ? "Media (½)" : "Entera"}
                  </Button>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};