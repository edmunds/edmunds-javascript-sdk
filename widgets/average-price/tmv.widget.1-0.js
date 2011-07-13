function EDM(api_key, config) {
	var _api_key = api_key;
	var _config = config;
	var _head = document.getElementsByTagName('head')[0];
	var _events = {};
	var _loading = 0;
	var _base_id = "edm"+new Date().getTime();
	
	this.getApiKey = function() {
		return _api_key;
	};
	this.getRoot = function() {
		return _config.root;
	};
	this.getBaseId = function() {
		return _base_id;
	};
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
	this.subscribe = function(evtName, fn) {
		_events[evtName] = (!_events[evtName]) ? [] : _events[evtName];
		_events[evtName].push(fn);
	};
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
	init: function() {
		if (!window.EDMUNDSAPI) {
			this.addScript('../../src/core.api.js');
		}
	},
	render: function() {
		alert('please implement this method');
	},
	destroy: function() {
		var rt = document.getElementById(this.getRoot());
		rt.parentNode.removeChild(rt);
	}
};

(function() {
	EDM.TMV = function(api_key, config) {
		EDM.apply(this, arguments);
		
		this.vehicleApi;
		this.makes;
		this.models;
		this.year;
		this.styles;
		
		this.createMakesDropDown = function() {
			var that = this;
			var myInput;
			var s = document.createElement("select");
			s.className = "edm-makeList";
			s.id = this.getBaseId() + "_make";
			s.onchange= function() {
				if (document.getElementById(that.getBaseId() + "_model")) {
					document.getElementById(that.getRoot()).removeChild(document.getElementById(that.getBaseId() + "_model"));
				}
				if (document.getElementById(that.getBaseId() + "_year")) {
					document.getElementById(that.getRoot()).removeChild(document.getElementById(that.getBaseId() + "_year"));
				}
				if (document.getElementById(that.getBaseId() + "_style")) {
					document.getElementById(that.getRoot()).removeChild(document.getElementById(that.getBaseId() + "_style"));
				}
				if (document.getElementById(that.getBaseId() + "_aux")) {
					document.getElementById(that.getRoot()).removeChild(document.getElementById(that.getBaseId() + "_aux"));
				}
				if (document.getElementById(that.getBaseId() + "_tmv")) {
					document.getElementById(that.getRoot()).removeChild(document.getElementById(that.getBaseId() + "_tmv"));
				}
				that.createModelsDropDown(this);
			};
			myInput = document.createElement("option") ;
		    myInput.text = "Select a Make";
		    myInput.setAttribute("value", "");
		    s.appendChild(myInput) ;
			for (var k in that.makes) {
				if (that.makes.hasOwnProperty(k)) {
					myInput = document.createElement("option");
				    myInput.text = k;
				    myInput.setAttribute("value", that.makes[k].niceName);
				    s.appendChild(myInput);
				}
			}
			document.getElementById(this.getRoot()).appendChild(s);
			that.fire('makes_done');
		};
		this.createModelsDropDown = function(obj) {
			if (obj.value) {
				var that = this;
				this.vehicleApi.getListOfModelsByMake(obj.value, function(data) {
					that.models = data['models'];
					var myInput;
					var s = document.createElement("select");
					s.className = "edm-modelList";
					s.id = that.getBaseId() + "_model";
					s.onchange= function() {
						if (document.getElementById(that.getBaseId() + "_year")) {
							document.getElementById(that.getRoot()).removeChild(document.getElementById(that.getBaseId() + "_year"));
						}
						if (document.getElementById(that.getBaseId() + "_style")) {
							document.getElementById(that.getRoot()).removeChild(document.getElementById(that.getBaseId() + "_style"));
						}
						if (document.getElementById(that.getBaseId() + "_aux")) {
							document.getElementById(that.getRoot()).removeChild(document.getElementById(that.getBaseId() + "_aux"));
						}
						if (document.getElementById(that.getBaseId() + "_tmv")) {
							document.getElementById(that.getRoot()).removeChild(document.getElementById(that.getBaseId() + "_tmv"));
						}
						that.createYearsDropDown(this);
					};
					myInput = document.createElement("option") ;
				    myInput.text = "Select a Model";
				    myInput.setAttribute("value", "");
				    s.appendChild(myInput) ;
					for (var k in that.models) {
						if (that.models.hasOwnProperty(k)) {
							myInput = document.createElement("option");
						    myInput.text = that.models[k].name;
						    myInput.setAttribute("value", k);
						    s.appendChild(myInput);
						}
					}
					document.getElementById(that.getRoot()).appendChild(s);
					that.fire('models_done');
				});
			}
		};
		this.createYearsDropDown = function(obj) {
			if (obj.value) {
				var years = this.models[obj.value].years;
				var myInput;
				var s = document.createElement("select");
				s.className = "edm-yearList";
				s.id = this.getBaseId() + "_year";
				var that = this;
				s.onchange= function() {
					if (document.getElementById(that.getBaseId() + "_style")) {
						document.getElementById(that.getRoot()).removeChild(document.getElementById(that.getBaseId() + "_style"));
					}
					if (document.getElementById(that.getBaseId() + "_aux")) {
						document.getElementById(that.getRoot()).removeChild(document.getElementById(that.getBaseId() + "_aux"));
					}
					if (document.getElementById(that.getBaseId() + "_tmv")) {
						document.getElementById(that.getRoot()).removeChild(document.getElementById(that.getBaseId() + "_tmv"));
					}
					that.createStylesDropDown(this);
				};
				myInput = document.createElement("option") ;
			    myInput.text = "Select a Year";
			    myInput.setAttribute("value", "");
			    s.appendChild(myInput) ;
				for (var k in years) {
					if (years.hasOwnProperty(k)) {
						var grp = document.createElement("optgroup");
					    grp.setAttribute("label", k);
						var len = years[k].length;
						for (var i=0; i < len; i++) {
							myInput = document.createElement("option");
						    myInput.text = years[k][i];
						    myInput.setAttribute("value", years[k][i]+''+k);
						    grp.appendChild(myInput);
						}
					    s.appendChild(grp);
					}
				}
				document.getElementById(this.getRoot()).appendChild(s);
				that.fire('years_done');
			}
		};
		
		this.createStylesDropDown = function(obj) {
			if (obj.value) {
				var that = this;
				var make = document.getElementById(that.getBaseId() + "_make").value;
				var model = document.getElementById(that.getBaseId() + "_model").value;
				model = model.substring(0, model.indexOf(':'));
				this.vehicleApi.getVehicle(make, model, parseInt(obj.value), function(data) {
					that.styles = data['modelYearHolder'][0].styles;
					var myInput;
					var s = document.createElement("select");
					s.className = "edm-styleList";
					s.id = that.getBaseId() + "_style";
					s.onchange= function() {
						if (document.getElementById(that.getBaseId() + "_aux")) {
							document.getElementById(that.getRoot()).removeChild(document.getElementById(that.getBaseId() + "_aux"));
						}
						if (document.getElementById(that.getBaseId() + "_tmv")) {
							document.getElementById(that.getRoot()).removeChild(document.getElementById(that.getBaseId() + "_tmv"));
						}
						that.createAuxSection(this);
					};
					myInput = document.createElement("option") ;
				    myInput.text = "Select a Style";
				    myInput.setAttribute("value", "");
				    s.appendChild(myInput) ;
					var len = that.styles.length;
					for (var i=0; i<len; i++) {
						myInput = document.createElement("option");
						myInput.text = that.styles[i].name;
						myInput.setAttribute("value", that.styles[i].id);
						s.appendChild(myInput);
					}
					document.getElementById(that.getRoot()).appendChild(s);
					that.fire('styles_done');
				});
			}
		};
		
		this.createAuxSection = function(obj) {
			if (obj.value) {
				var aux = document.createElement('div');
				aux.id = this.getBaseId() + "_aux";
				var content = "<input type='textbox' id='"+this.getBaseId()+"_zipcode' size='5' placeholder='90019'  />";
				aux.innerHTML = content;
				myInput = document.createElement("input");
				myInput.type = "submit";
				myInput.setAttribute("value", "Get Pricing Info");
				var that = this;
				myInput.onclick = function() {
					if (document.getElementById(that.getBaseId() + "_tmv")) {
						document.getElementById(that.getRoot()).removeChild(document.getElementById(that.getBaseId() + "_tmv"));
					}
					var st = (document.getElementById(that.getBaseId() + '_year').value.indexOf('USED') === -1) ? 'calculatenewtmv' : 'calculatetypicallyequippedusedtmv';
					var zipcode = (document.getElementById(that.getBaseId() + '_zipcode').value) ? document.getElementById(that.getBaseId() + '_zipcode').value : '90019';
					that.vehicleApi.invoke('/api/tmv/tmvservice/'+st, {styleid:obj.value, zip: zipcode}, function(data) {
						var that2 = that;
						var tmv = (data.tmv.nationalBasePrice.tmv) ? data.tmv.nationalBasePrice.tmv : data.tmv.nationalBasePrice.usedTmvRetail;
						var aux = document.createElement('div');
						aux.id = that2.getBaseId() + "_tmv";
						aux.innerHTML = "Average Price: <span class='"+that2.getBaseId()+"_tmv_value'>$"+tmv+"</span>";
						document.getElementById(that2.getRoot()).appendChild(aux);
					});
				};
				aux.appendChild(myInput);
				document.getElementById(this.getRoot()).appendChild(aux);
				this.fire('aux_done');
			}
		};
	};

	EDM.TMV.prototype = new EDM;
	
	var proto = EDM.TMV.prototype;
	
	proto.init = function() {
		EDM.prototype.init.apply(this);
		this.addScript('../../src/vehicle.api.js');
		var that = this;
		this.subscribe('loading_complete', function() {
			that.vehicleApi = new EDMUNDSAPI.Vehicle(that.getApiKey());
			that.vehicleApi.getListOfMakes(function(data) {
				that.makes = data['makes'];
				that.fire('init_complete');
			});
		});
	};
	
	proto.render = function() {
		this.createMakesDropDown();
		this.fire('render_complete');
	};
})();