
// dropdown

$('.ui.dropdown').dropdown();




///carousel
let counter =1;
setInterval(function(){
   document.getElementById('radio'+counter).checked=true;
counter++;
if(counter > 3){
    counter=1;

}
},5000);



//weather api

const container = document.querySelector(".weather-container") ,
 inputPart = container.querySelector(".input-part")
,infoText = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn=  inputPart.querySelector("button")
, wIcon = document.querySelector(".weather-part img");

let api;

inputField.addEventListener("keyup" , e=> {
    //if user pressed enter btn and ipput value is not empty
    if(e.key == "Enter" && inputField.value != ""){
   requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
   else {
alert("your browser not support geolocation api");
    }
    
});

function onSuccess(position){
  const {latitude,longitude} = position.coords; //getting lat and lon of the user device from cords obj
 api =` api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=dfb2c1806b0e2d5ed781d1e708f71305`
fetchData();
}


function onError(error){
    infoText.innerText = error.message;
    infoText.classList.add("error");

}

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=dfb2c1806b0e2d5ed781d1e708f71305`;
   fetchData();

}

function fetchData(){
    infoText.innerText = "Getting weather details..";
    infoText.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
    infoText.classList.replace("pending", "error");
 if(info.cod == "404"){
    infoText.innerText = `${inputField.value} isn't a valid city name`;  
 }
 else{
     // get requird propertis value from the info object 
const city = info.name;
const country = info.sys.country;
const {description,id}= info.weather[0];
const {feels_like,humidity,temp}= info.main;

// use custom icon according to the id which api return
if ( id == 800){
    wIcon.src = "img/Weather Icons/clear.svg";
}

else if ( id >= 200 && id <= 232){
    wIcon.src = "img/Weather Icons/storm.svg";
}
else if ( id >= 600 && id <= 622){
    wIcon.src = "img/Weather Icons/snow.svg";
}

else if ( id >= 701 && id <= 781){
    wIcon.src = "img/Weather Icons/haza.svg";
}

else if ( id >= 801 && id <= 804){
    wIcon.src = "img/Weather Icons/cloud.svg";
}
else if (( id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
    wIcon.src = "img/Weather Icons/rain.svg";
}






// pass these values to a particular html element

container.querySelector(".temp .numb").innerText = Math.floor(temp);
container.querySelector(".weather").innerText = description;
container.querySelector(".location span").innerText = `${city},${country}`;
container.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
container.querySelector(".humidity span").innerText = `${humidity}%`;

    infoText.classList.remove("pending", "error");  
    container.classList.add("active");
 console.log(info)

 }
}