// Monthly Budget Chart
document.addEventListener('DOMContentLoaded', function() {
    console.log("Monthly budget chart script loaded");
    
    // Check if campaignData is available
    if (typeof campaignData === 'undefined') {
        console.error("campaignData is not defined. Make sure enhanced_dashboard_data.js is loaded first.");
        return;
    }
    
    // Wait for DOM to be fully loaded and other charts to be initialized
    setTimeout(function() {
        // Create Budget By Month Chart
        createBudgetByMonthChart();
    }, 700);
});

// Create Budget By Month Chart
function createBudgetByMonthChart() {
    const ctx = document.getElementById('budgetByMonthChart');
    if (!ctx) {
        console.error("budgetByMonthChart canvas not found");
        return;
    }
    
    console.log("Creating budget by month chart");
    
    // Make sure we have the required data
    if (!campaignData || !campaignData.monthlyDistribution || !campaignData.campaigns) {
        console.error("Required data for budget by month chart is missing");
        return;
    }
    
    // Use actual monthly budget allocation from detailed campaign planning
    const monthlyBudgets = [
        311004,  // January
        499293,  // February
        729600,  // March
        1105663, // April
        1057497, // May
        498163,  // June
        457007,  // July
        457007,  // August
        574960,  // September
        811549,  // October
        1149194, // November
        1024631  // December
    ];
    
    // Calculate optimized monthly budgets based on the ratio of optimized to planned impressions
    const optimizedMonthlyBudgets = campaignData.monthlyDistribution.months.map((month, index) => {
        const plannedImpressions = campaignData.monthlyDistribution.impressions[index];
        const optimizedImpressions = campaignData.monthlyDistribution.optimizedImpressions[index];
        const ratio = optimizedImpressions / plannedImpressions;
        return monthlyBudgets[index] * ratio;
    });
    
    // Format currency
    const formatCurrency = (num) => {
        if (num >= 1000000) {
            return '$' + (num / 1000000).toFixed(2) + 'M';
        }
        if (num >= 1000) {
            return '$' + (num / 1000).toFixed(0) + 'K';
        }
        return '$' + num.toFixed(0);
    };
    
    // Create the chart
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: campaignData.monthlyDistribution.months,
            datasets: [
                {
                    label: 'Current Budget',
                    data: monthlyBudgets,
                    backgroundColor: 'rgba(66, 133, 244, 0.7)',
                    borderColor: '#4285f4',
                    borderWidth: 1,
                    order: 2
                },
                {
                    label: 'Optimized Budget',
                    data: optimizedMonthlyBudgets,
                    backgroundColor: 'rgba(52, 168, 83, 0.7)',
                    borderColor: '#34a853',
                    borderWidth: 1,
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Budget Allocation',
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
                            return `${label}: ${formatCurrency(value)}`;
                        }
                    }
                },
                legend: {
                    position: 'top',
                    labels: {
                        color: '#e0e0e0',
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                            size: 12
                        }
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
                            return formatCurrency(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'Budget',
                        color: '#e0e0e0',
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}
