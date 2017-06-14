// returns weather description
// expects number weather id
function getWeatherDesc(currentWeather) {
    switch (currentWeather) {
        case 200:
            uebersetzt = "Gewitter mit Leichtregen";
            break;
        case 201:
            uebersetzt = "Gewitter mit Regen";
            break;
        case 202:
            uebersetzt = "Gewitter mit Starkregen";
            break;
        case 210:
            uebersetzt = "Leichtes Gewitter";
            break;
        case 211:
            uebersetzt = "Gewitter";
            break;
        case 212:
            uebersetzt = "Starkes Gewitter";
            break;
        case 221:
            uebersetzt = "vereinzelt Schauer und Gewitter";
            break;
        case 230:
            uebersetzt = "Gewitter mit Nieselregen";
            break;
        case 231:
            uebersetzt = "Gewitter mit Regen";
            break;
        case 232:
            uebersetzt = "Gewitter mit Starkregen";
            break;
        case 300:
            uebersetzt = "Nieselregen";
            break;
        case 301:
            uebersetzt = "Nieselregen";
            break;
        case 302:
            uebersetzt = "Starker Nieselregen";
            break;
        case 310 :
            uebersetzt = "Leichter Nieselregen";
            break;
        case 311:
            uebersetzt = "Regenegen";
            break;
        case 312:
            uebersetzt = "Starker Sprühregel";
            break;
        case 313:
            uebersetzt = "Starkregen mit Nieselregen";
            break;
        case 314:
            uebersetzt = "Starkregen";
            break;
        case 321:
            uebersetzt = "andauernder Starkregen";
            break;
        case 500:
            uebersetzt = "Leichter Regen";
            break;
        case 501:
            uebersetzt = "moderater Regen";
            break;
        case 502:
            uebersetzt = "Regen";
            break;
        case 503:
            uebersetzt = "Extremer Starkregen";
            break;
        case 504:
            uebersetzt = "extremer Regen";
            break;
        case 511:
            uebersetzt = "gefrierender Regen";
            break;
        case 520:
            uebersetzt = "Starkregen";
            break;
        case 521:
            uebersetzt = "Starkregen";
            break;
        case 522:
            uebersetzt = "extremer Starkregen";
            break;
        case 531:
            uebersetzt = "Regenschauer";
            break;
        case 600:
            uebersetzt = "Leichter Schneefall";
            break;
        case 601:
            uebersetzt = "Schneefall";
            break;
        case 602:
            uebersetzt = "Starker Schneefall";
            break;
        case 611:
            uebersetzt = "Schneeregen";
            break;
        case 612:
            uebersetzt = "Schneeregen";
            break;
        case 615:
            uebersetzt = "Leichter Regen, Schneemix";
            break;
        case 616:
            uebersetzt = "Regen, Schneemix";
            break;
        case 620:
            uebersetzt = "leichter Schneefall";
            break;
        case 621:
            uebersetzt = "Schneefall";
            break;
        case 622:
            uebersetzt = "Starker Schneefall";
            break;
        case 701:
            uebersetzt = "Nebel";
            break;
        case 711:
            uebersetzt = "Dunst";
            break;
        case 721:
            uebersetzt = "Dunstschleier";
            break;
        case 731:
            uebersetzt = "Staub, Sand";
            break;
        case 741:
            uebersetzt = "Nebel";
            break;
        case 751:
            uebersetzt = "Sand";
            break;
        case 761:
            uebersetzt = "Staub";
            break;
        case 762:
            uebersetzt = "Vulkanasche";
            break;
        case 771:
            uebersetzt = "SturmbÃ¶en";
            break;
        case 781:
            uebersetzt = "Tornado";
            break;
        case 800:
            uebersetzt = "Klarer Himmel";
            break;
        case 801:
            uebersetzt = "Schleierwolken";
            break;
        case 802:
            uebersetzt = "auflockernd Bewölkt";
            break;
        case 803:
            uebersetzt = "abwechselnd Bewölkt";
            break;
        case 804:
            uebersetzt = "Bewölkt";
            break;
        case 900:
            uebersetzt = "Tornado";
            break;
        case 901:
            uebersetzt = "Tropensturm";
            break;
        case 902:
            uebersetzt = "Hurrikan";
            break;
        case 903:
            uebersetzt = "kalt";
            break;
        case 904:
            uebersetzt = "heiß";
            break;
        case 905:
            uebersetzt = "windig";
            break;
        case 906:
            uebersetzt = "Hagel";
            break;
        case 951:
            uebersetzt = "windstill";
            break;
        case 952:
            uebersetzt = "leichte Briese";
            break;
        case 953:
            uebersetzt = "sanfte Briese";
            break;
        case 954:
            uebersetzt = "moderate Briese";
            break;
        case 955:
            uebersetzt = "frische Briese";
            break;
        case 956:
            uebersetzt = "Starke Briese";
            break;
        case 957:
            uebersetzt = "starker Wind";
            break;
        case 958:
            uebersetzt = "leichter Wind";
            break;
        case 959:
            uebersetzt = "Starkwind";
            break;
        case 960:
            uebersetzt = "Sturm";
            break;
        case 961:
            uebersetzt = "Starker Sturm";
            break;
        case 962:
            uebersetzt = "Hurrikan";
            break;
    }
    return uebersetzt;
}

//returns day of week
//expects number day of week 0-6
function getDayString(day) {
    switch (day) {
        case 0:
            return "Sonntag";
        case 1:
            return "Montag";
        case 2:
            return "Dienstag";
        case 3:
            return "Mittwoch";
        case 4:
            return "Donnerstag";
        case 5:
            return "Freitag";
        case 6:
            return "Samstag";
    }
}

function getAlertDesc(id) {
    // H1 Herzinfakt
    // H2 Herinzinfakt
    // S1 Badewetter
    // W1 Frostchance
    // W2 Arschkälte
    // W3 starker Schneefall
    // T1 Tropische Luftfeuchtigkeit
    switch (id) {
        case "H1": {
            return "Starke Luftdruckschwankungen, nehmen Sie Ihre Medizin falls benötigt";
        }
        case "H2": {
            return "Temperaturen über 25 °C, nehmen Sie Ihre Medizin falls benötigt";
        }
        case "S1": {
            return "Ideales Badewetter";
        }
        case "W1": {
            return "Achtung, Frostgefahr";
        }
        case "W2": {
            return "Achtung, sehr niedrige Temperaturen. Ziehen Sie sich warm an.";
        }
        case "W3": {
            return "Achtung, schwere Schneefälle.";
        }
        case "T1": {
            return "Luftfeuchtigkeit über 90%";
        }
    }
    console.log("getAlertDesc unknown alert: " + id)
}