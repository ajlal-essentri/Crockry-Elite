import "./Sidebar.css";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <h2>Crockery Elite</h2>

      <ul>
        <li>
          <NavLink to="/admin" end className={({isActive}) => isActive ? "active" : ""}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/products" className={({isActive}) => isActive ? "active" : ""}>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders" className={({isActive}) => isActive ? "active" : ""}>
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/messages" className={({isActive}) => isActive ? "active" : ""}>
            Messages
          </NavLink>
        </li>
      </ul>

    </aside>
  );
}

export default Sidebar;
