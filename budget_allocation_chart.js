// Budget Allocation Chart - Manual Implementation
document.addEventListener('DOMContentLoaded', function() {
    console.log("Budget allocation chart script loaded");
    
    // Check if campaignData is available
    if (typeof campaignData === 'undefined') {
        console.error("campaignData is not defined. Make sure enhanced_dashboard_data.js is loaded first.");
        return;
    }
    
    // Wait for DOM to be fully loaded and other charts to be initialized
    setTimeout(function() {
        createBudgetAllocationChart();
    }, 800); // Slightly longer timeout to ensure other charts are loaded first
});

// Format number function
function formatNumber(num) {
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
}

// Format currency in millions
function formatCurrencyInMillions(num) {
    return '$' + (num / 1000000).toFixed(1) + 'M';
}

// Create Budget Allocation Chart
function createBudgetAllocationChart() {
    const ctx = document.getElementById('budgetAllocationChart');
    if (!ctx) {
        console.error("budgetAllocationChart canvas not found");
        return;
    }
    
    console.log("Creating budget allocation chart manually");
    
    // Calculate budget by campaign type
    const budgetByType = {};
    campaignData.campaigns.forEach(campaign => {
        if (!budgetByType[campaign.type]) {
            budgetByType[campaign.type] = 0;
        }
        budgetByType[campaign.type] += campaign.budget;
    });
    
    // Prepare data for chart with specific order to match campaignTypeChart
    const orderedTypes = ['Brand Awareness', 'Strategic Leavers', 'Culture']; // Ensure same order as campaignTypeChart
    const budgets = orderedTypes.map(type => budgetByType[type] || 0);
    const totalBudget = budgets.reduce((sum, budget) => sum + budget, 0);
    const percentages = budgets.map(budget => ((budget / totalBudget) * 100).toFixed(0));
    
    // Define colors in the same order as the types
    const colors = ['#4285f4', '#34a853', '#fbbc04']; // Blue, Green, Yellow - matching campaignTypeChart
    
    // Create the chart - matching styling with campaignTypeChart
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: orderedTypes,
            datasets: [
                {
                    data: budgets,
                    backgroundColor: colors,
                    borderWidth: 1
                }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#e0e0e0',
                        padding: 20,
                        font: {
                            size: 14
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                title: {
                    display: true,
                    text: 'Budget Allocation by Campaign Type (USD)',
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
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${formatCurrencyInMillions(value)} (${percentage}%)`;
                        }
                    },
                    padding: 12,
                    backgroundColor: 'rgba(20, 20, 20, 0.9)',
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 14
                    },
                    displayColors: true,
                    boxPadding: 6
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 2000,
                easing: 'easeOutQuart'
            },
            cutout: '40%',
            radius: '90%'
        }
    });
}
