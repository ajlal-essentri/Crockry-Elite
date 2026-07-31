import "./OrderConfirmed.css";
import { useLocation, Link } from "react-router-dom";

function OrderConfirmed() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <section className="order-confirmed">
        <div className="container">
          <h1>No order found</h1>
          <Link to="/shop">Continue Shopping</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="order-confirmed">
      <div className="container">
        <h1>Order Placed Successfully 🎉</h1>
        <p>Order ID: <strong>{order.id}</strong></p>
        <p>Payment Method: {order.payment_method}</p>
        <p>Total: Rs {order.total}</p>

        <div className="order-items">
          {order.items.map((item) => (
            <div key={item.id} className="order-item-row">
              <span>{item.name} x {item.quantity}</span>
              <span>Rs {item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <p>We'll contact you on {order.phone} to confirm your order.</p>

        <Link to="/shop">Continue Shopping</Link>
      </div>
    </section>
  );
}

export default OrderConfirmed;
