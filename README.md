# SvgWrap #

SvgWrap is a lightweight Javascript utility to optimise SVG images for CSS animation and responsive design layouts. It works by wrapping the nodes and class/ID assigments of an SVG into a HTML DIV structure.

* Better performance and smoother animation across most browsers
* Support for SVG node animation in Firefox, IE and mobile browsers
* Responsive scaling of SVG animations to container width (ratio-box)
* Lightweight 2K minified; circumvents needs for Javascript animation alternatives

# Basic Usage #

To install:

```
$ bower install svgwrap

```

This:

```html
	<html>
		<svg id="tennisAnimation">
			<circle id="ball"></circle>
			<path id="racket"></path>
		</svg>
	</html>
```

Through this:


```javascript
	SvgWrap('#tennisAnimation', {
		responsive: true // default
		width: '100%' // default 
		height: '' // default 
	});
```

Becomes this:

```html
	<html>
		<div id="tennisAnimation">
			<div id="ball">
				<svg>
					<circle></circle>
				<svg>
			</svg>
			<div id="racket">
				<svg>
					<path></path>
				<svg>
			</svg>
		</div>
	</html>
```

:sparkles: :cool: :sparkles:

# License #

SvgWrap is licensed under the MIT license.

