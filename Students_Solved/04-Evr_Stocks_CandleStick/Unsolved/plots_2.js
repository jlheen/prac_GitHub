// using unpack instead of map
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }
  
  // Submit Button handler
  function handleSubmit() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // Select the input value from the form
    var stock = d3.select("#stockInput").node().value;
    console.log(stock);
  
    // clear the input value
    d3.select("#stockInput").node().value = "";
  
    // Build the plot with the new stock
    buildPlot(stock);
  }
  
  function buildPlot(stock) {
    var apiKey = "QCEno9eF3yUzZMLzkHYx";
  
    var url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;
  
    d3.json(url).then(function(data) {
      // Grab values from the response json object to build the plots
    //   this object: ds is a list of arrays
      var ds = data.dataset
      var name = ds.name;
      var stock = ds.dataset_code;
      var startDate = ds.start_date;
      var endDate = ds.end_date;
      // Print the names of the columns
      console.log(ds.column_names);
      // Print the data for each day
      console.log(ds.data);
      var dates = unpack(ds.date, 0);
      var closingPrices = unpack(ds.data, 4);
      var openingPrices = unpack(ds.data, 1);
      var highPrices = unpack(ds.data, 2);
      var lowPrices = unpack(ds.data, 3);
  
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
  
      var trace2 = {
        type: "candlestick",
        // depending on the plot you choose, the properties you include will be different
        x: dates,
        // for candlestick, need the following:
        high: highPrices,
        low: lowPrices,
        open: openingPrices,
        close: closingPrices
      }
  
      var data = [trace1, trace2];
  
      var layout = {
        title: `${stock} closing prices`,
        xaxis: {
          range: [startDate, endDate],
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
d3.select("#submit").on("click", handleSubmit);

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // /**
  //  * Helper function to select stock data
  //  * Returns an array of values
  //  * @param {array} rows
  //  * @param {integer} index
  //  * index 0 - Date
  //  * index 1 - Open
  //  * index 2 - High
  //  * index 3 - Low
  //  * index 4 - Close
  //  * index 5 - Volume
  //  */
  // function unpack(rows, index) {
  //   return rows.map(function(row) {
  //     return row[index];
  //   });
  // }
  
  // // Submit Button handler
  // function handleSubmit() {
  //   // Prevent the page from refreshing
  //   d3.event.preventDefault();
  
  //   // Select the input value from the form
  //   var stock = d3.select("#stockInput").node().value;
  //   console.log(stock);
  
  //   // clear the input value
  //   d3.select("#stockInput").node().value = "";
  
  //   // Build the plot with the new stock
  //   buildPlot(stock);
  // }
  
  // function buildPlot(stock) {
  //   var apiKey = "YOUR KEY HERE";
  
  //   var url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;
  
  //   d3.json(url).then(function(data) {
  
  //     // Grab values from the response json object to build the plots
  //     var name = data.dataset.name;
  //     var stock = data.dataset.dataset_code;
  //     var startDate = data.dataset.start_date;
  //     var endDate = data.dataset.end_date;
  //     var dates = unpack(data.dataset.data, 0);
  //     var closingPrices = unpack(data.dataset.data, 4);
  //     // @TODO: Unpack the open, close, high, and low prices
  
  //     var trace1 = {
  //       type: "scatter",
  //       mode: "lines",
  //       name: name,
  //       x: dates,
  //       y: closingPrices,
  //       line: {
  //         color: "#17BECF"
  //       }
  //     };
  
  //     // Candlestick Trace
  //     var trace2 = {
  //       // @TODO: YOUR CODE HERE
  //     };
  
  //     var data = [trace1, trace2];
  
  //     var layout = {
  //       title: `${stock} closing prices`,
  //       xaxis: {
  //         range: [startDate, endDate],
  //         type: "date"
  //       },
  //       yaxis: {
  //         autorange: true,
  //         type: "linear"
  //       }
  //     };
  
  //     Plotly.newPlot("plot", data, layout);
  
  //   });
  // }
  
  // // Add event listener for submit button
  // d3.select("#submit").on("click", handleSubmit);
  