// Campaign Distribution Chart
document.addEventListener('DOMContentLoaded', function() {
    // Campaign Type Distribution Chart
    const campaignTypeCtx = document.getElementById('campaignTypeChart');
    if (campaignTypeCtx) {
        // Filter campaigns by type including Culture
        const strategicCampaigns = campaignData.campaigns.filter(c => c.type === 'Strategic');
        const tacticalCampaigns = campaignData.campaigns.filter(c => c.type === 'Tactical');
        const cultureCampaigns = campaignData.campaigns.filter(c => c.type === 'Culture');
        
        new Chart(campaignTypeCtx, {
            type: 'pie',
            data: {
                labels: ['Strategic', 'Tactical', 'Culture'],
                datasets: [{
                    data: [strategicCampaigns.length, tacticalCampaigns.length, cultureCampaigns.length],
                    backgroundColor: ['#4285f4', '#34a853', '#9c27b0'],
                    borderWidth: 1
                }]
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
                        text: 'Campaign Type Distribution',
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
                                return `${label}: ${value} (${percentage}%)`;
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
    
    // Budget Allocation by Campaign Type Chart
    const budgetAllocationCtx = document.getElementById('budgetAllocationChart');
    if (budgetAllocationCtx) {
        // Calculate budgets by campaign type
        const strategicCampaigns = campaignData.campaigns.filter(c => c.type === 'Strategic');
        const tacticalCampaigns = campaignData.campaigns.filter(c => c.type === 'Tactical');
        const cultureCampaigns = campaignData.campaigns.filter(c => c.type === 'Culture');
        
        const strategicBudget = strategicCampaigns.reduce((sum, c) => sum + c.budget, 0);
        const tacticalBudget = tacticalCampaigns.reduce((sum, c) => sum + c.budget, 0);
        const cultureBudget = cultureCampaigns.reduce((sum, c) => sum + c.budget, 0);
        
        new Chart(budgetAllocationCtx, {
            type: 'pie',
            data: {
                labels: ['Strategic', 'Tactical', 'Culture'],
                datasets: [{
                    data: [strategicBudget, tacticalBudget, cultureBudget],
                    backgroundColor: ['#4285f4', '#34a853', '#9c27b0'],
                    borderWidth: 1
                }]
            },
            options: {
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
                                return `${label}: $${value.toLocaleString()} (${percentage}%)`;
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
    
    // Campaign Budget Chart
    const campaignBudgetCtx = document.getElementById('campaignBudgetChart');
    if (campaignBudgetCtx) {
        // Sort campaigns by budget (highest to lowest)
        const sortedCampaigns = [...campaignData.campaigns].sort((a, b) => b.budget - a.budget);
        
        new Chart(campaignBudgetCtx, {
            type: 'bar',
            data: {
                labels: sortedCampaigns.map(c => c.name),
                datasets: [{
                    label: 'Budget (USD)',
                    data: sortedCampaigns.map(c => c.budget),
                    backgroundColor: sortedCampaigns.map(c => {
                        if (c.type === 'Strategic') return '#4285f4';
                        if (c.type === 'Tactical') return '#34a853';
                        if (c.type === 'Culture') return '#9c27b0';
                        return '#4285f4'; // Default fallback
                    }),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Campaign Budget Allocation (USD)',
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
                                const total = campaignData.campaigns.reduce((sum, c) => sum + c.budget, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `Budget: $${value.toLocaleString()} (${percentage}%)`;
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
                                color: '#e0e0e0',
                                callback: function(value) {
                                    if (value >= 1000000) {
                                        return '$' + (value / 1000000).toFixed(1) + 'M';
                                    } else if (value >= 1000) {
                                        return '$' + (value / 1000).toFixed(1) + 'K';
                                    }
                                    return '$' + value;
                                }
                            },
                            title: {
                                display: true,
                                text: 'Budget (USD)',
                                color: '#e0e0e0',
                                font: {
                                    size: 12
                                }
                            },
                            max: 2500000 // Set maximum value to 2.5M USD
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#e0e0e0'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
});
