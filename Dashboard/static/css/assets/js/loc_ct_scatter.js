d3.json("./static/css/assets/js/scatter_length.json").then((importedData) => {
  console.log(importedData);
  var length_days = []
  var years = []
  length_days = Object.values(importedData.length_of_case_in_days);
  years = Object.values(importedData.year);
  console.log(length_days);
  console.log(years);


var trace1 = {
    x: length_days,
    y: years,
    mode: 'markers',
    type: 'scatter'
  };
  
  // var trace2 = {
  //   x: [2, 3, 4, 5],
  //   y: [16, 5, 11, 9],
  //   mode: 'markers',
  //   type: 'scatter'
  // };
  
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
  
  var data = [trace1];
  
  Plotly.newPlot("loc_ct_scatter", data, layout);

});