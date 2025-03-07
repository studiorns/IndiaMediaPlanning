// Define the 2025 Planned Impressions (Monthly) data
const plannedImpressions2025 = [
    308059995,    // Jan
    834140150,    // Feb
    1031750574,   // Mar
    2052809431,   // Apr (updated)
    2064921296,   // May (updated)
    865852843,    // Jun (updated)
    774169937,    // Jul (updated)
    774169937,    // Aug (updated)
    1377372477,   // Sep
    1961987179,   // Oct
    1491941387,   // Nov (updated)
    2101915441    // Dec (updated)
];

// Define the 2025 Optimized Impressions (Monthly) data
const optimizedImpressions2025 = [
    385074994,    // Jan: +25% to support March-April secondary peak
    542191098,    // Feb: -35% reduction as currently over-allocated
    1031750574,   // Mar: unchanged
    1744888016,   // Apr: -15% reduction (updated)
    1651937037,   // May: -20% reduction (updated)
    865852843,    // Jun: unchanged (updated)
    890295428,    // Jul: +15% increase for September shoulder season (updated)
    929003924,    // Aug: +20% increase for September shoulder season (updated)
    1900774018,   // Sep: +38% increase to capture November-December peak
    2648682692,   // Oct: +35% increase to capture November-December peak
    1491941387,   // Nov: unchanged (updated)
    1576436581    // Dec: -25% reduction as too late for high-season travel (updated)
];

// Update the campaign data with the new impression values
if (typeof campaignData !== 'undefined' && campaignData.mediaImpressions) {
    campaignData.mediaImpressions.proposed = plannedImpressions2025;
}

// Calculate percentage difference between planned and optimized
const percentageDiffs = plannedImpressions2025.map((planned, index) => {
    const optimized = optimizedImpressions2025[index];
    const percentDiff = ((optimized - planned) / planned) * 100;
    return percentDiff;
});

// Format large numbers for better readability - check if function already exists
// to avoid duplicate declaration errors
if (typeof window.formatNumber === 'undefined') {
    window.formatNumber = (num) => {
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
}

// Format numbers with commas for display
const formatNumberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Optimized Media Impressions Chart
const optimizedImpressionsCtx = document.getElementById('optimizedImpressionsChart').getContext('2d');

new Chart(optimizedImpressionsCtx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: '2025 Planned Impressions',
                data: plannedImpressions2025,
                backgroundColor: 'rgba(66, 133, 244, 0.7)',
                borderColor: '#4285f4',
                borderWidth: 1,
                order: 2
            },
            {
                label: '2025 Optimized Impressions',
                data: optimizedImpressions2025,
                backgroundColor: 'rgba(52, 168, 83, 0.7)',
                borderColor: '#34a853',
                borderWidth: 1,
                order: 1
            },
            {
                label: 'Optimization % Change',
                data: percentageDiffs,
                type: 'line',
                backgroundColor: 'rgba(251, 188, 4, 0.2)',
                borderColor: '#fbbc04',
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#fbbc04',
                pointBorderColor: '#fff',
                pointHoverRadius: 6,
                yAxisID: 'y1',
                order: 0
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
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
                text: '2025 Media Impressions: Planned vs Optimized for Booking Window',
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
                        
                        if (context.datasetIndex === 2) { // Percentage change dataset
                            return `${label}: ${value.toFixed(1)}%`;
                        } else {
                            return `${label}: ${formatNumber(value)}`;
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
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#e0e0e0',
                    callback: function(value) {
                        return formatNumber(value);
                    }
                },
                title: {
                    display: true,
                    text: 'Impressions',
                    color: '#e0e0e0',
                    font: {
                        size: 12
                    }
                }
            },
            y1: {
                position: 'right',
                grid: {
                    drawOnChartArea: false
                },
                ticks: {
                    color: '#fbbc04',
                    callback: function(value) {
                        return value.toFixed(0) + '%';
                    }
                },
                title: {
                    display: true,
                    text: 'Optimization % Change',
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

// Print the planned and optimized impressions data for reference
console.log("2025 Planned Impressions (Monthly):");
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
months.forEach((month, index) => {
    console.log(`${month}: ${formatNumberWithCommas(plannedImpressions2025[index])}`);
});

console.log("\n2025 Optimized Impressions (Monthly):");
months.forEach((month, index) => {
    console.log(`${month}: ${formatNumberWithCommas(optimizedImpressions2025[index])}`);
});

console.log("\nOptimization Insights:");
console.log("These optimizations maintain the same total annual impressions while strategically redistributing them to better align with the booking window and seasonal travel patterns. The key strategy is to increase impressions 44 days (the average booking window) before peak travel periods and reduce them during less effective periods.");
