import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ReportsModule() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    api.get("/analytics").then((res) => setReport(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reports</h1>

      <div className="bg-white p-6 rounded-xl">
        <p>Total Sales: {report?.totalSales}</p>
        <p>Transactions: {report?.totalTransactions}</p>
      </div>
    </div>
  );
}