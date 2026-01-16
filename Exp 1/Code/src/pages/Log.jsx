import logs from "../data/logs";


function Log() {
    return (
        <div>
            <p>High Carbon Emission Activities:</p>
            <ul>
                {
                    logs.map((log) => {
                        if( log.carbon >= 4){
                            return (<li key = {log.id} style = {{color: 'red'}}>
                                {log.activity}: {log.carbon} kg CO2
                            </li>)
                        }
                        return null;
                    }

                    )
                }
                
            </ul>
            <p>Low Carbon Emission Activities:</p>
            <ul>
                {
                    logs.map((log) => {
                        if( log.carbon < 4){
                            return (<li key = {log.id} style = {{color: 'green'}}>
                                {log.activity}: {log.carbon} kg CO2
                            </li>)
                        }
                        return null;
                    }

                    )
                }
                
            </ul>
        </div>
    )
}

export default Log;