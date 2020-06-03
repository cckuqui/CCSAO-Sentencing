d3.json("./static/participants.json").then(function (data) {
  // var data = Object.values(data);
  // console.log(datam);
  console.log(data);
  console.log('=======================');
  // console.log(data.race);
  
  var gender = _.chain(data)
      .groupBy("gender")
      .map((value, key) => ({gender:key, participants: value.length}))
      .value();
  console.log(gender);
  console.log('=======================');
  
  var value = []
  gender.map(x => {
    value.push(x.participants);
  });

  var label = []
  gender.map(x => {
    label.push(x.gender);
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
      title: "Counts of participants based on gender",
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)', 
      font: {
        color: 'white'
      },
      legend: {orientation: 'h', side: 'top'}
    };
    
    Plotly.newPlot("demographics_gender", data, layout);
});