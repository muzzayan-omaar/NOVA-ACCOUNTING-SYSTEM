import { useEffect, useState } from "react";
import api from "../../services/api";
import { Plus, Trash2 } from "lucide-react";

export default function ProductsModule() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    sellingPrice: "",
    stockQuantity: "",
  });

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const createProduct = async () => {
    const res = await api.post("/products", form);
    setProducts((p) => [...p, res.data]);

    setForm({ name: "", sellingPrice: "", stockQuantity: "" });
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    setProducts((p) => p.filter((x) => x.id !== id));
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Products</h1>

      {/* FORM */}
      <div className="bg-white p-4 rounded-xl flex gap-2 flex-wrap">
        <input placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded" />

        <input placeholder="Price"
          value={form.sellingPrice}
          onChange={(e) => setForm({ ...form, sellingPrice: e.target.value })}
          className="border p-2 rounded" />

        <input placeholder="Stock"
          value={form.stockQuantity}
          onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
          className="border p-2 rounded" />

        <button onClick={createProduct}
          className="bg-blue-600 text-white px-4 rounded flex items-center gap-2">
          <Plus size={16} /> Add
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th className="text-right p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.name}</td>
                <td>{p.sellingPrice}</td>
                <td>{p.stockQuantity}</td>
                <td className="text-right p-3">
                  <button onClick={() => deleteProduct(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1">
                    <Trash2 size={14} /> Delete
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