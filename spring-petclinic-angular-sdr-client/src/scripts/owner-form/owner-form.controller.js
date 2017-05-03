'use strict';

angular.module('ownerForm')
    .controller('OwnerFormController', ["api", '$state', '$stateParams', 'responseHandler', function (api, $state, $stateParams, responseHandler) {
        var self = this;

        var ownerId = $stateParams.ownerId || 0;

        var submitLink = null;
        
        if (!ownerId) {
            self.owner = {};
            api()
	    		.getResource().result
	    		.then(function(api){
	    			submitLink = api._links['owners'];
	    		});
        } else {
        	api()
        		.follow('owners', 'owners[id:' + ownerId + ']')
        		.getResource().result
        		.then(function(owner){        			
        			submitLink = owner._links['owner'];
        			delete owner._links;
        			self.owner = owner;
        		});
        }
        
        var onSuccess = responseHandler.onSuccess(function(response){
        	$state.go('owners');
        });
        
        self.submitOwnerForm = function () {
            var id = self.owner.id;
            var req = null;
            if (id) {
            	req = api(submitLink.href)
            		.put(self.owner);
            } else {
                req = api(submitLink.href)
                	.post(self.owner);
            }

            req.result
	            .then(onSuccess, responseHandler.onError);
        };
    }]);
