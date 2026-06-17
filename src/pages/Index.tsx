"use client";

import React, { useState } from 'react';
import { useCart } from '../hooks/use-cart';
import { PizzaItem } from '../types/pizza';
import { PizzaCard } from '../components/PizzaCard';
import { CartDrawer } from '../components/CartDrawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, MapPin, Phone, Instagram, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import { MadeWithDyad } from '@/components/made-with-dyad';

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
    <div className="min-h-screen bg-[#FFFDF5]">
      {/* Header / Hero */}
      <header className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600&auto=format&fit=crop" 
            className="w-full h-full object-cover brightness-50"
            alt="Pizzeria Tomino Background"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black mb-4 drop-shadow-2xl italic"
          >
            Pizzeria Tomino
          </motion.h1>
          <p className="text-xl md:text-2xl font-light tracking-widest uppercase mb-8 drop-shadow-lg">
            Tradición y sabor en cada porción
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105"
            >
              Ver Menú
            </button>
          </div>
        </div>
      </header>

      {/* Stats / Info */}
      <section className="bg-white py-12 border-b">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <MapPin className="text-orange-500 mb-2" size={32} />
            <h3 className="font-bold">Ubicación</h3>
            <p className="text-gray-500">Av. Siempre Viva 123, CABA</p>
          </div>
          <div className="flex flex-col items-center">
            <Phone className="text-orange-500 mb-2" size={32} />
            <h3 className="font-bold">Llamanos</h3>
            <p className="text-gray-500">011 1234-5678</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex gap-4">
              <Instagram className="text-orange-500 cursor-pointer" />
              <Facebook className="text-orange-500 cursor-pointer" />
            </div>
            <h3 className="font-bold mt-2">Seguinos</h3>
            <p className="text-gray-500">@pizzeriatomino</p>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <main id="menu" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Nuestro Menú</h2>
          <div className="h-1.5 w-24 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        <Tabs defaultValue="Clásicas" className="w-full">
          <TabsList className="flex justify-center mb-12 bg-transparent gap-2 h-auto flex-wrap">
            {["Clásicas", "Especiales", "Bebidas"].map((cat) => (
              <TabsTrigger 
                key={cat} 
                value={cat}
                className="px-8 py-3 rounded-full border-2 border-orange-100 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:border-orange-500 transition-all font-bold"
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black italic mb-4">Pizzeria Tomino</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Hacemos pizzas con amor, ingredientes frescos y ese toque artesanal que nos distingue.
          </p>
          <div className="flex justify-center gap-8 mb-12">
            <Instagram className="hover:text-orange-500 cursor-pointer transition-colors" />
            <Facebook className="hover:text-orange-500 cursor-pointer transition-colors" />
          </div>
          <MadeWithDyad />
        </div>
      </footer>

      {/* Floating Cart Button */}
      {itemCount > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 right-8 bg-orange-600 text-white p-6 rounded-full shadow-2xl flex items-center gap-3 z-50 hover:bg-orange-700 transition-colors"
        >
          <ShoppingCart size={24} />
          <span className="font-bold text-lg">{itemCount} items - ${total}</span>
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