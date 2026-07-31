import "./NotFound.css";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function NotFound() {
  return (
    <section className="notfound-page">
      <div className="container">

        <div className="notfound-content">

          <span className="error-code">404</span>

          <h1>Oops! Page Not Found</h1>

          <p>
            The page you're looking for doesn't exist or may have been moved.
            Let's get you back to our beautiful crockery collection.
          </p>

          <Link to="/" className="back-home-btn">
            <ArrowLeft size={20} />
            Back To Home
          </Link>

        </div>

      </div>
    </section>
  );
}

export default NotFound;