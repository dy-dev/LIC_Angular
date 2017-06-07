
// window.onload = function () {

// }
$(window).on('load', function ()
{
    //$("#SideBar").load('partials/sidebar.html');
});


function goToImgDir () {
    var scope = angular.element("#imgDiv").scope();

    angular.element("#all").addClass("btn-active");
    console.log(">>>" + $(event.target).attr('id'));
    if ($(event.target).attr('id') != scope.activeFile) {
        if ($(event.target).attr('id') != "Catégories") {
            scope.activeFile = $(event.target).attr('id');
            scope.goToSubCat($(event.target).attr('id'));
            if (scope.Categories[scope.activeFile].length != 0) {
                angular.element(".button").show(0); /// trouver autre que hide !!!!!!! div fixe pour éviter les mouvements
            }
            else {
                angular.element(".button").hide(0);
            }
            // parseDir($http, mainDir, refDir, directory, files, tags, $scope);
        } else {
            scope.activeFile = "Catégories";
            angular.element(".button").hide(0);
        }

        // reset selection de tag
        // angular.element(scope.tagFilter).removeClass("btn-active");
        angular.element(".button").removeClass("btn-active");
        angular.element("#all").addClass("btn-active");
        scope.tagFilter = "";
        scope.$apply();
        //test
        // console.log("********");
        // console.log(scope);
        // console.log("********");
    }
}

function chooseFilter(){
    var scope = angular.element("#imgDiv").scope();
    var newFilter = "#" + $(event.target).attr('data-target');
    // var oldFilter = "#" + scope.tagFilter;

    // if (oldFilter == "#")
    //     oldFilter = "#all";
    // console.log(">>> oldfilter="+oldFilter+" newFilter="+newFilter);
    if ($(event.target).attr('data-target') != "all") {
        scope.tagFilter = $(event.target).attr('data-target');
    }
    else {
        scope.tagFilter = "";
    }
    // angular.element(oldFilter).removeClass('btn-active');
    angular.element(".button").removeClass("btn-active");
    angular.element(newFilter).addClass('btn-active');
    scope.$apply();
    // changement de couleur pas encore affecté comment charger la feuille js shuffle
}


function parseDir($http, mainDir, refDir, directory, files, tags, $scope)
{
    // console.log("PARSE_DIR");
    // console.log("\tmainDir="+mainDir+"\n\trefDir="+refDir+"\n\tdirectory="+directory+"\n\ttags="+tags+"\n\tfiles V");
    // // console.log(files);
    // console.log("\tscope V");
    // console.log($scope);
    // console.log("******");
    // // return;

    var lastChar = directory.substr(-1); // Selects the last character
    if (lastChar === '/' && directory !== mainDir && this.text !== "Parent Directory") {
        var tmpDir = directory.toString();  
        var mySplit = tmpDir.split('\/');
        // var tag = (mySplit[mySplit.length - 2]).replace(/%20/g, "_");
        var tag = (mySplit[mySplit.length - 2]);

        if (mySplit[mySplit.length - 3] == "Miniatures"){
            console.log("catégorie:"+tag);
        }
        else {
            console.dir("tag:"+tag);
            // ajout des sous catégorie (1 niveau pour savoir les tag filtre a ajouter)
            if (mySplit[mySplit.length - 4] == "Miniatures") {
                if ($scope.Categories[mySplit[mySplit.length - 3]].length == 0) {
                    $scope.Categories[mySplit[mySplit.length - 3]].push("all");
                }
                if (tag == "Galland%20Maxime")
                    $scope.Categories[mySplit[mySplit.length - 3]].push("Galland Maxime");
                else
                    $scope.Categories[mySplit[mySplit.length - 3]].push(tag);
            }
        }

        var url = refDir + tag;
        $http({
            method: 'GET',
            url: directory
        }).then(function successCallback(response){
            var tmp = $(response).attr("data");
            var myData = $($(response).attr("data")).find("a");

            $(myData).each(function ()
            {
                var lastChar = this.href.substr(-1); // Selects the last character
                var mySplit2 = this.href.split('\/');
                // erreur icone ovh
                if (lastChar === '/' && this.href !== mainDir && this.text !== "Parent Directory") {
                    var tag2 = mySplit2[mySplit2.length - 2];
                    var url2 = directory + tag2 + "/";
                    var tagCopy = tags.slice(0);

                    // changer parent directory selon local ou en ligne
                    // if (mySplit2[mySplit2.length - 3] != "LIC_Angular" ) {
                    // if (mySplit2[mySplit2.length - 2] != "LIC_Angular" ) {
                    if ($scope.activeFile != "Catégories") {
                        parseDir($http, mainDir, directory, url2, files, tagCopy, $scope);
                    }
                }
                else if (this.href.indexOf('.jpg') > 0 || this.href.indexOf('.png') > 0)
                {
                    var tmp = url.split("Miniatures");
                    var cat = "Catégories";
                    var url3 = "";
                    
                    // url3 pour test local
                    if (cat != "/") {
                        cat = tmp[1].split("\/")[1];
                        tmp = tmp[1].split("\/");
                        tmp.forEach(function(element, index) {
                            if (index > 0)
                              url3 = url3 + element + "/"; 
                        });

                    }
                    var tag2 = mySplit2[mySplit2.length - 1];
                    // var url2 = directory + tag2;
                    // console.log("=>");
                    // console.dir(tag2);
                    
                    // var myFile = {fileName: url2, tag: tags};
                    // files[cat].push(myFile.fileName);
                    var myFile = {fileName: (url3 + tag2), tag: tags};
                    files[cat].push(myFile);
                }
            });
        });
    }
    else if (directory.indexOf('.jpg') > 0) {
        alert("a priori fichier " + this.href);
    }

}

