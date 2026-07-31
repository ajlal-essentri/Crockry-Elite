import "./ProductDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStore } from "../../context/StoreContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, loadingProducts } = useStore();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(null);

  if (loadingProducts) {
    return <p className="loading-text">Loading...</p>;
  }

  const product = products.find((item) => item.id === id);

  if (!product) {
    return <h1>Product Not Found</h1>;
  }

  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];
  const mainImage = activeImage || gallery[0];

  return (
    <section className="product-details">
      <div className="container details-container">

        <div className="details-left">

          <div className="main-image">
            <img src={mainImage} alt={product.name} />
          </div>

          {gallery.length > 1 && (
            <div className="thumb-images">
              {gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name} ${i + 1}`}
                  className={img === mainImage ? "active-thumb" : ""}
                  onClick={() => setActiveImage(img)}
                />
              ))}
            </div>
          )}

        </div>

        <div className="details-content">

          <h1>{product.name}</h1>

          <div className="rating">
            {"⭐".repeat(product.rating || 5)}
          </div>

          <div className="price-box">
            <span className="new-price">Rs{product.price}</span>
            {product.old_price && (
              <span className="old-price">Rs{product.old_price}</span>
            )}
          </div>

          <p>{product.description}</p>

          <div className="quantity">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => q + 1)}>+</button>
          </div>

          <button className="cart-btn" onClick={() => addToCart(product, qty)}>
            Add To Cart
          </button>

          <button
            className="buy-btn"
            onClick={() => {
              addToCart(product, qty);
              navigate("/cart");
            }}
          >
            Buy Now
          </button>
          <div className="product-extra">

            <h2>Description</h2>

            <p>{product.description || "No description added yet."}</p>

          </div>

        </div>

      </div>
      <section className="related-products">

        <div className="container">

          <h2>Related Products</h2>

          <div className="related-grid">
            {products
              .filter((item) => item.id !== product.id)
              .slice(0, 4)
              .map((item) => (
                <div className="related-card" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <h4>{item.name}</h4>
                  <p>Rs {item.price}</p>
                </div>
              ))}
          </div>

        </div>

      </section>
    </section>
  );
}

export default ProductDetails;