// Enhanced objectivesByTypeChart implementation with best UI practices
// This script enhances the existing chart implementation with better UI and accessibility

document.addEventListener('DOMContentLoaded', function() {
    // Wait for a short delay to ensure the inline script has run first
    setTimeout(function() {
        try {
            console.log('Initializing enhanced objectivesByTypeChart...');
            
            // Find the chart containers
            const strategicChart = document.getElementById('strategicObjectivesChart');
            const tacticalChart = document.getElementById('tacticalObjectivesChart');
            const cultureChart = document.getElementById('cultureObjectivesChart');
            
            if (!strategicChart || !tacticalChart || !cultureChart) {
                console.log('Charts not found, original script may not have run yet');
                return;
            }
            
            // Define chart colors with consistent branding
            const chartColors = {
                strategic: {
                    primary: '#4285f4',
                    secondary: 'rgba(66, 133, 244, 0.2)'
                },
                tactical: {
                    primary: '#34a853',
                    secondary: 'rgba(52, 168, 83, 0.2)'
                },
                culture: {
                    primary: '#fbbc04',
                    secondary: 'rgba(251, 188, 4, 0.2)'
                }
            };
            
            // Add custom styles for enhanced UI
            const styleElement = document.createElement('style');
            styleElement.textContent = `
                .chart-container {
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    margin-bottom: 20px;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                
                .chart-container:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
                }
                
                .chart-title {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 15px;
                    text-align: center;
                }
                
                .strategic-title { color: #4285f4; }
                .tactical-title { color: #34a853; }
                .culture-title { color: #fbbc04; }
                
                .chart-description {
                    font-size: 13px;
                    color: #666;
                    margin-bottom: 15px;
                    text-align: center;
                }
            `;
            
            document.head.appendChild(styleElement);
            
            // Enhance the strategic chart container
            const strategicContainer = strategicChart.parentNode;
            strategicContainer.className = 'chart-container';
            strategicContainer.style.borderTop = '4px solid ' + chartColors.strategic.primary;
            
            // Add title and description
            const strategicTitle = document.createElement('div');
            strategicTitle.className = 'chart-title strategic-title';
            strategicTitle.textContent = 'Strategic Campaigns';
            strategicContainer.insertBefore(strategicTitle, strategicChart);
            
            const strategicDesc = document.createElement('div');
            strategicDesc.className = 'chart-description';
            strategicDesc.textContent = "Strategic campaigns focus on long-term brand building with high awareness and familiarity objectives.";
            strategicContainer.insertBefore(strategicDesc, strategicChart);
            
            // Enhance the tactical chart container
            const tacticalContainer = tacticalChart.parentNode;
            tacticalContainer.className = 'chart-container';
            tacticalContainer.style.borderTop = '4px solid ' + chartColors.tactical.primary;
            
            // Add title and description
            const tacticalTitle = document.createElement('div');
            tacticalTitle.className = 'chart-title tactical-title';
            tacticalTitle.textContent = 'Tactical Campaigns';
            tacticalContainer.insertBefore(tacticalTitle, tacticalChart);
            
            const tacticalDesc = document.createElement('div');
            tacticalDesc.className = 'chart-description';
            tacticalDesc.textContent = "Tactical campaigns drive immediate action with strong intent objectives.";
            tacticalContainer.insertBefore(tacticalDesc, tacticalChart);
            
            // Enhance the culture chart container
            const cultureContainer = cultureChart.parentNode;
            cultureContainer.className = 'chart-container';
            cultureContainer.style.borderTop = '4px solid ' + chartColors.culture.primary;
            
            // Add title and description
            const cultureTitle = document.createElement('div');
            cultureTitle.className = 'chart-title culture-title';
            cultureTitle.textContent = 'Culture Campaigns';
            cultureContainer.insertBefore(cultureTitle, cultureChart);
            
            const cultureDesc = document.createElement('div');
            cultureDesc.className = 'chart-description';
            cultureDesc.textContent = "Culture campaigns highlight Abu Dhabi's cultural attractions, with a strong focus on awareness and familiarity.";
            cultureContainer.insertBefore(cultureDesc, cultureChart);
            
            // Add a section title
            const chartsContainer = strategicContainer.parentNode;
            const sectionTitle = document.createElement('div');
            sectionTitle.style.textAlign = 'center';
            sectionTitle.style.marginBottom = '25px';
            sectionTitle.innerHTML = `
                <h3 style="color: #333; font-size: 18px; margin-bottom: 8px;">Campaign Objectives by Type</h3>
                <p style="color: #666; font-size: 14px; max-width: 700px; margin: 0 auto;">
                    These radar charts show the focus areas for each campaign type, highlighting the balance between awareness, consideration, intent, and familiarity objectives.
                </p>
            `;
            chartsContainer.insertBefore(sectionTitle, chartsContainer.firstChild);
            
            // Add a legend
            const legendContainer = document.createElement('div');
            legendContainer.style.display = 'flex';
            legendContainer.style.justifyContent = 'center';
            legendContainer.style.flexWrap = 'wrap';
            legendContainer.style.gap = '20px';
            legendContainer.style.marginTop = '15px';
            legendContainer.style.backgroundColor = 'white';
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
                colorDot.style.backgroundColor = '#333';
                colorDot.style.marginRight = '8px';
                
                const dimensionText = document.createElement('div');
                dimensionText.style.fontSize = '12px';
                
                const dimensionName = document.createElement('span');
                dimensionName.textContent = dim.name;
                dimensionName.style.fontWeight = '600';
                dimensionName.style.color = '#333';
                dimensionName.style.marginRight = '5px';
                
                const dimensionDesc = document.createElement('span');
                dimensionDesc.textContent = dim.description;
                dimensionDesc.style.color = '#666';
                dimensionDesc.style.fontSize = '11px';
                
                dimensionText.appendChild(dimensionName);
                dimensionText.appendChild(document.createTextNode(': '));
                dimensionText.appendChild(dimensionDesc);
                
                dimensionElement.appendChild(colorDot);
                dimensionElement.appendChild(dimensionText);
                
                legendContainer.appendChild(dimensionElement);
            });
            
            chartsContainer.appendChild(legendContainer);
            
            // Update chart colors
            if (strategicChart.chart) {
                strategicChart.chart.data.datasets[0].backgroundColor = chartColors.strategic.secondary;
                strategicChart.chart.data.datasets[0].borderColor = chartColors.strategic.primary;
                strategicChart.chart.data.datasets[0].pointBackgroundColor = chartColors.strategic.primary;
                strategicChart.chart.update();
            }
            
            if (tacticalChart.chart) {
                tacticalChart.chart.data.datasets[0].backgroundColor = chartColors.tactical.secondary;
                tacticalChart.chart.data.datasets[0].borderColor = chartColors.tactical.primary;
                tacticalChart.chart.data.datasets[0].pointBackgroundColor = chartColors.tactical.primary;
                tacticalChart.chart.update();
            }
            
            if (cultureChart.chart) {
                cultureChart.chart.data.datasets[0].backgroundColor = chartColors.culture.secondary;
                cultureChart.chart.data.datasets[0].borderColor = chartColors.culture.primary;
                cultureChart.chart.data.datasets[0].pointBackgroundColor = chartColors.culture.primary;
                cultureChart.chart.update();
            }
            
            console.log('Enhanced objectives by type charts created successfully');
            
        } catch (error) {
            console.error('Error in objectivesByTypeChartUpdate.js:', error);
        }
    }, 1500);
});
