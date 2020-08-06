d3.json("/courts/data").then(function (data) {
    
    function compare(a, b) {
        let comparison = 0;
        if (a.court_name > b.court_name) {
          comparison = 1;
        } else if (a.court_name < b.court_name) {
          comparison = -1;
        }
        return comparison;
      }
      
    data = data.sort(compare);

    console.log(data);
    console.log('=======================');
    
    var courts_name = 
    _.chain(data)
    .groupBy("court_name")
    .map((value, key) => ({"label":key,}))
    .value();
    
    // console.log(courts_name);
    // console.log('=======================');
    
    var sentence = 
    _.chain(data)
    .groupBy("sentence_type")
    .map((value, key) => ({"seriesname":key,"data": (
      _.chain(value)
      .groupBy("court_name")
      .map((value2, key2) => ({"value": value2.length}))
      .value()
    )}))
    .value();

    console.log(sentence);
    console.log('=======================');

    var total_participants = 69954
    var total_sentence = 614466
    var total_offense = 8488

    FusionCharts.ready(function(){
        var chartObj_sentence = new FusionCharts({
            type: 'mscolumn2d',
            renderAt: 'cn_st_multibar',
            width: '1000',
            height: '900',
            dataFormat: 'json',
            dataSource: {
              "chart": {
                  "caption": "Sentence Types by Districs",
                  "xAxisname": "Judicial Districs",
                  "yAxisName": "# of Cases by Sentence Types",
                  "plotFillAlpha": "80",
                  "theme": "candy",
                  "bgColor": "#1a2035",
                  "yAxisMaxValue": 23000
              },
              "categories": [{
                  "category": courts_name
                  }],
              "dataset": sentence
          }   
        });

        // var chartObj_offense = new FusionCharts({
        //     type: 'multilevelpie',
        //     renderAt: 'offense_multi',
        //     width: '900',
        //     height: '900',
        //     dataFormat: 'json',
        //     dataSource: {
        //         "chart": {
        //             "caption": "Total Participants by Offense Categories and Court Name",
        //             "subcaption": "2015-2019",
        //             "showPlotBorder": "1",
        //             "piefillalpha": "80",
        //             "pieborderthickness": "2",
        //             "hoverfillcolor": "#CCCCCC",
        //             "piebordercolor": "#FFFFFF",
        //             "plottooltext": "$label, $value individuals, $percentValue",
        //             "bgColor": "#202940",
        //             //Theme
        //             "theme": "fusion"
        //         },
        //         "category": [{
        //             "label": "Offense Categories",
        //             "color": "#CCCCCC",
        //             "value": total_offense,
        //             "tooltext": "Total Females, $value, $percentValue",
        //             "category": offense
        //         }]
        //     }   
        // });

    // chartObj_offense.render();
    chartObj_sentence.render();

    });

});