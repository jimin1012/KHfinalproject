const params = new URL(location.href).searchParams;
/* 출도착 터미널 */
const depPlaceNm = params.get('depPlaceNm');
const arrPlaceNm = params.get('arrPlaceNm');
/* 출발 시간 */
const depPlandTime = params.get('depPlandTime') + "";
const depDate = depPlandTime.substring(0,4) + "년" + depPlandTime.substring(4,6) + "월" + depPlandTime.substring(6,8) + "일";
const depTime = depPlandTime.substring(8,10) +" : " + depPlandTime.substring(10,12) ;
/* 도착 시간 */
const arrPlandTime = params.get('arrPlandTime') + "";
const arrDate=arrPlandTime.substring(0,8);
const arrTime = arrPlandTime.substring(8,10) +" : " + arrPlandTime.substring(10,12) 
/* 좌석등급, 가격 */
const gradeNm = params.get('gradeNm');
let charge = params.get('charge');
var price = document.getElementById("final-price1")

price.innerHTML = charge + " 원"

const ageInfo=document.getElementById("age-info") 

// age와 seat 라디오 버튼 이벤트 추가
var ageRadios = document.querySelectorAll('input[name="age"]');
ageRadios.forEach(function(radio) {
    radio.addEventListener('change', checkedAge);
});

var seatRadios = document.querySelectorAll('input[name="seat"]');
seatRadios.forEach(function(radio) {
    radio.addEventListener('change', checkedSeat);
});



/* 즉시 실행 함수  */
(function(){
    /* 출발  날짜  */
    document.getElementById("dep-date").innerHTML= depDate;

    /* 출도착 터미널 */
    document.getElementById("dep-ter").innerHTML= depPlaceNm + " 터미널";
    document.getElementById("arr-ter").innerHTML= arrPlaceNm + " 터미널";

    /* 좌석 등급, 출도착 시간 */
    document.getElementById("gradeNm").innerHTML= "좌석 등급 : " + gradeNm;
    document.getElementById("dep-time").innerHTML= "출발시간 : "  +depTime;
    document.getElementById("arr-time").innerHTML= "도착시간 : " +arrTime;
    
})();


// age 라디오 버튼 변경 시 스타일 적용
function checkedAge() {
    var ageRadios = document.querySelectorAll('input[name="age"]');
    ageRadios.forEach(function(radio) {
        if (radio.checked) {
            radio.closest('div').style.backgroundColor = 'white';
            radio.closest('div').style.color = 'black';
            if(radio.value=="어린이"){
                const finalCharge= charge/10 * 8
                price.innerHTML = finalCharge + " 원"
                ageInfo.innerHTML = radio.value
                
            }else if(radio.value=="노약자"){
                const finalCharge2 = charge/10 * 5
                ageInfo.innerHTML = radio.value
                
                price.innerHTML = finalCharge2 + " 원"
            }else{
                price.innerHTML = charge + " 원"
                ageInfo.innerHTML = radio.value
            }
        } else {
            radio.closest('div').style.backgroundColor = '';
            radio.closest('div').style.color = '';
        }
    });
}

// seat 라디오 버튼 변경 시 스타일 적용
function checkedSeat() {
    var seatRadios = document.querySelectorAll('input[name="seat"]');
    seatRadios.forEach(function(radio) {
        if (radio.checked) {
            radio.closest('label').style.backgroundColor = 'white';
            radio.closest('label').style.color = 'black';
            document.getElementById("seat-info").innerHTML=radio.value;
        } else {
            radio.closest('label').style.backgroundColor = '';
            radio.closest('label').style.color = '';
        }
    });
}



//----------------------------------------------------------------결제시작----------------------------------------------

const reservBtn =document.getElementById("reservBtn");
const paymentMethod = document.getElementById("paymentMethod");






var IMP = window.IMP;
if(reservBtn!=null){
    reservBtn.addEventListener("click",()=>{
        console.log(price.innerText.replace("원",""));

        const seatInfo = document.getElementById("seat-info");
        const depTer = document.getElementById("dep-ter");//출발지
        const arrTer = document.getElementById("arr-ter");//도착지

        // const depDate = document.getElementById("dep-date");// 출발날짜이자 도착날짜

        var today = new Date();
        let year = today.getFullYear(); // 년도
        let month = today.getMonth() + 1 < 10 ? "0"+(today.getMonth()+1) : today.getMonth() + 1;  // 월
        let date = today.getDate() < 10 ? "0"+today.getDate() : today.getDate();// 날짜
    
        
    
        var hours = today.getHours(); // 시
        var minutes = today.getMinutes();  // 분
        var seconds = today.getSeconds();  // 초
        var milliseconds = today.getMilliseconds();
        var makeMerchantUid = hours + minutes + seconds + milliseconds;
    
    
        if(userNo.trim().length==0){
            alert("로그인 후 이용가능합니다.");
            location.href="/login";
            return;
        }
    
        if(ageInfo.innerText.length==0){
            alert("탑승 인원 정보를 클릭해주세요.");
            return;
        }

        if(seatInfo.innerText.length==0){
            alert("결제하실 좌석을 선택해주세요.");
            return;
        }

        if(price.innerText.length==0){
            alert("결제하실 금액을 확인해주세요.");
            return;
        }
    
        if(paymentMethod.value==0){
            alert("결제수단을 선택해주세요.");
            return;
        }




        if(paymentMethod.value==1){// 카카오페이
            if (confirm("구매 하시겠습니까?")) { // 구매 클릭시 한번 더 확인하기
                    IMP.init("imp67505644"); // 가맹점 식별코드
                    IMP.request_pay({
                        pg: 'kakaopay.TC0ONETIME', // PG사 코드표에서 선택
                        pay_method: 'card', // 결제 방식
                        merchant_uid: "IMP" + makeMerchantUid, // 결제 고유 번호
                        name: depPlaceNm+ " | " +gradeNm+ " | " +seatInfo.innerText+"번 좌석", // 제품명
                        amount: Number(price.innerText.replace("원","").trim()), // 가격
                        //구매자 정보 ↓
                        buyer_email: userEmail,
                        buyer_name: userName,
                        buyer_tel : userTel,
                        buyer_addr : userAddress,
                        buyer_postcode : '123-456'
                    }, function (rsp) { // callback
                     
                        // 결제 검증 (결제 완료된 금액과 여기서의 금액이 같을 때)
                        console.log(rsp);
                        console.log("rsp");
                        const data = {
                            imp_uid : rsp.imp_uid
                        }
                        fetch("/verifyIamport",{
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(data)
                        })
                        .then(res=>res.json())
                        .then(resp=>{
    
                            console.log(resp);
                            console.log(rsp.imp_uid);
                            if(resp.response.amount == rsp.paid_amount){
                                //결제 성공
                                // 돈도 제대로 빠져나가고 검증까지 마쳤으므로 여기서DB에 예약내역저장
                                
    
                                /* 
                                
                                     DB에 보내야할 거 :
                                예약명(상품명)
                                출발시간 
                                도착시간
                                가격
                                결제시간
                                출발지
                                도착지
                                좌석번호
                                등급
                                기차인지버스인지숙소인지(예약상품종류)
                                포트원 고유 결제아이디(UID)
                                
                                */
                                const params = {
                                    "reservationName": resp.response.name,
                                    "reservationStartDate": depDate+"  "+depTime,
                                    "reservationEndDate": depDate+"  "+arrTime,
                                    "price": resp.response.amount,
                                    "payTime": year+"-"+month+"-"+date+"  "+hours+":"+minutes+":"+seconds,
                                    "depPlace": depTer.innerText,
                                    "arrPlace": arrTer.innerText,
                                    "seatNo": seatInfo.innerText,
                                    "grade": gradeNm,
                                    "reservType": "B",
                                    "reservUID": rsp.imp_uid
                                }
                                
                                // 기차 예약 
                                fetch("/resvation/traffic",{
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body:  JSON.stringify(params)
                                })
                                .then(res=>res.text())
                                .then(result=>{
                                   console.log(result);
    
                                   if(result>0){
                                    //예약완료되면 영수증 화면
                                    location.href="/resvation/receipt?reservationNo="+result+"&userNo="+userNo;
                                   }else{ 
                                        //예약내역 DB에 안들어가면 결제취소하면서 다시 예약 눌러달라고하기
                                        reservationCancle(rsp.imp_uid);
                                        alert("예약에 실패하였습니다. 다시 시도해주세요.");
                                   }
                                })
                                .catch(e=>{console.log(e);})
    
                            }else{
                                // 이때 돈은 빠져나갔으나 결제 금액이 맞지 않으므로 결제취소처리 되도록 해야함
                                alert("결제가 정상적으로 이뤄지지 않았습니다.");
                                return;
                            }
                        })
                        .catch(e=>{
                            reservationCancle(rsp.imp_uid);
                            alert("결제가 정상적으로 이뤄지지 않았습니다.");
                            console.log(e);
                        })
    
        
        
                    });
                    
            } else { // 구매 확인 알림창 취소 클릭시 돌아가기
                alert("결제가 정상처리되지 않았습니다.");
                return false;
            }
        }
    
    
    
    
    
        if(paymentMethod.value==2){// 토스페이
            if(confirm("구매 하시겠습니까?")){
                IMP.init("imp67505644");
                IMP.request_pay({
                        pg: "tosspay.tosstest",
                        pay_method: "card",
                        merchant_uid: "IMP"+makeMerchantUid, //상점에서 생성한 고유 주문번호
                        name: depPlaceNm+ " | " +gradeNm+ " | " +seatInfo.innerText+"번 좌석", // 제품명
                        amount: Number(price.innerText.replace("원","").trim()), // 가격
                        buyer_email: userEmail,
                        buyer_name: userName,
                        buyer_tel: userTel,
                        buyer_addr: userAddress,
                        buyer_postcode: "123-456",
                        // m_redirect_url: "https://service.iamport.kr/toss_payments/result",
                        notice_url: "http://localhost/train/trainBooking", //웹훅수신 URL 설정
                        appCard: true,
                    },function(rsp) {
                        
                        // 결제 검증 (결제 완료된 금액과 여기서의 금액이 같을 때)
                        console.log(rsp);
                        console.log("rsp");
                        const data = {
                            imp_uid : rsp.imp_uid
                        }
                        fetch("/verifyIamport",{
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(data)
                        })
                        .then(res=>res.json())
                        .then(resp=>{
    
                            console.log(resp);
                            
                            if(resp.response.amount == rsp.paid_amount){
                                //결제 성공
                                // 돈도 제대로 빠져나가고 검증까지 마쳤으므로 여기서DB에 예약내역저장
                                
    
                                /* 
                                
                                    DB에 보내야할 거 :
                                예약명(상품명)
                                출발시간 
                                도착시간
                                가격
                                결제시간
                                출발지
                                도착지
                                좌석번호
                                등급
                                기차인지버스인지숙소인지(예약상품종류)
                                 포트원 고유 결제아이디(UID)
                                */
                                 const params = {
                                    "reservationName": resp.response.name,
                                    "reservationStartDate": depDate+"  "+depTime,
                                    "reservationEndDate": depDate+"  "+arrTime,
                                    "price": resp.response.amount,
                                    "payTime": year+"-"+month+"-"+date+"  "+hours+":"+minutes+":"+seconds,
                                    "depPlace": depTer.innerText,
                                    "arrPlace": arrTer.innerText,
                                    "seatNo": seatInfo.innerText,
                                    "grade": gradeNm,
                                    "reservType": "B",
                                    "reservUID": rsp.imp_uid
                                }
                                
                                fetch("/resvation/traffic",{
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body:  JSON.stringify(params)
                                })
                                .then(res=>res.text())
                                .then(result=>{
                                   console.log(result);
    
                                   if(result>0){
                                    //예약완료되면 영수증 화면
                                    location.href="/resvation/receipt?reservationNo="+result+"&userNo="+userNo;
                                   }else{ 
                                        //예약내역 DB에 안들어가면 결제취소하면서 다시 예약 눌러달라고하기
                                        reservationCancle(rsp.imp_uid);
                                        alert("예약에 실패하였습니다. 다시 시도해주세요.");
                                   }
                                })
                                .catch(e=>{console.log(e);})
    
                            }else{
                                // 이때 돈은 빠져나갔으나 결제 금액이 맞지 않으므로 결제취소처리 되도록 해야함
                                alert("결제가 정상적으로 이뤄지지 않았습니다.");
                                return;
                            }
                        })
                        .catch(e=>{
                            reservationCancle(rsp.imp_uid);
                            alert("결제가 정상적으로 이뤄지지 않았습니다.");
                            console.log(e);
                        })
    
    
                    });
            }
        }
    
    
       
    
    
        if(paymentMethod.value==3){//이니시스
            if (confirm("구매 하시겠습니까?")) {
                IMP.init("imp67505644");
                IMP.request_pay({
                    pg : 'html5_inicis.INIBillTst',
                    pay_method : 'card',
                    merchant_uid: "IMP"+makeMerchantUid, 
                    name: depPlaceNm+ " | " +gradeNm+ " | " +seatInfo.innerText+"번 좌석", // 제품명
                    amount: Number(price.innerText.replace("원","").trim()), // 가격
                    buyer_email : userEmail,
                    buyer_name : userName,
                    buyer_tel : userTel,
                    buyer_addr : userAddress,
                    buyer_postcode : '123-456'
                }, function (rsp) { // callback
    
                    // 결제 검증 (결제 완료된 금액과 여기서의 금액이 같을 때)
                    console.log(rsp);
                    console.log("rsp");
                    const data = {
                        imp_uid : rsp.imp_uid
                    }
                    fetch("/verifyIamport",{
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    })
                    .then(res=>res.json())
                    .then(resp=>{
    
                        console.log(resp);
                        
                        if(resp.response.amount == rsp.paid_amount){
                            //결제 성공
                            // 돈도 제대로 빠져나가고 검증까지 마쳤으므로 여기서DB에 예약내역저장
                            
    
                            /* 
                            
                                DB에 보내야할 거 :
                                예약명(상품명)
                                출발시간 
                                도착시간
                                가격
                                결제시간
                                출발지
                                도착지
                                좌석번호
                                등급
                                기차인지버스인지숙소인지(예약상품종류)
                                 포트원 고유 결제아이디(UID)
                            */
                                const params = {
                                    "reservationName": resp.response.name,
                                    "reservationStartDate": depDate+"  "+depTime,
                                    "reservationEndDate": depDate+"  "+arrTime,
                                    "price": resp.response.amount,
                                    "payTime": year+"-"+month+"-"+date+"  "+hours+":"+minutes+":"+seconds,
                                    "depPlace": depTer.innerText,
                                    "arrPlace": arrTer.innerText,
                                    "seatNo": seatInfo.innerText,
                                    "grade": gradeNm,
                                    "reservType": "B",
                                    "reservUID": rsp.imp_uid
                                }
                            
                            fetch("/resvation/traffic",{
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body:  JSON.stringify(params)
                            })
                            .then(res=>res.text())
                            .then(result=>{
                               console.log(result);
    
                               if(result>0){
                                //예약완료되면 영수증 화면
                                location.href="/resvation/receipt?reservationNo="+result+"&userNo="+userNo;
                               }else{ 
                                    //예약내역 DB에 안들어가면 결제취소하면서 다시 예약 눌러달라고하기
                                    reservationCancle(rsp.imp_uid);
                                    alert("예약에 실패하였습니다. 다시 시도해주세요.");
                               }
                            })
                            .catch(e=>{console.log(e);})
    
                        }else{
                            // 이때 돈은 빠져나갔으나 결제 금액이 맞지 않으므로 결제취소처리 되도록 해야함 또는 결제 안하고 걍 취소 눌러도 여기로옴
                            alert("결제가 정상적으로 이뤄지지 않았습니다.");
                            return;
                        }
                    })
                    .catch(e=>{
                        reservationCancle(rsp.imp_uid);
                        alert("결제가 정상적으로 이뤄지지 않았습니다.");
                        console.log(e);
                    })
    
    
                    
                });
            }
            
        }






    });
}

// 예약을 위해 결제를 했으나 DB에 안담길 때를 대비하여 만든 함수
function reservationCancle(reservUID){
    fetch("/orderCancle",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"reservUID" : reservUID})
    })
    .then(res=>res.text())
    .then(res=>{
        alert("결제서버 불안정 문제로 결제 취소 되었습니다.");
        // location.href="/";
    })
    .catch(e=>{console.log(e);})
}