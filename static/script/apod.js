function fetch_images(yesterday, today, tomorrow) {
    fetch(`/.netlify/functions/fetch_images?start_date=${yesterday}&today_date=${today}&tomorrow_date=${tomorrow}`)
        .then(res => res.json())
        .then(data => {
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
            document.getElementById("today-img").src = data[1]["hdurl"];
            document.getElementById("date-text").innerHTML = data[1]["date"]
            document.getElementById("yesterday-img").src = data[0]["hdurl"];
        })
}

document.getElementById("tmrw-img").src = "static/imgs/red-gradient.gif"

const today = new Date();
const yesterday = new Date(today);
const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
var today_day = String(today.getDate());
var today_month = String(months[today.getMonth()]);
var today_year = String(today.getFullYear());
var yesterday_day = String(yesterday.getDate()-2);
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