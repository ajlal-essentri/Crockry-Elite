import "./Orders.css";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { supabase } from "../../lib/supabase";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setOrders(data);
    setLoading(false);
  }

  async function updateStatus(id, status) {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert("Update nahi ho saka: " + error.message);
      return;
    }

    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Header />

        <h1>Orders</h1>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>Abhi koi order nahi aaya.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-card-top">
                  <div>
                    <h4>{order.customer_name}</h4>
                    <p>{order.phone} · {order.city}</p>
                    <p>{order.address}</p>
                  </div>

                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className={`status-select status-${order.status.toLowerCase()}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                <div className="order-items-list">
                  {order.items.map((item, i) => (
                    <div className="order-item-line" key={i}>
                      <span>{item.name} x {item.quantity}</span>
                      <span>Rs {item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="order-card-bottom">
                  <span>Payment: {order.payment_method}</span>
                  <strong>Total: Rs {order.total}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
