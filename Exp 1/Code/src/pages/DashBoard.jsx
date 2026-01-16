
import logs from "../data/logs";

const DashBoard=()=>{
  return (
    <div>
        <div>
        <h2>Total Carbon Emissions:{logs.reduce((sum, value) => sum + value.carbon, 0)} kg CO2</h2>
        </div>
        <div>
            <ul>
            {logs.map(log => (
                <li key = {log.id}>
                    {log.activity}: {log.carbon} kg CO2
                </li>
            ))}
            </ul>
        </div>
    </div>
  )
};
export default DashBoard;