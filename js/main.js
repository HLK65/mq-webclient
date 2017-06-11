//variable declaration
var momAddress, momPort, tenant, userName, password, topicToday, topicWeek, topicAlert;
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
} else {
    momAddress = "ec2-34-210-210-13.us-west-2.compute.amazonaws.com";
    momPort = 15675;
    tenant = "weatherTenantOne:";
    userName = tenant + "cadWebApp";
    password = "cadWebApp";
    topicToday = "78467/today"; //TODO /cep
    topicWeek = "78467/weekly";
    topicAlert = "78467/alert";
}

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

var day1min = -25;
var day1max = 0;
var day2min = 5;
var day2max = 25;
var day3min = 22;
var day3max = 39;
var day4min = 12;
var day4max = 17;
var day5min = 8;
var day5max = 27;
var day6min = 12;
var day6max = 22;

var chart = c3.generate({
    bindto: "#chart",
    size: {
        height: 200
    },
    data: {
        columns: [
            ["Höchsttemperatur (°C)", day1max, day2max, day3max, day4max, day5max, day6max],
            ["Tiefsttemperatur (°C)", day1min, day2min, day3min, day4min, day5min, day6min]
        ],
        colors: {
            "Höchsttemperatur (°C)": "red",
            "Tiefsttemperatur (°C)": "blue"
        }
    },
    axis: {
        x: {
            type: "category",
            categories: ["Day1", "Day2", "Day3", "Day4", "Day5", "Day6"]
        }
    },
    padding: {
        //same values as in main.css #weekDetails
        right: 30,
        left: 30
    }
});


// Create a client instance
var client = new Paho.MQTT.Client(momAddress, momPort, "/ws", "weatherWebClient");

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
        client.connect({userName: userName, password: password, onSuccess: onConnect, onFailure: onFailure});
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
    console.log("onConnect");
    client.subscribe(topicToday);
    client.subscribe(topicWeek);
    client.subscribe(topicAlert);
    console.log("subscribed to: ", topicToday, topicWeek, topicAlert);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
        connect(); //try to reconnect
    }
}

// called when a message arrives
function onMessageArrived(message) {
    //console.log("onMessageArrived:" + message.payloadString + "received via: " + message.destinationName);

    //TODO parse, update html and canvas

    switch (message.destinationName) {
        case topicToday:
            console.log("today: " + message.payloadString);
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
                $("#nowHumidity").text(data.humitidy) //todo typo in data received

            } else {
                console.log("same data received for today");
            }
            break;
        case topicWeek:
            console.log("week");
            break;
        case topicAlert:
            break;
        default:
            console.log("message received on unknown topic: " + message.destinationName);
    }
}

/*
 {
 "longitude": 9.1459,
 "latitude": 47.6923,
 "cityName": "Wollmatingen",
 "plz": "78467",
 "weatherIcon": "01n",
 "currentWeather": "Sky is Clear",
 "currentWeatherId": 800,
 "pressure": 1023,
 "humitidy": 71,
 "windspeed": 1.07,
 "windDeg": 242.003,
 "temperature": 11.26,
 "temperatureMax": 12.0,
 "temperatureMin": 11.0
 } - received via topic: 78467/datetime
 */