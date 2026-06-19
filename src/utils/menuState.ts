import { PizzaItem } from '../types/pizza';

const BASE_MENU_ITEMS: PizzaItem[] = [
  // --- PROMOS ---
  {
    id: 'p1',
    name: 'Combo Amigos',
    description: '2 Pizzas Muzzarella Clásicas + 1 Coca-Cola Sabor Original 1.5L helada. ¡La cena ideal resuelta!',
    price: 18500,
    category: 'Promos',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p2',
    name: 'La de la Casa',
    description: '1 Especial Tomino (nuestra obra de arte) + 1 Cerveza Quilmes Clásica de Litro en punto nieve.',
    price: 15500,
    category: 'Promos',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p3',
    name: 'Promo Mundial',
    description: '2 Fugazzas con Queso doradas al oliva + 1 Cerveza Imperial Especial de Litro bien helada.',
    price: 20000,
    category: 'Promos',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80'
  },
  // --- CLÁSICAS ---
  {
    id: '1',
    name: 'Muzzarella Clásica',
    description: 'Salsa de tomate artesanal secreta, muzzarella de exportación gratinada, aceitunas verdes mendocinas y orégano puro.',
    price: 8500,
    category: 'Clásicas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    name: 'Fugazza con Queso',
    description: 'Abundante muzzarella, cebolla dulce cortada en pluma tiernizada al oliva, parmesano rallado y aceitunas negras.',
    price: 8900,
    category: 'Clásicas',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: 'Napolitana',
    description: 'Colchón de muzzarella fundida, rodajas de tomate fresco seleccionado, ajo picado, albahaca fresca y aceite de oliva.',
    price: 9200,
    category: 'Clásicas',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    name: 'Jamón y Morrón',
    description: 'Salsa de tomate casera, muzzarella, jamón cocido seleccionado en fetas y tiras de morrón asado de la casa.',
    price: 9800,
    category: 'Clásicas',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    name: 'Calabresa',
    description: 'Salsa de tomate, muzzarella premium, rodajas de cantimpalo / calabresa artesanal, especias y aceitunas.',
    price: 9900,
    category: 'Clásicas',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    name: 'Fugazzeta Rellena',
    description: 'Doble masa artesanal rellena de jamón cocido y muzzarella fundente, cubierta con cebollas doradas y parmesano.',
    price: 12500,
    category: 'Clásicas',
    image: 'https://images.unsplash.com/photo-1571066811602-71683a3f680d?auto=format&fit=crop&w=800&q=80'
  },
  // --- ESPECIALES ---
  {
    id: '7',
    name: 'Rúcula y Jamón Crudo',
    description: 'Muzzarella, jamón crudo premium de la zona, rúcula selvática fresca y lluvia de lascas de parmesano.',
    price: 12500,
    category: 'Especiales',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '8',
    name: 'Cuatro Quesos',
    description: 'Una sutil y potente combinación de muzzarella, provolone gratinado, queso azul premium y parmesano rallado.',
    price: 12000,
    category: 'Especiales',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '9',
    name: 'Provolone Premium',
    description: 'Salsa de tomate, colchón de muzzarella, abundante queso provolone gratinado al horno de piedra, oliva y especias.',
    price: 11500,
    category: 'Especiales',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '10',
    name: 'Roquefort y Apio',
    description: 'Muzzarella fundida, abundante queso azul de selección desgranado, apio crocante picado fino e hilos de oliva.',
    price: 11800,
    category: 'Especiales',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '11',
    name: 'Palmitos Especial',
    description: 'Muzzarella, jamón cocido artesanal, palmitos seleccionados enteros en rodajas finas y salsa golf casera premium.',
    price: 12200,
    category: 'Especiales',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '12',
    name: 'Especial Tomino',
    description: 'Nuestra obra de arte: Muzzarella, jamón cocido, huevo duro desgranado, tiras de morrón asado, aceitunas negras y orégano.',
    price: 13000,
    category: 'Especiales',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80'
  },
  // --- BEBIDAS ---
  {
    id: '13',
    name: 'Coca-Cola Original 1.5L',
    description: 'Gaseosa original de 1.5 litros en envase retornable/no descartable bien helada.',
    price: 3500,
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '14',
    name: 'Sprite Lima-Limón 1.5L',
    description: 'Refrescante sabor lima-limón helado, ideal para acompañar tus pizzas.',
    price: 3500,
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '15',
    name: 'Cerveza Quilmes Clásica 1L',
    description: 'Cerveza tradicional de litro en envase de vidrio, servida bajo cero en punto nieve.',
    price: 4000,
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '21',
    name: 'Agua Mineral sin Gas 500ml',
    description: 'Agua mineral natural helada purificada de vertiente para acompañar tu menú.',
    price: 1800,
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=80'
  }
];

export const getMenuItems = (): PizzaItem[] => {
  const savedPrices = localStorage.getItem('tomino_custom_prices');
  if (!savedPrices) return BASE_MENU_ITEMS;

  try {
    const customPrices = JSON.parse(savedPrices);
    return BASE_MENU_ITEMS.map(item => ({
      ...item,
      price: customPrices[item.id] !== undefined ? customPrices[item.id] : item.price
    }));
  } catch (e) {
    return BASE_MENU_ITEMS;
  }
};

export const saveCustomPrice = (id: string, newPrice: number) => {
  const savedPrices = localStorage.getItem('tomino_custom_prices');
  const currentPrices = savedPrices ? JSON.parse(savedPrices) : {};
  currentPrices[id] = newPrice;
  localStorage.setItem('tomino_custom_prices', JSON.stringify(currentPrices));
};

export const resetAllMenuModifications = () => {
  localStorage.removeItem('tomino_custom_prices');
  localStorage.removeItem('tomino_menu_availability');
};