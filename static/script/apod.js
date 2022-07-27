document.getElementById("move-back").addEventListener("click", function(){move_back()});
document.getElementById("yesterday-img").addEventListener("click", function(){move_back()});
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '37') {
        move_back()
    }
}

var moveback_date

function fetch_images(yesterday, today, tomorrow, option=null) {
    fetch(`/.netlify/functions/fetch_images?start_date=${yesterday}&today_date=${today}&tomorrow_date=${tomorrow}`)
        .then(res => res.json())
        .then(data => {
            if (option != null) {
                return data
            }

            if (data[1]["media_type"] == "video") {
                const img = document.getElementById("today-img");
                const vid = document.getElementById("today-vid");

                img.style.opacity = 0;
                img.style.position = "absolute";
                vid.style.opacity = 100;
                vid.style.position = "static";
                vid.src = data[1]["url"]
            }
            else {
                const img = document.getElementById("today-img");
                const vid = document.getElementById("today-vid");
            
                img.style.opacity = 100;
                img.style.position = "static";
                vid.style.opacity = 0;
                vid.style.position = "absolute";
                
                document.getElementById("today-img").src = data[1]["hdurl"];
                document.getElementById("date-text").innerHTML = data[1]["date"]
            }

            if (data[0]["media_type"] == "video") {
                const img = document.getElementById("yesterday-img");
                const vid = document.getElementById("yesterday-vid");

                img.style.opacity = 0;
                img.style.position = "absolute";
                vid.style.opacity = 0.6;
                vid.style.position = "static";
                vid.src = data[0]["url"]
            } 
            else {
                const img = document.getElementById("yesterday-img");
                const vid = document.getElementById("yesterday-vid");

                img.style.opacity = 0.6;
                img.style.position = "static";
                vid.style.opacity = 0;
                vid.style.position = "absolute";

                document.getElementById("yesterday-img").src = data[0]["hdurl"];
            }
            
            if (data[2]["media_type"] == "video") {
                const img = document.getElementById("tmrw-img");
                const vid = document.getElementById("tmrw-vid");

                img.style.opacity = 0;
                img.style.position = "absolute";
                vid.style.opacity = 0.6;
                vid.style.position = "static";
                vid.src = data[2]["url"]
            }
            else {
                const img = document.getElementById("tmrw-img");
                const vid = document.getElementById("tmrw-vid");

                img.style.opacity = 0.6;
                img.style.position = "static";
                vid.style.opacity = 0;
                vid.style.position = "absolute";

                document.getElementById("tmrw-img").src = data[2]["hdurl"];
            }

            document.getElementById("title-text").innerHTML = data[1]["title"];

            if (data[1]["copyright"] == undefined) {
                photographer = "None Found"
            } else {
                photographer = data[1]["copyright"];
            }

            if (data.length == 2) {
                document.getElementById("move-forward").disabled = true;
            }

            document.getElementById("photographer").innerHTML = photographer;

            if (data.length == 3) {
                document.getElementById("tmrw-img").src = data[2]["hdurl"];
            }
            })
}


function move_back() {
    const today = new Date(moveback_date);
    const yesterday = new Date(today);
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    var today_day = String(today.getDate());
    var today_month = String(months[today.getMonth()]);
    var today_year = String(today.getFullYear());
    var yesterday_day = String(yesterday.getDate()-1);
    var yesterday_month = String(months[yesterday.getMonth()]);
    var yesterday_year = String(yesterday.getFullYear());


    if (today_day.length == 1) {
        today_day = `0${today_day}`
    }
    if (yesterday_day.length == 1) {
        yesterday_day = `0${yesterday_day}`
    }
    if (today_month.length == 1) {
        today_month = `0${today_month}`
    }
    if (yesterday_month.length == 1) {
        yesterday_month = `0${yesterday_month}`
    };

    const yesterday_arg = `${yesterday_year}-${yesterday_month}-${yesterday_day}`;
    const today_arg = `${today_year}-${today_month}-${today_day}`
    moveback_date = yesterday_arg;
    fetch_images(yesterday_arg, today_arg, "n");
}



document.getElementById("tmrw-img").src = "static/imgs/red-gradient.gif"

const today = new Date();
const yesterday = new Date(today);
const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
var today_day = String(today.getDate());
var today_month = String(months[today.getMonth()]);
var today_year = String(today.getFullYear());
var yesterday_day = String(yesterday.getDate()-1);
var yesterday_month = String(months[yesterday.getMonth()]);
var yesterday_year = String(yesterday.getFullYear());


if (today_day.length == 1) {
    today_day = `0${today_day}`
}
if (yesterday_day.length == 1) {
    yesterday_day = `0${yesterday_day}`
}
if (today_month.length == 1) {
    today_month = `0${today_month}`
}
if (yesterday_month.length == 1) {
    yesterday_month = `0${yesterday_month}`
};

const yesterday_arg = `${yesterday_year}-${yesterday_month}-${yesterday_day}`;
const today_arg = `${today_year}-${today_month}-${today_day}`
moveback_date = new Date(yesterday_arg)
fetch_images(yesterday_arg, today_arg, "n");