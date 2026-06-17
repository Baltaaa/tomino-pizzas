"use client";

import React, { useState } from 'react';
import { useCart } from '../hooks/use-cart';
import { PizzaItem } from '../types/pizza';
import { PizzaCard } from '../components/PizzaCard';
import { CartDrawer } from '../components/CartDrawer';
import { TominoLogo } from '../components/TominoLogo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, MapPin, Phone, Instagram, Facebook, Gift, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const MENU_ITEMS: PizzaItem[] = [
  {
    id: '1',
    name: 'Muzzarella Clásica',
    description: 'Salsa de tomate casera, muzzarella premium, aceitunas y orégano.',
    price: 8500,
    category: 'Clásicas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Napolitana',
    description: 'Muzzarella, rodajas de tomate natural, ajo y albahaca fresca.',
    price: 9200,
    category: 'Clásicas',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Fugazzeta',
    description: 'Base de muzzarella cubierta con cebolla blanca en pluma y especias.',
    price: 8900,
    category: 'Clásicas',
    image: 'https://images.unsplash.com/photo-1593504049359-74330189a355?w=800&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Pepperoni Especial',
    description: 'Doble porción de pepperoni americano sobre un colchón de muzzarella.',
    price: 11500,
    category: 'Especiales',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop'
  },
  {
    id: '5',
    name: 'Cuatro Quesos',
    description: 'Muzzarella, parmesano, provolone y un toque de queso azul.',
    price: 12000,
    category: 'Especiales',
    image: 'https://images.unsplash.com/photo-1511688855354-a16955dad62c?w=800&auto=format&fit=crop'
  },
  {
    id: '6',
    name: 'Rúcula y Crudo',
    description: 'Muzzarella, jamón crudo premium, rúcula fresca y lluvia de parmesano.',
    price: 12500,
    category: 'Especiales',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=800&auto=format&fit=crop'
  },
  {
    id: '7',
    name: 'Coca Cola 1.5L',
    description: 'Bebida gaseosa refrescante.',
    price: 3500,
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&auto=format&fit=crop'
  },
  {
    id: '8',
    name: 'Cerveza Artesanal IPA',
    description: 'Lata 473ml de nuestra mejor selección local.',
    price: 4200,
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&auto=format&fit=crop'
  }
];

const Index = () => {
  const { cart, addToCart, updateQuantity, total, itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#121212] text-[#FDFBF7] selection:bg-[#E52321] selection:text-white overflow-x-hidden">
      
      {/* Promo Ticker Bar */}
      <div className="bg-[#E52321] text-white py-2 px-4 text-center text-xs md:text-sm font-black uppercase tracking-widest relative z-50 shadow-md">
        <span className="inline-flex items-center gap-2 animate-pulse">
          🔥 TERRIBLE PROMO !! LLEVANDO DOS PIZZAS TE LLEVÁS MEDIA GRATIS !!!! 🍕
        </span>
      </div>

      {/* Navigation / Header Brand Logo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40">
        <TominoLogo size="md" />
      </div>

      {/* Hero Poster Layout matching Image Design */}
      <header className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden bg-radial-gradient">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-[#121212]/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600&auto=format&fit=crop" 
            className="w-full h-full object-cover brightness-[0.25]"
            alt="Pizzeria Tomino Background"
          />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12">
          
          {/* Left Side: Mock Phone Poster Frame */}
          <div className="col-span-1 lg:col-span-5 flex justify-center order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-[320px] h-[480px] md:w-[350px] md:h-[520px] bg-zinc-950 rounded-[48px] p-4 shadow-2xl border-4 border-zinc-800"
            >
              {/* Inner screen simulation */}
              <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-gradient-to-b from-[#E52321] to-red-950 p-6 pb-24 flex flex-col justify-between text-center">
                <div className="space-y-2">
                  <span className="text-xs tracking-[0.2em] font-extrabold uppercase bg-white/10 text-white px-3 py-1 rounded-full">
                    SABOR ORIGINAL
                  </span>
                  <h3 className="text-3xl font-black uppercase text-white leading-tight tracking-tight pt-4">
                    APROVECHA<br/>LA PROMO
                  </h3>
                </div>

                {/* Splat Text Graphic "WOW!" */}
                <div className="my-auto transform -rotate-6">
                  <h4 className="text-6xl md:text-7xl font-black tracking-tighter text-white uppercase italic stroke-white" style={{ textShadow: '4px 4px 0px #121212' }}>
                    ¡WOW!
                  </h4>
                </div>

                {/* Elevated Slogan Text with Shadow protection */}
                <div className="text-white font-extrabold tracking-widest text-xs z-10 bg-black/30 backdrop-blur-[2px] py-1.5 px-3 rounded-full mx-auto shadow-sm">
                  #SABEMOSDEPIZZAS
                </div>
              </div>

              {/* Pizza floating overlay at bottom */}
              <div className="absolute -bottom-8 -left-6 w-36 h-36 rounded-full overflow-hidden border-4 border-[#121212] shadow-2xl z-0">
                <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300" className="w-full h-full object-cover" alt="muzzarella" />
              </div>
              <div className="absolute -bottom-10 -right-4 w-44 h-44 rounded-full overflow-hidden border-4 border-[#121212] shadow-2xl z-0">
                <img src="https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300" className="w-full h-full object-cover" alt="pepperoni" />
              </div>
            </motion.div>
          </div>

          {/* Right Side: Heavy Bold Slogans & Action */}
          <div className="col-span-1 lg:col-span-7 space-y-6 text-center lg:text-left order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-white leading-[0.95] flex flex-col">
                <span>UNA PROMO</span>
                <span className="text-[#E52321] italic">DE LOCURA</span>
              </h1>
              
              <div className="inline-block bg-[#E52321] text-white font-black text-xl md:text-2xl px-6 py-3 rounded-2xl transform -rotate-2 shadow-lg tracking-tight">
                LLEVANDO 2 PIZZAS TE REGALAMOS MEDIA!
              </div>

              <p className="text-lg text-zinc-300 max-w-xl font-medium leading-relaxed pt-2">
                Disfrutá del verdadero sabor de la pizza artesanal. Hacé tu pedido online y recibilo directamente en tu puerta.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            >
              <button 
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#E52321] hover:bg-red-700 text-white px-8 py-5 rounded-2xl font-black text-lg tracking-wider uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl shadow-red-600/20"
              >
                Hacer mi Pedido
              </button>
              
              <a 
                href="https://wa.me/5492364583291"
                target="_blank"
                rel="noreferrer"
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all"
              >
                <svg
                  className="text-[#E52321] fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.83.001-2.624-1.013-5.091-2.861-6.942-1.848-1.85-4.307-2.87-6.931-2.87-5.438 0-9.863 4.414-9.866 9.832-.001 1.782.463 3.52 1.34 5.068l-.988 3.607 3.692-.968zm11.391-7.713c-.29-.146-1.714-.847-1.98-.942-.265-.096-.459-.146-.653.146-.194.292-.751.943-.919 1.134-.168.19-.336.213-.626.068-.29-.146-1.225-.452-2.333-1.441-.863-.77-1.446-1.72-1.616-2.012-.17-.291-.018-.448.127-.592.131-.13.291-.339.436-.509.145-.17.194-.291.291-.485.097-.194.048-.364-.025-.51-.072-.146-.653-1.574-.894-2.157-.235-.567-.474-.49-.653-.499-.17-.008-.364-.01-.557-.01-.194 0-.509.073-.775.364-.266.292-1.016.993-1.016 2.423s1.04 2.812 1.185 3.007c.145.194 2.046 3.125 4.957 4.382.693.3 1.233.479 1.654.613.697.221 1.33.19 1.83.115.558-.083 1.714-.7 1.956-1.374.242-.674.242-1.251.17-1.374-.074-.124-.267-.197-.558-.343z" />
                </svg>
                WhatsApp: 2364 58 3291
              </a>
            </motion.div>
          </div>

        </div>
      </header>

      {/* Contact & Brand Info Section */}
      <section className="bg-[#181818] py-16 border-y border-zinc-800/80">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 text-[#E52321]">
              <MapPin size={28} />
            </div>
            <h3 className="font-extrabold text-lg uppercase tracking-wider text-white">Ubicación</h3>
            <p className="text-zinc-400">Av. San Martín 459, Junín</p>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 text-[#E52321]">
              <Phone size={28} />
            </div>
            <h3 className="font-extrabold text-lg uppercase tracking-wider text-white">Llamanos / WhatsApp</h3>
            <p className="text-zinc-400 font-bold">2364 58 3291</p>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 text-[#E52321]">
              <Instagram size={28} />
            </div>
            <h3 className="font-extrabold text-lg uppercase tracking-wider text-white">Seguinos</h3>
            <p className="text-zinc-400">@pizzeriatomino</p>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <main id="menu" className="container mx-auto px-4 py-24">
        <div className="text-center mb-16 space-y-2">
          <span className="text-xs tracking-[0.3em] font-extrabold uppercase text-[#E52321]">NUESTRO MENÚ</span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">PIZZAS EN SERIO</h2>
          <div className="h-1.5 w-20 bg-[#E52321] mx-auto rounded-full"></div>
        </div>

        <Tabs defaultValue="Clásicas" className="w-full">
          <TabsList className="flex justify-center mb-16 bg-zinc-900/60 p-2 rounded-2xl border border-zinc-800 gap-2 h-auto flex-wrap max-w-lg mx-auto">
            {["Clásicas", "Especiales", "Bebidas"].map((cat) => (
              <TabsTrigger 
                key={cat} 
                value={cat}
                className="px-6 py-3 rounded-xl border-0 data-[state=active]:bg-[#E52321] data-[state=active]:text-white transition-all font-black uppercase text-xs tracking-wider"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {["Clásicas", "Especiales", "Bebidas"].map((cat) => (
            <TabsContent key={cat} value={cat}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {MENU_ITEMS.filter(item => item.category === cat).map((item) => (
                  <PizzaCard key={item.id} item={item} onAdd={addToCart} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {/* Promotional Callout Section */}
      <section className="bg-gradient-to-r from-red-950 via-[#E52321]/30 to-red-950 py-20 border-t border-zinc-800/80">
        <div className="container mx-auto px-4 text-center space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs font-extrabold text-white tracking-widest uppercase">
            <Star size={14} className="text-amber-400 fill-amber-400" /> PROMO DE APERTURA <Star size={14} className="text-amber-400 fill-amber-400" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
            LLEVÁS 2 PIZZAS, TE REGALAMOS <span className="text-[#E52321]">MEDIA MÁS!</span>
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed font-medium">
            ¡Sí, leíste bien! Llevando cualquiera de nuestras pizzas (Clásicas o Especiales), te regalamos media pizza a tu elección totalmente gratis para acompañar tu pedido.
          </p>
          <div className="pt-4">
            <button 
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#E52321] hover:bg-red-700 text-white font-black uppercase tracking-wider text-sm px-8 py-4 rounded-xl transition-all"
            >
              ¡Aprovechar Promo Ahora!
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-16 border-t border-zinc-900">
        <div className="container mx-auto px-4 text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-[84px] h-[84px] bg-white rounded-full border-2 border-white flex flex-col items-center justify-center p-1.5 shadow-lg transform -rotate-6">
              <span className="text-[7px] text-zinc-800 font-bold tracking-widest uppercase">DESDE 1960</span>
              <h1 className="text-[20px] font-black tracking-tight leading-none text-zinc-950 italic transform skew-x-3 -skew-y-2">
                TOMINO
              </h1>
              <div className="w-12 h-[2px] bg-[#E52321] my-0.5"></div>
              <span className="text-[5.5px] text-white font-semibold tracking-wider uppercase bg-[#E52321] px-1 rounded-sm">
                PIZZAS EN SERIO
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-white font-extrabold uppercase tracking-widest">#SABEMOSDEPIZZAS</p>
            <p className="text-sm max-w-md mx-auto text-zinc-500">
              Tradición familiar elaborada con el mejor horno de piedra, salsa secreta de la casa e ingredientes frescos locales.
            </p>
          </div>

          <div className="flex justify-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#E52321] transition-colors"><Instagram size={20} /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#E52321] transition-colors"><Facebook size={20} /></a>
          </div>

          <div className="border-t border-zinc-900/60 pt-8 text-xs text-zinc-500 flex flex-col items-center gap-2">
            <div>
              &copy; {new Date().getFullYear()} Pizzería Tomino. Todos los derechos reservados.
            </div>
            <div className="text-[11px] text-zinc-600 mt-2">
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
          className="fixed bottom-8 right-8 bg-[#E52321] text-white p-5 rounded-full shadow-2xl flex items-center gap-3 z-50 hover:bg-red-700 transition-colors"
        >
          <ShoppingCart size={24} />
          <span className="font-extrabold text-base tracking-tight">{itemCount} - ${total}</span>
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
    </div>
  );
};

export default Index;