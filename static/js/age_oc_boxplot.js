d3.json("/offense_category/box").then(function (data) {
    // ADJUST THIS LINE ONCE THE QUERY IS WRITTEN
    var data = data.filter(n => (n.age_at_incident >= 0) & (n.age_at_incident <= 80));
    
    console.log(data)
  
    var traces = 
    _.chain(data)
    .groupBy("offense_category")
    .map((value, key) => (key = {
      name:key,
      // boxpoints:"all",
      type:"box",
      x:value.map(x => {
        return x.age_at_incident;
      })  
    }))
    .value();
  
    console.log(traces);
  
    // Create a data array with the above two traces
    var data1 = traces;
  
    // Use `layout` to define a title
    var layout = {
      title: "Age at Incident by Offense Category",
      width: 1300,
      height: 1000,
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      legend: {orientation: 'h', side: 'top'},
      margin: {
        l:255
      },
      // hoverlabel: {
      //   namelength: -1
      // },
      font: {
        color: 'white'
    }
    };
  
    // Render the plot to the `plot1` div
    Plotly.newPlot("age_oc_boxplot", data1, layout);
  });