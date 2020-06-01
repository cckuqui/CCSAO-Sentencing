d3.json("./static/participants_age.json").then(function (data) {
  
  // var data = Object.values(data);
  // console.log(datam);
  console.log(data);
  console.log(data.race);
  
  var label = Object.keys(data.race);
  var value = Object.values(data.race);

  console.log(label);
  console.log(value);

  var trace = {
      labels: label,
      values: value,
      type: 'pie'
    };
    
    var data = [trace];
    
    var layout = {
      title: "Counts of participants based on age groups",
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)', 
      font: {
        color: 'white'
    }
    };
    
    Plotly.newPlot("demographics_age", data, layout);
});