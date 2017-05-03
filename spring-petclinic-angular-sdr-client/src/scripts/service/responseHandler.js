'use strict';

angular.module('petClinicApp')
  .service('responseHandler', function() {
	  
	var hasError = function(response) {
		return response.status && response.status != 201 && response.status != 200;
	}
	  
	var show = function(response){
		if (response && response.data) {
			var error = JSON.parse(response.data);
			alert(error.message);
		}
	};
	  
	var onSuccess = function(cb, response) {
		console.log(response);
		if (hasError(response)) {
			show(response)
		} else {
		  	cb(response);
		}
	};
	  
	return {
		onSuccess: function(cb){
			return onSuccess.bind(this, cb);
		},
		hasError: function(response){
			return hasError(response);
		},
		onError: function (response) {
			return show(response);
		}
    };
});