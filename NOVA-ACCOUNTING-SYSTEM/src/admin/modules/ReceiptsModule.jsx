import { useEffect, useState } from "react";
import api from "../../services/api";
import { Receipt, Search } from "lucide-react";

export default function ReceiptsModule() {
  const [receipts, setReceipts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const fetchReceipts = async () => {
    const res = await api.get("/sales/receipts");
    setReceipts(res.data);
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  const filtered = receipts.filter((r) =>
    r.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-12 gap-4 h-full">

      {/* LIST */}
      <div className="col-span-4 bg-white p-4 rounded-2xl shadow flex flex-col">

        <h2 className="font-bold flex items-center gap-2">
          <Receipt /> Receipts
        </h2>

        <div className="relative mt-3">
          <Search className="absolute left-3 top-3 text-slate-400" />
          <input
            className="w-full pl-10 p-2 border rounded-lg"
            placeholder="Search receipt ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mt-4 overflow-y-auto flex-1 space-y-2">

          {filtered.map((r) => (
            <div
              key={r.id}
              onClick={() => setSelected(r)}
              className="p-3 border rounded-lg cursor-pointer hover:bg-slate-50"
            >
              <p className="text-sm font-bold">
                UGX {r.totalAmount}
              </p>

              <p className="text-xs text-slate-500">
                {r.user?.name} • {new Date(r.createdAt).toLocaleString()}
              </p>
            </div>
          ))}

        </div>

      </div>

      {/* DETAILS */}
      <div className="col-span-8 bg-white p-6 rounded-2xl shadow">

        {!selected ? (
          <p className="text-slate-500">
            Select a receipt
          </p>
        ) : (
          <>
            <h2 className="font-bold text-xl mb-4">
              Receipt Details
            </h2>

            <p className="text-sm text-slate-500">
              Cashier: {selected.user?.name}
            </p>

            <p className="text-sm text-slate-500 mb-4">
              Date: {new Date(selected.createdAt).toLocaleString()}
            </p>

            {selected.saleItems.map((i) => (
              <div
                key={i.id}
                className="flex justify-between border-b py-2"
              >
                <span>{i.product.name}</span>
                <span>
                  {i.quantity} × {i.unitPrice}
                </span>
              </div>
            ))}

            <div className="mt-4 font-bold">
              TOTAL: UGX {selected.totalAmount}
            </div>
          </>
        )}

      </div>

    </div>
  );
}