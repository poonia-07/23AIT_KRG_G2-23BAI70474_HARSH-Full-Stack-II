import Header from "./components/header.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import Log from "./pages/Log.jsx";

 

function App() {
  return ( <>
    <Header title={"Ecotracker"}/>
    <DashBoard />
    <p>Welcome to EcoTrack!</p>
    <Log />
    </>
  )
  
}

export default App
