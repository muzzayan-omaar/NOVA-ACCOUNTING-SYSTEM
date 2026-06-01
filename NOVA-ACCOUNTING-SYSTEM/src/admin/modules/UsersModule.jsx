import { useEffect, useState } from "react";
import api from "../../services/api";
import { UserPlus, Trash2, User } from "lucide-react";

export default function UsersModule() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // mode: list | create | edit
  const [mode, setMode] = useState("list");

  const [selectedUser, setSelectedUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CASHIER",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
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
      await api.post("/users", form);

      setForm({
        name: "",
        email: "",
        password: "",
        role: "CASHIER",
      });

      setMode("list");
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE USER
  const updateUser = async () => {
    try {
      await api.patch(`/users/${selectedUser.id}`, {
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
        isActive: selectedUser.isActive,
      });

      setMode("list");
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE USER
  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setSelectedUser(null);
      setMode("list");
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-full grid grid-cols-12 gap-4">

      {/* LEFT PANEL */}
      <div className="col-span-4 bg-white rounded-2xl shadow p-4 flex flex-col">

        <div className="flex items-center justify-between mb-4">

          <h2 className="font-bold text-lg">Users</h2>

          <button
            onClick={() => {
              setMode("create");
              setSelectedUser(null);
            }}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2"
          >
            <UserPlus size={16} />
            New
          </button>

        </div>

        {/* LIST */}
        <div className="flex-1 overflow-y-auto space-y-2">

          {loading && (
            <p className="text-sm text-slate-500">
              Loading users...
            </p>
          )}

          {!loading &&
            users.map((u) => (
              <div
                key={u.id}
                onClick={() => {
                  setSelectedUser(u);
                  setMode("edit");
                }}
                className={`p-3 rounded-xl cursor-pointer border transition ${
                  selectedUser?.id === u.id
                    ? "bg-blue-50 border-blue-500"
                    : "hover:bg-slate-50"
                }`}
              >
                <div className="flex justify-between items-center">

                  <div>
                    <p className="font-semibold">{u.name}</p>
                    <p className="text-xs text-slate-500">{u.email}</p>
                  </div>

                  <span className="text-xs bg-slate-200 px-2 py-1 rounded">
                    {u.role}
                  </span>

                </div>
              </div>
            ))}

        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="col-span-8 bg-white rounded-2xl shadow p-6">

        {/* EMPTY STATE */}
        {mode === "list" && (
          <div className="text-center text-slate-500 mt-20">
            Select a user or create a new one
          </div>
        )}

        {/* CREATE MODE */}
        {mode === "create" && (
          <div className="space-y-4">

            <h2 className="text-xl font-bold flex items-center gap-2">
              <User />
              Create User
            </h2>

            <input
              className="w-full p-3 border rounded-lg"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              className="w-full p-3 border rounded-lg"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              className="w-full p-3 border rounded-lg"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <select
              className="w-full p-3 border rounded-lg"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="OWNER">OWNER</option>
              <option value="MANAGER">MANAGER</option>
              <option value="CASHIER">CASHIER</option>
            </select>

            <button
              onClick={createUser}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Create User
            </button>

          </div>
        )}

        {/* EDIT MODE */}
        {mode === "edit" && selectedUser && (
          <div className="space-y-4">

            <h2 className="text-xl font-bold flex items-center gap-2">
              <User />
              Edit User
            </h2>

            <input
              className="w-full p-3 border rounded-lg"
              value={selectedUser.name}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  name: e.target.value,
                })
              }
            />

            <input
              className="w-full p-3 border rounded-lg"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  email: e.target.value,
                })
              }
            />

            <select
              className="w-full p-3 border rounded-lg"
              value={selectedUser.role}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  role: e.target.value,
                })
              }
            >
              <option value="OWNER">OWNER</option>
              <option value="MANAGER">MANAGER</option>
              <option value="CASHIER">CASHIER</option>
            </select>

            <div className="flex gap-3">

              <button
                onClick={updateUser}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Save Changes
              </button>

              <button
                onClick={() => deleteUser(selectedUser.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}