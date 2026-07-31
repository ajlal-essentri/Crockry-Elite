import "./Messages.css";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { supabase } from "../../lib/supabase";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    setLoading(true);
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setMessages(data);
    setLoading(false);
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Header />

        <h1>Messages</h1>

        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p>Abhi koi message nahi aaya.</p>
        ) : (
          <div className="messages-list">
            {messages.map((msg) => (
              <div className="message-card" key={msg.id}>
                <div className="message-top">
                  <h4>{msg.name}</h4>
                  <span>{new Date(msg.created_at).toLocaleString()}</span>
                </div>
                <p className="message-email">{msg.email}</p>
                {msg.subject && <p className="message-subject">{msg.subject}</p>}
                <p className="message-body">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
