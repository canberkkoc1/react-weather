import React, { useState } from 'react';
import './App.css';

const api={
  key:"6926cf5e6efa461c11fb3836d7980895",
  base:"https://api.openweathermap.org/data/2.5/",

}

function App() {
  const [dataQ,setQ]=useState("");
  const [weather,setWeather]=useState({});

  const search = e =>{
    if(e.key === 'Enter'){
      fetch(api.base + 'weather?q=' + dataQ + '&appid=' + api.key)
      .then(res=>res.json())
      .then(result => {
        setWeather(result);
        setQ('');
        console.log(result)
      })
    }
  }

  const dateBuild = (d) =>{
    let months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return day + ' ' + date + ' ' + month + ' ' + year;
  }


  return (
    <div className={(typeof weather.main != "undefined")
    ? ((weather.weather[0].main === "Clouds")
    ? 'App-Clouds': (weather.weather[0].main === "Clear") ? "App-other" : 'App'
     )    
    :'App' 
    }>
      <main>
        <div className="search">
          <input type="text"
          className="search-bar"
          placeholder="search..."
          onChange={e => setQ(e.target.value)}
          value={dataQ}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined")?
          (
            <div>
              <div className="location">
                <div className="city">
                  {weather.name},{weather.sys.country}
                </div>
                <div className="date">
                  {dateBuild(new Date())}
                </div>
              </div>
              <div className="temp-box">
                <div className="temp">
                  {Math.round(weather.main.temp)-273} &#8451;
                </div>
                <div className="weat">
                   {weather.weather[0].main} 
                </div>
              </div>
            </div>
          )  : ('')
      }
      </main>
      
    </div>
  );
}

export default App;
