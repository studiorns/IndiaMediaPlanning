// Campaign Distribution Chart
document.addEventListener('DOMContentLoaded', function() {
    // Campaign data from detailed-campaign-planning-India.csv
    const detailedCampaignData = {
        campaigns: [
            { name: 'Summer', type: 'Strategic', budget: 2270012, budgetFormatted: '$2,270,012' },
            { name: 'NBA', type: 'Tactical', budget: 115270, budgetFormatted: '$115,270' },
            { name: 'Visit Abu Dhabi Always On', type: 'Strategic', budget: 420514, budgetFormatted: '$420,514' },
            { name: 'Abu Dhabi Calendar Always On', type: 'Strategic', budget: 547514, budgetFormatted: '$547,514' },
            { name: 'F1', type: 'Tactical', budget: 153678, budgetFormatted: '$153,678' },
            { name: 'Family Vacation with Ranveer Singh', type: 'Strategic', budget: 877197, budgetFormatted: '$877,197' },
            { name: 'Diwali', type: 'Tactical', budget: 408785, budgetFormatted: '$408,785' },
            { name: 'Ramadan', type: 'Tactical', budget: 542464, budgetFormatted: '$542,464' },
            { name: 'Saadiyat Cultural District', type: 'Culture', budget: 438552, budgetFormatted: '$438,552' },
            { name: 'Abu Dhabi Calendar Launch', type: 'Strategic', budget: 805099, budgetFormatted: '$805,099' },
            { name: 'Global Brand Ambassador Q1', type: 'Strategic', budget: 346457, budgetFormatted: '$346,457' },
            { name: 'Search Always On', type: 'Strategic', budget: 277449, budgetFormatted: '$277,449' },
            { name: 'Global Brand Ambassador Q4', type: 'Strategic', budget: 1300910, budgetFormatted: '$1,300,910' },
            { name: 'Comedy Week', type: 'Tactical', budget: 186668, budgetFormatted: '$186,668' }
        ]
    };

    // Log campaign types to verify data
    console.log("Campaign Types:");
    detailedCampaignData.campaigns.forEach(campaign => {
        console.log(`${campaign.name}: ${campaign.type}`);
    });

    // Calculate campaign counts by type
    const calculateCampaignCountsByType = () => {
        // Initialize counts
        let strategicCount = 0;
        let tacticalCount = 0;
        let cultureCount = 0;
        
        // Count campaigns by type
        detailedCampaignData.campaigns.forEach(campaign => {
            if (campaign.type === 'Strategic') {
                strategicCount++;
            } else if (campaign.type === 'Tactical') {
                tacticalCount++;
            } else if (campaign.type === 'Culture') {
                cultureCount++;
            }
        });
        
        const result = {
            strategic: strategicCount,
            tactical: tacticalCount,
            culture: cultureCount
        };
        
        // Log the counts to verify
        console.log("Campaign Counts by Type:", result);
        
        return result;
    };

    // Calculate budget by campaign type
    const calculateBudgetByType = () => {
        // Initialize budget totals
        let strategicTotal = 0;
        let tacticalTotal = 0;
        let cultureTotal = 0;
        
        // Calculate totals by type
        detailedCampaignData.campaigns.forEach(campaign => {
            if (campaign.type === 'Strategic') {
                strategicTotal += campaign.budget;
            } else if (campaign.type === 'Tactical') {
                tacticalTotal += campaign.budget;
            } else if (campaign.type === 'Culture') {
                cultureTotal += campaign.budget;
            }
        });
        
        const result = {
            strategic: strategicTotal,
            tactical: tacticalTotal,
            culture: cultureTotal,
            total: strategicTotal + tacticalTotal + cultureTotal
        };
        
        // Log the budget totals to verify
        console.log("Budget by Type:", result);
        
        return result;
    };

    // Format budget values for display
    const formatBudget = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(value);
    };

    // Get campaign counts by type
    const campaignCountsByType = calculateCampaignCountsByType();
    
    // Get budget data by type
    const budgetByType = calculateBudgetByType();

    // Update the total budget value in the metrics card
    const totalBudgetElement = document.getElementById('totalBudgetValue');
    if (totalBudgetElement) {
        totalBudgetElement.textContent = formatBudget(budgetByType.total);
    }

    // Campaign Type Distribution Chart - Updated to use the correct canvas ID
    const campaignTypeCtx = document.getElementById('campaignTypeChart');
    if (campaignTypeCtx) {
        // Log the chart data before creating the chart
        console.log("Chart Data:", {
            strategic: campaignCountsByType.strategic,
            tactical: campaignCountsByType.tactical,
            culture: campaignCountsByType.culture
        });
        
        new Chart(campaignTypeCtx, {
            type: 'pie',
            data: {
                labels: ['Strategic', 'Tactical', 'Culture'],
                datasets: [{
                    data: [
                        campaignCountsByType.strategic,
                        campaignCountsByType.tactical,
                        campaignCountsByType.culture
                    ],
                    backgroundColor: ['#4285f4', '#34a853', '#fbbc04'],
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
    } else {
        console.error("campaignTypeChart canvas not found");
    }

    // Budget Allocation by Month Chart - Updated to use the correct canvas ID
    const budgetByMonthCtx = document.getElementById('budgetByMonthChart');
    if (budgetByMonthCtx) {
        // Create monthly budget data based on campaign calendar
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
        
        new Chart(budgetByMonthCtx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: 'Monthly Budget',
                    data: monthlyBudgets,
                    backgroundColor: '#4285f4',
                    borderColor: '#4285f4',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Budget Allocation by Month',
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
                                return `Budget: ${formatBudget(value)}`;
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
                                if (value >= 1000000) {
                                    return (value / 1000000).toFixed(1) + 'M USD';
                                } else if (value >= 1000) {
                                    return (value / 1000).toFixed(0) + 'K USD';
                                }
                                return value + ' USD';
                            }
                        },
                        title: {
                            display: true,
                            text: 'Budget (USD)',
                            color: '#e0e0e0',
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
    } else {
        console.error("budgetByMonthChart canvas not found");
    }

    // Campaign Budget Chart - This ID is correct in the HTML
    const campaignBudgetCtx = document.getElementById('campaignBudgetChart');
    if (campaignBudgetCtx) {
        // Sort campaigns by budget (descending)
        const sortedCampaigns = [...detailedCampaignData.campaigns].sort((a, b) => b.budget - a.budget);
        
        new Chart(campaignBudgetCtx, {
            type: 'bar',
            data: {
                labels: sortedCampaigns.map(c => c.name),
                datasets: [{
                    label: 'Budget (USD)',
                    data: sortedCampaigns.map(c => c.budget),
                    backgroundColor: sortedCampaigns.map(c => {
                        if (c.type === 'Strategic') return '#4285f4';
                        else if (c.type === 'Tactical') return '#34a853';
                        else return '#fbbc04'; // Culture or other types
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
                                const campaign = sortedCampaigns[context.dataIndex];
                                return `Budget: ${formatBudget(campaign.budget)} USD`;
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
                                    return (value / 1000000).toFixed(1) + 'M USD';
                                } else if (value >= 1000) {
                                    return (value / 1000).toFixed(0) + 'K USD';
                                }
                                return value + ' USD';
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
                        max: 2500000 // Set maximum value based on the highest budget
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#e0e0e0',
                            font: {
                                size: 11
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
    } else {
        console.error("campaignBudgetChart canvas not found");
    }
});
