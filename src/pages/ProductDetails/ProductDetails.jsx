import "./ProductDetails.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStore } from "../../context/StoreContext";
import { supabase } from "../../lib/supabase";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, loadingProducts, customer } = useStore();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [reviewImages, setReviewImages] = useState([]);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    if (id) loadReviews();
  }, [id]);

  async function loadReviews() {
    setLoadingReviews(true);
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", id)
      .order("created_at", { ascending: false });

    if (!error) setReviews(data);
    setLoadingReviews(false);
  }

  async function handleSubmitReview(e) {
    e.preventDefault();
    setReviewError("");
    setSubmittingReview(true);

    try {
      let imageUrls = [];

      for (const file of reviewImages) {
        const fileExt = file.name.split(".").pop();
        const fileName = `review-${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        imageUrls.push(publicUrlData.publicUrl);
      }

      const { error } = await supabase.from("reviews").insert({
        product_id: id,
        user_id: customer.id,
        customer_name: customer.user_metadata?.full_name || customer.email,
        rating: newRating,
        comment: newComment,
        images: imageUrls,
      });

      if (error) throw error;

      setNewComment("");
      setNewRating(5);
      setReviewImages([]);
      loadReviews();
    } catch (err) {
      setReviewError("Review submit nahi ho saka, dobara try karein.");
    } finally {
      setSubmittingReview(false);
    }
  }

  async function handleDeleteReview(reviewId) {
    if (!confirm("Ye review delete karna hai?")) return;

    const { error } = await supabase.from("reviews").delete().eq("id", reviewId);

    if (error) {
      alert("Delete nahi ho saka: " + error.message);
      return;
    }

    loadReviews();
  }

  if (loadingProducts) {
    return <p className="loading-text">Loading...</p>;
  }

  const product = products.find((item) => item.id === id);

  if (!product) {
    return <h1>Product Not Found</h1>;
  }

  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];
  const mainImage = activeImage || gallery[0];

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <section className="product-details" key={id}>
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
            {avgRating ? (
              <>
                {"⭐".repeat(Math.round(avgRating))} {avgRating} ({reviews.length} review{reviews.length > 1 ? "s" : ""})
              </>
            ) : (
              <span className="no-reviews-yet">No reviews yet</span>
            )}
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

            <h2>Customer Reviews</h2>

            {loadingReviews ? (
              <p>Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <p>Abhi koi review nahi hai. Pehla review aap likh sakte hain!</p>
            ) : (
              <div className="reviews-list">
                {reviews.map((r) => (
                  <div className="review-card" key={r.id}>
                    <div className="review-card-top">
                      <h4>{"⭐".repeat(r.rating)} {r.customer_name}</h4>
                      {customer && customer.id === r.user_id && (
                        <button
                          className="delete-review-btn"
                          onClick={() => handleDeleteReview(r.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    {r.comment && <p>{r.comment}</p>}
                    {r.images && r.images.length > 0 && (
                      <div className="review-images">
                        {r.images.map((img, i) => (
                          <img key={i} src={img} alt="Review" />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {customer ? (
              <form className="add-review-form" onSubmit={handleSubmitReview}>
                <h3>Write a Review</h3>

                <div className="star-select">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className={n <= newRating ? "star active" : "star"}
                      onClick={() => setNewRating(n)}
                    >
                      ⭐
                    </span>
                  ))}
                </div>

                <textarea
                  placeholder="Share your experience with this product..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows="3"
                />

                <label className="review-file-label">
                  Add Photos (optional)
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setReviewImages(Array.from(e.target.files))}
                  />
                </label>
                {reviewImages.length > 0 && (
                  <p className="review-file-hint">{reviewImages.length} image(s) selected</p>
                )}

                {reviewError && <p className="review-error">{reviewError}</p>}

                <button type="submit" disabled={submittingReview}>
                  {submittingReview ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            ) : (
              <p className="login-to-review">
                <Link to="/login">Login</Link> to write a review.
              </p>
            )}

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
                <div
                  className="related-card"
                  key={item.id}
                  onClick={() => {
                    navigate(`/product/${item.id}`);
                    window.scrollTo(0, 0);
                  }}
                >
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
