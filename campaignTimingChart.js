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
    
    // Find the campaign type from the campaigns array and map it to the CSS class type
    const findCampaignType = (campaignName) => {
        const campaign = campaignData.campaigns.find(c => c.name === campaignName);
        if (!campaign) return 'Unknown';
        
        // Map the campaign types from the data to the types used in CSS classes
        const typeMap = {
            'Brand Awareness': 'Strategic',
            'Strategic Leavers': 'Tactical',
            'Culture': 'Culture'
        };
        
        return typeMap[campaign.type] || campaign.type;
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
                percentage: campaign.percentages ? campaign.percentages[i] : null,
                status: campaign.status ? campaign.status[i] : ''
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
            308059995,    // Jan: PAST PERIOD - No longer applicable (using actual values)
            834140150,    // Feb: PAST PERIOD - No longer applicable (using actual values)
            1134925631,   // Mar: +10% increase for current month activities
            1847528488,   // Apr: -10% reduction (adjusted from -15%)
            1755183102,   // May: -15% reduction (adjusted from -20%)
            865852843,    // Jun: unchanged
            890295428,    // Jul: +15% increase for September shoulder season
            929003924,    // Aug: +20% increase for September shoulder season
            1997190092,   // Sep: +45% enhanced increase to capture November-December peak
            2786021794,   // Oct: +42% enhanced increase to capture November-December peak
            1566538456,   // Nov: +5% slight increase to support peak season
            1681532353    // Dec: -20% reduction (adjusted from -25%)
        ];
        
        // Calculate total impressions
        const totalImpressions = optimizedImpressions.reduce((sum, impressions) => sum + impressions, 0);
        
        // First calculate the raw percentages based on impressions
        const rawPercentages = optimizedImpressions.map(impressions => 
            parseFloat(((impressions / totalImpressions) * 100).toFixed(1))
        );
        
    // Now adjust for fixed January and February percentages
    // Get the actual January and February percentages from totalMonthlyBudgetPercentages
    const janActual = 2.0; // Fixed at 2%
    const febActual = 6.4; // Fixed at 6.4%
    const pastPeriodsTotal = janActual + febActual; // 8.4%
        const remainingBudget = 100 - pastPeriodsTotal; // 91.6%
        
        // Calculate the sum of raw percentages for March-December
        const rawMarDecSum = rawPercentages.slice(2).reduce((sum, p) => sum + p, 0);
        
        // Create the adjusted percentages array
        const adjustedPercentages = [];
        
        // Keep January and February at their actual values
        adjustedPercentages[0] = janActual;
        adjustedPercentages[1] = febActual;
        
        // Redistribute the remaining budget (91.6%) proportionally for March-December
        for (let i = 2; i < 12; i++) {
            // Calculate the proportion of this month relative to all Mar-Dec months
            const proportion = rawPercentages[i] / rawMarDecSum;
            
            // Allocate a portion of the remaining budget based on this proportion
            adjustedPercentages[i] = parseFloat((proportion * remainingBudget).toFixed(1));
        }
        
        return adjustedPercentages;
    }
    
    // Get optimal monthly budget percentages
    const optimalMonthlyBudgetPercentages = calculateOptimalMonthlyBudgetPercentages();
    console.log("Optimal Monthly Budget Percentages:", optimalMonthlyBudgetPercentages);

    // Function to render the campaign calendar
    function renderCampaignCalendar(filteredData = processedCampaignData) {
        const calendarContainer = document.getElementById('campaignCalendar');
        calendarContainer.innerHTML = ''; // Clear existing content

        // Add a note about mid-March adjustment
        const adjustmentNote = document.createElement('div');
        adjustmentNote.style.backgroundColor = 'rgba(66, 133, 244, 0.1)';
        adjustmentNote.style.border = '1px solid #4285f4';
        adjustmentNote.style.borderRadius = '8px';
        adjustmentNote.style.padding = '12px 16px';
        adjustmentNote.style.marginBottom = '16px';
        adjustmentNote.style.color = '#e0e0e0';
        adjustmentNote.style.fontSize = '14px';
        adjustmentNote.innerHTML = '<strong style="color: #4285f4;">Mid-March 2025 Adjustment:</strong> Budget allocations have been optimized based on the fact that January (' + totalMonthlyBudgetPercentages[0] + '%) and February (' + totalMonthlyBudgetPercentages[1] + '%) are past periods with fixed allocations. The remaining ' + (100 - totalMonthlyBudgetPercentages[0] - totalMonthlyBudgetPercentages[1]).toFixed(1) + '% of the budget has been redistributed proportionally, focusing on enhancing September-October to capture the November-December peak travel period, while adding a 10% increase to March for immediate impact.';
        calendarContainer.appendChild(adjustmentNote);

        // Create a grid container for the calendar
        const gridContainer = document.createElement('div');
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = '200px repeat(12, 1fr)';
        gridContainer.style.gap = '4px';
        gridContainer.style.marginBottom = '20px';

        // Add month header with indicators for past/current months
        const monthHeaderRow = document.createElement('div');
        monthHeaderRow.style.display = 'contents';
        
        // Empty cell for the top-left corner
        const emptyHeaderCell = document.createElement('div');
        emptyHeaderCell.className = 'calendar-header-cell';
        emptyHeaderCell.textContent = '';
        monthHeaderRow.appendChild(emptyHeaderCell);
        
        // Month header cells
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        monthNames.forEach((month, index) => {
            const monthCell = document.createElement('div');
            monthCell.className = 'calendar-header-cell';
            
            // Add past/current indicators
            if (index === 0 || index === 1) {
                monthCell.style.backgroundColor = 'rgba(150, 150, 150, 0.7)';
                monthCell.style.color = '#e0e0e0';
                monthCell.innerHTML = `${month}<br><span style="font-size: 9px; opacity: 0.8;">(PAST)</span>`;
            } else if (index === 2) {
                monthCell.style.backgroundColor = 'rgba(66, 133, 244, 0.7)';
                monthCell.style.color = 'white';
                monthCell.innerHTML = `${month}<br><span style="font-size: 9px; opacity: 0.8;">(CURRENT)</span>`;
            } else {
                monthCell.textContent = month;
            }
            
            monthHeaderRow.appendChild(monthCell);
        });
        
        gridContainer.appendChild(monthHeaderRow);

        // Add each campaign row
        filteredData.forEach(campaign => {
            // Campaign name cell
            const nameCell = document.createElement('div');
            nameCell.className = 'calendar-label';
            nameCell.textContent = campaign.name;
            gridContainer.appendChild(nameCell);

            // Month cells
            campaign.months.forEach((monthData, index) => {
                const cell = document.createElement('div');
                cell.className = 'calendar-cell';
                
                // Add past/current month styling
                if (index === 0 || index === 1) {
                    cell.style.opacity = '0.6';
                    cell.style.position = 'relative';
                    
                    if (monthData.active) {
                        cell.classList.add(`active-${campaign.type.toLowerCase()}`);
                        
                        // Add "PAST" indicator for active cells in past months
                        const pastIndicator = document.createElement('div');
                        pastIndicator.style.position = 'absolute';
                        pastIndicator.style.top = '0';
                        pastIndicator.style.left = '0';
                        pastIndicator.style.width = '100%';
                        pastIndicator.style.height = '100%';
                        pastIndicator.style.backgroundColor = 'rgba(150, 150, 150, 0.5)';
                        pastIndicator.style.display = 'flex';
                        pastIndicator.style.alignItems = 'center';
                        pastIndicator.style.justifyContent = 'center';
                        pastIndicator.style.fontSize = '10px';
                        pastIndicator.style.fontWeight = 'bold';
                        pastIndicator.style.color = 'white';
                        pastIndicator.textContent = 'PAST';
                        cell.appendChild(pastIndicator);
                        
                        // Add budget percentage behind the indicator
                        const percentageSpan = document.createElement('span');
                        percentageSpan.className = 'budget-percentage';
                        percentageSpan.style.opacity = '0.5';
                        percentageSpan.textContent = `${monthData.percentage}%`;
                        percentageSpan.title = `${monthData.percentage}% of this campaign's budget was allocated to ${monthData.month} (past period)`;
                        cell.appendChild(percentageSpan);
                    }
                } else if (index === 2) {
                    // Current month (March) styling
                    if (monthData.active) {
                        cell.classList.add(`active-${campaign.type.toLowerCase()}`);
                        cell.style.border = '2px solid white';
                        cell.style.boxShadow = '0 0 5px rgba(255, 255, 255, 0.5)';
                        
                        // Add budget percentage
                        const percentageSpan = document.createElement('span');
                        percentageSpan.className = 'budget-percentage';
                        percentageSpan.textContent = `${monthData.percentage}%`;
                        percentageSpan.title = `${monthData.percentage}% of this campaign's budget is allocated to ${monthData.month} (current month)`;
                        cell.appendChild(percentageSpan);
                    }
                } else if (monthData.active) {
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
