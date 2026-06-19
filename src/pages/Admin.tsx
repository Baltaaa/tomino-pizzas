"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TominoLogo } from '../components/TominoLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldAlert, LogOut, CheckCircle, XCircle, RotateCcw, ArrowLeft } from 'lucide-react';

interface MenuAvailability {
  [id: string]: boolean; // true = disponible, false = agotado
}

const MENU_ITEMS = [
  { id: '1', name: 'Muzzarella Clásica', category: 'Clásicas' },
  { id: '2', name: 'Fugazza con Queso', category: 'Clásicas' },
  { id: '3', name: 'Napolitana', category: 'Clásicas' },
  { id: '4', name: 'Jamón y Morrón', category: 'Clásicas' },
  { id: '5', name: 'Calabresa', category: 'Clásicas' },
  { id: '6', name: 'Fugazzeta Rellena', category: 'Clásicas' },
  { id: '7', name: 'Rúcula y Jamón Crudo', category: 'Especiales' },
  { id: '8', name: 'Cuatro Quesos', category: 'Especiales' },
  { id: '9', name: 'Provolone Premium', category: 'Especiales' },
  { id: '10', name: 'Roquefort y Apio', category: 'Especiales' },
  { id: '11', name: 'Palmitos Especial', category: 'Especiales' },
  { id: '12', name: 'Especial Tomino', category: 'Especiales' },
  { id: 'p1', name: 'Combo Amigos', category: 'Promos' },
  { id: 'p2', name: 'La de la Casa', category: 'Promos' },
  { id: 'p3', name: 'Promo Mundial', category: 'Promos' },
  { id: '13', name: 'Coca-Cola Sabor Original 1.5L', category: 'Bebidas' },
  { id: '14', name: 'Sprite Lima-Limón 1.5L', category: 'Bebidas' },
  { id: '15', name: 'Cerveza Quilmes Clásica 1L', category: 'Bebidas' },
  { id: '16', name: 'Cerveza Imperial Especial 1L', category: 'Bebidas' },
  { id: '17', name: 'Vino Rutini Malbec 750ml', category: 'Bebidas' },
  { id: '18', name: 'Vino Álamos Malbec 750ml', category: 'Bebidas' },
  { id: '19', name: 'Vino Trapiche Alaris Malbec 750ml', category: 'Bebidas' },
  { id: '20', name: 'Vino Estancia Mendoza Cabernet 750ml', category: 'Bebidas' },
  { id: '21', name: 'Agua Mineral sin Gas 500ml', category: 'Bebidas' }
];

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [availability, setAvailability] = useState<MenuAvailability>({});
  const navigate = useNavigate();

  // Cargar disponibilidad actual
  useEffect(() => {
    const saved = localStorage.getItem('tomino_menu_availability');
    if (saved) {
      setAvailability(JSON.parse(saved));
    } else {
      // Por defecto, todo disponible
      const initial: MenuAvailability = {};
      MENU_ITEMS.forEach(item => {
        initial[item.id] = true;
      });
      setAvailability(initial);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'tomino2024') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Contraseña incorrecta. Intente nuevamente.');
    }
  };

  const toggleAvailability = (id: string) => {
    const updated = {
      ...availability,
      [id]: availability[id] === undefined ? false : !availability[id]
    };
    setAvailability(updated);
    localStorage.setItem('tomino_menu_availability', JSON.stringify(updated));
  };

  const resetAllAvailability = () => {
    const updated: MenuAvailability = {};
    MENU_ITEMS.forEach(item => {
      updated[item.id] = true;
    });
    setAvailability(updated);
    localStorage.setItem('tomino_menu_availability', JSON.stringify(updated));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#121212] text-[#FDFBF7] flex flex-col items-center justify-center p-4">
        <div className="absolute top-6 left-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-zinc-400 hover:text-white flex items-center gap-1.5"
          >
            <ArrowLeft size={16} /> Volver al sitio
          </Button>
        </div>

        <div className="w-full max-w-sm space-y-8 bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl relative">
          <div className="flex flex-col items-center space-y-4">
            <TominoLogo size="sm" />
            <h1 className="text-xl font-black uppercase tracking-wider text-center pt-8">Panel de Control</h1>
            <p className="text-xs text-zinc-400 text-center">Acceso exclusivo para el personal de Pizzería Tomino</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Contraseña de acceso</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-950 border-zinc-850 text-white py-5 text-center tracking-widest text-lg"
                autoFocus
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-red-500 font-bold text-center">{errorMsg}</p>
            )}

            <Button 
              type="submit" 
              className="w-full bg-[#E52321] hover:bg-red-700 text-white py-6 rounded-xl font-bold uppercase tracking-wider text-xs"
            >
              Ingresar al Panel
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-[#FDFBF7] p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Cabecera del Panel */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#E52321]/10 rounded-2xl text-[#E52321] shrink-0 border border-[#E52321]/20">
              <ShieldAlert size={28} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">Disponibilidad del Menú</h1>
              <p className="text-xs text-zinc-400 mt-0.5">Marcá los productos agotados para el día de hoy.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              onClick={resetAllAvailability}
              className="bg-zinc-800 hover:bg-zinc-700 text-white flex-1 md:flex-initial py-5 text-xs font-bold uppercase gap-2 rounded-xl"
            >
              <RotateCcw size={14} />
              Resetear todo
            </Button>
            <Button
              variant="destructive"
              onClick={() => setIsAuthenticated(false)}
              className="flex-1 md:flex-initial py-5 text-xs font-bold uppercase gap-2 rounded-xl"
            >
              <LogOut size={14} />
              Salir
            </Button>
          </div>
        </div>

        {/* Listado agrupado por categorías */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-8">
          {["Promos", "Clásicas", "Especiales", "Bebidas"].map((category) => {
            const items = MENU_ITEMS.filter(i => i.category === category);
            return (
              <div key={category} className="space-y-4">
                <h3 className="text-xs font-black tracking-widest uppercase text-zinc-400 border-b border-zinc-800 pb-2">
                  {category === 'Bebidas' ? 'Bebidas y Vinos' : category}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {items.map((item) => {
                    const isAvailable = availability[item.id] !== false;
                    return (
                      <div 
                        key={item.id}
                        className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                          isAvailable 
                            ? "bg-zinc-950/40 border-zinc-850" 
                            : "bg-red-950/10 border-red-950/50"
                        }`}
                      >
                        <div className="space-y-0.5 min-w-0 pr-4">
                          <span className="font-bold text-sm text-white block truncate">{item.name}</span>
                          <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{item.category}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleAvailability(item.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${
                            isAvailable
                              ? "bg-emerald-950/20 text-emerald-400 border-emerald-900 hover:bg-emerald-950/40"
                              : "bg-red-950/20 text-[#E52321] border-red-900 hover:bg-red-950/40"
                          }`}
                        >
                          {isAvailable ? (
                            <>
                              <CheckCircle size={12} />
                              Disponible
                            </>
                          ) : (
                            <>
                              <XCircle size={12} />
                              Agotado
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Admin;