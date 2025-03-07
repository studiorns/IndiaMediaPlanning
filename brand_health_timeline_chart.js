// Brand Health Timeline Chart for India
document.addEventListener('DOMContentLoaded', function() {
    console.log("Brand Health Timeline Chart script loaded");
    
    // Initialize the Brand Health Timeline Chart
    createBrandHealthTimelineChart();
});

// Create Brand Health Timeline Chart
function createBrandHealthTimelineChart() {
    const ctx = document.getElementById('brandHealthTimelineChartNew');
    if (!ctx) {
        console.error("brandHealthTimelineChartNew canvas not found");
        return;
    }
    
    console.log("Creating brand health timeline chart");
    
    // India brand health data from Brand Health Metrics.csv
    const indiaData = {
        // Quarters
        quarters: ['Q3 2022', 'Q4 2022', 'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 
                  'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 
                  'Q1 2025 target', 'Q2 2025 target', 'Q3 2025 target', 'Q4 2025 target'],
        
        // Awareness data for India
        awareness: [93.19, 93.00, 93.00, 93.00, 93.00, 94.00, 
                   93.77, 94.60, 93.80, 94.50, 
                   94.50, 94.50, 94.50, 94.50],
        
        // Consideration data for India
        consideration: [73.19, 75.00, 75.00, 75.00, 74.00, 74.34, 
                       73.65, 75.00, 71.70, 74.36, 
                       74.50, 74.60, 74.70, 75.00],
        
        // Intent data for India
        intent: [61.09, 62.00, 63.00, 62.00, 62.00, 63.00, 
                63.00, 63.20, 63.00, 64.60, 
                64.70, 64.80, 64.90, 65.17]
    };
    
    // Split data into actual and target datasets
    const actualQuarters = indiaData.quarters.slice(0, 10); // Q3 2022 to Q4 2024
    const targetQuarters = indiaData.quarters.slice(10); // Q1 2025 target to Q4 2025 target
    
    // Actual data (Q3 2022 to Q4 2024)
    const awarenessActual = indiaData.awareness.slice(0, 10);
    const considerationActual = indiaData.consideration.slice(0, 10);
    const intentActual = indiaData.intent.slice(0, 10);
    
    // Target data (Q1 2025 to Q4 2025)
    const awarenessTarget = indiaData.awareness.slice(10);
    const considerationTarget = indiaData.consideration.slice(10);
    const intentTarget = indiaData.intent.slice(10);
    
    // Create arrays with null values for proper alignment
    const awarenessActualFull = [...awarenessActual, null, null, null, null];
    const considerationActualFull = [...considerationActual, null, null, null, null];
    const intentActualFull = [...intentActual, null, null, null, null];
    
    const awarenessTargetFull = [null, null, null, null, null, null, null, null, null, null, ...awarenessTarget];
    const considerationTargetFull = [null, null, null, null, null, null, null, null, null, null, ...considerationTarget];
    const intentTargetFull = [null, null, null, null, null, null, null, null, null, null, ...intentTarget];
    
    // Create the chart
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: indiaData.quarters,
            datasets: [
                // Actual data series
                {
                    label: 'Awareness (Actual)',
                    data: awarenessActualFull,
                    borderColor: '#4285f4',
                    backgroundColor: 'rgba(66, 133, 244, 0.1)',
                    borderWidth: 3,
                    pointRadius: 4,
                    pointBackgroundColor: '#4285f4',
                    pointBorderColor: '#fff',
                    pointHoverRadius: 6,
                    fill: false,
                    tension: 0.2
                },
                {
                    label: 'Consideration (Actual)',
                    data: considerationActualFull,
                    borderColor: '#34a853',
                    backgroundColor: 'rgba(52, 168, 83, 0.1)',
                    borderWidth: 3,
                    pointRadius: 4,
                    pointBackgroundColor: '#34a853',
                    pointBorderColor: '#fff',
                    pointHoverRadius: 6,
                    fill: false,
                    tension: 0.2
                },
                {
                    label: 'Intent (Actual)',
                    data: intentActualFull,
                    borderColor: '#fbbc04',
                    backgroundColor: 'rgba(251, 188, 4, 0.1)',
                    borderWidth: 3,
                    pointRadius: 4,
                    pointBackgroundColor: '#fbbc04',
                    pointBorderColor: '#fff',
                    pointHoverRadius: 6,
                    fill: false,
                    tension: 0.2
                },
                // Target data series with dotted lines
                {
                    label: 'Awareness (2025 Target)',
                    data: awarenessTargetFull,
                    borderColor: '#4285f4',
                    backgroundColor: 'rgba(66, 133, 244, 0.0)',
                    borderWidth: 2,
                    borderDash: [5, 5], // Dotted line
                    pointRadius: 4,
                    pointBackgroundColor: '#4285f4',
                    pointBorderColor: '#fff',
                    pointStyle: 'triangle', // Different point style for targets
                    pointHoverRadius: 6,
                    fill: false,
                    tension: 0.2
                },
                {
                    label: 'Consideration (2025 Target)',
                    data: considerationTargetFull,
                    borderColor: '#34a853',
                    backgroundColor: 'rgba(52, 168, 83, 0.0)',
                    borderWidth: 2,
                    borderDash: [5, 5], // Dotted line
                    pointRadius: 4,
                    pointBackgroundColor: '#34a853',
                    pointBorderColor: '#fff',
                    pointStyle: 'triangle', // Different point style for targets
                    pointHoverRadius: 6,
                    fill: false,
                    tension: 0.2
                },
                {
                    label: 'Intent (2025 Target)',
                    data: intentTargetFull,
                    borderColor: '#fbbc04',
                    backgroundColor: 'rgba(251, 188, 4, 0.0)',
                    borderWidth: 2,
                    borderDash: [5, 5], // Dotted line
                    pointRadius: 4,
                    pointBackgroundColor: '#fbbc04',
                    pointBorderColor: '#fff',
                    pointStyle: 'triangle', // Different point style for targets
                    pointHoverRadius: 6,
                    fill: false,
                    tension: 0.2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'India Brand Health Metrics Timeline',
                    color: '#e0e0e0',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                },
                legend: {
                    position: 'top',
                    labels: {
                        color: '#e0e0e0',
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y.toFixed(2) + '%';
                            }
                            return label;
                        }
                    },
                    padding: 12,
                    backgroundColor: 'rgba(20, 20, 20, 0.9)',
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 14
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e0e0e0',
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e0e0e0',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    min: 50, // Start y-axis from 50% for better visualization
                    max: 100,
                    title: {
                        display: true,
                        text: 'Percentage',
                        color: '#e0e0e0',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            elements: {
                line: {
                    tension: 0.3
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}
