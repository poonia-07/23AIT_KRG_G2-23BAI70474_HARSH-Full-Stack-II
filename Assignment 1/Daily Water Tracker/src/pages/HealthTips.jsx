import React, { useState ,useEffect} from 'react';
function HealthTips() {
  const [data, setData] = useState("Drink at least 8 glasses of water daily");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://api.adviceslip.com/advice"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Today’s Health Tip: {data.slip.advice}</h1>
      {/* <h1 className="text-2xl font-bold mb-4">Health Tips</h1>
      <ul className="list-disc pl-5 space-y-2">
        <li>Drink at least 8 glasses of water daily.</li>
        <li>Eat a balanced diet rich in fruits and vegetables.</li>
        <li>Exercise regularly to stay fit and healthy.</li>
        <li>Get adequate sleep (7-8 hours per night).</li>
        <li>Maintain good hygiene practices.</li>
      </ul> */}
    </div>  
    );
}

export default HealthTips;
