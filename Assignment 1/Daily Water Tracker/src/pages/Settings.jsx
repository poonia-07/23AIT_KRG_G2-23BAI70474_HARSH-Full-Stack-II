
function LogOut(){
    window.localStorage.removeItem('isLoggedIn');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('password');
    window.alert("You have been logged out!");
    window.location.reload();
}

function Settings() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p>Here you can adjust your preferences and account settings.</p>
      <button onClick={LogOut} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Logout</button>
      <button onClick={() => alert("Water goal set successfully!")} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 ml-4">Set Water Goal</button>
    </div>
  );
}   

export default Settings;