// Campaign Visualization Script
document.addEventListener('DOMContentLoaded', function() {
    console.log("Campaign visualization script loaded");
    
    // Check if campaignData is available
    if (typeof campaignData === 'undefined') {
        console.error("campaignData is not defined. Make sure enhanced_dashboard_data.js is loaded first.");
        return;
    }
    
    console.log("Campaign data available:", campaignData);
    console.log("Campaign calendar data:", campaignData.campaignCalendar);
    
    try {
        // Initialize the campaign calendar
        initializeCampaignCalendar();
        
        // Set up filter buttons
        setupFilterButtons();
        
        console.log("Campaign calendar initialization completed successfully");
    } catch (error) {
        console.error("Error initializing campaign calendar:", error);
    }
});

// Initialize the campaign calendar
function initializeCampaignCalendar() {
    const calendarContainer = document.getElementById('campaignCalendar');
    if (!calendarContainer) {
        console.error("campaignCalendar container not found");
        return;
    }
    
    // Clear any existing content
    calendarContainer.innerHTML = '';
    
    // Create calendar rows for each campaign
    campaignData.campaignCalendar.forEach(campaign => {
        const row = document.createElement('div');
        row.className = 'calendar-row';
        row.dataset.category = campaign.category;
        
        // Add campaign name cell
        const nameCell = document.createElement('div');
        nameCell.className = 'calendar-label';
        nameCell.textContent = campaign.name;
        row.appendChild(nameCell);
        
        // Add month cells
        campaign.months.forEach((active, index) => {
            const cell = document.createElement('div');
            cell.className = active ? `calendar-cell active active-${campaign.category}` : 'calendar-cell';
            
            // Add budget percentage if active
            if (active) {
                // Calculate budget percentage for this campaign and month
                const campaignObj = campaignData.campaigns.find(c => c.name === campaign.name);
                if (campaignObj) {
                    const totalBudget = campaignData.campaigns.reduce((sum, c) => sum + c.budget, 0);
                    const campaignBudgetPercentage = ((campaignObj.budget / totalBudget) * 100).toFixed(0);
                    
                    // Only show percentage if it's significant enough
                    if (campaignBudgetPercentage > 3) {
                        const budgetSpan = document.createElement('span');
                        budgetSpan.className = 'budget-percentage';
                        budgetSpan.textContent = campaignBudgetPercentage + '%';
                        cell.appendChild(budgetSpan);
                    }
                }
            }
            
            row.appendChild(cell);
        });
        
        calendarContainer.appendChild(row);
    });
}

// Set up filter buttons
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length === 0) {
        console.error("Filter buttons not found");
        return;
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter type
            const filterType = this.dataset.type;
            console.log("Filter selected:", filterType);
            
            // Map HTML button data-type to campaign category
            let categoryFilter;
            switch(filterType) {
                case 'brand-awareness':
                    categoryFilter = 'brand-awareness';
                    break;
                case 'strategic-leavers':
                    categoryFilter = 'strategic-leavers';
                    break;
                case 'culture':
                    categoryFilter = 'culture';
                    break;
                default:
                    categoryFilter = 'all';
            }
            
            // Filter calendar rows
            const rows = document.querySelectorAll('.calendar-row');
            rows.forEach(row => {
                if (categoryFilter === 'all' || row.dataset.category === categoryFilter) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
}
