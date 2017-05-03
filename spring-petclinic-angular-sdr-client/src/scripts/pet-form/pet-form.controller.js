'use strict';

angular.module('petForm')
    .controller('PetFormController', ['api', '$state', '$stateParams', 'responseHandler', function (api, $state, $stateParams, responseHandler) {
        var self = this;
        var ownerId = $stateParams.ownerId || 0;

        var ownerUri;
        var submitUrl;
        api()
        	.follow('petTypes')
        	.getResource().result
        	.then(function(petTypes){
        		self.types = petTypes._embedded['petTypes'];
        	})
        	.then(function(){
        		
        		var petId = $stateParams.petId || 0;

                if (petId) { // edit
                	api()
                		.follow('owners', 
                				'owners[nid:' + ownerId + ']', 
                				'pets', 
                				'pets[nid:' + petId + ']',
                				'pet')
                		.withTemplateParameters({projection: 'inline'})
                		.getResource().result
                		.then(function(pet){
                			self.pet = pet;
                			self.owner = pet.owner.firstName + ' ' + pet.owner.lastName;
                			
                            self.pet.birthDate = new Date(self.pet.birthDate);
                            self.petTypeId = '' + self.pet.type.nid;
                            
                            submitUrl = pet._links['self'].href;
                		});
                } else {
                	var req = api()
                		.getResource();
                	
                	req.result
                		.then(function(api){
                			submitUrl = api._links['pets'].href;
                		});
                	
                	req.continue()
                		.then(function(next){
                			next
                				.follow('owners',
                    				'owners[nid:' + ownerId + ']')
	                    		.getResource().result
	                    		.then(function(owner){
	                    			self.owner = owner.firstName + ' ' + owner.lastName;
	                    			self.pet = {
	                    				name: '',
	                    				birthDate: null
	                    			};
	                                self.petTypeId = '' + self.types[0].nid;
	                                
	                                ownerUri = owner._links['self'].href;
	                    		});
                		});
                }
        	});

        var getTypeId = function(nid){
        	for (var i = 0; i<self.types.length; i++){
        		if (self.types[i].nid == nid)
        			return self.types[i]._links['self'].href;
        	}
        	return null;
        }
        
        var onSuccess = responseHandler.onSuccess(function(response){
        	$state.go("owners", {ownerId: ownerId});
        });
        
        self.submit = function () {
            var id = self.pet.id || 0;

            var data = {
                name: self.pet.name,
                birthDate: self.pet.birthDate,
                type: getTypeId(self.petTypeId),
                owner: ownerUri
            };

            var req;
            if (id) {
            	req = api(submitUrl)
            		.put(data);
            } else {
            	req = api(submitUrl)
            		.post(data);
            }

            req.result.then(onSuccess, responseHandler.onError);
        };
    }]);
