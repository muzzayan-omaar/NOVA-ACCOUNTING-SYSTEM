import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ReceiptsModule() {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    api.get("/sales").then((res) => setReceipts(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Receipts</h1>

      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">ID</th>
              <th>Total</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {receipts.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{r.id.slice(0, 6)}</td>
                <td>{r.totalAmount}</td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
                <td>
                  <button className="text-blue-600">
                    Reprint
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}