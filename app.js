const api_key = "&appid=904e5b67ea23911d0c37578b74aee2e0";
const api = "https://api.openweathermap.org/data/2.5/weather?";
const celsius = "&units=metric";
function change_theme(api, img, temp) {
  //this function is responsible to change the icons and the temperature numbers colors
  if (api.weather[0].main != "Rain" && api.weather[0].main != "Drizzle") {
    if (parseInt(api.clouds.all) > 10) {
      temp.css("color", "white");
      temp.css("text-shadow", "2px 2px 2px white");
      img.attr("src", "img/kindacloudy.svg");
    } else if (parseInt(api.clouds.all) <= 9) {
      temp.css("color", "rgb(240, 231, 108)");
      temp.css("text-shadow", "2px 2px 2px rgb(247, 147, 81)");
      img.attr("src", "img/sun-day-weather-symbol_icon-icons.com_73146.svg");
    }
  } else {
    temp.css("color", "white");
    temp.css("text-shadow", "2px 2px 2px rgb(81, 111, 247)");
    img.attr("src", "img/rainy.svg");
  }
}

$("form").submit(function (e) {
  //it prevents form tag from submitting
  e.preventDefault();
});

$("button").click(function () {
  var text = $(".text");
  var form = $(".form");
  var card = $(".card");
  var city = $(".city-name");
  var temp = $(".temp");
  var d = $(".sun-or-rain");
  var icon = $(".icon");
  if (text.val()) {
    //if  the user typed something...
    let city_name = "&q=" + text.val();
    //jquery.ajax is responsible for getting the data from the api
    $.ajax({
      url: api + city_name + api_key + celsius,
      dataType: "json",
      success: function (api) {
        text.val("");
        city.html(api.name);
        temp.html(parseInt(api.main.temp) + "°");
        d.html(api.weather[0].description);
        change_theme(api, icon, temp);
        if (form.css("bottom") != "28vh") {
          form.css("bottom", "28vh");
          card.css("opacity", "1");
          card.css("pointer-events", "all");
        }
      },
      error: function (xhr) {
        if (xhr.status == 404) {
          //if the user didn't type a valid city or country...
          window.alert("Please type a valid city or country!");
          text.val("");
        } else if (xhr.status == 0) {
          //if the user has no internet connection...
          window.alert("Please verify your internet connection!");
        }
      },
    });
  }
});
