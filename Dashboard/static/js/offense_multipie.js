d3.json("./static/offense_multi.json").then(function (data) {
    
    console.log(data);
    console.log('=======================');
        
    var offense = 
    _.chain(data)
    .groupBy("offense_category")
    .map((value, key) => ({"label":key,"value":value.length,"category": (
      _.chain(value)
      .groupBy("sentence_type")
      .map((value2, key2) => ({"label":key2,"value": value2.length}))
      .value()
    )}))
    .value();

    console.log(offense);

    // var mmulti_level = 
    // _.chain(male)
    // .groupBy("race")
    // .map((value, key) => ({"label":key,"value":value.length,"category": (
    //   _.chain(value)
    //   .groupBy("age_bins")
    //   .map((value2, key2) => ({"label":key2,"value": value2.length}))
    //   .value()
    // )}))
    // .value();

    // console.log(mmulti_level);
    // console.log('=======================');

    var total_males = 68372
    // var total_females = 8488

    FusionCharts.ready(function(){
        var chartObj = new FusionCharts({
            type: 'multilevelpie',
            renderAt: 'oc_multipie',
            width: '900',
            height: '900',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "Total Participants by Offense Category and Sentence Type",
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
                    "label": "Participants",
                    "color":"#CCCCCC",
                    "value": total_males,
                    "tooltext": "Total Males, $value, $percentValue",
                    "category": offense
                }]
            }   
        });

    chartObj.render();

    });

    

});