import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Receipt,
  Wallet,
  Clock3,
} from "lucide-react";

import api from "../services/api";
import socket from "../services/socket";
import useAuthStore from "../store/useAuthStore";
import ProductSearch from "../components/pos/ProductSearch";
import ProductList from "../components/pos/ProductList";
import Cart from "../components/pos/Cart";
import PaymentPanel from "../components/pos/PaymentPanel";
import ReceiptModal from "../components/pos/ReceiptModal";

export default function POS() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showReceipt, setShowReceipt] = useState(false);
  const [lastSale, setLastSale] = useState(null);

  const navigate = useNavigate();

  // AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

    // ✅ AUTH STORE
  const { user, logout } = useAuthStore();

  // ✅ LIVE CLOCK
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

   useEffect(() => {
    socket.on("inventory:update", () => {
      fetchProducts();
    });

    return () => socket.off("inventory:update");
  }, []);

  // FETCH PRODUCTS
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // BUILD PAYLOAD
  const buildSalePayload = (cart, paymentMethod) => {
    return {
      paymentMethod,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.qty,
      })),
    };
  };

  // CHECKOUT
  const handleCheckout = async (paymentMethod) => {
    try {
      const payload = {
        paymentMethod,
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.qty,
        })),
      };

      const res = await api.post("/sales", payload);

      const soldItems = [...cart];

      setLastSale({
        ...res.data,
        items: soldItems,
      });

      setShowReceipt(true);
      setCart([]);

      await fetchProducts();

      return res.data;

    } catch (err) {
      console.log("FULL ERROR:", err);
      throw err;
    }
  };

  // ADD TO CART
  const addToCart = (product) => {
    const existing = cart.find((i) => i.id === product.id);

    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === product.id
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          qty: 1,
        },
      ]);
    }
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + item.qty * item.sellingPrice,
    0
  );

  return (
    <div className="h-screen bg-slate-100 flex flex-col font-[Inter]">

      {/* TOPBAR */}
<div className="h-16 bg-slate-900 text-white flex items-center justify-between px-6 shadow-md">

  {/* LEFT */}
  <div className="flex items-center gap-3">
    <div className="bg-blue-600 p-2 rounded-lg">
      <Receipt size={20} />
    </div>

    <div>
      <h1 className="font-bold text-lg">Nova Elite ERP</h1>
      <p className="text-xs text-slate-400">Hardware POS System</p>
    </div>
  </div>

  {/* CENTER */}
  <div className="hidden md:flex items-center gap-6 text-sm">

    <div className="flex items-center gap-2">
      <ShoppingCart size={16} />
      <span>{cart.length} Items</span>
    </div>

    <div className="flex items-center gap-2">
      <Wallet size={16} />
      <span>UGX {total.toLocaleString()}</span>
    </div>

    <div className="flex items-center gap-2">
      <Clock3 size={16} />
      <span>{time.toLocaleTimeString()}</span>
    </div>

  </div>

  {/* RIGHT */}
<div className="flex items-center gap-3">

  {/* USER INFO */}
  <div className="text-right leading-tight">
    <p className="text-sm font-semibold">
      {user?.name || "Unknown User"}
    </p>
    <p className="text-xs text-slate-400">
      {user?.role || "CASHIER"}
    </p>
  </div>

  {/* AVATAR */}
  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
    {user?.name?.charAt(0) || "U"}
  </div>

  {/* LOGOUT */}
  <button
    onClick={() => {
      logout();
      localStorage.removeItem("token");
      navigate("/login");
    }}
    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-xs"
  >
    Logout
  </button>

</div>

</div>

      {/* MAIN GRID */}
      <div className="flex-1 grid grid-cols-12 gap-4 p-4 overflow-hidden">

        {/* PRODUCTS */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">

          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-lg">Products</h2>
            <p className="text-sm text-slate-500">
              Search products or scan barcode
            </p>
          </div>

          <div className="p-4">
            <ProductSearch />
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <ProductList
              products={products}
              addToCart={addToCart}
              loading={loading}
            />
          </div>

        </div>

        {/* CART */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">

          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-lg">Current Cart</h2>
            <p className="text-sm text-slate-500">
              Review customer items
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <Cart cart={cart} setCart={setCart} />
          </div>

        </div>

        {/* PAYMENT */}
        <div className="col-span-12 lg:col-span-3 bg-slate-900 text-white rounded-2xl shadow-sm flex flex-col overflow-hidden">

          <div className="p-4 border-b border-slate-700">
            <h2 className="font-bold text-lg">Checkout</h2>
            <p className="text-sm text-slate-400">
              Complete transaction
            </p>
          </div>

          <div className="flex-1 p-4">
            <PaymentPanel
              cart={cart}
              setCart={setCart}
              onCheckout={handleCheckout}
            />
          </div>

        </div>

      </div>

      {/* RECEIPT MODAL */}
<ReceiptModal
  open={showReceipt}
  onClose={() => setShowReceipt(false)}
  cart={lastSale?.items || []}
  total={lastSale?.totalAmount || 0}
  paymentMethod={lastSale?.paymentMethod || "CASH"}
  onPrint={() => window.print()}
/>
    </div>
  );
}