import "./DashboardSettings.css";
import { useState } from "react";

const DashboardSettings = () => {
    const [settings, setSettings] = useState({
        username: "john_doe",
        email: "john@example.com",
        theme: "light",
        notifications: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSave = () => {
        console.log("Settings saved:", settings);
        alert("Settings saved successfully!");
    };

    const handleReset = () => {
        setSettings({
            username: "john_doe",
            email: "john@example.com",
            theme: "light",
            notifications: true,
        });
    };

    return (
        <div className="settings-container">
            <div className="settings-header">
                <h3>Settings</h3>
                <p className="settings-description">Manage your account and application preferences</p>
            </div>
            
            <div className="settings-section">
                <h4>Account Settings</h4>
                <div className="settings-group">
                    <div className="settings-field">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={settings.username}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="settings-field">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={settings.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            
            <div className="settings-section">
                <h4>Preferences</h4>
                <div className="settings-group">
                    <div className="settings-field">
                        <label htmlFor="theme">Theme</label>
                        <select
                            id="theme"
                            name="theme"
                            value={settings.theme}
                            onChange={handleChange}
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="auto">Auto</option>
                        </select>
                    </div>
                    
                    <div className="settings-field">
                        <label htmlFor="notifications">
                            <input
                                type="checkbox"
                                id="notifications"
                                name="notifications"
                                checked={settings.notifications}
                                onChange={handleChange}
                            />
                            {" "}Enable Notifications
                        </label>
                    </div>
                </div>
            </div>
            
            <div className="settings-actions">
                <button className="settings-btn btn-primary" onClick={handleSave}>
                    Save Changes
                </button>
                <button className="settings-btn btn-secondary" onClick={handleReset}>
                    Reset to Defaults
                </button>
            </div>
        </div>
    )
}

export default DashboardSettings;