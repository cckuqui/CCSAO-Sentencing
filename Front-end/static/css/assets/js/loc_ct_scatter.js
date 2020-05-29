var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'markers',
    type: 'scatter'
  };
  
  var trace2 = {
    x: [2, 3, 4, 5],
    y: [16, 5, 11, 9],
    mode: 'markers',
    type: 'scatter'
  };
  
  var layout = {
    title: "Basic Scatter Plot",
    width: 950,
    height: 350,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)', 
    font: {
      color: 'white'
  }
  };
  
  var data = [trace1, trace2];
  
  Plotly.newPlot("loc_ct_scatter", data, layout);