// Get the modal
var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById('myImg');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
    modal.style.display = "block";
    // changer Miniatures par FullSize
    modalImg.src = this.src;
    // console.log(this.src);
    var title = this.innerHTML.split('.');
    console.log(title);
    captionText.innerHTML = this.alt;
    // captionText.innerHTML =  title[0];
}


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}

