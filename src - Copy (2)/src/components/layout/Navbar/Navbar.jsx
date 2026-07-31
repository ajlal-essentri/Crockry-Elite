import "./Navbar.css";
import logo from "../../../assets/images/logo.png";
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStore } from "../../../context/StoreContext";

function Navbar() {
    const { cartCount, wishlistItems, customer, logoutCustomer } = useStore();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    async function handleLogout() {
        await logoutCustomer();
        navigate("/");
        setMenuOpen(false);
    }

    return (
        <header className="navbar">
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="Elite Crockery Logo" />
                </div>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>

                <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
                    <ul className="nav-links">
                        <li>
                            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                        </li>

                        <li>
                            <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
                        </li>

                        <li>
                            <Link to="/categories" onClick={() => setMenuOpen(false)}>Categories</Link>
                        </li>

                        <li>
                            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
                        </li>

                        <li>
                            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                        </li>
                    </ul>

                    <div className="nav-actions">

                        <div className="search-box">
                            <input type="text" placeholder="Search products..." />
                            <Search size={20} />
                        </div>

                        <Link to="/wishlist" className="wishlist-icon-link" onClick={() => setMenuOpen(false)}>
                            <Heart size={22} />
                            {wishlistItems.length > 0 && (
                                <span className="cart-count-badge">{wishlistItems.length}</span>
                            )}
                        </Link>

                        <Link to="/cart" className="cart-icon-wrapper" onClick={() => setMenuOpen(false)}>
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span className="cart-count-badge">{cartCount}</span>
                            )}
                        </Link>

                        {customer ? (
                            <div className="account-menu">
                                <User size={18} />
                                <span className="account-name">
                                    {customer.user_metadata?.full_name || customer.email}
                                </span>
                                <button className="logout-link" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="login-btn" onClick={() => setMenuOpen(false)}>
                                <User size={18} />
                                Login
                            </Link>
                        )}

                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;