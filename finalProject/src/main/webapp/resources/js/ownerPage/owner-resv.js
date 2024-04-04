(() => {
    const frontList = document.getElementsByClassName("currentList")[0];
    const getTodayList = document.getElementById("todayList");

    // 현재 URL에서 쿼리 스트링을 파싱합니다.
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // 'key' 쿼리 스트링의 값이 'today'인지 확인합니다.
    if (urlParams.get('key') === 'today') {

        frontList.classList.remove("currentList");
        getTodayList.classList.add("currentList");

    } else {

        getTodayList.classList.remove("currentList");
        frontList.classList.add("currentList");

    }

})();



const getTodayList = document.getElementById("todayList");

getTodayList.addEventListener("click", () => {
    location.href = "/ownerPage/reservation?key=today";

    totalList.classList.remove("currentList");
    getTodayList.classList.add("currentList");

});

const totalList = document.getElementById("select-orderBy");

totalList.addEventListener("click", () => {

    location.href = "/ownerPage/reservation";

    getTodayList.classList.remove("currentList");
    totalList.classList.add("currentList");
})






