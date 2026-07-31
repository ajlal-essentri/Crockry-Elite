import "./Hero.css";
import heroImg from "../../../assets/images/hero/hero.png";
import { ShieldCheck, Truck, RotateCcw } from "lucide-react";
function Hero() {
  return (
    <section className="hero">
      <div className="container">

        <div className="hero-left">
          <div className="hero-badge">
  ✨ Premium Crockery Collection
</div>
          <h1>
            Elevate Your <span>Dining Experience</span>
          </h1>

          <p>
            Discover premium crockery, elegant dinner sets, cups, glasses,
            bowls and tableware for every home.
          </p>

          <div className="hero-buttons">
            <button className="shop-btn">Shop Now</button>
            <button className="explore-btn">Explore Collection</button>
          </div>
          <div className="hero-stats">

  <div className="stat">
    <h3>5000+</h3>
    <p>Happy Customers</p>
  </div>

  <div className="stat">
    <h3>1200+</h3>
    <p>Products</p>
  </div>

  <div className="stat">
    <h3>4.9★</h3>
    <p>Customer Rating</p>
  </div>

</div>

<div className="hero-trust-badges">

  <div className="trust-badge">
    <div className="trust-icon">
      <ShieldCheck size={22} strokeWidth={1.8} />
    </div>
    <span>Premium Quality</span>
  </div>

  <div className="trust-divider"></div>

  <div className="trust-badge">
    <div className="trust-icon">
      <Truck size={22} strokeWidth={1.8} />
    </div>
    <span>Fast Delivery</span>
  </div>

  <div className="trust-divider"></div>

  <div className="trust-badge">
    <div className="trust-icon">
      <RotateCcw size={22} strokeWidth={1.8} />
    </div>
    <span>Easy Exchange</span>
  </div>

</div>
        </div>

      <div className="hero-right">
    <img src={heroImg} alt="Premium Crockery" />
</div>

      </div>
    </section>
  );
}

export default Hero;