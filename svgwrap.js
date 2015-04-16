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
		//console.log(list);
		var ary = [];
		for (var i = 0; i < list.length; i++ ) { ary[ i ] = list[ i ]; }
		return ary;
	};

	this.isDefinition = function(element) { 
		return ((element.nodeName === "linearGradient")||(element.nodeName === "radialGradient")||(element.nodeName === "defs")) ? true : false;
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
		responsive: true,
		levels: 0
	};


	if (options) {
		this.extend(this.options, options);
	}

	this.levels = (this.options.levels) ? this.options.levels : 999999;

	this.SvgWrapElement = function(svg) {

		var ele = this;
		this.svg = svg.cloneNode();
		this.svg.innerHTML = '';

		this.constructDiv = function(reference, level) {

			var div = document.createElement('div');
		  	div.id = (s.isDefinition(reference)) ? "" : reference.id;
		  	div.classList.add('svg-wrapper');
		  	div.classList.add('svg-level-' + level);
		  	div.classList.add(reference.nodeName);
		  	if (reference.getAttribute('class')) { div.classList.add(reference.getAttribute('class')); }
		  	// if (reference.getAttribute('transform')) { 
		  	// 	window.tran = reference;
		  	// 	var val = reference.getAttribute('transform');
		  	// 	val.replace('/)/g', 'px)');
		  	// 	val.replace(',', 'px,)');
		  	// 	div.style.webkitTransform = val;
		  	// 	console.log('transform', val, div.style.webkitTransform); 

		  	// }
			div.style.position = 'absolute';
			div.style.height = 0;
			div.style.width = '100%';
			div.style.top = 0;
			div.style.left = 0;
			div.style.paddingTop = ((100/ele.size.w)*ele.size.h)+'%';
			return div;
		};

		this.appendAllChildren = function(children, parent, level) {
			level += 1;
			children.forEach(function(child){
				if (child.nodeType !== 3) {
					var componentDiv = ele.constructDiv(child, level);
					var componentSvg = ele.svg.cloneNode();
					window.svg = componentSvg;
					componentSvg.setAttribute('viewBox', '0 0 ' + componentSvg.width.baseVal.value + ' ' + componentSvg.height.baseVal.value);
					componentSvg.setAttribute('width', '');
					componentSvg.setAttribute('height', '');
					componentSvg.style.position = 'absolute';
					componentSvg.style.top = '0';
					componentSvg.style.left = '0';
					componentSvg.style.width = '100%';
					componentSvg.style.height = '100%';
				 	componentSvg.appendChild(child);
				 	componentDiv.appendChild(componentSvg);
				 	parent.appendChild(componentDiv);
				 	if (!s.isDefinition(child)) { 
				 		child.setAttribute('id', ''); 
				 		var children = child.childNodes;
				 		if (children&&(level<s.levels)) { ele.appendAllChildren(s.getArray(children), componentDiv, level); }
				 	}
				 }
			});
		};


		this.size = {
			w: svg.viewBox.baseVal.width || svg.width.baseVal.value,
			h: svg.viewBox.baseVal.height || svg.height.baseVal.value
		};
		this.replacement = this.constructDiv(svg, 0);
		this.replacement.style.position = 'relative';
		this.replacement.style.height = s.options.height;
		this.replacement.style.width = s.options.width;
		if (!s.options.responsive) {
			this.replacement.style.width = this.size.w + 'px';
			this.replacement.style.height = this.size.h + 'px';
			this.replacement.style.paddingTop = '';
		}
		var children = svg.childNodes;
		if (children) { 
		  	this.appendAllChildren(
		  		s.getArray(children), 
		  		this.replacement,
		  		0
		  	);
		  }
		svg.setAttribute('id', '');
		svg.setAttribute('class', '');
		svg.parentNode.replaceChild(this.replacement, svg);


	};

	var wrapped = [];

	this.getArray(document.querySelectorAll(selector)).forEach(function(svg){
		var wrap = new s.SvgWrapElement(svg);
		wrapped.push(wrap.replacement);
	});

	return wrapped;
}