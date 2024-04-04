const bus = document.querySelector(".select-bus-list") /* 버스 조회 출력 */
const noneList = document.querySelector(".select-none") /* 버스 조회 X 출력 */
$(function () {
    const params = new URL(location.href).searchParams;
    const depTerminalId = params.get('depTerminalId');
    const arrTerminalId = params.get('arrTerminalId');
    
    let date = params.get('depPlandTime') + ""; /* 주소창에 있는 날짜 가져오기  */
    const subDateter = date.substring(0,4) + date.substring(4,6) +  date.substring(6,8); /* 날짜 잘라서 세팅하기 */
    const subDate = date.substring(0,4) + "년 " + date.substring(4,6) + "월 " + date.substring(6,8) + "일 "; /* 날짜 잘라서 세팅하기 */
    
    document.getElementById("DepDate").innerText = subDateter;  /* 왼쪽에 출발날짜 */
    document.querySelector("thead>tr>th").innerHTML = subDate + "출발 버스 목록";  /* 표에 표시되는 출발날짜 */
    
    const busGradeId = params.get('busGradeId');

    
    /* 페이지 로딩 되기 전 나타나는 조회되는 버스 목록 */
    $.ajax({
        type: "GET",
        url: "https://apis.data.go.kr/1613000/ExpBusInfoService/getStrtpntAlocFndExpbusInfo?serviceKey=%2F%2BvsKUuxUmd3RRwV75KRm9NLPQj3t4HfuWgEzeB8wG3nD1atqnaCeY%2FVlKXQIj5SqxzejwgPYJr7F8n9Nxkl2A%3D%3D&pageNo=1&numOfRows=100&_type=json"
            + "&depTerminalId=" + depTerminalId + "&arrTerminalId=" + arrTerminalId + "&depPlandTime=20230401&busGradeId=" + busGradeId,
        data: JSON,
        success: function (res) {
            console.log(res);
            if (res.response.body.items == "") { // 조회 된 결과 없을 경우
                bus.style.display = "none";
                noneList.style.display = "flex";
                return;
            }
            else {
                noneList.style.display = "none";
                bus.style.display = "flex";
                const itemArr = res.response.body.items.item;
                let value = "";
                for (let item of itemArr) {
                    /* 출발시간 */
                    const depTime = item.depPlandTime + " ";
                    const dephh = depTime.substring(8, 10)
                    const depmm = depTime.substring(10, 12)
                    /* 도착시간 */
                    const arrTime = item.arrPlandTime + " ";
                    const arrhh = arrTime.substring(8, 10)
                    const arrmm = arrTime.substring(10, 12)
                    const start = item.depPlaceNm
                    const end = item.arrPlaceNm
                    document.getElementById("start").innerHTML = start + " 터미널";
                    document.getElementById("end").innerHTML = end + " 터미널";
                    value += "<tr>"
                        + "<td>" + dephh + "시" + depmm + "분" + "</td>"
                        + "<td>" + arrhh + "시" + arrmm + "분" + "</td>"
                        + "<td>" + item.charge + "</td>"
                        + "<td>" + item.gradeNm + "</td>"
                        + `<td onclick='busReservation("${item.charge}","${item.gradeNm}","${item.depPlandTime}","${item.depPlaceNm}","${item.arrPlaceNm}",${item.arrPlandTime})'>예약하기</td>`
                        + "</tr>"
                }
                $("#tt>tbody").html(value);
                return;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("통신 실패.")
        }
    });


    
    
});

    
/* 조회하기 버튼 클릭 시 다시 조회 */
function ReSelectBus(){
    DepartCode = document.getElementById("auto-terminal").value
    ArrivalCode = document.getElementById("auto-terminal2").value
    if(DepartCode==""&&ArrivalCode==""){
        alert("터미널명이 입력되지 않았습니다.")
        return;
    }
    
    $.ajax({
        type: "GET",
        url: "https://apis.data.go.kr/1613000/ExpBusInfoService/getStrtpntAlocFndExpbusInfo?serviceKey=%2F%2BvsKUuxUmd3RRwV75KRm9NLPQj3t4HfuWgEzeB8wG3nD1atqnaCeY%2FVlKXQIj5SqxzejwgPYJr7F8n9Nxkl2A%3D%3D&pageNo=1&numOfRows=100&_type=json"
            + "&depTerminalId=" + DepartCode + "&arrTerminalId=" + ArrivalCode + "&depPlandTime=20230401&busGradeId=" + seatLevel,
        data: JSON,
        success: function (res) {
            console.log(res);
            if (res.response.body.items == "") { // 조회 된 결과 없을 경우
                bus.style.display = "none";
                noneList.style.display = "flex";
                return;
            }
            else if(res.response.body.items!="") {
                const InputDate =document.getElementById("datepicker").value;
                console.log(InputDate);
                const subInputDate = InputDate.substring(0,4) + "년 " + InputDate.substring(4,6) + "월 " + InputDate.substring(6,8) + "일 "; /* 날짜 잘라서 세팅하기 */
                const subInputDateTer = InputDate.substring(0,4) + InputDate.substring(4,6)  + InputDate.substring(6,8); /* 날짜 잘라서 세팅하기 */

                document.getElementById("DepDate").innerText = subInputDateTer;  /* 왼쪽에 출발날짜 */
                document.querySelector("thead>tr>th").innerHTML = subInputDate + "출발 버스 목록";  /* 표에 표시되는 출발날짜 */


                noneList.style.display = "none";
                bus.style.display = "flex";
                const itemArr = res.response.body.items.item;
                let value = "";
                for (let item of itemArr) {
                    /* 출발시간 */
                    const depTime = item.depPlandTime + " ";
                    const dephh = depTime.substring(8, 10)
                    const depmm = depTime.substring(10, 12)
                    /* 도착시간 */
                    const arrTime = item.arrPlandTime + " ";
                    const arrhh = arrTime.substring(8, 10)
                    const arrmm = arrTime.substring(10, 12)
                    const start = item.depPlaceNm
                    const end = item.arrPlaceNm
                    document.getElementById("start").innerHTML = start + " 터미널";
                    document.getElementById("end").innerHTML = end + " 터미널";
                    value += "<tr>"
                        + "<td>" + dephh + "시" + depmm + "분" + "</td>"
                        + "<td>" + arrhh + "시" + arrmm + "분" + "</td>"
                        + "<td>" + item.charge + "</td>"
                        + "<td>" + item.gradeNm + "</td>"
                        + `<td onclick='busReservation("${item.charge}","${item.gradeNm}","${item.depPlandTime}","${item.depPlaceNm}","${item.arrPlaceNm}","${item.arrPlandTime}")'>예약하기</td>`
                        + "</tr>"
                }
                $("#tt>tbody").html(value);
                return;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("통신 실패.")
        }
    });

}


/* 예약하기 버튼 클릭시 */
function busReservation(charge, gradeNm, depPlandTime, depPlaceNm, arrPlaceNm,arrPlandTime) {
    console.log(charge, gradeNm, depPlandTime, depPlaceNm, arrPlaceNm,arrPlandTime);
    let deptime=depPlandTime+"";
    let arrtime=arrPlandTime+"";
    deptime = deptime.substring(8,12);
    arrtime = arrtime.substring(8,12);
    const dep=document.getElementById("DepDate").innerText + deptime 
    const arr=document.getElementById("DepDate").innerText + arrtime 
    
    /* 예약하기 클릭 시 이동되는 화면 */
    location.href = `http://localhost/bus/busTicketing?charge=${charge}&gradeNm=${gradeNm}&depPlandTime=${dep}&arrPlandTime=${arr}&depPlaceNm=${depPlaceNm}&arrPlaceNm=${arrPlaceNm}`

}
