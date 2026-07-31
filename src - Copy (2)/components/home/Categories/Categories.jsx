import "./Categories.css";
import { useNavigate } from "react-router-dom";
import categories from "../../../data/categories";

function Categories() {
  const navigate = useNavigate();
  // home page pe sirf pehli 6 categories dikhao, poori list /categories page pe hai
  const homeCategories = categories.slice(0, 6);

  return (
    <section className="categories">
      <div className="container">
        <h2>Shop By Category</h2>

        <div className="category-grid">
          {homeCategories.map((category, index) => (
            <div
              className="category-card"
              key={index}
              onClick={() => navigate(`/shop?category=${encodeURIComponent(category.name)}`)}
            >
              <img src={category.image} alt={category.name} />
              <div className="overlay">
                <h3>{category.name}</h3>
                <span className="shop-now-link">Shop Now →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
