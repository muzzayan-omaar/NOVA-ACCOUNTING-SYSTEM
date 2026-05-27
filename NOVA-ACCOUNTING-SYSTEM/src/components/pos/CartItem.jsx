import {
  Minus,
  Plus,
  Trash2,
  Package,
} from "lucide-react";

export default function CartItem({
  item,
  cart,
  setCart,
}) {

  // INCREASE QTY
  const increaseQty = () => {
    setCart(
      cart.map((i) =>
        i.id === item.id
          ? { ...i, qty: i.qty + 1 }
          : i
      )
    );
  };

  // DECREASE QTY
  const decreaseQty = () => {
    if (item.qty === 1) {
      removeItem();
      return;
    }

    setCart(
      cart.map((i) =>
        i.id === item.id
          ? { ...i, qty: i.qty - 1 }
          : i
      )
    );
  };

  // REMOVE ITEM
  const removeItem = () => {
    setCart(
      cart.filter((i) => i.id !== item.id)
    );
  };

  const subtotal =
    item.qty * item.sellingPrice;

  return (
    <div className="border border-slate-200 rounded-2xl p-4 bg-white hover:shadow-sm transition">

      {/* TOP */}
      <div className="flex items-start justify-between">

        {/* PRODUCT INFO */}
        <div className="flex gap-3">

          <div className="bg-blue-100 text-blue-700 p-2 rounded-xl h-fit">
            <Package size={18} />
          </div>

          <div>

            <h3 className="font-semibold text-slate-800">
              {item.name}
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              UGX {item.sellingPrice.toLocaleString()} each
            </p>

          </div>

        </div>

        {/* REMOVE */}
        <button
          onClick={removeItem}
          className="text-slate-400 hover:text-red-500 transition"
        >
          <Trash2 size={18} />
        </button>

      </div>

      {/* BOTTOM */}
      <div className="mt-4 flex items-center justify-between">

        {/* QTY CONTROLS */}
        <div className="flex items-center gap-2">

          <button
            onClick={decreaseQty}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
          >
            <Minus size={16} />
          </button>

          <div className="w-10 text-center font-semibold">
            {item.qty}
          </div>

          <button
            onClick={increaseQty}
            className="w-9 h-9 rounded-xl bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center transition"
          >
            <Plus size={16} />
          </button>

        </div>

        {/* SUBTOTAL */}
        <div className="text-right">

          <p className="text-xs text-slate-400">
            Subtotal
          </p>

          <p className="font-bold text-slate-900">
            UGX {subtotal.toLocaleString()}
          </p>

        </div>

      </div>

    </div>
  );
}