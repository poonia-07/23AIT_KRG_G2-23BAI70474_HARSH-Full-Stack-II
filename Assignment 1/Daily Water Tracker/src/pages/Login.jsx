import React, { useState , useEffect, use} from 'react';
import { useNavigate } from "react-router-dom";
// import Home from "../pages/Home"
import { useSelector , useDispatch} from 'react-redux';
import { setIsLoggedIn,setUsername } from "../Features/AuthSlice";


function Login() {
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert(`Username: ${username}\nPassword: ${password}`);
    window.localStorage.setItem('username', username);
    window.localStorage.setItem('password', password);
    window.localStorage.setItem('isLoggedIn', 'true');
    dispatch(setIsLoggedIn(true));
    dispatch(setUsername(username));
    navigate("/");
    // console.log({ isAuthenticated, user });
    };
    useEffect(() => {
        console.log({ isAuthenticated, user });
      }, [isAuthenticated, user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUser(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        
      </div>
    </div>
  );
}

export default Login;