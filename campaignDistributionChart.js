// Campaign Distribution Chart
document.addEventListener('DOMContentLoaded', function() {
    // Create Campaign Distribution Chart
    createCampaignDistributionChart();
});

// Create Campaign Distribution Chart
function createCampaignDistributionChart() {
    const ctx = document.getElementById('campaignDistributionChart');
    if (!ctx) {
        console.error("campaignDistributionChart canvas not found");
        return;
    }
    
    console.log("Creating campaign distribution chart");
    
    // Make sure we have the required data
    if (!campaignData || !campaignData.monthlyDistribution) {
        console.error("Required data for campaign distribution chart is missing");
        return;
    }
    
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
            labels: campaignData.monthlyDistribution.months,
            datasets: [
                {
                    label: 'Impressions',
                    data: campaignData.monthlyDistribution.impressions,
                    backgroundColor: 'rgba(66, 133, 244, 0.7)',
                    borderColor: '#4285f4',
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
                    text: 'Monthly Campaign Impressions Distribution',
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
                }
            }
        }
    });
}
