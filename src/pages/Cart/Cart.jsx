import "./Cart.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

function CartItemRow({ item, removeFromCart, updateQuantity }) {
  // local text state taake typing ke beech mein (jab field khali ho)
  // product cart se delete na ho jaye
  const [localQty, setLocalQty] = useState(String(item.quantity));

  function commitQuantity() {
    const parsed = parseInt(localQty, 10);
    if (!parsed || parsed < 1) {
      setLocalQty(String(item.quantity)); // invalid ho to purani value pe wapis
      return;
    }
    updateQuantity(item.id, parsed);
  }

  return (
    <div className="cart-item">

      <img src={item.image} alt={item.name} />

      <div>
        <h3>{item.name}</h3>
        <p>Rs {item.price}</p>
      </div>

      <div className="qty-stepper">
        <button
          type="button"
          onClick={() => {
            const next = Math.max(1, item.quantity - 1);
            setLocalQty(String(next));
            updateQuantity(item.id, next);
          }}
        >
          -
        </button>

        <input
          type="number"
          min="1"
          value={localQty}
          onChange={(e) => setLocalQty(e.target.value)}
          onBlur={commitQuantity}
          onKeyDown={(e) => e.key === "Enter" && commitQuantity()}
        />

        <button
          type="button"
          onClick={() => {
            const next = item.quantity + 1;
            setLocalQty(String(next));
            updateQuantity(item.id, next);
          }}
        >
          +
        </button>
      </div>

      <button className="remove" onClick={() => removeFromCart(item.id)}>
        Remove
      </button>

    </div>
  );
}

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
                <CartItemRow
                  key={item.id}
                  item={item}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                />
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
