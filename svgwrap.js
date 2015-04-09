/**
 * SvgWrap 1.0.0
 * @copyright Gilbert Sinnott 
 * @license MIT License (see LICENSE.txt)
 */

/* global console */
/* exported SvgWrap */

function SvgWrap(selector, options) {

	var s = this;

	this.getArray = function(list) {
		var ary = [];
		for (var i = 0; i < list.length; i++ ) { ary[ i ] = list[ i ]; }
		return ary;
	};

	this.isDefinition = function(element) {
		return ((element.nodeName === "linearGradient")||(element.nodeName === "radialGradient")||(element.nodeName === "defs")) ? true : false;
	};

	this.constructDiv = function(reference, svg) {

		var size = {
			width: svg.viewBox.baseVal.width,
			height: svg.viewBox.baseVal.height
		};
		var div = document.createElement('div');
	  	div.id = (s.isDefinition(reference)) ? "" : reference.id;
		div.className = (reference.getAttribute('class')) ? 'svg-wrapper ' +  reference.getAttribute('class'): 'svg-wrapper';
		div.style.position = 'absolute';
		div.style.height = 0;
		div.style.width = '100%';
		div.style.top = 0;
		div.style.left = 0;
		div.style.paddingTop = ((100/size.width)*size.height)+'%';
		return div;
	};

	this.appendAllChildren = function(children, parent, svg) {

		children.forEach(function(child){
			var componentDiv = s.constructDiv(child, svg);
			var componentSvg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
			componentSvg.setAttribute('x', '0px');
			componentSvg.setAttribute('y', '0px');
		 	componentSvg.setAttribute('xml:space', 'preserve');
			componentSvg.style.position = 'absolute';
			componentSvg.style.top = '0';
			componentSvg.style.left = '0';
			componentSvg.style.width = '100%';
			componentSvg.style.height = '100%';
		 	componentSvg.setAttribute('viewBox', svg.getAttribute('viewBox'));
		 	componentSvg.appendChild(child);
		 	componentDiv.appendChild(componentSvg);
		 	parent.appendChild(componentDiv);
		 	if (!s.isDefinition) { 
		 		child.setAttribute('id', ''); 
		 		s.appendAllChildren(s.getArray(child.children), componentDiv, svg);
		 	}
		});
	};
	this.extend = function(a, b){
	    for(var key in b) {
	       if(b.hasOwnProperty(key)) {
	           a[key] = b[key];
	       }
	    }
	   return a;
	};

	this.options = {
		width: '100%',
		height: '',
		responsive: true
	};

	if (options) {
		this.extend(this.options, options);
	}

	console.log(options, s.options);


	this.getArray(document.querySelectorAll(selector)).forEach(function(svg){
		var replacement = s.constructDiv(svg, svg);
		replacement.style.height = s.options.height;
		replacement.style.width = s.options.width;
		if (!s.options.responsive) {
			console.log(s.options.responsive, svg.viewBox.baseVal.width);
			replacement.style.width = svg.viewBox.baseVal.width + 'px';
			replacement.style.height = svg.viewBox.baseVal.height + 'px';
			replacement.style.paddingTop = '';
		}
		replacement.style.position = 'relative';
	  	s.appendAllChildren(
	  		s.getArray(svg.children), 
	  		replacement,
	  		svg
	  	);
		svg.id = '';
		svg.setAttribute('class', '');
		svg.parentNode.replaceChild(replacement, svg);
	});
}