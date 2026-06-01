import { useEffect, useState } from "react";
import api from "../../services/api";
import { Receipt, User, Calendar } from "lucide-react";

export default function SalesModule() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    from: "",
    to: "",
    cashierId: "",
  });

  const fetchSales = async () => {
    try {
      setLoading(true);

      const res = await api.get("/sales", {
        params: filters,
      });

      setSales(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  useEffect(() => {
    fetchSales();
  }, [filters]);

  const totalRevenue = sales.reduce(
    (sum, s) => sum + s.totalAmount,
    0
  );

  return (
    <div className="h-full bg-white rounded-2xl p-6 shadow">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Receipt />
            Sales Overview
          </h1>

          <p className="text-sm text-slate-500">
            Total Revenue: UGX {totalRevenue.toLocaleString()}
          </p>
        </div>

      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-3 gap-3 mb-4">

        <input
          type="date"
          className="p-2 border rounded-lg"
          onChange={(e) =>
            setFilters({ ...filters, from: e.target.value })
          }
        />

        <input
          type="date"
          className="p-2 border rounded-lg"
          onChange={(e) =>
            setFilters({ ...filters, to: e.target.value })
          }
        />

        <input
          placeholder="Cashier ID"
          className="p-2 border rounded-lg"
          onChange={(e) =>
            setFilters({
              ...filters,
              cashierId: e.target.value,
            })
          }
        />

      </div>

      {/* SALES LIST */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto">

        {loading && (
          <p className="text-slate-500">Loading sales...</p>
        )}

        {!loading &&
          sales.map((sale) => (
            <div
              key={sale.id}
              className="border p-4 rounded-xl flex justify-between"
            >

              {/* LEFT */}
              <div>

                <p className="font-bold">
                  UGX {sale.totalAmount.toLocaleString()}
                </p>

                <p className="text-xs text-slate-500 flex items-center gap-2">
                  <User size={12} />
                  {sale.user?.name}
                </p>

                <p className="text-xs text-slate-400 flex items-center gap-2">
                  <Calendar size={12} />
                  {new Date(sale.createdAt).toLocaleString()}
                </p>

              </div>

              {/* RIGHT */}
              <div className="text-right text-xs text-slate-500">

                <p>{sale.paymentMethod}</p>

                <p>{sale.saleItems.length} items</p>

              </div>

            </div>
          ))}

      </div>
    </div>
  );
}