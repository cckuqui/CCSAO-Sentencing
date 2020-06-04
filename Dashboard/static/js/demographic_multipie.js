d3.json("./static/participants.json").then(function (data) {
    
    console.log(data);
    console.log('=======================');
        
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
            width: '900',
            height: '900',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "Total Male Participants by Race and Age Group",
                    "subcaption": "2015-2019",
                    "showPlotBorder": "1",
                    "piefillalpha": "80",
                    "pieborderthickness": "2",
                    "hoverfillcolor": "#CCCCCC",
                    "piebordercolor": "#FFFFFF",
                    "plottooltext": "$label, $value individuals, $percentValue",
                    "bgColor": "#202940",
                    //Theme
                    "theme": "fusion"
                },
                "category": [{
                    "label": "Male",
                    "color":"#CCCCCC",
                    "value": total_males,
                    "tooltext": "Total Males, $value, $percentValue",
                    "category": mmulti_level
                }]
            }   
        });

        var chartObj_female = new FusionCharts({
            type: 'multilevelpie',
            renderAt: 'multi_demographics_female',
            width: '900',
            height: '900',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "Total Female Participants by Race and Age Group",
                    "subcaption": "2015-2019",
                    "showPlotBorder": "1",
                    "piefillalpha": "80",
                    "pieborderthickness": "2",
                    "hoverfillcolor": "#CCCCCC",
                    "piebordercolor": "#FFFFFF",
                    "plottooltext": "$label, $value individuals, $percentValue",
                    "bgColor": "#202940",
                    //Theme
                    "theme": "fusion"
                },
                "category": [{
                    "label": "Female",
                    "color": "#CCCCCC",
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