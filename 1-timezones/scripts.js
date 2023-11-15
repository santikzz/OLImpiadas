const api_url = "http://worldtimeapi.org/api/timezone";

const countries = [
    { "dom": "clock-1", "code": "AR", "zone": "America/Buenos_Aires" },
    { "dom": "clock-2", "code": "BR", "zone": "America/Sao_Paulo" },
    { "dom": "clock-3", "code": "US", "zone": "America/New_York" },

    { "dom": "clock-4", "code": "RU", "zone": "Europe/Moscow" },
    { "dom": "clock-5", "code": "FR", "zone": "Europe/Paris" },
    { "dom": "clock-6", "code": "DE", "zone": "Europe/Berlin" },

    { "dom": "clock-7", "code": "JP", "zone": "Asia/Tokyo" },
    { "dom": "clock-8", "code": "KR", "zone": "Asia/Seoul" },
    { "dom": "clock-9", "code": "CN", "zone": "Asia/Bangkok" }
]

const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

function updateClocks() {

    // for each country in countries[]
    $.each(countries, function (idx, country) { 

        // http get request to the api => example: http://worldtimeapi.org/api/timezone/America/Buenos_Aires
        $.get(`${api_url}/${country['zone']}`, function (data) {

            // get the html clock with its ID in the DIV
            let clock = $(`#${country['dom']}`);
            
            // get the datetime from the json
            let dt = data["datetime"];

            // parse the hours and minutes using substring
            // 2023-11-14T00: [ 19 ] : [ 04 ] .194299-03:00
            let hours = dt.substring(11, 13); // -> 19
            let mins = dt.substring(14, 16); // -> 04
            
            // get the day of the week index, 0 = sunday, 1 = monday... 7 = saturday
            // to the be used with days[] array containing its name
            let day = days[data["day_of_week"]];

            // set the bottom text of the clock, (country code and day of the week)
            clock.find(".text-green").text(`${country['code']} - ${day}`);
            // put the country code flag next to the text
            clock.find(".flag").attr('src', `https://flagsapi.com/${country['code']}/flat/32.png`);
            
            // update the hours and minutes of the clock
            clock.find(".left").text(hours);
            clock.find(".right").text(mins);

        });
        
    });
}

// await for the DOM to finish loading
$(document).ready(function () {

    updateClocks(); // initialize the clocks
    setInterval(function () { updateClocks(); }, 1000 * 60); // every 1 minute (1000*60 seconds), update the clocks

});