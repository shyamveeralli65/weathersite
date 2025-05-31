const weatherform1=document.querySelector(".weatherform");
const cityinput=document.querySelector(".cityinput");
const card=document.querySelector(".card2");
const key="5327c3ca6d6c4c2ffa287804dc47dff3";
weatherform1.addEventListener("submit",async event =>{
    event.preventDefault();
    const city=cityinput.value;
    if(city)
    {
        try{
            const weatherdata=await getweather(city);
            displayweatherinfo(weatherdata);

        }
        catch(error)
        {
            console.error(error);
        }

    }
    else{
        displayerror("please Enter a city");
        
    }
});
 

async function getweather(city){
  const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  const response=await fetch(apiurl);

  if(!response.ok){
    window.alert("Enter a Valid City Name");
    cityinput.value="";
    card.style.display="none";


  }
  return await response.json();
}
 
function displayweatherinfo(data)
{
    const {name:city,
        main:{temp,humidity},
        weather:[{description,id}]}=data;
    card.textContent="";
    card.style.display="flex";
    //creating elements
    const citydisplayd=document.createElement("h1");
    const tempdisplayd=document.createElement("p");
    const humiditydisplayd=document.createElement("p");
    const descdisplayd=document.createElement("p");
    const emojidisplayd=document.createElement("p");
    //adding text content 
    citydisplayd.textContent=city;
    tempdisplayd.textContent=`temp ${(temp-273.15).toFixed(1)}°C`;
    humiditydisplayd.textContent=`Humidity ${humidity}`;
    descdisplayd.textContent=description;
    emojidisplayd.textContent=getweatheremoji(id);

    //adding classlists to the references
    citydisplayd.classList.add("citydisplay");
    tempdisplayd.classList.add("tempdisplay");
    humiditydisplayd.classList.add("humiditydisplay");
    descdisplayd.classList.add("descdisplay");
    emojidisplayd.classList.add("weatheremoji");
    
    //appending the references to the card
    card.appendChild(citydisplayd);
    card.appendChild(tempdisplayd);
    card.appendChild(humiditydisplayd);
    card.appendChild(descdisplayd);
    card.appendChild(emojidisplayd);

}

function getweatheremoji(weatherid)
{
    switch(true)
    {
        case(weatherid>=200 && weatherid<300):
            return "⚡";
        case(weatherid>=300 && weatherid<400):
            return "🌧️";
        case(weatherid>=500 && weatherid<600):
            return "⛈️";
        case(weatherid>=600 && weatherid<700):
            return "❄️";
        case(weatherid>=700 && weatherid<800):
            return "🌪️";
        case(weatherid===800):
            return "🌤️";
        case(weatherid>=801 &&weatherid<810):
            return "🌨️";
        default:
            return "❓";
    }
  
}

function displayerror(message)
{
    const disperr=document.createElement("p");
    disperr.textContent=message;
    disperr.classList.add("errordisplay");
    card.style.display="flex";
    card.appendChild(disperr);
    setTimeout(() => {
        document.querySelector(".card2").textContent="";
        card.style.display="none";
        
    }, 2000);

}
