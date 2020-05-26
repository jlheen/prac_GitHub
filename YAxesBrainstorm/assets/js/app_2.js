// ***************************
// Option: Try to make the chart responsive
// ***************************




// Creating the svg container

var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group to the HTML chart class
//  that will hold our chart, and shift the latter by left and top margins.
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// ********************************
// Data: Initial X & Y Axis = Poverty v. Healthcare
// Labeled as chosenYAxis & defaultYaxis
// Secondary X & Y = Income v. Smokes
// Labeled as newXscale & newYscale


// Initial Y-Axis: Poverty
var chosenYAxis = "healthcare";

// function used for updating x-scale var upon click on axis label
function yScale(censusDataSet, chosenYAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(censusDataSet, d => d[chosenYAxis]),
        d3.max(censusDataSet, d => d[chosenYAxis])
        ])
        .range([0, width]);

    return yLinearScale;

}

// function used for updating yAxis var upon click on axis label
function renderAxes(newYscale, yAxis) {
    var leftAxis = d3.axisLeft(newYscale);

    yAxis.transition()
        .duration(500)
        .call(leftAxis);

    return yAxis;
}


// ************************************
// TO DO: CHANGE CIRCLES FOR BOTH AXES
// add in attr("cy"...)
// ************************************


// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newYscale, chosenYAxis) {

    circlesGroup.transition()
        .duration(500)
        // .attr("cx", d => newXscale(d[chosenYAxis]));
        .attr("cy", d => newYscale(d[chosenYAxis]))

    return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenYAxis, circlesGroup) {

    var label;

    // **********
    // NOTE!!!
    // in HW - have 3 x- and y-axes 
    // either need if/elif/else, etc. OR switch stmt

    if (chosenYAxis === "healthcare") {
        label = "Healthcare";
    }
    else {
        label = "Smokers";
    }

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function (d) {
            return (`${d.state}<br>${label} ${d[chosenYAxis]}`);
        });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function (data) {
        toolTip.show(data);
    })
        // onmouseout event
        .on("mouseout", function (data, index) {
            toolTip.hide(data);
        });

    return circlesGroup;
}


// *************************
// DATA RETRIEVAL
// &
// FUNCTION EXECUTION
// *************************

// *************************
// QUESTION:
// HOW TO PATH TO SOMETHING OUT OF & INSIDE OTHER FOLDER?
// *************************


// Retrieve data from the CSV file and execute everything below
d3.csv("../../assets/data/data.csv").then(function (censusDataSet, err) {
    if (err) throw err;

    // parse data
    censusDataSet.forEach(function (data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        data.income = +data.income;
        data.smokes = +data.smokes;
    });

    // xLinearScale function above csv import
    var yLinearScale = yScale(censusDataSet, chosenYAxis);

    // Create y scale function
    var xLinearScale = d3.scaleLinear()
        .domain([0, d3.max(censusDataSet, d => d.poverty)])
        .range([height, 0]);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // append x axis
    chartGroup.append("g")
        .call(bottomAxis);

    // ************************************
    // TO DO: UPDATE CIRCLES
    // default setting is state showing on the circles
    // what for the mouseover event -- the data points
    // ONE POSSIBLE SOLUTION: https://stackoverflow.com/questions/13615381/d3-add-text-to-circle -- would this mean I need to update the circles with a separate function for the text?
    // similar: https://stackoverflow.com/questions/20644415/d3-appending-text-to-a-svg-rectangle
    // ************************************

    // append INITIAL circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(censusDataSet)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.income))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", 15)
        .attr("fill", "#339DFF")
        .attr("opacity", ".3");

    // ************************************
    // TO ADD
    // ************************************

    //  text for the circles
//     circlesGroup.append("text")
//         .attr("dx", function (chosenYAxis) { return -20 })
//         .text(function (d) { return d.label })
// })

// Initial X-Axis
chartGroup.append("g")    
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

// Create group for two y-axis labels
var YlabelsGroup = chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Healthcare");

var healthcareLabel = YlabelsGroup.append("text")
    .attr("x", 0) 
    .attr("y", 20)
    .attr("value", "healthcare") // value to grab for event listener
    .classed("active", true)
    .text("Healthcare");

var smokersLabel = YlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "smokes") // value to grab for event listener
    .classed("inactive", true)
    .text("Smokers");


    // ************************************
// TO DO: YlabelsGroup for two y-axes
    // ************************************

// var YlabelsGroup = chartGroup.append("g")
//     .attr("transform", `translate(${width / 2}, ${height + 20})`);

// var healthcareLabel = YlabelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 20)
//     .attr("value", "healthcare") // value to grab for event listener
//     .classed("active", true)
//     .text("Healthcare");

// var smokersLabel = YlabelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 40)
//     .attr("value", "smokes") // value to grab for event listener
//     .classed("inactive", true)
//     .text("Smokers (%)");


// updateToolTip function above csv import
var circlesGroup = updateToolTip(chosenYAxis, circlesGroup);

// x axis labels event listener
YlabelsGroup.selectAll("text")
    .on("click", function () {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenYAxis) {

            // replaces chosenYAxis with value
            chosenYAxis = value;

            // console.log(chosenYAxis)

            // functions here found above csv import
            // updates x scale for new data
            yLinearScale = yScale(censusDataSet, chosenYAxis);

            // updates x axis with transition
            yAxis = renderAxes(yLinearScale, yAxis);

            // updates circles with new x values
            circlesGroup = renderCircles(circlesGroup, yLinearScale, chosenYAxis);

            // updates tooltips with new info
            circlesGroup = updateToolTip(chosenYAxis, circlesGroup);

            // changes classes to change bold text
            if (chosenYAxis === "poverty") {
                povertyRateLabel
                    .classed("active", true)
                    .classed("inactive", false);
                incomeLabel
                    .classed("active", false)
                    .classed("inactive", true);
            }
            else {
                povertyRateLabel
                    .classed("active", false)
                    .classed("inactive", true);
                incomeLabel
                    .classed("active", true)
                    .classed("inactive", false);
            }
        }
    });
}).catch (function(error) {
    console.log(error);
});








// // Creating the svg container

// var svgWidth = 960;
// var svgHeight = 500;

// var margin = {
//   top: 20,
//   right: 40,
//   bottom: 80,
//   left: 100
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Create an SVG wrapper, append an SVG group to the HTML chart class
// //  that will hold our chart, and shift the latter by left and top margins.
// var svg = d3
//   .select(".chart")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// // Append an SVG group
// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Initial Params
// var chosenYAxis = "hair_length";

// // function used for updating x-scale var upon click on axis label
// function xScale(hairData, chosenYAxis) {
//   // create scales
//   var xLinearScale = d3.scaleLinear()
//     .domain([d3.min(hairData, d => d[chosenYAxis]) * 0.8,
//       d3.max(hairData, d => d[chosenYAxis]) * 1.2
//     ])
//     .range([0, width]);

//   return xLinearScale;

// }

// // function used for updating xAxis var upon click on axis label
// function renderAxes(newXScale, xAxis) {
//   var bottomAxis = d3.axisBottom(newXScale);

//   xAxis.transition()
//     .duration(1000)
//     .call(bottomAxis);

//   return xAxis;
// }

// // function used for updating circles group with a transition to
// // new circles
// function renderCircles(circlesGroup, newXScale, chosenYAxis) {

//   circlesGroup.transition()
//     .duration(1000)
//     .attr("cx", d => newXScale(d[chosenYAxis]));

//     // **********
//     // NOTE!!!
//     // in HW - updating BOTH x- and y-axes
//     // t/f need to updated both "cx" and "cy" 

//   return circlesGroup;
// }

// // function used for updating circles group with new tooltip
// function updateToolTip(chosenYAxis, circlesGroup) {

//   var label;

//   // **********
// // NOTE!!!
// // in HW - have 3 x- and y-axes 
// // either need if/elif/else, etc. OR switch stmt

//   if (chosenYAxis === "hair_length") {
//     label = "Hair Length:";
//   }
//   else {
//     label = "# of Albums:";
//   }

//   var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([80, -60])
//     .html(function(d) {
//       return (`${d.rockband}<br>${label} ${d[chosenYAxis]}`);
//     });

//   circlesGroup.call(toolTip);

//   circlesGroup.on("mouseover", function(data) {
//     toolTip.show(data);
//   })
//     // onmouseout event
//     .on("mouseout", function(data, index) {
//       toolTip.hide(data);
//     });

//   return circlesGroup;
// }


// // *************************
// // DATA RETRIEVAL
// // &
// // FUNCTION EXECUTION
// // *************************


// // Retrieve data from the CSV file and execute everything below
// d3.csv("hairData.csv").then(function(hairData, err) {
//   if (err) throw err;

//   // parse data
//   hairData.forEach(function(data) {
//     data.hair_length = +data.hair_length;
//     data.num_hits = +data.num_hits;
//     data.num_albums = +data.num_albums;
//   });

//   // xLinearScale function above csv import
//   var xLinearScale = xScale(hairData, chosenYAxis);

//   // Create y scale function
//   var yLinearScale = d3.scaleLinear()
//     .domain([0, d3.max(hairData, d => d.num_hits)])
//     .range([height, 0]);

//   // Create initial axis functions
//   var bottomAxis = d3.axisBottom(xLinearScale);
//   var leftAxis = d3.axisLeft(yLinearScale);

//   // append x axis
//   var xAxis = chartGroup.append("g")
//     .classed("x-axis", true)
//     .attr("transform", `translate(0, ${height})`)
//     .call(bottomAxis);

//   // append y axis
//   chartGroup.append("g")
//     .call(leftAxis);

//   // append initial circles
//   var circlesGroup = chartGroup.selectAll("circle")
//     .data(hairData)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d[chosenYAxis]))
//     .attr("cy", d => yLinearScale(d.num_hits))
//     .attr("r", 20)
//     .attr("fill", "pink")
//     .attr("opacity", ".5");

//   // Create group for two x-axis labels
//   var labelsGroup = chartGroup.append("g")
//     .attr("transform", `translate(${width / 2}, ${height + 20})`);

//   var hairLengthLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 20)
//     .attr("value", "hair_length") // value to grab for event listener
//     .classed("active", true)
//     .text("Hair Metal Ban Hair Length (inches)");

//   var albumsLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 40)
//     .attr("value", "num_albums") // value to grab for event listener
//     .classed("inactive", true)
//     .text("# of Albums Released");

//   // append y axis
//   chartGroup.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left)
//     .attr("x", 0 - (height / 2))
//     .attr("dy", "1em")
//     .classed("axis-text", true)
//     .text("Number of Billboard 500 Hits");

//   // updateToolTip function above csv import
//   var circlesGroup = updateToolTip(chosenYAxis, circlesGroup);

//   // x axis labels event listener
//   labelsGroup.selectAll("text")
//     .on("click", function() {
//       // get value of selection
//       var value = d3.select(this).attr("value");
//       if (value !== chosenYAxis) {

//         // replaces chosenYAxis with value
//         chosenYAxis = value;

//         // console.log(chosenYAxis)

//         // functions here found above csv import
//         // updates x scale for new data
//         xLinearScale = xScale(hairData, chosenYAxis);

//         // updates x axis with transition
//         xAxis = renderAxes(xLinearScale, xAxis);

//         // updates circles with new x values
//         circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenYAxis);

//         // updates tooltips with new info
//         circlesGroup = updateToolTip(chosenYAxis, circlesGroup);

//         // changes classes to change bold text
//         if (chosenYAxis === "num_albums") {
//           albumsLabel
//             .classed("active", true)
//             .classed("inactive", false);
//           hairLengthLabel
//             .classed("active", false)
//             .classed("inactive", true);
//         }
//         else {
//           albumsLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           hairLengthLabel
//             .classed("active", true)
//             .classed("inactive", false);
//         }
//       }
//     });
// }).catch(function(error) {
//   console.log(error);
// });
