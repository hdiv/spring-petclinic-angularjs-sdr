'use strict';

angular.module('vetList')
    .controller('VetListController', ['api', function (api) {
        var self = this;

        api()
        	.follow('vets')
        	.getResource().result
        	.then(function(vets) {
        		self.vetList = vets._embedded['vets'];
        	});
        
    }]);
