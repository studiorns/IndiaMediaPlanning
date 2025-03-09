// Enhanced Dashboard Data for India Campaign Planning
const campaignData = {
    // Campaign details
    campaigns: [
        { 
            name: 'Global Brand Ambassador Q1', 
            type: 'Brand Awareness', 
            category: 'brand-awareness',
            budget: 346457, 
            impressions: 215895343,
            engagements: 76085066,
            cpm: 1.60,
            cts: 0.18,
            objectives: { awareness: 5, consideration: 4, intent: 2, familiarity: 4 },
            barrierFocus: { badExperiences: 2, alreadyVisited: 0, weatherConcerns: 0, tooExpensive: 0, notMuchToDo: 3 }
        },
        { 
            name: 'Global Brand Ambassador Q4', 
            type: 'Brand Awareness', 
            category: 'brand-awareness',
            budget: 1300910, 
            impressions: 910459081,
            engagements: 219229174,
            cpm: 1.43,
            cts: 0.50,
            objectives: { awareness: 5, consideration: 4, intent: 2, familiarity: 4 },
            barrierFocus: { badExperiences: 2, alreadyVisited: 0, weatherConcerns: 0, tooExpensive: 0, notMuchToDo: 3 }
        },
        { 
            name: 'Summer', 
            type: 'Brand Awareness', 
            category: 'brand-awareness',
            budget: 2270012, 
            impressions: 3359323522,
            engagements: 382892889,
            cpm: 0.68,
            cts: 0.14,
            objectives: { awareness: 5, consideration: 5, intent: 4, familiarity: 5 },
            barrierFocus: { badExperiences: 1, alreadyVisited: 0, weatherConcerns: 5, tooExpensive: 3, notMuchToDo: 4 }
        },
        { 
            name: 'Abu Dhabi Calendar Launch', 
            type: 'Brand Awareness', 
            category: 'brand-awareness',
            budget: 805099, 
            impressions: 2219075038,
            engagements: 354414755,
            cpm: 0.36,
            cts: 0.25,
            objectives: { awareness: 5, consideration: 4, intent: 5, familiarity: 5 },
            barrierFocus: { badExperiences: 0, alreadyVisited: 2, weatherConcerns: 0, tooExpensive: 0, notMuchToDo: 5 }
        },
        { 
            name: 'Saadiyat Cultural District', 
            type: 'Culture', 
            category: 'culture',
            budget: 438552, 
            impressions: 483553385,
            engagements: 69231433,
            cpm: 0.91,
            cts: 0.07,
            objectives: { awareness: 5, consideration: 3, intent: 2, familiarity: 5 },
            barrierFocus: { badExperiences: 0, alreadyVisited: 4, weatherConcerns: 0, tooExpensive: 0, notMuchToDo: 5 }
        },
        { 
            name: 'Ramadan', 
            type: 'Strategic Leavers', 
            category: 'strategic-leavers',
            budget: 542464, 
            impressions: 150409678,
            engagements: 31927423,
            cpm: 3.61,
            cts: 0.30,
            objectives: { awareness: 4, consideration: 4, intent: 4, familiarity: 5 },
            barrierFocus: { badExperiences: 0, alreadyVisited: 3, weatherConcerns: 0, tooExpensive: 4, notMuchToDo: 0 }
        },
        { 
            name: 'Diwali', 
            type: 'Strategic Leavers', 
            category: 'strategic-leavers',
            budget: 408785, 
            impressions: 789795506,
            engagements: 73580846,
            cpm: 0.52,
            cts: 0.11,
            objectives: { awareness: 3, consideration: 2, intent: 5, familiarity: 4 },
            barrierFocus: { badExperiences: 0, alreadyVisited: 5, weatherConcerns: 0, tooExpensive: 3, notMuchToDo: 0 }
        },
        { 
            name: 'Family Vacation with Ranveer Singh', 
            type: 'Brand Awareness', 
            category: 'brand-awareness',
            budget: 877197, 
            impressions: 2099968752,
            engagements: 140187698,
            cpm: 0.42,
            cts: 0.13,
            objectives: { awareness: 5, consideration: 2, intent: 5, familiarity: 5 },
            barrierFocus: { badExperiences: 4, alreadyVisited: 0, weatherConcerns: 2, tooExpensive: 3, notMuchToDo: 4 }
        },
        { 
            name: 'F1', 
            type: 'Strategic Leavers', 
            category: 'strategic-leavers',
            budget: 153678, 
            impressions: 869162940,
            engagements: 197013704,
            cpm: 0.18,
            cts: 0.03,
            objectives: { awareness: 4, consideration: 2, intent: 3, familiarity: 4 },
            barrierFocus: { badExperiences: 0, alreadyVisited: 0, weatherConcerns: 0, tooExpensive: 0, notMuchToDo: 5 }
        },
        { 
            name: 'Abu Dhabi Calendar Always On', 
            type: 'Brand Awareness', 
            category: 'brand-awareness',
            budget: 547514, 
            impressions: 1509099039,
            engagements: 241022478,
            cpm: 0.36,
            cts: 0.25,
            objectives: { awareness: 5, consideration: 4, intent: 5, familiarity: 5 },
            barrierFocus: { badExperiences: 0, alreadyVisited: 0, weatherConcerns: 0, tooExpensive: 0, notMuchToDo: 5 }
        },
        { 
            name: 'Visit Abu Dhabi Always On', 
            type: 'Brand Awareness', 
            category: 'brand-awareness',
            budget: 420514, 
            impressions: 1776916099,
            engagements: 422831167,
            cpm: 0.24,
            cts: 1.00,
            objectives: { awareness: 5, consideration: 4, intent: 5, familiarity: 5 },
            barrierFocus: { badExperiences: 2, alreadyVisited: 3, weatherConcerns: 2, tooExpensive: 3, notMuchToDo: 4 }
        },
        { 
            name: 'NBA', 
            type: 'Strategic Leavers', 
            category: 'strategic-leavers',
            budget: 115270, 
            impressions: 317715044,
            engagements: 50743169,
            cpm: 0.36,
            cts: 0.00,
            objectives: { awareness: 3, consideration: 3, intent: 5, familiarity: 3 },
            barrierFocus: { badExperiences: 0, alreadyVisited: 0, weatherConcerns: 0, tooExpensive: 0, notMuchToDo: 5 }
        },
        { 
            name: 'Comedy Week', 
            type: 'Strategic Leavers', 
            category: 'strategic-leavers',
            budget: 186668, 
            impressions: 514508691,
            engagements: 82173639,
            cpm: 0.36,
            cts: 0.25,
            objectives: { awareness: 3, consideration: 3, intent: 5, familiarity: 3 },
            barrierFocus: { badExperiences: 0, alreadyVisited: 0, weatherConcerns: 0, tooExpensive: 0, notMuchToDo: 5 }
        },
        { 
            name: 'Search Always On', 
            type: 'Brand Awareness', 
            category: 'brand-awareness',
            budget: 277449, 
            impressions: 423208526,
            engagements: 18671714,
            cpm: 0.66,
            cts: 0.37,
            objectives: { awareness: 5, consideration: 4, intent: 5, familiarity: 5 },
            barrierFocus: { badExperiences: 1, alreadyVisited: 1, weatherConcerns: 1, tooExpensive: 1, notMuchToDo: 2 }
        }
    ],
    
    // Campaign calendar data - Updated for mid-March 2025
    campaignCalendar: [
        { 
            name: 'Global Brand Ambassador Q1', 
            category: 'brand-awareness',
            months: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            percentages: [45, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            status: ['past', 'past', '', '', '', '', '', '', '', '', '', '']
        },
        { 
            name: 'Global Brand Ambassador Q4', 
            category: 'brand-awareness',
            months: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            percentages: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 32],
            status: ['', '', '', '', '', '', '', '', '', '', '', '']
        },
        { 
            name: 'Summer', 
            category: 'brand-awareness',
            months: [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
            percentages: [0, 0, 0, 27, 21.3, 15, 17.3, 18, 0, 0, 0, 0],
            status: ['', '', '', '', '', '', '', '', '', '', '', '']
        },
        { 
            name: 'Abu Dhabi Calendar Launch', 
            category: 'brand-awareness',
            months: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            percentages: [0, 0, 0, 0, 0, 0, 0, 0, 50.8, 42.6, 21, 12],
            status: ['', '', '', '', '', '', '', '', '', '', '', '']
        },
        { 
            name: 'Saadiyat Cultural District', 
            category: 'culture',
            months: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            percentages: [0, 0, 4.4, 9, 8.5, 10, 8.1, 8.4, 14.5, 19.9, 14.7, 11.2],
            status: ['', '', 'current', '', '', '', '', '', '', '', '', '']
        },
        { 
            name: 'Ramadan', 
            category: 'strategic-leavers',
            months: [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            percentages: [0, 40, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            status: ['', 'past', 'current', '', '', '', '', '', '', '', '', '']
        },
        { 
            name: 'Diwali', 
            category: 'strategic-leavers',
            months: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
            percentages: [0, 0, 0, 0, 0, 0, 0, 0, 58, 42, 0, 0],
            status: ['', '', '', '', '', '', '', '', '', '', '', '']
        },
        { 
            name: 'Family Vacation with Ranveer Singh', 
            category: 'brand-awareness',
            months: [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            percentages: [0, 15, 30.8, 25.2, 23.8, 0, 0, 0, 0, 0, 0, 0],
            status: ['', 'past', 'current', '', '', '', '', '', '', '', '', '']
        },
        { 
            name: 'F1', 
            category: 'strategic-leavers',
            months: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            percentages: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 80],
            status: ['', '', '', '', '', '', '', '', '', '', '', '']
        },
        { 
            name: 'Abu Dhabi Calendar Always On', 
            category: 'brand-awareness',
            months: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            percentages: [0, 13, 14.3, 6.3, 6.0, 7, 8.1, 8.4, 10.2, 17, 12.6, 9.6],
            status: ['', 'past', 'current', '', '', '', '', '', '', '', '', '']
        },
        { 
            name: 'Visit Abu Dhabi Always On', 
            category: 'brand-awareness',
            months: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            percentages: [4, 10, 11, 6.3, 6.0, 7, 8.1, 8.4, 10.2, 17, 12.6, 9.6],
            status: ['past', 'past', 'current', '', '', '', '', '', '', '', '', '']
        },
        { 
            name: 'NBA', 
            category: 'strategic-leavers',
            months: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            percentages: [0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0],
            status: ['', '', '', '', '', '', '', '', '', '', '', '']
        },
        { 
            name: 'Comedy Week', 
            category: 'strategic-leavers',
            months: [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            percentages: [0, 0, 0, 22.5, 51, 15, 0, 0, 0, 0, 0, 0],
            status: ['', '', '', '', '', '', '', '', '', '', '', '']
        },
        { 
            name: 'Search Always On', 
            category: 'brand-awareness',
            months: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            percentages: [0, 0, 9.9, 7.2, 6.8, 8, 9.2, 9.6, 11.6, 18.5, 12.6, 16],
            status: ['', '', 'current', '', '', '', '', '', '', '', '', '']
        }
    ],
    
    // Monthly distribution data
    monthlyDistribution: {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        impressions: [
            308059995, 834140150, 1031750574, 2052809431, 2064921296, 
            865852843, 774169937, 774169937, 1377372477, 1961987179, 
            1491941387, 2101915441
        ],
        optimizedImpressions: [
            385074994, 542191098, 1031750574, 1744888016, 1651937037, 
            865852843, 890295428, 929003924, 1900774018, 2648682692, 
            1491941387, 1576436581
        ]
    },
    
    // Brand health metrics
    brandHealth: {
        awareness: 94.5,
        consideration: 74.36,
        intent: 64.6,
        intentConsiderationRatio: 0.87
    },
    
    // Barriers to visitation
    barriers: [
        { name: 'Bad Experiences', percentage: 55, change: 15, key: 'badExperiences' },
        { name: 'Already Visited', percentage: 35, change: -12, key: 'alreadyVisited' },
        { name: 'Weather Concerns', percentage: 32, change: -6, key: 'weatherConcerns' },
        { name: 'Too Expensive', percentage: 28, change: -17, key: 'tooExpensive' },
        { name: 'Not Much to Do', percentage: 24, change: 3, key: 'notMuchToDo' }
    ],
    
    // Seasonality data
    seasonality: {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        hotelGuests: [26842, 25715, 30133, 26636, 32950, 25710, 22137, 17221, 26383, 36480, 43636, 43813]
    },
    
    // Media elasticity data
    mediaElasticity: {
        value: 0.68,
        calculation: "The media elasticity of 0.68 was calculated using log-log regression analysis on historical data. This measures the percentage change in travel queries resulting from a 1% change in media investment (impressions)."
    }
};
