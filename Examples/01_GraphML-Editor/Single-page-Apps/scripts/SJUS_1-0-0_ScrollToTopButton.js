/////////////////////////
// Scroll to Top button
let currentToTopButton = document.getElementById("scrollButtonToTop");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        currentToTopButton.style.display = "block";
    } else {
        currentToTopButton.style.display = "none";
    }
}

function scrollPageToTopOfPage() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
