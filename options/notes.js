

angular.module('geeksNote',[]).controller('parentController', ['$scope',
function($scope){

	$scope.notesInit = function(){
	  	var notesObj = {};
		
		chrome.storage.sync.get("notes", function (obj) {
		    notesObj=obj.notes;
		    
		    if (typeof notesObj==='undefined') {  // This occurs when the extension is first used as nothing would be stored 
		        notesObj={};
		    };
		    console.log(notesObj);
		});

	}

}]);

