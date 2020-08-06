d3.json("/length_of_case/scatter").then(function (data) {
  
  var data = data.filter(n => (n.length_of_case_in_days >= 0) & (n.length_of_case_in_days <= 2000));
  var data = data.filter(n => (n.year <= 100));
  // var data = data.filter(n
  
  // console.log(data)

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
    // x:value.map(x => {
    //   return x.year;
    // }),
    // marker: value.map(x => (
    //   {size: x.length}
    // ))
  }))
  .value();
  
  
  // var length_days = []
  // var years = []
  // length_days = data.map(d => d.length_of_case_in_days);
  // years = data.map(d => d.year);
  // console.log(length_days);
  // console.log(years);

  // var trace1 = {
  //     x: length_days,
  //     y: years,
  //     mode: 'markers',
  //     type: 'scatter'
  //   };
  
  var layout = {
    title: "Frequency of Case Length group by Sentence Type",
    width: 1400,
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