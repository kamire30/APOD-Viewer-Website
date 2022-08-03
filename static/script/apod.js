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

var move_date = 1;

function fetch_images(yesterday, today, tomorrow) {
    fetch(`/.netlify/functions/fetch_images?start_date=${yesterday}&today_date=${today}&tomorrow_date=${tomorrow}`)
        .then(res => res.json())
        .then(data => {
            console.log(move_date);

            if (data.length == 1) {
                move_back()
            }

            if (move_date == 1) {
                document.getElementById("move-forward").disabled = true;
                document.getElementById("tmrw-img").src = "static/imgs/red-gradient.gif";
            } else {
                document.getElementById("move-forward").disabled = false;
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
            
            if (data.length == 3) {
                document.getElementById("tmrw-img").src = data[2]["hdurl"];
            }

            })
}


function move_back() {
    let x = new Date();
    let tmrw = new Date();
    let yesterday = new Date();

    move_date += 1;

    yesterday.setDate(x.getDate() - move_date);
    tmrw.setDate(yesterday.getDate() + 2)
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    var tmrw_day = String(tmrw.getDate());
    var tmrw_month = String(months[tmrw.getMonth()-1]);
    var tmrw_year = String(tmrw.getFullYear());
    var yesterday_day = String(yesterday.getDate());
    var yesterday_month = String(months[yesterday.getMonth()]);
    var yesterday_year = String(yesterday.getFullYear());


    if (tmrw_day.length == 1) {
        tmrw_day = `0${tmrw_day}`
    }
    if (yesterday_day.length == 1) {
        yesterday_day = `0${yesterday_day}`
    }
    if (tmrw_month.length == 1) {
        tmrw_month = `0${tmrw_month}`
    }
    if (yesterday_month.length == 1) {
        yesterday_month = `0${yesterday_month}`
    };

    const yesterday_arg = `${yesterday_year}-${yesterday_month}-${yesterday_day}`;
    const tmrw_arg = `${tmrw_year}-${tmrw_month}-${tmrw_day}`
    fetch_images(yesterday_arg, "n", tmrw_arg);
}

function move_forward() {
    let x = new Date();
    let yesterday = new Date();
    let tmrw = new Date();


    move_date -= 1;
    
    yesterday.setDate(x.getDate() - move_date);

    tmrw.setDate(yesterday.getDate() + 2);
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    var yesterday_day = String(yesterday.getDate());
    var yesterday_month = String(months[yesterday.getMonth()]);
    var yesterday_year = String(yesterday.getFullYear());
    var tmrw_day = String(tmrw.getDate());
    var tmrw_month = String(months[tmrw.getMonth()-1]);
    var tmrw_year = String(tmrw.getFullYear());


    if (yesterday_day.length == 1) {
        yesterday_day = `0${yesterday_day}`
    }
    if (tmrw_day.length == 1) {
        tmrw_day = `0${tmrw_day}`
    }
    if (yesterday_month.length == 1) {
        yesterday_month = `0${yesterday_month}`
    }
    if (tmrw_month.length == 1) {
        tmrw_month = `0${tmrw_month}`
    };

    const tmrw_arg = `${tmrw_year}-${tmrw_month}-${tmrw_day}`;
    const yesterday_arg = `${yesterday_year}-${yesterday_month}-${yesterday_day}`

    if (move_date == 1) {
        fetch_images(yesterday_arg, "n", "n");
    } else {
        fetch_images(yesterday_arg, "n", tmrw_arg);
    }
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
fetch_images(yesterday_arg, today_arg, "n");