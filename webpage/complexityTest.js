
///////////////////////////////////////////////////////////////////////////////
//                            Line Plot
///////////////////////////////////////////////////////////////////////////////

var trace1 = {
  type: 'scatter',
  x: [1, 2, 3, 4],
  y: [10, 15, 13, 17],
  mode: 'lines',
  name: 'Red',
  line: {
    color: 'rgb(219, 64, 82)',
    width: 3
  }
};

var trace2 = {
  type: 'scatter',
  x: [1, 2, 3, 4],
  y: [12, 9, 15, 12],
  mode: 'lines',
  name: 'Blue',
  line: {
    color: 'rgb(55, 128, 191)',
    width: 1
  }
};

var layout = {
  width: 500,
  height: 500
};

var lineData = [trace1, trace2];

Plotly.newPlot('lineGraph', lineData);

lineGraph.on('plotly_click', function(data){
    var pts = '';
    for(var i=0; i < data.points.length; i++){
        pts = 'x = '+data.points[i].x +'\ny = '+
            data.points[i].y.toPrecision(4) + '\n\n';
        clickData(data.points[i].x, data.points[i].y);
    }
});

lineGraph.on('plotly_hover', function(data){
    var pts = '';
    for(var i=0; i < data.points.length; i++){
        pts = 'x = '+data.points[i].x +'\ny = '+
            data.points[i].y.toPrecision(4) + '\n\n';
        hoverData(data.points[i].x, data.points[i].y);
    }
});

// selection event
lineGraph.on('plotly_selected', function(eventData) {
  var x = [];
  var y = [];

  eventData.points.forEach(function(pt) {
    x.push(pt.x);
    y.push(pt.y);
  })
  selectionData(x, y);
});

function retLineGraphElement() {
  return lineGraphData = [ trace1, trace2];
}

///////////////////////////////////////////////////////////////////////////////
//                            Scatter Plot
///////////////////////////////////////////////////////////////////////////////
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

syncPlot.on('plotly_click', function(data){
    var pts = '';
    for(var i=0; i < data.points.length; i++){
        pts = 'x = '+data.points[i].x +'\ny = '+
            data.points[i].y.toPrecision(4) + '\n\n';
        clickData(data.points[i].x, data.points[i].y);
    }
});

syncPlot.on('plotly_hover', function(data){
    var pts = '';
    for(var i=0; i < data.points.length; i++){
        pts = 'x = '+data.points[i].x +'\ny = '+
            data.points[i].y.toPrecision(4) + '\n\n';
        hoverData(data.points[i].x, data.points[i].y);
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


function callComplex(newData) {
  var complexData = [ { x:newData[0], y:newData[1], type:'scatter',
      mode:'markers', marker:{size:16} } ];

  var complexLayout = {
      hovermode:'closest',
      title:'Alternate Data'
  }

  return {complexData, complexLayout};
}

function scatterToLine(data) {
  var switchData = [{
    x:data[0], y:data[1],
    type:'scatter', mode: 'lines'
  }];

  var switchLayout = {
    hovermode: 'closest',
    title:'Line Chart'
  };

  return {switchData, switchLayout};
}

function clickData(x, y) {
  sendClickToContainer([[x],[y]]);
  return [ [x], [y] ];
}

function hoverData(x, y) {
  sendHoverToContainer([[x],[y]]);
  return [ [x], [y] ];
}

function selectionData(x, y) {
	sendSelectionToContainer([x,y]);
  return [ x, y ];
}
