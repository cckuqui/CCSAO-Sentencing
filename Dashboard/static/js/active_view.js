// The idea is change the class active to the <li> that
// is active at the moment... still working on the code

d3.json("./static/participants.json").then(function (data) {
    // var data = Object.values(data);
    // console.log(datam);
    console.log(data);
    console.log('=======================');
    // console.log(data.race);
    
    var female = data.filter(person => person.gender == "Female");
    
    
    console.log(female);
    console.log('=======================');

    var fmulti_level = 
    _.chain(female)
    .groupBy("race")
    .map((value, key) => ({"label":key,"value":value.length ,"category": (
      _.chain(value)
      .groupBy("age_bins")
      .map((value2, key2) => ({"label":key2, "value": value2.length}))
      .value()
    )}))
    .value();

    console.log(fmulti_level);
    console.log('=======================');

// data: [race]




});