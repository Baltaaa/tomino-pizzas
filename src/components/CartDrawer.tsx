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
import { Plus, Minus, MessageCircle, Gift, Sparkles, MapPin, Truck, Store, User, DollarSign, CreditCard } from 'lucide-react';
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
  const [paymentMethod, setPaymentMethod] = useState<'efectivo' | 'transferencia'>('efectivo');
  const [cashAmount, setCashAmount] = useState<string>('');
  const [timePreference, setTimePreference] = useState<'antes_posible' | 'programado'>('antes_posible');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // 1. Estimación de tiempo de entrega dinámica
  const [deliveryEstimation, setDeliveryEstimation] = useState({ start: '', end: '' });
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [isKitchenClosed, setIsKitchenClosed] = useState(false);

  useEffect(() => {
    const updateTimeCalculations = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();

      // Verificar horario de corte automático (23:15)
      const currentTimeInMinutes = currentHours * 60 + currentMinutes;
      const cutOffTimeInMinutes = 23 * 60 + 15; // 23:15hs
      setIsKitchenClosed(currentTimeInMinutes >= cutOffTimeInMinutes);

      // Calcular rango dinámico para Delivery (entre 35 y 50 minutos)
      const startEst = new Date(now.getTime() + 35 * 60 * 1000);
      const endEst = new Date(now.getTime() + 50 * 60 * 1000);

      const formatTime = (d: Date) => {
        const hh = d.getHours().toString().padStart(2, '0');
        const mm = d.getMinutes().toString().padStart(2, '0');
        return `${hh}:${mm}`;
      };

      setDeliveryEstimation({
        start: formatTime(startEst),
        end: formatTime(endEst)
      });

      // Generar slots de 30 minutos desde la hora actual + 40 min hasta las 23:00
      const minStart = new Date(now.getTime() + 40 * 60 * 1000);
      let slotRunner = new Date(minStart);
      
      // Redondear el runner al siguiente múltiplo de 30 minutos para prolijidad
      const rem = slotRunner.getMinutes() % 30;
      if (rem !== 0) {
        slotRunner.setMinutes(slotRunner.getMinutes() + (30 - rem));
      }
      slotRunner.setSeconds(0);

      const slots: string[] = [];
      const endTime = new Date();
      endTime.setHours(23, 0, 0, 0); // Límite de las 23:00

      while (slotRunner <= endTime) {
        slots.push(formatTime(slotRunner));
        slotRunner.setMinutes(slotRunner.getMinutes() + 30);
      }

      setTimeSlots(slots);
      if (slots.length > 0 && !selectedTimeSlot) {
        setSelectedTimeSlot(slots[0]);
      }
    };

    updateTimeCalculations();
    const interval = setInterval(updateTimeCalculations, 30000); // Actualizar cada 30 segundos
    return () => clearInterval(interval);
  }, [selectedTimeSlot]);

  // Cargar datos del último pedido para completar inputs si estuviera disponible
  useEffect(() => {
    const savedName = localStorage.getItem('tomino_last_name');
    if (savedName) {
      setCustomerName(savedName);
    }
  }, []);

  // Calcular el vuelto estimado
  const shippingFee = shippingMethod === 'delivery' ? DELIVERY_COST : 0;
  const finalTotal = total + shippingFee;
  const numericCashAmount = parseFloat(cashAmount) || 0;
  const changeDue = numericCashAmount > finalTotal ? numericCashAmount - finalTotal : 0;

  // Contar pizzas para promo (las de tamaño entera o media cuentan igual)
  const pizzaCount = items
    .filter(item => item.category === 'Clásicas' || item.category === 'Especiales')
    .reduce((acc, item) => acc + item.quantity, 0);

  const isPromoEligible = pizzaCount >= 2;

  const sendToWhatsApp = () => {
    const phoneNumber = "5492364583291"; // WhatsApp Oficial
    
    let message = `*NUEVO PEDIDO - PIZZERÍA TOMINO* 🍕%0A%0A`;
    
    // Información del cliente
    message += `👤 *Cliente:* ${customerName || 'No especificado'}%0A`;
    message += `🛵 *Método:* ${shippingMethod === 'delivery' ? 'Envío a Domicilio' : 'Retiro por Local (Av. San Martín 459)'}%0A`;
    
    if (shippingMethod === 'delivery') {
      if (customerAddress) {
        message += `📍 *Dirección:* ${customerAddress}%0A`;
      }
      // Horario de entrega
      if (timePreference === 'antes_posible') {
        message += `🕒 *Entrega:* Lo antes posible (Est. entre ${deliveryEstimation.start} y ${deliveryEstimation.end} hs)%0A`;
      } else {
        message += `🕒 *Entrega Programada:* ${selectedTimeSlot} hs%0A`;
      }
    }

    // Medio de Pago
    message += `💵 *Método de Pago:* ${paymentMethod === 'efectivo' ? 'Efectivo' : 'Transferencia Bancaria'}%0A`;
    if (paymentMethod === 'efectivo' && numericCashAmount > 0) {
      message += `   - Paga con: $${numericCashAmount}%0A`;
      message += `   - Vuelto estimado: $${changeDue}%0A`;
    }

    if (orderNotes) {
      message += `📝 *Aclaraciones pedido:* ${orderNotes}%0A`;
    }
    if (shippingMethod === 'delivery' && deliveryNotes) {
      message += `🛵 *Nota para repartidor:* ${deliveryNotes}%0A`;
    }

    message += `%0A──────────────────%0A`;

    // Ítems detallados
    const itemDetails = items
      .map(i => {
        const sizeLabel = i.size === "Media" ? "½ (Media)" : "Entera";
        return `• ${i.quantity}x ${i.name} [${sizeLabel}] ($${i.singlePrice * i.quantity})`;
      })
      .join('%0A');
    message += itemDetails;
    
    // Regalo de la promo
    if (isPromoEligible) {
      message += `%0A%0A🎁 *PROMO ACTIVADA (Llevando 2 te llevas media GRATIS):*%0A• 1x ${selectedFreeHalf} ($0 - GRATIS!)`;
    }

    message += `%0A──────────────────%0A`;
    
    // Precios
    message += `*Subtotal:* $${total}%0A`;
    if (shippingMethod === 'delivery') {
      message += `*Costo de Envío:* $${DELIVERY_COST}%0A`;
    }
    message += `💰 *TOTAL FINAL: $${finalTotal}*%0A%0A_Por favor, confírmame el pedido para comenzar la preparación._`;
    
    // Guardar en localStorage para re-compra rápida
    localStorage.setItem('tomino_last_name', customerName);
    localStorage.setItem('tomino_last_shipping', shippingMethod);
    localStorage.setItem('tomino_last_items', JSON.stringify(items));

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
                      <div className="flex items-baseline gap-1.5">
                        <h4 className="font-bold text-white text-sm truncate">{item.name}</h4>
                        {item.size === "Media" && (
                          <span className="text-[10px] bg-red-950 text-[#E52321] font-black px-1 py-0.5 rounded uppercase">½</span>
                        )}
                      </div>
                      <p className="text-xs text-[#E52321] font-bold mt-0.5">${item.singlePrice} c/u</p>
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

              {/* Estimación de entrega y selector de horario (Solo para Delivery) */}
              {shippingMethod === 'delivery' && (
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 space-y-3">
                  <div className="text-xs text-zinc-300">
                    🕒 <span className="font-bold text-[#E52321]">Rango estimado:</span> entre las {deliveryEstimation.start} y las {deliveryEstimation.end} hs.
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Horario preferido</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setTimePreference('antes_posible')}
                        className={`py-2 px-3 rounded-lg text-[11px] font-bold border transition-all ${
                          timePreference === 'antes_posible'
                            ? "bg-zinc-800 border-red-500 text-white"
                            : "bg-zinc-900/50 border-zinc-850 text-zinc-400"
                        }`}
                      >
                        Lo antes posible
                      </button>
                      <button
                        type="button"
                        onClick={() => setTimePreference('programado')}
                        className={`py-2 px-3 rounded-lg text-[11px] font-bold border transition-all ${
                          timePreference === 'programado'
                            ? "bg-zinc-800 border-red-500 text-white"
                            : "bg-zinc-900/50 border-zinc-850 text-zinc-400"
                        }`}
                      >
                        Elegir horario
                      </button>
                    </div>

                    {timePreference === 'programado' && (
                      <div className="pt-1">
                        {timeSlots.length > 0 ? (
                          <select
                            value={selectedTimeSlot}
                            onChange={(e) => setSelectedTimeSlot(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 text-white text-xs py-2 px-3 rounded-lg focus:outline-none focus:border-[#E52321]"
                          >
                            {timeSlots.map((slot) => (
                              <option key={slot} value={slot}>
                                {slot} hs
                              </option>
                            ))}
                          </select>
                        ) : (
                          <p className="text-[10px] text-zinc-500 italic">No hay más turnos disponibles hoy.</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Selector de Medio de Pago */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Medio de Pago</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('efectivo')}
                    className={`flex items-center justify-center gap-1.5 py-3 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === 'efectivo' 
                        ? 'bg-zinc-800 border-red-500 text-white shadow-sm' 
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <DollarSign size={14} className="text-emerald-500" />
                    Efectivo
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transferencia')}
                    className={`flex items-center justify-center gap-1.5 py-3 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === 'transferencia' 
                        ? 'bg-zinc-800 border-red-500 text-white shadow-sm' 
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <CreditCard size={14} className="text-sky-500" />
                    Transferencia
                  </button>
                </div>

                {paymentMethod === 'efectivo' && (
                  <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 space-y-3">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Calculadora de Cambio</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-400">$</span>
                      <Input
                        type="number"
                        placeholder="¿Con cuánto vas a pagar?"
                        value={cashAmount}
                        onChange={(e) => setCashAmount(e.target.value)}
                        className="bg-zinc-900 border-zinc-800 text-white text-xs h-9 rounded-lg"
                      />
                    </div>
                    {numericCashAmount > 0 && (
                      <div className="text-xs font-bold flex justify-between border-t border-zinc-900 pt-2 text-emerald-400">
                        <span>Tu vuelto estimado:</span>
                        <span>${changeDue}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Delivery details Form */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Datos para el pedido</h3>
                
                <div className="space-y-3">
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

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Aclaraciones del pedido</label>
                    <Input
                      type="text"
                      placeholder="Gusto de empanada, cocción de la pizza, etc."
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 text-xs py-5 rounded-xl"
                    />
                  </div>

                  {shippingMethod === 'delivery' && (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Nota para el repartidor</label>
                      <Input
                        type="text"
                        placeholder="Edificio, timbre, timbre roto, portón negro, etc."
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 text-xs py-5 rounded-xl"
                      />
                    </div>
                  )}
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

            {isKitchenClosed ? (
              <div className="w-full bg-[#E52321]/10 border border-[#E52321]/30 p-3.5 rounded-xl text-center space-y-1">
                <span className="text-sm font-black text-[#E52321] block">🍕 COCINA CERRADA POR HOY</span>
                <span className="text-[11px] text-zinc-400 block">¡Volvemos mañana a las 20hs!</span>
              </div>
            ) : (
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
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};