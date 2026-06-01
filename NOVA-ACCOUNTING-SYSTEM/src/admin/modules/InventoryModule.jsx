import { useEffect, useState } from "react";
import api from "../../services/api";
import { ArrowDownUp, Package } from "lucide-react";

export default function InventoryModule() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovements = async () => {
    try {
      setLoading(true);
      const res = await api.get("/inventory/movements");
      setMovements(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovements();
  }, []);

  return (
    <div className="h-full bg-white rounded-2xl p-6 shadow">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <ArrowDownUp />
        <h1 className="text-xl font-bold">
          Inventory Movements
        </h1>
      </div>

      {/* TABLE */}
      <div className="overflow-y-auto max-h-[600px]">

        {loading && (
          <p className="text-slate-500">
            Loading movements...
          </p>
        )}

        {!loading && movements.length === 0 && (
          <p className="text-slate-500">
            No inventory activity yet
          </p>
        )}

        {!loading &&
          movements.map((m) => (
            <div
              key={m.id}
              className="flex justify-between items-center border-b py-3"
            >

              <div className="flex items-center gap-3">

                <Package size={18} />

                <div>
                  <p className="font-semibold">
                    {m.product?.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {m.type}
                  </p>
                </div>

              </div>

              <div className="text-right">

                <p className="font-bold">
                  {m.quantity}
                </p>

                <p className="text-xs text-slate-400">
                  {new Date(m.createdAt).toLocaleString()}
                </p>

              </div>

            </div>
          ))}

      </div>
    </div>
  );
}