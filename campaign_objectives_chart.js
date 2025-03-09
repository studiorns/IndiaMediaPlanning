// Campaign Objectives Chart - Individual Campaign Level
document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing Campaign Objectives Chart (Individual Level)...");
    
    // Create the chart after a short delay to ensure DOM is ready
    setTimeout(createCampaignObjectivesChart, 500);
});

function createCampaignObjectivesChart() {
    // Get the canvas element
    const objectivesCtx = document.getElementById('objectivesChart');
    if (!objectivesCtx) {
        console.error('Canvas element with ID objectivesChart not found');
        return;
    }
    
    // Increase the height of the chart container for better readability
    const chartContainer = objectivesCtx.parentElement;
    if (chartContainer && chartContainer.classList.contains('chart-container')) {
        chartContainer.style.height = '550px'; // Increase from default 400px to 550px
    }
    
    // Campaign data from detailed-campaign-planning-India.csv
    const campaignData = [
        { 
            name: 'Summer', 
            type: 'Brand Awareness', 
            objectives: { awareness: 5, consideration: 5, intent: 4, familiarity: 5 },
            color: '#4285f4'
        },
        { 
            name: 'NBA', 
            type: 'Strategic Leavers', 
            objectives: { awareness: 3, consideration: 3, intent: 5, familiarity: 3 },
            color: '#34a853'
        },
        { 
            name: 'Visit Abu Dhabi Always On', 
            type: 'Brand Awareness', 
            objectives: { awareness: 5, consideration: 4, intent: 5, familiarity: 5 },
            color: '#4285f4'
        },
        { 
            name: 'Abu Dhabi Calendar Always On', 
            type: 'Brand Awareness', 
            objectives: { awareness: 5, consideration: 4, intent: 5, familiarity: 5 },
            color: '#4285f4'
        },
        { 
            name: 'F1', 
            type: 'Strategic Leavers', 
            objectives: { awareness: 4, consideration: 2, intent: 3, familiarity: 4 },
            color: '#34a853'
        },
        { 
            name: 'Family Vacation with Ranveer Singh', 
            type: 'Brand Awareness', 
            objectives: { awareness: 5, consideration: 2, intent: 5, familiarity: 5 },
            color: '#4285f4'
        },
        { 
            name: 'Diwali', 
            type: 'Strategic Leavers', 
            objectives: { awareness: 3, consideration: 2, intent: 5, familiarity: 4 },
            color: '#34a853'
        },
        { 
            name: 'Ramadan', 
            type: 'Strategic Leavers', 
            objectives: { awareness: 4, consideration: 4, intent: 4, familiarity: 5 },
            color: '#34a853'
        },
        { 
            name: 'Saadiyat Cultural District', 
            type: 'Culture', 
            objectives: { awareness: 5, consideration: 3, intent: 2, familiarity: 5 },
            color: '#fbbc04'
        },
        { 
            name: 'Abu Dhabi Calendar Launch', 
            type: 'Brand Awareness', 
            objectives: { awareness: 5, consideration: 4, intent: 5, familiarity: 5 },
            color: '#4285f4'
        },
        { 
            name: 'Global Brand Ambassador Q1', 
            type: 'Brand Awareness', 
            objectives: { awareness: 5, consideration: 4, intent: 2, familiarity: 4 },
            color: '#4285f4'
        },
        { 
            name: 'Search Always On', 
            type: 'Brand Awareness', 
            objectives: { awareness: 5, consideration: 4, intent: 5, familiarity: 5 },
            color: '#4285f4'
        },
        { 
            name: 'Global Brand Ambassador Q4', 
            type: 'Brand Awareness', 
            objectives: { awareness: 5, consideration: 4, intent: 2, familiarity: 4 },
            color: '#4285f4'
        },
        { 
            name: 'Comedy Week', 
            type: 'Strategic Leavers', 
            objectives: { awareness: 3, consideration: 3, intent: 5, familiarity: 3 },
            color: '#34a853'
        }
    ];
    
    // Generate colors for each campaign
    const generateColors = (index, type) => {
        // Base colors by campaign type
        const baseColors = {
            'Brand Awareness': [66, 133, 244], // Blue
            'Strategic Leavers': [52, 168, 83],   // Green
            'Culture': [251, 188, 4]     // Yellow
        };
        
        // Get base color for the campaign type
        const baseColor = baseColors[type] || [128, 128, 128]; // Default gray if type not found
        
        // Adjust the color based on index to create variations within the same type
        const r = Math.min(255, baseColor[0] + (index * 10) % 60);
        const g = Math.min(255, baseColor[1] + (index * 7) % 60);
        const b = Math.min(255, baseColor[2] + (index * 5) % 60);
        
        return {
            backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
            borderColor: `rgb(${r}, ${g}, ${b})`,
            pointBackgroundColor: `rgb(${r}, ${g}, ${b})`,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: `rgb(${r}, ${g}, ${b})`
        };
    };
    
    // Prepare datasets for the chart
    const datasets = campaignData.map((campaign, index) => {
        const colors = generateColors(index, campaign.type);
        return {
            label: campaign.name,
            data: [
                campaign.objectives.awareness,
                campaign.objectives.consideration,
                campaign.objectives.intent,
                campaign.objectives.familiarity
            ],
            backgroundColor: colors.backgroundColor,
            borderColor: colors.borderColor,
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: colors.pointBackgroundColor,
            pointBorderColor: colors.pointBorderColor,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: colors.pointHoverBackgroundColor,
            pointHoverBorderColor: colors.pointHoverBorderColor,
            pointHoverBorderWidth: 2
        };
    });
    
    // Create the chart
    try {
        new Chart(objectivesCtx, {
            type: 'radar',
            data: {
                labels: ['Awareness', 'Consideration', 'Intent', 'Familiarity'],
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#e0e0e0',
                            padding: 15,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            font: {
                                size: 11
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Campaign Objectives Comparison (Individual Campaigns)',
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
                                const category = context.chart.data.labels[context.dataIndex];
                                return `${label}: ${category} = ${value}/5`;
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
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        ticks: {
                            color: '#e0e0e0',
                            backdropColor: 'transparent',
                            z: 10,
                            backdropPadding: 3,
                            showLabelBackdrop: true,
                            backdropColor: 'rgba(0, 0, 0, 0.7)',
                            font: {
                                size: 10
                            }
                        },
                        min: 0,
                        max: 5,
                        beginAtZero: true
                    }
                },
                elements: {
                    line: {
                        tension: 0.1
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
        console.log("Campaign Objectives Chart created successfully");
    } catch (error) {
        console.error("Error creating Campaign Objectives Chart:", error);
    }
    
    // Add a legend explaining the dimensions
    addDimensionsLegend();
}

function addDimensionsLegend() {
    // Find the chart container
    const chartContainer = document.querySelector('.objectives-section .chart-container');
    if (!chartContainer) return;
    
    // Create legend container
    const legendContainer = document.createElement('div');
    legendContainer.style.marginTop = '20px';
    legendContainer.style.padding = '15px';
    legendContainer.style.backgroundColor = 'var(--card-bg)';
    legendContainer.style.borderRadius = '8px';
    legendContainer.style.display = 'flex';
    legendContainer.style.flexWrap = 'wrap';
    legendContainer.style.justifyContent = 'center';
    legendContainer.style.gap = '20px';
    
    // Legend items
    const legendItems = [
        { label: 'Awareness', desc: 'Focus on increasing brand recognition and visibility' },
        { label: 'Consideration', desc: 'Efforts to get travelers to evaluate Abu Dhabi as a destination' },
        { label: 'Intent', desc: 'Driving action and booking decisions' },
        { label: 'Familiarity', desc: 'Building deeper knowledge of destination offerings' }
    ];
    
    // Add legend items
    legendItems.forEach(item => {
        const legendItem = document.createElement('div');
        legendItem.style.display = 'flex';
        legendItem.style.alignItems = 'center';
        
        const dot = document.createElement('span');
        dot.style.width = '8px';
        dot.style.height = '8px';
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = '#e0e0e0';
        dot.style.marginRight = '8px';
        legendItem.appendChild(dot);
        
        const text = document.createElement('span');
        text.innerHTML = `<strong style="color:#e0e0e0">${item.label}:</strong> <span style="color:#a0a0a0;font-size:12px">${item.desc}</span>`;
        legendItem.appendChild(text);
        
        legendContainer.appendChild(legendItem);
    });
    
    // Add campaign type legend
    const typeContainer = document.createElement('div');
    typeContainer.style.marginTop = '15px';
    typeContainer.style.width = '100%';
    typeContainer.style.display = 'flex';
    typeContainer.style.justifyContent = 'center';
    typeContainer.style.gap = '25px';
    
    const typeItems = [
        { label: 'Brand Awareness Campaigns', color: '#4285f4' },
        { label: 'Strategic Leavers Campaigns', color: '#34a853' },
        { label: 'Culture Campaigns', color: '#fbbc04' }
    ];
    
    typeItems.forEach(item => {
        const typeItem = document.createElement('div');
        typeItem.style.display = 'flex';
        typeItem.style.alignItems = 'center';
        
        const colorBox = document.createElement('span');
        colorBox.style.width = '12px';
        colorBox.style.height = '12px';
        colorBox.style.backgroundColor = item.color;
        colorBox.style.marginRight = '8px';
        typeItem.appendChild(colorBox);
        
        const label = document.createElement('span');
        label.textContent = item.label;
        label.style.color = '#e0e0e0';
        label.style.fontWeight = '600';
        typeItem.appendChild(label);
        
        typeContainer.appendChild(typeItem);
    });
    
    legendContainer.appendChild(typeContainer);
    
    // Add the legend to the chart container
    chartContainer.appendChild(legendContainer);
}
