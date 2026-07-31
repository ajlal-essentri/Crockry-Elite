import "./ProductGrid.css";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../context/StoreContext";

function ProductGrid({ selectedCategories = [], sortOption = "newest" }) {
    const { products, addToCart, loadingProducts, toggleWishlist, isInWishlist } = useStore();
    const navigate = useNavigate();

    if (loadingProducts) {
        return <p className="loading-text">Loading products...</p>;
    }

    let filteredProducts =
        selectedCategories.length === 0
            ? products
            : products.filter((p) => selectedCategories.includes(p.category));

    // products already newest-first by default (StoreContext fetch order),
    // isliye "newest" ke liye kuch alag se karne ki zaroorat nahi
    if (sortOption === "price-low-high") {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high-low") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    }

    if (filteredProducts.length === 0) {
        return <p className="loading-text">No products found.</p>;
    }

    return (
        <>
            <div className="shop-topbar">
                <input
                    type="text"
                    placeholder="Search products..."
                />

                <select>
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Best Selling</option>
                </select>
            </div>
            <div className="products-grid">
                {filteredProducts.map((product) => (
                    <div
                        className="product-card"
                        key={product.id}
                        onClick={() => navigate(`/product/${product.id}`)}
                    >
                        <div
                            className={`wishlist-icon ${isInWishlist(product.id) ? "active" : ""}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleWishlist(product);
                            }}
                        >
                            <Heart size={20} fill={isInWishlist(product.id) ? "#e53935" : "none"} />
                        </div>

                        {product.old_price && (
                            <span className="sale-badge">
                                -{Math.round(100 - (product.price / product.old_price) * 100)}%
                            </span>
                        )}
                        <img src={product.image} alt={product.name} />
                        <div className="overlay"></div>
                        <div className="quick-view">
                            <button>Quick View</button>
                        </div>
                        <div className="product-info">

                            <h3>{product.name}</h3>

                            <span className="new-price">Rs{product.price}</span>

                            {product.old_price && (
                                <span className="old-price">
                                    Rs{product.old_price}
                                </span>
                            )}

                         <button
  onClick={(e) => {
    e.stopPropagation();
    addToCart(product);
  }}
>
  Add To Cart
</button>

                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ProductGrid;