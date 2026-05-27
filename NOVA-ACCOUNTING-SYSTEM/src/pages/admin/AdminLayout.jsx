import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

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

  const menu = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },

    {
      title: "Users",
      icon: Users,
      path: "/admin/modules/users",
    },

    {
      title: "Products",
      icon: Package,
      path: "/admin/modules/products",
    },

    {
      title: "Inventory",
      icon: Boxes,
      path: "/admin/modules/inventory",
    },

    {
      title: "Sales",
      icon: ShoppingCart,
      path: "/admin/modules/sales",
    },

    {
      title: "Payments",
      icon: CreditCard,
      path: "/admin/modules/payments",
    },

    {
      title: "Reports",
      icon: FileText,
      path: "/admin/modules/reports",
    },

    {
      title: "Receipts",
      icon: Receipt,
      path: "/admin/modules/receipts",
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="h-screen bg-slate-100 flex overflow-hidden">

      {/* SIDEBAR */}
      <div className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl">

        {/* HEADER */}
        <div className="p-6 border-b border-slate-800">

          <h1 className="text-2xl font-bold tracking-wide">
            Nova Elite ERP
          </h1>

          <p className="text-slate-400 text-sm mt-1">
            Admin Control Center
          </p>

        </div>

        {/* MENU */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">

          {menu.map((item) => {
            const active =
              location.pathname === item.path;

            return (
              <button
                key={item.title}
                onClick={() => navigate(item.path)}
                className={`
                  w-full
                  flex
                  items-center
                  gap-4
                  px-4
                  py-3
                  rounded-2xl
                  transition-all
                  duration-200
                  text-left
                  ${
                    active
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-800 text-slate-200"
                  }
                `}
              >

                <div
                  className={`
                    p-2
                    rounded-xl
                    ${
                      active
                        ? "bg-blue-500"
                        : "bg-slate-800"
                    }
                  `}
                >
                  <item.icon size={18} />
                </div>

                <div>
                  <p className="font-medium">
                    {item.title}
                  </p>

                  <p
                    className={`
                      text-xs
                      ${
                        active
                          ? "text-blue-100"
                          : "text-slate-400"
                      }
                    `}
                  >
                    Manage{" "}
                    {item.title.toLowerCase()}
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
            className="
              w-full
              bg-red-500
              hover:bg-red-600
              transition
              rounded-2xl
              py-3
              font-semibold
              flex
              items-center
              justify-center
              gap-2
            "
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 overflow-y-auto">

        {/* TOP HEADER */}
        <div className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between">

          <div>

            <h1 className="text-2xl font-bold text-slate-800">
              ERP Administration
            </h1>

            <p className="text-slate-500 text-sm mt-1">
              Manage your business operations
            </p>

          </div>

          {/* USER */}
          <div className="flex items-center gap-3">

            <div className="text-right">
              <p className="font-semibold text-slate-800">
                Admin Owner
              </p>

              <p className="text-xs text-slate-500">
                SUPER ADMIN
              </p>
            </div>

            <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              A
            </div>

          </div>

        </div>

        {/* PAGE CONTENT */}
        <div className="p-6">
          <Outlet />
        </div>

      </div>

    </div>
  );
}