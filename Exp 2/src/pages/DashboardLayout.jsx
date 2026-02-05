import { Link, Outlet } from "react-router-dom";
import "./DashboardLayout.css";

const DashboardLayout = () => {
    return (
        <div className="dashboard-layout">
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h3>Dashboard</h3>
                </div>

                <nav className="dashboard-nav">
                    <Link to = "summary">Summary</Link>
                    <Link to = "analytics">Analytics</Link>
                    <Link to = "settings">Settings</Link>            
                </nav>

                <div className="dashboard-outlet">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout;