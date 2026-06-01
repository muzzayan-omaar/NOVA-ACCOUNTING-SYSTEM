import { useEffect, useState } from "react";
import api from "../../services/api";
import { CreditCard, Wallet, Banknote } from "lucide-react";

export default function PaymentsModule() {
  const [data, setData] = useState({
    cash: 0,
    mobile: 0,
    credit: 0,
    total: 0,
  });

  const [loading, setLoading] = useState(false);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const res = await api.get("/payments/summary");
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const Card = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-between">

      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <h2 className="text-2xl font-bold">
          UGX {value.toLocaleString()}
        </h2>
      </div>

      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="text-white" />
      </div>

    </div>
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Payments Overview
        </h1>

        <p className="text-slate-500">
          Financial breakdown of all transactions
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Card
          title="Cash Payments"
          value={data.cash}
          icon={Banknote}
          color="bg-green-600"
        />

        <Card
          title="Mobile Money"
          value={data.mobile}
          icon={Wallet}
          color="bg-blue-600"
        />

        <Card
          title="Credit Sales"
          value={data.credit}
          icon={CreditCard}
          color="bg-red-500"
        />

      </div>

      {/* TOTAL */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl">
        <p className="text-sm text-slate-300">Total Revenue</p>

        <h1 className="text-3xl font-bold">
          UGX {data.total.toLocaleString()}
        </h1>
      </div>

    </div>
  );
}