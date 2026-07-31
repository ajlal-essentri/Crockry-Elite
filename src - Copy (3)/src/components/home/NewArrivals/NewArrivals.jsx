import "./NewArrivals.css";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../context/StoreContext";

function NewArrivals() {
  const { products, addToCart, loadingProducts } = useStore();
  const navigate = useNavigate();

  // products already sorted newest-first from StoreContext, sirf pehle 4 dikha do
  const latest = products.slice(0, 4);

  if (loadingProducts) return null;
  if (latest.length === 0) return null;

  return (
    <section className="new-arrivals">
      <div className="container">
        <h2>New Arrivals</h2>

        <div className="products-grid">
          {latest.map((item) => (
            <div
              className="product-card"
              key={item.id}
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <span className="badge">NEW</span>

              <img src={item.image} alt={item.name} />

              <div className="product-info">
                <h3>{item.name}</h3>
                <p>Rs {item.price}</p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;
