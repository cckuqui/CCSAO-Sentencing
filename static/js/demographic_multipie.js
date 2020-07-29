d3.json("/demographics/data").then(function (data) {

    function compare(a, b) {
        let comparison = 0;
        if (a.age_bins > b.age_bins) {
        comparison = 1;
        } else if (a.age_bins < b.age_bins) {
        comparison = -1;
        }
        return comparison;
    }
    
    data = data.sort(compare);
            
    var female = data.filter(person => person.gender == "Female");
    var male = data.filter(person => person.gender == "Male");
    
    console.log(female);
    console.log(male);
    console.log('=======================');

    var fmulti_level = 
    _.chain(female)
    .groupBy("race")
    .map((value, key) => ({"label":key,"value":value.length,"category": (
    _.chain(value)
    .groupBy("age_bins")
    .map((value2, key2) => ({"label":key2,"value": value2.length}))
    .value()
    )}))
    .value();

    console.log(fmulti_level);

    var mmulti_level = 
    _.chain(male)
    .groupBy("race")
    .map((value, key) => ({"label":key,"value":value.length,"category": (
    _.chain(value)
    .groupBy("age_bins")
    .map((value2, key2) => ({"label":key2,"value": value2.length}))
    .value()
    )}))
    .value();

    console.log(mmulti_level);
    console.log('=======================');

    var total_participants = 69954
    var total_males = 614466
    var total_females = 8488

    FusionCharts.ready(function(){
        var chartObj_male = new FusionCharts({
            type: 'multilevelpie',
            renderAt: 'multi_demographics_male',
            width: '500',
            height: '500',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "Total Males Sentenced by Race and Age Group",
                    "subcaption": "2015-2019",
                    "showPlotBorder": "1",
                    "piefillalpha": "80",
                    "pieborderthickness": "2",
                    // "hoverfillcolor": "#CCCCCC",
                    // "piebordercolor": "#FFFFFF",
                    // "captionFontColor": "#000000",
                    "plottooltext": "$label, $value individuals, $percentValue",
                    "theme": "candy",
                    "bgColor": "#1a2035",
                },
                "category": [{
                    "label": "Male",
                    // "color":"#CCCCCC",
                    "value": total_males,
                    "tooltext": "Total Males, $value, $percentValue",
                    "category": mmulti_level
                }]
            }   
        });

        var chartObj_female = new FusionCharts({
            type: 'multilevelpie',
            renderAt: 'multi_demographics_female',
            width: '500',
            height: '500',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "Total Females Sentenced by Race and Age Group",
                    "subcaption": "2015-2019",
                    "showPlotBorder": "1",
                    "piefillalpha": "80",
                    "pieborderthickness": "2",
                    // "hoverfillcolor": "#CCCCCC",
                    // "piebordercolor": "#FFFFFF",
                    "plottooltext": "$label, $value individuals, $percentValue",
                    "theme": "candy",
                    "bgColor": "#1a2035",
                },
                "category": [{
                    "label": "Female",
                    // "color": "#CCCCCC",
                    "value": total_females,
                    "tooltext": "Total Females, $value, $percentValue",
                    "category": fmulti_level
                }]
            }   
        });

    chartObj_male.render();
    chartObj_female.render();

    });

        

    });
