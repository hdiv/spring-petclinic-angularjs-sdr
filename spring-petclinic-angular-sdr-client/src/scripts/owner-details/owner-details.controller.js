'use strict';

angular.module('ownerDetails')
    .controller('OwnerDetailsController', ['api', '$stateParams', function (api, $stateParams) {
        var self = this;

        api()
            .follow('owners',
	        		'owners[nid:' + $stateParams.ownerId + ']'
	        		)
	        .withTemplateParameters({projection: 'withPets'})
	        .getResource().result
	        .then(function(owner){
	        	self.owner = owner;
	        });
        
    }]);
