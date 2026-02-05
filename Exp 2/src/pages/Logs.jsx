import logs from "../data/logs";
import "./Logs.css";

const Logs = () => {
    const getEmissionLevel = (carbon) => {
        if (carbon > 10) return "high";
        if (carbon > 5) return "medium";
        return "low";
    };

    const getBadgeText = (level) => {
        switch(level) {
            case "high": return "High";
            case "medium": return "Medium";
            case "low": return "Low";
            default: return level;
        }
    };

    return (
        <div className="logs-container">
            <div className="logs-content">
                <div className="logs-header">
                    <h1>Activity Logs</h1>
                    <p>Track all carbon emissions activities and their impact</p>
                </div>

                <ol className="logs-list">
                    {logs.length > 0 ? (
                        logs.map((log) => {
                            const level = getEmissionLevel(log.carbon);
                            return (
                                <li key={log.id} className={`log-item ${level}-emission`}>
                                    <div className="log-content">
                                        <div className="log-activity">{log.activity}</div>
                                        <div className="log-meta">Recorded activity</div>
                                    </div>
                                    <span className={`log-badge badge-${level}`}>
                                        {getBadgeText(level)}
                                    </span>
                                    <div className="emission-value">
                                        <span className="emission-amount">{log.carbon}</span>
                                        <span className="emission-unit">kg CO2</span>
                                    </div>
                                </li>
                            );
                        })
                    ) : (
                        <div className="logs-empty">
                            <p>No logs recorded yet</p>
                        </div>
                    )}
                </ol>
            </div>
        </div>
    )
}

export default Logs;