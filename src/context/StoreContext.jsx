import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    const [cartItems, setCartItems] = useState(() => {
        try {
            const saved = localStorage.getItem("cart");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [wishlistItems, setWishlistItems] = useState(() => {
        try {
            const saved = localStorage.getItem("wishlist");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // Customer login — optional, order guest checkout se bhi ho sakta hai
    const [customer, setCustomer] = useState(undefined); // undefined = still checking, null = not logged in

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setCustomer(data.session?.user ?? null);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setCustomer(session?.user ?? null);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    const registerCustomer = async (name, email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: name } },
        });
        if (error) throw new Error(error.message);
        return data;
    };

    const loginCustomer = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw new Error(error.message);
        return data;
    };

    const logoutCustomer = async () => {
        await supabase.auth.signOut();
    };

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

    const toggleWishlist = (product) => {
        setWishlistItems((prev) =>
            prev.some((item) => item.id === product.id)
                ? prev.filter((item) => item.id !== product.id)
                : [...prev, product]
        );
    };

    const removeFromWishlist = (id) => {
        setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    };

    // Products ab Supabase se aate hain (admin jo bhi upload kare)
    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        setLoadingProducts(true);
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching products:", error.message);
            setProducts([]);
        } else {
            // "images" array agar hai to use karo, warna purane single
            // image_url wale products ke liye fallback bana do
            const mapped = data.map((p) => {
                const imageList =
                    p.images && p.images.length > 0
                        ? p.images
                        : p.image_url
                        ? [p.image_url]
                        : [];
                return { ...p, image: imageList[0], images: imageList };
            });
            setProducts(mapped);
        }
        setLoadingProducts(false);
    }

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, qty = 1) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);

            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                );
            }

            return [...prev, { ...product, quantity: qty }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) {
            removeFromCart(id);
            return;
        }
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    // Order ab Supabase mein jata hai — isliye admin dashboard mein bhi
    // dikhega, sirf customer ke apne browser mein nahi rukega
    const placeOrder = async (customerDetails) => {
        const orderPayload = {
            customer_name: customerDetails.fullName,
            email: customerDetails.email,
            phone: customerDetails.phone,
            city: customerDetails.city,
            address: customerDetails.address,
            items: cartItems.map(({ id, name, price, quantity }) => ({
                id,
                name,
                price,
                quantity,
            })),
            total: cartTotal,
            payment_method: customerDetails.paymentMethod,
        };

        // sirf insert karo, wapis padhne ki koshish mat karo — guest customer
        // ke paas orders table SELECT karne ki permission nahi hai (jaisa
        // hona bhi chahiye, taake ek customer doosre ka order na dekh sake)
        const { error } = await supabase.from("orders").insert(orderPayload);

        if (error) {
            throw new Error(error.message);
        }

        clearCart();

        // confirmation page ke liye jo data humne bheja wahi wapis kar do
        return {
            ...orderPayload,
            id: "ORD-" + Date.now(),
            created_at: new Date().toISOString(),
        };
    };

    const value = {
        products,
        loadingProducts,
        fetchProducts,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        placeOrder,
        wishlistItems,
        setWishlistItems,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        customer,
        registerCustomer,
        loginCustomer,
        logoutCustomer,
    };

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    return useContext(StoreContext);
}
