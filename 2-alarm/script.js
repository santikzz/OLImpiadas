function updateClock(now) {

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let sHours = hours <= 9 ? `0${hours}` : hours
    let sMinutes = minutes <= 9 ? `0${minutes}` : minutes
    let sSeconds = seconds <= 9 ? `0${seconds}` : seconds

    $(".lbl-time").text(`${sHours}:${sMinutes}:${sSeconds}`);

    let icon = "";

    if (hours >= 0 && hours <= 20) {
        icon = '<i class="fa-regular fa-sun"></i>';
    } else {
        icon = '<i class="fa-regular fa-moon"></i>';
    }

    let detail = now.toGMTString().substr(0, 16).replace(', ', ' - ');

    $(".lbl-details").html(`${icon} ${detail}`);

    if (hours >= 0 && hours < 12) {
        $(".lbl-noon").text("AM");
    } else {
        $(".lbl-noon").text("PM");
    }


}

function updateAlarmLabel(alarm) {

    let hours = alarm.getHours();
    let minutes = alarm.getMinutes();

    hours = hours <= 9 ? `0${hours}` : hours
    minutes = minutes <= 9 ? `0${minutes}` : minutes

    let noon = "";
    if (hours >= 0 && hours < 12) {
        noon = "AM";
    } else {
        noon = "PM";
    }

    $(".lbl-alarm").text(`${hours}:${minutes}${noon}`);

}

$(document).ready(function () {

    let now = new Date();
    updateClock(now); // init clock

    var alarm = new Date(1700060400806);

    // updateAlarmLabel(alarm)

    let alarm_time_hour = 0;
    let alarm_time_mins = 0;

    var alarm = null;
    var alarm_is_set = false;

    setInterval(function () {

        let now = new Date();
        updateClock(now); // update clock time

        if (alarm_is_set) {

            console.log(now);
            console.log(alarm);

            if (now >= alarm) {

                // alert("time is up!");
                $("#lbl-alarm").addClass("hidden");
                alarm_is_set = false;
                $('#buzzer').get(0).play();
            }


        }

    }, 1000);

    $("#time-hour-add").click(function () {

        if (alarm_time_hour < 23) {
            alarm_time_hour++;
        } else {
            alarm_time_hour = 0;
        }

        let sTime = alarm_time_hour <= 9 ? `0${alarm_time_hour}` : alarm_time_hour;
        $("#alarm-time-hour").text(sTime)

    });

    $("#time-hour-dec").click(function () {

        if (alarm_time_hour > 0) {
            alarm_time_hour--;
        } else {
            alarm_time_hour = 23;
        }

        let sTime = alarm_time_hour <= 9 ? `0${alarm_time_hour}` : alarm_time_hour;
        $("#alarm-time-hour").text(sTime)

    });

    $("#time-mins-add").click(function () {

        if (alarm_time_mins < 59) {
            alarm_time_mins++;
        } else {
            alarm_time_mins = 0;
        }

        let sTime = alarm_time_mins <= 9 ? `0${alarm_time_mins}` : alarm_time_mins;
        $("#alarm-time-mins").text(sTime)

    });

    $("#time-mins-dec").click(function () {

        if (alarm_time_mins > 0) {
            alarm_time_mins--;
        } else {
            alarm_time_mins = 59;
        }

        let sTime = alarm_time_mins <= 9 ? `0${alarm_time_mins}` : alarm_time_mins;
        $("#alarm-time-mins").text(sTime)

    });

    $("#set-alarm").click(function () {

        alarm_is_set = true;
        let lbl = $("#lbl-alarm");
        lbl.removeClass("hidden");

        let sHour = alarm_time_hour <= 9 ? `0${alarm_time_hour}` : alarm_time_hour;
        let sMins = alarm_time_mins <= 9 ? `0${alarm_time_mins}` : alarm_time_mins;

        let noon = "";
        if (alarm_time_hour >= 0 && alarm_time_hour < 12) {
            noon = "AM";
        } else {
            noon = "PM";
        }

        lbl.find("#alarm-time").text(`${sHour}:${sMins}${noon}`);

        alarm = new Date()
        alarm.setHours(alarm_time_hour);
        alarm.setMinutes(alarm_time_mins);
        alarm.setSeconds(0);
        let now = new Date();
        if (now > alarm) {
            alarm.setTime(alarm.getTime() + 60 * 60 * 24 * 1000);
        }
        console.log(alarm);
    });




});