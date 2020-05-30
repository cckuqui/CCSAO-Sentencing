var trace1 = {
    labels: ["beer", "wine", "martini", "margarita",
        "ice tea", "rum & coke", "mai tai", "gin & tonic"],
    values: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
    type: 'pie'
  };
  
  var data = [trace1];
  
  var layout = {
    title: "'Pie' Chart",
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)', 
    font: {
      color: 'white'
  }
  };
  
  Plotly.newPlot("demographics_gender", data, layout);
  