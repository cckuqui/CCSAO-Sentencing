d3.json("/demographics/data").then(function (data) {

    var data = data

    function age() {
        let age_bins = _.chain(data)
            .groupBy("age_bins")
            .map((value, key) => ({age_bins:key, participants: value.length}))
            .value();
        
        let value = []
        age_bins.map(x => {
        value.push(x.participants);
        });

        let label = []
        age_bins.map(x => {
        label.push(x.age_bins);
        });
        
        let trace = {
            labels: label,
            values: value,
            type: 'pie'
        };
        
        let dataage = [trace];
        
        let layout = {
            title: "Counts of participants based on age groups",
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)', 
            font: {
            color: 'white'
            },
            legend: {orientation: 'h', side: 'top'}
        };
        
        Plotly.newPlot("demographics_age", dataage, layout);
    }

    function gender() {
        let gender = _.chain(data)
            .groupBy("gender")
            .map((value, key) => ({gender:key, participants: value.length}))
            .value();

        let value = []
        gender.map(x => {
        value.push(x.participants);
        });

        let label = []
        gender.map(x => {
        label.push(x.gender);
        });

        let trace = {

            labels: label,
            values: value,
            type: 'pie'
        };
        
        let datagen = [trace];
        
        let layout = {
        title: "Counts of participants based on gender",
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)', 
        font: {
            color: 'white'
        },
        legend: {orientation: 'h', side: 'top'}
        };
        
        Plotly.newPlot("demographics_gender", datagen, layout);
    }

    function race() {
        let race = _.chain(data)
            .groupBy("race")
            .map((value, key) => ({race:key, participants: value.length}))
            .value();

  
        let value = []
        race.map(x => {
            value.push(x.participants);
        });

        let label = []
        race.map(x => {
            label.push(x.race);
        });

        console.log(label);
        console.log(value);
        
        let trace = {

            labels: label,
            values: value,
            type: 'pie'
            };
        
        let datarace = [trace];
        
        let layout = {
        title: "Counts of participants based on race",
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)', 
        font: {
            color: 'white'
        },
        legend: {orientation: 'h', side: 'top'}
        };
        
        Plotly.newPlot("demographics_race", datarace, layout);
    }

    age();
    gender();
    race();

});