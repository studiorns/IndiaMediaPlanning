// Additional visualizations for the enhanced dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log("Campaign visualization script loaded");
    
    // Check if campaignData is available
    if (typeof campaignData === 'undefined') {
        console.error("campaignData is not defined. Make sure enhanced_dashboard_data.js is loaded first.");
        return;
    }
    
    // Register Chart.js plugins if not already registered
    if (typeof Chart !== 'undefined' && typeof ChartDataLabels !== 'undefined') {
        if (typeof Chart.register === 'function') {
            Chart.register(ChartDataLabels);
        }
    }
    
    // Create the Impression vs Engagement Scatter Plot
    createImpressionEngagementScatterPlot();
    
    // Create Budget by Month Chart
    createBudgetByMonthChart();
    
    // Create Campaign Calendar with Budget Allocation
    createCampaignCalendarWithBudget();
    
    // Add filter functionality for campaign calendar
    setupCalendarFilters();
});

// Create Impression vs Engagement Scatter Plot
function createImpressionEngagementScatterPlot() {
    const ctx = document.getElementById('impressionEngagementScatterChart');
    if (!ctx) {
        console.error("impressionEngagementScatterChart canvas not found");
        return;
    }
    
    console.log("Creating impression vs engagement scatter plot");
    
    // Extract data from campaignData
    const scatterData = [];
    
    // Make sure we have the campaigns data
    if (campaignData && campaignData.campaigns) {
        campaignData.campaigns.forEach(campaign => {
            scatterData.push({
                x: campaign.impressions,
                y: campaign.engagements,
                r: Math.sqrt(campaign.budget / 20000), // Adjusted for better visibility
                name: campaign.name,
                budget: campaign.budget,
                type: campaign.type,
                category: campaign.category || 'other'
            });
        });
    } else {
        console.error("campaignData.campaigns is not available");
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
    
    // Create the scatter plot
    new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Campaigns',
                data: scatterData,
                backgroundColor: scatterData.map(d => {
                    if (d.category === 'culture') return 'rgba(251, 188, 4, 0.7)';
                    else if (d.type === 'Strategic') return 'rgba(66, 133, 244, 0.7)';
                    return 'rgba(52, 168, 83, 0.7)';
                }),
                borderColor: scatterData.map(d => {
                    if (d.category === 'culture') return '#fbbc04';
                    else if (d.type === 'Strategic') return '#4285f4';
                    return '#34a853';
                }),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Campaign Impressions vs Engagement Analysis',
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
                            const d = context.raw;
                            return [
                                `Campaign: ${d.name}`,
                                `Impressions: ${formatNumber(d.x)}`,
                                `Engagements: ${formatNumber(d.y)}`,
                                `Budget: $${(d.budget/1000000).toFixed(2)}M`,
                                `Type: ${d.type}`
                            ];
                        }
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    type: 'logarithmic',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Impressions (log scale)',
                        color: '#e0e0e0',
                        font: {
                            size: 12
                        }
                    },
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
                    type: 'logarithmic',
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Engagements (log scale)',
                        color: '#e0e0e0',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e0e0e0',
                        callback: function(value) {
                            return formatNumber(value);
                        }
                    }
                }
            }
        }
    });
}

// Create Budget by Month Chart
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
                    borderWidth: 1
                },
                {
                    label: 'Optimized Budget',
                    data: optimizedMonthlyBudgets,
                    backgroundColor: 'rgba(52, 168, 83, 0.7)',
                    borderColor: '#34a853',
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

// Create Campaign Calendar with Budget Allocation
function createCampaignCalendarWithBudget() {
    const calendarContainer = document.getElementById('campaignCalendar');
    if (!calendarContainer) {
        console.error("campaignCalendar container not found");
        return;
    }
    
    console.log("Creating campaign calendar");
    
    // Clear any existing content
    calendarContainer.innerHTML = '';
    
    // Make sure we have the required data
    if (!campaignData || !campaignData.campaignCalendar || !campaignData.campaigns) {
        console.error("Required data for campaign calendar is missing");
        
        // Create sample data for demonstration
        const sampleCampaigns = [
            { name: 'Summer Campaign', months: [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0], category: 'strategic' },
            { name: 'Visit Abu Dhabi Always On', months: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], category: 'tactical' },
            { name: 'Abu Dhabi Calendar Always On', months: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], category: 'culture' },
            { name: 'Global Brand Ambassador Q1', months: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], category: 'strategic' },
            { name: 'Global Brand Ambassador Q4', months: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], category: 'strategic' }
        ];
        
        // Create sample calendar rows
        sampleCampaigns.forEach(campaign => {
            // Create campaign label
            const label = document.createElement('div');
            label.className = 'calendar-label';
            label.textContent = campaign.name;
            calendarContainer.appendChild(label);
            
            // Create month cells
            campaign.months.forEach((active, index) => {
                const cell = document.createElement('div');
                cell.className = 'calendar-cell';
                
                if (active) {
                    cell.classList.add('active');
                    cell.classList.add(`active-${campaign.category}`);
                    
                    // Add budget percentage
                    const budgetLabel = document.createElement('div');
                    budgetLabel.className = 'budget-percentage';
                    budgetLabel.textContent = `${Math.floor(Math.random() * 10) + 5}%`;
                    cell.appendChild(budgetLabel);
                }
                
                calendarContainer.appendChild(cell);
            });
        });
        
        return;
    }
    
    // Now create the calendar
    campaignData.campaignCalendar.forEach(campaign => {
        // Find the campaign data
        const campaignInfo = campaignData.campaigns.find(c => c.name === campaign.name);
        if (!campaignInfo) {
            console.warn(`Campaign data not found for ${campaign.name}`);
            return;
        }
        
        // Calculate active months
        const activeMonths = campaign.months.filter(m => m === 1).length;
        if (activeMonths === 0) {
            console.warn(`No active months for ${campaign.name}`);
            return;
        }
        
        // Calculate percentage per active month (evenly distributed)
        const monthPercentage = Math.round(100 / activeMonths);
        
        // Create campaign label
        const label = document.createElement('div');
        label.className = 'calendar-label';
        label.style.fontSize = '0.85rem'; // Smaller font size for campaign names
        label.textContent = campaign.name;
        calendarContainer.appendChild(label);
        
        // Create month cells
        campaign.months.forEach((active, index) => {
            const cell = document.createElement('div');
            cell.className = 'calendar-cell';
            
            if (active) {
                cell.classList.add('active');
                cell.classList.add(`active-${campaign.category}`);
                
                // Calculate the actual budget for this month
                const monthlyBudget = campaignInfo.budget / activeMonths;
                
                // Add budget percentage (evenly distributed across active months)
                const budgetLabel = document.createElement('div');
                budgetLabel.className = 'budget-percentage';
                budgetLabel.textContent = `${monthPercentage}%`;
                cell.appendChild(budgetLabel);
                
                // Add tooltip with budget information
                cell.title = `${campaign.name}: $${(monthlyBudget/1000).toFixed(0)}K for ${campaignData.monthlyDistribution.months[index]}`;
            }
            
            calendarContainer.appendChild(cell);
        });
    });
}

// Setup Calendar Filters
function setupCalendarFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (!filterButtons.length) {
        console.error("Filter buttons not found");
        return;
    }
    
    console.log("Setting up calendar filters");
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected category
            const category = this.getAttribute('data-type');
            
            // Filter campaigns
            if (campaignData && campaignData.campaignCalendar) {
                const filteredCampaigns = category === 'all' 
                    ? campaignData.campaignCalendar 
                    : campaignData.campaignCalendar.filter(c => c.category === category);
                
                // Recreate calendar with filtered campaigns
                createFilteredCalendar(filteredCampaigns);
            } else {
                console.error("campaignData.campaignCalendar is not available");
            }
        });
    });
}

// Create filtered calendar
function createFilteredCalendar(filteredCampaigns) {
    const calendarContainer = document.getElementById('campaignCalendar');
    if (!calendarContainer) {
        console.error("campaignCalendar container not found");
        return;
    }
    
    // Clear any existing content
    calendarContainer.innerHTML = '';
    
    // Make sure we have the required data
    if (!campaignData || !campaignData.campaigns) {
        console.error("Required data for filtered calendar is missing");
        return;
    }
    
    // Now create the calendar
    filteredCampaigns.forEach(campaign => {
        // Find the campaign data
        const campaignInfo = campaignData.campaigns.find(c => c.name === campaign.name);
        if (!campaignInfo) {
            console.warn(`Campaign data not found for ${campaign.name}`);
            return;
        }
        
        // Calculate active months
        const activeMonths = campaign.months.filter(m => m === 1).length;
        if (activeMonths === 0) {
            console.warn(`No active months for ${campaign.name}`);
            return;
        }
        
        // Calculate percentage per active month (evenly distributed)
        const monthPercentage = Math.round(100 / activeMonths);
        
        // Create campaign label
        const label = document.createElement('div');
        label.className = 'calendar-label';
        label.style.fontSize = '0.85rem'; // Smaller font size for campaign names
        label.textContent = campaign.name;
        calendarContainer.appendChild(label);
        
        // Create month cells
        campaign.months.forEach((active, index) => {
            const cell = document.createElement('div');
            cell.className = 'calendar-cell';
            
            if (active) {
                cell.classList.add('active');
                cell.classList.add(`active-${campaign.category}`);
                
                // Calculate the actual budget for this month
                const monthlyBudget = campaignInfo.budget / activeMonths;
                
                // Add budget percentage (evenly distributed across active months)
                const budgetLabel = document.createElement('div');
                budgetLabel.className = 'budget-percentage';
                budgetLabel.textContent = `${monthPercentage}%`;
                cell.appendChild(budgetLabel);
                
                // Add tooltip with budget information
                cell.title = `${campaign.name}: $${(monthlyBudget/1000).toFixed(0)}K for ${campaignData.monthlyDistribution.months[index]}`;
            }
            
            calendarContainer.appendChild(cell);
        });
    });
}
