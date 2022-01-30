
function updateCountdown() {
  let today = new Date;
  let currentYear = today.getFullYear();
  let newYearsDay = new Date(`January 1, ${currentYear+1}`)
  let diff = newYearsDay - today;

  let days = Math.floor(diff/1000/60/60/24);
  let hours = Math.floor(diff/1000/60/60)-days*24; 
  let min = Math.floor(diff/1000/60)-days*24*60-hours*60;
  let sec = Math.floor(diff/1000)-days*24*60*60-hours*60*60-min*60;

  document.getElementById('year').innerHTML = currentYear+1

  if (days > 100){
    document.getElementById('days').innerHTML = "";
  } else if (days > 10){
    document.getElementById('days').innerHTML = "0";
  } else {
    document.getElementById('days').innerHTML = "00";
  }
  document.getElementById('days').innerHTML += days;

  hours > 10 ? document.getElementById('hours').innerHTML = "" :
              document.getElementById('hours').innerHTML = "0";
  document.getElementById('hours').innerHTML += hours

  min > 10 ? document.getElementById('min').innerHTML = "" :
              document.getElementById('min').innerHTML = "0";
  document.getElementById('min').innerHTML += min;

  sec > 10 ? document.getElementById('sec').innerHTML = "" :
              document.getElementById('sec').innerHTML = "0";
  document.getElementById('sec').innerHTML += sec;
}

const updateTime = setInterval(updateCountdown, 1000);

