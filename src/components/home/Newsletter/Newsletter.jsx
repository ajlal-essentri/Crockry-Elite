import "./Newsletter.css";
import { useState } from "react";
import { Mail } from "lucide-react";
import { supabase } from "../../../lib/supabase";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const { error } = await supabase.from("subscribers").insert({ email });

    if (error) {
      setStatus("error");
      return;
    }

    setStatus("done");
    setEmail("");
  }

  return (
    <section className="newsletter">
      <div className="container">

        <div className="newsletter-icon">
          <Mail size={26} />
        </div>

        <h2>Stay Updated</h2>

        <p>
          Subscribe to receive the latest arrivals, exclusive offers and
          premium dining inspiration.
        </p>

        {status === "done" ? (
          <p className="newsletter-success">Thank you for subscribing! You'll be the first to receive our latest updates, exclusive offers, and new arrivals.</p>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "..." : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="newsletter-error">Someting Worng! Try Again</p>
        )}

      </div>
    </section>
  );
}

export default Newsletter;
