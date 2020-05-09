
// create event for the button select
d3.select("#submit").on("click", handleSubmit);
// handleSubmit has not been defined

function handleSubmit(){
  d3.event.preventDefault();
  // both (.node) & (.property) of these options work
  // more nuanced reasoning (perhaps?) for why you might choose on over the other
  var stock = d3.select("#stockInput").node().value;
  // var stock = d3.select("#stockInput").property("value");
  console.log(stock);
  d3.select("#stockInput").node().value = "";
  buildPlot(stock);
}


/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */

// Submit Button handler
// function handleSubmit() {
//   // @TODO: YOUR CODE HERE
//   // Prevent the page from refreshing
//   d3.event.preventDefault();

  // Select the input value from the form

  // clear the input value

  // Build the plot with the new stock
}


function buildPlot(stockInput) {
  var apiKey = "QCEno9eF3yUzZMLzkHYx";
  var url = `https://www.quandl.com/api/v3/datasets/WIKI/${stockInput}.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;

// still within the buildPlot function
// -- since the user will choose a stock 
// and it will build a plot based off of that

// starting a nested function
// "data" is the entire JSON response to the API call
// (name, stock, startDate) are found w/in the json 
  d3.json(url).then(function(data) {
    // Grab values from the response json object to build the plots
    var name = data.dataset.name;
    var stockTick = data.dataset.dataset_code;
    var startDate = data.dataset.start_date;
    var endDate = data.dataset.end_date;
    // Print the names of the columns
    console.log(data.dataset.column_names);
    // Print the data for each day
    console.log(data.dataset.data);
    // Use map() to build an array of the the dates
    // Lesson 2 we used unpack function 
    var dates = data.dataset.data.map(row => row[0]);
    // Use map() to build an array of the closing prices
    var closingPrices = data.dataset.data.map(row => row[4]);

    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: name,
      x: dates,
      y: closingPrices,
      line: {
        color: "#17BECF"
      }
    };

    var data = [trace1];

    var layout = {
      title: `${stockInput} closing prices`,
      xaxis: {
        range: [startDate, endDate],
        // type of data we are giving to x-axis is a date
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("plot", data, layout);

  });
}

// Add event listener for submit button
// @TODO: YOUR CODE HERE
