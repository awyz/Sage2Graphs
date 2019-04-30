
/////////////////////////////////////////////////////////////// Click events //////////////////////////////////////////

var syncPlot = document.getElementById('myDiv'),
    d3 = Plotly.d3,
    N = 16,
    x = d3.range(N),
    y = d3.range(N).map( d3.random.normal() ),
    opacity = 0.5,
    data = [ { x:x, y:y, type:'scatter',
        mode:'markers', marker:{size:16} } ],
    layout = {
        hovermode:'closest',
    };

Plotly.newPlot('myDiv', data, layout);


// click event
syncPlot.on('plotly_click', function(data){

    var pts = '';
    for(var i=0; i < data.points.length; i++){

        console.log("inside for loop");

        pts = 'x = '+data.points[i].x +'\ny = '+
            data.points[i].y.toPrecision(4) + '\n\n';
        // extendTraceClick(data.points[i].x, data.points[i].y);
        clickData(data.points[i].x, data.points[i].y); // actually being called when clicked for now`
    }
});

// hover event
syncPlot.on('plotly_hover', function(data){
    var pts = '';
    for(var i=0; i < data.points.length; i++){

        console.log("inside for loop");

        pts = 'x = '+data.points[i].x +'\ny = '+
            data.points[i].y.toPrecision(4) + '\n\n';
        // extendTraceClick(data.points[i].x, data.points[i].y);
        hoverData(data.points[i].x, data.points[i].y); // actually being called when clicked for now`
    }
});

// selection event
syncPlot.on('plotly_selected', function(eventData) {
  var x = [];
  var y = [];

  eventData.points.forEach(function(pt) {
    x.push(pt.x);
    y.push(pt.y);
  })
  selectionData(x, y);
});

////////////////////////////////////////////////////////////


function extendTraceClick(xC, yC) {
    console.log("x: " + xC + " y: " + yC);
    SAGE2_AppState.titleUpdate("Testing extend trace click");
    SAGE2_AppState.callFunctionInContainer("consolePrint", "congrats!");
    Plotly.extendTraces(syncPlot2, {x: [[xC]], y: [[yC]]}, [0])
}


//////////////////////// Functions ///////////////////////////////////////////
// Functions to test complexity for scatter plot

function extendTrace() {
    let yval = Math.ceil(Math.random()*1000);
    let xval = Math.ceil(Math.random()*1000);
    console.log("x: " + xval + " y: " + yval);

    Plotly.extendTraces(complex, {x: [[xval]], y: [[yval]]}, [0]);
}

function callComplex(newData) {
  console.log("x data: " + newData[0]);
  console.log("y data: " + newData[1]);

  complexData = [ { x:newData[0], y:newData[1], type:'scatter',
      mode:'markers', marker:{size:16} } ];

  complexLayout = {
      hovermode:'closest',
      title:'Alternate Data'
  }
//  Plotly.newPlot('myDiv', complexData, complexLayout);
  //this.callFunctionInWebpage("plotFromContainer", {complexData, complexLayout});
  return {complexData, complexLayout};
}

function clickData(x, y) {
  console.log("[ [" + x + "], [" + y + "] ]");
  return [ [x], [y] ];
}

function hoverData(x, y) {
  console.log("[ [" + x + "], [" + y + "] ]");
  return [ [x], [y] ];
}

function selectionData(x, y) {
<<<<<<< HEAD:complexityTest.js
  console.log("[ [" + x + "], [" + y + "] ]");
=======
  // var i;
  // for (i = 0; i < x.length; i++) {
		// console.log("[ [" + x + "], [" + y + "] ]")
		sendSelectionToContainer([x,y]);
  // }
>>>>>>> 1c178f305de90651c3a00d3042accbe41d3f3dcf:webpage/complexityTest.js
  return [ [x], [y] ];
}
