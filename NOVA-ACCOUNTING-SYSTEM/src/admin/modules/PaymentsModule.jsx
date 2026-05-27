import { useEffect, useState } from "react";
import api from "../../services/api";

export default function PaymentsModule() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/payments/summary").then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Payments</h1>

      <div className="bg-white p-6 rounded-xl">
        <p>Total Cash: {data?.cash || 0}</p>
        <p>Total Card: {data?.card || 0}</p>
      </div>
    </div>
  );
}