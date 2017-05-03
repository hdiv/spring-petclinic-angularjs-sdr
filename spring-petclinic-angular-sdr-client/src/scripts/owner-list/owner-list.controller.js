'use strict';

angular.module('ownerList')
    .controller('OwnerListController', [ 'api', function (api) {
        var self = this;
        
        var rel = 'owners';
        api()
	        .follow(rel)
	        .withTemplateParameters({projection: 'withPets'})
	        .getResource().result
	        .then(function(response){
	        	self.owners = response._embedded[rel];
	        });
    }]);

        