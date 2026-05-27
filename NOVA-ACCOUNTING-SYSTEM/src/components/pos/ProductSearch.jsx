import { useState } from "react";

export default function ProductSearch() {
  const [query, setQuery] = useState("");

  return (
    <input
      className="w-full p-2 border rounded mb-2"
      placeholder="Search product / scan barcode..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}