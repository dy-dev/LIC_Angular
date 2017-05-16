function parseDir($http, mainDir, refDir, directory, files, tags, wholetags)
{
    var lastChar = directory.substr(-1); // Selects the last character
    if (lastChar === '/' && directory !== mainDir && this.text !== "Parent Directory")
    {         // If the last character is not a slash
        var tmpDir = directory.toString();
        //alert("tmpDir : " + tmpDir + " , mainDir : " + mainDir);
        var mySplit = tmpDir.split('\/');
        var tag = mySplit[mySplit.length - 2];
        tags.push(tag);
        wholetags.push(tag);
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
                    parseDir($http, mainDir, directory, url2, files, tagCopy, wholetags);
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

function getCheckBoxValue() {
    var allVals = [];
    $("input[type='checkbox']").each(function () {
        if (this.checked)
        {
            allVals.push($(this).val());
        }
    });
    alert(allVals);
}
