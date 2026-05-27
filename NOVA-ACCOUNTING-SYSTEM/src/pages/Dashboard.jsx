import { useEffect, useState } from "react";
import api from "../services/api";

import StatCard from "../components/dashboard/StatCard";
import LiveActivityFeed from "../components/dashboard/LiveActivityFeed";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const res = await api.get("/analytics/dashboard");
    setData(res.data);
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">

      {/* TOP STATS */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Sales" value={data.totalSales} />
        <StatCard title="Transactions" value={data.totalTransactions} />
        <StatCard title="Cashiers Active" value={data.activeCashiers || 0} />
        <StatCard title="Low Stock Items" value={data.lowStock || 0} />
      </div>

      {/* MAIN SECTION */}
      <div className="grid grid-cols-3 gap-4 mt-6">

        {/* LIVE FEED */}
        <div className="col-span-2 bg-white p-4 rounded-xl">
          <h2 className="font-bold mb-2">Live Activity</h2>
          <LiveActivityFeed />
        </div>

        {/* QUICK INSIGHTS */}
        <div className="bg-white p-4 rounded-xl">
          <h2 className="font-bold mb-2">Insights</h2>
          <p>Profit margin trends</p>
          <p>Top selling products</p>
          <p>Cash flow summary</p>
        </div>

      </div>

    </div>
  );
}