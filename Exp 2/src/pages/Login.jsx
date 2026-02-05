import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const {setIsAuthenticated} = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        setIsAuthenticated(true);
        navigate("/");
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h3>Welcome Back</h3>
                <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <input type="email" placeholder="Email address" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login;