import { PizzaItem } from '../types/pizza';

const BASE_MENU_ITEMS: PizzaItem[] = [
  // --- PROMOS (Secciones pre-establecidas) ---
  {
    id: 'promo_combo_amigos',
    name: 'Combo Amigos',
    description: '2 Pizzas Muzzarella Clásicas + 1 Coca-Cola Sabor Original 1.5L helada. ¡La cena ideal resuelta!',
    price: 18500,
    category: 'Promos',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'promo_la_de_la_casa',
    name: 'La de la Casa',
    description: '1 Especial Tomino + 1 Cerveza Quilmes Clásica de Litro en punto nieve.',
    price: 15500,
    category: 'Promos',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80'
  },

  // --- ENTRADAS (10 items) ---
  {
    id: 'entradas_fugazzeta_rellena',
    name: 'Fugazzeta Rellena',
    description: 'Deliciosa porción de masa rellena con abundante queso mozzarella y cebollas caramelizadas doradas.',
    price: 3200,
    category: 'entradas',
    image: 'https://images.unsplash.com/photo-1571066811602-71683a3f680d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'entradas_faina',
    name: 'Faína',
    description: 'Porción clásica a base de harina de garbanzos, ideal para acompañar tu porción de pizza.',
    price: 1500,
    category: 'entradas',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'entradas_papas_fritas',
    name: 'Papas Fritas',
    description: 'Porción de papas fritas clásicas, crujientes por fuera y tiernas por dentro.',
    price: 3800,
    category: 'entradas',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'entradas_papas_con_cheddar',
    name: 'Papas con Cheddar y Panceta',
    description: 'Porción abundante de papas fritas bañadas en salsa cheddar fundida y crocante panceta picada.',
    price: 4900,
    category: 'entradas',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'entradas_papas_con_crema',
    name: 'Papas con Crema, Verdeo y Panceta',
    description: 'Porción de papas con suave crema de leche aromatizada con cebollita de verdeo fresca y panceta grillada.',
    price: 5200,
    category: 'entradas',
    image: 'https://images.unsplash.com/photo-1518013041235-0133b289486b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'entradas_papas_bravas',
    name: 'Papas Bravas',
    description: 'Porción de papas doradas acompañadas de nuestra icónica salsa picante e infusión de especias.',
    price: 4200,
    category: 'entradas',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'entradas_papas_mortal',
    name: 'Papas Mortal',
    description: 'La bomba de la casa: panceta crocante y huevos fritos servidos sobre una montaña de papas fritas.',
    price: 5800,
    category: 'entradas',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'entradas_rabas',
    name: 'Rabas',
    description: 'Anillos de calamar tiernizados, rebozados y fritos a la perfección. Acompañados de gajos de limón.',
    price: 9500,
    category: 'entradas',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'entradas_cornalitos',
    name: 'Cornalitos',
    description: 'Porción crujiente de cornalitos fritos al limón, un clásico imperdible del mar.',
    price: 6500,
    category: 'entradas',
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'entradas_tabla_de_mar',
    name: 'Tabla de Mar',
    description: 'Porción de rabas tiernas, cornalitos crujientes y papas fritas doradas. ¡Comen 4 pican todos!',
    price: 16000,
    category: 'entradas',
    image: 'https://images.unsplash.com/photo-1534080391025-a87b9959410d?auto=format&fit=crop&w=800&q=80'
  },

  // --- EMPANADAS (6 items) ---
  {
    id: 'empanada_carne',
    name: 'Empanada de Carne',
    description: 'Relleno jugoso de carne vacuna seleccionada con condimentos tradicionales criollos, 100% artesanal.',
    price: 1500,
    category: 'empanadas',
    image: 'https://images.unsplash.com/photo-1557925916-43b3558c4fcc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'empanada_jamon_queso',
    name: 'Empanada de Jamón y Queso',
    description: 'Combinación perfecta de jamón cocido picado y queso mozzarella suave gratinado.',
    price: 1500,
    category: 'empanadas',
    image: 'https://images.unsplash.com/photo-1557925916-43b3558c4fcc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'empanada_capresse',
    name: 'Empanada Capresse',
    description: 'Deliciosa empanada rellena de mozzarella fundida, tomates secos cubeteados y albahaca fresca.',
    price: 1500,
    category: 'empanadas',
    image: 'https://images.unsplash.com/photo-1557925916-43b3558c4fcc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'empanada_cortada_cuchillo',
    name: 'Empanada de Carne Cortada a Cuchillo',
    description: 'Receta casera premium con carne cortada pacientemente a mano, cebolla de verdeo y huevo.',
    price: 1700,
    category: 'empanadas',
    image: 'https://images.unsplash.com/photo-1557925916-43b3558c4fcc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'empanada_pollo',
    name: 'Empanada de Pollo',
    description: 'Suprema de pollo desmenuzada, salteada con vegetales frescos y un toque de comino y morrón.',
    price: 1500,
    category: 'empanadas',
    image: 'https://images.unsplash.com/photo-1557925916-43b3558c4fcc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'empanada_roquefort',
    name: 'Empanada de Roquefort',
    description: 'Para los amantes del queso fuerte: intenso queso azul matizado con mozzarella y jamón fino.',
    price: 1600,
    category: 'empanadas',
    image: 'https://images.unsplash.com/photo-1557925916-43b3558c4fcc?auto=format&fit=crop&w=800&q=80'
  },

  // --- LA GIGANTE (7 items) ---
  {
    id: 'gigante_de_primera',
    name: 'Gigante de Primera',
    description: 'La reina de la casa en sus variantes más queridas: Mozzarella, Especial, Napolitana o Mortal.',
    price: 16500,
    category: 'la_gigante',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gigante_2_sabores',
    name: 'Gigante 2 Sabores',
    description: 'Mitad y mitad clásica para compartir en familia. Combinación: Mozzarella y Especial.',
    price: 15900,
    category: 'la_gigante',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gigante_a_eleccion',
    name: 'Gigante a Elección',
    description: 'Diseñá tu gigante combinando los ingredientes que más te gusten a tu medida.',
    price: 18000,
    category: 'la_gigante',
    image: 'https://images.unsplash.com/photo-1571066811602-71683a3f680d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gigante_para_exigentes',
    name: 'Gigante para Exigentes',
    description: 'Sabores seleccionados: Ananá agridulce, Capresse aromática, Palmitos premium o cuatro quesos.',
    price: 19500,
    category: 'la_gigante',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gigante_de_cancha',
    name: 'Gigante de Cancha',
    description: 'Clásicos bien de barrio: Anchoas saladas, Calabresa, abundante Mozzarella o rodajas de tomate Napolitana.',
    price: 17200,
    category: 'la_gigante',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gigante_6_sabores',
    name: 'Gigante de 6 Sabores',
    description: 'La de máxima variedad: Porciones de Mozzarella, Especial, Napolitana, Calabresa, Rúcula y Mortal.',
    price: 21500,
    category: 'la_gigante',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gigante_tomino',
    name: 'Gigante Tomino',
    description: 'Nuestra combinación estelar: Americana con papas, Mortal con huevos fritos, Muzzarella y Cuatro Quesos.',
    price: 22000,
    category: 'la_gigante',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80'
  },

  // --- NUESTRAS PIZZAS (35 items con variante Entera/Media) ---
  {
    id: 'pizza_mozzarella',
    name: 'Mozzarella',
    description: 'Salsa de tomate, mozzarella, aceitunas y orégano',
    price: 8500,
    priceHalf: 4500,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_morron',
    name: 'Morrón',
    description: 'Salsa de tomate, mozzarella y morrones asados en tiras.',
    price: 9200,
    priceHalf: 4800,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_anchoas',
    name: 'Anchoas',
    description: 'Salsa de tomate y anchoas seleccionadas en conserva de oliva.',
    price: 8900,
    priceHalf: 4700,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_anchoas_con_queso',
    name: 'Anchoas con Queso',
    description: 'Salsa de tomate, colchón de mozzarella gratinada y anchoas.',
    price: 9800,
    priceHalf: 5200,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_jamon',
    name: 'Jamón',
    description: 'Salsa de tomate, mozzarella y jamón cocido natural seleccionado en fetas.',
    price: 9200,
    priceHalf: 4800,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1571066811602-71683a3f680d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_especial',
    name: 'Especial',
    description: 'Salsa de tomate, mozzarella, jamón, morrones y aceitunas',
    price: 9800,
    priceHalf: 5100,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_especial_completa',
    name: 'Especial Completa',
    description: 'Salsa de tomate, mozzarella, jamón, morrones, aceitunas y anchoas',
    price: 11000,
    priceHalf: 5800,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_italiana',
    name: 'Italiana',
    description: 'Salsa de tomate, mozzarella, morrones, orégano y aceitunas verdes.',
    price: 9500,
    priceHalf: 5000,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_napolitana',
    name: 'Napolitana',
    description: 'Salsa de tomate, mozzarella, orégano, rodajas de tomate y provenzal',
    price: 9200,
    priceHalf: 4900,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_napo_especial',
    name: 'Napo Especial',
    description: 'Salsa de tomate, mozzarella, jamón, rodajas de tomate, morrones, aceitunas y provenzal',
    price: 10500,
    priceHalf: 5500,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_atun',
    name: 'Atún',
    description: 'Salsa de tomate, mozzarella, lomos de atún, morrones colorados y huevo duro desgranado.',
    price: 11500,
    priceHalf: 6000,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_huevo',
    name: 'Huevo',
    description: 'Salsa de tomate, mozzarella fundente y una abundante lluvia de huevo picado.',
    price: 9100,
    priceHalf: 4800,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_cebolla',
    name: 'Cebolla',
    description: 'Abundante cebolla dulce caramelizada, mozzarella y orégano',
    price: 8900,
    priceHalf: 4700,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_provolone',
    name: 'Provolone',
    description: 'Salsa de tomate, mozzarella, provolone gratinado, jamón y aceitunas negras',
    price: 11500,
    priceHalf: 6000,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_calabresa',
    name: 'Calabresa',
    description: 'Salsa de tomate, mozzarella, longaniza, aceitunas negras y orégano',
    price: 9900,
    priceHalf: 5200,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_roquefort',
    name: 'Roquefort',
    description: 'Salsa de tomate, mozzarella, roquefort premium, aceitunas negras y jamón cocido.',
    price: 11800,
    priceHalf: 6100,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_palmitos',
    name: 'Palmitos',
    description: 'Salsa de tomate, mozzarella, jamón, morrones, palmitos, huevo y salsa golf',
    price: 12200,
    priceHalf: 6300,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_cuatro_quesos',
    name: 'Cuatro Quesos',
    description: 'Salsa de tomate, mozzarella, roquefort, gruyere y parmesano',
    price: 12000,
    priceHalf: 6200,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_anana',
    name: 'Ananá',
    description: 'Salsa de tomate, mozzarella, jamón crudo, aceitunas negras, ananá y azúcar negra gratinada',
    price: 12500,
    priceHalf: 6500,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_de_la_casa',
    name: 'De la Casa',
    description: 'Salsa de tomate, mozzarella, roquefort, panceta y aceitunas negras',
    price: 11900,
    priceHalf: 6100,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_capresse',
    name: 'Capresse',
    description: 'Salsa de tomate, mozzarella, rodajas de tomate, albahaca y queso parmesano',
    price: 9500,
    priceHalf: 5000,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_cuatro_quesos_especial',
    name: 'Cuatro Quesos Especial',
    description: 'Salsa de tomate, mozzarella, roquefort, gruyere, parmesano, jamón, morrones y aceitunas',
    price: 13500,
    priceHalf: 7000,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_gloriosa',
    name: 'Gloriosa',
    description: 'Salsa de tomate, mozzarella, jamón crudo, palmitos, huevo, morrones y salsa golf',
    price: 13200,
    priceHalf: 6805,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_sarmientista',
    name: 'Sarmientista',
    description: 'Salsa de tomate, mozzarella, aceitunas verdes, albahaca y ¡MUCHO HUEVOOOO!',
    price: 9900,
    priceHalf: 5200,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_mortal',
    name: 'Mortal',
    description: 'Salsa de tomate, mozzarella, panceta crocante de la casa y huevos fritos tiernos.',
    price: 12500,
    priceHalf: 6500,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_salpicon',
    name: 'Salpicón',
    description: 'Salsa de tomate, mozzarella, jamón, aceitunas verdes y negras, morrones y anchoas (todo cortado)',
    price: 11500,
    priceHalf: 6000,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_rucula',
    name: 'Rúcula',
    description: 'Salsa de tomate, mozzarella, jamón crudo, rúcula fresca y parmesano en lascas.',
    price: 12500,
    priceHalf: 6500,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_tomino',
    name: 'Tomino',
    description: 'Salsa de tomate, mozzarella, jamón, rodajas de tomate, huevo picado, morrones, aceitunas negras, anchoas y salsa provenzal',
    price: 13000,
    priceHalf: 6800,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_divorcio',
    name: 'Divorcio',
    description: 'Salsa de tomate, mozzarella, roquefort intenso, anchoas y ajo tierno.',
    price: 12000,
    priceHalf: 6200,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_vegetariana',
    name: 'Vegetariana',
    description: 'Salsa de tomate, mozzarella, vegetales salteados al wok con aceite de oliva y semillas de chía y lino',
    price: 10500,
    priceHalf: 5500,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_pollo',
    name: 'Pollo',
    description: 'Salsa de tomate, mozzarella, pollo salteado con vegetales, salsa blanca y aceitunas negras',
    price: 11200,
    priceHalf: 5800,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1557925916-43b3558c4fcc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_especial_huevo',
    name: 'Especial de Huevo',
    description: 'Salsa de tomate, mozzarella, jamón cocido, huevo duro picado, morrones asados y aceitunas.',
    price: 10500,
    priceHalf: 5500,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_de_cancha',
    name: 'De Cancha',
    description: 'Doble salsa de tomate artesanal ultra condimentada, ajo silvestre y aceitunas verdes.',
    price: 7500,
    priceHalf: 3900,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_cebolla_especial',
    name: 'Cebolla Especial',
    description: 'Cebolla caramelizada, mozzarella, roquefort desgranado, morrones, aceitunas negras y orégano.',
    price: 11000,
    priceHalf: 5700,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_americana',
    name: 'Americana',
    description: 'Salsa de tomate, mozzarella, queso cheddar fundido, panceta ahumada y papas fritas doradas.',
    price: 12800,
    priceHalf: 6600,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza_pelotero',
    name: 'Pelotero',
    description: 'Salsa de tomate, mozzarella, papas fritas, salchichas grilladas y lluvia de kétchup.',
    price: 11200,
    priceHalf: 5800,
    category: 'pizzas',
    hasVariants: true,
    variantType: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },

  // --- POSTRES (9 items) ---
  {
    id: 'postre_3_gustos',
    name: 'Postre 3 Gustos',
    description: 'Tres deliciosos gustos de helado artesanal seleccionados.',
    price: 3200,
    category: 'postres',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'postre_almendrado',
    name: 'Almendrado',
    description: 'Clásica barra de helado de crema cubierto con crocantes almendras tostadas.',
    price: 3500,
    category: 'postres',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'postre_nevado',
    name: 'Nevado',
    description: 'Helado de vainilla bañado en chocolate blanco y ralladura de coco.',
    price: 3500,
    category: 'postres',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'postre_cucurucho',
    name: 'Cucurucho Helado',
    description: 'Crocante cono de oblea con dos bochas gigantes de helado artesanal.',
    price: 2800,
    category: 'postres',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'postre_bombon_suizo',
    name: 'Bombón Suizo',
    description: 'Helado de dulce de leche bañado en chocolate semiamargo crujiente.',
    price: 3600,
    category: 'postres',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'postre_bombon_escoces',
    name: 'Bombón Escocés',
    description: 'Helado de crema americana con corazón de dulce de leche y baño de chocolate.',
    price: 3600,
    category: 'postres',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'postre_tiramisu',
    name: 'Tiramisú',
    description: 'Bizcochuelo embebido en café expreso con crema de mascarpone y cacao.',
    price: 4500,
    category: 'postres',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'postre_flan',
    name: 'Flan con Dulce de Leche',
    description: 'Exquisito flan casero de vainilla con un generoso copón de dulce de leche.',
    price: 3000,
    category: 'postres',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'postre_frutillas',
    name: 'Frutillas con Crema',
    description: 'Frutillas frescas seleccionadas acompañadas de crema de leche batida artesanal.',
    price: 4000,
    category: 'postres',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80'
  },

  // --- VINOS (13 items, divididos en subsecciones) ---
  {
    id: 'vino_zorro_salvaje',
    name: 'Zorro Salvaje Malbec',
    description: 'Excelente cuerpo e intensidad, notas frutales ideales para acompañar carnes o pizzas.',
    price: 6500,
    category: 'vinos',
    subcategory: 'Tintos',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vino_alma_malbec',
    name: 'Alma Malbec',
    description: 'Sutil Malbec de guarda, equilibrado y con final persistente.',
    price: 7800,
    category: 'vinos',
    subcategory: 'Tintos',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vino_casa_agostino',
    name: 'Casa Agostino',
    description: 'Vino de autor complejo, de taninos redondos y gran bouquet.',
    price: 9500,
    category: 'vinos',
    subcategory: 'Tintos',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vino_cosecha_nocturna',
    name: 'Cosecha Nocturna',
    description: 'Notas maderosas exclusivas cosechadas en su punto ideal de frío nocturno.',
    price: 8500,
    category: 'vinos',
    subcategory: 'Tintos',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vino_otro_loco_mas',
    name: 'Otro Loco Más',
    description: 'Un Malbec rebelde, joven, fresco y muy frutal de trago fácil.',
    price: 6000,
    category: 'vinos',
    subcategory: 'Tintos',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vino_dada',
    name: 'Dadá',
    description: 'Estilo vanguardista con toques de vainilla o cacao muy marcados.',
    price: 6800,
    category: 'vinos',
    subcategory: 'Tintos',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vino_luigi_bosca',
    name: 'Luigi Bosca',
    description: 'Gran exponente de la vitivinicultura mendocina de alta gama.',
    price: 14500,
    category: 'vinos',
    subcategory: 'Tintos',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vino_alma_mora',
    name: 'Alma Mora',
    description: 'Aromas a frutos negros maduros con una acidez equilibrada.',
    price: 5800,
    category: 'vinos',
    subcategory: 'Tintos',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vino_de_la_casa',
    name: 'Vino de la Casa',
    description: 'Vino tradicional de selección servido por copa o jarra.',
    price: 3500,
    category: 'vinos',
    subcategory: 'Tintos',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vino_etchart',
    name: 'Etchart Torrontés',
    description: 'Blanco salteño joven, intensamente aromático y fresco.',
    price: 4800,
    category: 'vinos',
    subcategory: 'Blancos',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vino_churita_torrontes',
    name: 'La Churita Torrontés',
    description: 'De frescura cítrica y notas florales irresistibles para días cálidos.',
    price: 5500,
    category: 'vinos',
    subcategory: 'Blancos',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vino_blanco_dulce',
    name: 'Blanco Dulce',
    description: 'Suave, frutado y con el dulzor perfecto ideal como postre o aperitivo.',
    price: 5000,
    category: 'vinos',
    subcategory: 'Blancos',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vino_moscato',
    name: 'Moscato',
    description: 'El clásico inseparable de la pizza de molde porteña.',
    price: 4500,
    category: 'vinos',
    subcategory: 'Blancos',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80'
  },

  // --- BEBIDAS CON ALCOHOL (22 items divididos en subsecciones) ---
  {
    id: 'cerveza_1_pinta',
    name: 'Cerveza Tirada 1 Pinta',
    description: 'Copa de cerveza artesanal tirada bien fría - 500cc',
    price: 2500,
    category: 'cervezas_con_alcohol',
    subcategory: 'Cerveza Artesanal Tirada',
    image: 'https://images.unsplash.com/photo-1566633809597-43d522f964de?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cerveza_2_pintas',
    name: 'Cerveza Tirada 2 Pintas',
    description: 'Promo imperdible de 2 pintas tiradas de 500cc en punto nieve.',
    price: 4500,
    category: 'cervezas_con_alcohol',
    subcategory: 'Cerveza Artesanal Tirada',
    image: 'https://images.unsplash.com/photo-1566633809597-43d522f964de?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cerveza_1_jarra',
    name: 'Cerveza Tirada 1 Jarra',
    description: 'Jarra XL de cerveza artesanal tirada para compartir - 1,250 Litros',
    price: 5500,
    category: 'cervezas_con_alcohol',
    subcategory: 'Cerveza Artesanal Tirada',
    image: 'https://images.unsplash.com/photo-1566633809597-43d522f964de?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cerveza_heineken_1l',
    name: 'Heineken 1L',
    description: 'Cerveza premium internacional rubia de gran pureza - Botella de Litro',
    price: 4500,
    category: 'cervezas_con_alcohol',
    subcategory: 'Cerveza Industrial',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cerveza_imperial_1l',
    name: 'Imperial 1L',
    description: 'Cerveza clásica industrial nacional en envase retornable de Litro.',
    price: 3800,
    category: 'cervezas_con_alcohol',
    subcategory: 'Cerveza Industrial',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cerveza_imperial_roja_1l',
    name: 'Imperial Roja 1L',
    description: 'De maltas tostadas que otorgan un color cobrizo y notas de caramelo - 1L',
    price: 4000,
    category: 'cervezas_con_alcohol',
    subcategory: 'Cerveza Industrial',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cerveza_imperial_negra_1l',
    name: 'Imperial Negra 1L',
    description: 'De sabor robusto con dejos de café y chocolate - 1L',
    price: 4000,
    category: 'cervezas_con_alcohol',
    subcategory: 'Cerveza Industrial',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cerveza_imperial_apa_1l',
    name: 'Imperial APA 1L',
    description: 'Cerveza de lúpulo aromático y amargor equilibrado muy refrescante - 1L',
    price: 4200,
    category: 'cervezas_con_alcohol',
    subcategory: 'Cerveza Industrial',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cerveza_imperial_ipa_1l',
    name: 'Imperial IPA 1L',
    description: 'Intensamente lupulada con amargor marcado tradicional - 1L',
    price: 4200,
    category: 'cervezas_con_alcohol',
    subcategory: 'Cerveza Industrial',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cerveza_miller_1l',
    name: 'Miller 1L',
    description: 'Cerveza norteamericana suave, de trago ligero filtrada en frío de Litro.',
    price: 4300,
    category: 'cervezas_con_alcohol',
    subcategory: 'Cerveza Industrial',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cerveza_grolsch_1l',
    name: 'Grolsch 1L',
    description: 'Premium internacional de receta holandesa, amargor fino y limpio - 1L',
    price: 4800,
    category: 'cervezas_con_alcohol',
    subcategory: 'Cerveza Industrial',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cerveza_sol',
    name: 'Sol Botella',
    description: 'Cerveza mexicana refrescante, de sabor sutil con un toque cítrico.',
    price: 3200,
    category: 'cervezas_con_alcohol',
    subcategory: 'Cerveza Industrial',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cerveza_antares_500',
    name: 'Antares 500cc',
    description: 'Prestigiosa cerveza artesanal envasada de Mar del Plata - Variedades',
    price: 3800,
    category: 'cervezas_con_alcohol',
    subcategory: 'Cerveza Industrial',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cerveza_corona_710',
    name: 'Corona 710cc',
    description: 'Cerveza mexicana refrescante en su formato familiar ideal para compartir con limón.',
    price: 4900,
    category: 'cervezas_con_alcohol',
    subcategory: 'Cerveza Industrial',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cerveza_lata_imperial_500',
    name: 'Lata Imperial 500cc',
    description: 'Práctica lata de Imperial Golden - 500cc',
    price: 2000,
    category: 'cervezas_con_alcohol',
    subcategory: 'Cerveza Industrial',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cerveza_lata_imperial_roja',
    name: 'Lata Imperial Roja 500cc',
    description: 'Lata de Imperial Roja maltosa - 500cc',
    price: 2200,
    category: 'cervezas_con_alcohol',
    subcategory: 'Cerveza Industrial',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cerveza_lata_imperial_negra',
    name: 'Lata Imperial Negra 500cc',
    description: 'Lata de Imperial Cream Stout - 500cc',
    price: 2200,
    category: 'cervezas_con_alcohol',
    subcategory: 'Cerveza Industrial',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cerveza_lata_heineken',
    name: 'Lata Heineken 500cc',
    description: 'Heineken de calidad original en lata - 500cc',
    price: 2500,
    category: 'cervezas_con_alcohol',
    subcategory: 'Cerveza Industrial',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cerveza_lata_imperial_apa',
    name: 'Lata Imperial APA 500cc',
    description: 'Lata lupulada aromática - 500cc',
    price: 2300,
    category: 'cervezas_con_alcohol',
    subcategory: 'Cerveza Industrial',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cerveza_lata_imperial_ipa',
    name: 'Lata Imperial IPA 500cc',
    description: 'Lata con intenso lúpulo - 500cc',
    price: 2300,
    category: 'cervezas_con_alcohol',
    subcategory: 'Cerveza Industrial',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'aperitivo_fernet',
    name: 'Fernet Branca',
    description: 'Trago preparado con Coca-Cola original bien helado en vaso grande.',
    price: 4500,
    category: 'cervezas_con_alcohol',
    subcategory: 'Aperitivos',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'aperitivo_gancia',
    name: 'Gancia con Limón',
    description: 'Aperitivo americano servido con hielo, tónica o sprite y gajo de limón.',
    price: 3800,
    category: 'cervezas_con_alcohol',
    subcategory: 'Aperitivos',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80'
  },

  // --- BEBIDAS SIN ALCOHOL (11 items con variante Grande/Chica) ---
  {
    id: 'gaseosa_coca',
    name: 'Coca Cola',
    description: 'Refrescante sabor original.',
    price: 3500, // Grande (1.5L)
    priceHalf: 2000, // Chica (500cc o lata)
    category: 'bebidas_sin_alcohol',
    hasVariants: true,
    variantType: 'drink',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gaseosa_coca_sin_azucar',
    name: 'Coca Cola S/ Azúcar',
    description: 'Sabor único con cero azúcares.',
    price: 3500,
    priceHalf: 2000,
    category: 'bebidas_sin_alcohol',
    hasVariants: true,
    variantType: 'drink',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gaseosa_coca_light',
    name: 'Coca Cola Light',
    description: 'El clásico sabor liviano de siempre.',
    price: 3500,
    priceHalf: 2000,
    category: 'bebidas_sin_alcohol',
    hasVariants: true,
    variantType: 'drink',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gaseosa_sprite',
    name: 'Sprite',
    description: 'Bebida gaseosa sabor lima-limón helada.',
    price: 3500,
    priceHalf: 2000,
    category: 'bebidas_sin_alcohol',
    hasVariants: true,
    variantType: 'drink',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gaseosa_sprite_sin_azucar',
    name: 'Sprite S/ Azúcar',
    description: 'Sabor lima-limón sin calorías.',
    price: 3500,
    priceHalf: 2000,
    category: 'bebidas_sin_alcohol',
    hasVariants: true,
    variantType: 'drink',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gaseosa_fanta',
    name: 'Fanta Naranja',
    description: 'Gaseosa burbujeante e intensamente frutal a naranja.',
    price: 3500,
    priceHalf: 2000,
    category: 'bebidas_sin_alcohol',
    hasVariants: true,
    variantType: 'drink',
    image: 'https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gaseosa_schweppes',
    name: 'Schweppes',
    description: 'Variedades de Pomelo / Citrus / Tónica premium.',
    price: 3700,
    priceHalf: 2200,
    category: 'bebidas_sin_alcohol',
    hasVariants: true,
    variantType: 'drink',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'jugo_aquarius',
    name: 'Jugo Aquarius',
    description: 'Sabores frutales de Naranja / Manzana / Pomelo / Pera o Limonada.',
    price: 3200,
    priceHalf: 1800,
    category: 'bebidas_sin_alcohol',
    hasVariants: true,
    variantType: 'drink',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'jugo_aquarius_gasificada',
    name: 'Aquarius Levemente Gasificada',
    description: 'Jugo de frutas levemente gasificado: Naranja, Manzana o Pomelo.',
    price: 3400,
    priceHalf: 1900,
    category: 'bebidas_sin_alcohol',
    hasVariants: true,
    variantType: 'drink',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'agua_con_gas',
    name: 'Agua C/ Gas',
    description: 'Agua mineral purificada gasificada.',
    price: 2500,
    priceHalf: 1500,
    category: 'bebidas_sin_alcohol',
    hasVariants: true,
    variantType: 'drink',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'agua_sin_gas',
    name: 'Agua S/ Gas',
    description: 'Agua mineral natural purificada sin gas.',
    price: 2500,
    priceHalf: 1500,
    category: 'bebidas_sin_alcohol',
    hasVariants: true,
    variantType: 'drink',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=80'
  }
];

export const getMenuItems = (): PizzaItem[] => {
  const savedPrices = localStorage.getItem('tomino_custom_prices');
  if (!savedPrices) return BASE_MENU_ITEMS;

  try {
    const customPrices = JSON.parse(savedPrices);
    return BASE_MENU_ITEMS.map(item => {
      const customPriceMain = customPrices[`${item.id}_main`];
      const customPriceHalf = customPrices[`${item.id}_half`];
      return {
        ...item,
        price: customPriceMain !== undefined ? customPriceMain : item.price,
        priceHalf: customPriceHalf !== undefined ? customPriceHalf : item.priceHalf
      };
    });
  } catch (e) {
    return BASE_MENU_ITEMS;
  }
};

export const saveCustomPrice = (id: string, newPriceMain: number, newPriceHalf?: number) => {
  const savedPrices = localStorage.getItem('tomino_custom_prices');
  const currentPrices = savedPrices ? JSON.parse(savedPrices) : {};
  currentPrices[`${id}_main`] = newPriceMain;
  if (newPriceHalf !== undefined) {
    currentPrices[`${id}_half`] = newPriceHalf;
  }
  localStorage.setItem('tomino_custom_prices', JSON.stringify(currentPrices));
};

export const resetAllMenuModifications = () => {
  localStorage.removeItem('tomino_custom_prices');
  localStorage.removeItem('tomino_menu_availability');
};