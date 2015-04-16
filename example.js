/* global SvgWrap */
/* jshint devel:true */

var svgwrap = new SvgWrap('svg', { // returns list of wrapped SVG elements
	width: '100%', // default 100% is responsive
	height: false, // default false is responsive
	responsive: true, // if false width and height must be set
	levels: 0 // default 0 is infinite
});
