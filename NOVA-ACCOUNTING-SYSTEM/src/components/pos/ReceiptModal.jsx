import { X, Printer, CheckCircle } from "lucide-react";

export default function ReceiptModal({
  open,
  onClose,
  cart,
  total,
  paymentMethod,
  onPrint,
}) {
  if (!open) return null;

  const now = new Date();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      {/* MODAL */}
      <div className="bg-white w-[380px] rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">

          <div className="flex items-center gap-2">
            <CheckCircle size={18} />
            <span className="font-semibold">
              Sale Completed
            </span>
          </div>

          <button onClick={onClose}>
            <X size={18} />
          </button>

        </div>

        {/* CONTENT */}
        <div className="p-4">

          {/* STORE INFO */}
          <div className="text-center mb-4">

            <h2 className="font-bold text-lg">
              Nova Elite ERP
            </h2>

            <p className="text-xs text-slate-500">
              Hardware Store Receipt
            </p>

            <p className="text-xs text-slate-400 mt-1">
              {now.toLocaleString()}
            </p>

          </div>

          <div className="border-t border-dashed my-3"></div>

          {/* ITEMS */}
          <div className="space-y-2 max-h-40 overflow-y-auto">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm"
              >
                <div>
                  <p className="font-medium">
                    {item.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    {item.qty} × UGX{" "}
                    {item.sellingPrice.toLocaleString()}
                  </p>
                </div>

                <p className="font-semibold">
                  UGX{" "}
                  {(item.qty * item.sellingPrice).toLocaleString()}
                </p>
              </div>
            ))}

          </div>

          <div className="border-t border-dashed my-3"></div>

          {/* TOTAL */}
          <div className="flex justify-between font-bold text-lg">

            <span>Total</span>

            <span className="text-blue-600">
              UGX {total.toLocaleString()}
            </span>

          </div>

          {/* PAYMENT METHOD */}
          <div className="mt-3 text-sm text-slate-500 flex justify-between">

            <span>Payment Method</span>

            <span className="font-medium text-slate-700">
              {paymentMethod}
            </span>

          </div>

        </div>

        {/* ACTIONS */}
        <div className="p-4 bg-slate-50 flex gap-2">

          <button
            onClick={onPrint}
            className="flex-1 bg-blue-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            <Printer size={16} />
            Print
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-slate-200 py-2 rounded-xl hover:bg-slate-300 transition"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}