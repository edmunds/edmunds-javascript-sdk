# Average Price Widget
Find the True Market Value^tm^ of a particular Make/Model/Year/Style for a specific zipcode.

## Setup
	<!-- The widget's root -->
	<div id="mywidget"></div>
	
	// Include the JavaScript goodness
	<script type="text/javascript" src="tmv.widget.1-0.js"></script>
	
	<script type="text/javascript">
		(function() {
			// Instantiate the widget
			var myWidget = new EDM.TMV(api_key, {root: 'mywidget'});
			// Initiate it
			myWidget.init();
			// When the init is completed, render it!
			myWidget.subscribe('init_complete', function() {
				myWidget.render();
			});
		})();
	</script>
	
# Dependencies

- Edmunds JavaScript SDK
