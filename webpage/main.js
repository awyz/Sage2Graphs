
//
// SAGE2 application: webviewApp
// by: Dylan Kobayashi <dylank@hawaii.edu>
//
// Copyright (c) 2018
//

console.log("main.js loaded");



/*
How to use SAGE2_AppState.js

	Including SAGE2_AppState.js will add a global variable to the window called:
		SAGE2_AppState

	That provides the means to communicate with the app container.

	See the following examples below:

*/

// Adding a full state handler
SAGE2_AppState.addFullStateHandler(customFullStateHandler); // customFullStateHandler is a function defined below

// Adding a specific value handler, this always activate AFTER the full state handler
SAGE2_AppState.addValueHandler("zoom", handlerForZoomStateValue);


// To manually change the application title
SAGE2_AppState.titleUpdate("Hello world test page");

// To call a function in the container
// State the name of the function in a string, the second param will be given to the function
SAGE2_AppState.callFunctionInContainer("consolePrint", "The webpage has loaded and is calling the consolePrint function defined in the container");




// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------
function customFullStateHandler(state) {
	console.log("Received a full state update from container", state);
}

function handlerForZoomStateValue(value) {
	console.log("State was updated, current zoom value:", value);
}

function plotFromContainer(param) {
	Plotly.restyle('myDiv', param.complexData, param.complexLayout);
}

// Switch scatter plot to a line chart
function restyleFromContainer(param) {
	console.log("Hello")
	Plotly.restyle('myDiv', param.switchData, param.switchLayout);
	console.log("Goodbye");
}

function sendClickToContainer(param) {
	SAGE2_AppState.callFunctionInContainer("handleClick", param);
}

function sendHoverToContainer(param) {
	SAGE2_AppState.callFunctionInContainer("handleHover", param);
}

function sendSelectionToContainer(param) {
	SAGE2_AppState.callFunctionInContainer("handleSelection", param);
}
