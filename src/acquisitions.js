//import Chart from 'chart.js/auto'



async function createChart(hourlyPeriods){
    const dataSet = []

    for (let i = 0; i < 24; i++){
        const hourlyInfo = makeDataSet(hourlyPeriods[i])
        dataSet.push(hourlyInfo)
    }

    new Chart(
        document.getElementById('acquisitions'),
        {
            type: 'line',
            data: {
                labels: dataSet.map(row => row.hour),
                datasets: [
                    {
                        label: 'Temperature by the hour',
                        data: dataSet.map(row => row.temperature)
                    }
                ]
            }
        }
    );
}

export default createChart