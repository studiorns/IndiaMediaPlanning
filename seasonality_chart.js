// Format large numbers for better readability
const formatImpressions = (num) => {
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

// Data from Country Data.csv for India
const indiaData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    travelQueries2024: [118.222, 123.2072, 113.0767, 123.2651, 116.7668, 97.4746, 111.4929, 124.0744, 180.1942, 149.0372, 142.7999, 142.0537],
    hotelGuests2024: [26842, 25715, 30133, 26636, 32950, 25710, 22137, 17221, 26383, 36480, 43636, 43813],
    impressions2025: [308059995, 834140149, 1031750573, 2052809431, 2064921296, 865852843, 774169937, 774169937, 1377372476, 1961987179, 1491941387, 2101915441]
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
    
    // Enhanced color palette with better contrast and accessibility
    const colors = {
        impressions: {
            main: '#4285f4',
            background: 'rgba(66, 133, 244, 0.15)',
            highlight: '#5a95f5'
        },
        travelQueries: {
            main: '#ea4335',
            background: 'rgba(234, 67, 53, 0.15)',
            highlight: '#f05545'
        },
        hotelGuests: {
            main: '#fbbc04',
            background: 'rgba(251, 188, 4, 0.15)',
            highlight: '#ffc824'
        },
        grid: 'rgba(255, 255, 255, 0.07)',
        text: '#e0e0e0',
        tooltipBg: 'rgba(20, 20, 20, 0.95)'
    };
    
    // Create the chart with enhanced styling
    const seasonalityChart = new Chart(seasonalityCtx.getContext('2d'), {
        type: 'line',
        data: {
            labels: indiaData.months,
            datasets: [
                {
                    label: 'Impressions 2025 (planned)',
                    data: indiaData.impressions2025,
                    backgroundColor: colors.impressions.background,
                    borderColor: colors.impressions.main,
                    borderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: colors.impressions.main,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverBackgroundColor: colors.impressions.highlight,
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2,
                    tension: 0.3,
                    fill: false,
                    yAxisID: 'y-impressions'
                },
                {
                    label: 'Travel Queries 2024',
                    data: indiaData.travelQueries2024,
                    backgroundColor: colors.travelQueries.background,
                    borderColor: colors.travelQueries.main,
                    borderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: colors.travelQueries.main,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverBackgroundColor: colors.travelQueries.highlight,
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2,
                    tension: 0.3,
                    fill: false,
                    yAxisID: 'y-queries'
                },
                {
                    label: 'Hotel Guests 2024',
                    data: indiaData.hotelGuests2024,
                    backgroundColor: colors.hotelGuests.background,
                    borderColor: colors.hotelGuests.main,
                    borderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: colors.hotelGuests.main,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverBackgroundColor: colors.hotelGuests.highlight,
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2,
                    tension: 0.3,
                    fill: false,
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
                    align: 'center',
                    labels: {
                        color: colors.text,
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        boxWidth: 10,
                        boxHeight: 10,
                        font: {
                            size: 13,
                            weight: '500'
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Monthly Trends: Impressions, Travel Queries & Hotel Guests (India)',
                    color: colors.text,
                    font: {
                        size: 18,
                        weight: 'bold',
                        lineHeight: 1.4
                    },
                    padding: {
                        top: 15,
                        bottom: 25
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: colors.tooltipBg,
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    boxPadding: 6,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const value = context.raw || 0;
                            
                            if (context.datasetIndex === 0) { // Impressions
                                return `${label}: ${formatImpressions(value)}`;
                            } else if (context.datasetIndex === 1) { // Travel Queries
                                return `${label}: ${value.toFixed(1)}`;
                            } else { // Hotel Guests
                                return `${label}: ${value.toLocaleString()}`;
                            }
                        },
                        labelPointStyle: function(context) {
                            return {
                                pointStyle: 'circle',
                                rotation: 0
                            };
                        }
                    },
                    padding: 12,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    },
                    caretSize: 8,
                    caretPadding: 8
                }
            },
            scales: {
                x: {
                    grid: {
                        color: colors.grid,
                        tickLength: 8,
                        tickWidth: 1,
                        drawBorder: true,
                        drawOnChartArea: true,
                        drawTicks: true
                    },
                    ticks: {
                        color: colors.text,
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        padding: 8
                    },
                    border: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                },
                'y-impressions': {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: {
                        color: colors.grid,
                        tickLength: 8,
                        tickWidth: 1,
                        drawBorder: true,
                        drawOnChartArea: true,
                        drawTicks: true
                    },
                    border: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        color: colors.impressions.main,
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        padding: 10,
                        callback: function(value) {
                            return formatImpressions(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'Impressions',
                        color: colors.impressions.main,
                        font: {
                            size: 13,
                            weight: 'bold'
                        },
                        padding: {
                            top: 0,
                            bottom: 10
                        }
                    }
                },
                'y-queries': {
                    type: 'linear',
                    display: false, // Hide the axis but keep the dataset linked to it
                    position: 'right',
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        display: false, // Hide the tick values
                        color: colors.travelQueries.main
                    },
                    title: {
                        display: false, // Hide the axis title
                        text: 'Travel Queries',
                        color: colors.travelQueries.main,
                        font: {
                            size: 13,
                            weight: 'bold'
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
                    border: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        color: colors.hotelGuests.main,
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        padding: 10,
                        callback: function(value) {
                            return formatImpressions(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'Hotel Guests',
                        color: colors.hotelGuests.main,
                        font: {
                            size: 13,
                            weight: 'bold'
                        },
                        padding: {
                            top: 0,
                            bottom: 10
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart',
                delay: function(context) {
                    // Stagger animations for a more engaging effect
                    return context.datasetIndex * 300;
                }
            },
            elements: {
                line: {
                    tension: 0.3,
                    borderWidth: 3,
                    borderCapStyle: 'round',
                    borderJoinStyle: 'round',
                    capBezierPoints: true
                },
                point: {
                    radius: 6,
                    hoverRadius: 8,
                    hitRadius: 10,
                    hoverBorderWidth: 2
                }
            },
            layout: {
                padding: {
                    top: 10,
                    right: 25,
                    bottom: 10,
                    left: 25
                }
            }
        }
    });
    
    // Add annotations to highlight key insights
    const peakMonths = [
        { month: 'Sep', label: 'Travel Query Peak', datasetIndex: 1 },
        { month: 'Nov', label: 'Hotel Guest Peak', datasetIndex: 2 },
        { month: 'Apr', label: 'Impression Peak', datasetIndex: 0 }
    ];
    
    // Log to confirm chart creation
    console.log('Enhanced seasonality chart created successfully:', seasonalityChart);
});
