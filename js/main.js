
$(window).on('load', function ()
{
    //$("#SideBar").load('partials/sidebar.html');
});


function goToImgDir()
{
    console.log("GO_TO_IMG_DIR");

    var scope = angular.element("#imgDiv").scope();
    if (scope == null)
        console.log("var scope gotoimgdir() == null")
    else
        console.dir(scope);
        // console.log("var scope="+scope+"\n");
    // console.log("all scope:\n" + angular.$scope);
    
    // console.log(">>>" + $(event.target).attr('id'));
    if ($(event.target).attr('id') != "Catégories") {
        scope.activeFile = $(event.target).attr('id');

        // parseDir($http, mainDir, refDir, directory, files, tags, $scope)
    } else {
        scope.activeFile = "Catégories";

    }
        // console.log("> activeFile");
        // console.log(scope.activeFile);
    
    scope.$apply();

    /// suite
    /// activer le changement en lancant le parsedir
    /// ??? comment trouver les variables necessaire ???
    /// faire attention a la répartition notamment pour les sous catégorie
    /// faire un affichage des boutons de sous catégorie
    /// juste ajouter souscatégorie/images.jpg dans la catégorie correspondant
    /// ajouter les item data-catégorie data-filter
    /// mettre par default le all
    /// lier au shuffle
    /// si bouton selectionné hide des autre
    /// 
    /// penser a hide la div de bouton all si c'est "catégorie"
    /// 
    /// récursive sur les souscatégorie seulement si ça a déjà été modifié
}


function parseDir($http, mainDir, refDir, directory, files, tags, $scope)
{
    console.log("PARSE_DIR");
    return;

    var lastChar = directory.substr(-1); // Selects the last character
    if (lastChar === '/' && directory !== mainDir && this.text !== "Parent Directory")
    {         // If the last character is not a slash
        var tmpDir = directory.toString();
        //alert("tmpDir : " + tmpDir + " , mainDir : " + mainDir);
        var mySplit = tmpDir.split('\/');
        var tag = (mySplit[mySplit.length - 2]).replace(/%20/g, "_");

        // console.log(mySplit[mySplit.length - 3]);
        if (mySplit[mySplit.length - 3] == "Miniatures")
            console.log("catégorie:"+tag);
        else
            console.log("tag:"+tag);
        // ?????? filtrer dedans ou retirer si pas besoin
        tags.push(tag);
        var tmp = $scope.Wholetags[tag];
        if ($scope.Wholetags[tag] === undefined) {
            $scope.Wholetags[tag] = true;
            // $("#tagSelector").append('<div class ="small-4 medium-3 large-2 columns end tagValue"> <input id="'+tag+'" type="checkbox" ng-model="'+$scope.Wholetags[tag]+'" onclick="getCheckBoxValue()"><label class="button expanded" for="'+tag+'">' + tag + '</label></div>');
        }
        var url = refDir + tag;
        var i = 0;
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
                if (lastChar === '/' && this.href !== mainDir && this.text !== "Parent Directory") {
                    var tag2 = mySplit2[mySplit2.length - 2];
                    var url2 = directory + tag2 + "/";
                    var tagCopy = tags.slice(0);
                    if (mySplit2[mySplit2.length - 3] != "Miniatures" ) {
                        console.log("*** enter sub catégorie");
                        parseDir($http, mainDir, directory, url2, files, tagCopy, $scope);
                    } else {
                        console.log("*** do catégorie");
                    }


                }
                else if (this.href.indexOf('.jpg') > 0 || this.href.indexOf('.png') > 0)
                {
                    var tag2 = mySplit2[mySplit2.length - 1];
                    var url2 = directory + tag2;

                    //alert("a priori fichier " + url2);
                    var myFile = {fileName: url2, tag: tags};
                    files.push(myFile);
                    // comptage de fichier
                    i++;
                }
            });

            console.log("insertion des "+i+" fichier:\n");
            console.log($scope);
        });
    }
    else if (directory.indexOf('.jpg') > 0)
    {
        alert("a priori fichier " + this.href);
        //var myFile = {fileName: dir + filename, tag:};
        //$scope.Files.push(myFile);
    }

}

