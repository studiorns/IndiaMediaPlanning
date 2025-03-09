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
    308059995,    // Jan: PAST PERIOD - No longer applicable (using actual values)
    834140150,    // Feb: PAST PERIOD - No longer applicable (using actual values)
    1134925631,   // Mar: +10% increase for current month activities
    1847528488,   // Apr: -10% reduction (adjusted from -15%)
    1755183102,   // May: -15% reduction (adjusted from -20%)
    865852843,    // Jun: unchanged
    890295428,    // Jul: +15% increase for September shoulder season
    929003924,    // Aug: +20% increase for September shoulder season
    1997190092,   // Sep: +45% enhanced increase to capture November-December peak (adjusted from +38%)
    2786021794,   // Oct: +42% enhanced increase to capture November-December peak (adjusted from +35%)
    1566538456,   // Nov: +5% slight increase to support peak season (new)
    1681532353    // Dec: -20% reduction (adjusted from -25%)
];

// Update the campaign data with the new impression values
if (typeof campaignData !== 'undefined' && campaignData.mediaImpressions) {
    campaignData.mediaImpressions.proposed = plannedImpressions2025;
}

// Calculate percentage difference between planned and optimized
const percentageDiffs = plannedImpressions2025.map((planned, index) => {
    // For January and February, set percentage diff to 0 since they're past periods
    if (index <= 1) {
        return 0;
    }
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
    border: 'rgba(255, 255, 255, 0.2)',
    pastPeriod: 'rgba(150, 150, 150, 0.7)'
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
        value: 'Mar',
        borderColor: '#ffffff',
        borderWidth: 2,
        label: {
            content: 'CURRENT MONTH',
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
        value: 'Sep',
        borderColor: colors.percentage.main,
        borderWidth: 2,
        borderDash: [5, 5],
        label: {
            content: '+45% for Nov-Dec peak',
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
        type: 'box',
        xMin: -0.5,  // Adjusted to cover Jan
        xMax: 1.5,   // Adjusted to cover Feb
        yMin: 0,
        yMax: 'max',
        backgroundColor: 'rgba(150, 150, 150, 0.2)',
        borderColor: 'rgba(150, 150, 150, 0.5)',
        borderWidth: 1,
        label: {
            content: 'PAST PERIODS - No longer applicable',
            enabled: true,
            position: 'center',
            backgroundColor: 'rgba(150, 150, 150, 0.7)',
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
                    backgroundColor: function(context) {
                        // Gray out January and February as past periods
                        const index = context.dataIndex;
                        return index <= 1 ? colors.pastPeriod : colors.planned.background;
                    },
                    borderColor: function(context) {
                        // Gray out January and February as past periods
                        const index = context.dataIndex;
                        return index <= 1 ? colors.pastPeriod : colors.planned.main;
                    },
                    borderWidth: 1,
                    borderRadius: 4,
                    hoverBackgroundColor: function(context) {
                        // Gray out January and February as past periods
                        const index = context.dataIndex;
                        return index <= 1 ? colors.pastPeriod : colors.planned.highlight;
                    },
                    hoverBorderColor: function(context) {
                        // Gray out January and February as past periods
                        const index = context.dataIndex;
                        return index <= 1 ? colors.pastPeriod : colors.planned.main;
                    },
                    hoverBorderWidth: 2,
                    order: 2
                },
                {
                    label: '2025 Optimized Impressions',
                    data: optimizedImpressions2025,
                    backgroundColor: function(context) {
                        // Gray out January and February as past periods
                        const index = context.dataIndex;
                        return index <= 1 ? colors.pastPeriod : colors.optimized.background;
                    },
                    borderColor: function(context) {
                        // Gray out January and February as past periods
                        const index = context.dataIndex;
                        return index <= 1 ? colors.pastPeriod : colors.optimized.main;
                    },
                    borderWidth: 1,
                    borderRadius: 4,
                    hoverBackgroundColor: function(context) {
                        // Gray out January and February as past periods
                        const index = context.dataIndex;
                        return index <= 1 ? colors.pastPeriod : colors.optimized.highlight;
                    },
                    hoverBorderColor: function(context) {
                        // Gray out January and February as past periods
                        const index = context.dataIndex;
                        return index <= 1 ? colors.pastPeriod : colors.optimized.main;
                    },
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
                    pointBackgroundColor: percentageDiffs.map((value, index) => {
                        if (index <= 1) return colors.pastPeriod; // Past periods
                        return value > 0 ? colors.percentage.positive : 
                               value < 0 ? colors.percentage.negative : 
                               colors.percentage.main;
                    }),
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: percentageDiffs.map((value, index) => {
                        if (index <= 1) return colors.pastPeriod; // Past periods
                        return value > 0 ? colors.percentage.positive : 
                               value < 0 ? colors.percentage.negative : 
                               colors.percentage.main;
                    }),
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
                        // Use white text for better visibility against dark background
                        color: colors.text, // White text for all labels
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: function(context) {
                            // Use colored circles that match the dataset colors
                            return 'circle';
                        },
                        pointStyleWidth: 15, // Make the color indicators larger
                        boxWidth: 12,
                        boxHeight: 12,
                        // Use colored boxes that match the dataset colors
                        generateLabels: function(chart) {
                            const datasets = chart.data.datasets;
                            const labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                            
                            // Customize the style of each label
                            labels.forEach((label, i) => {
                                // Set the background color of the box based on the dataset
                                if (i === 0) label.fillStyle = colors.planned.main; // Blue for Planned
                                if (i === 1) label.fillStyle = colors.optimized.main; // Green for Optimized
                                if (i === 2) label.fillStyle = colors.percentage.main; // Yellow for % Change
                                
                                // Set the border color to match the fill
                                label.strokeStyle = label.fillStyle;
                            });
                            
                            return labels;
                        },
                        font: {
                            size: 13,
                            weight: '500'
                        }
                    }
                },
                title: {
                    display: true,
                    text: '2025 Media Impressions: Planned vs Optimized (Mid-March Adjustment)',
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
                    text: 'Jan-Feb are past periods. Redistribution focuses on enhancing Sep-Oct (+42-45%) and adding Mar (+10%).',
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
                            const index = context.dataIndex;
                            
                            // For January and February, add a note that these are past periods
                            if (index <= 1 && context.datasetIndex !== 2) {
                                return `${label}: ${formatNumber(value)} (PAST PERIOD)`;
                            } else if (context.datasetIndex === 2) { // Percentage change dataset
                                if (index <= 1) {
                                    return `${label}: No longer applicable`;
                                } else {
                                    const sign = value > 0 ? '+' : '';
                                    return `${label}: ${sign}${value.toFixed(1)}%`;
                                }
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
                                
                                if (index <= 1) {
                                    return ['Past period - January-February optimization window has passed'];
                                }
                                
                                const value = percentageDiffs[index];
                                
                                if (value > 40) {
                                    return ['Enhanced increase to capture peak travel period'];
                                } else if (value > 0) {
                                    return ['Strategic increase to support booking window'];
                                } else if (value < -15) {
                                    return ['Moderate reduction to optimize distribution'];
                                } else if (value < 0) {
                                    return ['Slight reduction to optimize distribution'];
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
                        color: function(context) {
                            // Gray out January and February as past periods
                            const index = context.index;
                            return index <= 1 ? colors.pastPeriod : colors.text;
                        },
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
            { month: 'Sep', label: 'Enhanced increase for Nov-Dec peak (+45%)', color: colors.percentage.positive },
            { month: 'Oct', label: 'Enhanced increase for peak season (+42%)', color: colors.percentage.positive },
            { month: 'Mar', label: 'Added increase for current month (+10%)', color: colors.percentage.positive },
            { month: 'Nov', label: 'New slight increase added (+5%)', color: colors.percentage.positive }
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
    console.log("These mid-March adjustments acknowledge that January and February are past periods while strategically redistributing impressions to better align with the booking window and seasonal travel patterns. Key changes include enhancing September-October increases (to +45% and +42%), adding a new increase to March (+10%), and moderating reductions to April-May and December.");
});
