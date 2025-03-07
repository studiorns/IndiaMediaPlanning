// Campaign Timing Chart - Displays campaign calendar with budget percentages
document.addEventListener('DOMContentLoaded', function() {
    // Process campaign data from enhanced_dashboard_data.js
    const processedCampaignData = [];
    
    // Map campaign names from campaignCalendar to match the display names in the HTML
    const campaignNameMap = {
        'Global Brand Ambassador Q1': 'Global Brand Ambassador',
        'Global Brand Ambassador Q4': 'Global Brand Ambassador',
        'Summer': 'Summer Campaign',
        'Abu Dhabi Calendar Launch': 'Abu Dhabi Calendar Launch',
        'Saadiyat Cultural District': 'Saadiyat Culture District',
        'Ramadan': 'Ramadan',
        'Diwali': 'Diwali',
        'Family Vacation with Ranveer Singh': 'Family Vacation with Ranveer Singh',
        'F1': 'F1',
        'Abu Dhabi Calendar Always On': 'Abu Dhabi Calendar Always On',
        'Visit Abu Dhabi Always On': 'Visit Abu Dhabi Always On',
        'NBA': 'NBA Campaign',
        'Comedy Week': 'Comedy Week',
        'Search Always On': 'Search Always On'
    };
    
    // Find the campaign type from the campaigns array
    const findCampaignType = (campaignName) => {
        const campaign = campaignData.campaigns.find(c => c.name === campaignName);
        return campaign ? campaign.type : 'Unknown';
    };
    
    // Process each campaign in the campaignCalendar array
    campaignData.campaignCalendar.forEach(campaign => {
        const monthData = [];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Create month data with active status and percentage
        for (let i = 0; i < 12; i++) {
            monthData.push({
                month: monthNames[i],
                active: campaign.months[i] === 1,
                percentage: campaign.percentages ? campaign.percentages[i] : null
            });
        }
        
        // Add processed campaign to the array with mapped display name
        processedCampaignData.push({
            name: campaignNameMap[campaign.name] || campaign.name,
            type: findCampaignType(campaign.name),
            months: monthData
        });
    });

    // Calculate total monthly budget percentages
    function calculateTotalMonthlyBudgetPercentages() {
        const monthlyBudgets = Array(12).fill(0);
        const totalBudget = campaignData.campaigns.reduce((sum, c) => sum + c.budget, 0);
        
        // For each campaign, calculate the budget allocated to each month
        campaignData.campaignCalendar.forEach(campaign => {
            // Find the campaign budget
            const campaignObj = campaignData.campaigns.find(c => c.name === campaign.name);
            if (!campaignObj) return;
            
            const campaignBudget = campaignObj.budget;
            
            // For each month, calculate the budget allocated
            for (let i = 0; i < 12; i++) {
                if (campaign.months[i] === 1 && campaign.percentages && campaign.percentages[i]) {
                    // Add the budget allocated to this month
                    monthlyBudgets[i] += campaignBudget * (campaign.percentages[i] / 100);
                }
            }
        });
        
        // Convert to percentages of total yearly budget with 1 decimal point
        return monthlyBudgets.map(budget => parseFloat(((budget / totalBudget) * 100).toFixed(1)));
    }

    // Get total monthly budget percentages
    const totalMonthlyBudgetPercentages = calculateTotalMonthlyBudgetPercentages();
    console.log("Total Monthly Budget Percentages:", totalMonthlyBudgetPercentages);
    
    // Calculate optimal monthly budget percentages based on optimized impressions
    function calculateOptimalMonthlyBudgetPercentages() {
        // Get optimized impressions data from enhanced_optimized_impressions_chart.js
        const optimizedImpressions = [
            385074994,    // Jan: +25% to support March-April secondary peak
            542191098,    // Feb: -35% reduction as currently over-allocated
            1031750574,   // Mar: unchanged
            1744888016,   // Apr: -15% reduction
            1651937037,   // May: -20% reduction
            865852843,    // Jun: unchanged
            890295428,    // Jul: +15% increase for September shoulder season
            929003924,    // Aug: +20% increase for September shoulder season
            1900774018,   // Sep: +38% increase to capture November-December peak
            2648682692,   // Oct: +35% increase to capture November-December peak
            1491941387,   // Nov: unchanged
            1576436581    // Dec: -25% reduction as too late for high-season travel
        ];
        
        // Calculate total impressions
        const totalImpressions = optimizedImpressions.reduce((sum, impressions) => sum + impressions, 0);
        
        // Convert to percentages of total yearly impressions with 1 decimal point
        return optimizedImpressions.map(impressions => parseFloat(((impressions / totalImpressions) * 100).toFixed(1)));
    }
    
    // Get optimal monthly budget percentages
    const optimalMonthlyBudgetPercentages = calculateOptimalMonthlyBudgetPercentages();
    console.log("Optimal Monthly Budget Percentages:", optimalMonthlyBudgetPercentages);

    // Function to render the campaign calendar
    function renderCampaignCalendar(filteredData = processedCampaignData) {
        const calendarContainer = document.getElementById('campaignCalendar');
        calendarContainer.innerHTML = ''; // Clear existing content

        // Create a grid container for the calendar
        const gridContainer = document.createElement('div');
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = '200px repeat(12, 1fr)';
        gridContainer.style.gap = '4px';
        gridContainer.style.marginBottom = '20px';

        // Add each campaign row
        filteredData.forEach(campaign => {
            // Campaign name cell
            const nameCell = document.createElement('div');
            nameCell.className = 'calendar-label';
            nameCell.textContent = campaign.name;
            gridContainer.appendChild(nameCell);

            // Month cells
            campaign.months.forEach(monthData => {
                const cell = document.createElement('div');
                cell.className = 'calendar-cell';
                
                if (monthData.active) {
                    cell.classList.add(`active-${campaign.type.toLowerCase()}`);
                    
                    // Add budget percentage
                    const percentageSpan = document.createElement('span');
                    percentageSpan.className = 'budget-percentage';
                    percentageSpan.textContent = `${monthData.percentage}%`;
                    percentageSpan.title = `${monthData.percentage}% of this campaign's budget is allocated to ${monthData.month}`;
                    cell.appendChild(percentageSpan);
                }
                
                gridContainer.appendChild(cell);
            });
        });

        // Add total budget percentage row
        const totalLabelCell = document.createElement('div');
        totalLabelCell.className = 'calendar-label';
        totalLabelCell.textContent = 'Total Budget %';
        totalLabelCell.style.fontWeight = 'bold';
        totalLabelCell.style.backgroundColor = '#1a2233'; // Darker blue background
        totalLabelCell.style.color = '#4285f4'; // Blue text
        gridContainer.appendChild(totalLabelCell);

        // Add total percentage cells for each month
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for (let i = 0; i < 12; i++) {
            const totalCell = document.createElement('div');
            totalCell.className = 'calendar-cell';
            totalCell.style.backgroundColor = '#1a2233'; // Darker blue background
            
            // Add total budget percentage
            const totalPercentageSpan = document.createElement('span');
            totalPercentageSpan.className = 'budget-percentage';
            totalPercentageSpan.style.color = '#4285f4'; // Blue text
            totalPercentageSpan.textContent = `${totalMonthlyBudgetPercentages[i]}%`;
            totalPercentageSpan.title = `${totalMonthlyBudgetPercentages[i]}% of the total yearly budget is allocated to ${monthNames[i]}`;
            totalCell.appendChild(totalPercentageSpan);
            
            gridContainer.appendChild(totalCell);
        }
        
        // Add optimal budget percentage row
        const optimalLabelCell = document.createElement('div');
        optimalLabelCell.className = 'calendar-label';
        optimalLabelCell.textContent = 'Optimal Budget %';
        optimalLabelCell.style.fontWeight = 'bold';
        optimalLabelCell.style.backgroundColor = '#1a2a1e'; // Darker green background
        optimalLabelCell.style.color = '#34a853'; // Green text
        gridContainer.appendChild(optimalLabelCell);

        // Add optimal percentage cells for each month
        for (let i = 0; i < 12; i++) {
            const optimalCell = document.createElement('div');
            optimalCell.className = 'calendar-cell';
            optimalCell.style.backgroundColor = '#1a2a1e'; // Darker green background
            
            // Add optimal budget percentage
            const optimalPercentageSpan = document.createElement('span');
            optimalPercentageSpan.className = 'budget-percentage';
            optimalPercentageSpan.style.color = '#34a853'; // Green text
            optimalPercentageSpan.textContent = `${optimalMonthlyBudgetPercentages[i]}%`;
            optimalPercentageSpan.title = `${optimalMonthlyBudgetPercentages[i]}% of the total yearly budget should be allocated to ${monthNames[i]} based on optimized distribution`;
            optimalCell.appendChild(optimalPercentageSpan);
            
            gridContainer.appendChild(optimalCell);
        }

        calendarContainer.appendChild(gridContainer);
    }

    // Initialize the calendar
    renderCampaignCalendar();

    // Set up filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter type
            const filterType = this.getAttribute('data-type');
            
            // Filter campaigns
            let filteredData;
            if (filterType === 'all') {
                filteredData = processedCampaignData;
            } else {
                filteredData = processedCampaignData.filter(campaign => 
                    campaign.type.toLowerCase() === filterType.toLowerCase()
                );
            }
            
            // Render filtered calendar
            renderCampaignCalendar(filteredData);
        });
    });
});
