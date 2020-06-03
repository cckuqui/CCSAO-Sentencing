d3.json("./static/participants.json").then(function (data) {
  // var data = Object.values(data);
  // console.log(datam);
  console.log(data);
  console.log('=======================');
  // console.log(data.race);
  
  var race = _.chain(data)
      .groupBy("race")
      .map((value, key) => ({race:key, participants: value.length}))
      .value();
  console.log(race);
  console.log('=======================');
  
  var value = []
  race.map(x => {
    value.push(x.participants);
  });

  var label = []
  race.map(x => {
    label.push(x.race);
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
      title: "Counts of participants based on race",
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)', 
      font: {
        color: 'white'
      },
      legend: {orientation: 'h', side: 'top'}
    };
    
    Plotly.newPlot("demographics_race", data, layout);
});