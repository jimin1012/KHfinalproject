// 예약 검색
const searchKey = document.getElementById("searchKey");
const inputQuery = document.getElementById("inputQuery");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");

// 예약 검색 시 시작 날짜 > 끝 날짜인 경우 검색X
const searchReserve = document.getElementById("searchReserve");

searchReserve.addEventListener("submit", e =>{
    if(endDate.value != ""){
        if(startDate.value > endDate.value){
            alert("시작 날짜가 마지막 날짜보다 많습니다. 다시 시도해주세요.");
            e.preventDefault();
        }
    }
});

// 검색 기록 남기기
(()=>{
    const params = new URL(location.href).searchParams;
    const key = params.get("key"); // t, c, tc, w
    const query =params.get("query"); // 검색어
    const sd = params.get("startDate"); // t, c, tc, w
    const ed =params.get("endDate"); // 검색어

    // 기차, 버스, 숙소 선택
    const options = document.querySelectorAll("#searchKey > option");
    for(let op of options){
        if(op.value == key){
            op.selected = true;
        }
    }

    // 이름 검색 O
    if(query != ""){
        inputQuery.value = query;
    }

    // 시작 날짜
    if(sd != ""){
        startDate.value = sd;
    }

    //  끝 날짜
    if(ed != ""){
        endDate.value = ed;
    }

})();



// 결제 취소
function cancelReservation(reservationNo, reservUID, userName,reservName, select){

    
    if(select.value == 'N'){
        console.log("막아두기!");

        alert("이미 취소된 예약은 변경할 수 없습니다.");

        for(let op of select.children){
            if(op.value == 'Y'){
                op.selected = true;
            }
        }

        return;
    }
    
    if(confirm(`${userName}님의 예약 [${reservName}] 을 정말 취소하시겠습니까?`)){
        
        fetch("/orderCancle",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "reservationNo" : reservationNo,
                "reservUID" : reservUID})
        })
        .then(resp=>resp.text())
        .then(result=>{
            alert("결제 취소 되었습니다.");
            location.href = "/admin/reservationList";
        })
        .catch(e=>console.log(e))

    } else{

        for(let op of select.children){
            if(op.value == 'N'){
                op.selected = true;
            };
        }
    }

};

