//variable declaration
//declared in php: momAddress, momPort, tenant, userName, password, topicToday, topicWeek, topicAlert;
var todayData, todayDataLast, weekData, weekDataLast, alertData, alertDataLast;
var dev = false;
//mom access data
if (dev) {
    momAddress = "localhost";
    momPort = 15675;
    userName = "guest";
    password = "guest";
    topicToday = "test";
    topicWeek = "test2";
    topicAlert = "test3";
}
/*else {
    momAddress = "ec2-34-210-210-13.us-west-2.compute.amazonaws.com";
    momPort = 15675;
 tenant = "weatherTenantOne";
    userName = tenant + "cadWebApp";
    password = "cadWebApp";
 topicToday = "78467/today/CEP";
    topicWeek = "78467/weekly/CEP";
    topicAlert = "78467/alert";
 }*/

function changeCity(plz) {
    //TODO use cookie as storage
    console.log("changeCity to " + plz);

    topicToday = topicToday.replace(/[\d]*/, plz);
    topicWeek = topicWeek.replace(/[\d]*/, plz);
    topicAlert = topicAlert.replace(/[\d]*/, plz);

    connect();
}

$("#loginForm").get(0).onsubmit = function login(event) {
    //TODO
    console.log("login ", event.toString(), $("#username").get(0).value, $("#password").get(0).value);

    userName = $("#username").get(0).value;
    password = $("#password").get(0).value;

    connect();

    event.preventDefault();
    return false;
};

function getDateTime() {
    var datetime = new Date();
    /*var day = datetime.getDate().toString().length == 1 ? "0" + datetime.getDate() : datetime.getDate();
     var month = String(datetime.getMonth() + 1).length == 1 ? "0" + String(datetime.getMonth() + 1) : String(datetime.getMonth() + 1);
     var year = datetime.getFullYear().toString().length == 1 ? "0" + datetime.getFullYear() : datetime.getFullYear();
     var hour = datetime.getHours().toString().length == 1 ? "0" + datetime.getHours() : datetime.getHours();
     var min = datetime.getMinutes().toString().length == 1 ? "0" + datetime.getMinutes() : datetime.getMinutes();

     var string = day + "." + month + "." + year + " " + hour + ":" + min;*/
    return datetime.toLocaleString();
}

setInterval(function () {
    $("#datetime").html(getDateTime());
}, 250); //update every 250 ms

function manageAlertBoxes(visible, type, msg) {
    var navAlert = $("#alertNavbar").addClass("hidden");
    var jumboAlert = $("#alertJumbotron").removeClass("hidden");

}
manageAlertBoxes();

function generateGraph(data) {
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
                    dayString(new Date(data.days[0].date).getDay()), dayString(new Date(data.days[1].date).getDay()),
                    dayString(new Date(data.days[2].date).getDay()), dayString(new Date(data.days[3].date).getDay()),
                    dayString(new Date(data.days[4].date).getDay()), dayString(new Date(data.days[5].date).getDay())
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


// Create a client instance
var client = new Paho.MQTT.Client(momAddress, parseInt(momPort), "/ws", "weatherWebClient");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;


// connect the client
function connect() {
    console.log("connect");
    if (client.isConnected()) {
        client.disconnect();
        console.log("disconnected");
    }
    if (userName && password) {
        // check if username includes tenant, if not add tenant
        if (userName.includes(":") == false) {
            userName = tenant + ":" + userName;
        }
        client.connect({
            userName: userName,
            password: password,
            onSuccess: onConnect,
            onFailure: onFailure,
        });
    }
}

// called when the client connection fails
function onFailure(error) {
    //TODO
    console.log("onError", error.errorMessage);
    alert("login failed");
}

// called when the client connects
function onConnect() {
    // Once a connection has been made, subscribe to topics
    console.info("onConnect");
    client.subscribe(topicToday);
    client.subscribe(topicWeek);
    client.subscribe(topicAlert);
    console.log("subscribed to: ", topicToday, topicWeek, topicAlert);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    console.info("onConnectionLost");
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
        connect(); //try to reconnect
    }
}

// called when a message arrives
function onMessageArrived(message) {
    console.info("onMessageArrived:" + message.payloadString + "received via: " + message.destinationName);

    //TODO parse, update html and canvas

    switch (message.destinationName) {
        case topicToday:
            //console.log("today: ", message.payloadString);
            todayData = message.payloadString;
            if (todayData != todayDataLast) {
                todayDataLast = todayData;
                var data = JSON.parse(todayData);
                $("#city").text(data.cityName);
                $("#nowImage").attr("src", "img/" + data.weatherIcon + ".png");
                $("#nowTemp").text(data.temperature);
                $("#nowDescription").text(getWeatherDesc(data.currentWeatherId));
                $("#nowWindSpeed").text(data.windspeed);
                $("#nowWindDirection").text(data.windDeg);
                $("#nowHumidity").text(data.humitidy); //TODO typo in data received

                //show container
                $("#todayContainer").removeClass("hidden");

            } else {
                console.log("no change in data received for today");
            }
            break;
        case topicWeek:
            // console.log("week", message.payloadString);
            weekData = message.payloadString;
            if (weekData != weekDataLast) {
                weekDataLast = weekData;
                var data = JSON.parse(weekData);
                data.days.forEach(function (dataDay, index) {
                    var dayOfWeek = new Date(dataDay.date).getDay(); //0 (sunday) to 6 (saturday)
                    $("#day" + index + " .weekday").text(dayString(dayOfWeek));
                    $("#day" + index + " .weatherIcon").attr("src", "img/" + dataDay.weatherIcon + ".png");
                    $("#day" + index + " .max").text(dataDay.temperatureMax);
                    $("#day" + index + " .min").text(dataDay.temperatureMin);
                });

                $("#weekDetails").removeClass("hidden");
                // (re)render graph
                generateGraph(data);
            } else {
                console.log("no change in data received for week");
            }

            break;
        case topicAlert:
            // TODO
            break;
        default:
            console.log("message received on unknown topic: " + message.destinationName);
    }
}