d3.json("../static/css/assets/js/scatter_length.json").then((data) => {
  // var importedData = importedData.filter(n => (n.length_of_case_in_days >= 0) & (n.length_of_case_in_days <= 5000));
  console.log(data);
  var length_days = []
  var years = []
  length_days = Object.values(data.length_of_case_in_days);
  years = Object.values(data.year);
  // console.log(length_days);
  // console.log(years);


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
    title: "Length of Case vs. Length of Sentence Term",
    width: 1400,
    height: 600,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)', 
    font: {
      color: 'white'
  }
  };
  
  var data = [trace1];
  
  Plotly.newPlot("loc_ct_scatter", data, layout);

});