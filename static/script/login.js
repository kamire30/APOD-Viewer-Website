/* Login & Favourites */

document.getElementById("heart-icon-a").addEventListener("click", function(){favourite_apod()});


/* Plan 

1. When clicked, if heart is white, then make it red, and vice-versa.
2. If not signed in, direct to sign in page.

*/


function favourite_apod() {
    heart_icon = document.getElementById("heart-icon");
    source = heart_icon.src;

    if (source.includes("white-heart.png")) {
        heart_icon.src = "static/imgs/red-heart.png";
    } else {
        heart_icon.src = "static/imgs/white-heart.png";
    }

    console.log(localStorage.length);
    console.log(sessionStorage.length);

    if ((localStorage.length == 0 && sessionStorage.length == 0) || (localStorage.length == 0 && sessionStorage.length == 1)) {
        location.replace("html/login.html");
    }
}