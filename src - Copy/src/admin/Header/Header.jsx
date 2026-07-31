import "./Header.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function Header() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  return (
    <div className="admin-header">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Header;
