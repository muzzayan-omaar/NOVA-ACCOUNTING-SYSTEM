import CartItem from "./CartItem";
import { ShoppingCart } from "lucide-react";

export default function Cart({
  cart,
  setCart,
}) {

  const total = cart.reduce(
    (sum, item) =>
      sum + item.qty * item.sellingPrice,
    0
  );

  if (!cart.length) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400">
        <ShoppingCart size={50} />
        <p className="mt-3 text-sm">
          Cart is empty
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">

      {/* ITEMS */}
      <div className="flex-1 space-y-3 overflow-y-auto">

        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            cart={cart}
            setCart={setCart}
          />
        ))}

      </div>

      {/* TOTAL */}
      <div className="border-t border-slate-200 pt-4 mt-4">

        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-500">
            Items
          </span>

          <span className="font-semibold">
            {cart.length}
          </span>
        </div>

        <div className="flex items-center justify-between text-lg font-bold">

          <span>Total</span>

          <span className="text-blue-600">
            UGX {total.toLocaleString()}
          </span>

        </div>

      </div>

    </div>
  );
}