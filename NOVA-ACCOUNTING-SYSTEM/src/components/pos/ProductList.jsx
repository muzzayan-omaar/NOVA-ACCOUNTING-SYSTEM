import { Package } from "lucide-react";

export default function ProductList({
  products,
  addToCart,
  loading,
}) {

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-36 bg-slate-100 animate-pulse rounded-2xl"
          />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400">
        <Package size={50} />
        <p className="mt-3 text-sm">
          No products available
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">

      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => addToCart(product)}
          className="bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all rounded-2xl p-4 text-left group"
        >

          {/* PRODUCT TOP */}
          <div className="flex items-center justify-between">

            <div className="bg-blue-100 text-blue-700 p-2 rounded-xl">
              <Package size={18} />
            </div>

            <span className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-500">
              {product.stockQuantity} left
            </span>

          </div>

          {/* NAME */}
          <div className="mt-4">
            <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition">
              {product.name}
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              SKU: {product.sku || "N/A"}
            </p>
          </div>

          {/* PRICE */}
          <div className="mt-4 flex items-center justify-between">

            <div>
              <p className="text-xs text-slate-400">
                Selling Price
              </p>

              <p className="font-bold text-lg text-slate-900">
                UGX {product.sellingPrice.toLocaleString()}
              </p>
            </div>

            <div className="bg-blue-600 text-white px-3 py-2 rounded-xl text-sm font-medium">
              Add
            </div>

          </div>

        </button>
      ))}

    </div>
  );
}