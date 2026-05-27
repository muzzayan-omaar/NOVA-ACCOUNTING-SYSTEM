import { useState } from "react";
import {
  CreditCard,
  Banknote,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

export default function PaymentPanel({
  cart,
  setCart,
  onCheckout,
}) {

  const [paymentMethod, setPaymentMethod] =
    useState("CASH");

  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) =>
      sum + item.qty * item.sellingPrice,
    0
  );

const handleCheckoutClick = async () => {
  try {
    await onCheckout(paymentMethod);

    toast.success("Sale completed successfully");

  } catch (err) {

  console.log("CHECKOUT ERROR:", err);

  toast.error(
  err.response?.data?.message ||
  "Sale failed"
);
}
};

  return (
    <div className="flex flex-col h-full">

      {/* TOTAL */}
      <div className="bg-slate-800 rounded-2xl p-4">

        <p className="text-slate-400 text-sm">
          Total Amount
        </p>

        <h1 className="text-4xl font-bold mt-2">
          UGX {total.toLocaleString()}
        </h1>

      </div>

      {/* PAYMENT METHODS */}
      <div className="mt-6">

        <p className="text-sm text-slate-400 mb-3">
          Payment Method
        </p>

        <div className="space-y-3">

          <button
            onClick={() => setPaymentMethod("CASH")}
            className={`w-full flex items-center justify-between p-4 rounded-2xl transition border ${
              paymentMethod === "CASH"
                ? "bg-blue-600 border-blue-500"
                : "bg-slate-800 border-slate-700"
            }`}
          >

            <div className="flex items-center gap-3">
              <Banknote size={18} />
              <span>Cash</span>
            </div>

            {paymentMethod === "CASH" && (
              <CheckCircle2 size={18} />
            )}

          </button>

          <button
            onClick={() => setPaymentMethod("CARD")}
            className={`w-full flex items-center justify-between p-4 rounded-2xl transition border ${
              paymentMethod === "CARD"
                ? "bg-blue-600 border-blue-500"
                : "bg-slate-800 border-slate-700"
            }`}
          >

            <div className="flex items-center gap-3">
              <CreditCard size={18} />
              <span>Card</span>
            </div>

            {paymentMethod === "CARD" && (
              <CheckCircle2 size={18} />
            )}

          </button>

        </div>

      </div>

      {/* CHECKOUT */}
      <div className="mt-auto pt-6">

<button
  disabled={!cart.length || loading}
  onClick={async () => {
    try {
      setLoading(true);
      await onCheckout(paymentMethod);
    } finally {
      setLoading(false);
    }
  }}
  className="w-full bg-green-600 hover:bg-green-700 transition py-4 rounded-2xl font-semibold text-lg disabled:opacity-50 flex items-center justify-center gap-2"
>
  {loading ? (
    <>
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      Processing...
    </>
  ) : (
    "Complete Sale"
  )}
</button>

      </div>

    </div>
  );
}