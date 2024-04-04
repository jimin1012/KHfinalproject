const DepartInput = document.getElementById("select-Departure") /* 출발지 입력창 */
const ArrivalInput = document.getElementById("select-Arrival") /* 도착지 입력창 */
const auto = document.getElementById("auto-terminal"); /* 출발지 자동완성창 */
const auto2 = document.getElementById("auto-terminal-2"); /* 도착지 자동완성창 */
const date = document.getElementById("datepicker") /* 날짜 */
let seatCheck = $('input[name=seat]:checked').val();

/* 출발지 추천 검색어 ajax */
let DepartCode = "";
let ArrivalCode = "";
DepartInput.addEventListener("input", function () {
    if (DepartInput.value.trim() != "") {
        $.ajax({
            url: "https://apis.data.go.kr/1613000/ExpBusInfoService/getExpBusTrminlList?serviceKey=%2F%2BvsKUuxUmd3RRwV75KRm9NLPQj3t4HfuWgEzeB8wG3nD1atqnaCeY%2FVlKXQIj5SqxzejwgPYJr7F8n9Nxkl2A%3D%3D&pageNo=1&numOfRows=10&_type=json" + "&terminalNm=" + DepartInput.value,
            type: "GET",
            data: JSON,
            success: function (res) {
                let value = "";
                const itemArr = res.response.body.items.item;
                if (itemArr != undefined && itemArr.length > 1) {  // 일치하는 값이 2개 이상일 때
                    for (let i = 0; i < itemArr.length; i++) {
                        value += `<li class='click' onclick='selectDepValue("${itemArr[i].terminalNm}")'>${itemArr[i].terminalNm}</li>`
                        DepartCode = "";
                        DepartCode += itemArr[i].terminalId;
                    }
                    $("#auto-terminal").html(value);
                    auto.style.display = "block"
                }


                else if (itemArr != undefined && itemArr.terminalNm != null) { // 일치하는 값이 1개일 때
                    value = "";
                    value += `<li class='click' onclick='selectDepValue("${itemArr.terminalNm}")'>${itemArr.terminalNm}</li>`
                    DepartCode = "";
                    DepartCode += itemArr.terminalId;
                    $("#auto-terminal").html(value);
                    auto.style.display = "block"

                } else { // 일치하는 값이 없을 때 
                    auto.style.display = "none";
                }

            }
            ,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest, textStatus, errorThrown)
            }
        });
    } else { //입력 안했을 때 
        auto.style.display = "none";
    }
})

/* 도착지 추천 검색어 ajax */
ArrivalInput.addEventListener("input", function () {
    if (ArrivalInput.value.trim() != "") {
        $.ajax({
            url: "https://apis.data.go.kr/1613000/ExpBusInfoService/getExpBusTrminlList?serviceKey=%2F%2BvsKUuxUmd3RRwV75KRm9NLPQj3t4HfuWgEzeB8wG3nD1atqnaCeY%2FVlKXQIj5SqxzejwgPYJr7F8n9Nxkl2A%3D%3D&pageNo=1&numOfRows=10&_type=json" + "&terminalNm=" + ArrivalInput.value,
            type: "GET",
            data: JSON,
            success: function (res) {
                let value = "";
                const itemArr = res.response.body.items.item;
                // console.log(itemArr)
                if (itemArr != undefined && itemArr.length > 1) {  // 일치하는 값이 2개 이상일 때
                    // console.log(itemArr.length)
                    for (let i = 0; i < itemArr.length; i++) {
                        value += `<li class='click' onclick='selectArrValue("${itemArr[i].terminalNm}")'>${itemArr[i].terminalNm}</li>`
                        ArrivalCode = "";
                        ArrivalCode += itemArr[i].terminalId;
                    }
                    $("#auto-terminal-2").html(value);
                    auto2.style.display = "block"
                }
                else if (itemArr != undefined && itemArr.terminalNm != null) { // 일치하는 값이 1개일 때
                    value += `<li class='click' onclick='selectArrValue("${itemArr.terminalNm}")'>${itemArr.terminalNm}</li>`
                    $("#auto-terminal-2").html(value);
                    ArrivalCode = "";
                    ArrivalCode += itemArr.terminalId;
                    auto2.style.display = "block"
                } else { // 일치하는 값이 없을 때 
                    auto2.style.display = "none";
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest, textStatus, errorThrown)
            }
        });
    } else { //입력 안했을 때 
        auto2.style.display = "none";
    }
})


/* 출발지 자동완성창에서 클릭했을 때 input에 값 세팅하는 함수 */
function selectDepValue(e) {
    DepartInput.value = e;
    auto.style.display = "none";
}



/* 도착지 자동완성창에서 클릭했을 때 input에 값 세팅하는 함수 */
function selectArrValue(e) {
    console.log(e)
    ArrivalInput.value = e;
    auto2.style.display = "none";
}

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

ArrivalInput.addEventListener("blur",function(){
    auto.style.display='none';
})

ArrivalInput.addEventListener("blur",function(){
    auto2.style.display='none';
})
/* 출발지 코드, 도착지 코드, 좌석등급 */
function goBus() {
    if(DepartCode==""&&ArrivalCode==""){
        alert("터미널명이 잘못 됐거나, 입력되지 않았습니다.")
        return;
    }
        location.href = `/bus/selectBus?depTerminalId=${DepartCode}&arrTerminalId=${ArrivalCode}&depPlandTime=${date.value}&busGradeId=${seatLevel}`
        
    // location.href = "/bus/selectBus" + "?depTerminalId=" + DepartCode + "&arrTerminalId=" + ArrivalCode + "&depPlandTime=" + date.value  +"&busGradeId=" + seatLevel;
}

