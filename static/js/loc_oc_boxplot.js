d3.json("/length_of_case/box").then(function (data) {
  var data = data.filter(n => (n.length_of_case_in_days >= 0) & (n.length_of_case_in_days <= 5000));
  
  console.log(data)

  var traces = 
  _.chain(data)
  .groupBy("offense_category")
  .map((value, key) => (key = {
    name:key,
    // boxpoints:"all",
    type:"box",
    x:value.map(x => {
      return x.length_of_case_in_days;
    })  
  }))
  .value();

  console.log(traces);

  // Create a data array with the above two traces
  var data1 = traces;

  // Use `layout` to define a title
  var layout = {
    title: "Length of cases by Offense Category",
    width: 950,
    height: 1000,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    legend: {orientation: 'h', side: 'top'},
    margin: {
      l:255
    },
    font: {
      color: 'white'
  }
  };

  // Render the plot to the `plot1` div
  Plotly.newPlot("loc_oc_boxplot", data1, layout);
});