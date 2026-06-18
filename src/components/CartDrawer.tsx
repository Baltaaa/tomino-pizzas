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
import { Input } from "./ui/input";
import { CartItem } from '../types/pizza';
import { Plus, Minus, MessageCircle, Gift, Sparkles, MapPin, Truck, Store, User } from 'lucide-react';
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

const DELIVERY_COST = 1500;

export const CartDrawer = ({ open, onOpenChange, items, onUpdateQty, total }: Props) => {
  const [selectedFreeHalf, setSelectedFreeHalf] = useState<string>(FREE_HALF_OPTIONS[0]);
  const [shippingMethod, setShippingMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  // Count pizzas to see if the promo applies (category 'Clásicas' or 'Especiales')
  const pizzaCount = items
    .filter(item => item.category === 'Clásicas' || item.category === 'Especiales')
    .reduce((acc, item) => acc + item.quantity, 0);

  const isPromoEligible = pizzaCount >= 2;

  const shippingFee = shippingMethod === 'delivery' ? DELIVERY_COST : 0;
  const finalTotal = total + shippingFee;

  const sendToWhatsApp = () => {
    const phoneNumber = "5492364583291"; // Official Tomino's Junín WhatsApp
    
    // Header
    let message = `*NUEVO PEDIDO - PIZZERÍA TOMINO* 🍕%0A%0A`;
    
    // Customer Info
    message += `👤 *Cliente:* ${customerName || 'No especificado'}%0A`;
    message += `🛵 *Método:* ${shippingMethod === 'delivery' ? 'Envío a Domicilio' : 'Retiro por Local (Av. San Martín 459)'}%0A`;
    if (shippingMethod === 'delivery' && customerAddress) {
      message += `📍 *Dirección:* ${customerAddress}%0A`;
    }
    if (customerNotes) {
      message += `📝 *Notas:* ${customerNotes}%0A`;
    }
    message += `%0A──────────────────%0A`;

    // Items
    const itemDetails = items
      .map(i => `• ${i.quantity}x ${i.name} ($${i.price * i.quantity})`)
      .join('%0A');
    message += itemDetails;
    
    // Promo
    if (isPromoEligible) {
      message += `%0A%0A🎁 *PROMO ACTIVADA (Llevando 2 te llevas media GRATIS):*%0A• 1x ${selectedFreeHalf} ($0 - GRATIS!)`;
    }

    message += `%0A──────────────────%0A`;
    
    // Pricing
    message += `*Subtotal:* $${total}%0A`;
    if (shippingMethod === 'delivery') {
      message += `*Costo de Envío:* $${DELIVERY_COST}%0A`;
    }
    message += `💰 *TOTAL FINAL: $${finalTotal}*%0A%0A_Por favor, confírmame el pedido para comenzar la preparación._`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-[#121212] text-white border-l border-zinc-800 p-0">
        <div className="p-6 border-b border-zinc-800">
          <SheetHeader>
            <SheetTitle className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
              Tu Pedido <span className="text-[#E52321] italic text-sm font-semibold">Tomino</span>
            </SheetTitle>
          </SheetHeader>
        </div>
        
        <ScrollArea className="flex-1 px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-zinc-500">
              <p className="text-lg font-bold">Tu carrito está vacío</p>
              <p className="text-sm mt-1 text-center">¡Elegí tus pizzas y aprovechá la terrible promo!</p>
            </div>
          ) : (
            <div className="space-y-6 pb-6">
              {/* Cart Items List */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Productos seleccionados</h3>
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-3 border-b border-zinc-900">
                    <img src={item.image} className="w-12 h-12 rounded-lg object-cover bg-zinc-900 shrink-0" alt={item.name} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-sm truncate">{item.name}</h4>
                      <p className="text-xs text-[#E52321] font-bold mt-0.5">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-zinc-800 rounded-lg p-1 shrink-0">
                      <button 
                        onClick={() => onUpdateQty(item.id, -1)} 
                        className="p-1 hover:text-[#E52321] transition-colors"
                      >
                        <Minus size={12}/>
                      </button>
                      <span className="w-4 text-center font-bold text-xs text-white">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQty(item.id, 1)} 
                        className="p-1 hover:text-[#E52321] transition-colors"
                      >
                        <Plus size={12}/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Interactive Card */}
              {isPromoEligible ? (
                <div className="bg-[#E52321]/10 border-2 border-[#E52321] rounded-2xl p-4 relative overflow-hidden">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#E52321] p-2 rounded-xl text-white">
                      <Gift size={18} />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h4 className="font-black text-xs tracking-wide uppercase text-[#E52321] flex items-center gap-1.5">
                        ¡PROMO RE-ACTIVADA!
                        <Sparkles size={12} className="text-amber-400" />
                      </h4>
                      <p className="text-xs text-zinc-300">
                        Llevás <strong className="text-white">{pizzaCount}</strong> pizzas. ¡Elegí tu <strong className="text-white">media pizza GRATIS</strong>!
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
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-3">
                    <Gift className="text-zinc-500 shrink-0" size={18} />
                    <p className="text-xs text-zinc-400">
                      ¡Agregá <strong className="text-[#E52321]">{2 - pizzaCount} pizza más</strong> para llevarte <strong className="text-white">media GRATIS</strong>!
                    </p>
                  </div>
                )
              )}

              {/* Delivery / Shipping Method Selector */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Método de entrega</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setShippingMethod('delivery')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                      shippingMethod === 'delivery' 
                        ? 'bg-[#E52321] border-[#E52321] text-white' 
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <Truck size={16} />
                    Delivery (${DELIVERY_COST})
                  </button>
                  <button
                    type="button"
                    onClick={() => setShippingMethod('pickup')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                      shippingMethod === 'pickup' 
                        ? 'bg-[#E52321] border-[#E52321] text-white' 
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <Store size={16} />
                    Retiro en Local
                  </button>
                </div>
              </div>

              {/* Delivery details Form */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Datos para el pedido</h3>
                
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Tu Nombre Completo..."
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 text-xs py-5 rounded-xl pl-9"
                    />
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  </div>

                  {shippingMethod === 'delivery' && (
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Dirección (Calle, Número, Departamento)..."
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 text-xs py-5 rounded-xl pl-9"
                      />
                      <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    </div>
                  )}

                  <Input
                    type="text"
                    placeholder="Notas aclaratorias (gusto de empanada, si necesitas cambio, etc)..."
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 text-xs py-5 rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}
        </ScrollArea>

        <SheetFooter className="p-6 border-t border-zinc-800 bg-[#161616]">
          <div className="w-full space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal:</span>
                <span>${total}</span>
              </div>
              {shippingMethod === 'delivery' && (
                <div className="flex justify-between text-zinc-400">
                  <span>Costo de envío (Junín):</span>
                  <span>${DELIVERY_COST}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-black text-white pt-1.5 border-t border-zinc-800">
                <span>Total:</span>
                <span className="text-[#E52321]">${finalTotal}</span>
              </div>
            </div>
            <Button 
              disabled={items.length === 0 || (shippingMethod === 'delivery' && !customerAddress) || !customerName}
              onClick={sendToWhatsApp}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-xl text-sm font-black gap-2 uppercase tracking-wide transition-all duration-200"
            >
              <MessageCircle size={18} />
              {(!customerName || (shippingMethod === 'delivery' && !customerAddress)) 
                ? 'Completa los campos' 
                : 'Pedir por WhatsApp'}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};