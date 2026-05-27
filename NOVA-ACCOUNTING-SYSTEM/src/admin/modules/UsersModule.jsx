import { useEffect, useState } from "react";
import api from "../../services/api";
import { Plus, Trash2, UserCheck } from "lucide-react";

export default function UsersModule() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CASHIER",
  });

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await api.get("/auth/users");
      setUsers(res.data);
    } catch (err) {
      console.log("FETCH USERS ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // CREATE USER
  const createUser = async () => {
    try {
      const res = await api.post("/auth/register", form);

      setUsers((prev) => [...prev, res.data]);

      setForm({
        name: "",
        email: "",
        password: "",
        role: "CASHIER",
      });
    } catch (err) {
      console.log("CREATE USER ERROR:", err);
    }
  };

  // TOGGLE STATUS
  const toggleUserStatus = async (id) => {
    try {
      const res = await api.patch(`/auth/users/${id}/toggle`);

      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? res.data : u
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE USER
  const deleteUser = async (id) => {
    try {
      await api.delete(`/auth/users/${id}`);

      setUsers((prev) =>
        prev.filter((u) => u.id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Users Management</h1>
        <p className="text-sm text-slate-500">
          Manage cashiers, admins and system users
        </p>
      </div>

      {/* CREATE USER FORM */}
      <div className="bg-white p-4 rounded-xl shadow flex gap-3 flex-wrap">

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="border p-2 rounded-lg"
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="border p-2 rounded-lg"
        />

        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="border p-2 rounded-lg"
        />

        <select
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
          className="border p-2 rounded-lg"
        >
          <option value="ADMIN">ADMIN</option>
          <option value="CASHIER">CASHIER</option>
        </select>

        <button
          onClick={createUser}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={16} />
          Create
        </button>

      </div>

      {/* USERS LIST */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="p-4 border-b font-semibold">
          System Users
        </div>

        {loading ? (
          <p className="p-4">Loading...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t">

                  <td className="p-3">{u.name}</td>
                  <td>{u.email}</td>

                  <td>
                    <span className="px-2 py-1 bg-slate-200 rounded">
                      {u.role}
                    </span>
                  </td>

                  <td>
                    {u.isActive ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <UserCheck size={14} /> Active
                      </span>
                    ) : (
                      <span className="text-red-500">
                        Disabled
                      </span>
                    )}
                  </td>

                  <td className="text-right p-3 flex justify-end gap-2">

                    <button
                      onClick={() => toggleUserStatus(u.id)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      Toggle
                    </button>

                    <button
                      onClick={() => deleteUser(u.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded flex items-center gap-1"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>

    </div>
  );
}