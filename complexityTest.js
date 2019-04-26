

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

var syncPlot2 = document.getElementById('testDiv'),
    d32 = Plotly.d3,
    N2 = 16,
    x2 = [0],
    y2 = [0],
    opacity = 0.25,
    data = [ { x:x2, y:y2, type:'scatter',
        mode:'markers', marker:{size:16} } ],
    layout = {
        hovermode:'closest',
    };
Plotly.newPlot('testDiv', data, layout);


syncPlot.on('plotly_click', function(data){
    var pts = '';
    for(var i=0; i < data.points.length; i++){

        console.log("inside for loop");

        pts = 'x = '+data.points[i].x +'\ny = '+
            data.points[i].y.toPrecision(4) + '\n\n';
        extendTraceClick(data.points[i].x, data.points[i].y);
    }
});

function extendTraceClick(xC, yC) {
    console.log("x: " + xC + " y: " + yC);
    SAGE2_AppState.titleUpdate("Testing extend trace click");
    SAGE2_AppState.callFunctionInContainer("consolePrint", "congrats!");
    Plotly.extendTraces(syncPlot2, {x: [[xC]], y: [[yC]]}, [0])
}

syncPlot2.on('plotly_hover', function (eventdataSync2){
    var pointNum = eventdataSync2.points[0].pointNumber;

    var xSync2 = eventdataSync2.points[0].x;
    var ySync2 = eventdataSync2.points[0].y;

    Plotly.Fx.hover('myDiv',[

        { curveNumber: 0, pointNumber:eventdataSync2.points[0].x },
    ]);

})
    .on('plotly_unhover',function(){
        Plotly.Fx.hover('myDiv',[]);
    });

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
      mode:'markers', marker:{size:16} } ]

  complexLayout = {
      hovermode:'closest',
      title:'Alternate Data'
  }
//  Plotly.newPlot('myDiv', complexData, complexLayout);
  //this.callFunctionInWebpage("plotFromContainer", {complexData, complexLayout});
  return {complexData, complexLayout};
}
