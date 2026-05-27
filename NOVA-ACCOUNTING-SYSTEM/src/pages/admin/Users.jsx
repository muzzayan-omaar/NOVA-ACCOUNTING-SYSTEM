import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CASHIER",
  });

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async () => {
    await api.post("/users", form);
    setForm({ name: "", email: "", password: "", role: "CASHIER" });
    fetchUsers();
  };

  const disableUser = async (id) => {
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="p-6 space-y-6">

      {/* CREATE USER */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold text-lg mb-3">Create User</h2>

        <div className="grid grid-cols-4 gap-3">
          <input placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
          />

          <input placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border p-2 rounded"
          />

          <input placeholder="Password" type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border p-2 rounded"
          />

          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="CASHIER">CASHIER</option>
            <option value="MANAGER">MANAGER</option>
            <option value="OWNER">OWNER</option>
          </select>
        </div>

        <button
          onClick={createUser}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create User
        </button>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold text-lg mb-3">Users</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b">
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.isActive ? "Active" : "Disabled"}</td>
                <td>
                  <button
                    onClick={() => disableUser(u.id)}
                    className="text-red-500"
                  >
                    Disable
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}