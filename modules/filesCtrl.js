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
            $scope.activeFile = "Catégories";
            $scope.tagFilter = "";
            
            // construction d'un 1er repertoire a parcourir qui contient les miniatures
            $scope.Files.push("Catégories");
            $scope.Files["Catégories"] = [];

            // angular.element(".button").hide(0);

            $http({
                method: 'GET',
                url: dir
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                var tmp = $(response).attr("data");
                var myData = $($(response).attr("data")).find("a");
                
                $(myData).each(function ()
                {
                    var lastChar = this.href.substr(-1); // Selects the last character
                    if (lastChar === '/' && this.href !== mainDir && this.text !== "Parent Directory") {
                        var mySplit = this.href.split('\/');
                        var tag = mySplit[mySplit.length - 2];
                        var url = dir + tag + "/";
                        var tags = [];
                        $scope.Categories.push(tag);
                        $scope.Categories[tag]= [];
                        // pour coller a l'insertion de datacategorie dans les sous dossier
                        var myFile = {fileName: (tag+".jpg"), tag: ["Categories", ""]};
                        $scope.Files["Catégories"].push(myFile);
                        // $scope.Files["Catégories"].push(tag + ".jpg");
                        $scope.Files.push(tag);
                        $scope.Files[tag] = [];
                        // $scope.Files[tag].push(tag + ".jpg");
                        angular.element(".button").hide(0);
                        // angular.element(".button").attr('display', 'inline-block');

                        // checkpoint controle construction du tableau 2 dimensions (Files/Catégorie)
                        parseDir($http, mainDir, dir, url, $scope.Files, tags, $scope);
                    }


                });
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.error("error response server");
                console.error(response);
            });

            $scope.goToSubCat = function(categorie) {
                console.log("GO_TO_SUBCAT: categorie="+categorie);

                if ($scope.Files[categorie].length == 0) {
                    var url = "http://testsite.lightinchaos.com/gallery/Medias/Miniatures/"+categorie+"/";
                    var tags = []; /// ???

                    parseDir($http, mainDir, dir, url, $scope.Files, tags, $scope);
                }
            }

            $scope.containsComparator = function (expected, actual) {
                return actual.indexOf(expected) > -1;
            };

        });


 