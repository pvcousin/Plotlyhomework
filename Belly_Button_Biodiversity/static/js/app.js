//function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
	//var metaData = "/metadata/<sample>";
    // Use d3 to select the panel with id of `#sample-metadata`
	//var changeMeta = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
		
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
	
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
//}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var path = "/db/belly_button_biodiversity";
  d3.json(path).then(function(response) {
     console.log(response);
	 var data = [resonse];
    // @TODO: Build a Bubble Chart using the sample data
	var trace = {
		x: response.map(data => data.out_ids),
		y: response.map(data => data.sample_values),
		marker: {
			size: response.map(data => data.sample_values),
			colors: response.map(data => data.otu_ids),
			text: response.map(data.otu_lables)
		};
	};
	var layout = {
		title: "Bubble Chart",
		showlegend: true,
		height: 400,
		width: 400
	};

	Plotly.newPlot("bubble", trace, layout);
    // @TODO: Build a Pie Chart
	var trace = {
		labels: reponse.map(data => data.otu_ids),
		values: (data => data.sample_values),
		type: "pie"
	};

	var layout = {
		title: "Pie Chart"
	};

	Plotly.newPlot("pie", data, layout)

    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

 });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
