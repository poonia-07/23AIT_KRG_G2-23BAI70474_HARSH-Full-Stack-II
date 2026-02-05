import "./DashboardSummary.css";

const DashboardSummary = () => {
    return (
        <div className="summary-container">
            <div className="summary-header">
                <h3>Dashboard Summary</h3>
            </div>
            
            <div className="summary-grid">
                <div className="stat-card">
                    <h4>Total Projects</h4>
                    <div className="stat-value">12</div>
                    <div className="stat-unit">Active projects</div>
                </div>
                
                <div className="stat-card">
                    <h4>Total Users</h4>
                    <div className="stat-value">248</div>
                    <div className="stat-unit">Registered users</div>
                </div>
                
                <div className="stat-card">
                    <h4>Completion Rate</h4>
                    <div className="stat-value">87%</div>
                    <div className="stat-unit">Tasks completed</div>
                </div>
            </div>
            
            <div className="summary-content">
                <h4>Summary Overview</h4>
                <p>
                    This dashboard provides a comprehensive overview of your project metrics and performance indicators. 
                    Track key statistics, monitor progress, and manage your workflow efficiently through our intuitive interface.
                </p>
            </div>
        </div>
    )
}

export default DashboardSummary;