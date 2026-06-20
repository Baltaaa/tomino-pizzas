"use client";

import React, { useState, useEffect } from 'react';
import { PizzaItem } from '../types/pizza';
import { Button } from './ui/button';
import { Plus, Minus, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  item: PizzaItem;
  onAdd: (item: PizzaItem, size: "Entera" | "Media" | "Chica" | "Grande" | "Única") => void;
  quantityEntera?: number;
  quantityMedia?: number;
  quantityChica?: number;
  quantityGrande?: number;
  quantityUnica?: number;
  onUpdateQtyEntera?: (delta: number) => void;
  onUpdateQtyMedia?: (delta: number) => void;
  onUpdateQtyChica?: (delta: number) => void;
  onUpdateQtyGrande?: (delta: number) => void;
  onUpdateQtyUnica?: (delta: number) => void;
  isAgotado?: boolean;
}

export const PizzaCard = ({ 
  item, 
  onAdd, 
  quantityEntera = 0, 
  quantityMedia = 0, 
  quantityChica = 0, 
  quantityGrande = 0, 
  quantityUnica = 0,
  onUpdateQtyEntera,
  onUpdateQtyMedia,
  onUpdateQtyChica,
  onUpdateQtyGrande,
  onUpdateQtyUnica,
  isAgotado = false
}: Props) => {
  const isPizzaVariant = item.hasVariants && item.variantType === 'pizza';
  const isDrinkVariant = item.hasVariants && item.variantType === 'drink';
  const hasVariants = item.hasVariants === true;

  const [selectedSize, setSelectedSize] = useState<"Entera" | "Media" | "Chica" | "Grande" | "Única">(
    isPizzaVariant ? "Entera" : isDrinkVariant ? "Grande" : "Única"
  );
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [imageSrc, setImageSrc] = useState(item.image);

  // Sincronizar imagen si el item cambia
  useEffect(() => {
    setImageSrc(item.image);
  }, [item.image]);

  const handleAdd = () => {
    if (isAgotado) return;
    onAdd(item, selectedSize);
  };

  // Determinar precio de previsualización según selección actual
  const currentPrice = (hasVariants && (selectedSize === "Media" || selectedSize === "Chica") && item.priceHalf !== undefined)
    ? item.priceHalf 
    : item.price;

  // Obtener cantidad según la variante seleccionada
  const activeQuantity = selectedSize === "Entera" ? quantityEntera
    : selectedSize === "Media" ? quantityMedia
    : selectedSize === "Chica" ? quantityChica
    : selectedSize === "Grande" ? quantityGrande
    : quantityUnica;

  // Manejador de fallos de imágenes Unsplash
  const handleImageError = () => {
    if (item.category === 'bebidas_sin_alcohol' || item.category === 'cervezas_con_alcohol') {
      setImageSrc("https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=800");
    } else if (item.category === 'vinos') {
      setImageSrc("https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800");
    } else if (item.category === 'postres') {
      setImageSrc("https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800");
    } else if (item.name.toLowerCase().includes("papa")) {
      setImageSrc("https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800");
    } else {
      // Default hermosa pizza artesanal
      setImageSrc("https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800");
    }
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
          src={imageSrc} 
          alt={item.name} 
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 bg-[#E52321] text-white px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-black shadow-md tracking-wider">
          ${currentPrice}
        </div>

        {isAgotado && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-[#E52321] text-white px-2 py-1 rounded-md text-[9px] sm:text-xs font-black tracking-widest uppercase shadow-lg">
              AGOTADO
            </span>
          </div>
        )}

        {item.category === 'la_gigante' && !isAgotado && (
          <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-amber-500 text-black px-1.5 py-0.5 rounded-full text-[8px] sm:text-[10px] font-black tracking-widest uppercase">
            La Gigante
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
          
          {item.description && (
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
          )}
        </div>

        {/* Selectores de variantes de tamaños (Pizzas y Gaseosas) */}
        {!isAgotado && isPizzaVariant && (
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

        {!isAgotado && isDrinkVariant && (
          <div className="grid grid-cols-2 gap-1 bg-zinc-900 p-0.5 rounded-md">
            <button
              onClick={() => setSelectedSize("Grande")}
              className={`text-[8px] sm:text-[10px] py-1 rounded font-bold transition-all ${
                selectedSize === "Grande" 
                  ? "bg-[#E52321] text-white shadow-sm" 
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Grande (1.5L)
            </button>
            <button
              onClick={() => setSelectedSize("Chica")}
              className={`text-[8px] sm:text-[10px] py-1 rounded font-bold transition-all ${
                selectedSize === "Chica" 
                  ? "bg-[#E52321] text-white shadow-sm" 
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Chica (500cc)
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
              activeQuantity > 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center justify-between bg-zinc-800 rounded-lg p-0.5 border border-zinc-700"
                >
                  <Button
                    onClick={() => {
                      if (selectedSize === "Entera" && onUpdateQtyEntera) onUpdateQtyEntera(-1);
                      else if (selectedSize === "Media" && onUpdateQtyMedia) onUpdateQtyMedia(-1);
                      else if (selectedSize === "Chica" && onUpdateQtyChica) onUpdateQtyChica(-1);
                      else if (selectedSize === "Grande" && onUpdateQtyGrande) onUpdateQtyGrande(-1);
                      else if (selectedSize === "Única" && onUpdateQtyUnica) onUpdateQtyUnica(-1);
                    }}
                    size="icon"
                    className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-md h-6 w-6 sm:h-8 sm:w-8 transition-colors"
                  >
                    <Minus size={8} />
                  </Button>
                  
                  <span className="font-extrabold text-[9px] sm:text-xs text-white select-none text-center flex-1">
                    {selectedSize === "Entera" ? `${quantityEntera} Ent.` 
                     : selectedSize === "Media" ? `${quantityMedia} Med.`
                     : selectedSize === "Grande" ? `${quantityGrande} Gde.`
                     : selectedSize === "Chica" ? `${quantityChica} Ch.`
                     : `${quantityUnica}`}
                  </span>
                  
                  <Button
                    onClick={() => {
                      if (selectedSize === "Entera" && onUpdateQtyEntera) onUpdateQtyEntera(1);
                      else if (selectedSize === "Media" && onUpdateQtyMedia) onUpdateQtyMedia(1);
                      else if (selectedSize === "Chica" && onUpdateQtyChica) onUpdateQtyChica(1);
                      else if (selectedSize === "Grande" && onUpdateQtyGrande) onUpdateQtyGrande(1);
                      else if (selectedSize === "Única" && onUpdateQtyUnica) onUpdateQtyUnica(1);
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
                    Agregar {selectedSize === "Media" ? "½" : selectedSize === "Chica" ? "Chica" : ""}
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