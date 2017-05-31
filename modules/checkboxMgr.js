myApp.controller('tagFilter', function ($scope) {
    $scope.imgTagValue = {
        value1: true
    };



    $scope.getCheckBoxValue = function () {
        $scope.selectedTags = [];
        json = $scope.Wholetags;
        for (var key in $scope.Wholetags) {
            if ($scope.Wholetags[key] )
            {
                $scope.selectedTags.push(key);
            }
        };

    };


});