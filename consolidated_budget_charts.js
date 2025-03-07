// Consolidated Budget Charts
document.addEventListener('DOMContentLoaded', function() {
    console.log("Consolidated budget charts script loaded");
    
    // Check if campaignData is available
    if (typeof campaignData === 'undefined') {
        console.error("campaignData is not defined. Make sure enhanced_dashboard_data.js is loaded first.");
        return;
    }
    
    // Wait for DOM to be fully loaded and other charts to be initialized
    setTimeout(function() {
        try {
            // Create Campaign Budget Chart
            createCampaignBudgetChart();
            
            // Create Campaign Type Distribution Chart
            createCampaignTypeDistributionChart();
            
            // Create Budget By Month Chart
            createBudgetByMonthChart();
            
            console.log("All budget charts created successfully");
        } catch (error) {
            console.error("Error creating budget charts:", error);
        }
    }, 2000); // Increased timeout to ensure DOM is fully loaded
});

// Create Campaign Budget Chart
function createCampaignBudgetChart() {
    const ctx = document.getElementById('campaignBudgetChart');
    if (!ctx) {
        console.error("campaignBudgetChart canvas not found");
        return;
    }
    
    console.log("Creating campaign budget chart");
    
    // Extract data from campaignData
    const campaignNames = campaignData.campaigns.map(c => c.name);
    const budgets = campaignData.campaigns.map(c => c.budget);
    
    // Sort data by budget (descending)
    const sortedData = campaignNames.map((name, index) => ({
        name: name,
        budget: budgets[index],
        type: campaignData.campaigns[index].type
    })).sort((a, b) => b.budget - a.budget);
    
    // Get colors based on campaign type
    const getColorByType = (type) => {
        switch(type) {
            case 'Strategic': return { bg: 'rgba(66, 133, 244, 0.7)', border: '#4285f4' };
            case 'Tactical': return { bg: 'rgba(52, 168, 83, 0.7)', border: '#34a853' };
            case 'Culture': return { bg: 'rgba(251, 188, 4, 0.7)', border: '#fbbc04' };
            default: return { bg: 'rgba(234, 67, 53, 0.7)', border: '#ea4335' };
        }
    };
    
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
            labels: sortedData.map(d => d.name),
            datasets: [
                {
                    label: 'Budget',
                    data: sortedData.map(d => d.budget),
                    backgroundColor: sortedData.map(d => getColorByType(d.type).bg),
                    borderColor: sortedData.map(d => getColorByType(d.type).border),
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                title: {
                    display: true,
                    text: 'Campaign Budget Allocation',
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
                            const value = context.raw || 0;
                            const total = sortedData.reduce((sum, d) => sum + d.budget, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `Budget: ${formatCurrency(value)} (${percentage}%)`;
                        }
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e0e0e0',
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e0e0e0'
                    }
                }
            }
        }
    });
}

// Create Campaign Type Distribution Chart
function createCampaignTypeDistributionChart() {
    const ctx = document.getElementById('campaignTypeDistributionChart');
    if (!ctx) {
        console.error("campaignTypeDistributionChart canvas not found");
        return;
    }
    
    console.log("Creating campaign type distribution chart");
    
    // Calculate budget by campaign type
    const budgetByType = {};
    campaignData.campaigns.forEach(campaign => {
        if (!budgetByType[campaign.type]) {
            budgetByType[campaign.type] = 0;
        }
        budgetByType[campaign.type] += campaign.budget;
    });
    
    // Prepare data for chart
    const types = Object.keys(budgetByType);
    const budgets = types.map(type => budgetByType[type]);
    const totalBudget = budgets.reduce((sum, budget) => sum + budget, 0);
    const percentages = budgets.map(budget => ((budget / totalBudget) * 100).toFixed(1));
    
    // Get colors for each type
    const getColorByType = (type) => {
        switch(type) {
            case 'Strategic': return { bg: 'rgba(66, 133, 244, 0.7)', border: '#4285f4' };
            case 'Tactical': return { bg: 'rgba(52, 168, 83, 0.7)', border: '#34a853' };
            case 'Culture': return { bg: 'rgba(251, 188, 4, 0.7)', border: '#fbbc04' };
            default: return { bg: 'rgba(234, 67, 53, 0.7)', border: '#ea4335' };
        }
    };
    
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
        type: 'pie',
        data: {
            labels: types,
            datasets: [
                {
                    data: budgets,
                    backgroundColor: types.map(type => getColorByType(type).bg),
                    borderColor: types.map(type => getColorByType(type).border),
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Budget Distribution by Campaign Type',
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
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const percentage = ((value / totalBudget) * 100).toFixed(1);
                            return `${label}: ${formatCurrency(value)} (${percentage}%)`;
                        }
                    }
                },
                legend: {
                    position: 'right',
                    labels: {
                        color: '#e0e0e0',
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                            size: 12
                        },
                        generateLabels: function(chart) {
                            const data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                return data.labels.map((label, i) => {
                                    const meta = chart.getDatasetMeta(0);
                                    const style = meta.controller.getStyle(i);
                                    
                                    return {
                                        text: `${label}: ${percentages[i]}%`,
                                        fillStyle: style.backgroundColor,
                                        strokeStyle: style.borderColor,
                                        lineWidth: style.borderWidth,
                                        hidden: isNaN(data.datasets[0].data[i]) || meta.data[i].hidden,
                                        index: i
                                    };
                                });
                            }
                            return [];
                        }
                    }
                }
            }
        }
    });
}

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
