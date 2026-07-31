import "./FeaturedProducts.css";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../context/StoreContext";

function FeaturedProducts() {
  const { products, addToCart } = useStore();
  const navigate = useNavigate();

  const featured = products.slice(0, 8);

  if (featured.length === 0) return null;

  return (
    <section className="featured-products">
      <div className="container">

        <h2>Featured Products</h2>

        <div className="products-grid">
          {featured.map((product) => (
            <div
              className="product-card"
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img src={product.image} alt={product.name} />

              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-rating">{"⭐".repeat(product.rating || 5)}</div>
                <p>Rs {product.price}</p>

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

      </div>
    </section>
  );
}

export default FeaturedProducts;
