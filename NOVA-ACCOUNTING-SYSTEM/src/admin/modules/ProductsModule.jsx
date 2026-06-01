import { useEffect, useState } from "react";
import api from "../../services/api";
import { Plus, Trash2, Package } from "lucide-react";

export default function ProductsModule() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("list");

  const [form, setForm] = useState({
    name: "",
    barcode: "",
    sku: "",
    buyingPrice: 0,
    sellingPrice: 0,
    stockQuantity: 0,
    unitType: "pcs",
  });

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // CREATE
  const createProduct = async () => {
    try {
      await api.post("/products", form);

      setForm({
        name: "",
        barcode: "",
        sku: "",
        buyingPrice: 0,
        sellingPrice: 0,
        stockQuantity: 0,
        unitType: "pcs",
      });

      setMode("list");
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE
  const updateProduct = async () => {
    try {
      await api.put(`/products/${selected.id}`, selected);

      setSelected(null);
      setMode("list");
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setSelected(null);
      setMode("list");
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 h-full">

      {/* LEFT LIST */}
      <div className="col-span-4 bg-white p-4 rounded-2xl shadow">

        <div className="flex justify-between mb-4">
          <h2 className="font-bold">Products</h2>

          <button
            onClick={() => {
              setMode("create");
              setSelected(null);
            }}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={16} />
            New
          </button>
        </div>

        <div className="space-y-2 overflow-y-auto max-h-[500px]">

          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                setSelected(p);
                setMode("edit");
              }}
              className="p-3 border rounded-xl cursor-pointer hover:bg-slate-50"
            >
              <p className="font-semibold">{p.name}</p>
              <p className="text-xs text-slate-500">
                Stock: {p.stockQuantity}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="col-span-8 bg-white p-6 rounded-2xl shadow">

        {/* LIST STATE */}
        {mode === "list" && (
          <div className="text-center mt-20 text-slate-500">
            Select a product or create new
          </div>
        )}

        {/* CREATE */}
        {mode === "create" && (
          <div className="space-y-3">

            <h2 className="font-bold flex items-center gap-2">
              <Package />
              Create Product
            </h2>

            <input
              placeholder="Name"
              className="w-full p-3 border rounded-lg"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Barcode"
              className="w-full p-3 border rounded-lg"
              value={form.barcode}
              onChange={(e) =>
                setForm({ ...form, barcode: e.target.value })
              }
            />

            <input
              placeholder="Buying Price"
              type="number"
              className="w-full p-3 border rounded-lg"
              value={form.buyingPrice}
              onChange={(e) =>
                setForm({ ...form, buyingPrice: e.target.value })
              }
            />

            <input
              placeholder="Selling Price"
              type="number"
              className="w-full p-3 border rounded-lg"
              value={form.sellingPrice}
              onChange={(e) =>
                setForm({ ...form, sellingPrice: e.target.value })
              }
            />

            <input
              placeholder="Stock"
              type="number"
              className="w-full p-3 border rounded-lg"
              value={form.stockQuantity}
              onChange={(e) =>
                setForm({ ...form, stockQuantity: e.target.value })
              }
            />

            <button
              onClick={createProduct}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Create Product
            </button>

          </div>
        )}

        {/* EDIT */}
        {mode === "edit" && selected && (
          <div className="space-y-3">

            <h2 className="font-bold">Edit Product</h2>

            <input
              className="w-full p-3 border rounded-lg"
              value={selected.name}
              onChange={(e) =>
                setSelected({ ...selected, name: e.target.value })
              }
            />

            <input
              className="w-full p-3 border rounded-lg"
              value={selected.stockQuantity}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  stockQuantity: e.target.value,
                })
              }
            />

            <div className="flex gap-3">

              <button
                onClick={updateProduct}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>

              <button
                onClick={() => deleteProduct(selected.id)}
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