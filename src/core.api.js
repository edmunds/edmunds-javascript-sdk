/**
 * Core functionality for the Edmunds API JavaScript SDK
 *
 * @class EDMUNDSAPI
 */
function EDMUNDSAPI(key) {
	/**
	 * Assigned API Key. Register for an API Key <a href="http://developer.edmunds.com/apps/register">here</a> 
	 *
	 * @config _api_key
	 * @private
	 * @type string
	 */
	var _api_key = key;
	/**
	 * The API version
	 *
	 * @config _api_version
	 * @private
	 * @type string
	 */
	var _api_version = "v1";
	/**
	 * The base URL for the API
	 *
	 * @property _base_url
	 * @private
	 * @type string
	 */
	var _base_url = "http://api.edmunds.com/";
	/**
	 * The API response format
	 *
	 * @property _response_format
	 * @private
	 * @type string
	 */
	var _response_format = 'json';
	/**
	 * The document HEAD element
	 *
	 * @property _head
	 * @private
	 * @type object
	 */
	var _head = document.getElementsByTagName('head')[0];
	
	/**
	 * The base URL for the API
	 *
	 * @method _serializeParams
	 * @private
	 * @param object JSON object of parameters and their values
	 * @return {string} Serialized parameters in the form of a query string
	 */
	function _serializeParams(params) {
		var str = '';
		for(var key in params) {
			if(params.hasOwnProperty(key)) {
				if (str !== '') str += "&";
		   		str += key + "=" + params[key];
			}
		}
		return str;
	}

	/**
	 * The base URL for the API
	 *
	 * @method getBaseUrl
	 * @param void
	 * @return {string} API URL stub
	 */
	this.getBaseUrl = function() {
		return _base_url + _api_version;
	};
	/**
	 * The base URL for the API
	 *
	 * @method getVersion
	 * @param void
	 * @return {string} API version
	 */
	this.getVersion = function() {
		return _api_version;
	};
	/**
	 * The base URL for the API
	 *
	 * @method setVersion
	 * @param void
	 * @return {string} API version
	 */
	this.setVersion = function(version) {
		_api_version = version;
		return _api_version;
	};
	/**
	 * Make the API REST call
	 *
	 * @method invoke
	 * @param string method The API method to be invoked
	 * @param object params JSON object of method parameters and their values
	 * @param function callback The JavaScript function to be invoked when the results are returned (JSONP implementation)
	 * @return {string} API REST call URL
	 */
	this.invoke = function(method, params, callback) {
		var qs = _serializeParams(params);
		var url = this.getBaseUrl();
		var uniq = 'cb'+new Date().getTime();
		EDMUNDSAPI[uniq] = callback;
		qs = (qs) ? '?' + qs + '&api_key=' + _api_key + "&fmt=" + _response_format : '?api_key=' + _api_key + "&fmt=" + _response_format;
		var rest_call = url + method + qs + "&callback=EDMUNDSAPI."+uniq;
		var js = document.createElement('script');
		js.type = 'text/javascript';
		js.src = rest_call;
		_head.appendChild(js);
		return rest_call;
	}
}