import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import Toast from "./components/common/Toast/Toast";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <Toast />
    </BrowserRouter>
  );
}

export default App;
