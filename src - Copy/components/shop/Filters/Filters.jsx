import "./Filters.css";
import categories from "../../../data/categories";

const categoryList = categories.map((c) => c.name);

function Filters({ selectedCategories = [], onToggleCategory, onClear }) {
  return (
    <div>

      <h2>Filters</h2>

      <div className="filter-box">
        <h3>Categories</h3>

        {categoryList.map((cat) => (
          <label key={cat}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => onToggleCategory(cat)}
            />
            {" "}{cat}
          </label>
        ))}
      </div>

      <button className="clear-btn" onClick={onClear}>
        Clear Filters
      </button>

    </div>
  );
}

export default Filters;
