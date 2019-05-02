//
// SAGE2 application: FlyChart
// by: Dylan Kobayashi <dylank@hawaii.edu>
//
// Copyright (c) 2018
//

"use strict";

// Please see https://bitbucket.org/sage2/sage2/wiki/SAGE2%20Webview%20Container for instructions


var plotlyChart = sage2_webview_appCoreV01_extendWebview({
	webpageAppSettings: {
		setSageAppBackgroundColor: true,  // Web pages without background values will be transparent.
		backgroundColor: "white",         // Used if above is true, can also use rgb and hex strings
		enableRightClickNewWindow: false, // If true, right clicking on images or links open new webview
		printConsoleOutputFromPage: true, // If true, when web page uses console.log, container will console.log that value in display client

		// If you want your context entries to appear before or after the default
		putAdditionalContextMenuEntriesBeforeDefaultEntries: true,
		// The following will include the default Webview context menu entry if set to true.
		enableUiContextMenuEntries: {
			navigateBack:       false, // alt left-arrow
			navigateForward:    false, // alt right-arrow
			reload:             true, // alt r
			autoRefresh:        false, // must be selected from UI context menu
			consoleViewToggle:  false, // must be selected from UI context menu
			zoomIn:             true, // alt up-arrow
			zoomOut:            true, // alt down-arrow
			urlTyping:          false, // must be typed from UI context menu
			copyUrlToClipboard: false, // must be typed from UI context menu
		},
	},
	init: function(data) {
		// Will be called after initial SAGE2 init()
		// this.element will refer to the webview tag
		this.resizeEvents = "continuous"; // Recommended not to change. Options: never, continuous, onfinish

		// Path / URL of the page you want to show
		this.changeURL(this.resrcPath + "/webpage/index.html", false);
	},
	load: function(date) {
		// OPTIONAL
		// The state will be automatically passed to your webpage through the handler you gave to SAGE2_AppState
		// Use this if you want to alter the state BEFORE it is passed to your webpage. Access with this.state
	},
	draw: function(date) {
		// OPTIONAL
		// Your webpage will be in charge of its view
		// Use this if you want to so something within the SAGE2 Display variables
		// Be sure to set 'this.maxFPS' within init() if this is desired.
		// FPS only works if instructions sets animation true
	},
	resize: function() {
		this.callFunctionInWebpage();
		this.resizeElement = document.getElementById("myDiv");
		this.resizeElement.style.width  = this.sage2_width  + "px";
		this.resizeElement.style.height = this.sage2_height + "px";

		this.refresh();
	},
	getContextEntries: function() {
		// OPTIONAL
		// This can be used to allow UI interaction to your webpage
		// Entires are added after entries of enableUiContextMenuEntries
		var entries = [];
		// entries.push({
		// 	description: "This text is seen in the UI",
		// 	callback: "makeAFunctionMatchingThisString", // The string will specify which function to activate
		// 	parameters: {},
		// 	// The called function will be passed an Object.
		// 	// Each of the parameter properties will be in that object
		// 	// Some properties are reserved and may be automatically filled in.
		// });
		entries.push({
			description: "Switch data",
			callback: "toggleData",
			parameters: {}
		});

	entries.push({
		description: "Line chart",
		callback: "lineChart",
		parameters: {}
	});
	return entries;
},

	toggleData: function(override) {
		if (override) {
			var i = this.callComplex(override);
			this.callFunctionInWebpage("plotFromContainer", i);
			return;
		}
	},

lineChart: function() {

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

	var lineData = [trace1, trace2];

	var i = this.scatterToLine(lineData);
	console.log("scatter to line ret: ", i);
	console.log("lineData: ", lineData);
	this.callFunctionInWebpage("restyleFromContainer", i);
},

	handleClick: function(data) {
		console.log("In container:", data);
		this.clickData = data;
	},

	getClickData: function() {
		return this.clickData;
	},

	handleHover: function(data) {
		console.log("In container:", data);
		this.hoverData = data;
	},

	getHoverData: function() {
		return this.hoverData;
	},

	handleSelection: function(data) {
		console.log("In container:", data);
		console.log(this.id);
		this.selectionData = data;
	},

	getSelectionData: function() {
		return this.selectionData;
	},

	handleDiv: function(element) {
		return this.callFunctionInWebpage("sendDivToContainer");
	},

	callComplex: function(newData) {
		console.log("x data: " + newData[0]);
		console.log("y data: " + newData[1]);

		let complexData = [ { x:newData[0], y:newData[1], type:'scatter',
				mode:'markers', marker:{size:16} } ];

		let complexLayout = {
				hovermode:'closest',
				title:'Alternate Data'
		};
		return {complexData, complexLayout};
	},

	scatterToLine: function(data) {
	  var switchData = [{
	    x:data[0], y:data[1],
	    type:'scatter', mode: 'lines'
	  }];

	  var switchLayout = {
	    hovermode: 'closest',
	  };

	  return {switchData, switchLayout};
	},

	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// Add optional functions

	// Functions can be called from the webpage, see the webpage/main.js file for example
	consolePrint: function (value) {
		console.log(value);
	},

});
