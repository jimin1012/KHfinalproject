
// .box, .rNum, .tSeat 요소들을 가져옵니다.
const boxes = document.querySelectorAll('.box');
const rNums = document.querySelectorAll('.rNum');
const tSeats = document.querySelectorAll('.tSeat');

// 선택된 박스와 호실을 저장하는 변수들을 초기화합니다.
let selectedBox = null;
let selectedRNum = null;

// 선택된 승객 연령과 호실의 value 값을 저장하는 변수들을 초기화합니다.
let selectedSpecValue = null;
let selectedCarValue = null;



// const test = document.getElementsByClassName("test");
// 각 .box 요소에 대한 클릭 이벤트를 처리합니다.
boxes.forEach(function(box) {
    box.addEventListener('click', function() {

        // 이전에 선택된 박스가 있다면 선택 해제합니다.
        if (selectedBox !== null) {
            selectedBox.classList.remove('selected');
        }
        // 현재 클릭된 박스를 선택 상태로 변경하고 selectedBox에 할당합니다.
        this.classList.add('selected');
        selectedBox = this;
        // 최종 결제 금액을 업데이트합니다.
        updateFinalPrice();
    });
});

const params = new URL(location.href).searchParams;

const depNameP = params.get('depName'); 
const arrNameP = params.get('arrName'); 
const trainGrade = params.get('trainGrade');

// 각 .rNum 요소에 대한 클릭 이벤트를 처리합니다.
rNums.forEach(function(rNum) {
    rNum.addEventListener('click', function() {
        document.getElementById("seatNo").innerText = "";
       // console.log( realDate.substr(0, 4) + '-' + realDate.substr(4, 2) + '-' + realDate.substr(6, 2)+"  "+arTime)
      //  console.log( realDate+"  "+deTime)
        // 이전에 선택된 호실이 있다면 선택 해제합니다.
        if (selectedRNum !== null) {
            selectedRNum.classList.remove('selected');
        }
        // 현재 클릭된 호실을 선택 상태로 변경하고 selectedRNum에 할당합니다.
        this.classList.add('selected');
        selectedRNum = this;
        // id가 car인 요소에 선택된 호실 번호를 표시합니다.
        document.getElementById('car').innerText = selectedRNum.innerText;
        // 최종 결제 금액을 업데이트합니다.
        updateFinalPrice();

        const data = {
            "cardNo": selectedRNum.innerText,
            "depTime": realDate+"  "+deTime,
            "depName": depNameP,
            "arrName": arrNameP,
            "trainGrade": trainGrade
        };
        fetch("/train/seat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => response.json()) 
        .then(select => {
            //console.log(select);
        
            // 각 요소에 대해 occupied 클래스 제거
            tSeats.forEach(seat => {
                seat.classList.remove('occupied');
                seat.classList.remove('selected');
            });

            // ID 값이 배열에 있는지 확인하고, 있다면 해당 요소에 'occupied' 클래스를 추가
            tSeats.forEach(seat => {
                const seatId = seat.id; // ID 값을 가져오기 위해 id 속성을 이용
                if (select.includes(seatId)) {
                    seat.classList.add('occupied');
                }
            });
        });
    });
        


 
});

// 각 .tSeat 요소에 대한 클릭 이벤트를 처리합니다.
tSeats.forEach(function(tSeat) {
    tSeat.addEventListener('click', function() {
        // .box와 .rNum이 선택되었는지 확인합니다.
        if (selectedBox === null || selectedRNum === null) {
            // 선택되지 않았다면 알림창을 표시하고 함수를 종료합니다.
            alert("승객 연령 및 열차 칸을 먼저 선택해주세요.");
            return;
        }


        // 이미 선택된 좌석이 있다면 선택 해제합니다.
        const selectedSeat = document.querySelector('.tSeat.selected');
        if (selectedSeat !== null) {
            selectedSeat.classList.remove('selected');
        }

        if (tSeat.classList.contains('occupied')) {
            // occupied 클래스가 있으면 알림 표시
            alert("이미 선택된 좌석입니다.");
            document.getElementById("seatNo").innerText = "";

            return;
        } else {
            // occupied 클래스가 없으면 해당 좌석 선택 가능
            // 여기에 좌석을 선택했을 때 실행할 코드 추가
            
                    // 현재 클릭된 좌석을 선택 상태로 변경합니다.
                    this.classList.add('selected');
                    // 좌석 정보를 업데이트합니다.
                    updateSeatInfo();
                    // 최종 결제 금액을 업데이트합니다.
                    updateFinalPrice();
        }


        

    });
});

// 최종 결제 금액을 계산하고 표시하는 함수입니다.
function updateFinalPrice() {
    // .box와 .rNum이 모두 선택되었는지 확인합니다.
    if (selectedBox !== null && selectedRNum !== null) {
        // 선택된 승객 연령과 호실의 value 값을 가지고 최종 결제 금액을 계산합니다.
        if (selectedSpecValue !== null && selectedCarValue !== null) {
            const finalPrice = selectedSpecValue * selectedCarValue;
            // 최종 결제 금액을 화면에 표시합니다.
            document.getElementById('finalPrice').innerText = finalPrice;
        }
    }
}

// 선택된 좌석 정보를 표시하는 함수입니다.
function updateSeatInfo() {
    // 선택된 모든 좌석을 가져와 좌석 번호를 배열에 저장합니다.
    const selectedSeats = document.querySelectorAll('.tSeat.selected');
    let seatNumbers = [];
    selectedSeats.forEach(function(seat) {
        seatNumbers.push(seat.id);
    });
    // id가 seatNo인 요소에 좌석 번호를 표시합니다.
    document.getElementById('seatNo').innerText = seatNumbers.join(', ');
}

// .spec와 .carN 요소들을 가져옵니다.
const specs = document.querySelectorAll('.spec');
const carNs = document.querySelectorAll('.carN');

// 각 .spec 요소에 대한 change 이벤트를 처리합니다.
specs.forEach(function(spec) {
    spec.addEventListener('change', function() {
        // 선택된 승객 연령의 value 값을 업데이트합니다.
        selectedSpecValue = parseFloat(this.value);
        // 최종 결제 금액을 업데이트합니다.
        updateFinalPrice();
    });
});

// 각 .carN 요소에 대한 change 이벤트를 처리합니다.
carNs.forEach(function(carN) {
    carN.addEventListener('change', function() {
        // 선택된 호실의 value 값을 업데이트합니다.
        selectedCarValue = parseFloat(this.value);
        // 최종 결제 금액을 업데이트합니다.
        updateFinalPrice();
    });
});


//** 출발시간 도착시간 innerText */

const realArr = realDate + arrTime.substring(8);

// dep 문자열에서 앞의 8자리를 rea로 대체
const realDep = realDate + depTime.substring(8);

/*** DB에 삽입 되어야할 출발시간/도착시간 ***/
//console.log("Modified arr:", realArr);
//console.log("Modified dep:", realDep);

// arr 문자열에서 끝에서 6번째부터 3번째 자리까지 자르고 시간 형식으로 변환
const arTime = realArr.substring(realArr.length - 6, realArr.length - 4) + ":" + realArr.substring(realArr.length - 4, realArr.length - 2);

// dep 문자열에서 끝에서 6번째부터 3번째 자리까지 자르고 시간 형식으로 변환
const deTime = realDep.substring(realDep.length - 6, realDep.length - 4) + ":" + realDep.substring(realDep.length - 4, realDep.length - 2);

const departTime = document.getElementById("departTime");
const arriveTime = document.getElementById("arriveTime");

departTime.innerText = deTime;
arriveTime.innerText = arTime;


// 소요시간 계산


// arr 문자열에서 시간 정보 추출
let arrHours = parseInt(realArr.substring(8, 10));
let arrMinutes = parseInt(realArr.substring(10, 12));

// dep 문자열에서 시간 정보 추출
let depHours = parseInt(realDep.substring(8, 10));
let depMinutes = parseInt(realDep.substring(10, 12));

// 두 시간의 차이 계산
let differenceInHours = arrHours - depHours;
let differenceInMinutes = arrMinutes - depMinutes;

// 음수인 경우 24시간을 더해주어야 함
if (differenceInMinutes < 0) {
    differenceInHours--;
    differenceInMinutes += 60;
}

const totalT =document.getElementById("totalT");
totalT.innerText = differenceInHours + "시간 " + differenceInMinutes + "분   소요";


/* -------------------------------------------결제부분---------------------------------------------- */



/* 커스텀 셀렉트박스 */



/* -------------------------------------------------------------- */

const checkBtn = document.getElementById("checkBtn");
const paymentMethod = document.getElementById("paymentMethod");
const price = document.getElementById("finalPrice");

var IMP = window.IMP;
checkBtn.addEventListener("click",()=>{
    /* 몇호차인지 */
    const car = document.getElementById('car');
    /* 좌석 */
    const seatNo = document.getElementById('seatNo');

    const params = new URL(location.href).searchParams;
    const trainGrade = params.get("trainGrade");
    const depName = params.get("depName");
    const arrName = params.get("arrName");

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

    if(price.innerText.length==0 || seatNo.innerText.length==0){
        alert("결제하실 좌석을 선택해주세요.");
        return;
    }

    if(paymentMethod.value==0){
        alert("결제수단을 선택해주세요.");
        return;
    }



    if(paymentMethod.value==1){// 카카오페이
        if (confirm("구매 하시겠습니까?")) { // 구매 클릭시 한번 더 확인하기
            // if (localStorage.getItem("access")) { // 회원만 결제 가능
                // const emoticonName = document.getElementById('title').innerText;
                IMP.init("imp67505644"); // 가맹점 식별코드
                IMP.request_pay({
                    pg: 'kakaopay.TC0ONETIME', // PG사 코드표에서 선택
                    pay_method: 'card', // 결제 방식
                    merchant_uid: "IMP" + makeMerchantUid, // 결제 고유 번호
                    name: trainGrade+ " | " +car.innerText+ "호실 | " +seatNo.innerText, // 제품명
                    amount: Number(price.innerText), // 가격
                    //구매자 정보 ↓
                    buyer_email: userEmail,
                    buyer_name: userName,
                    buyer_tel : userTel,
                    buyer_addr : userAddress,
                    buyer_postcode : '123-456'
                }, function (rsp) { // callback
                 
                    // 결제 검증 (결제 완료된 금액과 여기서의 금액이 같을 때)
                    //console.log(rsp);
                    //console.log("rsp");
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

                        //console.log(resp);
                        //console.log(rsp.imp_uid);
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
                            몇호차인지
                            기차인지버스인지숙소인지(예약상품종류)
                            포트원 고유 결제아이디(UID)
                            
                            */
                            const params = {
                                "reservationName": resp.response.name,
                                "reservationStartDate": realDate.substr(0, 4) + '-' + realDate.substr(4, 2) + '-' + realDate.substr(6, 2)+"  "+deTime,
                                "reservationEndDate": realDate.substr(0, 4) + '-' + realDate.substr(4, 2) + '-' + realDate.substr(6, 2)+"  "+arTime,
                                "price": resp.response.amount,
                                "payTime": year+"-"+month+"-"+date+"  "+hours+":"+minutes+":"+seconds,
                                "depPlace": depName,
                                "arrPlace": arrName,
                                "seatNo": seatNo.innerText,
                                "grade": trainGrade,
                                "trainCarNo": car.innerText,
                                "reservType": "T",
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
                               //console.log(result);

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

                            // 이거 결제된 상태인지 체크하고 해야될듯
                            // 이때 돈은 빠져나갔으나 결제 금액이 맞지 않으므로 결제취소처리 되도록 해야함
                            alert("결제가 정상적으로 이뤄지지 않았습니다.");
                            return;
                        }
                    })
                    .catch(e=>{
                        reservationCancle(rsp.imp_uid);
                        alert("결제가 정상적으로 이뤄지지 않았습니다.");
                       // console.log(e);
                    })

    
    
                });
                
            // }
            // else { // 비회원 결제 불가
            //     alert('로그인이 필요합니다!')
            // }
        } else { // 구매 확인 알림창 취소 클릭시 돌아가기
            alert("asdsad");
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
                    name: trainGrade+ " | " +car.innerText+ "호실 | " +seatNo.innerText,
                    amount: Number(price.innerText),
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
                   // console.log(rsp);
                   // console.log("rsp");
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

                        //console.log(resp);
                        
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
                            몇호차인지
                            기차인지버스인지숙소인지(예약상품종류)
                             포트원 고유 결제아이디(UID)
                            */
                            const params = {
                                "reservationName": resp.response.name,
                                "reservationStartDate": realDate.substr(0, 4) + '-' + realDate.substr(4, 2) + '-' + realDate.substr(6, 2)+"  "+deTime,
                                "reservationEndDate": realDate.substr(0, 4) + '-' + realDate.substr(4, 2) + '-' + realDate.substr(6, 2)+"  "+arTime,
                                "price": resp.response.amount,
                                "payTime": year+"-"+month+"-"+date+"  "+hours+":"+minutes+":"+seconds,
                                "depPlace": depName,
                                "arrPlace": arrName,
                                "seatNo": seatNo.innerText,
                                "grade": trainGrade,
                                "trainCarNo": car.innerText,
                                "reservType": "T",
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
                             //  console.log(result);

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
                       // console.log(e);
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
                name : trainGrade+ " | " +car.innerText+ "호실 | " +seatNo.innerText,
                amount : Number(price.innerText),
                buyer_email : userEmail,
                buyer_name : userName,
                buyer_tel : userTel,
                buyer_addr : userAddress,
                buyer_postcode : '123-456'
            }, function (rsp) { // callback

                // 결제 검증 (결제 완료된 금액과 여기서의 금액이 같을 때)
                //console.log(rsp);
               // console.log("rsp");
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

                   // console.log(resp);
                    
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
                            몇호차인지
                            기차인지버스인지숙소인지(예약상품종류)
                             포트원 고유 결제아이디(UID)
                        */
                        const params = {
                            "reservationName": resp.response.name,
                            "reservationStartDate": realDate.substr(0, 4) + '-' + realDate.substr(4, 2) + '-' + realDate.substr(6, 2)+"  "+deTime,
                            "reservationEndDate": realDate.substr(0, 4) + '-' + realDate.substr(4, 2) + '-' + realDate.substr(6, 2)+"  "+arTime,
                            "price": resp.response.amount,
                            "payTime": year+"-"+month+"-"+date+"  "+hours+":"+minutes+":"+seconds,
                            "depPlace": depName,
                            "arrPlace": arrName,
                            "seatNo": seatNo.innerText,
                            "grade": trainGrade,
                            "trainCarNo": car.innerText,
                            "reservType": "T",
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
                           //console.log(result);

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
                    //console.log(e);
                })


                
            });
        }
        
    }




})

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