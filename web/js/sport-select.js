var venues = [];
var venueCluster;
var infoBubble;

// Iterate over each select element
$('select').each(function () {
    // Cache the number of options
    var $this = $(this),
        numberOfOptions = $(this).children('option').length;
    // Hides the select element
    $this.addClass('s-hidden');
    // Wrap the select element in a div
    $this.wrap('<div class="select"></div>');
    // Insert a styled div to sit over the top of the hidden select element
    $this.after('<div class="styledSelect"></div>');
    // Cache the styled div
    var $styledSelect = $this.next('div.styledSelect');
    // Show the first select option in the styled div
    $styledSelect.text($this.children('option').eq(0).text());
    // Insert an unordered list after the styled div and also cache the list
    var $list = $('<ul />', {
        'class': 'options'
    }).insertAfter($styledSelect);
    // Insert a list item into the unordered list for each select option
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }
    // Cache the list items
    var $listItems = $list.children('li');
    // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
    $styledSelect.click(function (e) {
        e.stopPropagation();
        $('div.styledSelect.active').each(function () {
            $(this).removeClass('active').next('ul.options').hide();
        });
        $(this).addClass('active').next('ul.options').show();
    });
    // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
    // Updates the select element to have the value of the equivalent option
    $listItems.click(function (e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        
        ga("send","event","Sport","Clicks",$this.val());
        
        if (typeof venueCluster != "undefined") {
            deleteVenues();
        }    
        
        if (typeof infoBubble !== "undefined" && infoBubble) {
            infoBubble.close();
        }
        
        map.setZoom(11);
        map.setCenter(yyc);
        
        var JSONResponse = $.ajax({  
                type: "GET",  
                url: "GetVenues",  
                data: "sportValue=" + $this.val(),  
                async: false
        }).responseText;  
        
        var parsedVenueSet = parseJSONObject(JSONResponse);
               
        if (parsedVenueSet == null) {
            alert("No venues for that sport");
        }
        else {
            $.each(parsedVenueSet.venues, function(key, value) {
                var venueID = value.venueID;
                var myLat = value.latitude;
                var myLong = value.longitude;
                var venType = value.venueType;
                var fields = value.fields;
                var owner = value.venueSteward;
                addVenue(venueID, myLat, myLong, venType, fields, owner);
                venueCourts(fields);
            });
                        
            var clusterOptions = {
                enableRetinaIcons: true,
                gridSize: 50,
                styles: [{
                  textColor: 'white',
                  textSize: 12,
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 'bold',
                  url: 'img/markers/low-cluster.png',
                  height: 40,
                  width: 40
                },{
                  textColor: 'white',
                  textSize: 12,
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 'bold',
                  url: 'img/markers/medium-cluster.png',
                  height: 40,
                  width: 40
                },{
                  textColor: 'white',
                  textSize: 12,
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 'bold',
                  url: 'img/markers/high-cluster.png',
                  height: 40,
                  width: 40
                }]
            };
            
            venueCluster = new MarkerClusterer(map, venues, clusterOptions); 
            google.maps.event.addListener(venueCluster, 'click', function () {
                if (infoBubble) {
                    infoBubble.close();
                }
            });
        }
    });
    // Hides the unordered list when clicking outside of it
    $(document).click(function () {
        $styledSelect.removeClass('active');
        $list.hide();
    });
});


function likeCounter(venueID) {
var likeNumber = document.getElementById("like-number");
likeNumber.className = 'press';

    $.ajax({
        url: "getLikability",
        dataType: 'JSON',
        type: "POST",
        data: { 
              venueID: JSON.stringify(venueID),
              action: "update likability status"
            },
        success: function(data){	
            likeNumber.innerHTML = data;
        }}
    );  
}


function parseJSONObject(rawJSONResponse) {
    var parsedModuleObjectResponse = jQuery.parseJSON(rawJSONResponse);                
    return parsedModuleObjectResponse;
}

function venueCourts(fields) {
    var numCourts = fields;
    if (numCourts > 1) {
        var showCourts = numCourts + " " + "Play Zones" + "&nbsp";
        return showCourts;
    } else if (numCourts === 1) {
        var showCourts = numCourts + " " + "Play Zone" + "&nbsp";
        return showCourts;
    } else if (numCourts === 0) {
        var showCourts = "";
        return showCourts;
    } else {
        return numCourts;
    }
}

function addVenue(venueID, lat, lng, venueType, fields, owner){
    var venueLocation = new google.maps.LatLng(lat, lng);
    var numCourts = venueCourts(fields);
    var ownershipBy = owner;
    var iconPath = getIconPath(venueType);
    var venueMarker = new google.maps.Marker({
        icon: iconPath,
        position: venueLocation,
        zIndex: 9999999999
    });
        
    google.maps.event.addListener(venueMarker, 'click', function () {
        ga("send","event","Venue Marker","Views",venueID);
        
        if (infoBubble) {
            infoBubble.close();   
        }
        
        $.ajax({
            url: "getLikability",
            dataType: 'JSON',
            type: "POST",
            data: { 
                  venueID: JSON.stringify(venueID),
                  action: "get likability status"
                },
            success: function(data) {
                var likeNumber = document.getElementById("like-number");
                likeNumber.innerHTML = data;
            }}
        );
        
        geocoder.geocode({'latLng':venueLocation}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var locationName = document.getElementById('location-name');
                    locationName.innerHTML = "" + results[0].address_components[0].long_name + " " + results[0].address_components[1].short_name;
                } else {
                    alert('Sorry, the address of this location is not available.');
                }
            } else {
                alert('Slow down Speedy Gonzales!');
            }
        });
        
        if (userLocation) {
            p1 = userLocation;
            p2 = venueLocation;

            var request = {
                origin: p1,
                destination: p2,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
            
            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    directionsDisplay.setMap(map);
                    var locationDistance = document.getElementById('location-distance');
                    locationDistance.innerHTML = "&#126;" + " " + response.routes[0].legs[0].duration.text + " " + "Away";
                }
            });
        }
        
        var boxText = document.createElement("div");

        if (useragent.indexOf('iPhone') != -1) {
            boxText.innerHTML = 
            '<div class="location-mask">' +
                '<a onclick=\'ga("send","event","Google Maps","Views")\' class="location-route" href="comgooglemaps://?daddr=' + lat + ',' + lng + '&zoom=18&views=satellite,traffic"><img src="img/ui/directions.png" width="32" height="32" alt="Directions"/></a>' +

                '<span id="location-name"> </span>' + 
                '<span class="location-ownership">' + ownershipBy + '</span>' +
                '<span id="location-courts">' + numCourts + '</span>' +
                '<span id="location-distance">' + '</span>' +

                '<div class="location-bg"><div class="shadow">' + 
                '<img src="https://maps.googleapis.com/maps/api/staticmap?center='+ lat + ',' + lng + '&zoom=18&size=285x245&maptype=satellite&format=png32&key=AIzaSyCuQopAhAbQ4In9h73Y8g_yKlhliDifRyI" /></div></div>' +
            '</div>' +
            
            '<span id="like-system" onclick="likeCounter('+venueID+');"><span class="like-label">Like</span>' + '<span id="like-number">'+ 25+'</span></span>' + '<span class="networks-sm"><a onclick=\'ga("send","event","Twitter Share","Clicks")\' href="https://twitter.com/share?&text=Let\’s go play' + " " + venueType + ' at&url=https://www.google.ca/maps/dir//' + lat + ',' + lng + '/@' + lat + ',' + lng + ',239m/data=!3m1!1e3&hashtags=LetTheGamesBegin,yyc&via=sportsityapp"' + 'target="_blank"' + '><span class="tw"></span></a><a onclick=\'ga("send","event","Facebook Share","Clicks")\' href="https://www.facebook.com/sharer/sharer.php?u=https://www.google.ca/maps/dir//' + lat + ',' + lng + '/@' + lat + ',' + lng + ',239m/data=!3m1!1e3"' + 'target="_blank"' + '><span class="fb"></span></a><a onclick=\'ga("send","event","SMS Share","Clicks")\' href="sms:&body=Let\'s%20go%20play' + "%20" + venueType + '%20at' + "%20" + 'https://www.google.ca/maps/dir//' + lat + ',' + lng + '/@' + lat + ',' + lng + ',239m/data=!3m1!1e3">' + '<span class="sms"></span></a></span>';
        } else {
            boxText.innerHTML = 
            '<div class="location-mask">' +
                '<a onclick=\'ga("send","event","Google Maps","Views")\' class="location-route" target="_blank" href="https://www.google.ca/maps/dir//' + lat + ',' + lng + '/@' + lat + ',' + lng + ',239m/data=!3m1!1e3"><img src="img/ui/directions.png" width="32" height="32" alt="Directions"/></a>' +
                
                '<span id="location-name"> </span>' + 
                '<span class="location-ownership">' + ownershipBy + '</span>' +
                '<span id="location-courts">' + numCourts + '</span>' +
                '<span id="location-distance">' + '</span>' +
                
                '<div class="location-bg"><div class="shadow">' + 
                '<img src="https://maps.googleapis.com/maps/api/staticmap?center='+ lat + ',' + lng + '&zoom=18&size=285x245&maptype=satellite&format=png32&key=AIzaSyCuQopAhAbQ4In9h73Y8g_yKlhliDifRyI" /></div></div>' +
            '</div>' +
            
            '<span id="like-system" onclick="likeCounter('+venueID+');"><span class="like-label">Like</span>' + '<span id="like-number"></span></span>' + '<span class="networks-lg"><a onclick=\'ga("send","event","Twitter Share","Clicks")\' href="https://twitter.com/share?&text=Let\’s go play' + " " + venueType + ' at&url=https://www.google.ca/maps/dir//' + lat + ',' + lng + '/@' + lat + ',' + lng + ',239m/data=!3m1!1e3&hashtags=LetTheGamesBegin,yyc&via=sportsityapp"' + 'target="_blank"' + '><span class="tw"></span></a><a onclick=\'ga("send","event","Facebook Share","Clicks")\' href="https://www.facebook.com/sharer/sharer.php?u=https://www.google.ca/maps/dir//' + lat + ',' + lng + '/@' + lat + ',' + lng + ',239m/data=!3m1!1e3"' + 'target="_blank"' + '><span class="fb"></span></a></span>';
        }
        
        var myOptions = {
            content: boxText,
            disableAutoPan: false,
            alignBottom: true,
            pixelOffset: new google.maps.Size(-126, -50),
            zIndex: null,
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false
        };
        
        infoBubble = new InfoBox(myOptions);
        
        infoBubble.open(map,venueMarker);
        map.panTo(venueMarker.getPosition());
        map.panBy(0,-60);
    });
    
    google.maps.event.addListener(venueMarker, 'dblclick', function () {
        infoBubble.close();
        directionsDisplay.setMap(null);
    });
    
    venues.push(venueMarker);
}

function clearMap() {
    venueCluster.clearMarkers();
}

function clearVenues(){
    venues = [];
}

function deleteVenues(){
    clearMap();
    clearVenues();
}
