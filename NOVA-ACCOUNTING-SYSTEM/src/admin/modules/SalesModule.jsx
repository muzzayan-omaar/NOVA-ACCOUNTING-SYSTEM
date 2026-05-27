import { useEffect, useState } from "react";
import api from "../../services/api";

export default function SalesModule() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    api.get("/sales").then((res) => setSales(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sales</h1>

      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">ID</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-3">{s.id.slice(0, 6)}</td>
                <td>{s.totalAmount}</td>
                <td>{s.paymentMethod}</td>
                <td>{new Date(s.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}