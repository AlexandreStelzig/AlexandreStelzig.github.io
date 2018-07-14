var nextId;
var previousId;


function openModal(id){
	// Get the modal
	var modal = document.getElementById("myModal");


	// Get the image and insert it inside the modal - use its "alt" text as a caption
	var img = document.getElementById(id);
	var modalImg = document.getElementById("modelImage");
	var captionText = document.getElementById("caption");


	if(img === null)
		return;


	modal.style.display = "none";

    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = "";

    nextId = img.getAttribute('nextId');
    previousId = img.getAttribute('previousId');

	if (typeof nextId === 'undefined' || !nextId) {
		document.getElementById("nextButton").style.display = "none";
	}else{
		document.getElementById("nextButton").style.display = "block";
	}

	if (typeof previousId === 'undefined' || !previousId) {
		document.getElementById("previousButton").style.display = "none";
	}else{
		document.getElementById("previousButton").style.display = "block";
	}

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() { 
	    modal.style.display = "none";
	}
}

function nextClicked(){
	openModal(nextId);
}

function previousClicked(){
	openModal(previousId);
}