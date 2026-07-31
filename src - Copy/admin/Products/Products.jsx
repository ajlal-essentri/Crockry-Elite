import "./Products.css";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { supabase } from "../../lib/supabase";
import categories from "../../data/categories";

const emptyForm = {
  id: null,
  name: "",
  price: "",
  old_price: "",
  category: "",
  description: "",
  stock: "",
};

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [imageFiles, setImageFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setProducts(data);
    setLoading(false);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function startEdit(product) {
    setForm({
      id: product.id,
      name: product.name,
      price: product.price,
      old_price: product.old_price || "",
      category: product.category || "",
      description: product.description || "",
      stock: product.stock,
    });
    setImageFiles([]);
    setFormOpen(true);
  }

  function startAdd() {
    setForm(emptyForm);
    setImageFiles([]);
    setFormOpen(true);
  }

  async function handleDelete(id) {
    if (!confirm("Ye product delete karna hai?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      alert("Delete nahi ho saka: " + error.message);
      return;
    }
    loadProducts();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrls = null;

      // agar nayi images select ki hain to sab ko Storage mein upload karo
      if (imageFiles.length > 0) {
        imageUrls = [];
        for (const file of imageFiles) {
          const fileExt = file.name.split(".").pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from("product-images")
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          const { data: publicUrlData } = supabase.storage
            .from("product-images")
            .getPublicUrl(fileName);

          imageUrls.push(publicUrlData.publicUrl);
        }
      }

      const payload = {
        name: form.name,
        price: Number(form.price),
        old_price: form.old_price ? Number(form.old_price) : null,
        category: form.category,
        description: form.description,
        stock: Number(form.stock) || 0,
      };

      if (imageUrls) {
        payload.images = imageUrls;
        payload.image_url = imageUrls[0]; // pehli image = main/cover image
      }

      if (form.id) {
        // edit existing product
        const { error } = await supabase
          .from("products")
          .update(payload)
          .eq("id", form.id);
        if (error) throw error;
      } else {
        // naya product — kam se kam ek image zaroori hai
        if (!imageUrls || imageUrls.length === 0) throw new Error("Please select at least one image.");
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
      }

      setFormOpen(false);
      setForm(emptyForm);
      setImageFiles([]);
      loadProducts();
    } catch (err) {
      alert("Save nahi ho saka: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Header />

        <div className="products-header">
          <h1>Products</h1>
          <button className="add-btn" onClick={startAdd}>
            + Add Product
          </button>
        </div>

        {formOpen && (
          <form className="product-form" onSubmit={handleSubmit}>
            <h3>{form.id ? "Edit Product" : "Add New Product"}</h3>

            <input
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="price"
              type="number"
              placeholder="Price (Rs)"
              value={form.price}
              onChange={handleChange}
              required
            />
            <input
              name="old_price"
              type="number"
              placeholder="Old Price (optional, for sale badge)"
              value={form.old_price}
              onChange={handleChange}
            />
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
            <input
              name="stock"
              type="number"
              placeholder="Stock quantity"
              value={form.stock}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />

            <label className="file-label">
              {form.id ? "Change Images (optional, select all again if changing)" : "Product Images (select 1 or more)"}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setImageFiles(Array.from(e.target.files))}
              />
            </label>
            {imageFiles.length > 0 && (
              <p className="file-hint">{imageFiles.length} image(s) selected</p>
            )}

            <div className="form-actions">
              <button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Product"}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="products-table">
            {products.length === 0 ? (
              <p>Koi product nahi hai abhi. "+ Add Product" pe click karo.</p>
            ) : (
              products.map((p) => (
                <div className="product-row" key={p.id}>
                  <img src={p.image_url} alt={p.name} />
                  <div className="product-row-info">
                    <h4>{p.name}</h4>
                    <p>Rs {p.price} {p.old_price && <s>Rs {p.old_price}</s>}</p>
                    <p className="stock-text">Stock: {p.stock}</p>
                  </div>
                  <div className="product-row-actions">
                    <button onClick={() => startEdit(p)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(p.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
