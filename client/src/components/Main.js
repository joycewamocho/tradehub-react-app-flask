import React from "react";
import ProductList from "./ProductList";
import Search from "./Search";

function Main() {
  const [products, setProducts] = React.useState([]);
  const [search, setSearch] = React.useState("");

  // Fetch products from API
  React.useEffect(() => {
    fetch("/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="container mt-5">
      <div className="d-flex flex-column align-items-center">
        {/* Search Input */}
        <div className="w-75 mb-4">
          <Search search={search} setSearch={setSearch} />
        </div>

        {/* Product List */}
        <div className="w-100">
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </main>
  );
}

export default Main;
