myApp.controller('tagFilter', function ($scope) {
    $scope.imgTagValue = {
        value1: true
    };



    $scope.getCheckBoxValue = function () {
//        var allVals = [];
//        $("input[type='checkbox']").each(function () {
//            if (this.checked)
//            {
//                allVals.push($(this).attr('id'));
//            }
//        });
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