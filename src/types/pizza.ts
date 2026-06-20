export interface PizzaItem {
  id: string;
  name: string;
  description: string;
  price: number; // Precio base o principal (Entera / Grande)
  priceHalf?: number; // Precio de la variante (Media / Chica) si corresponde
  category: "entradas" | "empanadas" | "la_gigante" | "pizzas" | "postres" | "vinos" | "cervezas_con_alcohol" | "bebidas_sin_alcohol" | "Promos";
  subcategory?: string;
  image: string;
  hasVariants?: boolean;
  variantType?: "pizza" | "drink"; // pizza -> Media/Entera, drink -> Chica/Grande
}

export interface CartItem extends PizzaItem {
  quantity: number;
  size: "Entera" | "Media" | "Chica" | "Grande" | "Única";
  singlePrice: number; // Precio real del tamaño elegido multiplicado por la cantidad
}