"use client";

import React, { useState, useEffect } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter 
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { CartItem } from '../types/pizza';
import { Plus, Minus, MessageCircle, Gift, Sparkles } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  total: number;
}

const FREE_HALF_OPTIONS = [
  "Media Muzzarella Clásica",
  "Media Napolitana",
  "Media Fugazzeta"
];

export const CartDrawer = ({ open, onOpenChange, items, onUpdateQty, total }: Props) => {
  const [selectedFreeHalf, setSelectedFreeHalf] = useState<string>(FREE_HALF_OPTIONS[0]);

  // Count pizzas to see if the promo applies (category 'Clásicas' or 'Especiales')
  const pizzaCount = items
    .filter(item => item.category === 'Clásicas' || item.category === 'Especiales')
    .reduce((acc, item) => acc + item.quantity, 0);

  const isPromoEligible = pizzaCount >= 2;

  const sendToWhatsApp = () => {
    const phoneNumber = "5492364583291"; // Official Tomino's Junín WhatsApp
    const itemDetails = items
      .map(i => `• ${i.quantity}x ${i.name} ($${i.price * i.quantity})`)
      .join('%0A');
    
    let promoText = '';
    if (isPromoEligible) {
      promoText = `%0A%0A🎁 *PROMO ACTIVADA (Llevando 2 te llevas media GRATIS):*%0A• 1x ${selectedFreeHalf} ($0 - GRATIS!)`;
    }

    const message = `*Nuevo Pedido - Pizzeria Tomino*%0A%0A${itemDetails}${promoText}%0A%0A*Total: $${total}*%0A%0A_Por favor, confírmame el pedido para la sucursal de Av. San Martín 459_`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-[#121212] text-white border-l border-zinc-800">
        <SheetHeader className="border-b border-zinc-800 pb-4">
          <SheetTitle className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            Tu Pedido <span className="text-[#E52321] italic text-sm font-semibold">Tomino</span>
          </SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="flex-1 -mx-6 px-6 my-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-zinc-500">
              <p className="text-lg font-bold">Tu carrito está vacío</p>
              <p className="text-sm mt-1 text-center">¡Elegí tus pizzas y aprovechá la terrible promo!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4 border-b border-zinc-800/60">
                  <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt={item.name} />
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-base leading-tight">{item.name}</h4>
                    <p className="text-sm text-[#E52321] font-bold mt-1">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-zinc-800 rounded-lg p-1">
                    <button 
                      onClick={() => onUpdateQty(item.id, -1)} 
                      className="p-1 hover:text-[#E52321] transition-colors"
                    >
                      <Minus size={14}/>
                    </button>
                    <span className="w-4 text-center font-bold text-sm text-white">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQty(item.id, 1)} 
                      className="p-1 hover:text-[#E52321] transition-colors"
                    >
                      <Plus size={14}/>
                    </button>
                  </div>
                </div>
              ))}

              {/* Promo Interactive Card */}
              {isPromoEligible ? (
                <div className="bg-[#E52321]/10 border-2 border-[#E52321] rounded-2xl p-4 mt-6 relative overflow-hidden animate-pulse">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#E52321] p-2 rounded-xl text-white">
                      <Gift size={20} />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h4 className="font-black text-sm tracking-wide uppercase text-[#E52321] flex items-center gap-1.5">
                        ¡PROMO RE-ACTIVADA!
                        <Sparkles size={14} className="text-amber-400" />
                      </h4>
                      <p className="text-xs text-zinc-300">
                        Llevás <strong className="text-white">{pizzaCount}</strong> pizzas. ¡Elegí la variedad de tu <strong className="text-white">media pizza GRATIS</strong>!
                      </p>
                      
                      <div className="space-y-1.5 pt-2">
                        {FREE_HALF_OPTIONS.map((opt) => (
                          <label 
                            key={opt} 
                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer border text-xs transition-all ${
                              selectedFreeHalf === opt 
                                ? 'border-[#E52321] bg-[#E52321]/20 text-white font-bold' 
                                : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200'
                            }`}
                          >
                            <input 
                              type="radio" 
                              name="freePizza" 
                              value={opt} 
                              checked={selectedFreeHalf === opt}
                              onChange={() => setSelectedFreeHalf(opt)}
                              className="accent-[#E52321]"
                            />
                            {opt} <span className="ml-auto text-[9px] uppercase tracking-wider text-emerald-400 font-extrabold bg-emerald-900/40 px-1.5 py-0.5 rounded">¡GRATIS!</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                items.some(i => i.category === 'Clásicas' || i.category === 'Especiales') && (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mt-6 flex items-center gap-3">
                    <Gift className="text-zinc-500 shrink-0" size={20} />
                    <p className="text-xs text-zinc-400">
                      ¡Agregá <strong className="text-[#E52321]">{2 - pizzaCount} pizza más</strong> para llevarte <strong className="text-white">media GRATIS</strong>!
                    </p>
                  </div>
                )
              )}
            </div>
          )}
        </ScrollArea>

        <SheetFooter className="pt-6 border-t border-zinc-800 mt-auto">
          <div className="w-full space-y-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span className="text-[#E52321] font-black">${total}</span>
            </div>
            <Button 
              disabled={items.length === 0}
              onClick={sendToWhatsApp}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-7 rounded-xl text-base font-black gap-2 uppercase tracking-wide transition-all duration-200"
            >
              <MessageCircle size={20} />
              Pedir por WhatsApp
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};