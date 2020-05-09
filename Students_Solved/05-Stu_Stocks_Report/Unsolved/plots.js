var apiKey = "QCEno9eF3yUzZMLzkHYx";

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
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

function getMonthlyData() {

  var queryUrl = `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2016-10-01&end_date=2017-10-01&collapse=monthly&api_key=${apiKey}`;
  d3.json(queryUrl).then(function(data) {
    // @TODO: Unpack the dates, open, high, low, close, and volume
    var ds = data.dataset;
    var dates = unpack(ds.data, 0);
    var openPrices = unpack(ds.column_names, 1);
    var highPrices = unpack(ds.column_names, 2);
    var lowPrices = unpack(ds.column_names, 3);
    var closingPrices = unpack(ds.column_names, 4);
    var volume = unpack(ds.column_names, 5);

    buildTable(dates, openPrices, highPrices, lowPrices, closingPrices, volume);
  });
}

function buildTable(dates, openPrices, highPrices, lowPrices, closingPrices, volume) {
  var table = d3.select("#summary-table");
  var tbody = table.select("tbody");
  var trow;
  for (var i = 0; i < 12; i++) {
    trow = tbody.append("tr");
    trow.append("td").text(dates[i]);
    trow.append("td").text(openPrices[i]);
    trow.append("td").text(highPrices[i]);
    trow.append("td").text(lowPrices[i]);
    trow.append("td").text(closingPrices[i]);
    trow.append("td").text(volume[i]);
  }
}

function buildPlot() {
  var url = `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2017-01-01&end_date=2018-11-22&api_key=${apiKey}`;

  d3.json(url).then(function(data) {

    // @TODO: Grab Name, Stock, Start Date, and End Date from the response json object to build the plots
    var name = ds.name;
    var stock = ds.dataset_code;
    var startDate = ds.start_date;
    var endDate = ds.end_date;
    
    // @TODO: Unpack the dates, open, high, low, and close prices
    var ds = data.dataset;
    var dates = unpack(ds.data, 0);
    var openPrices = unpack(ds.column_names, 1);
    var highPrices = unpack(ds.column_names, 2);
    var lowPrices = unpack(ds.column_names, 3);
    var closingPrices = unpack(ds.column_names, 4);
    var volume = unpack(ds.column_names, 5);

    getMonthlyData();

    // Closing Scatter Line Trace
    var trace1 = {
      // @TODO: YOUR CODE HERE
    };

    // Candlestick Trace
    var trace2 = {
      // @TODO: YOUR CODE HERE
    };

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
      },
      showlegend: false
    };

    Plotly.newPlot("plot", data, layout);

  });
}

buildPlot();
