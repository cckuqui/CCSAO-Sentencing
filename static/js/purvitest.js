var svgWidth = 1000;
var svgHeight = 500;

var chartMargin = {
    top: 50,
    right: 50,
    left: 50,
    bottom: 50};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3.select("#loc_ct_scatter")
    .append("svg");

var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.json("./static/css/assets/js/scatter_length.json").then((importedData) => {
  console.log(importedData);

  importedData.map((data) => {
    data.length_of_case_in_days = +data.length_of_case_in_days;
    data.year = +data.year;
  });

  var xLinearScale = d3.scaleLinear()
  .domain([d3.min(importedData, d => d.length_of_case_in_days) - 50, d3.max(importedData, d => d.length_of_case_in_days) + 50])
  .range([0, 12500]);

  var yLinearScale = d3.scaleLinear()
  .domain([d3.min(importedData, d => d.year) - 2, d3.max(importedData, d => d.year) + 2])
  .range([200, 0]);

  var bottomAxis = d3.axisBottom(xLinearScale).ticks(10);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

  chartGroup.append("g")
        .call(leftAxis);

  var circlesGroup = chartGroup.selectAll("circle")
        .data(importedData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.length_of_case_in_days))
        .attr("cy", d => yLinearScale(d.years))
        .attr("r", "15")
        .attr("fill", "teal")
        .attr("opacity", ".5");
    
  chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - chartMargin.left + 50)
        .attr("x", -100 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("BLAH BLAH BLAH");

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth/2 - 100}, ${chartHeight + chartMargin.top + 10})`)
        .attr("class", "axisText")
        .text("GOD I HOPE THIS WORKS");
    
}).catch(function(error) {
  console.log(error);
});