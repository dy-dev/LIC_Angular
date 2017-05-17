function parseDir($http, mainDir, refDir, directory, files, tags, $scope)
{
    var lastChar = directory.substr(-1); // Selects the last character
    if (lastChar === '/' && directory !== mainDir && this.text !== "Parent Directory")
    {         // If the last character is not a slash
        var tmpDir = directory.toString();
        //alert("tmpDir : " + tmpDir + " , mainDir : " + mainDir);
        var mySplit = tmpDir.split('\/');
        var tag = (mySplit[mySplit.length - 2]).replace(/%20/g, "_");


        tags.push(tag);
        var tmp = $scope.Wholetags[tag];
        if ($scope.Wholetags[tag] === undefined) {
            $scope.Wholetags[tag] = true;
            // $("#tagSelector").append('<div class ="small-4 medium-3 large-2 columns end tagValue"> <input id="'+tag+'" type="checkbox" ng-model="'+$scope.Wholetags[tag]+'" onclick="getCheckBoxValue()"><label class="button expanded" for="'+tag+'">' + tag + '</label></div>');
        }
        var url = refDir + tag;
        // alert("url : " + url);
        $http({
            method: 'GET',
            url: directory
        }).then(function successCallback(response)
        {
            var tmp = $(response).attr("data");
            var myData = $($(response).attr("data")).find("a");
            $(myData).each(function ()
            {
                var lastChar = this.href.substr(-1); // Selects the last character
                var mySplit2 = this.href.split('\/');
                if (lastChar === '/' && this.href !== mainDir && this.text !== "Parent Directory") {
                    var tag2 = mySplit2[mySplit2.length - 2];
                    var url2 = directory + tag2 + "/";
                    var tagCopy = tags.slice(0);
                    parseDir($http, mainDir, directory, url2, files, tagCopy, $scope);
                }
                else if (this.href.indexOf('.jpg') > 0)
                {
                    var tag2 = mySplit2[mySplit2.length - 1];
                    var url2 = directory + tag2;

                    //alert("a priori fichier " + url2);
                    var myFile = {fileName: url2, tag: tags};
                    files.push(myFile);
                }
            });
        });
    }
    else if (directory.indexOf('.jpg') > 0)
    {
        alert("a priori fichier " + this.href);
        //var myFile = {fileName: dir + filename, tag:};
        //$scope.Files.push(myFile);
    }

}

