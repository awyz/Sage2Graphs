//
// SAGE2 application: plotlyChart
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
		// OPTIONAL
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
		return entries;
	},

	toggleData: function(override) {
		if (override) {
			// Plotly.newPlot('myDiv', globalX, layout);
			var i = this.callComplex(override);
			this.callFunctionInWebpage("plotFromContainer", i);
			return;
		}
		var equal = false;
		var b = [[10,20,30,40,50], [5, 30, 1, 2, 10]];
		var a = [[10,20,30,40,50], [1,2,3,4,5]];
		for (var i = 0; i < 5; i++) {
			if (globalX[1][i] != b[1][i]) {
				console.log("is big, go small");
				globalX = b;
				break;
			}
			else {
				equal = true;
			}
		}

		if (equal) {
			console.log("is small, go big");
			globalX = a;
		}
		// Plotly.newPlot('myDiv', globalX, layout);
		var i = this.callComplex(globalX);
		this.callFunctionInWebpage("plotFromContainer", i);

		// document.location.reload();
	},
	//3 functions to handle click, select, and hover
	handleClick: function(data) {
		console.log(data);
		this.clickData = data;
	},
	getClickData: function() {
		return this.clickData;
	},
	handleHover: function(data) {
		console.log(data);
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
	// data = param, store data like this.hoverData




	callComplex: function(newData) {
		console.log("x data: " + newData[0]);
		console.log("y data: " + newData[1]);
	
		let complexData = [ { x:newData[0], y:newData[1], type:'scatter',
				mode:'markers', marker:{size:16} } ];
	
		let complexLayout = {
				hovermode:'closest',
				title:'Alternate Data'
		};
	//  Plotly.newPlot('myDiv', complexData, complexLayout);
		//this.callFunctionInWebpage("plotFromContainer", {complexData, complexLayout});
		return {complexData, complexLayout};
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
