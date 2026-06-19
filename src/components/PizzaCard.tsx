"use client";

import React, { useState } from 'react';
import { PizzaItem } from '../types/pizza';
import { Button } from './ui/button';
import { Plus, Minus, Info } from 'lucide-react';
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
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
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
      <div className="relative h-24 sm:h-36 md:h-44 overflow-hidden bg-zinc-900">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 bg-[#E52321] text-white px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-black shadow-md tracking-wider">
          {canHaveSize && selectedSize === "Media" ? `$${Math.round(item.price / 2)}` : `$${item.price}`}
        </div>

        {isAgotado && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-[#E52321] text-white px-2 py-1 rounded-md text-[9px] sm:text-xs font-black tracking-widest uppercase shadow-lg">
              AGOTADO
            </span>
          </div>
        )}

        {item.category === 'Especiales' && !isAgotado && (
          <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-amber-500 text-black px-1.5 py-0.5 rounded-full text-[8px] sm:text-[10px] font-black tracking-widest uppercase">
            Especial
          </div>
        )}
        {item.category === 'Promos' && !isAgotado && (
          <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-[#E52321] text-white px-1.5 py-0.5 rounded-full text-[8px] sm:text-[10px] font-black tracking-widest uppercase animate-pulse">
            Combo
          </div>
        )}
      </div>

      <div className="p-2 sm:p-4 flex flex-col flex-1 justify-between gap-2">
        <div>
          <h3 className="text-xs sm:text-base font-bold text-[#FDFBF7] group-hover:text-red-500 transition-colors line-clamp-1">
            {item.name}
          </h3>
          
          {/* Descripción: En desktop se muestra completa; en mobile se puede expandir al pulsarla */}
          <div 
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="cursor-pointer sm:cursor-default mt-1 relative group/desc"
            title="Toca para expandir"
          >
            <p className={`text-zinc-400 text-[10px] sm:text-xs leading-tight transition-all duration-300 ${
              isDescriptionExpanded ? "" : "line-clamp-2 sm:line-clamp-none"
            }`}>
              {item.description}
            </p>
            {!isDescriptionExpanded && item.description.length > 45 && (
              <span className="text-[8px] text-red-500 font-bold block sm:hidden mt-0.5 hover:underline flex items-center gap-0.5 select-none">
                <Info size={10} /> Ver todo
              </span>
            )}
            {isDescriptionExpanded && (
              <span className="text-[8px] text-zinc-500 font-bold block sm:hidden mt-0.5 select-none">
                Ver menos
              </span>
            )}
          </div>
        </div>

        {/* Entera / Media selector */}
        {canHaveSize && !isAgotado && (
          <div className="grid grid-cols-2 gap-1 bg-zinc-900 p-0.5 rounded-md">
            <button
              onClick={() => setSelectedSize("Entera")}
              className={`text-[8px] sm:text-[10px] py-1 rounded font-bold transition-all ${
                selectedSize === "Entera" 
                  ? "bg-[#E52321] text-white shadow-sm" 
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Entera
            </button>
            <button
              onClick={() => setSelectedSize("Media")}
              className={`text-[8px] sm:text-[10px] py-1 rounded font-bold transition-all ${
                selectedSize === "Media" 
                  ? "bg-[#E52321] text-white shadow-sm" 
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Media (½)
            </button>
          </div>
        )}

        <div className="min-h-[30px] sm:min-h-[36px] mt-1">
          <AnimatePresence mode="wait">
            {isAgotado ? (
              <Button 
                disabled
                className="w-full bg-zinc-800 text-zinc-500 rounded-lg py-2 h-auto text-[8px] sm:text-xs font-bold uppercase"
              >
                No Disp.
              </Button>
            ) : (
              (selectedSize === "Entera" && quantityEntera > 0) || (selectedSize === "Media" && quantityMedia > 0) || (!canHaveSize && totalQuantity > 0) ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center justify-between bg-zinc-800 rounded-lg p-0.5 border border-zinc-700"
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
                    className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-md h-6 w-6 sm:h-8 sm:w-8 transition-colors"
                  >
                    <Minus size={8} />
                  </Button>
                  
                  <span className="font-extrabold text-[9px] sm:text-xs text-white select-none text-center flex-1">
                    {!canHaveSize ? `${totalQuantity}` : selectedSize === "Entera" ? `${quantityEntera} Ent.` : `${quantityMedia} Med.`}
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
                    className="bg-[#E52321] hover:bg-red-700 text-white rounded-md h-6 w-6 sm:h-8 sm:w-8 transition-colors"
                  >
                    <Plus size={8} />
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
                    className="w-full bg-[#E52321] hover:bg-red-700 text-white rounded-lg py-2 h-auto flex items-center justify-center gap-1 font-bold uppercase text-[8px] sm:text-[10px]"
                  >
                    <Plus size={10} />
                    Agregar {canHaveSize && selectedSize === "Media" ? "½" : ""}
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