'use strict';

angular.module('visits')
    .controller('VisitsController', ['api', '$state', '$stateParams', '$filter', 'responseHandler', function (api, $state, $stateParams, $filter, responseHandler) {
        var self = this;
        var petId = $stateParams.petId || 0;
        var ownerId = $stateParams.ownerId || 0;
        
        self.date = new Date();
        self.desc = "";

        var petUri;
        var submitUrl;
        
        var req = api().getResource();        
        req.result
        	.then(function(api){
        		submitUrl = api._links['visits'].href;
        	});
        
        req.continue()
        	.then(function(next){
        		var req2 = next
	        		.follow('owners', 
	        				'owners[id:' + ownerId + ']', 
	        				'pets', 
	        				'pets[id:' + petId + ']')
	    			.withTemplateParameters({projection: 'inline'})
	    			.getResource();
        		
        		req2.result
	    			.then(function(pet){
	    				petUri = pet._links['self'].href;
	    			});
	    		req2.continue()
	    			.then(function(next){
	    				return next
	            			.follow('visits')
	            			.getResource().result;
	    			})
	    			.then(function(visits){
	            		self.visits = visits._embedded['visits'];        		
	            	});
        	});
		
        
        var onSuccess = responseHandler.onSuccess(function(response){
			$state.go("owners", { ownerId: $stateParams.ownerId });
		});
        
        self.submit = function () {
            var data = {
                date: self.date, // $filter('date')(self.date, "yyyy-MM-dd"),
                description: self.desc,
                pet: petUri
            };
            
            api(submitUrl)
            	.post(data)
            	.result
            	.then(onSuccess, responseHandler.onError);
        };
    }]);
