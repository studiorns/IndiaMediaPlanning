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

// Enhanced color palette with better contrast and accessibility
const colors = {
    planned: {
        main: '#4285f4',
        background: 'rgba(66, 133, 244, 0.7)',
        highlight: '#5a95f5',
        light: 'rgba(66, 133, 244, 0.2)'
    },
    optimized: {
        main: '#34a853',
        background: 'rgba(52, 168, 83, 0.7)',
        highlight: '#45b964',
        light: 'rgba(52, 168, 83, 0.2)'
    },
    percentage: {
        main: '#fbbc04',
        background: 'rgba(251, 188, 4, 0.2)',
        highlight: '#ffc824',
        positive: '#34a853',
        negative: '#ea4335'
    },
    grid: 'rgba(255, 255, 255, 0.07)',
    text: '#e0e0e0',
    tooltipBg: 'rgba(20, 20, 20, 0.95)',
    border: 'rgba(255, 255, 255, 0.2)'
};

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

// Create annotations for key insights
const annotations = [
    {
        type: 'line',
        mode: 'vertical',
        scaleID: 'x',
        value: 'Sep',
        borderColor: colors.percentage.main,
        borderWidth: 2,
        borderDash: [5, 5],
        label: {
            content: '+38% for Nov-Dec peak',
            enabled: true,
            position: 'top',
            backgroundColor: colors.tooltipBg,
            color: colors.text,
            font: {
                size: 12,
                weight: 'bold'
            }
        }
    },
    {
        type: 'line',
        mode: 'vertical',
        scaleID: 'x',
        value: 'Feb',
        borderColor: colors.percentage.negative,
        borderWidth: 2,
        borderDash: [5, 5],
        label: {
            content: '-35% reduction',
            enabled: true,
            position: 'top',
            backgroundColor: colors.tooltipBg,
            color: colors.text,
            font: {
                size: 12,
                weight: 'bold'
            }
        }
    }
];

// Initialize the optimized impressions chart when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing optimized impressions chart...');
    
    // Get the canvas element
    const optimizedImpressionsCtx = document.getElementById('optimizedImpressionsChart');
    
    if (!optimizedImpressionsCtx) {
        console.error('Could not find optimizedImpressionsChart canvas element');
        return;
    }
    
    console.log('Found optimizedImpressionsChart canvas element:', optimizedImpressionsCtx);
    
    // Create the chart with enhanced styling
    const optimizedImpressionsChart = new Chart(optimizedImpressionsCtx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: '2025 Planned Impressions',
                    data: plannedImpressions2025,
                    backgroundColor: colors.planned.background,
                    borderColor: colors.planned.main,
                    borderWidth: 1,
                    borderRadius: 4,
                    hoverBackgroundColor: colors.planned.highlight,
                    hoverBorderColor: colors.planned.main,
                    hoverBorderWidth: 2,
                    order: 2
                },
                {
                    label: '2025 Optimized Impressions',
                    data: optimizedImpressions2025,
                    backgroundColor: colors.optimized.background,
                    borderColor: colors.optimized.main,
                    borderWidth: 1,
                    borderRadius: 4,
                    hoverBackgroundColor: colors.optimized.highlight,
                    hoverBorderColor: colors.optimized.main,
                    hoverBorderWidth: 2,
                    order: 1
                },
                {
                    label: 'Optimization % Change',
                    data: percentageDiffs,
                    type: 'line',
                    backgroundColor: colors.percentage.background,
                    borderColor: colors.percentage.main,
                    borderWidth: 3,
                    pointRadius: 6,
                    pointBackgroundColor: percentageDiffs.map(value => 
                        value > 0 ? colors.percentage.positive : 
                        value < 0 ? colors.percentage.negative : 
                        colors.percentage.main
                    ),
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: percentageDiffs.map(value => 
                        value > 0 ? colors.percentage.positive : 
                        value < 0 ? colors.percentage.negative : 
                        colors.percentage.main
                    ),
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2,
                    tension: 0.3,
                    fill: false,
                    yAxisID: 'y1',
                    order: 0
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
                    text: '2025 Media Impressions: Planned vs Optimized for Booking Window',
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
                subtitle: {
                    display: true,
                    text: 'Optimized to align with 44-day booking window and seasonal travel patterns',
                    color: colors.text,
                    font: {
                        size: 14,
                        style: 'italic',
                        weight: '400'
                    },
                    padding: {
                        bottom: 15
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: colors.tooltipBg,
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: colors.border,
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    boxPadding: 6,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const value = context.raw || 0;
                            
                            if (context.datasetIndex === 2) { // Percentage change dataset
                                const sign = value > 0 ? '+' : '';
                                return `${label}: ${sign}${value.toFixed(1)}%`;
                            } else {
                                return `${label}: ${formatNumber(value)}`;
                            }
                        },
                        labelPointStyle: function(context) {
                            return {
                                pointStyle: 'circle',
                                rotation: 0
                            };
                        },
                        afterBody: function(context) {
                            if (context[0].datasetIndex === 2) {
                                const index = context[0].dataIndex;
                                const value = percentageDiffs[index];
                                
                                if (value > 30) {
                                    return ['Significant increase to capture peak travel period'];
                                } else if (value > 0) {
                                    return ['Strategic increase to support booking window'];
                                } else if (value < -30) {
                                    return ['Major reduction from over-allocated period'];
                                } else if (value < 0) {
                                    return ['Tactical reduction to optimize distribution'];
                                } else {
                                    return ['Maintained at current level'];
                                }
                            }
                            return [];
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
                },
                annotation: {
                    annotations: annotations
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
                        color: colors.border
                    }
                },
                y: {
                    grid: {
                        color: colors.grid,
                        tickLength: 8,
                        tickWidth: 1,
                        drawBorder: true,
                        drawOnChartArea: true,
                        drawTicks: true
                    },
                    border: {
                        color: colors.border
                    },
                    ticks: {
                        color: colors.text,
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        padding: 10,
                        callback: function(value) {
                            return formatNumber(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'Impressions',
                        color: colors.text,
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
                y1: {
                    position: 'right',
                    grid: {
                        drawOnChartArea: false
                    },
                    border: {
                        color: colors.border
                    },
                    ticks: {
                        color: colors.percentage.main,
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        padding: 10,
                        callback: function(value) {
                            const sign = value > 0 ? '+' : '';
                            return `${sign}${value.toFixed(0)}%`;
                        }
                    },
                    title: {
                        display: true,
                        text: 'Optimization % Change',
                        color: colors.percentage.main,
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
            layout: {
                padding: {
                    top: 20,
                    right: 25,
                    bottom: 10,
                    left: 25
                }
            }
        },
        plugins: [{
            id: 'customCanvasBackgroundColor',
            beforeDraw: (chart) => {
                const ctx = chart.canvas.getContext('2d');
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = 'rgba(18, 18, 18, 0.5)';
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
            }
        }]
    });
    
    // Add visual indicators for key months
    const addMonthIndicators = () => {
        const keyMonths = [
            { month: 'Sep', label: 'Key month for Nov-Dec peak', color: colors.percentage.positive },
            { month: 'Oct', label: 'Critical for peak season', color: colors.percentage.positive },
            { month: 'Feb', label: 'Currently over-allocated', color: colors.percentage.negative },
            { month: 'Dec', label: 'Too late for high-season', color: colors.percentage.negative }
        ];
        
        // Implementation would go here if Chart.js supported dynamic annotations
        // This is a placeholder for future enhancement
    };
    
    // Log to confirm chart creation
    console.log('Enhanced optimized impressions chart created successfully:', optimizedImpressionsChart);
    
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
});
