import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

function Dashboard() {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Header />

        <h1>Admin Dashboard</h1>

      </div>

    </div>
  );
}

export default Dashboard;