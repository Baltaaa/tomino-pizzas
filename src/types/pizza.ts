export interface PizzaItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Clásicas" | "Especiales" | "Bebidas" | "Promos";
  image: string;
}

export interface CartItem extends PizzaItem {
  quantity: number;
  size: "Entera" | "Media";
  singlePrice: number; // Precio unitario real según tamaño elegido (entera o media)
}