d3.json("./static/offense_multi.json").then(function (data) {
    
    console.log(data);
    console.log('=======================');
        
    var sentence = 
    _.chain(data)
    .groupBy("court_name")
    .map((value, key) => ({"label":key,"value":value.length,"category": (
      _.chain(value)
      .groupBy("sentece_type")
      .map((value2, key2) => ({"label":key2,"value": value2.length}))
      .value()
    )}))
    .value();

    console.log(sentence);

    var offense = 
    _.chain(data)
    .groupBy("court_name")
    .map((value, key) => ({"label":key,"value":value.length,"category": (
      _.chain(value)
      .groupBy("offense_category")
      .map((value2, key2) => ({"label":key2,"value": value2.length}))
      .value()
    )}))
    .value();

    console.log(offense);
    console.log('=======================');

    var total_participants = 69954
    var total_sentence = 614466
    var total_offense = 8488

    FusionCharts.ready(function(){
        var chartObj_sentence = new FusionCharts({
            type: 'multilevelpie',
            renderAt: 'sentence_multi',
            width: '900',
            height: '900',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "Total Participants by Sentence Type and Court Name",
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
                    "value": total_sentence,
                    "tooltext": "Total Males, $value, $percentValue",
                    "category": sentence
                }]
            }   
        });

        var chartObj_offense = new FusionCharts({
            type: 'multilevelpie',
            renderAt: 'offense_multi',
            width: '900',
            height: '900',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "Total Participants by Offense Categories and Court Name",
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
                    "label": "Offense Categories",
                    "color": "#CCCCCC",
                    "value": total_offense,
                    "tooltext": "Total Females, $value, $percentValue",
                    "category": offense
                }]
            }   
        });

    chartObj_offense.render();
    chartObj_sentence.render();

    });

});