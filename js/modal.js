function openModal(id){

	// Get the modal
	// var modal = $('#myModal');
	var modal = document.getElementById("myModal");


	// Get the image and insert it inside the modal - use its "alt" text as a caption
	var img = document.getElementById(id);
	var modalImg = document.getElementById("modelImage");
	var captionText = document.getElementById("caption");
	modal.style.display = "none";

    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;


	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() { 
	    modal.style.display = "none";
	}
}