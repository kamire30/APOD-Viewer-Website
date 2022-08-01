document.getElementById("move-back").addEventListener("click", function(){move_back()});
document.getElementById("move-forward").addEventListener("click", function(){move_forward()});

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '37') {
        move_back()
    } else if (e.keyCode == '39') {
        move_forward()
    }
}

var move_date

function fetch_images(yesterday, today, tomorrow, option=null) {
    fetch(`/.netlify/functions/fetch_images?start_date=${yesterday}&today_date=${today}&tomorrow_date=${tomorrow}`)
        .then(res => res.json())
        .then(data => {
            if (option != null) {
                return data
            }

            if (data.length == 1) {
                move_back()
            }
            
            document.getElementById("title-text").innerHTML = data[1]["title"];

            var photographer = "placeholder";
            if (data[1]["copyright"] == undefined) {
                photographer = "None Found"
            } else {
                photographer = data[1]["copyright"];
            }

            document.getElementById("photographer").innerHTML = photographer;

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

            if (data.length == 2) {
                document.getElementById("move-forward").disabled = true;
            }

            if (data.length == 3) {
                document.getElementById("tmrw-img").src = data[2]["hdurl"];
            }
            })
}


function move_back() {
    let today = new Date();
    let yesterday = new Date();

    move_date += 1;

    yesterday.setDate(today.getDate() - move_date);
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    var today_day = String(today.getDate());
    var today_month = String(months[today.getMonth()]);
    var today_year = String(today.getFullYear());
    var yesterday_day = String(yesterday.getDate());
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
    fetch_images(yesterday_arg, today_arg, "n");
}

function move_forward() {
    let x = new Date()
    let today = new Date();
    let tmrw = new Date();
    
    today.setDate(x.getDate() - move_date);

    move_date -= 1;

    tmrw.setDate(today.getDate() - move_date);
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    var today_day = String(today.getDate());
    var today_month = String(months[today.getMonth()]);
    var today_year = String(today.getFullYear());
    var tmrw_day = String(tmrw.getDate());
    var tmrw_month = String(months[tmrw.getMonth()]);
    var tmrw_year = String(tmrw.getFullYear());


    if (today_day.length == 1) {
        today_day = `0${today_day}`
    }
    if (tmrw_day.length == 1) {
        tmrw_day = `0${tmrw_day}`
    }
    if (today_month.length == 1) {
        today_month = `0${today_month}`
    }
    if (tmrw_month.length == 1) {
        tmrw_month = `0${tmrw_month}`
    };

    const tmrw_arg = `${tmrw_year}-${tmrw_month}-${tmrw_day}`;
    const today_arg = `${today_year}-${today_month}-${today_day}`
    fetch_images(today_arg, tmrw_arg, "n");
}



document.getElementById("tmrw-img").src = "static/imgs/red-gradient.gif"

const today = new Date();
const yesterday = new Date();

yesterday.setDate(today.getDate() - 1);
const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
var today_day = String(today.getDate());
var today_month = String(months[today.getMonth()]);
var today_year = String(today.getFullYear());
var yesterday_day = String(yesterday.getDate());
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
move_date = 1
fetch_images(yesterday_arg, today_arg, "n");