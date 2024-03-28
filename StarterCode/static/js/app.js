// Get the url
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

d3.json(url).then(function (data) {
   
    populateDropDown(data);
    let x = 0;
    initBar(data, x)
    initBubble(data, x)
    demoInfo(data, x)
    speedometer(data, x)
    console.log(data);
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

        initBar(data, i)
        initBubble(data, i)
        demoInfo(data,i)
        speedometer(data,i)
    });
};

function initBar(data, x) {

        let trace = {
       
            x: data.samples[x].sample_values.slice(0, 10).reverse(),
            y: data.samples[x].otu_ids.slice(0, 10).map(index => `OTU ${index}`).reverse(),
            text: data.samples[x].otu_labels.slice(0, 10),
            type: 'bar',
            orientation: 'h'
        };

        let initdata = [trace];
        let layout = {
            xaxis: data.samples[x].otu_labels,
            height: 400,
            width: 400,
            margin:{'t':0,'l':150,'b':25,'r':0}
        };
        Plotly.newPlot("bar", initdata, layout);  
       
};

function initBubble(data,x) {

    var trace1 = {
        x: data.samples[x].otu_ids,
        y: data.samples[x].sample_values,
        text: data.samples[x].otu_labels,
        mode: 'markers',
        marker: {
            size: data.samples[x].sample_values,
            color: data.samples[x].otu_ids,
            sizeref: .045,
            sizemode: 'area'
            
        }
      };
      
      var data = [trace1];
      
      var layout = {
        showlegend: false,
        margin:{'t':50,'l':100,'b':50,'r':0}
      };
      
      Plotly.newPlot('bubble', data, layout);   
}

function demoInfo(data, x) {
  
    let info = data.metadata[x]

    const pCard = document.getElementById("sample-metadata")
    pCard.innerHTML = ""
    pCard.innerHTML += `id: ${info.id}<br> ethnicity: ${info.ethnicity}<br> gender: ${info.gender}<br>
                         age: ${info.location}<br> bbtype: ${info.bbtype}<br> wfreq: ${info.wfreq}`
}

function speedometer(data, x) {
    
    // console.log(data.metadata[x].wfreq);
    if (data.metadata[x].wfreq === null) {
        var washes = 0; 
    } else {
        var washes = data.metadata[x].wfreq;
    }
        

  // Create data for the gauge chart
var data = [{
    type: "indicator",
    mode: "gauge",
    value: washes, // Set the initial value  
    gauge: {
        line: {width: 4},
        axis: {range: [0, 9], ticks: "", showticklabels: false},
        bar: {color:  'rgba(0, 0, 0, 0)', shape: {width: 2.5}},
        bgcolor: "white",
        borderwidth: 0,
        steps: [
        { range: [0, 1], color: "#f7f3eb"},
        { range: [1, 2], color: "#f3f0e5"},
        { range: [2, 3], color: "#e2e1c5"},
        { range: [3, 4], color: "#e0e5af"},
        { range: [4, 5], color: "#bbc17e"},
        { range: [5, 6], color: "#84a07b"},
        { range: [6, 7], color: "#87c080"},
        { range: [7, 8], color: "#85bd8b"},
        { range: [8, 9], color: "#61836c"}
      ]
    }
    }];

    let x0; // used in changing the angle of the needle
    let y0; // used in changing the angle of the needle
  

    x0 = [.08, .08, .1, .36, .51, .65, .78, .9, .92, .92];
    y0 = [.16, .25, .48, .7, .75, .7, .6, .45, .25, .16];

    // Add labels to the gauge chart
var labels = [
   
    { text: '<b>0-1<b>', showarrow: false, x: 0.02, y: .2 },
    { text: '<b>1-2<b>', showarrow: false, x: 0.06, y: .45 },
     { text: '<b>2-3<b>', showarrow: false, x: 0.18, y: .6 },
    { text: '<b>3-4<b>', showarrow: false, x: 0.30, y: .77 },
    { text: '<b>4-5<b>', showarrow: false, x: 0.52, y: .8 },
    { text: '<b>5-6<b>', showarrow: false, x: 0.64, y: .78 },
    { text: '<b>6-7<b>', showarrow: false, x: 0.82, y: .65 },
    { text: '<b>7-8<b>', showarrow: false, x: 0.93, y: .45 },
    { text: '<b>8-9<b>', showarrow: false, x: .98, y: .2 }   
  ];
  
  // Add the labels to the gauge chart layout
  gauge.layout = {
    annotations: labels
  };


// Create layout options for the gauge chart
    var layout = {
        width: 550,
        height: 450,
        title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week" },
        annotations: labels,
                shapes: [{
            type: 'line',
            x0: x0[washes],
            y0: y0[washes],
            x1: .5,
            y1: .15,
            line: {
                color: '#850000',
                width: 4
            }
        },
        
        {
            type: 'circle',
            x0: .48, // x-coordinate of the circle
            y0: 0.2, // y-coordinate of the circle (same as the end of the needle)
            x1: 0.54, // x-radius of the circle
            y1: 0.1, // y-radius of the circle
            line: {
                color: '#850000',
                width: 2
            },
            fillcolor: '#850000'           
        }
              
    ]
    };
    
  
  
  // Plot the gauge chart
  Plotly.newPlot('gauge', data, layout);
    
    

}

  

