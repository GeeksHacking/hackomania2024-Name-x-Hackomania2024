document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('energyChart').getContext('2d');
    const timeScaleSelect = document.getElementById('timeScale');
    let currentChart;

    function generateRandomData(count) {
        return Array.from({ length: count }, () => Math.floor(Math.random() * 50) + 1);
    }

    function updateChart(timeScale) {
        const labels = {
            hours: Array.from({ length: 24 }, (_, i) => `${i + 1}h`),
            days: Array.from({ length: 30 }, (_, i) => `${i + 1}d`),
            months: Array.from({ length: 12 }, (_, i) => `${i + 1}m`)
        }[timeScale];

        const data = generateRandomData(labels.length);

        if (currentChart) {
            currentChart.destroy(); // Destroy the previous chart instance before creating a new one
        }

        currentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Energy Consumed (kWh)',
                    data: data,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Initial chart rendering
    updateChart('hours');

    // Update chart when a new time scale is selected
    timeScaleSelect.addEventListener('change', function() {
        updateChart(this.value);
    });
});
