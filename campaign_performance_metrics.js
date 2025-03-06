// Campaign Performance Metrics
document.addEventListener('DOMContentLoaded', function() {
    console.log("Campaign performance metrics script loaded");
    
    // Check if campaignData is available
    if (typeof campaignData === 'undefined') {
        console.error("campaignData is not defined. Make sure enhanced_dashboard_data.js is loaded first.");
        return;
    }
    
    // Create Campaign Performance Chart
    createCampaignPerformanceChart();
    
    // Create Campaign Efficiency Chart
    createCampaignEfficiencyChart();
    
    // Create Campaign Budget Chart
    createCampaignBudgetChart();
    
    // Create Campaign Type Distribution Chart
    createCampaignTypeDistributionChart();
    
    // Create Marketing KPI Spider Charts
    createMarketingKPISpiderCharts();
});

// Create Marketing KPI Spider Charts
function createMarketingKPISpiderCharts() {
    console.log("Creating Marketing KPI Spider Charts");
    
    // Create Strategic Campaigns Radar Chart
    const strategicCtx = document.getElementById('strategicCampaignsRadarChart');
    if (strategicCtx) {
        // Filter strategic campaigns
        const strategicCampaigns = campaignData.campaigns.filter(c => c.type === 'Strategic');
        
        const strategicDatasets = strategicCampaigns.map(campaign => ({
            label: campaign.name,
            data: [
                campaign.objectives.awareness,
                campaign.objectives.consideration,
                campaign.objectives.intent,
                campaign.objectives.familiarity
            ],
            backgroundColor: 'rgba(66, 133, 244, 0.2)',
            borderColor: '#4285f4',
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#4285f4',
            pointBorderColor: '#fff',
            pointHoverRadius: 6
        }));
        
        new Chart(strategicCtx, {
            type: 'radar',
            data: {
                labels: ['Awareness', 'Consideration', 'Intent', 'Familiarity'],
                datasets: strategicDatasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#e0e0e0',
                            padding: 10,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            font: {
                                size: 10
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Strategic Campaigns KPIs',
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
                            showLabelBackdrop: false,
                            font: {
                                size: 10
                            }
                        },
                        min: 0,
                        max: 5,
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Create Tactical Campaigns Radar Chart
    const tacticalCtx = document.getElementById('tacticalCampaignsRadarChart');
    if (tacticalCtx) {
        // Filter tactical campaigns
        const tacticalCampaigns = campaignData.campaigns.filter(c => c.type === 'Tactical');
        
        const tacticalDatasets = tacticalCampaigns.map(campaign => ({
            label: campaign.name,
            data: [
                campaign.objectives.awareness,
                campaign.objectives.consideration,
                campaign.objectives.intent,
                campaign.objectives.familiarity
            ],
            backgroundColor: 'rgba(52, 168, 83, 0.2)',
            borderColor: '#34a853',
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#34a853',
            pointBorderColor: '#fff',
            pointHoverRadius: 6
        }));
        
        new Chart(tacticalCtx, {
            type: 'radar',
            data: {
                labels: ['Awareness', 'Consideration', 'Intent', 'Familiarity'],
                datasets: tacticalDatasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#e0e0e0',
                            padding: 10,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            font: {
                                size: 10
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Tactical Campaigns KPIs',
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
                            showLabelBackdrop: false,
                            font: {
                                size: 10
                            }
                        },
                        min: 0,
                        max: 5,
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Create Culture Campaigns Radar Chart
    const cultureCtx = document.getElementById('cultureCampaignsRadarChart');
    if (cultureCtx) {
        // Filter culture campaigns
        const cultureCampaigns = campaignData.campaigns.filter(c => c.type === 'Culture');
        
        const cultureDatasets = cultureCampaigns.map(campaign => ({
            label: campaign.name,
            data: [
                campaign.objectives.awareness,
                campaign.objectives.consideration,
                campaign.objectives.intent,
                campaign.objectives.familiarity
            ],
            backgroundColor: 'rgba(156, 39, 176, 0.2)',
            borderColor: '#9c27b0',
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#9c27b0',
            pointBorderColor: '#fff',
            pointHoverRadius: 6
        }));
        
        new Chart(cultureCtx, {
            type: 'radar',
            data: {
                labels: ['Awareness', 'Consideration', 'Intent', 'Familiarity'],
                datasets: cultureDatasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#e0e0e0',
                            padding: 10,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            font: {
                                size: 10
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Culture Campaigns KPIs',
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
                            showLabelBackdrop: false,
                            font: {
                                size: 10
                            }
                        },
                        min: 0,
                        max: 5,
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Create Top Campaigns Radar Chart
    const topCampaignsCtx = document.getElementById('topCampaignsRadarChart');
    if (topCampaignsCtx) {
        // Get top 5 campaigns by budget
        const topCampaigns = [...campaignData.campaigns].sort((a, b) => b.budget - a.budget).slice(0, 5);
        
        // Create datasets for top campaigns
        const topCampaignsData = topCampaigns.map((campaign, index) => {
            // Generate a unique color for each campaign
            const colors = [
                { bg: 'rgba(66, 133, 244, 0.2)', border: '#4285f4' },
                { bg: 'rgba(52, 168, 83, 0.2)', border: '#34a853' },
                { bg: 'rgba(251, 188, 4, 0.2)', border: '#fbbc04' },
                { bg: 'rgba(234, 67, 53, 0.2)', border: '#ea4335' },
                { bg: 'rgba(156, 39, 176, 0.2)', border: '#9c27b0' }
            ];
            
            return {
                label: campaign.name,
                data: [
                    campaign.objectives.awareness,
                    campaign.objectives.consideration,
                    campaign.objectives.intent,
                    campaign.objectives.familiarity
                ],
                backgroundColor: colors[index].bg,
                borderColor: colors[index].border,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: colors[index].border,
                pointBorderColor: '#fff',
                pointHoverRadius: 6
            };
        });
        
        new Chart(topCampaignsCtx, {
            type: 'radar',
            data: {
                labels: ['Awareness', 'Consideration', 'Intent', 'Familiarity'],
                datasets: topCampaignsData
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#e0e0e0',
                            padding: 10,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            font: {
                                size: 10
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Top 5 Campaigns by Budget (KPIs)',
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
                            showLabelBackdrop: false,
                            font: {
                                size: 10
                            }
                        },
                        min: 0,
                        max: 5,
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Create Objectives Chart
    const objectivesCtx = document.getElementById('objectivesChart');
    if (objectivesCtx) {
        new Chart(objectivesCtx, {
            type: 'radar',
            data: {
                labels: ['Awareness', 'Consideration', 'Intent', 'Familiarity'],
                datasets: campaignData.campaigns.map((campaign, index) => ({
                    label: campaign.name,
                    data: [
                        campaign.objectives.awareness,
                        campaign.objectives.consideration,
                        campaign.objectives.intent,
                        campaign.objectives.familiarity
                    ],
                    backgroundColor: `rgba(${index * 20 % 255}, ${(index * 30 + 100) % 255}, ${(index * 50 + 50) % 255}, 0.2)`,
                    borderColor: `rgba(${index * 20 % 255}, ${(index * 30 + 100) % 255}, ${(index * 50 + 50) % 255}, 1)`,
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: `rgba(${index * 20 % 255}, ${(index * 30 + 100) % 255}, ${(index * 50 + 50) % 255}, 1)`,
                    pointBorderColor: '#fff',
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: `rgba(${index * 20 % 255}, ${(index * 30 + 100) % 255}, ${(index * 50 + 50) % 255}, 1)`,
                    pointHoverBorderWidth: 2
                }))
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
                        text: 'Campaign Objectives Comparison',
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
    }
}

// Create Campaign Performance Chart
function createCampaignPerformanceChart() {
    // Implementation omitted for brevity
}

// Create Campaign Efficiency Chart
function createCampaignEfficiencyChart() {
    // Implementation omitted for brevity
}

// Create Campaign Budget Chart
function createCampaignBudgetChart() {
    // Implementation omitted for brevity
}

// Create Campaign Type Distribution Chart
function createCampaignTypeDistributionChart() {
    // Implementation omitted for brevity
}
