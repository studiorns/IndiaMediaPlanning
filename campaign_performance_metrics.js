// Campaign Performance Metrics
document.addEventListener('DOMContentLoaded', function() {
    console.log("Campaign performance metrics script loaded");
    
    // Check if campaignData is available
    if (typeof campaignData === 'undefined') {
        console.error("campaignData is not defined. Make sure enhanced_dashboard_data.js is loaded first.");
        return;
    }
    
    // Create Campaign Performance Chart
    createCampaignPerformanceChart();
    
    // Create Campaign Efficiency Chart
    createCampaignEfficiencyChart();
    
    // Note: The following charts are now created by campaign_distribution_chart.js
    // to avoid duplicate chart initialization errors
    // - createCampaignBudgetChart();
    // - createCampaignTypeDistributionChart();
});

// Create Campaign Performance Chart
function createCampaignPerformanceChart() {
    const ctx = document.getElementById('campaignPerformanceChart');
    if (!ctx) {
        console.error("campaignPerformanceChart canvas not found");
        return;
    }
    
    // Extract data from campaignData
    const campaignNames = campaignData.campaigns.map(c => c.name);
    const impressions = campaignData.campaigns.map(c => c.impressions);
    const engagements = campaignData.campaigns.map(c => c.engagements);
    
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
    
    // Create the chart
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: campaignNames,
            datasets: [
                {
                    label: 'Impressions',
                    data: impressions,
                    backgroundColor: 'rgba(66, 133, 244, 0.7)',
                    borderColor: '#4285f4',
                    borderWidth: 1,
                    order: 2
                },
                {
                    label: 'Engagements',
                    data: engagements,
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
            indexAxis: 'y',
            plugins: {
                title: {
                    display: true,
                    text: 'Campaign Performance Metrics',
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
                            return `${label}: ${formatNumber(value)}`;
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
                    type: 'logarithmic',
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e0e0e0',
                        callback: function(value) {
                            return formatNumber(value);
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

// Create Campaign Efficiency Chart
function createCampaignEfficiencyChart() {
    const ctx = document.getElementById('campaignEfficiencyChart');
    if (!ctx) {
        console.error("campaignEfficiencyChart canvas not found");
        return;
    }
    
    // Extract data from campaignData
    const campaignNames = campaignData.campaigns.map(c => c.name);
    const cpm = campaignData.campaigns.map(c => c.cpm);
    const cts = campaignData.campaigns.map(c => c.cts * 100); // Convert to percentage
    
    // Create the chart
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: campaignNames,
            datasets: [
                {
                    label: 'CPM ($)',
                    data: cpm,
                    backgroundColor: 'rgba(66, 133, 244, 0.7)',
                    borderColor: '#4285f4',
                    borderWidth: 1,
                    yAxisID: 'y'
                },
                {
                    label: 'Click-to-Session Rate (%)',
                    data: cts,
                    backgroundColor: 'rgba(251, 188, 4, 0.7)',
                    borderColor: '#fbbc04',
                    borderWidth: 1,
                    yAxisID: 'y1'
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
                    text: 'Campaign Efficiency Metrics',
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
                            if (label.includes('CPM')) {
                                return `${label}: $${value.toFixed(2)}`;
                            } else {
                                return `${label}: ${value.toFixed(1)}%`;
                            }
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
                    position: 'left',
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e0e0e0'
                    },
                    title: {
                        display: true,
                        text: 'CPM ($)',
                        color: '#4285f4',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                },
                y1: {
                    position: 'right',
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: '#e0e0e0'
                    },
                    title: {
                        display: true,
                        text: 'Click-to-Session Rate (%)',
                        color: '#fbbc04',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
}

// These functions are kept for reference but are not called in this file
// to avoid duplicate chart initialization errors with campaign_distribution_chart.js

// Create Campaign Budget Chart
function createCampaignBudgetChart() {
    const ctx = document.getElementById('campaignBudgetChart');
    if (!ctx) {
        console.error("campaignBudgetChart canvas not found");
        return;
    }
    
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
