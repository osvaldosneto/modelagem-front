let tempChart;
let distData = [];
let timeData = [];

document.addEventListener('DOMContentLoaded', (event) => {
    const tempCtx = document.getElementById('distanciaChart').getContext('2d');

    function createChart() {
        return new Chart(tempCtx, {
            type: 'line',
            data: {
                labels: timeData,
                datasets: [{
                    label: 'Distância (cm)',
                    data: distData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute'
                        },
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function updateCharts(data) {
        // Limpar os dados anteriores
        timeData.length = 0;
        distData.length = 0;

        data.forEach(entry => {
            const time = new Date(entry.created_at);
            const temp = parseFloat(entry.value);

            timeData.push(time);
            distData.push(temp);
        });

        // Se o gráfico já existir, destruí-lo
        if (tempChart) {
            tempChart.destroy();
        }

        // Criar um novo gráfico com os dados atualizados
        tempChart = createChart();
    }

    //função para fazer o get na API que resgata os dados
    window.fetchAndUpdateData = function() {
        //aqui deve ser implementada a função de recebimento dos dados da platraforma thingspeak
        fetch('http://localhost:3000/data')
            .then(response => response.json())
            .then(data => {
                updateCharts(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    //intervalo entre as atualizações
    setInterval(fetchAndUpdateData, 5000); // 50000 ms = 5 segundos
});

function sendSMS(){
    // implemente a lógica de envio de SMS aqui
    // aqui deve-se enviar uma requisição ao servidor avisando para enviar o sms
    console.log("teste")
    fetch('http://localhost:3000/sendSMS')
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error('Error fetching data:', error));
}