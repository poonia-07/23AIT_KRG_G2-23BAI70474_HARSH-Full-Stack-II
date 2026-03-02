import Login from "./pages/Login"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUsername } from "./Features/AuthSlice";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HealthTips from "./pages/HealthTips";
import Settings from "./pages/Settings";
import { useSelector } from "react-redux";
import ProtectedRoute from "./services/ProtectedRoute";
import { Navigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedLogin = localStorage.getItem("isLoggedIn");

    if (storedLogin === "true") {
      dispatch(setIsLoggedIn(true));
      dispatch(setUsername(storedUsername));
    }
  }, []);

  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated 
            ? <Navigate to="/" replace /> 
            : <Login />
        } 
      />

      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="healthTips" element={<HealthTips />} />
        <Route path="settings" element={<Settings />} />
      </Route>

    </Routes>
  );
}

export default App
