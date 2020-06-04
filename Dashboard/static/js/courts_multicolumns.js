d3.json("./static/offense_multi.json").then(function (data) {
    
    console.log(data);
    console.log('=======================');
    
    var courts_name = 
    _.chain(data)
    .groupBy("court_name")
    .map((value, key) => ({"label":key,}))
    .value();
    
    console.log(courts_name);
    console.log('=======================');
    
    var sentence = 
    _.chain(data)
    .groupBy("sentence_type")
    .map((value, key) => ({"label":key,"category": (
      _.chain(value)
      .groupBy("court_name")
      .map((value2, key2) => ({"label":key2,"value": value2.length}))
      .value()
    )}))
    .value();

    console.log(sentence);
    console.log('=======================');

    var offense = 
    _.chain(data)
    .groupBy("court_name")
    .map((value, key) => ({"label":key,"category": (
      _.chain(value)
      .groupBy("offense_category")
      .map((value2, key2) => ({"label":key2,"value": value2.length}))
      .value()
    )}))
    .value();

    console.log(offense);
    console.log('=======================');

    // var value = []
    // age_bins.map(x => {
    //   value.push(x.participants);
    // });

    // var courts_name = []
    // sentence.map(x => {
    //   courts_name.push({"label":x.label});
    // });

    console.log(courts_name);
    console.log('=======================');



    var total_participants = 69954
    var total_sentence = 614466
    var total_offense = 8488

    FusionCharts.ready(function(){
        var chartObj_sentence = new FusionCharts({
            type: ' mscolumn2d',
            renderAt: 'cn_st_multibar',
            width: '900',
            height: '900',
            dataFormat: 'json',
            dataSource: {
              "chart": {
                  "caption": "Sentence Types by Districs",
                  "xAxisname": "Judicial Districs",
                  "yAxisName": "# of Cases by Sentence Types",
                  "plotFillAlpha": "80",
                  "theme": "fusion"
              },
              "categories": [{
                  "category": courts_name
                  }],
              "dataset": [{
                      "seriesname": "Previous Year",
                      "data": [
                          {"value": "10000"},
                          {"value": "11500"},
                          {
                              "value": "12500"
                          },
                          {
                              "value": "15000"
                          }
                      ]
                  },
                  {
                      "seriesname": "Current Year",
                      "data": [
                          {
                              "value": "25400"
                          },
                          {
                              "value": "29800"
                          },
                          {
                              "value": "21800"
                          },
                          {
                              "value": "26800"
                          }
                      ]
                  }
              ],
              "trendlines": [
                  {
                      "line": [
                          {
                              "startvalue": "12250",
                              "color": "#0075c2",
                              "displayvalue": "Previous{br}Average",
                              "valueOnRight": "1",
                              "thickness": "1",
                              "showBelow": "1",
                              "tooltext": "Previous year quarterly target  : $13.5K"
                          },
                          {
                              "startvalue": "25950",
                              "color": "#1aaf5d",
                              "displayvalue": "Current{br}Average",
                              "valueOnRight": "1",
                              "thickness": "1",
                              "showBelow": "1",
                              "tooltext": "Current year quarterly target  : $23K"
                          }
                      ]
                  }
              ]
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