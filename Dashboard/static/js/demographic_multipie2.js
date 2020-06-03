
console.log("yes it's this file");
console.log("hi");

// d3.json("participants.json").then(function(data) {
//    var total_charges = Object.keys(data).length;
//    console.log(total_charges);
// });

// VARIABLES TO CALCULATE
total_participants = 70000
total_males = 40000
    black_males = 20000
    white_males = 10000
    hispanic_males = 5000
    asian_males = 3500
    unknown_males = 500
    american_indian_males = 500
    biracial_males = 500

total_females = 30000
    black_females = 10000
    white_females = 10000
    hispanic_females = 5000
    asian_females = 3500
    unknown_females = 500
    american_indian_females = 500
    biracial_females = 500


FusionCharts.ready(function(){
    var chartObj = new FusionCharts({
type: 'multilevelpie',
renderAt: 'multi_demographics',

width: '900',
height: '900',
dataFormat: 'json',
dataSource: {
"chart": {
    "caption": "Total Charges by Age, Race and Gender",
    "subcaption": "2000-2019",
    "showPlotBorder": "1",
    "piefillalpha": "80",
    "pieborderthickness": "2",
    "hoverfillcolor": "#CCCCCC",
    "piebordercolor": "#FFFFFF",
    "hoverfillcolor": "#CCCCCC",
    "plottooltext": "$label, $value individuals, $percentValue",
    "bgColor": "#202940",
    //Theme
    "theme": "fusion"
},
"category": [{
    "label": "Total Participants",
    "color": "#ffffff",
    "value": total_participants,
    "category": [{
        "label": "Male",
        "color": "#f8bd19",
        "value": total_males,
        "tooltext": "Total Males, $value, $percentValue",
        "category": [{
            "label": "Black",
            "color": "#f8bd19",
            "value": black_males,
        }, {
            "label": "Hispanic/Latino",
            "color": "#f8bd19",
            "value": hispanic_males,
        }, {
            "label": "White",
            "color": "#f8bd19",
            "value": white_males,
        }, {
            "label": "Asian",
            "color": "#f8bd19",
            "value": asian_males,
        }, {
            "label": "Unknown",
            "color": "#f8bd19",
            "value": unknown_males,
        }, {
            "label": "American Indian",
            "color": "#f8bd19",
            "value": american_indian_males,
        }, {
            "label": "Biracial",
            "color": "#f8bd19",
            "value": biracial_males,
        }]
    }, {
        "label": "Female",
        "color": "#33ccff",
        "value": total_females,
        "tooltext": "Total Females, $value, $percentValue",
        "category": [{
            "label": "Black",
            "color": "#33ccff",
            "value": black_females,
        }, {
            "label": "Hispanic/Latino",
            "color": "#33ccff",
            "value": hispanic_females,
        }, {
            "label": "White",
            "color": "#33ccff",
            "value": white_females,
        }, {
            "label": "Asian",
            "color": "#33ccff",
            "value": asian_females,
        }, {
            "label": "Unknown",
            "color": "#33ccff",
            "value": unknown_females,
        }, {
            "label": "American Indian",
            "color": "#33ccff",
            "value": american_indian_females,
        }, {
            "label": "Biracial",
            "color": "#33ccff",
            "value": biracial_females,
        }]
    }]
}]
}
}
);
    chartObj.render();
});

