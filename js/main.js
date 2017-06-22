//variable declaration
//declared in php: momAddress, momPort, tenant, userName, password, topicToday, topicWeek, topicAlert;
var todayData, todayDataLast, weekData, weekDataLast;

function changeCity(plz) {
    //console.log("changeCity to " + plz);
    // unsubscribe old topics
    if (client.isConnected()) {
        client.unsubscribe(topicToday);
        client.unsubscribe(topicWeek);
        client.unsubscribe(topicAlert);
    }

    topicToday = topicToday.replace(/[\d]*/, plz);
    topicWeek = topicWeek.replace(/[\d]*/, plz);
    topicAlert = topicAlert.replace(/[\d]*/, plz);

    if (client.isConnected()) {
        onConnect(); //subs to new topics, clears warnings of old topics, closes the nav bar if open
    } else {
        manageAlertBoxes(true, "info", "Bitte melden Sie sich an.");
    }
}

$("#loginForm").get(0).onsubmit = function login(event) {
    // console.log("login ", event.toString(), $("#username").get(0).value, $("#password").get(0).value);

    userName = $("#username").get(0).value;
    password = $("#password").get(0).value;

    if (client.isConnected()) {
        client.disconnect();
    }

    connect();

    // prevent default actions implemented on browser side
    event.preventDefault();
    return false;
};

function getDateTime() {
    var datetime = new Date();

    // Create datetime String in german format
    /*var day = datetime.getDate().toString().length == 1 ? "0" + datetime.getDate() : datetime.getDate();
     var month = String(datetime.getMonth() + 1).length == 1 ? "0" + String(datetime.getMonth() + 1) : String(datetime.getMonth() + 1);
     var year = datetime.getFullYear().toString().length == 1 ? "0" + datetime.getFullYear() : datetime.getFullYear();
     var hour = datetime.getHours().toString().length == 1 ? "0" + datetime.getHours() : datetime.getHours();
     var min = datetime.getMinutes().toString().length == 1 ? "0" + datetime.getMinutes() : datetime.getMinutes();

     var string = day + "." + month + "." + year + " " + hour + ":" + min;*/
    return datetime.toLocaleString();
}

// update datetime automatically
setInterval(function () {
    $("#datetime").html(getDateTime());
}, 250); //update every 250 ms

function manageAlertBoxes(visible, type, msg) {
    // console.log("manage alert boxes", visible, type, msg);

    //show/hide alert Boxes
    if (visible === true) {
        //set type (success, info, warning, danger)
        if (type === "success" || type === "info" || type === "warning" || type === "danger") {
            //remove all classes starting with "alert-"
            $(".alertGroup").removeClass(function (index, className) {
                return (className.match(/alert-\w*/ig)).join(' ');
            }).addClass("alert-" + type)
        }

        //set msg
        $(".alertGroup").text(msg);

        //show alert
        $(".alertGroup").removeClass("hidden");
    } else {
        $(".alertGroup").addClass("hidden");
    }
}

manageAlertBoxes(true, "info", "Bitte melden Sie sich an.");


// renders the graph
function generateGraph(data) {
    try {
        c3.generate({
            bindto: "#chart",
            size: {
                height: 200
            },
            data: {
                columns: [
                    ["Höchsttemperatur (°C)",
                        data.days[0].temperatureMax, data.days[1].temperatureMax, data.days[2].temperatureMax,
                        data.days[3].temperatureMax, data.days[4].temperatureMax, data.days[5].temperatureMax],
                    ["Tiefsttemperatur (°C)",
                        data.days[0].temperatureMin, data.days[1].temperatureMin, data.days[2].temperatureMin,
                        data.days[3].temperatureMin, data.days[4].temperatureMin, data.days[5].temperatureMin]
                ],
                colors: {
                    "Höchsttemperatur (°C)": "red",
                    "Tiefsttemperatur (°C)": "blue"
                }
            },
            axis: {
                x: {
                    type: "category",
                    categories: [
                        getDayString(new Date(data.days[0].date).getDay()), getDayString(new Date(data.days[1].date).getDay()),
                        getDayString(new Date(data.days[2].date).getDay()), getDayString(new Date(data.days[3].date).getDay()),
                        getDayString(new Date(data.days[4].date).getDay()), getDayString(new Date(data.days[5].date).getDay())
                    ]
                }
            },
            padding: {
                //same values as in main.css #weekDetails
                right: 30,
                left: 30
            }
        });
    }
    catch (err) {
        console.log(err.message);
    }
}


// Create a client instance
var client = new Paho.MQTT.Client(momAddress, parseInt(momPort), "/ws", "weatherWebClient");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;


// connect the client
function connect() {
    // console.log("connect");

    if (userName && password) {
        // check if username includes tenant, if not add tenant
        if (userName.includes(":") === false) {
            userName = tenant + ":" + userName;
        }
        client.connect({
            userName: userName,
            password: password,
            onSuccess: onConnect,
            onFailure: onFailure
        });
    }
}

// called when the client connection fails
function onFailure(error) {
    console.log("onError", error.errorMessage, error);
    switch (error.errorCode) {
        case 6:
            manageAlertBoxes(true, "danger", "Verbindung fehlgeschlagen. Bitte überprüfen Sie Benutzername und Passwort.");
            break;
        default:
            manageAlertBoxes(true, "danger", "Verbindung fehlgeschlagen. Fehlermeldung: " + error.errorMessage);
    }
}

// called when the client connects
function onConnect() {
    // Once a connection has been made, subscribe to topics
    // console.info("onConnect");

    manageAlertBoxes(false);

    client.subscribe(topicToday);
    client.subscribe(topicWeek);
    client.subscribe(topicAlert);
    // console.log("subscribed to: ", topicToday, topicWeek, topicAlert);

    //if navbar is extended collapse on successful login
    if ($(".navbar-collapse").is(":visible") && $(".navbar-toggle").is(":visible")) {
        $(".navbar-collapse").collapse("hide");
    }
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    // errorCode 0 means disconncted by client
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
        manageAlertBoxes(true, "danger", "Verbindung abgebrochen. Es wird versucht die Verbindung wieder herzustellen.");
        connect(); //try to reconnect
    }
}

// called when a message arrives
function onMessageArrived(message) {
    // console.info("onMessageArrived:" + message.payloadString + "received via: " + message.destinationName);

    switch (message.destinationName) {
        case topicToday:
            //console.log("today: ", message.payloadString);
            todayData = message.payloadString;
            if (todayData != todayDataLast) {
                todayDataLast = todayData;
                var data = JSON.parse(todayData);
                // $("#city").text(data.cityName); //set by weekly data because api serves better city names there
                $("#nowImage").attr("src", "img/" + data.weatherIcon + ".png");
                $("#nowTemp").text(data.temperature);
                $("#nowDescription").text(getWeatherDesc(data.currentWeatherId));
                $("#nowWindSpeed").text(data.windspeed);
                $("#nowWindDirection").text(data.windDeg);
                $("#nowHumidity").text(data.humidity);

                //show container
                $("#todayContainer").removeClass("hidden");

            } else {
                // console.log("no change in data received for today");
            }
            break;
        case topicWeek:
            // console.log("week", message.payloadString);
            weekData = message.payloadString;
            if (weekData != weekDataLast) {
                weekDataLast = weekData;
                var data = JSON.parse(weekData);
                $("#city").text(data.days[0].cityName);
                data.days.forEach(function (dataDay, index) {
                    var dayOfWeek = new Date(dataDay.date).getDay(); //0 (sunday) to 6 (saturday)
                    $("#day" + index + " .weekday").text(getDayString(dayOfWeek));
                    //dont use day weather icons for weekly, so replace n(ight) with d(ay)
                    $("#day" + index + " .weatherIcon").attr("src", "img/" + dataDay.weatherIcon.replace("n", "d") + ".png");
                    $("#day" + index + " .max").text(dataDay.temperatureMax);
                    $("#day" + index + " .min").text(dataDay.temperatureMin);
                });

                $("#weekDetails").removeClass("hidden");
                // (re)render graph
                generateGraph(data);
            } else {
                // console.log("no change in data received for week");
            }

            break;
        case topicAlert:
            //Example JSON: {"warning":"Temperature over 25 degree, please take medication if needed","title":"HearthRisk","code":"H3"}

            var data = JSON.parse(message.payloadString);
            var alertDesc = getAlertDesc(data.code);
            if (alertDesc) {
                manageAlertBoxes(true, "warning", alertDesc);
            }
            break;
        default:
            console.log("message received on unhandled topic: " + message.destinationName);
    }
}
