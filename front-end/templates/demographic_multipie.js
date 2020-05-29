d3.json("../static/css/assets/js/general_demographics.json").then(function(data) {
    console.log(data);
});
// d3.json("general_demographics.json").then(function(data) {
//    var total_charges = Object.keys(data).length;
//    console.log(total_charges);
// });
// FusionCharts.ready(function(){
//     var chartObj = new FusionCharts({
// type: 'multilevelpie',
// renderAt: 'multi_demographics',

// width: '900',
// height: '900',
// dataFormat: 'json',
// dataSource: {
// "chart": {
//     "caption": "Total Charges by Age, Race and Gender",
//     "subcaption": "2000-2019",
//     "showPlotBorder": "1",
//     "piefillalpha": "80",
//     "pieborderthickness": "2",
//     "hoverfillcolor": "#CCCCCC",
//     "piebordercolor": "#FFFFFF",
//     "hoverfillcolor": "#CCCCCC",
//     "plottooltext": "$label, $$valueK, $percentValue",
//     "bgColor": "#202940",
//     //Theme
//     "theme": "fusion"
// },
// "category": [{
//     "label": "Total Charges",
//     "color": "#ffffff",
//     "value": "150",
//     "category": [{
//         "label": "Male",
//         "color": "#f8bd19",
//         "value": "55.5",
//         "tooltext": "Total Males, $$valueK, $percentValue",
//         "category": [{
//             "label": "Black",
//             "color": "#f8bd19",
//             "value": "11.1",
//             "category": [{
//                 "label": "18-25",
//                 "color": "#f8bd19",
//                 "value": "11.1"
//             }, {
//                 "label": "26-30",
//                 "color": "#f8bd19",
//                 "value": "11.1"

//             }, {
//                 "label": "31-35",
//                 "color": "#f8bd19",
//                 "value": "11.1"
//             }, {
//                 "label": "36-40",
//                 "color": "#f8bd19",
//                 "value": "11.1"
//             }, {
//                 "label": ">41",
//                 "color": "#f8bd19",
//                 "value": "11.1"
//             }]
//         }, {
//             "label": "White",
//             "color": "#f8bd19",
//             "value": "27.75",
//             "category": [{
//                 "label": "18-25",
//                 "color": "#f8bd19",
//                 "value": "11.1"
//             }, {
//                 "label": "26-30",
//                 "color": "#f8bd19",
//                 "value": "11.1"

//             }, {
//                 "label": "31-35",
//                 "color": "#f8bd19",
//                 "value": "11.1"
//             }, {
//                 "label": "36-40",
//                 "color": "#f8bd19",
//                 "value": "11.1"
//             }, {
//                 "label": ">41",
//                 "color": "#f8bd19",
//                 "value": "11.1"
//             }]
//         }, {
//             "label": "Hispanic",
//             "color": "#f8bd19",
//             "value": "9.99",
//             "category": [{
//                 "label": "18-25",
//                 "color": "#f8bd19",
//                 "value": "11.1"
//             }, {
//                 "label": "26-30",
//                 "color": "#f8bd19",
//                 "value": "11.1"

//             }, {
//                 "label": "31-35",
//                 "color": "#f8bd19",
//                 "value": "11.1"
//             }, {
//                 "label": "36-40",
//                 "color": "#f8bd19",
//                 "value": "11.1"
//             }, {
//                 "label": ">41",
//                 "color": "#f8bd19",
//                 "value": "11.1"
//             }]
//         }, {
//             "label": "Other",
//             "color": "#f8bd19",
//             "value": "6.66",
//             "category": [{
//                 "label": "18-25",
//                 "color": "#f8bd19",
//                 "value": "11.1"
//             }, {
//                 "label": "26-30",
//                 "color": "#f8bd19",
//                 "value": "11.1"

//             }, {
//                 "label": "31-35",
//                 "color": "#f8bd19",
//                 "value": "11.1"
//             }, {
//                 "label": "36-40",
//                 "color": "#f8bd19",
//                 "value": "11.1"
//             }, {
//                 "label": ">41",
//                 "color": "#f8bd19",
//                 "value": "11.1"
//             }]
//         }]
//     }, {
//         "label": "Female",
//         "color": "#33ccff",
//         "value": "42",
//         "tooltext": "Total Females, $$valueK, $percentValue",
//         "category": [{
//             "label": "Black",
//             "color": "#33ccff",
//             "value": "10.08",
//             "category": [{
//                 "label": "18-25",
//                 "color": "#33ccff",
//                 "value": "11.1"
//             }, {
//                 "label": "26-30",
//                 "color": "#33ccff",
//                 "value": "11.1"

//             }, {
//                 "label": "31-35",
//                 "color": "#33ccff",
//                 "value": "11.1"
//             }, {
//                 "label": "36-40",
//                 "color": "#33ccff",
//                 "value": "11.1"
//             }, {
//                 "label": ">41",
//                 "color": "#33ccff",
//                 "value": "11.1"
//             }]
//         }, {
//             "label": "White",
//             "color": "#33ccff",
//             "value": "18.9",
//             "category": [{
//                 "label": "18-25",
//                 "color": "#33ccff",
//                 "value": "11.1"
//             }, {
//                 "label": "26-30",
//                 "color": "#33ccff",
//                 "value": "11.1"

//             }, {
//                 "label": "31-35",
//                 "color": "#33ccff",
//                 "value": "11.1"
//             }, {
//                 "label": "36-40",
//                 "color": "#33ccff",
//                 "value": "11.1"
//             }, {
//                 "label": ">41",
//                 "color": "#33ccff",
//                 "value": "11.1"
//             }]
//         }, {
//             "label": "Hispanic",
//             "color": "#33ccff",
//             "value": "6.3",
//             "category": [{
//                 "label": "18-25",
//                 "color": "#33ccff",
//                 "value": "11.1"
//             }, {
//                 "label": "26-30",
//                 "color": "#33ccff",
//                 "value": "11.1"

//             }, {
//                 "label": "31-35",
//                 "color": "#33ccff",
//                 "value": "11.1"
//             }, {
//                 "label": "36-40",
//                 "color": "#33ccff",
//                 "value": "11.1"
//             }, {
//                 "label": ">41",
//                 "color": "#33ccff",
//                 "value": "11.1"
//             }]
//         }, {
//             "label": "Other",
//             "color": "#33ccff",
//             "value": "6.72",
//             "category": [{
//                 "label": "18-25",
//                 "color": "#33ccff",
//                 "value": "11.1"
//             }, {
//                 "label": "26-30",
//                 "color": "#33ccff",
//                 "value": "11.1"

//             }, {
//                 "label": "31-35",
//                 "color": "#33ccff",
//                 "value": "11.1"
//             }, {
//                 "label": "36-40",
//                 "color": "#33ccff",
//                 "value": "11.1"
//             }, {
//                 "label": ">41",
//                 "color": "#33ccff",
//                 "value": "11.1"
//             }]
//         }]
//     }]
// }]
// }
// }
// );
//     chartObj.render();
// });

