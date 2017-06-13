<!doctype html>
<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Milf Weather</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="icon" type="image/x-icon" href="/favicon.ico">

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
          integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <link rel="stylesheet" href="css/c3.css">

    <link rel="stylesheet" href="css/main.css">

    <script src="js/vendor/modernizr-2.8.3.min.js"></script>
</head>
<body>
<?php
/*// Get Environment Variables
$ip = getenv('MOM');

$ip2 = $_SERVER['MOM'];
$ip3 = $_ENV['MOM'];

setcookie("mom", $ip, time() + (86400 * 30), "/");
setcookie("mom2", $ip2, time() + (86400 * 30), "/");
setcookie("mom3", $ip3, time() + (86400 * 30), "/");
*/ ?>

<script type="text/javascript">momAddress = "<?php echo getenv("momAddress"); ?>";</script>
<script type="text/javascript">momPort = "<?php echo getenv("momPort"); ?>";</script>
<script type="text/javascript">tenant = "<?php echo getenv("tenant"); ?>";</script>
<script type="text/javascript">topicToday = "<?php echo getenv("topicToday"); ?>";</script>
<script type="text/javascript">topicWeek = "<?php echo getenv("topicWeek"); ?>";</script>
<script type="text/javascript">topicAlert = "<?php echo getenv("topicAlert"); ?>";</script>

<div class="container">
    <!-- Navbar -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                        aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Navigation umschalten</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Milf Weather</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                           aria-expanded="false">
                            Städte
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="#" onclick="changeCity('24103')">Kiel</a></li><!-- SH -->
                            <li><a href="#" onclick="changeCity('19055')">Schwerin</a></li><!-- MV -->
                            <li><a href="#" onclick="changeCity('20095')">Hamburg</a></li><!-- HH -->
                            <li><a href="#" onclick="changeCity('28215')">Bremen</a></li><!-- HB -->
                            <li><a href="#" onclick="changeCity('30159')">Hannover</a></li><!-- NI -->
                            <li><a href="#" onclick="changeCity('14467')">Potsdam</a></li><!-- BB -->
                            <li><a href="#" onclick="changeCity('10785')">Berlin</a></li><!-- BE -->
                            <li><a href="#" onclick="changeCity('39104')">Magdeburg</a></li><!-- ST -->
                            <li><a href="#" onclick="changeCity('40213')">Düsseldorf</a></li><!-- NRW -->
                            <li><a href="#" onclick="changeCity('65183')">Wiesbaden</a></li><!-- HE -->
                            <li><a href="#" onclick="changeCity('99084')">Erfurt</a></li><!-- TH -->
                            <li><a href="#" onclick="changeCity('01069')">Dresden</a></li><!-- SN -->
                            <li><a href="#" onclick="changeCity('55116')">Mainz</a></li><!-- RP -->
                            <li><a href="#" onclick="changeCity('66111')">Saarbrücken</a></li><!-- SL -->
                            <li><a href="#" onclick="changeCity('70173')">Stuttgart</a></li><!-- BW -->
                            <li><a href="#" onclick="changeCity('78467')">Konstanz</a></li><!-- BW Konstanz -->
                            <li><a href="#" onclick="changeCity('80331')">München</a></li><!-- BY -->

                            <!--<li role="separator" class="divider"></li>
                            <li class="dropdown-header">Nav header</li>
                            <li><a href="#">Separated link</a></li>-->
                        </ul>
                    </li>
                </ul>
                <form id="loginForm" class="navbar-form navbar-right" role="form" action="javascript:void(0)">
                    <!-- actions skips page reload on submit, handled in js -->
                    <div class="form-group">
                        <input id="username" type="text" placeholder="Benutzername" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <input id="password" type="password" placeholder="Kennwort" class="form-control" required>
                    </div>
                    <button type="submit" class="btn btn-success">Anmelden</button>
                </form>
                <div id="alertNavbar" class="alert alert-danger navbar-toggle collapsed" role="alert">
                    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    <span class="sr-only">Alert Type:</span>
                    Alert Text
                </div>
            </div><!--/.navbar-collapse -->
        </div>
    </nav>

    <!-- Weather today -->
    <div class="jumbotron">
        <div id="alertJumbotron" class="alert alert-info" role="alert">
            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span class="sr-only">Alert Type:</span>
            Alert Text
        </div>
        <div class="container hidden" id="todayContainer">
            <h1 id="city">City Name</h1>
            <h4 id="datetime"><!--filled by js--></h4>
            <div id="now">
                <p>
                    <img class="weatherIcon" id="nowImage"
                         src="img/n01.png">
                    <span class="extent" id="nowTemp">Temperature</span> °C
                </p>
                <p id="nowDescription">weatherDescription</p>
                <div id="nowDetails" class="row">
                    <p class="col-sm-4">Wind: <span id="nowWindSpeed">windSpeed</span> km/h</p>
                    <p class="col-sm-4">Richtung: <span id="nowWindDirection">windDirection</span>°</p>
                    <p class="col-sm-4">Luftfeuchte: <span id="nowHumidity">Humidity</span>%</p>
                </div>
            </div>
        </div>
    </div>

    <!--<hr style="margin-bottom: 30px">-->

    <!-- Weather week-->
    <div>
        <!-- Weather week graph-->
        <div id="chart"></div>

        <!-- Weather week details-->
        <div class="row hidden" id="weekDetails">
            <div class="col-sm-2" id="day0">
                <h4 class="weekday">Wochentag</h4>
                <p>
                    <img class="weatherIcon" src="img/loading.gif"><br>
                    <span class="max">Temperatur</span> °C<br>
                    <span class="min">Temperatur</span> °C
                </p>
            </div>
            <div class="col-sm-2" id="day1">
                <h4 class="weekday">Wochentag</h4>
                <p>
                    <img class="weatherIcon" src="img/loading.gif"><br>
                    <span class="max">Temperatur</span> °C<br>
                    <span class="min">Temperatur</span> °C
                </p>
            </div>
            <div class="col-sm-2" id="day2">
                <h4 class="weekday">Wochentag</h4>
                <p>
                    <img class="weatherIcon" src="img/loading.gif"><br>
                    <span class="max">Temperatur</span> °C<br>
                    <span class="min">Temperatur</span> °C
                </p>
            </div>
            <div class="col-sm-2" id="day3">
                <h4 class="weekday">Wochentag</h4>
                <p>
                    <img class="weatherIcon" src="img/loading.gif"><br>
                    <span class="max">Temperatur</span> °C<br>
                    <span class="min">Temperatur</span> °C
                </p>
            </div>
            <div class="col-sm-2" id="day4">
                <h4 class="weekday">Wochentag</h4>
                <p>
                    <img class="weatherIcon" src="img/loading.gif"><br>
                    <span class="max">Temperatur</span> °C<br>
                    <span class="min">Temperatur</span> °C
                </p>
            </div>
            <div class="col-sm-2" id="day5">
                <h4 class="weekday">Wochentag</h4>
                <p>
                    <img class="weatherIcon" src="img/loading.gif"><br>
                    <span class="max">Temperatur</span> °C<br>
                    <span class="min">Temperatur</span> °C
                </p>
            </div>
        </div>
    </div>

    <hr>

    <footer>
        <p>&copy; MILF Weather 2017</p>
    </footer>
</div> <!-- /container -->
</div>

<!-- TODO use minified versions, use cdns and only serve local if cdn failed -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.js"></script>
<script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.js"><\/script>')</script>

<script src="https://d3js.org/d3.v3.js"></script>
<script src="js/vendor/c3.js"></script>

<script src="js/vendor/bootstrap.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js" type="text/javascript"></script>
<script src="js/translations.js"></script>
<script src="js/main.js"></script>
</body>
</html>
