import { Routes, Route } from "react-router-dom";

import POS from "./pages/POS";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/admin/Users";

import AdminLayout from "./pages/admin/AdminLayout";

/* MODULES */
import InventoryModule from "./admin/modules/InventoryModule";
import SalesModule from "./admin/modules/SalesModule";
import PaymentsModule from "./admin/modules/PaymentsModule";
import ReportsModule from "./admin/modules/ReportsModule";
import UsersModule from "./admin/modules/UsersModule";
import ReceiptsModule from "./admin/modules/ReceiptsModule";
import ProductsModule from "./admin/modules/ProductsModule";

function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<POS />} />

      {/* NORMAL PAGES */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />

      {/* ADMIN LAYOUT */}
      <Route path="/admin" element={<AdminLayout />}>

        {/* DEFAULT ADMIN SCREEN */}
        <Route
          index
          element={
            <div className="text-center mt-20">
              <h1 className="text-4xl font-bold text-slate-800">
                ERP Administration
              </h1>

              <p className="text-slate-500 mt-3">
                Select a module from the sidebar
              </p>
            </div>
          }
        />

        {/* MODULES */}
        <Route
          path="modules/inventory"
          element={<InventoryModule />}
        />

        <Route
          path="modules/sales"
          element={<SalesModule />}
        />

        <Route
          path="modules/payments"
          element={<PaymentsModule />}
        />

        <Route
          path="modules/reports"
          element={<ReportsModule />}
        />

        <Route
          path="modules/users"
          element={<UsersModule />}
        />

        <Route
          path="modules/receipts"
          element={<ReceiptsModule />}
        />

        <Route
          path="modules/products"
          element={<ProductsModule />}
        />

      </Route>

    </Routes>
  );
}

export default App;