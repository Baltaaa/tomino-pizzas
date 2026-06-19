"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TominoLogo } from '../components/TominoLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { getMenuItems, saveCustomPrice, resetAllMenuModifications } from '../utils/menuState';
import { 
  ShieldAlert, LogOut, CheckCircle, XCircle, RotateCcw, ArrowLeft, 
  Search, DollarSign, Store, Pizza, TrendingUp, Users, ShoppingBag 
} from 'lucide-react';

interface MenuAvailability {
  [id: string]: boolean;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  
  // Estados de catálogo modificable
  const [menuItems, setMenuItems] = useState(getMenuItems());
  const [availability, setAvailability] = useState<MenuAvailability>({});
  const [editingPrices, setEditingPrices] = useState<{[id: string]: string}>({});

  // Cocina Abierta / Cerrada global
  const [isKitchenClosed, setIsKitchenClosed] = useState(false);

  const navigate = useNavigate();

  // Carga de configuraciones guardadas
  useEffect(() => {
    // Disponibilidad
    const savedAv = localStorage.getItem('tomino_menu_availability');
    if (savedAv) {
      setAvailability(JSON.parse(savedAv));
    } else {
      const initial: MenuAvailability = {};
      menuItems.forEach(item => {
        initial[item.id] = true;
      });
      setAvailability(initial);
    }

    // Estado cocina
    const savedKitchen = localStorage.getItem('tomino_kitchen_closed');
    setIsKitchenClosed(savedKitchen === 'true');
  }, [menuItems]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'tomino2024') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Contraseña incorrecta. Intente nuevamente.');
    }
  };

  const handleToggleKitchen = (checked: boolean) => {
    setIsKitchenClosed(!checked); // checked=true -> cocina abierta -> closed=false
    localStorage.setItem('tomino_kitchen_closed', (!checked).toString());
  };

  const toggleAvailability = (id: string) => {
    const updated = {
      ...availability,
      [id]: availability[id] === undefined ? false : !availability[id]
    };
    setAvailability(updated);
    localStorage.setItem('tomino_menu_availability', JSON.stringify(updated));
  };

  const handlePriceChange = (id: string, val: string) => {
    setEditingPrices(prev => ({ ...prev, [id]: val }));
  };

  const handleSavePrice = (id: string) => {
    const parsedPrice = Math.round(parseFloat(editingPrices[id]));
    if (!isNaN(parsedPrice) && parsedPrice > 0) {
      saveCustomPrice(id, parsedPrice);
      // Recargar menú de utils para reflejar precios en UI
      setMenuItems(getMenuItems());
    }
  };

  const resetAll = () => {
    resetAllMenuModifications();
    localStorage.removeItem('tomino_kitchen_closed');
    setIsKitchenClosed(false);
    setMenuItems(getMenuItems());
    const initial: MenuAvailability = {};
    getMenuItems().forEach(item => {
      initial[item.id] = true;
    });
    setAvailability(initial);
    setEditingPrices({});
  };

  // Filtrado de ítems para el dashboard
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Cabecera del Panel */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#E52321]/10 rounded-2xl text-[#E52321] shrink-0 border border-[#E52321]/20">
              <ShieldAlert size={28} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">Dashboard General</h1>
              <p className="text-xs text-zinc-400 mt-0.5">Gestión de cocina, precios y disponibilidad en tiempo real.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              onClick={resetAll}
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

        {/* Módulos de Analíticas y Control Cocina */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* CONTROL ESTADO COCINA */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Estado de Cocina</span>
              <Store className={isKitchenClosed ? "text-red-500" : "text-emerald-500"} size={18} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-white">
                {isKitchenClosed ? "Cocina Cerrada" : "Cocina Abierta"}
              </h3>
              <p className="text-[10px] text-zinc-500">Afecta el botón de realizar pedidos.</p>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
              <Switch 
                checked={!isKitchenClosed} 
                onCheckedChange={handleToggleKitchen} 
              />
              <span className="text-xs font-bold">{isKitchenClosed ? "Abrir Cocina" : "Cerrar Cocina"}</span>
            </div>
          </div>

          {/* TOTAL ESTIMADO INGRESOS */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Ingresos Hoy</span>
              <TrendingUp className="text-emerald-500" size={18} />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-emerald-400">$148.500</h3>
              <p className="text-[10px] text-zinc-500">Estimación en base a clics de pedidos.</p>
            </div>
            <span className="text-[10px] text-zinc-400 bg-emerald-950/30 px-2 py-1 rounded border border-emerald-900/30 self-start">
              +15% que ayer
            </span>
          </div>

          {/* PEDIDOS DEL DIA */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Pedidos Recibidos</span>
              <ShoppingBag className="text-sky-500" size={18} />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-white">18 Pedidos</h3>
              <p className="text-[10px] text-zinc-500">Comandados vía WhatsApp.</p>
            </div>
            <span className="text-[10px] text-zinc-400 bg-zinc-950 px-2 py-1 rounded border border-zinc-850 self-start">
              Promedio: $8.250 c/u
            </span>
          </div>

          {/* PLATO ESTRELLA */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Más Vendido</span>
              <Pizza className="text-amber-500" size={18} />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-white truncate">Muzzarella Clásica</h3>
              <p className="text-[10px] text-zinc-500">Hoy fue pedida 9 veces.</p>
            </div>
            <span className="text-[10px] text-zinc-400 bg-amber-950/20 px-2 py-1 rounded border border-amber-900/30 self-start">
              Favorito indiscutido
            </span>
          </div>
          
        </div>

        {/* Gestor del catálogo con buscador y selector de precios */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <h2 className="text-lg font-black uppercase text-white flex items-center gap-2">
              <Pizza size={20} className="text-[#E52321]" /> Gestor del Menú
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              {/* Buscador */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-850 text-white text-xs py-2 px-3 pl-9 rounded-xl focus:outline-none focus:border-[#E52321]"
                />
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              </div>

              {/* Categorías */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto bg-zinc-950 border border-zinc-850 text-white text-xs py-2 px-3 rounded-xl focus:outline-none focus:border-[#E52321]"
              >
                {['Todas', 'Promos', 'Clásicas', 'Especiales', 'Bebidas'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map(item => {
              const isAvailable = availability[item.id] !== false;
              const currentEditPrice = editingPrices[item.id] !== undefined 
                ? editingPrices[item.id] 
                : item.price.toString();

              return (
                <div 
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isAvailable 
                      ? "bg-zinc-950/30 border-zinc-850 hover:border-zinc-800" 
                      : "bg-red-950/10 border-red-950/30"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-white truncate block">{item.name}</span>
                        <span className="text-[8px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded font-black uppercase">{item.category}</span>
                      </div>
                      
                      {/* Gestor interactivo de precios directos */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="text-[10px] text-zinc-500">Precio:</span>
                        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-0.5 max-w-[120px]">
                          <span className="text-zinc-500 text-xs">$</span>
                          <input
                            type="number"
                            value={currentEditPrice}
                            onChange={(e) => handlePriceChange(item.id, e.target.value)}
                            onBlur={() => handleSavePrice(item.id)}
                            className="bg-transparent border-0 text-white text-xs focus:outline-none w-full pl-1 font-bold"
                          />
                        </div>
                        {editingPrices[item.id] !== undefined && (
                          <button 
                            onClick={() => handleSavePrice(item.id)}
                            className="text-[9px] bg-[#E52321] text-white px-2 py-1 rounded hover:bg-red-700 font-bold"
                          >
                            Guardar
                          </button>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleAvailability(item.id)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all border shrink-0 ${
                        isAvailable
                          ? "bg-emerald-950/20 text-emerald-400 border-emerald-900 hover:bg-emerald-950/40"
                          : "bg-red-950/20 text-[#E52321] border-red-900 hover:bg-red-950/40"
                      }`}
                    >
                      {isAvailable ? (
                        <>
                          <CheckCircle size={10} />
                          Disponible
                        </>
                      ) : (
                        <>
                          <XCircle size={10} />
                          Agotado
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;