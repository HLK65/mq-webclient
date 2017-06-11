var dev = false;
//mom access data
if (dev) {
    var momAddress = "localhost";
    var momPort = 15675;
    var userName = "guest";
    var password = "guest";
    var topictoday = "test";
    var topicweek = "test2";
    var topicalert = "test3";
} else {
    var momAddress = "ec2-34-210-210-13.us-west-2.compute.amazonaws.com";
    var momPort = 15675;
    var userName = "weatherTenantOne:cadWebApp";
    var password = "cadWebApp";
    var topictoday = "78467/today/cep";
    var topicweek = "78467/weekly/cep";
    var topicalert = "78467/alert";
}

function changeCity(plz) {
    //TODO use cookie as storage
    console.log("changeCity");
}

function login(a,b,c) {
    //TODO
    console.log("login ",a,b,c);
}

function getDateTime() {
    var datetime = new Date();
    // var day = datetime.getDate().toString().length == 1 ? "0" + datetime.getDate() : datetime.getDate();
    // var month = String(datetime.getMonth() + 1).length == 1 ? "0" + String(datetime.getMonth() + 1) : String(datetime.getMonth() + 1);
    // var year = datetime.getFullYear().toString().length == 1 ? "0" + datetime.getFullYear() : datetime.getFullYear();
    // var hour = datetime.getHours().toString().length == 1 ? "0" + datetime.getHours() : datetime.getHours();
    // var min = datetime.getMinutes().toString().length == 1 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    //
    // var string = day + "." + month + "." + year + " " + hour + ":" + min;
    return datetime.toLocaleString();
}

setInterval(function() {
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
var client = new Paho.MQTT.Client(momAddress, momPort, "/ws", userName);

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({userName: userName, password: password, onSuccess: onConnect});


// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe(topictoday);
    client.subscribe(topicweek);
    client.subscribe(topicalert);
    //message = new Paho.MQTT.Message("Hello");
    //message.destinationName = "test";
    //client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    //reconnect TODO
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

// called when a message arrives
function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);
    $("#replace").append(message.payloadString);
    //TODO parse, update html and canvas

}


/*
 switch (currentWeather){
 case 200:
 uebersetzt="Gewitter mit Leichtregen";
 break;
 case 201:
 uebersetzt="Gewitter mit Regen";
 break;
 case 202:
 uebersetzt="Gewitter mit Starkregen";
 break;
 case 210:
 uebersetzt="Leichtes Gewitter";
 break;
 case 211:
 uebersetzt="Gewitter";
 break;
 case 212:
 uebersetzt="Starkes Gewitter";
 break;
 case 221:
 uebersetzt="vereinzelt Schauer und Gewitter";
 break;
 case 230:
 uebersetzt="Gewitter mit Nieselregen";
 break;
 case 231:
 uebersetzt="Gewitter mit Regen";
 break;
 case 232:
 uebersetzt="Gewitter mit Starkregen";
 break;
 case 300:
 uebersetzt="Nieselregen";
 break;
 case 301:
 uebersetzt="Nieselregen";
 break;
 case 302:
 uebersetzt="Starker Nieselregen";
 break;
 case 310 :
 uebersetzt="Leichter Nieselregen";
 break;
 case 311:
 uebersetzt="Regenegen";
 break;
 case 312:
 uebersetzt="Starker SprÃ¼hregel";
 break;
 case 313:
 uebersetzt="Starkregen mit Nieselregen";
 break;
 case 314:
 uebersetzt="Starkregen";
 break;
 case 321:
 uebersetzt="andauernder Starkregen";
 break;
 case 500:
 uebersetzt="Leichter Regen";
 break;
 case 501:
 uebersetzt="moderater Regen";
 break;
 case 502:
 uebersetzt="Regen";
 break;
 case 503:
 uebersetzt="Extremer Starkregen";
 break;
 case 504:
 uebersetzt="extremer Regen";
 break;
 case 511:
 uebersetzt="gefrierender Regen";
 break;
 case 520:
 uebersetzt="Starkregen";
 break;
 case 521:
 uebersetzt="Starkregen";
 break;
 case 522:
 uebersetzt="extremer Starkregen";
 break;
 case 531:
 uebersetzt="Regenschauer";
 break;
 case 600:
 uebersetzt="Leichter Schneefall";
 break;
 case 601:
 uebersetzt="Schneefall";
 break;
 case 602:
 uebersetzt="Starker Schneefall";
 break;
 case 611:
 uebersetzt="Schneeregen";
 break;
 case 612:
 uebersetzt="Schneeregen";
 break;
 case 615:
 uebersetzt="Leichter Regen, Schneemix";
 break;
 case 616:
 uebersetzt="Regen, Schneemix";
 break;
 case 620:
 uebersetzt="leichter Schneefall";
 break;
 case 621:
 uebersetzt="Schneefall";
 break;
 case 622:
 uebersetzt="Starker Schneefall";
 break;
 case 701:
 uebersetzt="Nebel";
 break;
 case 711:
 uebersetzt="Dunst";
 break;
 case 721:
 uebersetzt="Dunstschleier";
 break;
 case 731:
 uebersetzt="Staub, Sand";
 break;
 case 741:
 uebersetzt="Nebel";
 break;
 case 751:
 uebersetzt="Sand";
 break;
 case 761:
 uebersetzt="Staub";
 break;
 case 762:
 uebersetzt="Vulkanasche";
 break;
 case 771:
 uebersetzt="SturmbÃ¶en";
 break;
 case 781:
 uebersetzt="Tornado";
 break;
 case 800:
 uebersetzt="Klarer Himmel";
 break;
 case 801:
 uebersetzt="Schleierwolken";
 break;
 case 802:
 uebersetzt="auflockernd BewÃ¶lkt";
 break;
 case 803:
 uebersetzt="abwechselnd BewÃ¶lkt";
 break;
 case 804:
 uebersetzt="BewÃ¶lkt";
 break;
 case 900:
 uebersetzt="Tornado";
 break;
 case 901:
 uebersetzt="Tropensturm";
 break;
 case 902:
 uebersetzt="Hurrikan";
 break;
 case 903:
 uebersetzt="kalt";
 break;
 case 904:
 uebersetzt="heiÃŸ";
 break;
 case 905:
 uebersetzt="windig";
 break;
 case 906:
 uebersetzt="Hagel";
 break;
 case 951:
 uebersetzt="windstill";
 break;
 case 952:
 uebersetzt="leichte Briese";
 break;
 case 953:
 uebersetzt="sanfte Briese";
 break;
 case 954:
 uebersetzt="moderate Briese";
 break;
 case 955:
 uebersetzt="frische Briese";
 break;
 case 956:
 uebersetzt="Starke Briese";
 break;
 case 957:
 uebersetzt="starker Wind";
 break;
 case 958:
 uebersetzt="leichter Wind";
 break;
 case 959:
 uebersetzt="Starkwind";
 break;
 case 960:
 uebersetzt="Sturm";
 break;
 case 961:
 uebersetzt="Starker Sturm";
 break;
 case 962:
 uebersetzt="Hurrikan";
 break;
 }
 */

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