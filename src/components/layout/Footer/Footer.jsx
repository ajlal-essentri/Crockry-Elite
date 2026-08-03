import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">

        <div className="footer-grid">

          <div>
            <h2>Crockery Elite</h2>
            <p>
              Premium crockery and tableware crafted to elevate every dining experience.
            </p>
          </div>

          <div>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3>Categories</h3>
            <ul>
              <li><Link to="/shop?category=Dinner%20Sets">Dinner Sets</Link></li>
              <li><Link to="/shop?category=Cups%20%26%20Mugs">Cups & Mugs</Link></li>
              <li><Link to="/shop?category=Glassware">Glassware</Link></li>
              <li><Link to="/shop?category=Bowls">Bowls</Link></li>
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <p>Clifton, Delhi Colony, Shamim Mosque</p>
          </div>

        </div>

        <div className="copyright">
          © 2026 Crockery Elite. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;
