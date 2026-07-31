import "./Hero.css";
import heroImg from "../../../assets/images/hero/hero.png";
import { useNavigate } from "react-router-dom";
import { Truck, ShieldCheck, RotateCcw } from "lucide-react";

function Hero() {
  const navigate = useNavigate();
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
            <button className="shop-btn" onClick={() => navigate("/shop")}>Shop Now</button>
            <button className="explore-btn" onClick={() => navigate("/categories")}>Explore Collection</button>
          </div>
          <div className="hero-stats">

  <div className="stat">
    <h3>10+</h3>
    <p>Years Of Trust</p>
  </div>

  <div className="stat">
    <h3>1000+</h3>
    <p>Happy Customers</p>
  </div>

</div>

          <div className="hero-trust-row">

  <div className="trust-item">
    <ShieldCheck size={25} />
    <p>Premium Quality</p>
  </div>

  <div className="trust-item">
    <Truck size={22} />
    <p>Fast Delivery</p>
  </div>

  <div className="trust-item">
    <RotateCcw size={22} />
    <p>Easy Exchange</p>
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