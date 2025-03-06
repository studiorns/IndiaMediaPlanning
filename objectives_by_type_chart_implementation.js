// Enhanced objectivesByTypeChart implementation with best UI practices
document.addEventListener('DOMContentLoaded', function() {
    // Create the objectives by type charts
    createObjectivesByTypeCharts();
});

function createObjectivesByTypeCharts() {
    // Get the objectives section container
    const objectivesSection = document.querySelector('.objectives-section .chart-container-half');
    if (!objectivesSection) {
        console.error('Objectives section not found');
        return;
    }
    
    // Remove the original chart if it exists
    const originalChart = document.getElementById('objectivesByTypeChart');
    if (originalChart) {
        originalChart.remove();
    }
    
    // Add section title and description
    const sectionTitle = document.createElement('div');
    sectionTitle.className = 'section-title';
    sectionTitle.style.textAlign = 'center';
    sectionTitle.style.marginBottom = '25px';
    sectionTitle.innerHTML = `
        <h3 style="color: #e0e0e0; font-size: 18px; margin-bottom: 8px;">Campaign Objectives by Type</h3>
        <p style="color: #a0a0a0; font-size: 14px; max-width: 700px; margin: 0 auto; line-height: 1.5;">
            These radar charts show the focus areas for each campaign type, highlighting the balance between awareness, consideration, intent, and familiarity objectives.
        </p>
    `;
    objectivesSection.appendChild(sectionTitle);
    
    // Create container for the charts
    const chartsContainer = document.createElement('div');
    chartsContainer.style.display = 'flex';
    chartsContainer.style.flexWrap = 'wrap';
    chartsContainer.style.gap = '20px';
    chartsContainer.style.justifyContent = 'center';
    objectivesSection.appendChild(chartsContainer);
    
    // Define chart types and their properties
    const chartTypes = [
        {
            name: 'Strategic Campaigns',
            description: 'Strategic campaigns focus on long-term brand building with high awareness and familiarity objectives.',
            color: '#4285f4',
            data: [4.8, 4.2, 3.5, 4.6]
        },
        {
            name: 'Tactical Campaigns',
            description: 'Tactical campaigns drive immediate action with strong intent objectives.',
            color: '#34a853',
            data: [3.8, 2.9, 4.7, 3.5]
        },
        {
            name: 'Culture Campaigns',
            description: 'Culture campaigns highlight Abu Dhabi\'s cultural attractions, with a strong focus on awareness and familiarity.',
            color: '#fbbc04',
            data: [5.0, 3.0, 2.0, 5.0]
        }
    ];
    
    // Create each chart
    chartTypes.forEach(chartType => {
        // Create chart container
        const chartBox = document.createElement('div');
        chartBox.style.flex = '1';
        chartBox.style.minWidth = '300px';
        chartBox.style.maxWidth = '350px';
        chartBox.style.backgroundColor = 'var(--card-bg)';
        chartBox.style.borderRadius = '8px';
        chartBox.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        chartBox.style.padding = '20px';
        chartBox.style.marginBottom = '20px';
        chartBox.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        chartBox.style.borderTop = `4px solid ${chartType.color}`;
        
        // Add hover effect
        chartBox.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.15)';
        });
        
        chartBox.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        });
        
        // Add title
        const chartTitle = document.createElement('div');
        chartTitle.style.fontSize = '16px';
        chartTitle.style.fontWeight = '600';
        chartTitle.style.marginBottom = '15px';
        chartTitle.style.textAlign = 'center';
        chartTitle.style.color = chartType.color;
        chartTitle.textContent = chartType.name;
        chartBox.appendChild(chartTitle);
        
        // Add canvas for chart
        const canvas = document.createElement('canvas');
        canvas.id = chartType.name.toLowerCase().replace(/\s+/g, '-') + '-chart';
        canvas.style.height = '200px';
        canvas.style.width = '100%';
        chartBox.appendChild(canvas);
        
        // Add description
        const chartDescription = document.createElement('div');
        chartDescription.style.fontSize = '13px';
        chartDescription.style.color = '#a0a0a0';
        chartDescription.style.margin = '15px 0';
        chartDescription.style.textAlign = 'center';
        chartDescription.style.lineHeight = '1.5';
        chartDescription.textContent = chartType.description;
        chartBox.appendChild(chartDescription);
        
        // Add to container
        chartsContainer.appendChild(chartBox);
        
        // Create chart
        createRadarChart(canvas.id, chartType);
    });
    
    // Add a legend
    const legendContainer = document.createElement('div');
    legendContainer.style.display = 'flex';
    legendContainer.style.justifyContent = 'center';
    legendContainer.style.flexWrap = 'wrap';
    legendContainer.style.gap = '20px';
    legendContainer.style.marginTop = '15px';
    legendContainer.style.backgroundColor = 'var(--card-bg)';
    legendContainer.style.borderRadius = '8px';
    legendContainer.style.padding = '15px';
    legendContainer.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.1)';
    
    const dimensions = [
        { name: 'Awareness', description: 'Focus on increasing brand recognition and visibility' },
        { name: 'Consideration', description: 'Efforts to get travelers to evaluate Abu Dhabi as a destination' },
        { name: 'Intent', description: 'Driving action and booking decisions' },
        { name: 'Familiarity', description: 'Building deeper knowledge of destination offerings' }
    ];
    
    dimensions.forEach(dim => {
        const dimensionElement = document.createElement('div');
        dimensionElement.style.display = 'flex';
        dimensionElement.style.alignItems = 'center';
        
        const colorDot = document.createElement('div');
        colorDot.style.width = '8px';
        colorDot.style.height = '8px';
        colorDot.style.borderRadius = '50%';
        colorDot.style.backgroundColor = '#e0e0e0';
        colorDot.style.marginRight = '8px';
        
        const dimensionText = document.createElement('div');
        dimensionText.style.fontSize = '12px';
        
        const dimensionName = document.createElement('span');
        dimensionName.textContent = dim.name;
        dimensionName.style.fontWeight = '600';
        dimensionName.style.color = '#e0e0e0';
        dimensionName.style.marginRight = '5px';
        
        const dimensionDesc = document.createElement('span');
        dimensionDesc.textContent = dim.description;
        dimensionDesc.style.color = '#a0a0a0';
        dimensionDesc.style.fontSize = '11px';
        
        dimensionText.appendChild(dimensionName);
        dimensionText.appendChild(document.createTextNode(': '));
        dimensionText.appendChild(dimensionDesc);
        
        dimensionElement.appendChild(colorDot);
        dimensionElement.appendChild(dimensionText);
        
        legendContainer.appendChild(dimensionElement);
    });
    
    objectivesSection.appendChild(legendContainer);
}

function createRadarChart(canvasId, chartType) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    const chartData = {
        labels: ['Awareness', 'Consideration', 'Intent', 'Familiarity'],
        datasets: [{
            label: chartType.name,
            data: chartType.data,
            backgroundColor: `${chartType.color}33`, // Add transparency
            borderColor: chartType.color,
            borderWidth: 2,
            pointBackgroundColor: chartType.color,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: chartType.color,
            pointRadius: 4,
            pointHoverRadius: 6
        }]
    };
    
    const chartOptions = {
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
                    font: {
                        size: 12,
                        weight: 'bold'
                    },
                    color: '#e0e0e0'
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
                        const label = context.dataset.label || '';
                        const value = context.raw || 0;
                        const category = context.chart.data.labels[context.dataIndex];
                        return `${label}: ${category} = ${value}/5`;
                    }
                }
            }
        }
    };
    
    new Chart(ctx, {
        type: 'radar',
        data: chartData,
        options: chartOptions
    });
}
