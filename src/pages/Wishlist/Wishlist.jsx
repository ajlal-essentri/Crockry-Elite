import "./Wishlist.css";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

function Wishlist() {
  const { wishlistItems, removeFromWishlist, addToCart } = useStore();
  const navigate = useNavigate();

  return (
    <section className="wishlist-page">
      <div className="container">

        <div className="wishlist-heading">
          <span>YOUR FAVORITES</span>
          <h1>Wishlist</h1>
          {wishlistItems.length === 0 && (
            <p>Your wishlist is empty.
Save your favorite products here so you can find them easily later.</p>
          )}
        </div>

        {wishlistItems.length > 0 && (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <div className="wishlist-card" key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  onClick={() => navigate(`/product/${item.id}`)}
                />
                <h3>{item.name}</h3>
                <span>Rs {item.price}</span>

                <div className="wishlist-actions">
                  <button className="cart-btn" onClick={() => addToCart(item)}>
                    <ShoppingCart size={16} /> Add to Cart
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Wishlist;
