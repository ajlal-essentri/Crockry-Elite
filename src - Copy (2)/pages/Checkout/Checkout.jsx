import "./Checkout.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

function Checkout() {
  const { cartItems, cartTotal, placeOrder, customer } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    paymentMethod: "Cash On Delivery",
  });

  useEffect(() => {
    if (customer) {
      setForm((prev) => ({
        ...prev,
        fullName: customer.user_metadata?.full_name || prev.fullName,
        email: customer.email || prev.email,
      }));
    }
  }, [customer]);

  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setSubmitting(true);

    try {
      const order = await placeOrder(form);
      navigate("/order-confirmed", { state: { order } });
    } catch (err) {
      alert("Order place nahi ho saka: " + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="checkout">
      <div className="container">

        <h1>Checkout</h1>

        <form className="checkout-form" onSubmit={handleSubmit}>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
          >
            <option>Cash On Delivery</option>
          </select>
          <p className="payment-note">
            Online payment (JazzCash / EasyPaisa / Bank Transfer) coming soon.
          </p>

          <p className="checkout-total">Total: Rs {cartTotal}</p>

          <button type="submit" disabled={submitting || cartItems.length === 0}>
            {submitting ? "Placing Order..." : "Place Order"}
          </button>

        </form>

      </div>
    </section>
  );
}

export default Checkout;
