var myApp = angular.module("myApp", ['ngAnimate'])
        .controller('filesCtrl', function ($scope, $http) {
            var mainDir = "http://testsite.lightinchaos.com/gallery/Medias/"
            var dir = "http://testsite.lightinchaos.com/gallery/Medias/Miniatures/";
            // var mainDir = "file:///Users/proprietaire/Downloads/LightInChaos%20Divers/siteLingthInChaos/LIC_Angular/gallery/Medias/"
            // var dir = "file:///Users/proprietaire/Downloads/LightInChaos%20Divers/siteLingthInChaos/LIC_Angular/gallery/Medias/Miniatures/"
            //var fileextension = ".jpg";
            var nbCol = 0;
            var nbRow = 0;
            var index = 0;
            $scope.Files = [];
            $scope.Categories = [];
            $scope.Wholetags = {};
            $scope.activeFile = "Catégories";

            console.log("FILE_CTRL MY_APP");
            // console.log($scope);
            
            // construction d'un 1er repertoire a parcourir qui contient les miniatures
            $scope.Files.push("Catégories");
            $scope.Files["Catégories"] = [];

            $http({
                method: 'GET',
                url: dir
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available

                //parseDir($(response).attr("data"), tag);

                console.log("Recup data $response");
                console.log($(response));

                var tmp = $(response).attr("data");
                var myData = $($(response).attr("data")).find("a");

                console.log(myData);
                
                $(myData).each(function ()
                {
                    var lastChar = this.href.substr(-1); // Selects the last character
                    // console.log(">lastChar:"+lastChar);
                    if (lastChar === '/' && this.href !== mainDir && this.text !== "Parent Directory") {
                        var mySplit = this.href.split('\/');
                        var tag = mySplit[mySplit.length - 2];
                        var url = dir + tag + "/";
                        var tags = [];
                        $scope.Categories.push(tag);
                        $scope.Files["Catégories"].push(tag + ".jpg");
                        $scope.Files.push(tag);
                        $scope.Files[tag] = [];
                        $scope.Files[tag].push(tag + ".jpg");
                        
                        // checkpoint controle construction du tableau 2 dimensions (Files/Catégorie)
                            console.log("FILE_CTRL: before parseDir:\n\tmainDir="+mainDir+"\n\tdir:"+dir+"\n\turl:"+url+"\n\ttags:"+tags+"\n");
                            console.log($http);
                            console.log($scope);
                        // parseDir($http, mainDir, dir, url, $scope.Files, tags, $scope);
                    }


                });
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //alert(response);
                console.error("error response server");
            });





            $scope.getCheckBoxValue = function () {
//        var allVals = [];
//        $("input[type='checkbox']").each(function () {
//            if (this.checked)
//            {
//                allVals.push($(this).attr('id'));
//            }
//        });
                var tmpStr = "";
                json = $scope.Wholetags;
                for (var key in $scope.Wholetags) {
                    if ($scope.Wholetags[key])
                    {
                        tmpStr += key + ", ";
                    }

                }
                ;
                $scope.selectedTags = tmpStr.substring(0, tmpStr.length - 2);
            };

            $scope.containsComparator = function (expected, actual) {
                return actual.indexOf(expected) > -1;
            };

        });


 