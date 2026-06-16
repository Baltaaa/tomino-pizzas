import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter 
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { CartItem } from '../types/pizza';
import { Trash2, Plus, Minus, MessageCircle } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  total: number;
}

export const CartDrawer = ({ open, onOpenChange, items, onUpdateQty, total }: Props) => {
  const sendToWhatsApp = () => {
    const phoneNumber = "5491112345678"; // Número de ejemplo
    const itemDetails = items
      .map(i => `• ${i.quantity}x ${i.name} ($${i.price * i.quantity})`)
      .join('%0A');
    
    const message = `*Nuevo Pedido - Pizzeria Tomino*%0A%0A${itemDetails}%0A%0A*Total: $${total}*%0A%0A_Por favor, confírmame el pedido y dime el tiempo de entrega._`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Tu Pedido</SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="flex-1 -mx-6 px-6 my-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400">
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                  <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                  <div className="flex-1">
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-sm text-orange-600 font-medium">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                    <button onClick={() => onUpdateQty(item.id, -1)} className="p-1 hover:text-orange-500"><Minus size={16}/></button>
                    <span className="w-4 text-center font-bold">{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item.id, 1)} className="p-1 hover:text-orange-500"><Plus size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <SheetFooter className="pt-6 border-t mt-auto">
          <div className="w-full space-y-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span className="text-orange-600">${total}</span>
            </div>
            <Button 
              disabled={items.length === 0}
              onClick={sendToWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-8 rounded-2xl text-lg gap-2"
            >
              <MessageCircle />
              Pedir por WhatsApp
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};