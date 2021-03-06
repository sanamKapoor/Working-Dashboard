
// Date and Time

let date = new Date().toDateString().split(' ');

let dateSection = document.querySelector('.date h4');
let timeSection = document.querySelector('.date h1');

dateSection.textContent = `${date[2]} ${date[1]} ${date[3]} - ${date[0]}`;

setInterval(() => {
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();

  let isAm = hours < 12 ? 'AM' : 'PM';
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;
  hours = (hours/10 < 1) ? '0' + hours : hours;
  minutes = (minutes/10 < 1) ? '0' + minutes : minutes;

  timeSection.innerHTML = `${hours}:${minutes} <small>${isAm}</small>`;
}, 1000);

// Background Image

let images = document.querySelectorAll('.modal-body img');
let main = document.querySelector('main');

images.forEach(img => {
  img.addEventListener('click', e => {
    if(e.target.hasAttribute('src'))
    {
      let src = e.target.getAttribute('src');
      main.style.background = `url(${src}) no-repeat center center`;
      main.style.backgroundSize = 'cover';
    }
  })
})

//  Weather Info

function weather(){

  quoteFun();

  let long;
  let lat;
  let tempSummary = document.querySelector('.deg');
  let temp = document.querySelector('.temp');
  let press = document.querySelector('.pressure');
  let hum = document.querySelector('.humidity');
  let wind = document.querySelector('.wind');
  let wIcon = document.querySelector('.weather-icon');

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      let proxy = 'https://cors-anywhere.herokuapp.com/';
      var api = `${proxy}https://api.darksky.net/forecast/fdf36c1e47d51baa0462804ed7bc27b1/${lat},${long}`;

   fetch(api)
    .then(res => res.json())
    .then(data => {
      let { temperature, summary, humidity, pressure, windSpeed, icon } = data.currently; 

      //      Set dom elements

      let celsius = Math.floor((temperature - 32) * 5/9);
      let humPrs = Math.floor(humidity * 100);

      tempSummary.textContent = `${celsius}° ${summary}`;
      temp.textContent = `Temperature : ${celsius}° C`;
      press.textContent = `Pressure : ${pressure} hPa `;
      hum.textContent = `Humidity : ${humPrs}%`;
      wind.textContent = `Wind : ${windSpeed} km/h`;

      if(icon === 'rain'){
        icon = 'cloud-showers-heavy';
      } else if(icon === 'partly-cloudy-day'){
        icon = 'cloud-sun';
      } else if(icon === 'partly-cloudy-night'){
        icon = 'cloud-moon';
      } else if(icon === 'snow'){
        icon = 'cloud-rain';
      } else {
        icon = 'cloud';
      }

      wIcon.innerHTML = `<i class="fas fa-${icon} my-2"></i>`

    })
    .catch(err => console.log(err));
      
    });
    
  }
}

window.onload = weather;

//      Fetch Quote

let quoteElem = document.querySelector('.quote');

const quoteFun = async function(){

const api = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

let res = await fetch(api);
let data = await res.json();
let quotes = await data.quotes;
let randomNum = Math.floor(Math.random() * 90 + 1);

let quote = quotes[randomNum].quote;
quoteElem.innerHTML = `<sup><i class="fas fa-quote-left"></i></sup> ${quote}`;

}

//    Stop Watch

let seconds = '00';
let minutes = '00';
let hours = '00';
let status = "stopped";
let startInterval = null;

let displayTiming = document.querySelector('.timing');
const WatchBtn = document.querySelector('#play-pause-watch');

WatchBtn.addEventListener('click', stopWatch);

function startWatch(e){
    +seconds++;
    seconds = addZero(seconds);

    if(+seconds / 60 === 1){  
        seconds = '00';
        +minutes++;
        minutes = addZero(minutes);


        if(+minutes / 60 === 1){
            minutes = '00';
            +hours++;
            hours = addZero(hours);
        }
    }


    displayTiming.textContent = `${hours}:${minutes}:${seconds}`;

}

function addZero(n){
  if(n < 10){
    return '0' + n;
  } 
  return n;
}

function stopWatch(e){
  if(status === "stopped"){
    interval = setInterval(startWatch, 1000);
    let elem = document.getElementById("play-pause-watch");
    elem.className = 'far fa-pause-circle';
    status = "started";
  }
  else{
      clearInterval(interval);
      let elem = document.getElementById("play-pause-watch");
      elem.className = 'far fa-play-circle';
      status = "stopped";
  }
}

let resetWatch = document.getElementById('reset-watch');
resetWatch.addEventListener('click', resetStopWatch);

function resetStopWatch(){
    clearInterval(interval);
    seconds = '00';
    minutes = '00';
    hours = '00';
    document.querySelector(".timing").textContent = "00:00:00";
    document.querySelector("#play-pause-watch").className = 'far fa-play-circle';
}

//        Music

let player = document.getElementById('music-player');
let description = document.getElementById('music-des');

let studyBtn = document.getElementById('study-btn');
let meditationBtn = document.getElementById('meditation-btn');
let codingBtn = document.getElementById('coding-btn');

studyBtn.addEventListener('click', function(){
  player.src = './music/study.mp3';
  description.innerHTML = 'Study Music';
})

meditationBtn.addEventListener('click', function(){
  player.src = './music/meditation.mp3';
  description.innerHTML = 'Meditation Music';
})

codingBtn.addEventListener('click', function(){
  player.src = './music/coding.mp3';
  description.innerHTML = 'Coding Music';
})