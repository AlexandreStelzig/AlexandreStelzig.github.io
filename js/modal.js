var isModalVisible = false;

document.addEventListener('keydown', function (event) {
    // Check if the right arrow key is pressed
    if ((event.key === 'ArrowRight' || event.key == "d") && isModalVisible) {
        nextClicked();
    }
    // Check if the left arrow key is pressed
    else if ((event.key === 'ArrowLeft' || event.key === 'a') && isModalVisible) {
        previousClicked();
    }
});

var touchStartX;


var nextId;
var previousId;

if (window.innerWidth <= 768) {
    document.addEventListener('touchstart', function (event) {
        // Store the starting position of the touch
        touchStartX = event.touches[0].clientX;
    });

    document.addEventListener('touchend', function (event) {
        if (isModalVisible) {
            // Calculate the horizontal distance moved during the touch
            var touchEndX = event.changedTouches[0].clientX;
            var deltaX = touchEndX - touchStartX;

            // Set a threshold for the swipe
            var swipeThreshold = 50;

            // Check if it's a left swipe
            if (deltaX > swipeThreshold) {
                previousClicked();
            }
            // Check if it's a right swipe
            else if (deltaX < -swipeThreshold) {
                nextClicked();
            }
        }
    });
}


function openModal(id) {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById(id);
    var modalImg = document.getElementById("modelImage");
    var captionText = document.getElementById("caption");

    if (img === null)
        return;

    modal.style.display = "none";

    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = "";

	isModalVisible = true;

    nextId = img.getAttribute('nextId');
    previousId = img.getAttribute('previousId');

    if (typeof nextId === 'undefined' || !nextId) {
        document.getElementById("nextButton").style.display = "none";
    } else {
        document.getElementById("nextButton").style.display = "block";
    }

    if (typeof previousId === 'undefined' || !previousId) {
        document.getElementById("previousButton").style.display = "none";
    } else {
        document.getElementById("previousButton").style.display = "block";
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x) or presses the Esc key, close the modal
    span.onclick = function () {
        modal.style.display = "none";
		isModalVisible = false;
    };

	if (window.innerWidth >= 768) {
		document.addEventListener('keydown', function (event) {
			// Check if the Esc key is pressed
			if (event.key === 'Escape') {
				modal.style.display = "none";
				isModalVisible = false;
			}
		});
	
		// Add an event listener to the modal to close it when clicking outside of the image container
		window.addEventListener('click', function (event) {
			if (event.target === modal) {
				modal.style.display = "none";
				isModalVisible = false;
			}
		});
	}
}

function nextClicked() {
	openModal(nextId);
}

function previousClicked() {
	openModal(previousId);
}