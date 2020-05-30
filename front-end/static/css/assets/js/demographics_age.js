d3.json("./static/css/assets/js/general_demographics.json").then(function(demoData) {
  console.log(demoData);
  
      data.age_at_incident = +data.age_at_incident;
      
    // data.obesity = +data.obesity;
    // data.poverty = +data.poverty;


  var labels= [];
  var values= [];

  labels= Object.values(demoData.age_bins);
  
  values= Object.values(demoData.age_at_incident).length;
  
  console.log(labels);
  console.log(values);

  function init() {
    var data = [{
<<<<<<< HEAD
      values: "Age Group, # Cases: " + values,
      labels: "Age group: " + labels,
=======
      values: values,
      labels: labels,
>>>>>>> 11bac5c5caaa497a340c39b0952aa0c504201163
      type: "pie"
    }];
  
    var layout = {
      height: 600,
<<<<<<< HEAD
      width: 800,
      title: "Sentencing Demographics by Age Group"
=======
      width: 800
>>>>>>> 11bac5c5caaa497a340c39b0952aa0c504201163
    }
  
    Plotly.newPlot("demographics_age", data, layout);
  }
  // demoData.forEach(function(data) {

  init();



});

//   var data = [];

// });


// var trace1 = {
//   labels: ["beer", "wine", "martini", "margarita",
//       "ice tea", "rum & coke", "mai tai", "gin & tonic"],
//   values: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
//   type: 'pie'
// };

// var data =[];

// var layout = {
//   title: "'Pie' Chart",
//   paper_bgcolor: 'rgba(0,0,0,0)',
//   plot_bgcolor: 'rgba(0,0,0,0)',
//   font: {
//     color: 'white'
// }
// };

// Plotly.newPlot("demographics_age", data, layout);
