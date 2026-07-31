import "./Categories.css";
import { useNavigate } from "react-router-dom";
import categories from "../../data/categories";

function Categories() {
  const navigate = useNavigate();

  return (
    <section className="categories-page">

      <div className="container">

        <h1>Our Categories</h1>

        <div className="categories-grid">

          {categories.map((item, index) => (

            <div
              className="category-page-card"
              key={index}
              onClick={() => navigate(`/shop?category=${encodeURIComponent(item.name)}`)}
            >

              <img src={item.image} alt={item.name} />

              <div className="category-content">
                <h3>{item.name}</h3>
                <p>Explore Collection</p>
              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Categories;
