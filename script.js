let allElems = document.querySelectorAll('.elem');
let fullPages = document.querySelectorAll('.full-page');
let closeButtons = document.querySelectorAll('.close');
let allElemsSection = document.querySelector('.all-elems');
let allTasks = document.querySelector('.all-tasks');
let form = document.getElementById('todo-form');
let inputTask = document.querySelector('.input-task');
let taskDetail = document.querySelector('.task-detail');
let taskImportant = document.querySelector('.task-imp');
let nav = document.querySelector('nav')
let header = document.querySelector('header')

let allTodos = null


allElems.forEach(elem => {
    elem.addEventListener('click', () => {

        allElemsSection.style.display = 'none';
        nav.style.display = 'none';
        header.style.display = 'none';
        fullPages[elem.id].style.display = 'block'

    })



})
closeButtons.forEach(elem => {
    elem.addEventListener('click', () => {
        // console.log(e.id);
        fullPages[elem.id].style.display = 'none'
        allElemsSection.style.display = 'flex';
        nav.style.display = 'flex';
        header.style.display = 'flex';


    })
});


function todoList() {
    function renderTask() {
        let localAllTodos = JSON.parse(localStorage.getItem('allTodos'))
        if (localAllTodos) {

            allTodos = [...localAllTodos]
        } else {
            allTodos = [];
        }
        let task = ''

        allTodos.map((elem, idx) => {

            task += `<div class="task" >
                            <div class="left">
                                <h2>${elem.task}</h2>
                                <!-- <p>two way binding prhni ha</p> -->
                                <span class="${elem.imp}">imp</span>
                            </div>
                            <div class="right">
                            <button class="complete-button" id = ${idx}>Mark as Completed</button>
                            </div>
                            </div>`
        })



        allTasks.innerHTML = task;

        let completeButton = document.querySelectorAll('.complete-button');


        completeButton.forEach(elem => {

            elem.addEventListener('click', () => {
                allTodos.splice(elem.id, 1)
                localStorage.setItem('allTodos', JSON.stringify(allTodos))

                renderTask();
            })
        })
    }


    renderTask()
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        allTodos.push({ task: inputTask.value, detail: taskDetail.value, imp: taskImportant.checked })
        localStorage.setItem('allTodos', JSON.stringify(allTodos))


        renderTask()

    })
}
todoList();



function dailyPlanner() {
    let allPlans = document.querySelector('.all-plans')
    let hours = Array.from({ length: 18 }, (elem, idx) => {
        return `${idx + 6}:00 - ${idx + 7}:00`
    })


    let plans = '';
    let dailyPlanData = JSON.parse(localStorage.getItem('dailyPlanData')) || {}




    hours.map((elem, idx) => {
        plans += `<div class="plan">
                        <p>${elem}</p>
                        <input class="daily-plan-input" type="text" placeholder="..." value = "${dailyPlanData[idx] ? dailyPlanData[idx] : ''}">
                    </div>`
    });

    allPlans.innerHTML = plans;

    let allDailyPlanInputs = document.querySelectorAll('.daily-plan-input')
    allDailyPlanInputs.forEach((elem, idx) => {
        elem.addEventListener('input', (e) => {
            dailyPlanData[idx] = elem.value
            localStorage.setItem('dailyPlanData', JSON.stringify(dailyPlanData))

        })

    })
}
dailyPlanner();


function motivation() {
    let quote = document.querySelector('.quote')
    let author = document.querySelector('.author')

    async function getQuote() {
        let res = await fetch('https://motivational-spark-api.vercel.app/api/quotes/random')
        let data = await res.json();
        author.innerHTML = data.author
        quote.innerHTML = data.quote

    }
    getQuote();
}
motivation();


function pomodoroTimer() {
    let totalSeconds = 25 * 60;
    let pomoTimer = document.getElementById('pomo-timer')
    let startButton = document.querySelector('.pomodoro-full-page .start-timer')
    let pauseButton = document.querySelector('.pomodoro-full-page .pause-timer')
    let resetButton = document.querySelector('.pomodoro-full-page .reset-timer')
    let session = document.querySelector('.pomodoro-full-page .session')

    let pomoInterval = null
    let workSession = true


    function showTime() {

        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        pomoTimer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
    }

    showTime();

    function startTimer() {
        clearInterval(pomoInterval)
        pomoInterval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--
                showTime()
            }
            else {
                clearInterval(pomoInterval)
                if (workSession) {
                    totalSeconds = 5 * 60
                    workSession = false
                    session.innerHTML = 'Take a Break';
                    session.style.backgroundColor = `var(--green)`
                } else {
                    totalSeconds = 25 * 60
                    workSession = true
                    session.innerHTML = 'Work Session';
                    session.style.backgroundColor = `var(--blue)`
                }
                showTime()

            }

        }, 1000);
    }


    function pauseTimer() {
        clearInterval(pomoInterval)
    }

    function resetTimer() {
        clearInterval(pomoInterval)
        if (workSession) {
            totalSeconds = 25 * 60;
        } else {
            totalSeconds = 5 * 60
        }
        showTime()
    }


    startButton.addEventListener('click', startTimer)
    pauseButton.addEventListener('click', pauseTimer)
    resetButton.addEventListener('click', resetTimer)
}
pomodoroTimer();


function themeChanger() {
    let changeTheme = document.querySelector('nav .right')
    let flag = 0

    changeTheme.addEventListener('click', () => {
        if (flag == 0) {
            document.documentElement.style.setProperty('--pri', '#081c15')
            document.documentElement.style.setProperty('--sec', '#1b4332')
            document.documentElement.style.setProperty('--tri', '#2d6a4f')
            document.documentElement.style.setProperty('--tri2', '#40916c')
            document.documentElement.style.setProperty('--for', '#cecece')
            flag = 1
        } else if (flag == 1) {
            document.documentElement.style.setProperty('--pri', '#582f0e')
            document.documentElement.style.setProperty('--sec', '#7f4f24')
            document.documentElement.style.setProperty('--tri', '#936639')
            document.documentElement.style.setProperty('--tri2', '#a68a64')
            document.documentElement.style.setProperty('--for', '#cecece')
            flag = 2
        } else if (flag == 2) {
            document.documentElement.style.setProperty('--pri', '#061E29')
            document.documentElement.style.setProperty('--sec', '#1D546D')
            document.documentElement.style.setProperty('--tri', '#5F9598')
            document.documentElement.style.setProperty('--tri2', '#53b0b5')
            document.documentElement.style.setProperty('--for', '#cecece')
            flag = 0
        }

        console.log(flag);


    })
}
themeChanger()


function weatherAndTime() {
const weatherApiKey = '94adb7d10b5b4e5282760227262001'
const locationApi = 'pk.a236d678873503fe1df815ee521c9334'

let dateElement = document.querySelector('header .left .upper .date')
let timeElement = document.querySelector('header .left .upper .time')
let cityElement = document.querySelector('header .left .lower .city')
let temp = document.querySelector('header .right .upper .temp')
let condition = document.querySelector('header .right .upper .condition')
let wind = document.querySelector('header .right .lower .wind')
let humidity = document.querySelector('header .right .lower .humidity')
let feelsLike = document.querySelector('header .right .lower .feels-like')
let data = null
let city = null
let lat = null;
let lon = null

navigator.geolocation.getCurrentPosition(
  (position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    getWeather()
    
  },
  (error) => {
    console.log('Permission denied or error');
  },

  
);


async function getWeather() {
    let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${lat},${lon}`)
    data = await response.json()
    console.log(data);
    
    temp.innerHTML = `${data.current.temp_c}°C`
    condition.innerHTML = `${data.current.condition.text}`
    wind.innerHTML = `Wind : ${data.current.wind_kph} km/h`
    humidity.innerHTML = `Humidity : ${data.current.humidity}%`
    feelsLike.innerHTML = `Feels like : ${data.current.feelslike_c}°C`
    cityElement.innerHTML = `${data.location.name}`
}






function getDate() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let date = new Date();
    let currentDate = date.getDate();
    let currentMonth = monthsOfYear[date.getMonth()];
    let currentYear = date.getFullYear();
    let currentDay = daysOfWeek[date.getDay()];
    let currentHour = date.getHours();
    let currentMin = date.getMinutes();
    let currentSec = date.getSeconds();

    dateElement.innerHTML = `${currentDate} ${currentMonth}, ${currentYear}`

    if(currentHour>12){
        
        timeElement.innerHTML = `${currentDay} ${String(currentHour-12).padStart('2', '0')}:${String(currentMin).padStart('2', '0')}:${String(currentSec).padStart('2', '0')} PM`
    }else{
        timeElement.innerHTML = `${currentDay} ${String(currentHour).padStart('2', '0')}:${String(currentMin).padStart('2', '0')}:${String(currentSec).padStart('2', '0')} AM`

    }

    
    if(currentHour >= 4 && currentHour < 10){
        header.style.backgroundImage = `url('https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`; // morning
    } else if(currentHour >= 10 && currentHour < 16){
        header.style.backgroundImage = `url('https://images.unsplash.com/photo-1601020083775-39f7819de002?q=80&w=1240&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`; // morning
        
    } else if(currentHour >= 16 && currentHour < 19){
        header.style.backgroundImage = `url('https://images.unsplash.com/photo-1616036740257-9449ea1f6605?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`; // morning
        
    } else {
        
        header.style.backgroundImage = `url('https://images.unsplash.com/photo-1526565278154-ab23e27d998e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`; // morning
        header.style.backgroundPositionY = '90%';
    }

}
setInterval(getDate, 1000);
}
weatherAndTime()



