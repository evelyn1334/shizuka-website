// global variables
var G = {
    amount: 0,
    serial: 0
};

window.onload = init;

function init() {
    var previews = document.getElementsByTagName("img");
    G.amount = previews.length; // amount is the total number of pictures

    for (var i = 0; i < G.amount; i++) {
        previews[i].onclick = viewFull;
    }   // enter full-size mode when any preview is clicked
}

function viewFull() {
    var dollPics = document.getElementById("dollPics");
    var fullSize = document.getElementById("fullSize");
    var zoomedImg = document.createElement("img");

    zoomedImg.src = this.src.slice(0, -10) + ".jpg"; // reconstruct URL from the preview
    // serial is the numeric value extracted from the filename
    G.serial = parseInt(zoomedImg.src.slice(-6, -4), 10);

    fullSize.style.display = "block";
    fullSize.insertBefore(zoomedImg, fullSize.firstChild);
    dollPics.parentNode.removeChild(dollPics);

    setButtons();
}

function setButtons() {
    var buttons = document.querySelectorAll(".button");

    for (var i = 0; i < buttons.length; i++) {
        // set button style and availability according to current position
        if ((i == 0 && G.serial <= 1) || (i == 2 && G.serial >= G.amount)) {
            buttons[i].setAttribute("class", "button muted");
            buttons[i].onclick = null;
        }
        else {
            buttons[i].setAttribute("class", "button");
            buttons[i].onclick = navigate;
        }   // start navigation when any available button is clicked
    }
}

function navigate() {
    // increment or decrement serial according to navigation direction
    switch (this.innerHTML.toLowerCase()) {
        case "next":
            G.serial++;
            break;
        case "prev":
            G.serial--;
            break;
        default:
            document.location.reload(); // otherwise reset the DOM
    }

    var currentImg = document.querySelector("img");
    var newImg = document.createElement("img");

    newImg.src = formatURL(currentImg.src); // it's crucial to format the URL
    currentImg.parentNode.insertBefore(newImg, currentImg);
    currentImg.parentNode.removeChild(currentImg);

    setButtons();
}

function formatURL(path) {
    // pad a leading zero if serial has only one digit
    return (G.serial < 10)
        ? path.slice(0, -6) + "0" + G.serial + ".jpg"
        : path;
}
