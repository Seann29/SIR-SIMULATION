var myChart;

function initializeChart(){
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Infectés',
                    data: [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.1)',
                    tension: 0.1
                },
                {
                    label: 'Guéris',
                    data: [],
                    borderColor: 'gray',
                    backgroundColor: 'gray',
                    tension: 0.1
                },
                {
                    label: 'suspect',
                    data: [],
                    borderColor: 'black',
                    backgroundColor: 'black',
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Évolution de l\'épidémie'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function afficherSimulation(testData){
    if(myChart && testData){
        myChart.data.labels = testData.duree;
        myChart.data.datasets[0].data = testData.Infecte;
        myChart.data.datasets[1].data = testData.Retabli;
        myChart.data.datasets[2].data = testData.suspect;
        myChart.update();
    }
}

window.addEventListener("DOMContentLoaded",()=>{
    initializeChart();
    // Charger la simulation par défaut si elle existe
    if(typeof test !== 'undefined' && test){
        afficherSimulation(test);
    }
});
