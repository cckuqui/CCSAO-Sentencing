d3.json("./static/participants.json").then(function (data) {
  // var data = Object.values(data);
  // console.log(datam);
  console.log(data);
  console.log('=======================');
  // console.log(data.race);
  
  var age_bins = _.chain(data)
      .groupBy("age_bins")
      .map((value, key) => ({age_bins:key, participants: value.length}))
      .value();
  console.log(age_bins);
  console.log('=======================');
  
  var value = []
  age_bins.map(x => {
    value.push(x.participants);
  });

  var label = []
  age_bins.map(x => {
    label.push(x.age_bins);
  });

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
      },
      legend: {orientation: 'h', side: 'top'}
    };
    
    Plotly.newPlot("demographics_age", data, layout);
});