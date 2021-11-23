
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
inputField = inputPart.querySelector("input");


inputField.addEventListener("keyup" , e=> {
    //if user pressed enter btn and ipput value is not empty
    if(e.key == "Enter" && inputField.value != ""){
   requestApi(inputField.value);
    }
});

function requestApi(city){
   let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={dfb2c1806b0e2d5ed781d1e708f71305}`;
   fetch(api).then(Response => console.log(Response.json()))
}



