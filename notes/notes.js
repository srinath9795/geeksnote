

angular.module('geeksNote',[]).controller('parentController', ['$scope',
function($scope){
	chrome.storage.sync.get(null, function(items) {
		var allKeys = Object.keys(items);
		console.log(allKeys);
		
		// Using presentKeys now for development as there are redundant keys in my allKeys
		// the following code is generic and we just need to add new domainName to the presentKeys array
		var presentKeys = ["notes","notesCF"];

		for( var i in presentKeys)
		{
			console.log(i);
		}

		for (var i=0; i<presentKeys.length; i++) {
			$scope[presentKeys[i]]=items[presentKeys[i]];
		    
		    if (typeof $scope[presentKeys[i]]==='undefined') {  // This occurs when the extension is first used as nothing would be stored 
		        $scope[presentKeys[i]]={};
		    };
			$scope.$apply(function() {

		        var p= items[presentKeys[i]];
		        var count=0;
		        var newObj = {};

		        $scope[presentKeys[i]] = [];
		        for (var key in p) {
				  if (p.hasOwnProperty(key)) {
				    if(!p[key]) continue;
				    count++;
				    newObj[key]=p[key];
				    if (count==3)
				    {
				    	$scope[presentKeys[i]].push(newObj);
				    	newObj={};
				    	count=0;
				    }

				  }
				}
				if (count!=0)
				{
				    $scope[presentKeys[i]].push(newObj);

				}

		    });
		}

	});


}]);

