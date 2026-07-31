import "./Shop.css";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Filters from "../../components/shop/Filters/Filters";
import ProductGrid from "../../components/shop/ProductGrid/ProductGrid";

function Shop() {
    const [searchParams] = useSearchParams();
    const initialCategory = searchParams.get("category");

    const [selectedCategories, setSelectedCategories] = useState(
        initialCategory ? [initialCategory] : []
    );
    const [sortOption, setSortOption] = useState("newest");

    function toggleCategory(category) {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    }

    function clearFilters() {
        setSelectedCategories([]);
    }

    return (
        <>
            <section className="shop-banner">
                <div className="container">
                    <span className="eyebrow">PREMIUM CROCKERY COLLECTION</span>
                    <h1>Shop</h1>
                    <div className="gold-underline"></div>
                    <p>Home / <span className="current">Shop</span></p>
                </div>
            </section>

            <section className="shop-content">
                <div className="container">

                    <div className="shop-sidebar">
                        <Filters
                            selectedCategories={selectedCategories}
                            onToggleCategory={toggleCategory}
                            onClear={clearFilters}
                        />
                    </div>

                    <div className="shop-products">
                        <div className="shop-toolbar">
                            <select
                                className="sort-select"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option value="newest">Newest</option>
                                <option value="price-low-high">Price: Low to High</option>
                                <option value="price-high-low">Price: High to Low</option>
                            </select>
                        </div>
                        <ProductGrid selectedCategories={selectedCategories} sortOption={sortOption} />
                    </div>

                </div>
            </section>
        </>
    );
}

export default Shop;
