// Data from Country Data.csv for India
const indiaData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    travelQueries2024: [118.222, 123.2072, 113.0767, 123.2651, 116.7668, 97.4746, 111.4929, 124.0744, 180.1942, 149.0372, 142.7999, 142.0537],
    hotelGuests2024: [26842, 25715, 30133, 26636, 32950, 25710, 22137, 17221, 26383, 36480, 43636, 43813],
    impressions2025: [308059995, 834140149, 1031750573, 2052809431, 2064921296, 865852843, 774169937, 774169937, 1377372476, 1961987179, 1491941387, 2101915441]
};

// Format large numbers for better readability
const formatNumber = (num) => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num;
};

// Initialize the seasonality chart when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing seasonality chart...');
    
    // Get the canvas element
    const seasonalityCtx = document.getElementById('seasonalityChart');
    
    if (!seasonalityCtx) {
        console.error('Could not find seasonalityChart canvas element');
        return;
    }
    
    console.log('Found seasonalityChart canvas element:', seasonalityCtx);
    
    // Create the seasonality chart
    const seasonalityChart = new Chart(seasonalityCtx, {
        type: 'line',
        data: {
            labels: indiaData.months,
            datasets: [
                {
                    label: 'Impressions 2025 (planned)',
                    data: indiaData.impressions2025,
                    backgroundColor: 'rgba(66, 133, 244, 0.1)',
                    borderColor: '#4285f4',
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: '#4285f4',
                    tension: 0.2,
                    yAxisID: 'y-impressions'
                },
                {
                    label: 'Travel Queries 2024',
                    data: indiaData.travelQueries2024,
                    backgroundColor: 'rgba(234, 67, 53, 0.1)',
                    borderColor: '#ea4335',
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: '#ea4335',
                    tension: 0.2,
                    yAxisID: 'y-queries'
                },
                {
                    label: 'Hotel Guests 2024',
                    data: indiaData.hotelGuests2024,
                    backgroundColor: 'rgba(251, 188, 4, 0.1)',
                    borderColor: '#fbbc04',
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: '#fbbc04',
                    tension: 0.2,
                    yAxisID: 'y-guests'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#e0e0e0',
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Monthly Trends: Impressions, Travel Queries & Hotel Guests (India)',
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
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const value = context.raw || 0;
                            
                            if (context.datasetIndex === 0) { // Impressions
                                return `${label}: ${formatNumber(value)}`;
                            } else if (context.datasetIndex === 1) { // Travel Queries
                                return `${label}: ${value.toFixed(1)}`;
                            } else { // Hotel Guests
                                return `${label}: ${value.toLocaleString()}`;
                            }
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
                        color: '#e0e0e0'
                    }
                },
                'y-impressions': {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#4285f4',
                        callback: function(value) {
                            return formatNumber(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'Impressions',
                        color: '#4285f4',
                        font: {
                            size: 12
                        }
                    }
                },
                'y-queries': {
                    type: 'linear',
                    display: false, // Hide the entire axis
                    position: 'right',
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        display: false
                    },
                    title: {
                        display: false, // Hide the axis title as well
                        text: 'Travel Queries',
                        color: '#ea4335',
                        font: {
                            size: 12
                        }
                    }
                },
                'y-guests': {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: '#fbbc04',
                        callback: function(value) {
                            return formatNumber(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'Hotel Guests',
                        color: '#fbbc04',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
    
    // Log to confirm chart creation
    console.log('Seasonality chart created successfully:', seasonalityChart);
});
