import "./contect.css";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
} from "lucide-react";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError("");

    const { error } = await supabase.from("messages").insert(form);

    setSending(false);

    if (error) {
      setError("Message bhej nahi saka, dobara try karein.");
      return;
    }

    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <section className="contact-page">

      <div className="container">

        <div className="contact-heading">

          <span>CONTACT US</span>

          <h1>Get In Touch With Us</h1>

          <p>
            We'd love to hear from you. Whether you have a question about our
            products, orders, or services, our team is here to help.
          </p>

        </div>

        <div className="contact-grid">

          <div className="contact-info">

            <div className="info-card">
              <MapPin size={24}/>
              <div>
                <h3>Address</h3>
                <p>Pakistan, Karachi, Clifton, Delhi Colony, Shamim Mosque</p>
              </div>
            </div>

            <div className="info-card">
              <Phone size={24}/>
              <div>
                <h3>Phone</h3>
                <p>+92 312 2130303</p>
              </div>
            </div>

            <div className="info-card">
              <Mail size={24}/>
              <div>
                <h3>Email</h3>
                <p>support@crockery.com</p>
              </div>
            </div>

            <div className="info-card">
              <Clock size={24}/>
              <div>
                <h3>Working Hours</h3>
                <p>Mon - Sat : 11:00 AM - 10:00 PM</p>
              </div>
            </div>

          </div>

          {sent ? (
            <div className="contact-success">
              <h3>Message Sent!</h3>
              <p>Shukriya, hum jald aap se rabta karenge.</p>
              <button onClick={() => setSent(false)}>Send Another Message</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>

              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
              />

              <textarea
                name="message"
                rows="6"
                placeholder="Write your message..."
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>

              {error && <p className="contact-error">{error}</p>}

              <button type="submit" disabled={sending}>
                {sending ? "Sending..." : "Send Message"}
                <Send size={18}/>
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}

export default Contact;
