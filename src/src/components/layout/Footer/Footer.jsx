import "./Footer.css";

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
              <li>Home</li>
              <li>Shop</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h3>Categories</h3>
            <ul>
              <li>Dinner Sets</li>
              <li>Cups</li>
              <li>Glassware</li>
              <li>Bowls</li>
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <p>Email: info@crockeryelite.com</p>
            <p>Phone: +92 300 1234567</p>
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