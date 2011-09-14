/**
 * Core functionality for the Edmunds Widgets
 *
 * @class EDM
 */
function EDM(api_key, config) {
	/**
	 * Assigned API Key. Register for an API Key <a href="http://developer.edmunds.com/apps/register">here</a> 
	 *
	 * @config _api_key
	 * @private
	 * @type string
	 */
	var _api_key = api_key;
	/**
	 * Widget configuration object 
	 *
	 * @config _config
	 * @private
	 * @type object
	 */
	var _config = config;
	/**
	 * The page's head DOM element
	 *
	 * @config _head
	 * @private
	 * @type DOMElement
	 */
	var _head = document.getElementsByTagName('head')[0];
	/**
	 * Registered custom events subscribers
	 *
	 * @config _events
	 * @private
	 * @type object
	 */
	var _events = {};
	/**
	 * The number of files still being loaded for the widget
	 *
	 * @config _loading
	 * @private
	 * @type int
	 */
	var _loading = 0;
	/**
	 * The ID stub for all IDs given to the elements of the widget
	 *
	 * @config _base_id
	 * @private
	 * @type string
	 */
	var _base_id = "edm"+new Date().getTime();
	/**
	 * The ID stub for all classes given to the elements of the widget
	 *
	 * @config _base_class
	 * @private
	 * @type string
	 */
	var _base_class;

	/**
	 * Get the API Key
	 *
	 * @method getApiKey
	 * @param void
	 * @return {string} API Key
	 */
	this.getApiKey = function() {
		return _api_key;
	};
	/**
	 * Get the ID of the DOM element housing the widget
	 *
	 * @method getRoot
	 * @param void
	 * @return {string} The ID of the DOM element housing the widget
	 */
	this.getRoot = function() {
		return _config.root;
	};
	/**
	 * Get the ID stub
	 *
	 * @method getBaseId
	 * @param void
	 * @return {string} The ID stub
	 */
	this.getBaseId = function() {
		return _base_id;
	};
	/**
	 * Get the class stub
	 *
	 * @method getBaseClass
	 * @param void
	 * @return {string} The class stub
	 */
	this.getBaseClass = function() {
		if (_base_class) {
			return _base_class;
		}
		return _base_class = (!_config.baseClass) ? 'edmwidget' : _config.baseClass;
	};
	/**
	 * Add a JavaScript file to the page asynchronously 
	 *
	 * @method addScript
	 * @param string f URL of the file to be included
	 * @return {bool} Always true
	 */
	this.addScript = function(f) {
		var that = this;
		++_loading;
		var s = document.createElement('script');
		s.type = "text/javascript";
		s.src = f;
		s.onload = function() {
			--_loading;
			if (_loading == 0) {
				that.fire('loading_complete');
			}
		};
		_head.appendChild(s);
		return true;
	};
	/**
	 * Subscribe to a custom event fired by the widget
	 *
	 * @method subscribe
	 * @param string evtName The event name
	 * @param function fn The function to be invoked when the event is fired
	 * @return void
	 */
	this.subscribe = function(evtName, fn) {
		_events[evtName] = (!_events[evtName]) ? [] : _events[evtName];
		_events[evtName].push(fn);
	};
	/**
	 * Fire a custom event and execute all subscribers!
	 *
	 * @method fire
	 * @param string The event name
	 * @return void
	 */
	this.fire = function(evtName) {
		if (_events[evtName]) {
			var len = _events[evtName].length;
			for(var i=0; i<len; i++) {
				_events[evtName][i](evtName);
			}
		}
	};
}

EDM.prototype = {
	/**
	 * Initialize the widget
	 *
	 * @method init
	 * @param void
	 * @return void
	 */
	init: function() {
		alert('please implement this method');
	},
	/**
	 * Render the widget
	 *
	 * @method render
	 * @param void
	 * @return void
	 */
	render: function() {
		alert('please implement this method');
	},
	/**
	 * Kill the widget
	 *
	 * @method destroy
	 * @param void
	 * @return void
	 */
	destroy: function() {
		var rt = document.getElementById(this.getRoot());
		rt.parentNode.removeChild(rt);
	}
};
/**
 * The True Market Value widget
 * @module TMV
 * @requires EDM
 */
(function() {
	/**
	 * The True Market Value widget
	 *
	 * @constructor
     * @class TMV
  	 * @namespace EDM
	 * @extends EDM
	 */
	EDM.TMV = function(api_key, config) {
		// Run the parent constructor
		EDM.apply(this, arguments);
		
		// Public properties
		this.vehicleApi;
		this.makes;
		this.models;
		this.year;
		this.styles;
		
		// Private properties
		var _parent_node, _makes_disabled, _makes_loading, _models_disabled, _models_loading, _years_disabled, _years_loading, _styles_disabled, _styles_loading, _aux_disabled, _aux_loading, _tmv_disabled, _tmv_loading;
		
		/**
		* Reset the widget
		*
		* @method resetAll
		* @param int level The level of reset (0 is for all, 1 is everything but Makes, 2 is everything but Makes/Models, ..etc)
		* @return void
		*/
		this.resetAll = function(level) {
			if (level < 1) {
				parent_node.replaceChild(_makes_disabled, document.getElementById(this.getBaseId() + "_makes"));
			}
			if (level < 2) {
				parent_node.replaceChild(_models_disabled, document.getElementById(this.getBaseId() + "_model"));
			}
			if (level < 3) {
				parent_node.replaceChild(_years_disabled, document.getElementById(this.getBaseId() + "_year"));
			}
			if (level < 4) {
				parent_node.replaceChild(_styles_disabled, document.getElementById(this.getBaseId() + "_style"));
			}
			if (level < 5) {
				parent_node.replaceChild(_aux_disabled, document.getElementById(this.getBaseId() + "_aux"));
			}
			if (level < 6) {
				parent_node.replaceChild(_tmv_disabled, document.getElementById(this.getBaseId() + "_tmv"));
			}
		};
		
		/**
		 * Create the Makes drop-down menu with server data
		 *
		 * @method createMakesDropDown
		 * @param void
		 * @return void
		 */
		this.createMakesDropDown = function() {
			var node = document.getElementById(this.getBaseId() + "_make");
			parent_node.replaceChild(_makes_loading, node);
			var _that = this;
			this.vehicleApi.getListOfMakes(function(data) {
				_that.makes = data['makes'];
				var myInput;

				var s = document.createElement("select");
				s.className = _that.getBaseClass() + "-make";
				s.id = _that.getBaseId() + "_make";
				s.onchange= function() {
					_that.resetAll(1);
					_that.createModelsDropDown(this);
				};
				myInput = document.createElement("option") ;
			    myInput.innerHTML = "Select a Make";
			    myInput.setAttribute("value", "");
			    s.appendChild(myInput) ;
				for (var k in _that.makes) {
					if (_that.makes.hasOwnProperty(k)) {
						myInput = document.createElement("option");
					    myInput.innerHTML = k;
					    myInput.setAttribute("value", _that.makes[k].niceName);
					    s.appendChild(myInput);
					}
				}
				parent_node.replaceChild(s, _makes_loading);
				_that.fire('makes_done');
			});
		};
		
		/**
		 * Create the Models drop-down menu with data
		 *
		 * @method createModelsDropDown
		 * @param DOMElement The selected option from the Makes drop-down menu
		 * @return void
		 */
		this.createModelsDropDown = function(obj) {
			var node = document.getElementById(this.getBaseId() + "_model");
			parent_node.replaceChild(_models_loading, node);
			if (obj.value) {
				var that = this;
				this.vehicleApi.getListOfModelsByMake(obj.value, function(data) {
					that.models = data['models'];
					var myInput;
					var s = document.createElement("select");
					s.className = that.getBaseClass() + "-model";
					s.id = that.getBaseId() + "_model";
					s.onchange= function() {
						that.resetAll(2);
						that.createYearsDropDown(this);
					};
					myInput = document.createElement("option") ;
				    myInput.innerHTML = "Select a Model";
				    myInput.setAttribute("value", "");
				    s.appendChild(myInput) ;
					for (var k in that.models) {
						if (that.models.hasOwnProperty(k)) {
							myInput = document.createElement("option");
						    myInput.innerHTML = that.models[k].name;
						    myInput.setAttribute("value", k);
						    s.appendChild(myInput);
						}
					}
					parent_node.replaceChild(s, _models_loading);
					that.fire('models_done');
				});
				_gaq.push(['_trackEvent', 'Makes', obj.value, 'A make was selected']);
			}
		};
		
		/**
		 * Create the Models drop-down menu with data
		 *
		 * @method createYearsDropDown
		 * @param 
		 * @return void
		 */
		this.createYearsDropDown = function(obj) {
			if (obj.value) {
				var node = document.getElementById(this.getBaseId() + "_year");
				parent_node.replaceChild(_years_loading, node);
				var years = this.models[obj.value].years;
				var myInput;
				var s = document.createElement("select");
				s.className = this.getBaseClass() + "-year";
				s.id = this.getBaseId() + "_year";
				var _that = this;
				s.onchange= function() {
					_that.resetAll(3);
					_that.createStylesDropDown(this);
				};
				myInput = document.createElement("option") ;
			    myInput.innerHTML = "Select a Year";
			    myInput.setAttribute("value", "");
			    s.appendChild(myInput) ;
				for (var k in years) {
					if (years.hasOwnProperty(k)) {
						var grp = document.createElement("optgroup");
					    grp.setAttribute("label", k);
						var len = years[k].length;
						for (var i=0; i < len; i++) {
							myInput = document.createElement("option");
						    myInput.innerHTML = years[k][i];
						    myInput.setAttribute("value", years[k][i]+''+k);
						    grp.appendChild(myInput);
						}
					    s.appendChild(grp);
					}
				}
				parent_node.replaceChild(s, _years_loading);
				this.fire('years_done');
				_gaq.push(['_trackEvent', 'Models', obj.value, 'A model was selected']);
			}
		};
		
		/**
		 * Create the Models drop-down menu with data
		 *
		 * @method createStylesDropDown
		 * @param 
		 * @return void
		 */
		this.createStylesDropDown = function(obj) {
			if (obj.value) {
				var node = document.getElementById(this.getBaseId() + "_style");
				parent_node.replaceChild(_styles_loading, node);
				var that = this;
				var make = document.getElementById(that.getBaseId() + "_make").value;
				var model = document.getElementById(that.getBaseId() + "_model").value;
				model = model.substring(0, model.indexOf(':'));
				this.vehicleApi.getVehicle(make, model, parseInt(obj.value), function(data) {
					that.styles = data['modelYearHolder'][0].styles;
					var myInput;
					var s = document.createElement("select");
					s.className = that.getBaseClass() + "-style";
					s.id = that.getBaseId() + "_style";
					s.onchange= function() {
						that.resetAll(4);
						that.createAuxSection(this);
					};
					myInput = document.createElement("option") ;
				    myInput.innerHTML = "Select a Style";
				    myInput.setAttribute("value", "");
				    s.appendChild(myInput) ;
					var len = that.styles.length;
					for (var i=0; i<len; i++) {
						myInput = document.createElement("option");
						myInput.innerHTML = that.styles[i].name;
						myInput.setAttribute("value", that.styles[i].id);
						s.appendChild(myInput);
					}
					parent_node.replaceChild(s, _styles_loading);
					that.fire('styles_done');
				});
				_gaq.push(['_trackEvent', 'Years', obj.value, 'A year was selected']);
			}
		};
		
		/**
		 * Create the zipcode and submit button area
		 *
		 * @method createAuxSection
		 * @param object obj The selected style from the drop-down menu
		 * @return void
		 */
		this.createAuxSection = function(obj) {
			if (obj.value) {
				var aux = document.createElement('div');
				aux.className = this.getBaseClass() + "-aux";
				aux.id = this.getBaseId() + "_aux";
				var content = "<input type='textbox' id='"+this.getBaseId()+"_zipcode' size='5' placeholder='90019'  />";
				aux.innerHTML = content;
				myInput = document.createElement("input");
				myInput.type = "submit";
				myInput.setAttribute("value", "Get Pricing Info");
				var that = this;
				myInput.onclick = function() {
					if (document.getElementById(that.getBaseId() + "_tmv")) {
						document.getElementById(that.getBaseId() + '_body').removeChild(document.getElementById(that.getBaseId() + "_tmv"));
					}
					var st = (document.getElementById(that.getBaseId() + '_year').value.indexOf('USED') === -1) ? 'calculatenewtmv' : 'calculatetypicallyequippedusedtmv';
					var zipcode = (document.getElementById(that.getBaseId() + '_zipcode').value) ? document.getElementById(that.getBaseId() + '_zipcode').value : '90019';
					_gaq.push(['_trackEvent', 'TVM', 'Click', 'TMV Value Requested']);
					that.vehicleApi.invoke('/api/tmv/tmvservice/'+st, {styleid:obj.value, zip: zipcode}, function(data) {
						var that2 = that;
						var tmv = (data.tmv.nationalBasePrice.tmv) ? data.tmv.nationalBasePrice.tmv + '' : data.tmv.nationalBasePrice.usedTmvRetail + '';
						if (tmv == '0') {
							tmv = 'N/A';
						} else {
							tmv = '$'+tmv.replace(/(\d{0,3})(\d{3})/, '$1,$2');
						}
						var aux = document.createElement('div');
						aux.className = that2.getBaseClass() + "-tmv";
						aux.id = that2.getBaseId() + "_tmv";
						aux.innerHTML = "TMV<sup>&reg;</sup>: <span class='"+that2.getBaseClass()+"-tmv-value'>"+tmv+"</span>";
						document.getElementById(that2.getBaseId() + '_body').appendChild(aux);
						_gaq.push(['_trackEvent', 'TVM', 'Received', 'TMV Value Received: '+tmv]);
					});
				};
				aux.appendChild(myInput);
				parent_node.replaceChild(aux, _aux_disabled);
				this.fire('aux_done');
				_gaq.push(['_trackEvent', 'Styles', obj.value, 'A style was selected']);
			}
		};
		
		/**
		 * Render placeholder HTML for widget
		 *
		 * @method htmlSetup
		 * @param void
		 * @return void
		 */
		this.htmlSetup = function() {
			//
			var _that = this;
			/**
			 * 
			 *
			 * @method _createPlaceholderSelect
			 * @param 
			 * @private
			 * @return void
			 */
			function _createPlaceholderSelect(type, text) {
				var sel = document.createElement('select');
				sel.id = _that.getBaseId() + '_' + type;
				sel.className = _that.getBaseClass() + '-' + type;
				sel.disabled = 'disabled';
				var opt = document.createElement("option");
			    opt.innerHTML = text;
			    opt.setAttribute("value", 0);
			    sel.appendChild(opt);
				return sel;
			}

			/**
			 * 
			 *
			 * @method _createPlaceholderDiv
			 * @param 
			 * @parivate
			 * @return void
			 */
			function _createPlaceholderDiv(type, text) {
				var sel = document.createElement('div');
				sel.id = _that.getBaseId() + '_' + type;
				sel.className = _that.getBaseClass() + '-' + type + ' disabled';
				sel.innerHTML = text;
				return sel;
			}
			
			// Create the placeholder nodes
			_makes_disabled = _createPlaceholderSelect('make', 'List of Makes');
			_makes_loading = _createPlaceholderSelect('make', 'Loading Makes ...');
			_models_disabled = _createPlaceholderSelect('model', 'List of Models');
			_models_loading = _createPlaceholderSelect('model', 'Loading Models ...');
			_years_disabled = _createPlaceholderSelect('year', 'List of Years');
			_years_loading = _createPlaceholderSelect('year', 'Loading Years ...');
			_styles_disabled = _createPlaceholderSelect('style', 'List of Styles');
			_styles_loading = _createPlaceholderSelect('style', 'Loading Styles ...');
			_aux_disabled = _createPlaceholderDiv('aux', '<input type="textbox" id="'+this.getBaseId()+'_zipcode" size="5" placeholder="90019" disabled="disabled" /><input type="submit" value="Get Pricing Info" disabled="disabled" />');
			_aux_loading = _aux_disabled;
			_tmv_disabled = _createPlaceholderDiv('tmv', 'TMV<sup>&reg;</sup>: --');
			_tmv_loading = _tmv_disabled;
			
			
			var root = document.getElementById(this.getRoot());
			var header = document.createElement('div');
			header.className = this.getBaseClass() + '-header';
			header.id = this.getBaseId() + '_header';
			header.innerHTML = '<a href="http://www.edmunds.com/" target="_blank"><img border="0" alt="Edmunds.com" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPgAAABRCAMAAADIHJsfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRFvDEzuzI5gaTI8//+eKXNAVGnuTdGuSkqLFqKCEN86fz/vCwz/v3zwywzwjI6aJG2vS45AUOCAEiQAEqOyWJqAj54NmiYRnSlFEqFATyDxDRF55SZ0FtsAEmVapfIwDE1//zt//74WYm2O3WryNjq+P/+AEaNxCgtEkd535ecyiw0R3CXi56tCk2SrTQ8yGdyvmlvtSwzAEWRAEWJBUiPAlGbAUiEyy06tjEtyE1Z1Cs4AU2RtTM1xCxD2vX+tDI8AkWaAEiS//7/wC44DEuL02NzAVGUC0WCqjtFssnXvNLr//r/AEyWyuf9AE2auENL02VrA1GJuVNbUJDKvNb0AEmZq8nkrCwzuUlUAEmJyDI8HleV8JmiDUqDui9Bm7nYpLLCtCw6AEaV//z+AEqS1e38ncXlqSgpznyGBUmJx9HbJU56AEGIAEKNrUFJwC8+AE2eAU2OwSUzlr7lvSYx/fbzBUaJAEmeClGVgarQ+///R3ux1ISKBkqRBUqVCVKd9fzyyR8q//X9uF1lHFKJBU6VBU6SUHymwjc9yHF5ySU1CkSJ3aCtxi43//770DI5//n4yoaL6294BUWN5a60vB0s5e77CUWSxyo6uM7l4YeQBEaSFEFth7Hbq9X8DEqYsjg0yDE0+Pr/F0ePszg/1uPn//v72ZmkAEGR1DZBvDc+wCo313B7AEuP41puAE2JAkuT+v/5zSc5mrTPuzo0vCY5yOTuB02JAEKWxS4++vr38/j+A0aUxCY6BU2YyCo+yTk8BUmY+/v79PT1F16jtSQur0hQ0y0/B02Ouz5QxTAuA0qP+/z/lqbRsTYtsiQ6Z4Sqri9BXYag/P/72aCbA0mRBEOH2ODeG05/yDdLe5++VmyjBUKQBT+MpsrytUA3CEaXEVWZkLHG1ZGRjarLozM7v9z7e6/Z5uvk7sO+wTc1PnyzkMDM+fLrBT1uA059s19hQ4DAzoiR0JeUMlyd3j1Nq9TosM/uwis6AkahBUyc4OPbiqTCBEGYLXG7////zeB8GQAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAABzsSURBVHja7JsNXBNX1v8Th9e8kUzktY0h6gyIBU0mCWgikAkFNTG+1BQTC5Ykto0mEigEiAWsAlJoIl1apcWugiyLpCyBSgVUBK2VAmt1WVlla6tbt90/+6/tbvtssY9t/nfCS1e79qluP/8HP9sLyuTOeJnv/Z1z7jl3RpL7P7SRfgb/Gfxn8J/B/7fbV5uuz5o1y8tr1p2tgPhrdOL4+pub3rxeMH3q+pu3DXHr1pMPHHhASlKlyWQWCDjwHQ1FzRhaPSKc+GQwuCb7Cwur940ElsybHuL8Vq/R8/sfMPCtLG8DaEqlUmK4oyllymQDO/nOboPFkge+BbDf5BBeCwtGC365ausDBb61UpXXlNhXe+VKZWXLHe143xXzgdrqfXd0s0cCWUYU5ahNaRNjlHz1t9+Nhmx+/fwDBP4lqhMUXZrn9UmB1+j3XNxrbuTWOa9/3/e9vAq8tpdYq705kZ5B/KBvA34b+d+btz444N+aP8MO3Tpts9mGh9va2oZtNhzn8fBwGvKqV8HoJ3MjL835BIC/itTb6vEqfLLR2rod+qE3/SqzRNc8s4fMCyiZE/4AgQebhKFB/4Bs+JDNhiA2T8OHHfV4/crIa1dS2BKWpqxVM5i0fz5+Gs/l2SYbrhjS02hQfNAVzWdBYJhrr25fubLkV588OKaehF37cjOk5/G6gZp63OHA8cZuGm9oBxRQ+U2nSCkziGC0lH0z6RbuyHXwptqOYfzT3FzHECXos7Whc93uTxbO2Qs9W3D01QcF/P21wkMU5FNaOI/nwBUKvcNRpcD1DhpQ83eB3qpkmRKGXTC70Nt8S+HAIQoy2SAKBNn0n+oRoLkllFjOvjx/a/fWpx6UqL4wD0v5GGpUhEPx819dOdXmx0P6bujxkKt9IzIV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" /></a>';
			root.appendChild(header);
			var body = document.createElement('div');
			body.className = this.getBaseClass() + '-body';
			body.id = this.getBaseId() + '_body';
			body.appendChild(_makes_disabled);
			body.appendChild(_models_disabled);
			body.appendChild(_years_disabled)
			body.appendChild(_styles_disabled);
			body.appendChild(_aux_disabled);
			body.appendChild(_tmv_disabled);
			root.appendChild(body);
			// Cache parent node
			parent_node = body;
		};
	};

	EDM.TMV.prototype = new EDM;
	
	var proto = EDM.TMV.prototype;
	
	/**
	 * 
	 *
	 * @method init
	 * @param void
	 * @return void
	 */
	proto.init = function() {
		// Set up the bare minimum HTML elements
		this.htmlSetup();
		this.vehicleApi = new EDMUNDSAPI.Vehicle(this.getApiKey());
		this.fire('init_complete');
		_gaq.push(['_trackPageview']);
		_gaq.push(['_trackEvent', 'Widgets', 'TMV Simple', 'A simple TMV widget']);
	};
	
	/**
	 * 
	 *
	 * @method render
	 * @param void
	 * @return void
	 */
	proto.render = function() {
		this.createMakesDropDown();
		this.fire('render_complete');
	};
	
	// Add analytics!
	window._gaq = window._gaq || [];
	_gaq.push(['_setAccount', 'UA-24637375-1']);
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();