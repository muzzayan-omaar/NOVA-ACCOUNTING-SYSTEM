import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Boxes,
  Package,
  ShoppingCart,
  CreditCard,
  FileText,
  Receipt,
  LogOut,
} from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ SAFE USER PARSE (prevents future crashes)
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    user = null;
  }

  const menu = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { title: "Users", icon: Users, path: "/admin/modules/users" },
    { title: "Products", icon: Package, path: "/admin/modules/products" },
    { title: "Inventory", icon: Boxes, path: "/admin/modules/inventory" },
    { title: "Sales", icon: ShoppingCart, path: "/admin/modules/sales" },
    { title: "Payments", icon: CreditCard, path: "/admin/modules/payments" },
    { title: "Reports", icon: FileText, path: "/admin/modules/reports" },
    { title: "Receipts", icon: Receipt, path: "/admin/modules/receipts" },
  ];

  // 🔒 OPTIONAL ROLE FILTER (DISABLED SAFE MODE)
  // Uncomment ONLY when backend roles are stable
  /*
  const filteredMenu = menu.filter((item) => {
    if (!user) return true;

    if (user.role === "OWNER") return true;

    if (user.role === "MANAGER") {
      return item.title !== "Users";
    }

    if (user.role === "CASHIER") {
      return ["Dashboard", "Sales", "Receipts"].includes(item.title);
    }

    return true;
  });
  */

  const filteredMenu = menu; // ✅ SAFE DEFAULT (no sidebar break risk)

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* SIDEBAR */}
      <div className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl">

        {/* HEADER */}
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold">Nova ERP</h1>
          <p className="text-slate-400 text-sm">
            Admin Control Center
          </p>
        </div>

        {/* MENU */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">

          {filteredMenu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.title}
                onClick={() => navigate(item.path)}
                className={`
                  w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition
                  ${isActive ? "bg-slate-700" : "hover:bg-slate-800"}
                `}
              >
                <div className="bg-slate-800 p-2 rounded-xl">
                  <item.icon size={18} />
                </div>

                <div className="text-left">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-slate-400">
                    Manage {item.title.toLowerCase()}
                  </p>
                </div>
              </button>
            );
          })}

        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-2xl flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>

    </div>
  );
}