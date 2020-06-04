d3.json("./static/offense_multi.json").then(function (data) {
    
    var data1 = data.filter(p => (p.sentence_type == "Incarceration") | (p.sentence_type == "Probation/Supervision"));
    
    var sentences1 = 
    _.chain(data1)
    .groupBy("sentence_type")
    .map((value, key) => ({"label":key}))
    .value();
    
    var off_sentence1 = 
    _.chain(data1)
    .groupBy("offense_category")
    .map((value, key) => ({"seriesname":key,"data": (
      _.chain(value)
      .groupBy("sentence_type")
      .map((value2, key2) => ({"value": value2.length}))
      .value()
    )}))
    .value();

    var data2 = data.filter(p => (p.sentence_type == "Conditional Discharge") | 
        (p.sentence_type == "Death") |
        (p.sentence_type == "Cook County Boot Camp") |
        (p.sentence_type == "Inpatient Mental Health Services"));
    
    var sentences2 = 
    _.chain(data2)
    .groupBy("sentence_type")
    .map((value, key) => ({"label":key}))
    .value();
    
    var off_sentence2 = 
    _.chain(data2)
    .groupBy("offense_category")
    .map((value, key) => ({"seriesname":key,"data": (
      _.chain(value)
      .groupBy("sentence_type")
      .map((value2, key2) => ({"value": value2.length}))
      .value()
    )}))
    .value();

    FusionCharts.ready(function(){
        var chartObj1 = new FusionCharts({
            type: 'msstackedcolumn2d',
            renderAt: 'oc_multicolumn1',
            width: '600',
            height: '1000',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "Offense Category charges by Sentence Type",
                    "subcaption": "Incarceration and Probation/Supervision",
                    "xaxisname": "Sentence Types",
                    "yaxisname": "Offense Category (number of charges)",
                    // "numberPrefix": "$",
                    // "numbersuffix": "M",
                    "bgColor": "#1a2035",
                    "theme": "candy"
                },
                "categories": [
                    {
                        "category": sentences1
                    }
                ],
                "dataset": [
                    {
                        "dataset": off_sentence1
                    }
                ]
            }  
        });

        var chartObj2 = new FusionCharts({
            type: 'msstackedcolumn2d',
            renderAt: 'oc_multicolumn2',
            width: '600',
            height: '1000',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "Offense Category charges by Sentence Type",
                    "subcaption": "Other Sentence types",
                    "xaxisname": "Sentence Types",
                    "yaxisname": "Offense Category (number of charges)",
                    // "numberPrefix": "$",
                    // "numbersuffix": "M",
                    "bgColor": "#1a2035",
                    "theme": "candy"
                },
                "categories": [
                    {
                        "category": sentences2
                    }
                ],
                "dataset": [
                    {
                        "dataset": off_sentence2
                    }
                ]
            }  
        });


    chartObj1.render();
    chartObj2.render();

    });

    

});