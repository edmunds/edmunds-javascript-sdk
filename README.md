# Edmunds JavaScript SDK

The Edmunds JavaScript SDK is an Open Source tool that allows you to utilize 
Edmunds data on your website. Except as otherwise noted, the Edmunds JavaScript
SDK is licensed under the [Apache 2.0 License.][license]

## Quick Start

Instantiate the Vehicle API class and use its methods to get access to Edmunds' data:

	// Instantiate the Vehicle class
	var vehicle_api = new EDMUNDSAPI.Vehicle(api_key);
	// Get a list of all makes available on Edmunds.com
	vehicle_api.getAllMakes(function(data) {
		alert('Hi, I'm a callback function that is invoked when the API returns a response.');
		// The data object is the JSON object returned by the API
		console.log(data);
	});

## What's on Here

- docs/: The SDK documentation
- examples/: HTML examples of how to use the SDK
- src/: The SDK files
- tests/: Unit tests
- widgets/: Ready to use widgets built on top of the SDK
- .gitignore: Runtime files and folders that do not need to be part of this repository
- LICENSE: License agreement for using this SDK
- NOTICE: A reference to the License Agreement
- README.md: You're looking at it :)

## SDK Status

This is a *beta* release. We have opened sourced it at this stage to guide the 
development of the library and allow you to freely inspect and use the source.

## Documentation

The API documentation is available to the public APIs [here][docs].

[license]: http://www.apache.org/licenses/LICENSE-2.0.html "Apache 2.0 License"
[docs]: http://developer.edmunds.com/docs "API Documentation"