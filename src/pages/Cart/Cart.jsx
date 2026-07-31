import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useStore();
  const navigate = useNavigate();

  return (
    <section className="cart">
      <div className="container">

        <h1>Shopping Cart</h1>

        <div className="cart-container">

          <div className="cart-items">

            {cartItems.length === 0 ? (

              <p>Your cart is empty.</p>

            ) : (

              cartItems.map((item) => (

                <div className="cart-item" key={item.id}>

                  <img src={item.image} alt={item.name} />

                  <div>
                    <h3>{item.name}</h3>
                    <p>Rs {item.price}</p>
                  </div>

                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                  />

                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>

                </div>

              ))

            )}

          </div>

          <div className="cart-summary">

            <h2>Order Summary</h2>

            <p>Subtotal : Rs {cartTotal}</p>

            <p>Shipping : Free</p>

            <h3>Total : Rs {cartTotal}</h3>

            <button
              disabled={cartItems.length === 0}
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Cart;
