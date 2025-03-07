// Campaign Budget Charts
document.addEventListener('DOMContentLoaded', function() {
    console.log("Campaign budget charts script loaded");
    
    // Check if campaignData is available
    if (typeof campaignData === 'undefined') {
        console.error("campaignData is not defined. Make sure enhanced_dashboard_data.js is loaded first.");
        return;
    }
    
    // Wait for DOM to be fully loaded and other charts to be initialized
    setTimeout(function() {
        // Create Campaign Budget Chart
        createCampaignBudgetChart();
        
        // Create Campaign Type Distribution Chart
        createCampaignTypeDistributionChart();
        
        // Create Budget Allocation Chart
        createBudgetAllocationChart();
    }, 500);
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

// Create Budget Allocation Chart
function createBudgetAllocationChart() {
    const ctx = document.getElementById('budgetAllocationChart');
    if (!ctx) {
        console.error("budgetAllocationChart canvas not found");
        return;
    }
    
    console.log("Creating budget allocation chart");
    
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
    const percentages = budgets.map(budget => ((budget / totalBudget) * 100).toFixed(0));
    
    // Get colors for each type
    const getColorByType = (type) => {
        switch(type) {
            case 'Strategic': return { bg: 'rgba(66, 133, 244, 0.7)', border: '#4285f4' };
            case 'Tactical': return { bg: 'rgba(52, 168, 83, 0.7)', border: '#34a853' };
            case 'Culture': return { bg: 'rgba(251, 188, 4, 0.7)', border: '#fbbc04' };
            default: return { bg: 'rgba(234, 67, 53, 0.7)', border: '#ea4335' };
        }
    };
    
    // Format currency in millions
    const formatCurrencyInMillions = (num) => {
        return '$' + (num / 1000000).toFixed(1) + 'M';
    };
    
    // Create custom labels with budget values and percentages
    const customLabels = types.map((type, index) => {
        return `${type} ${formatCurrencyInMillions(budgets[index])} (${percentages[index]}%)`;
    });
    
    // Create the chart
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: customLabels,
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
                    text: 'Budget Allocation by Campaign Type',
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
                            const percentage = ((value / totalBudget) * 100).toFixed(0);
                            return `${formatCurrencyInMillions(value)} (${percentage}% of total budget)`;
                        }
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#e0e0e0',
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                            size: 14
                        },
                        padding: 20
                    }
                }
            }
        }
    });
}

// Create Campaign Type Distribution Chart
function createCampaignTypeDistributionChart() {
    const ctx = document.getElementById('campaignTypeChart');
    if (!ctx) {
        console.error("campaignTypeChart canvas not found");
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
