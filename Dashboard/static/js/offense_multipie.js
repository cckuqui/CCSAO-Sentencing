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

    var data2 = data.filter(p => (p.sentence_type != "Incarceration") | (p.sentence_type != "Probation/Supervision"));
    
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
            renderAt: 'oc_multipie1',
            width: '450',
            height: '1000',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "Product-wise break-up of quarterly revenue in last year",
                    "subcaption": "Harry's SuperMart",
                    "xaxisname": "Quarter",
                    "yaxisname": "Sales (In USD)",
                    "numberPrefix": "$",
                    "numbersuffix": "M",
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
            renderAt: 'oc_multipie2',
            width: '950',
            height: '1000',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "Product-wise break-up of quarterly revenue in last year",
                    "subcaption": "Harry's SuperMart",
                    "xaxisname": "Quarter",
                    "yaxisname": "Sales (In USD)",
                    "numberPrefix": "$",
                    "numbersuffix": "M",
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