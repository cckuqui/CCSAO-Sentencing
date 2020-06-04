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
                    "caption": "Product-wise break-up of quarterly revenue in last year",
                    "subcaption": "Harry's SuperMart",
                    "xaxisname": "Quarter",
                    "yaxisname": "Sales (In USD)",
                    "numberPrefix": "$",
                    "numbersuffix": "M",
                    "theme": "fusion"
                },
                "categories": [{
                    "category": [{
                        "label": "Q1"
                        },{
                        "label": "Q2"
                        },{
                        "label": "Q3"
                        },{
                        "label": "Q4"
                        }]
                    }
                ],
                "dataset": [
                    {
                        "dataset": [
                            {
                                "seriesname": "Processed Food",
                                "data": [
                                    {
                                        "value": "30"
                                    },
                                    {
                                        "value": "26"
                                    },
                                    {
                                        "value": "29"
                                    },
                                    {
                                        "value": "31"
                                    }
                                ]
                            },
                            {
                                "seriesname": "Un-Processed Food",
                                "data": [
                                    {
                                        "value": "21"
                                    },
                                    {
                                        "value": "28"
                                    },
                                    {
                                        "value": "39"
                                    },
                                    {
                                        "value": "41"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "dataset": [
                            {
                                "seriesname": "Electronics",
                                "data": [
                                    {
                                        "value": "27"
                                    },
                                    {
                                        "value": "25"
                                    },
                                    {
                                        "value": "28"
                                    },
                                    {
                                        "value": "26"
                                    }
                                ]
                            },
                            {
                                "seriesname": "Apparels",
                                "data": [
                                    {
                                        "value": "17"
                                    },
                                    {
                                        "value": "15"
                                    },
                                    {
                                        "value": "18"
                                    },
                                    {
                                        "value": "16"
                                    }
                                ]
                            },
                            {
                                "seriesname": "Others",
                                "data": [
                                    {
                                        "value": "12"
                                    },
                                    {
                                        "value": "17"
                                    },
                                    {
                                        "value": "16"
                                    },
                                    {
                                        "value": "15"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }  
        });

    chartObj.render();

    });

    

});