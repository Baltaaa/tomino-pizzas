"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/use-cart';
import { PizzaItem, CartItem } from '../types/pizza';
import { PizzaCard } from '../components/PizzaCard';
import { CartDrawer } from '../components/CartDrawer';
import { TominoLogo } from '../components/TominoLogo';
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMenuItems } from '../utils/menuState';
import { 
  ShoppingCart, MapPin, Phone, Instagram, Facebook, Star, Search, Clock, 
  ShieldCheck, GlassWater, RotateCcw, QrCode, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

const Index = () => {
  const { cart, addToCart, updateQuantity, total, itemCount, setCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Disponibilidad de productos y Precios editables del Admin
  const [menuItems, setMenuItems] = useState<PizzaItem[]>(getMenuItems());
  const [availability, setAvailability] = useState<{[id: string]: boolean}>({});
  
  // Historial del último pedido
  const [lastOrderCustomerName, setLastOrderCustomerName] = useState('');
  const [hasSavedOrder, setHasSavedOrder] = useState(false);

  // Modal QR del local
  const [isQrOpen, setIsQrOpen] = useState(false);

  // Carga de disponibilidad, precios del panel de admin & Historial
  useEffect(() => {
    // Recargar items con sus precios reales
    setMenuItems(getMenuItems());

    // Disponibilidad
    const savedAv = localStorage.getItem('tomino_menu_availability');
    if (savedAv) {
      setAvailability(JSON.parse(savedAv));
    }

    // Historial
    const savedName = localStorage.getItem('tomino_last_name');
    const savedItems = localStorage.getItem('tomino_last_items');
    if (savedName && savedItems) {
      setLastOrderCustomerName(savedName);
      setHasSavedOrder(true);
    }
  }, []);

  const repeatLastOrder = () => {
    const savedItems = localStorage.getItem('tomino_last_items');
    if (savedItems) {
      try {
        const parsed: CartItem[] = JSON.parse(savedItems);
        setCart(parsed);
        setIsCartOpen(true);
      } catch (e) {
        console.error("Error al restaurar último pedido", e);
      }
    }
  };

  // Filtrado dinámico por buscador
  const filteredMenuItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#121212] text-[#FDFBF7] selection:bg-[#E52321] selection:text-white overflow-x-hidden">

      {/* Navigation / Header Brand Logo */}
      <div className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 z-40">
        <TominoLogo size="sm" className="scale-90 md:scale-100" />
      </div>

      {/* Hero Poster Layout - Full height on Mobile */}
      <header className="relative min-h-screen md:min-h-[85vh] flex items-center justify-center pt-32 pb-12 md:pb-20 overflow-hidden bg-radial-gradient">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/90 to-[#121212]/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600&auto=format&fit=crop" 
            className="w-full h-full object-cover brightness-[0.25]"
            alt="Pizzeria Tomino Background"
          />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: Mock Phone Poster Frame - Hidden or small on mobile */}
          <div className="col-span-1 lg:col-span-5 hidden sm:flex justify-center order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-[280px] h-[420px] md:w-[330px] md:h-[480px] bg-zinc-950 rounded-[48px] p-4 shadow-2xl border-4 border-zinc-800"
            >
              {/* Inner screen simulation */}
              <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-gradient-to-b from-[#E52321] to-red-950 p-6 pb-20 flex flex-col justify-between text-center">
                <div className="space-y-2">
                  <span className="text-[10px] tracking-[0.2em] font-extrabold uppercase bg-white/10 text-white px-3 py-1 rounded-full">
                    SABOR ORIGINAL
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black uppercase text-white leading-tight tracking-tight pt-4">
                    APROVECHA<br/>LA PROMO
                  </h3>
                </div>

                {/* Splat Text Graphic "WOW!" */}
                <div className="my-auto transform -rotate-6">
                  <h4 className="text-5xl md:text-6xl font-black tracking-tighter text-white uppercase italic stroke-white" style={{ textShadow: '4px 4px 0px #121212' }}>
                    ¡WOW!
                  </h4>
                </div>

                {/* Elevated Slogan Text */}
                <div className="text-white font-extrabold tracking-widest text-[10px] z-10 bg-black/30 backdrop-blur-[2px] py-1.5 px-3 rounded-full mx-auto shadow-sm">
                  #SABEMOSDEPIZZAS
                </div>
              </div>

              {/* Pizza floating overlay at bottom */}
              <div className="absolute -bottom-6 -left-4 w-28 h-28 rounded-full overflow-hidden border-4 border-[#121212] shadow-2xl z-0">
                <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200" className="w-full h-full object-cover" alt="muzzarella" />
              </div>
              <div className="absolute -bottom-8 -right-2 w-32 h-32 rounded-full overflow-hidden border-4 border-[#121212] shadow-2xl z-0">
                <img src="https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=200" className="w-full h-full object-cover" alt="pepperoni" />
              </div>
            </motion.div>
          </div>

          {/* Right Side: Heavy Bold Slogans & Action - Super compact on Mobile */}
          <div className="col-span-1 lg:col-span-7 space-y-4 md:space-y-6 text-center lg:text-left order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3 md:space-y-4"
            >
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase text-white leading-[0.95] flex flex-col">
                <span>UNA PROMO</span>
                <span className="text-[#E52321] italic">DE LOCURA</span>
              </h1>
              
              <div className="inline-block bg-[#E52321] text-white font-black text-sm sm:text-xl md:text-2xl px-4 py-2.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl transform -rotate-1 shadow-lg tracking-tight">
                LLEVANDO 2 PIZZAS TE REGALAMOS MEDIA!
              </div>

              <p className="text-sm sm:text-lg text-zinc-300 max-w-xl font-medium leading-relaxed pt-1 mx-auto lg:mx-0">
                Disfrutá del verdadero sabor de la pizza artesanal de Junín. Hacé tu pedido online para delivery o retirá directo de nuestro local de Av. San Martín.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2"
            >
              <button 
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#E52321] hover:bg-red-700 text-white px-6 py-4 rounded-xl md:rounded-2xl font-black text-sm sm:text-lg tracking-wider uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl shadow-red-600/20"
              >
                Hacer mi Pedido
              </button>
            </motion.div>
          </div>

        </div>
      </header>

      {/* Historial de Re-compra rápida (Banner localStorage) */}
      {hasSavedOrder && (
        <section className="bg-zinc-950 py-4 border-b border-zinc-900">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="text-xs sm:text-sm text-zinc-300 font-medium text-center">
              👋 ¿Repetís lo de siempre, <strong className="text-[#E52321]">{lastOrderCustomerName}</strong>?
            </span>
            <Button
              onClick={repeatLastOrder}
              className="bg-[#E52321] hover:bg-red-700 text-white text-xs py-1.5 px-4 h-auto rounded-lg font-bold gap-1.5 flex items-center"
            >
              <RotateCcw size={12} />
              Cargar último pedido
            </Button>
          </div>
        </section>
      )}

      {/* Contact & Brand Info Section - Compact Grid */}
      <section className="bg-[#181818] py-8 md:py-16 border-y border-zinc-800/80">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 text-[#E52321]">
              <MapPin size={22} />
            </div>
            <h3 className="font-extrabold text-sm md:text-lg uppercase tracking-wider text-white">Ubicación</h3>
            <p className="text-xs md:text-sm text-zinc-400">Av. San Martín 459, Junín</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 text-[#E52321]">
              <Phone size={22} />
            </div>
            <h3 className="font-extrabold text-sm md:text-lg uppercase tracking-wider text-white">Llamanos / WhatsApp</h3>
            <p className="text-xs md:text-sm text-zinc-400 font-bold">2364 58 3291</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 text-[#E52321]">
              <Instagram size={22} />
            </div>
            <h3 className="font-extrabold text-sm md:text-lg uppercase tracking-wider text-white">Seguinos</h3>
            <p className="text-xs md:text-sm text-zinc-400 font-semibold">@pizzeriatomino</p>
          </div>
        </div>
      </section>

      {/* Quality Promises / Delivery Info - Compact layout */}
      <section className="py-8 md:py-12 bg-zinc-900/30">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="flex items-center gap-3 bg-[#1e1e1e]/60 p-4 rounded-xl border border-white/5">
            <Clock className="text-[#E52321] shrink-0" size={24} />
            <div>
              <h4 className="font-black text-xs md:text-sm uppercase text-white tracking-wide">Entrega Rápida</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">Tu pedido calentito, directo al horno a tu mesa en tiempo récord.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#1e1e1e]/60 p-4 rounded-xl border border-white/5">
            <ShieldCheck className="text-[#E52321] shrink-0" size={24} />
            <div>
              <h4 className="font-black text-xs md:text-sm uppercase text-white tracking-wide">Delivery Junín</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">Costo de envío plano de $1500 a cualquier parte de la ciudad de Junín.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#1e1e1e]/60 p-4 rounded-xl border border-white/5">
            <GlassWater className="text-[#E52321] shrink-0" size={24} />
            <div>
              <h4 className="font-black text-xs md:text-sm uppercase text-white tracking-wide">Vinos y Bebidas</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">Bodegas premium y gaseosas en envase familiar bien frías para acompañar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <main id="menu" className="container mx-auto px-4 py-12 md:py-24">
        <div className="text-center mb-8 space-y-1">
          <span className="text-[10px] md:text-xs tracking-[0.3em] font-extrabold uppercase text-[#E52321]">NUESTRO MENÚ</span>
          <h2 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tight">PIZZAS EN SERIO</h2>
          <div className="h-1 w-16 bg-[#E52321] mx-auto rounded-full"></div>
        </div>

        {/* Buscador de pizzas interactivo */}
        <div className="max-w-md mx-auto mb-10 relative">
          <input
            type="text"
            placeholder="Buscar por sabor, ingrediente, vino, combo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl py-3.5 pl-11 pr-4 text-xs focus:outline-none focus:border-[#E52321] focus:ring-1 focus:ring-[#E52321] transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
        </div>

        <Tabs defaultValue="Promos" className="w-full">
          <TabsList className="flex justify-center mb-10 md:mb-16 bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-800 gap-1.5 h-auto flex-wrap max-w-xl mx-auto">
            {["Promos", "Clásicas", "Especiales", "Bebidas"].map((cat) => (
              <TabsTrigger 
                key={cat} 
                value={cat}
                className="px-4 py-2.5 rounded-lg border-0 data-[state=active]:bg-[#E52321] data-[state=active]:text-white transition-all font-black uppercase text-[10px] md:text-xs tracking-wider"
              >
                {cat === 'Bebidas' ? 'Bebidas y Vinos' : cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {["Promos", "Clásicas", "Especiales", "Bebidas"].map((cat) => (
            <TabsContent key={cat} value={cat}>
              {filteredMenuItems.filter(item => item.category === cat).length === 0 ? (
                <div className="text-center text-zinc-500 py-12">
                  <p className="text-lg font-bold">No se encontraron productos en esta categoría</p>
                  <p className="text-sm mt-1">Intentá buscando otro sabor o combo.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
                  {filteredMenuItems.filter(item => item.category === cat).map((item) => {
                    const isAgotado = availability[item.id] === false;
                    
                    // Buscar agregados en carrito
                    const itemEntera = cart.find(c => c.id === `${item.id}-Entera`);
                    const itemMedia = cart.find(c => c.id === `${item.id}-Media`);
                    
                    const qEntera = itemEntera ? itemEntera.quantity : 0;
                    const qMedia = itemMedia ? itemMedia.quantity : 0;

                    return (
                      <PizzaCard 
                        key={item.id} 
                        item={item} 
                        onAdd={(prod, size) => addToCart(prod, size)} 
                        quantityEntera={qEntera}
                        quantityMedia={qMedia}
                        onUpdateQtyEntera={(delta) => updateQuantity(`${item.id}-Entera`, delta)}
                        onUpdateQtyMedia={(delta) => updateQuantity(`${item.id}-Media`, delta)}
                        isAgotado={isAgotado}
                      />
                    );
                  })}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {/* Promotional Callout Section */}
      <section className="bg-gradient-to-r from-red-950 via-[#E52321]/30 to-red-950 py-16 md:py-20 border-t border-zinc-800/80">
        <div className="container mx-auto px-4 text-center space-y-4 md:space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold text-white tracking-widest uppercase">
            <Star size={12} className="text-amber-400 fill-amber-400" /> PROMO DE APERTURA <Star size={12} className="text-amber-400 fill-amber-400" />
          </div>
          <h2 className="text-3xl md:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            LLEVÁS 2 PIZZAS, TE REGALAMOS <span className="text-[#E52321]">MEDIA MÁS!</span>
          </h2>
          <p className="text-sm md:text-lg text-zinc-300 leading-relaxed font-medium">
            ¡Sí, leíste bien! Llevando cualquiera de nuestras pizzas (Clásicas o Especiales), te regalamos media pizza a tu elección totalmente gratis para acompañar tu pedido.
          </p>
          <div className="pt-2">
            <button 
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#E52321] hover:bg-red-700 text-white font-black uppercase tracking-wider text-xs md:text-sm px-6 py-3.5 rounded-xl transition-all"
            >
              ¡Aprovechar Promo Ahora!
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-12 md:py-16 border-t border-zinc-900">
        <div className="container mx-auto px-4 text-center space-y-6 md:space-y-8">
          <div className="flex justify-center">
            <div className="w-[72px] h-[72px] md:w-[84px] md:h-[84px] bg-white rounded-full border-2 border-white flex flex-col items-center justify-center p-1.5 shadow-lg transform -rotate-6">
              <span className="text-[6px] md:text-[7px] text-zinc-800 font-bold tracking-widest uppercase">DESDE 1960</span>
              <h1 className="text-[17px] md:text-[20px] font-black tracking-tight leading-none text-zinc-950 italic transform skew-x-3 -skew-y-2">
                TOMINO
              </h1>
              <div className="w-10 md:w-12 h-[2px] bg-[#E52321] my-0.5"></div>
              <span className="text-[5px] md:text-[5.5px] text-white font-semibold tracking-wider uppercase bg-[#E52321] px-1 rounded-sm">
                PIZZAS EN SERIO
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-white text-xs md:text-sm font-extrabold uppercase tracking-widest">#SABEMOSDEPIZZAS</p>
            <p className="text-xs md:text-sm max-w-md mx-auto text-zinc-500">
              Tradición familiar elaborada con el mejor horno de piedra, salsa secreta de la casa e ingredientes frescos locales.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setIsQrOpen(true)}
              className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white text-xs gap-1.5 rounded-lg py-4"
            >
              <QrCode size={14} /> Ver QR de la Pizza
            </Button>
            <a 
              href="/admin"
              className="inline-flex items-center justify-center bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white text-xs gap-1.5 rounded-lg px-4 py-2"
            >
              ⚙️ Acceso Admin
            </a>
          </div>

          <div className="flex justify-center gap-5 md:gap-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#E52321] transition-colors"><Instagram size={18} /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#E52321] transition-colors"><Facebook size={18} /></a>
          </div>

          <div className="border-t border-zinc-900/60 pt-6 md:pt-8 text-[10px] md:text-xs text-zinc-500 flex flex-col items-center gap-1.5">
            <div>
              &copy; {new Date().getFullYear()} Pizzería Tomino. Todos los derechos reservados.
            </div>
            <div className="text-[10px] text-zinc-600 mt-1">
              Desarrollado a medida por{" "}
              <a 
                href="https://www.instagram.com/baltabruschetti/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-zinc-400 font-bold hover:text-[#E52321] transition-colors"
              >
                Baltasar Bruschetti
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Cart Button */}
      {itemCount > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 bg-[#E52321] text-white p-4 md:p-5 rounded-full shadow-2xl flex items-center gap-2.5 md:gap-3 z-50 hover:bg-red-700 transition-colors"
        >
          <ShoppingCart size={22} />
          <span className="font-extrabold text-sm md:text-base tracking-tight">{itemCount} - ${total}</span>
        </motion.button>
      )}

      {/* Cart Drawer Component */}
      <CartDrawer 
        open={isCartOpen} 
        onOpenChange={setIsCartOpen}
        items={cart}
        onUpdateQty={updateQuantity}
        total={total}
      />

      {/* QR Code Modal Dialog */}
      <AnimatePresence>
        {isQrOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl max-w-sm w-full text-center space-y-4 relative"
            >
              <button
                onClick={() => setIsQrOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white"
              >
                <X size={18} />
              </button>

              <h3 className="text-lg font-black uppercase text-white tracking-tight">QR Acceso Rápido</h3>
              <p className="text-xs text-zinc-400">Escanealo con la cámara del celular para ver el menú digital en las mesas o el mostrador.</p>
              
              <div className="bg-white p-4 rounded-2xl inline-block shadow-xl">
                <QRCodeSVG value={window.location.origin} size={200} marginSize={2} />
              </div>

              <div className="text-[10px] text-zinc-500 font-mono">
                {window.location.origin}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;