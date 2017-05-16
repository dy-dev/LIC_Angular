var myApp = angular.module("myApp", [])
        .controller('filesCtrl', function ($scope, $http) {
            var mainDir = "http://testsite.lightinchaos.com/gallery/Medias/"
            var dir = "http://testsite.lightinchaos.com/gallery/Medias/Miniatures/";
            //var fileextension = ".jpg";
            var nbCol = 0;
            var nbRow = 0;

            var index = 0;
            $scope.Files = [];
            /* $.ajax({
             //This will retrieve the contents of the folder if the folder is configured as 'browsable'
             url: dir,
             files: $scope.Files,
             success: function (data) {
             
             }
             }).done(function(){
             alert($scope.Files[1].fileName);
             });*/
            $scope.Wholetags = [];

            $http({
                method: 'GET',
                url: dir
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available

                //parseDir($(response).attr("data"), tag);

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
                        parseDir($http, mainDir, dir, url, $scope.Files, tags, $scope.Wholetags );
                    }
                    /*var rowId = "_" + nbRow + '0';
                     var colId = "_" + nbRow + nbCol;
                     
                     if (nbCol === 0)
                     {
                     $("body").append("<div class='row' id =" + rowId + ">");
                     }
                     nbCol++;
                     var filename = this.href.replace(window.location.host, "").replace("http://", "").replace("/LIC_AngularJS/", "");
                     //   files += filename + '<br>';
                     //$(rowId).append("<img src='" + dir + filename + "'>");
                     //var myDiv = document.getElementById(rowId);
                     //$(myDiv).append("<div class='small-2 columns' id=" + colId + "><img src='" + dir + filename + "'></div>");
                     //$(myDiv).append(dir + filename + "<br>");
                     if (nbCol === 6)
                     {
                     nbCol = 0;
                     $("body").append("</div>");
                     nbRow++;
                     }
                     var myFile = {fileName: dir + filename, tag: "3D"};
                     $scope.Files.push(myFile);
                     
                     index++;*/
                });
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                //alert(response);
            });
        });


 