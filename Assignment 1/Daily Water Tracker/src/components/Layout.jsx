import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav className="bg-blue-600 text-white p-4 flex gap-4">
        <Link to="/">DashBoard</Link>
        <Link to="/healthTips">Health Tips</Link>
        <Link to="/settings">Settings</Link>
      </nav>

      <div className="p-6">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;