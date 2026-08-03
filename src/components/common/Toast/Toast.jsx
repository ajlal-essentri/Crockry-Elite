import "./Toast.css";
import { useStore } from "../../../context/StoreContext";
import { CheckCircle } from "lucide-react";

function Toast() {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div className="toast-notification">
      <CheckCircle size={18} />
      <span>{toast}</span>
    </div>
  );
}

export default Toast;
