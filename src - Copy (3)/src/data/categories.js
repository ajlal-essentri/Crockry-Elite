import dinnerSet from "../assets/images/categories/dinner-set.jpg";
import plates from "../assets/images/categories/plates.webp";
import bowls from "../assets/images/categories/bowls.jpg";
import cups from "../assets/images/categories/cups.jpg";
import glassware from "../assets/images/categories/glassware.webp";
import accessories from "../assets/images/categories/accessories.avif";
import shop6 from "../assets/images/shop/shop6.webp";
import shop7 from "../assets/images/shop/shop7.webp";
import shop1 from "../assets/images/shop/shop1.jpg";
import shop2 from "../assets/images/shop/shop2.webp";

// Ye poori site mein ek hi list use hoti hai (home page, /categories page,
// shop filters, aur admin ka "Add Product" form) taake naam hamesha match
// karein aur filtering sahi kaam kare.
const categories = [
  { name: "Dinner Sets", image: dinnerSet },
  { name: "Plates", image: plates },
  { name: "Bowls", image: bowls },
  { name: "Cups & Mugs", image: cups },
  { name: "Glassware", image: glassware },
  { name: "Water Bottles", image: shop6 },
  { name: "Non-Stick Cookware", image: shop7 },
  { name: "Frying Pans", image: shop1 },
  { name: "Cutlery", image: shop2 },
  { name: "Kitchen Accessories", image: accessories },
];

export default categories;
