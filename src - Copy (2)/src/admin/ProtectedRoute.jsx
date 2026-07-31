import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("checking"); // checking | allowed | denied

  useEffect(() => {
    checkAdmin();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkAdmin();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function checkAdmin() {
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData.session;

    if (!session) {
      setStatus("denied");
      return;
    }

    // session hona kaafi nahi — check karo ye user "admins" table mein bhi hai
    const { data, error } = await supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", session.user.id)
      .single();

    if (error || !data) {
      setStatus("denied");
    } else {
      setStatus("allowed");
    }
  }

  if (status === "checking") {
    return <p style={{ padding: 40 }}>Checking login...</p>;
  }

  if (status === "denied") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
