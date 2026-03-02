import { useSelector} from 'react-redux';
import { useState } from 'react';

function Home() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.username);
    const [waterIntake, setWaterIntake] = useState(0);
    const [message, setMessage] = useState(false);

    const addWaterIntake = () => {
        setWaterIntake(waterIntake + 1);
        if(waterIntake + 1 >= 8) {
            setMessage(true);
        }
    }

    const removeWaterIntake = () => {
        if(waterIntake > 0) {
            setWaterIntake(waterIntake - 1);
        }
        if(waterIntake - 1 < 8) {
            setMessage(false);
        }
    }

    const resetWaterIntake = () => {
        setWaterIntake(0);
        setMessage(false);
    } 
    
  return (
    <div className="text-center mt-4">
      <p className="text-gray-600">Welcome, {user}!</p>
      <p className="text-gray-600 mt-2">This is your dashboard where you can track your daily water intake and access health tips.</p>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Daily Water Intake</h2>
        <p className="text-3xl font-bold mb-4">{waterIntake} glasses</p>
        <div className="flex justify-center gap-4">
          <button onClick={addWaterIntake} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Add Glass</button>
          <button onClick={removeWaterIntake} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Remove Glass</button>
          <button onClick={resetWaterIntake} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Reset</button>
        </div>
        {message && <p className="text-green-500 mt-4">Great job! You've reached your daily water intake goal!</p>}
      </div>
    </div>
  );
}

export default Home;