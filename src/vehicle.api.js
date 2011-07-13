/**
 * The Vehicle API commonly used methods and structures
 * @module Vehicle
 * @requires EDMUNDSAPI
 */
(function() {
	if (!window.EDMUNDSAPI) throw new Error('Edmunds API: Core class is not loaded.');
	
	/**
	 * Vehice Data and Repositories
	 *
	 * @constructor
     * @class Vehicle
  	 * @namespace EDMUNDSAPI
	 * @extends EDMUNDSAPI
	 */
	window.EDMUNDSAPI.Vehicle = function(key) {
		window.EDMUNDSAPI.apply(this, arguments);
	};
	
	window.EDMUNDSAPI.Vehicle.prototype = new window.EDMUNDSAPI;
	var proto = window.EDMUNDSAPI.Vehicle.prototype;
	
	//========================================================= GENERICS
	/**
	* Get a list of available makes in this particular year
	*
	* @method getListOfMakes
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getListOfMakes = function(callback) {
		return this.invoke('/api/vehicle-directory-ajax/findmakes', {}, callback);
	};
	/**
	* Get a list of available models of a particular make in this particular year
	*
	* @method getListOfModelsByMake
	* @param string make The vehicle make (use niceName value)
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getListOfModelsByMake = function(make, callback) {
		return this.invoke('/api/vehicle-directory-ajax/findmakemodels', {"make": make}, callback);
	};
	/**
	* Get a list of available vehicle types (will return an array)
	*
	* @method getListOfTypes
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getListOfTypes = function(callback) {
		return this.invoke('/api/vehicle/stylerepository/findallvehicletypes', {}, callback);
	};
	/**
	* Get a the details on a particular vehicle
	*
	* @method getVehicle
	* @param string make The vehicle make (use niceName value)
	* @param string model The vehicle model (use niceName value)
	* @param int year The year of the make/model
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getVehicle = function(make, model, year, callback) {
		return this.invoke('/api/vehicle/modelyearrepository/foryearmakemodel', {"make":make, "model":model, "year":year}, callback);
		//return this.invoke('/api/vehicle/'+make+'/'+model+'/'+year, {}, callback);
	};
	
	//========================================================= Make Repository Calls
	/**
	* Get a list of all makes in our databases
	*
	* @method getMakes
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getMakes = function(callback) {
		return this.invoke('/api/vehicle/makerepository/findall', {}, callback);
	};
	/**
	* Get a list of available makes in this particular year
	*
	* @method getMakesByYear
	* @param int year The year of the make
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getMakesByYear = function(year, callback) {
		return this.invoke('/api/vehicle/makerepository/findmakesbymodelyear', {"year": year}, callback);
	};
	/**
	* Get a list of available makes in this particular year
	*
	* @method getMakesByState
	* @param string state The state of the make (new|used|future)
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getMakesByState = function(state, callback) {
		return this.invoke('/api/vehicle/makerepository/findmakesbypublicationstate', {"state": state}, callback);
	};
	/**
	* Get a list of new makes only
	*
	* @method getNewMakes
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getNewMakes = function(callback) {
		return this.invoke('/api/vehicle/makerepository/findnewmakes', {}, callback);
	};
	/**
	* Get a list of used makes only
	*
	* @method getUsedMakes
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getUsedMakes = function(callback) {
		return this.invoke('/api/vehicle/makerepository/findusedmakes', {}, callback);
	};
	/**
	* Get a list of all future makes
	*
	* @method getFutureMakes
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getFutureMakes = function(callback) {
		return this.invoke('/api/vehicle/makerepository/findfuturemakes', {}, callback);
	};
	/**
	* Get a the details of a particular make
	*
	* @method getMakeById
	* @param int id The id of the make
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getMakeById = function(id, callback) {
		return this.invoke('/api/vehicle/makerepository/findbyid', {"id": id}, callback);
	};
	/**
	* Get the details of a particular name
	*
	* @method getMakeByName
	* @param string name The name of the make (use niceName value)
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getMakeByName = function(name, callback) {
		return this.invoke('/api/vehicle/makerepository/findmakebyname', {"name": name}, callback);
		//return this.invoke('/api/vehicle/'+name, {}, callback);
	};
	
	//========================================================= Model Repository Calls
	/**
	* Get model details for a particular make and year
	*
	* @method getModelsByMakeAndYear
	* @param string make The vehicle make (use niceName value)
	* @param string year The vehicle year
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getModelsByMakeAndYear = function(make, year, callback) {
		return this.invoke('/api/vehicle/modelrepository/findmodelsbymakeandyear', {"make": make, "year": year}, callback);
	};
	/**
	* Get model details for a particular make and a publication state
	*
	* @method getModelsByMakeAndState
	* @param string make The vehicle make (use niceName value)
	* @param string state The vehicle publication state (new|used|future)
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getModelsByMakeAndState = function(make, state, callback) {
		return this.invoke('/api/vehicle/modelrepository/findmodelsbymakeandpublicationstate', {"make": make, "state": state}, callback);
	};
	/**
	* Get model details for a specific make ID
	*
	* @method getModelsByMakeId
	* @param int id The make ID
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getModelsByMakeId = function(id, callback) {
		return this.invoke('/api/vehicle/modelrepository/findbymakeid', {"makeid": id}, callback);
	};
	/**
	* Get model details for a speicifc make name
	*
	* @method getModelsByMakeName
	* @param string name The make name (use niceName value)
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getModelsByMakeName = function(name, callback) {
		return this.invoke('/api/vehicle/modelrepository/findmodelsbymake', {"make": name}, callback);
	};
	/**
	* Get list of future models for a specific make ID
	*
	* @method getFutureModelsByMakeId
	* @param int id The make ID
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getFutureModelsByMakeId = function(id, callback) {
		return this.invoke('/api/vehicle/modelrepository/findfuturemodelsbymakeid', {"makeId": id}, callback);
	};
	/**
	* Get list of used models for a specific make ID
	*
	* @method getUsedModelsByMakeId
	* @param int id The make ID
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getUsedModelsByMakeId = function(id, callback) {
		return this.invoke('/api/vehicle/modelrepository/findusedmodelsbymakeid', {"makeId": id}, callback);
	};
	/**
	* Get list of new models for a specific make ID
	*
	* @method getNewModelsByMakeId
	* @param int id The make ID
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getNewModelsByMakeId = function(id, callback) {
		return this.invoke('/api/vehicle/modelrepository/findnewmodelsbymakeid', {"makeId": id}, callback);
	};
	/**
	* Get mode details for this specific model ID
	*
	* @method getModelById
	* @param int id The model ID
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getModelById = function(id, callback) {
		return this.invoke('/api/vehicle/modelrepository/findbyid', {"id": id}, callback);
	};
	/**
	* Get model details for a specific make and model names
	*
	* @method getModelByMakeAndModelName
	* @param string make The make name (use niceName value)
	* @param string model The model name (use niceName value)
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getModelByMakeAndModelName = function(make, model, callback) {
		return this.invoke('/api/vehicle/modelrepository/findmodelbymakemodelname', {"make": make, "model": model}, callback);
		//return this.invoke('/api/vehicle/'+make+'/'+model, {}, callback);
	};
	
	//========================================================= Model Year Repository
	/**
	* Get a list of model years of a particular vehicle by the model year ID
	*
	* @method getModelYearById
	* @param int id The model year ID
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getModelYearById = function(id, callback) {
		return this.invoke('/api/vehicle/modelyearrepository/findbyid', {"id": id}, callback);
	};
	/**
	* Get a list of years that have new vehicles listed in them
	*
	* @method getListOfYearsWithNew
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getListOfYearsWithNew = function(callback) {
		return this.invoke('/api/vehicle/modelyearrepository/finddistinctyearwithnew', {}, callback);
	};
	/**
	* Get a list of years that have both new and used vehicles listed in them
	*
	* @method getListOfYearsWithNewOrUsed
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getListOfYearsWithNewOrUsed = function(callback) {
		return this.invoke('/api/vehicle/modelyearrepository/finddistinctyearwithneworused', {}, callback);
	};
	/**
	* Get a list of years that have used vehicles listed in them
	*
	* @method getListOfYearsWithUsed
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getListOfYearsWithUsed = function(callback) {
		return this.invoke('/api/vehicle/modelyearrepository/finddistinctyearwithused', {}, callback);
	};
	/**
	* Get a list of future model years of a particular vehicle by the model ID
	*
	* @method getFutureModelYearsByModelId
	* @param int modelId The model ID
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getFutureModelYearsByModelId = function(modelId, callback) {
		return this.invoke('/api/vehicle/modelyearrepository/findfuturemodelyearsbymodelid', {"modelId": modelId}, callback);
	};
	/**
	* Get a list of model years of a particular vehicle by the make and year of production
	*
	* @method getModelYearsByMakeAndYear
	* @param string make The make name (use niceName value)
	* @param int year The four-digit year
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getModelYearsByMakeAndYear = function(make, year, callback) {
		return this.invoke('/api/vehicle/modelyearrepository/findmodelyearsbymakeandyear', {"make": make, "year": year}, callback);
	};
	/**
	* Get a list of model years of a particular vehicle by the make and model of the vehicle
	*
	* @method getModelYearsByMakeAndModel
	* @param string make The make name (use niceName value)
	* @param string model The model name (use niceName value)
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getModelYearsByMakeAndModel = function(make, model, callback) {
		return this.invoke('/api/vehicle/modelyearrepository/findmodelyearsbymakemodel', {"make": make, "model": model}, callback);
	};
	/**
	* Get a list of model years of a particular vehicle by the make ID and the year of production
	*
	* @method getNewAndUsedModelYearsByMakeIdAndYear
	* @param int makeId The make ID
	* @param int year The 4-digit year
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getNewAndUsedModelYearsByMakeIdAndYear = function(makeId, year, callback) {
		return this.invoke('/api/vehicle/modelyearrepository/findnewandusedmodelyearsbymakeidandyear', {"makeid": makeId, "year": year}, callback);
	};
	/**
	* Get a list of new model years of a particular vehicle by the model ID
	*
	* @method 
	* @param int modelId The model ID
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getNewModelYearsByModelId = function(modelId, callback) {
		return this.invoke('/api/vehicle/modelyearrepository/findnewmodelyearsbymodelid', {"modelId": modelId}, callback);
	};
	/**
	* Get a list of used model years of a particular vehicle by the model ID
	*
	* @method 
	* @param int modelId The model ID
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getUsedModelYearsByModelId = function(modelId, callback) {
		return this.invoke('/api/vehicle/modelyearrepository/findusedmodelyearsbymodelid', {"modelId": modelId}, callback);
	};
	/**
	* Get a list of model years of a particular vehicle by the vehicle's category and state (i.e. new, used or future)
	*
	* @method getModelYearsByCatAndState
	* @param string category The vehicle category (i.e. Sedan, suv, truck, ..etc)
	* @param string state The publication state (used|new|future)
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getModelYearsByCatAndState = function(category, state, callback) {
		return this.invoke('/api/vehicle/modelyearrepository/findyearsbycategoryandpublicationstate', {"category": category, "state": state}, callback);
	};
	/**
	* Get a list of model years of a particular vehicle by the model's ID
	*
	* @method getModelYearsByModelId
	* @param int modelId The model id
	* @param function callback The callback function to be invoked when the response is returned (JSONP implementation)
	* @return {string} The URL of the REST call to Edmunds' API Service
	*/
	proto.getModelYearsByModelId = function(modelId, callback) {
		return this.invoke('/api/vehicle/modelyearrepository/formodelid', {"modelid": modelId}, callback);
	};
})();