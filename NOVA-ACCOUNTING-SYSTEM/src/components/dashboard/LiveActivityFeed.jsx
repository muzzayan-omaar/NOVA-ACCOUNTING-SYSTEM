import { useEffect, useState } from "react";
import api from "../../services/api";

export default function LiveActivityFeed() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000); // pseudo real-time
    return () => clearInterval(interval);
  }, []);

  const fetchLogs = async () => {
    const res = await api.get("/audit/logs");
    setLogs(res.data);
  };

  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto">

      {logs.map((log) => (
        <div key={log.id} className="border p-2 rounded text-sm">

          <p className="font-semibold">
            {log.action}
          </p>

          <p className="text-gray-500">
            User: {log.user?.name || "System"}
          </p>

          <p className="text-gray-400 text-xs">
            {new Date(log.createdAt).toLocaleString()}
          </p>

        </div>
      ))}

    </div>
  );
}