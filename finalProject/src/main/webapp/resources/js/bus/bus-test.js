
const auto = document.getElementById("auto-terminal"); /* 출발지 자동완성창 */
const auto2 = document.getElementById("auto-terminal-2"); /* 도착지 자동완성창 */
const date = document.getElementById("datepicker2") /* 날짜 */
const click = document.getElementsByClassName("click")
let seatCheck = $('input[name=seat]:checked').val();
console.log()
// 터미널 코드 저장 
let DepartCode = "";
let ArrivalCode = "";
const params = new URL(location.href).searchParams;
document.addEventListener("DOMContentLoaded", () => {
    if (params.get("depPlandTime") != null) {
        console.log("tlq")
        document.getElementById("datepicker2").value = params.get("depPlandTime")
    }
  });


/* 출발지 추천 검색어 ajax */
(function () {
    $.ajax({
        url: "https://apis.data.go.kr/1613000/ExpBusInfoService/getExpBusTrminlList?serviceKey=%2F%2BvsKUuxUmd3RRwV75KRm9NLPQj3t4HfuWgEzeB8wG3nD1atqnaCeY%2FVlKXQIj5SqxzejwgPYJr7F8n9Nxkl2A%3D%3D&pageNo=1&numOfRows=230&_type=json" + "&terminalNm=" + "",
        type: "GET",
        data: JSON,
        success: function (res) {
            let value = "";
            const itemArr = res.response.body.items.item;
            const depLocationCode = document.getElementById("dep-location-code")

            for (let i = 0; i < itemArr.length; i++) {
                if (params.get("depTerminalId") == itemArr[i].terminalId && params.get("depTerminalId") != "") {
                    value += `<option class='click' value='${itemArr[i].terminalId}' selected>${itemArr[i].terminalNm}</option>`
                } else {
                    value += `<option class='click' value='${itemArr[i].terminalId}'>${itemArr[i].terminalNm}</option>`
                }
            }

            $("#auto-terminal").html(value);

            depLocationCode.addEventListener("change", function () {
                let depLocation = document.getElementById("dep-location-code").value
                if (depLocation == 1) {
                    value = "";
                    for (let i = 0; i < 6; i++) { // 서울 
                        value += `<option class='click' value='${itemArr[i].terminalId}'>${itemArr[i].terminalNm}</option>`
                    }
                } else if (depLocation == 2) {
                    value = "";
                    for (let i = 6; i < 52; i++) { // 경기도 , 인천
                        value += `<option class='click' value='${itemArr[i].terminalId}'>${itemArr[i].terminalNm}</option>`
                    }
                } else if (depLocation == 3) {
                    value = "";
                    for (let i = 52; i < 66; i++) { // 강원도
                        value += `<option class='click' value='${itemArr[i].terminalId}'>${itemArr[i].terminalNm}</option>`
                    }
                } else if (depLocation == 4) {
                    value = "";
                    for (let i = 87; i < 97; i++) { // 세종
                        value += `<option class='click' value='${itemArr[i].terminalId}'>${itemArr[i].terminalNm}</option>`
                    }
                } else if (depLocation == 5) {
                    value = "";
                    for (let i = 66; i < 86; i++) { // 대전,충청북도, 남도
                        value += `<option class='click' value='${itemArr[i].terminalId}'>${itemArr[i].terminalNm}</option>`
                    }
                    for (let i = 97; i < 126; i++) { // 충청북도, 남도
                        value += `<option class='click' value='${itemArr[i].terminalId}'>${itemArr[i].terminalNm}</option>`
                    }
                } else if (depLocation == 6) {
                    value = "";
                    for (let i = 127; i < 190; i++) { // 전라도, 광주
                        value += `<option class='click' value='${itemArr[i].terminalId}'>${itemArr[i].terminalNm}</option>`
                    }
                } else if (depLocation == 7) {
                    value = "";
                    for (let i = 190; i < 230; i++) { // 부산, 경상도
                        value += `<option class='click' value='${itemArr[i].terminalId}'>${itemArr[i].terminalNm}</option>`
                    }
                } else if (depLocation == 0) {
                    value = "";
                    for (let i = 0; i < itemArr.length; i++) { // 전체
                        value += `<option class='click' value='${itemArr[i].terminalId}'>${itemArr[i].terminalNm}</option>`
                    }
                }
                $("#auto-terminal").html(value);
            })


            // 도착지
            let Arrvalue = "";
            const arrLocationCode = document.getElementById("arr-location-code")



            for (let i = 0; i < itemArr.length; i++) {
                if (params.get("arrTerminalId") == itemArr[i].terminalId && params.get("arrTerminalId") != "") {
                    Arrvalue += `<option class='click' value='${itemArr[i].terminalId}' selected>${itemArr[i].terminalNm}</option>`
                } else {
                    Arrvalue += `<option class='click' value='${itemArr[i].terminalId}'>${itemArr[i].terminalNm}</option>`
                }
                $("#auto-terminal2").html(Arrvalue);

            }



            arrLocationCode.addEventListener("change", function () {
                let arrLocation = document.getElementById("arr-location-code").value
                if (arrLocation == 1) {
                    Arrvalue = "";
                    for (let i = 0; i < 6; i++) { // 서울 
                        console.log("qt")
                        Arrvalue += `<option class='click' value='${itemArr[i].terminalId}'>${itemArr[i].terminalNm}</option>`
                    }
                } else if (arrLocation == 2) {
                    Arrvalue = "";
                    for (let i = 6; i < 52; i++) { // 경기도 , 인천
                        Arrvalue += `<option class='click' value='${itemArr[i].terminalId}'>${itemArr[i].terminalNm}</option>`
                    }
                } else if (arrLocation == 3) {
                    Arrvalue = "";
                    for (let i = 52; i < 66; i++) { // 강원도
                        Arrvalue += `<option class='click' value='${itemArr[i].terminalId}'>${itemArr[i].terminalNm}</option>`
                    }
                } else if (arrLocation == 4) {
                    Arrvalue = "";
                    for (let i = 87; i < 97; i++) { // 세종
                        Arrvalue += `<option class='click' value='${itemArr[i].terminalId}'>${itemArr[i].terminalNm}</option>`
                    }
                } else if (arrLocation == 5) {
                    Arrvalue = "";
                    for (let i = 66; i < 86; i++) { // 대전,충청북도, 남도
                        Arrvalue += `<option class='click' value='${itemArr[i].terminalId}'>${itemArr[i].terminalNm}</option>`
                    }
                    for (let i = 97; i < 126; i++) { // 충청북도, 남도
                        Arrvalue += `<option class='click' value='${itemArr[i].terminalId}'>${itemArr[i].terminalNm}</option>`
                    }
                } else if (arrLocation == 6) {
                    Arrvalue = "";
                    for (let i = 127; i < 190; i++) { // 전라도, 광주
                        Arrvalue += `<option class='click' value='${itemArr[i].terminalId}'>${itemArr[i].terminalNm}</option>`
                    }
                } else if (arrLocation == 7) {
                    Arrvalue = "";
                    for (let i = 190; i < 230; i++) { // 부산, 경상도
                        Arrvalue += `<option class='click' value='${itemArr[i].terminalId}'>${itemArr[i].terminalNm}</option>`
                    }
                } else if (arrLocation == 0) {
                    Arrvalue = "";
                    for (let i = 0; i < itemArr.length; i++) { // 전체
                        Arrvalue += `<option class='click' value='${itemArr[i].terminalId}'>${itemArr[i].terminalNm}</option>`
                    }
                }
                $("#auto-terminal2").html(Arrvalue);
            })


        }
        ,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest, textStatus, errorThrown)
        }
    });

})()



/* 좌석 등급 얻어오기 */
let seatLevel = "";
const seat = document.getElementsByName("seat")
for (let i = 0; i < seat.length; i++) {
    seat[i].addEventListener("change", function () {
        seatLevel = "";
        seatLevel += seat[i].value;
        console.log(seat[i].value);
        console.log(seatLevel);
    })
}



// ArrivalInput.addEventListener("blur",function(){
//     auto.style.display='none';

// })

// ArrivalInput.addEventListener("blur",function(){
//     auto2.style.display='none';
// })
/* 출발지 코드, 도착지 코드, 좌석등급 */
function goBus() {
    /* 출발지 input에 있는 값 code 얻어오기 */
    DepartCode = document.getElementById("auto-terminal").value
    ArrivalCode = document.getElementById("auto-terminal2").value
    if (DepartCode == "" && ArrivalCode == "") {
        alert("터미널명이 입력되지 않았습니다.")
        return;
    }

    location.href = `/bus/selectBus?depTerminalId=${DepartCode}&arrTerminalId=${ArrivalCode}&depPlandTime=${date.value}&busGradeId=${seatLevel}`

    // location.href = "/bus/selectBus" + "?depTerminalId=" + DepartCode + "&arrTerminalId=" + ArrivalCode + "&depPlandTime=" + date.value  +"&busGradeId=" + seatLevel;
}

