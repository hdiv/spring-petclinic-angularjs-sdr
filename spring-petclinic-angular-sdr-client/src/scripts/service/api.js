'use strict';

angular.module('petClinicApp')
  .factory('api', ['traverson', function(traverson) {
	  
    traverson.registerMediaType(TraversonJsonHalAdapter.mediaType, TraversonJsonHalAdapter);
    var defaultHeaders = {
      'accept': 'application/hal+json',
      'Content-Type': 'application/hal+json'
    };

    return function(url, options){
      url = url || '/api';

      var headers = options && options.headers ? angular.extend(defaultHeaders, options.headers) : defaultHeaders;

      return traverson
        .from(url)
        .jsonHal()
        .useAngularHttp()
        .newRequest();
    };
  }]);
