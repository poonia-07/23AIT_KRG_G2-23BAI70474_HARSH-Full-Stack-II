import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
    return (
        <header className="header"> 
            <div className="header-container">
                <h1>EcoTrack</h1>
                <nav className="header-nav">
                    <Link to = "/">Dashboard</Link>
                    <Link to = "/logs">Logs</Link>
                    <Link to = "/login">Login</Link>
                </nav>
            </div>
        </header>
    )
}
export default Header;