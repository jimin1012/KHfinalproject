$(document).ready(function () {
    $('ul.reservNav li').click(function () {
        var tab_id = $(this).attr('data-tab');

        $('#totalReserv ul.reservNav li').removeClass('current');
        $('.reservNav-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    })
});

// 페이지 로드 후 함수 호출
document.addEventListener("DOMContentLoaded", function () {
    // 시간을 초로 변환하는 함수
    function convertToSeconds(hours, minutes, seconds) {
        return hours * 3600 + minutes * 60 + seconds;
    }

    // 남은 시간을 표시하고 시간이 다 되면 화면을 변경하는 함수
    function displayRemainingTime() {
        var currentTime = new Date(); // 현재 시간 가져오기
        var endTime = new Date(currentTime); // 종료 시간을 현재 시간으로 초기화
        endTime.setHours(endTime.getHours() + 24, 0, 0, 0); // 종료 시간을 현재 시간으로부터 24시간 후로 설정
        var remainingSeconds = Math.floor((endTime - currentTime) / 1000); // 종료까지 남은 시간을 초로 계산

        var hours = Math.floor(remainingSeconds / 3600); // 시간 계산
        var minutes = Math.floor((remainingSeconds % 3600) / 60); // 분 계산
        var seconds = remainingSeconds % 60; // 초 계산

        // 시간, 분, 초를 문자열로 만들어서 표시
        var formattedTime = ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);

        // 시간 표시 업데이트
        document.getElementById("remainingTime").textContent = formattedTime;
    }

    // 현실 시간 기준으로 남은 시간 표시 함수 호출
    displayRemainingTime();
    // 1초마다 시간 업데이트
    setInterval(displayRemainingTime, 1000);
});

var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 4000);
}

// 날씨 조회
// openweather 사이트 API_KEY(회원가입 후 개인 API_KEY 사용하면 됩니다.)
const API_KEY = 'a16675e2799127311b9ef32a2cea0ce9';
const weatherBtn = document.getElementById("weatherBtn");
const tempSection = document.querySelector('.temperature');
const placeSection = document.querySelector('.place');
const descSection = document.querySelector('.description');
const iconSection = document.querySelector('.icon');

weatherBtn.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(success, fail);
});

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

const fail = () => {
    alert("좌표를 받아올 수 없음");
}

const getWeather = (lat, lon) => {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    )
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        const temperature = json.main.temp;
        const place = json.name;
        const description = json.weather[0].description;
        const icon = json.weather[0].icon;
        const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        tempSection.innerText = temperature;
        placeSection.innerText = place;
        descSection.innerText = description;
        iconSection.setAttribute('src', iconURL);
        
    })
    .catch((error) => {
        alert(error);
    });
}

