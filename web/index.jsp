<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="calgary sports, sports data, sports map, availability of courts, outdoor sports location, soccer calgary, tennis calgary, cricket calgary, rugby calgary, volleyball calgary, sportsity, google maps api" />
<meta name="description" content="Discover nearby courts for your favorite outdoor sports." />
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="apple-mobile-web-app-title" content="Sportsity">
<meta name="theme-color" content="#00ab38">
<meta name="msapplication-square70x70logo" content="img/app/tile-small.png" />
<meta name="msapplication-square150x150logo" content="img/app/tile-medium.png" />
<meta name="msapplication-wide310x150logo" content="img/app/tile-wide.png" />
<meta name="msapplication-square310x310logo" content="img/app/tile-large.png" />
<title>App &bullet; Sportsity &ndash; Discover nearby courts for your favorite outdoor sports</title>
<link rel="stylesheet" href="css/style.css" />
<link rel="apple-touch-icon-precomposed" href="img/app/apple-touch-icon.png" />
<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)" href="img/app/launch-screen-iphone-6.png" />
<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3)" href="img/app/launch-screen-iphone-6p.png" />
<link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" href="img/app/launch-screen-iphone-5.png" />
<link rel="icon" type="image/x-icon" href="favicon.ico" />
<script src="http://maps.google.com/maps/api/js?sensor=true&amp;key=AIzaSyCuQopAhAbQ4In9h73Y8g_yKlhliDifRyI"> </script>
</head>
<body onload="initialize();">
    <div id="menu">
        <div class="ui sportsity animated bounceInDown"> </div>
        <div class="ui location animated bounceInDown" id="geolocate" onclick="getUserLocation();"> 
            <img class="icon" src="img/ui/arrow-locate.png" alt="Locate" title="Locate Me" width="24" height="24" />
        </div>
        <a class="typeform-share link ui vote animated bounceInDown" href="https://sportsity.typeform.com/to/k3v3cC" data-mode="1" target="_blank">
             
                <img class="icon" src="img/ui/vote.png" alt="Vote" title="Vote for Next City" width="24" height="24" />
           
        </a>
        <div class="ui dropdown animated bounceInDown">
            <select>
                <option value="" disabled selected>Choose Sport</option>
                <option value="tennis">Tennis</option>
                <option value="basketball">Basketball</option>
                <option value="soccer">Soccer</option>
                <option value="rugby">Rugby</option>
                <option value="football">Football</option>
                <option value="cricket">Cricket</option>
                <option value="baseball">Baseball</option>
                <option value="field hockey">Field Hockey</option>
                <option value="volleyball">Volleyball</option>
            </select>
        </div>
    </div>
	<div id="map-canvas"> </div>
    <div class="overlay"> </div>
        <div id="modal" class="ui"> 
            <h1>Welcome to</h1>
            <p><img src="img/ui/sportsity-logo-alt.png" alt="Sportsity" width="188" height="48" /> </p>
            <p>Discover and share nearby courts for your favourite outdoor sports.</p>
            <div class="get-started">Let the Games Begin</div>
            <p class="learn-more">or <a href="http://sportsity.co">Learn More &rarr;</a></p>
            <p class="about">Copyright &copy; 2015 Sportsity. Designed and developed by <a href="http://bilalkarim.com" target="_blank">Bilal Karim</a> &amp; <a href="http://kamberov.me" target="_blank">Rustam Kamberov</a>.</p>
            <p class="notice">Data provided by the <a href="https://data.calgary.ca" target="_blank">City of Calgary Open Data Catalogue</a>. Application hosted on <a href="http://cybera.ca/projects/cloud-resources/rapid-access-cloud" target="_blank">Rapid Access Cloud</a> by <a href="http://cybera.ca" target="_blank">Cybera</a>. Sportsity is not responsible for any injuries or unavailable courts at the time of your play.</p>
            <p class="credit">Powered by Google Maps API &hearts; </p>
            <p class="sub-credit">(with Directions Service and Static Maps API)</p>
            <p class="contact">Comments or suggestions? <br /> Send an email to <a href="mailto:info@sportsity.co?Subject=Sportsity%20Feedback">info@sportsity.co</a></p>
        </div>
<script src="js/jquery.min.js"> </script>
<script src="js/infobox.js"> </script>
<script src="js/map.js"> </script>
<script src="js/markerclusterer.js"> </script>
<script src="js/sport-select.js"> </script>
<script src="js/fastclick.js"> </script>
<script src="js/outbound.js"> </script>
<script>(function(){var qs,js,q,s,d=document,gi=d.getElementById,ce=d.createElement,gt=d.getElementsByTagName,id='typef_orm',b='https://s3-eu-west-1.amazonaws.com/share.typeform.com/';if(!gi.call(d,id)){js=ce.call(d,'script');js.id=id;js.src=b+'share.js';q=gt.call(d,'script')[0];q.parentNode.insertBefore(js,q)}})() </script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-62756196-1', 'app.sportsity.co');
  ga('require', 'displayfeatures');
  ga('send', 'pageview');
  ga('require', 'linkid', 'linkid.js');
</script>
</body>
</html>