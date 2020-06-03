// The idea is change the class active to the <li> that
// is active at the moment... still working on the code

d3.json("./static/participants.json").then(function (data) {
    // var data = Object.values(data);
    // console.log(datam);
    console.log(data);
    console.log('=======================');
    // console.log(data.race);
    
    var try1 = _.groupBy(data, function(i) {
        return i.gender;});

    console.log(try1);
    console.log('=======================');
    
    var try2 = _.forEach(try1, function(value, key) {
            try1[key] = _.groupBy(try1[key], function(i) {
              return i.race;
            });
          });
    
    console.log(try2);
    console.log('=======================');


    var try3 = _.forEach(try2)

    // var try3 = _.forEach(try2, function(value, key) {
    //         try2[key] = _.groupBy(try2[key], function(i) {
    //           return i.age_bins;
    //         });
    //       });
    
    console.log(try2);
    
    
    
    var race = _.chain(data)
        .groupBy("race")
        .map((value, key) => ({race:key, participants: value.length}))
        .value();
    console.log(race);
    console.log('=======================');
    // console.log('=======================');
    
    // var value = []
    // all.map(x => {
    //   value.push(x.participants);
    // });
  
    // var label = []
    // all.map(x => {
    //   label.push(x.race);
    // });
  
    // console.log(label);
    // console.log(value);
});