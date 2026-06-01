import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  TrendingUp,
  ShoppingCart,
  AlertTriangle,
  Package,
} from "lucide-react";

export default function DashboardModule() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await api.get("/analytics");
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ALL HOOKS FIRST
  useEffect(() => {
    fetchDashboard();
  }, []);

  // ❌ removed socket for now (safe mode)
  // Add later when backend socket is confirmed working

  if (loading || !data) {
    return (
      <div className="p-6 text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">ERP Dashboard</h1>
        <p className="text-slate-500">Real-time business overview</p>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white p-5 rounded-2xl shadow">
          <TrendingUp />
          <p className="text-sm text-slate-500">Revenue</p>
          <h2 className="text-xl font-bold">
            UGX {data.totalRevenue.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <ShoppingCart />
          <p className="text-sm text-slate-500">Transactions</p>
          <h2 className="text-xl font-bold">
            {data.totalTransactions}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <Package />
          <p className="text-sm text-slate-500">Today Revenue</p>
          <h2 className="text-xl font-bold">
            UGX {data.todayRevenue.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <AlertTriangle />
          <p className="text-sm text-slate-500">Low Stock</p>
          <h2 className="text-xl font-bold">
            {data.lowStock.length}
          </h2>
        </div>

      </div>

      {/* TOP PRODUCTS */}
      <div className="bg-white p-5 rounded-2xl shadow">
        <h2 className="font-bold mb-3">Top Selling Products</h2>

        {data.topProducts.map((p, i) => (
          <div key={i} className="flex justify-between border-b py-2">
            <span>{p.name}</span>
            <span className="font-bold">{p.qty}</span>
          </div>
        ))}
      </div>

      {/* LOW STOCK */}
      <div className="bg-white p-5 rounded-2xl shadow">
        <h2 className="font-bold mb-3 text-red-600">
          Low Stock Alerts
        </h2>

        {data.lowStock.map((p) => (
          <div key={p.id} className="flex justify-between border-b py-2">
            <span>{p.name}</span>
            <span className="text-red-500 font-bold">
              {p.stockQuantity}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}