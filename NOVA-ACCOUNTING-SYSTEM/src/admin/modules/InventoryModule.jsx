import { useEffect, useState } from "react";
import api from "../../services/api";

export default function InventoryModule() {
  const [movements, setMovements] = useState([]);

  const fetchData = async () => {
    const res = await api.get("/inventory");
    setMovements(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inventory Movements</h1>

      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {movements.map((m) => (
              <tr key={m.id} className="border-t">
                <td className="p-3">{m.product?.name}</td>
                <td>{m.type}</td>
                <td>{m.quantity}</td>
                <td>{new Date(m.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}