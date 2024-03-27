// Get the url
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

d3.json(url).then(function (data) {
   
    populateDropDown(data);
    let x = 0;
    initBar(data, x)
    return data;
        
       });


function populateDropDown(data) {

    // create an empty array to hold the ids
    const values = []
    
        for (let i = 0; i < data.samples.length; i++) {
            values.push(data.samples[i].id);
                }
    
      // Use D3 to select the dropdown menu
      let dropdownMenu = d3.select("#selDataset");
    
      // Assign the value of the dropdown menu option to a variable
        dropdownMenu.selectAll("option")
            .data(values)
            .enter()
            .append("option")
            .text(d => d);
};

//  Function to handle the "optionChanged" event
function optionChanged(selectedValue) {
     
    var selectElement = document.getElementById("selDataset")
    i = selectElement.selectedIndex

    d3.json(url).then(function (data) {

        initBar(data,i)
   
    });
};

function initBar(data, x) {
    d3.json(url).then(function (data) {

        let trace = {
       
            x: data.samples[x].sample_values.slice(0, 10).reverse(),
            y: data.samples[x].otu_ids.slice(0, 10).map(index => `OTU ${index}`).reverse(),
            text: data.samples[x].otu_labels.slice(0, 10),
            type: 'bar',
            orientation: 'h'
        };

        let initdata = [trace];
        let layout = {
            xaxis: data.samples[x].otu_labels
        };
        Plotly.newPlot("bar", initdata, layout);  
    })        
};


  

