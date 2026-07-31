import "./Filters.css";

const categoryList = [
  "Dinner Sets",
  "Plates",
  "Bowls",
  "Cups & Mugs",
  "Glassware",
  "Water Bottles",
  "Knives",
  "Non-Stick & Fry Pans",
  "Kitchen Accessories",
];

function Filters({ selectedCategories = [], onToggleCategory, onClear }) {
  return (
    <div>

      <h2>Filters</h2>

      <div className="filter-box">
        <h3>Categories</h3>

        {categoryList.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => onToggleCategory && onToggleCategory(category)}
            />
            {category}
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
