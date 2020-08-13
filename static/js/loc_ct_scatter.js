d3.json("/length_of_case/scatter").then(function (data) {
  
  var data = data.filter(n => (n.length_of_case_in_days >= 0) & (n.length_of_case_in_days <= 1000));
  var data = data.filter(n => (n.year <= 100));

  var traces = 
  _.chain(data)
  .groupBy("sentence_type")
  .map((value, key) => (key = {
    name:key,
    type: 'histogram',
    // mode: 'markers',
    x:value.map(x => {
      return x.length_of_case_in_days;
    }),
  }))
  .value();
  
  var layout = {
    title: "Frequency of Case Length group by Sentence Type",
    width: 950,
    height: 600,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)', 
    barmode: "stack",
    legend: {orientation: 'h', side: 'top'},
    font: {
      color: 'white'
    }};

  var data1 = traces;
    
  Plotly.newPlot("loc_ct_scatter", data1, layout);

});