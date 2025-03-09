// Enhanced objectivesByTypeChart with elegant UI design
document.addEventListener('DOMContentLoaded', function() {
    // Wait for other scripts to initialize and charts to be created
    setTimeout(initializeObjectivesByTypeCharts, 1500);
});

function initializeObjectivesByTypeCharts() {
    console.log("Initializing Campaign Objectives By Type Charts...");
    
    // Get the container that holds the original chart
    const chartContainer = document.querySelector('.objectives-section .chart-container-half');
    if (!chartContainer) {
        console.error('Chart container not found for objectivesByTypeChart');
        return;
    }
    
    // Clear the container completely
    chartContainer.innerHTML = '';
    
        // Create a completely new structure for our charts
        const mainContainer = document.createElement('div');
        mainContainer.className = 'objectives-by-type-container';
        mainContainer.style.width = '100%';
        mainContainer.style.height = 'auto'; // Changed from 100% to auto to accommodate all charts
        mainContainer.style.display = 'flex';
        mainContainer.style.flexDirection = 'column';
        mainContainer.style.alignItems = 'center';
        mainContainer.style.justifyContent = 'flex-start';
        mainContainer.style.padding = '20px';
        mainContainer.style.boxSizing = 'border-box';
        
        // Override the container height to ensure all content is visible
        chartContainer.style.height = 'auto';
        chartContainer.style.minHeight = '700px'; // Set a minimum height to ensure all content fits
    
    // Add a title
    const titleElement = document.createElement('h3');
    titleElement.textContent = 'Campaign Objectives by Type';
    titleElement.style.textAlign = 'center';
    titleElement.style.color = '#e0e0e0';
    titleElement.style.fontSize = '18px';
    titleElement.style.marginBottom = '20px';
    titleElement.style.width = '100%';
    mainContainer.appendChild(titleElement);
    
    // Add description
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = 'These radar charts show the focus areas for each campaign type, highlighting the balance between awareness, consideration, intent, and familiarity objectives.';
    descriptionElement.style.textAlign = 'center';
    descriptionElement.style.color = '#a0a0a0';
    descriptionElement.style.fontSize = '14px';
    descriptionElement.style.marginBottom = '25px';
    descriptionElement.style.padding = '0 15px';
    descriptionElement.style.width = '100%';
    mainContainer.appendChild(descriptionElement);
    
    // Add the main container to the chart container
    chartContainer.appendChild(mainContainer);
    
    // Define the chart data
    const chartData = [
        {
            type: 'Brand Awareness',
            color: '#4285f4',
            data: [4.8, 4.2, 3.5, 4.6],
            description: 'Focus on long-term brand building with high awareness and familiarity objectives'
        },
        {
            type: 'Strategic Leavers',
            color: '#34a853',
            data: [3.8, 2.9, 4.7, 3.5],
            description: 'Drive immediate action with strong intent objectives'
        },
        {
            type: 'Culture',
            color: '#fbbc04',
            data: [5.0, 3.0, 2.0, 5.0],
            description: 'Highlight cultural attractions with focus on awareness and familiarity'
        }
    ];
    
    // Create a fixed layout for the charts - using a table for reliable layout
    const chartsTable = document.createElement('table');
    chartsTable.style.width = '100%';
    chartsTable.style.borderCollapse = 'separate';
    chartsTable.style.borderSpacing = '20px';
    chartsTable.style.marginBottom = '30px';
    
    // Create two rows - one for charts and one for descriptions
    const chartRow = document.createElement('tr');
    const descRow = document.createElement('tr');
    
    // Create each chart
    chartData.forEach((chart, index) => {
        // Create table cell for each chart
        const chartCell = document.createElement('td');
        chartCell.style.width = '33.33%';
        chartCell.style.verticalAlign = 'top';
        
        // Create chart wrapper
        const chartWrapper = document.createElement('div');
        chartWrapper.style.width = '100%';
        chartWrapper.style.backgroundColor = 'var(--card-bg)';
        chartWrapper.style.borderRadius = '8px';
        chartWrapper.style.padding = '15px';
        chartWrapper.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        chartWrapper.style.border = `1px solid ${chart.color}30`;
        chartWrapper.style.position = 'relative';
        chartWrapper.style.overflow = 'hidden';
        chartWrapper.style.marginBottom = '10px';
        chartWrapper.style.height = '250px'; // Further reduced height for chart containers
        
        // Add subtle background accent
        const accent = document.createElement('div');
        accent.style.position = 'absolute';
        accent.style.top = '0';
        accent.style.left = '0';
        accent.style.width = '100%';
        accent.style.height = '4px';
        accent.style.backgroundColor = chart.color;
        chartWrapper.appendChild(accent);
        
        // Add title
        const chartTitle = document.createElement('h4');
        chartTitle.textContent = chart.type + ' Campaigns';
        chartTitle.style.textAlign = 'center';
        chartTitle.style.color = chart.color;
        chartTitle.style.fontSize = '16px';
        chartTitle.style.marginBottom = '15px';
        chartTitle.style.fontWeight = '600';
        chartWrapper.appendChild(chartTitle);
        
        // Add canvas for the chart
        const canvasContainer = document.createElement('div');
        canvasContainer.style.width = '100%';
        canvasContainer.style.height = '180px'; // Further reduced height for canvas container
        canvasContainer.style.position = 'relative';
        
        const canvas = document.createElement('canvas');
        canvas.id = `${chart.type.toLowerCase().replace(/\s+/g, '')}ObjectivesChart`;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvasContainer.appendChild(canvas);
        chartWrapper.appendChild(canvasContainer);
        
        // Add to chart cell
        chartCell.appendChild(chartWrapper);
        chartRow.appendChild(chartCell);
        
        // Create description cell (separate row)
        const descCell = document.createElement('td');
        descCell.style.width = '33.33%';
        descCell.style.verticalAlign = 'top';
        
        // Create description box
        const descBox = document.createElement('div');
        descBox.style.backgroundColor = 'var(--card-bg)';
        descBox.style.borderRadius = '8px';
        descBox.style.padding = '12px';
        descBox.style.border = `1px solid ${chart.color}30`;
        descBox.style.marginTop = '5px';
        descBox.style.height = 'auto';
        
        // Add description
        const description = document.createElement('p');
        description.textContent = chart.description;
        description.style.textAlign = 'center';
        description.style.color = '#e0e0e0'; // Brighter color for better visibility
        description.style.fontSize = '14px'; // Larger font size
        description.style.margin = '0';
        description.style.padding = '0';
        descBox.appendChild(description);
        
        // Add to description cell
        descCell.appendChild(descBox);
        descRow.appendChild(descCell);
    });
    
    // Add rows to table
    chartsTable.appendChild(chartRow);
    chartsTable.appendChild(descRow);
    
    // Add table to main container
    mainContainer.appendChild(chartsTable);
    
    // Add a legend
    const legendContainer = document.createElement('div');
    legendContainer.style.marginTop = '10px';
    legendContainer.style.display = 'flex';
    legendContainer.style.flexWrap = 'wrap';
    legendContainer.style.justifyContent = 'center';
    legendContainer.style.gap = '15px';
    legendContainer.style.padding = '12px';
    legendContainer.style.backgroundColor = 'var(--card-bg)';
    legendContainer.style.borderRadius = '8px';
    legendContainer.style.width = '100%';
    legendContainer.style.marginBottom = '20px'; // Add margin at the bottom
    
    // Legend items
    const legendItems = [
        { label: 'Awareness', desc: 'Brand recognition and visibility' },
        { label: 'Consideration', desc: 'Evaluation as a destination' },
        { label: 'Intent', desc: 'Booking decisions' },
        { label: 'Familiarity', desc: 'Knowledge of offerings' }
    ];
    
    legendItems.forEach(item => {
        const legendItem = document.createElement('div');
        legendItem.style.display = 'flex';
        legendItem.style.alignItems = 'center';
        
        const dot = document.createElement('span');
        dot.style.width = '8px';
        dot.style.height = '8px';
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = '#e0e0e0';
        dot.style.marginRight = '6px';
        legendItem.appendChild(dot);
        
        const text = document.createElement('span');
        text.innerHTML = `<strong style="color:#e0e0e0">${item.label}:</strong> <span style="color:#a0a0a0;font-size:12px">${item.desc}</span>`;
        legendItem.appendChild(text);
        
        legendContainer.appendChild(legendItem);
    });
    
    mainContainer.appendChild(legendContainer);
    
    // Create the radar charts after the DOM has been updated
    setTimeout(() => {
        chartData.forEach((chart, index) => {
            createRadarChart(`${chart.type.toLowerCase().replace(/\s+/g, '')}ObjectivesChart`, chart);
        });
    }, 500);
}

function createRadarChart(canvasId, chartData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`Canvas element with ID ${canvasId} not found`);
        return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error(`Could not get 2D context for canvas ${canvasId}`);
        return;
    }
    
    try {
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Awareness', 'Consideration', 'Intent', 'Familiarity'],
                datasets: [{
                    label: chartData.type,
                    data: chartData.data,
                    backgroundColor: `${chartData.color}20`,
                    borderColor: chartData.color,
                    borderWidth: 2,
                    pointBackgroundColor: chartData.color,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartData.color,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: '#e0e0e0',
                            font: {
                                size: 12
                            }
                        },
                        ticks: {
                            backdropColor: 'transparent',
                            color: '#a0a0a0',
                            z: 100
                        },
                        min: 0,
                        max: 5,
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleFont: {
                            size: 14
                        },
                        bodyFont: {
                            size: 14
                        },
                        padding: 10,
                        callbacks: {
                            label: function(context) {
                                const value = context.raw || 0;
                                const category = context.chart.data.labels[context.dataIndex];
                                return `${category}: ${value}/5`;
                            }
                        }
                    }
                }
            }
        });
        console.log(`Successfully created radar chart for ${chartData.type}`);
    } catch (error) {
        console.error(`Error creating radar chart for ${chartData.type}:`, error);
    }
}

// Override the enhanceObjectivesByTypeChart function from index.html
window.enhanceObjectivesByTypeChart = function() {
    console.log("External enhanceObjectivesByTypeChart called, but we're using our own implementation");
    // Do nothing, as we're using our own implementation
};
