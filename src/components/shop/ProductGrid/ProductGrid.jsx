import "./ProductGrid.css";
import { useMemo } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../context/StoreContext";

function ProductGrid({ selectedCategories = [], sortOption = "newest" }) {
    const { products, productsLoading, addToCart } = useStore();
    const navigate = useNavigate();

    const visibleProducts = useMemo(() => {
        let list = [...products];

        if (selectedCategories.length > 0) {
            const lowerSelected = selectedCategories.map((c) => c.toLowerCase());
            list = list.filter((p) =>
                lowerSelected.includes((p.category || "").toLowerCase())
            );
        }

        switch (sortOption) {
            case "price-low-high":
                list.sort((a, b) => a.price - b.price);
                break;
            case "price-high-low":
                list.sort((a, b) => b.price - a.price);
                break;
            case "newest":
            default:
                // products already come newest-first from Supabase
                break;
        }

        return list;
    }, [products, selectedCategories, sortOption]);

    if (productsLoading) {
        return <p className="grid-status">Loading products...</p>;
    }

    if (visibleProducts.length === 0) {
        return <p className="grid-status">No products found.</p>;
    }

    return (
        <div className="products-grid">
            {visibleProducts.map((product) => (
                <div
                    className="product-card"
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                >
                    <div className="wishlist-icon">
                        <Heart size={20} />
                    </div>

                    {product.sale && (
                        <span className="sale-badge">
                            {product.sale}
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

                        {product.oldPrice && (
                            <span className="old-price">
                                Rs{product.oldPrice}
                            </span>
                        )}

                        <div className="rating">
                            {"⭐".repeat(product.rating || 0)}
                        </div>

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
    );
}

export default ProductGrid;
