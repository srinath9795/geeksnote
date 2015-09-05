

angular.module('geeksNote',[]).controller('parentController', ['$scope',
function($scope){

	// $scope.notesObj = {};
	// $scope.notesInit = function(){
		chrome.storage.sync.get("notes", function (obj) {
		    $scope.notesObj=obj.notes;
		    
		    if (typeof $scope.notesObj==='undefined') {  // This occurs when the extension is first used as nothing would be stored 
		        $scope.notesObj={};
		    };
			$scope.$apply(function() {

		        console.log("Disk cache hit");
		        // console.log(value.receiptList);
		        var p= obj.notes;
		        var count=0;
		        var newObj = {};

		        $scope.notesObj = [];
		        for (var key in p) {
				  if (p.hasOwnProperty(key)) {
				    if(!p[key]) continue;
				    count++;
				    newObj[key]=p[key];
				    if (count==3)
				    {
				    	$scope.notesObj.push(newObj);
				    	newObj={};
				    	count=0;
				    }

				  }
				}
				if (count!=0)
				{
				    $scope.notesObj.push(newObj);

				}

		    });
		});

	// }

}]);

