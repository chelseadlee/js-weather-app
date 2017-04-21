$(window).on('load', function() {

    var $info = $('#info');

    var locLat = "";
    var locLong= "";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        $info.html("<p>Geolocation is not supported by this browser.</p>");
    }

    function showPosition(position) {
        locLat = position.coords.latitude;
        locLong = position.coords.longitude;
        getWeather(locLat, locLong);
    }

    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                info.innerHTML = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                info.innerHTML = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                info.innerHTML = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                info.innerHTML = "An unknown error occurred."
                break;
        }
    }


    var getWeather = function(locLat, locLong) {

        var url = 'http://api.openweathermap.org/data/2.5/weather?';

        $.ajax({
            url: url,
            data: {
                    lat: locLat,
                    lon: locLong,
                    units: 'imperial',
                    APPID: '6c817c24d2cb19e8c03e978418933a30'
            },
            dataType: 'json',
            error: function() {
                $('#info').html('<p>error</p>');
            },
            success: function(data) {
                var city = data.name;
                var weather = data.weather[0].main;
                var weatherDetails = data.weather[0].description;
                var fahrenheit = data.main.temp;
                var celsius = Math.round((fahrenheit - 32) / (9 / 5 ));
                var icon = "#icon-" + (data.weather[0].icon);
                $('#city').html(city);
                $('#description').text(weather);
                $('#temperature').text(fahrenheit + " °F");
                $('#icon').append('<svg class="icon"><use xlink:href="' + icon + '"</use></svg>');

                var temp = "f";
                var viewC = false;
                var $convert = $('#convert');
                $convert.text('to °C');
                $convert.click(function() {
                    viewC = !viewC;
                    $('#temperature').text( viewC ? celsius + " °C" : fahrenheit + " °F");
                    $convert.text(viewC ? 'to °F' : 'to °C');
                });
            }
        });
    }

});

