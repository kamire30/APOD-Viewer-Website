function fetch_images(yesterday, today, tomorrow) {
    fetch(`/.netlify/functions/fetch_images?start_date=${yesterday}&today_date=${today}&tomorrow_date=${tomorrow}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("title-text").innerHTML = data[1]["title"];
            
        })
}

const today = new Date();
const yesterday = new Date(today - 1);
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
    yesterday_day = `0${today_day}`
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