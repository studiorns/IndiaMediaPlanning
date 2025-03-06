# India Campaign Planning Dashboard Optimization

This directory contains files for optimizing the India Campaign Planning dashboard using the detailed campaign data from `detailed-campaign-planning-India.csv`.

## Files Overview

1. **campaign_optimization_plan.md**
   - Comprehensive plan outlining recommended dashboard optimizations
   - Includes sections for new visualizations, interactive elements, and insights
   - Prioritizes enhancements based on value and implementation complexity

2. **campaign_distribution_chart.js**
   - JavaScript implementation of the monthly campaign distribution chart
   - Visualizes impression distribution across campaigns by month
   - Includes campaign performance comparison and efficiency charts
   - Ready to be integrated with the existing dashboard

3. **enhanced_dashboard_template.html**
   - HTML template demonstrating how new visualizations can be integrated
   - Includes new sections for campaign performance, distribution, and details
   - Provides interactive campaign filtering and selection

## Implementation Guide

### Step 1: Add Script References

Add the following script reference to `index.html` before the closing `</body>` tag:

```html
<script src="campaign_distribution_chart.js"></script>
```

### Step 2: Add Chart Containers

Add the following HTML to create containers for the new charts:

```html
<!-- Campaign Performance Comparison Section -->
<div class="dashboard-section">
    <h2><i class="fas fa-chart-bar"></i> Campaign Performance Comparison</h2>
    
    <!-- Campaign type filter -->
    <div class="campaign-type-filter">
        <button class="campaign-type-btn active" data-type="all">All Campaigns</button>
        <button class="campaign-type-btn" data-type="brand-awareness">Brand Awareness</button>
        <button class="campaign-type-btn" data-type="strategic-leavers">Strategic Leavers</button>
        <button class="campaign-type-btn" data-type="culture">Culture</button>
    </div>
    
    <div class="chart-container">
        <canvas id="campaignPerformanceChart"></canvas>
    </div>
    
    <div class="chart-container">
        <canvas id="campaignEfficiencyChart"></canvas>
    </div>
</div>

<!-- Monthly Campaign Distribution Section -->
<div class="dashboard-section">
    <h2><i class="fas fa-calendar-alt"></i> Monthly Campaign Distribution</h2>
    
    <div class="chart-container">
        <canvas id="campaignDistributionChart"></canvas>
    </div>
</div>
```

### Step 3: Add CSS Styles

Add the following CSS styles to the `<style>` section in `index.html`:

```css
/* Campaign selector styles */
.campaign-selector {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
}

.campaign-filter-btn {
    background-color: var(--gray-300);
    color: var(--gray-800);
    border: none;
    padding: 8px 16px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-weight: 600;
    transition: var(--transition);
}

.campaign-filter-btn.active {
    background-color: var(--primary);
    color: white;
}

.campaign-filter-btn:hover:not(.active) {
    background-color: var(--gray-400);
}

/* Campaign type filter */
.campaign-type-filter {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.campaign-type-btn {
    flex: 1;
    background-color: var(--gray-300);
    color: var(--gray-800);
    border: none;
    padding: 10px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-weight: 600;
    transition: var(--transition);
    text-align: center;
}

.campaign-type-btn.active {
    background-color: var(--primary);
    color: white;
}

.campaign-type-btn:hover:not(.active) {
    background-color: var(--gray-400);
}
```

### Step 4: Add Campaign Filtering Functionality

Add the following JavaScript to enable campaign filtering:

```javascript
// Campaign type filter functionality
document.querySelectorAll('.campaign-type-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.campaign-type-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Filter campaigns based on selected type
        const type = this.getAttribute('data-type');
        
        // Redraw charts with filtered data
        // This would be implemented based on your specific chart implementation
    });
});

// Campaign selector functionality
document.querySelectorAll('.campaign-filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.campaign-filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Filter data based on selected campaign
        const campaign = this.getAttribute('data-campaign');
        
        // Update table and charts based on selected campaign
        // This would be implemented based on your specific implementation
    });
});
```

### Step 5: Add Insights and Recommendations

Add the following HTML to include insights and recommendations based on the campaign data:

```html
<div class="insight-summary">
    <h3><i class="fas fa-chart-line"></i> Performance Insights</h3>
    <p>The campaign performance analysis reveals significant variations in efficiency metrics across campaigns. The Ramadan campaign has the highest CPM ($3.61) but also delivers strong engagement. The VAD AO (Visit Abu Dhabi Always On) campaign shows excellent cost efficiency with a CPM of only $0.24, while maintaining high engagement levels. The Summer campaign delivers the highest volume of impressions (3.36B) and strong engagement (382.9M) at a moderate CPM of $0.68.</p>
</div>

<div class="recommendation-card">
    <h4><i class="fas fa-calendar-check"></i> Campaign Timing Optimization</h4>
    <p>Based on the detailed campaign distribution analysis and the 44-day booking window, we recommend the following timing adjustments:</p>
    <ul style="margin-left: 20px; margin-bottom: 16px;">
        <li>Increase January impressions by 25% to better support the March-April secondary peak travel period</li>
        <li>Reduce February impressions by 35% as this month is currently over-allocated</li>
        <li>Increase September-October impressions by 35-40% to better capture the November-December peak travel season</li>
        <li>Reduce December impressions by 25% as these are too late to influence high-season travel due to the booking window</li>
    </ul>
    <p>These adjustments will better align campaign timing with the 44-day booking window while maintaining the same total annual impressions.</p>
</div>
```

## Additional Enhancements

For a complete implementation of all recommended optimizations, refer to the `campaign_optimization_plan.md` file. The plan includes additional enhancements such as:

1. Campaign efficiency analysis
2. Enhanced seasonality analysis with campaign overlay
3. Interactive campaign selector
4. Campaign-specific insights
5. Budget allocation recommendations

## Testing

To test the enhanced dashboard:

1. Open `index.html` in a web browser
2. Verify that the new charts are displayed correctly
3. Test the campaign filtering functionality
4. Check that the insights and recommendations are displayed correctly

## Notes

- The implementation uses Chart.js for visualizations
- The campaign data is sourced from `detailed-campaign-planning-India.csv`
- The dashboard is designed to be responsive and work on all screen sizes
