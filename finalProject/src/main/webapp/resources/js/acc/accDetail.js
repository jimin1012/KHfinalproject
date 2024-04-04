$(document).ready(function() {

	var today = new Date();
    
    // 체크인 날짜 설정
    $('#startDate').daterangepicker({
        "minYear": 1000,
        "maxYear": 9999,
        "locale": {
            "format": 'YYYY-MM-DD',
            "separator": " ~ ",
            "applyLabel": "확인",
            "cancelLabel": "취소",
            "fromLabel": "From",
            "toLabel": "To",
            "customRangeLabel": "Custom",
            "weekLabel": "주",
            "daysOfWeek": [
                "일",
                "월",
                "화",
                "수",
                "목",
                "금",
                "토"
            ],
            "monthNames": [
                "1월",
                "2월",
                "3월",
                "4월",
                "5월",
                "6월",
                "7월",
                "8월",
                "9월",
                "10월",
                "11월",
                "12월"
            ],
            "firstDay": 1,
            "monthYearFormat": "YYYY년 MMMM"
        },
        startDate: startDate ? startDate : today,
        endDate: endDate ? endDate : today,
    });

});




   // 검색어 자동완성
   
    const accAutoSearch = document.getElementById("accAutoSearch");
    const where = document.getElementById("where");
    if(where!=null){
    	where.addEventListener("input",(e)=>{
        if(where.value.trim().length!=0){
            fetch("/search/autoSearch",{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body :  JSON.stringify({
                    "input" : where.value
                }) 
            })
            .then(res => res.json())
            .then(result => {

                accAutoSearch.style.display="block";
                accAutoSearch.innerHTML="";


                // result의 얕은 복사본을 생성
                const data = [...result];

                for (let i = 0; i < data.length; i++) {
                    if (data[i].accAddr.includes('^^^')) {
                        let parts = data[i].accAddr.split('^^^');
                        // 변환된 주소로 업데이트
                        data[i].accAddr = parts[1] + " " + parts[2] + " (" + parts[0] + ")";
                    }
                }

                // 변환된 주소가 포함된 data 배열을 result에 할당
                // result = data;

                // 필요한 경우 변환된 결과를 확인
                // console.log(result);
                

                if(data.length == 0){
                    const li = document.createElement("li");
                    li.innerText="일치하는 값이 없습니다.";
                    accAutoSearch.append(li);

                }

                for(const key in data){
                    const li = document.createElement("li");
                    const a = document.createElement("a");

                    a.innerText = data[key].accAddr;

                    a.addEventListener("click", function(){
                        where.value = data[key].accAddr;
                        accAutoSearch.style.display="none";
                    })

                    li.append(a);
                    accAutoSearch.append(li);
                }
         
            })
            .catch(err => console.log(err));
        }else{
            accAutoSearch.style.display="none";
        }
        })


    }
    
    
    
    
       // 인원수 입력

      const totalPerShow = document.getElementById("totalPerShow");
		
      document.getElementById("totalPer").addEventListener("click", function(){
    	  totalPerShow.style.display="block";
      })
	
      const adultNum = document.getElementById("adultNum");
      const childNum = document.getElementById("childNum");
      const grNum = document.getElementById("grNum");
      
      document.getElementById("adultPlus").addEventListener("click", function(){
    	   adultNum.value = parseInt(adultNum.value)+1;
      })

      document.getElementById("adultMinus").addEventListener("click", function(){
    	   adultNum.value = parseInt(adultNum.value)-1;

         if(adultNum.value < 0){
            alert("0이하는 설정불가");
            adultNum.value = 0;
         }
      })



      document.getElementById("childPlus").addEventListener("click", function(){
         childNum.value = parseInt(childNum.value)+1;
      })

      document.getElementById("childMinus").addEventListener("click", function(){
         childNum.value = parseInt(childNum.value)-1;

         if(childNum.value < 0){
            alert("0이하는 설정불가");
            childNum.value = 0;
         }
      })



      document.getElementById("grPlus").addEventListener("click", function(){
         grNum.value = parseInt(grNum.value)+1;
      })

      document.getElementById("grMinus").addEventListener("click", function(){
         grNum.value = parseInt(grNum.value)-1;

         if(grNum.value < 0){
            alert("0이하는 설정불가");
            grNum.value = 0;
         }
      })


      document.getElementById("grSub").addEventListener("click", function(){
         totalPer.innerHTML = "성인 " + adultNum.value + "명 · 아동 " + childNum.value + "명 · 객실 " + grNum.value + "개";
         totalPerShow.style.display="none";
      })


      document.getElementById("searchbtn").addEventListener("click", function(e){
       
         const dateString = document.getElementById("startDate").value;
		 const dateArray = dateString.split(" ~ ");

		 const startDate = dateArray[0];
		 const endDate = dateArray[1];
		 
		 const today = new Date();

		 const year = today.getFullYear();
		 const month = String(today.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하기 때문에 +1을 해주고, 두 자리로 맞춰주기 위해 0을 추가합니다)
		 const day = String(today.getDate()).padStart(2, '0'); // 일 (두 자리로 맞춰주기 위해 0을 추가합니다)
		
		 const formattedDate = `${year}-${month}-${day}`;
      
          if(where.value.trim().length == 0 || where.value == ""){
            e.preventDefault();
            alert("주소를 입력해주세요.");

            return;
         }
         
         if(startDate < formattedDate || endDate < formattedDate){
            e.preventDefault();
            alert("날짜는 오늘보다 이전일 수 없습니다.");

            return;
         }

         if(startDate == endDate){
            e.preventDefault();
            alert("동일한 날짜는 입력이 불가능합니다.");

            return;
         }

         if(adultNum.value.trim().length == 0 || adultNum.value == 0){
            e.preventDefault();
            alert("성인은 1명 이상 가능합니다.");

            return;
         }
         
         if(grNum.value.trim().length == 0 || grNum.value == 0){
            e.preventDefault();
            alert("객실은 1개 이상 가능합니다.");

            return;
         }




      })

      where.addEventListener("click", () => {
         where.value="";
      })


      $('html').click(function(e){
    	if($(e.target).parents('.mainCla6').length < 1 && $(e.target).parents('.mainCla5').length < 1){
            totalPerShow.style.display="none";
        }
      });

      $('html').click(function(e){
    	if($(e.target).parents('.mainCla1').length < 1 && $(e.target).parents('#accAutoSearch').length < 1){
            accAutoSearch.style.display="none";
        }
      });
      
      
document.addEventListener("DOMContentLoaded", function() {
    const slider = document.getElementById('hm');
    const initialValue = parseInt(avgFacRate);

    slider.value = initialValue;
    updateBackground(initialValue);

    slider.addEventListener('input', function() {
        updateBackground(this.value);
    });

    function updateBackground(value) {
        const percentValue = (value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.background = `linear-gradient(to right, #FFE283 0%, #FFE283 ${percentValue}%, #ececec ${percentValue}%, #ececec 100%)`;
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const slider = document.getElementById('clean');
    const initialValue = parseInt(avgCleanRate);

    slider.value = initialValue;
    updateBackground(initialValue);

    slider.addEventListener('input', function() {
        updateBackground(this.value);
    });

    function updateBackground(value) {
        const percentValue = (value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.background = `linear-gradient(to right, #86E57F 0%, #86E57F ${percentValue}%, #ececec ${percentValue}%, #ececec 100%)`;
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const slider = document.getElementById('kind');
    const initialValue = parseInt(avgKindRate);

    slider.value = initialValue;
    updateBackground(initialValue);

    slider.addEventListener('input', function() {
        updateBackground(this.value);
    });

    function updateBackground(value) {
        const percentValue = (value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.background = `linear-gradient(to right, #A566FF 0%, #A566FF ${percentValue}%, #ececec ${percentValue}%, #ececec 100%)`;
    }
});




/* ==============================================결제 시작========================================== */
const paymentMethod = document.getElementById("paymentMethod");
var IMP = window.IMP;
function handleRes(event) {
    var button = event.target;
    var row = button.closest('tr');
    var price = row.querySelector('td:nth-child(3)').innerText;
    var accNo = row.querySelector('#accNo').value;
    var accCode = row.querySelector('#accCode').value;
    
    console.log("price 테스트 : " + price);
	console.log("accNo 테스트 : " + accNo);
	console.log("accCode 테스트 : " + accCode);





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

    if(price.length==0){
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
                    name: accName, // 제품명
                    amount: Number(price.replace("원","").trim()), // 가격
                    //구매자 정보 ↓
                    buyer_email: userEmail,
                    buyer_name: userName,
                    buyer_tel : userTel,
                    buyer_addr : userAddress,
                    buyer_postcode : '123-456'
                }, function (rsp) { // callback
                 
                    const data = {
                        imp_uid : rsp.imp_uid
                    }
                    // 결제 검증 (결제 완료된 금액과 여기서의 금액이 같을 때)
                    console.log(rsp);
                    console.log("rsp");
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
                            체크인시간 (숙소) 
                            체크아웃시간 (숙소)
                            가격
                            결제시간
                            기차인지버스인지숙소인지(예약상품종류)
                            포트원 고유 결제아이디(UID)
                            예약인원
                            선택한 방 넘버
                            선택한 숙소 넘버
                            */
                            const params = {
                                "reservationName": resp.response.name,
                                "reservationStartDate": startDate +" "+ checkIn,
                                "reservationEndDate": endDate + " "+ checkOut,
                                "price": resp.response.amount,
                                "payTime": year+"-"+month+"-"+date+"  "+hours+":"+minutes+":"+seconds,
                                "reservType": "A",
                                "reservUID": rsp.imp_uid,
                                "accNo" : accNo,
                                "accCode" : accCode,
                                "resPeople" : (Number(adultNum.value)+Number(childNum.value))
                            }
                            
                            // 숙소 예약 
                            fetch("/resvation/acc",{
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
                               }
                            })
                            .catch(e=>{console.log(e);})

                        }else{
                            // 이때 돈은 빠져나갔으나 결제 금액이 맞지 않으므로 결제취소처리 되도록 해야함
                            reservationCancle(rsp.imp_uid);
                            alert("결제가 정상적으로 이뤄지지 않았습니다.");
                            return;
                        }
                    })
                    .catch(e=>{
                        reservationCancle(rsp.imp_uid);
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
                    name: accName, // 제품명
                    amount: Number(price.replace("원","").trim()), // 가격
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
                            체크인시간 (숙소) 
                            체크아웃시간 (숙소)
                            가격
                            결제시간
                            기차인지버스인지숙소인지(예약상품종류)
                            포트원 고유 결제아이디(UID)
                            예약인원
                            선택한 방 넘버
                            선택한 숙소 넘버
                            */
                             const params = {
                                "reservationName": resp.response.name,
                                "reservationStartDate": startDate +" "+ checkIn,
                                "reservationEndDate": endDate + " "+ checkOut,
                                "price": resp.response.amount,
                                "payTime": year+"-"+month+"-"+date+"  "+hours+":"+minutes+":"+seconds,
                                "reservType": "A",
                                "reservUID": rsp.imp_uid,
                                "accNo" : accNo,
                                "accCode" : accCode,
                                "resPeople" : (Number(adultNum.value)+Number(childNum.value))
                            }
                            
                            fetch("/resvation/acc",{
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
                name: accName, // 제품명
                amount: Number(price.replace("원","").trim()), // 가격
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
                            체크인시간 (숙소) 
                            체크아웃시간 (숙소)
                            가격
                            결제시간
                            기차인지버스인지숙소인지(예약상품종류)
                            포트원 고유 결제아이디(UID)
                            예약인원
                            선택한 방 넘버
                            선택한 숙소 넘버
                            */
                             const params = {
                                "reservationName": resp.response.name,
                                "reservationStartDate": startDate +" "+ checkIn,
                                "reservationEndDate": endDate + " "+ checkOut,
                                "price": resp.response.amount,
                                "payTime": year+"-"+month+"-"+date+"  "+hours+":"+minutes+":"+seconds,
                                "reservType": "A",
                                "reservUID": rsp.imp_uid,
                                "accNo" : accNo,
                                "accCode" : accCode,
                                "resPeople" : (Number(adultNum.value)+Number(childNum.value))
                            }
                        
                        fetch("/resvation/acc",{
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
                        .catch(e=>{
                            reservationCancle(rsp.imp_uid);
                            console.log(e);
                        })

                    }else{
                        // 이때 돈은 빠져나갔으나 결제 금액이 맞지 않으므로 결제취소처리 되도록 해야함 또는 결제 안하고 걍 취소 눌러도 여기로옴
                        alert("결제가 정상적으로 이뤄지지 않았습니다.");
                        return;
                    }
                })
                .catch(e=>{
                    reservationCancle(rsp.imp_uid);
                    console.log(e);
                })


                
            });
        }
        
    }





}

var resButtons = document.querySelectorAll('.res');
resButtons.forEach(function(button) {
    button.addEventListener('click', handleRes);
});





  var swiper = new Swiper('.swiper-container', {
	    navigation: {
	      nextEl: '.swiper-button-next',
	      prevEl: '.swiper-button-prev',
	    },
	    slidesPerView: 'auto', // 자동으로 슬라이드 개수 조절
	    spaceBetween: 10, // 슬라이드 사이 여백 설정
	    loop: false, // 무한 루프 해제
	    breakpoints: {
	      768: {
	        slidesPerView: 3, // 화면 너비가 768px 이상일 때 슬라이드 개수를 3개로 고정
	        spaceBetween: 20, // 화면 너비가 768px 이상일 때 슬라이드 사이 여백을 20px로 설정
	      }
	    }
	  });
  
  
  
  
  
  var swiper2 = new Swiper('.swiper-container2', {
	    navigation: {
	        nextEl: '.swiper-button-next2',
	        prevEl: '.swiper-button-prev2',
	    },
	    slidesPerView: 1, // 한 번에 보여질 슬라이드 개수
	    spaceBetween: 10, // 슬라이드 사이 간격
	    loop: false, // 무한 루프 설정
	});


  
  
  
  
  
  
  
  
  var modal1 = document.getElementById("myModal1");
  var modalContent1 = document.getElementById("modal-content1");
  var modalUserName = document.getElementById("modal-userName");
  var modalBackground = document.getElementById("modal-background1"); // 모달 배경

  var moreLinks = document.querySelectorAll(".more");

  // 링크 클릭 시 이벤트 처리
  for (var i = 0; i < moreLinks.length; i++) {
      moreLinks[i].addEventListener("click", function(event) {
          event.preventDefault(); // 링크 클릭 기본 동작 취소

          // 클릭된 링크의 부모 요소에서 데이터 가져오기
          var parentDiv = this.parentElement.parentElement;

          // 해당 리뷰의 데이터 가져오기
          var reviewContent = parentDiv.querySelector('.tex').value;
          var userNo = parentDiv.querySelector('.userNm').innerText;
          var accCleanRate = parentDiv.querySelector('input[name="accCleanRate"]').value;
          var accFacRate = parentDiv.querySelector('input[name="accFacRate"]').value;
          var accKindRate = parentDiv.querySelector('input[name="accKindRate"]').value;


          // XSS 방지 처리 해제
          reviewContent = reviewContent.replaceAll("&amp;", "&");
          reviewContent = reviewContent.replaceAll("&lt;", "<");
          reviewContent = reviewContent.replaceAll("&gt;", ">");
          reviewContent = reviewContent.replaceAll("&quot;", "\"");
          // 개행문자 처리 해제
          reviewContent = reviewContent.replaceAll("<br>","\n");

          // 모달 창에 데이터 채우기
          modalContent1.value = reviewContent;
          modalUserName.textContent = userNo;

          // 각 모달 창에 해당하는 리뷰 데이터 채우기
          var modalRateElements = modal1.querySelectorAll(".rating-item span");
          modalRateElements[1].textContent = "청결도: " + accCleanRate;
          modalRateElements[0].textContent = "시설: " + accFacRate;
          modalRateElements[2].textContent = "직원 친절도: " + accKindRate;

          // 모달 창 보이기
          modal1.style.display = "block";

          // 모달을 제외한 부분을 회색으로 만들기
          modalBackground.style.display = "block";
      });
  }

  // 모달 닫기
  var span1 = document.getElementsByClassName("closa")[0];
  span1.onclick = function() {
      modal1.style.display = "none"; // 모달 창 숨기기
      // 모달을 제외한 부분을 다시 투명하게 만들기
      modalBackground.style.display = "none";
  };



  var modal2 = document.getElementById("myModal2");
  var modal3 = document.getElementById("myModal3");
  var modalContent2 = document.getElementById("modal-content2");
  var moreLinks = document.querySelectorAll(".morePic");
  var closeButton2 = document.querySelector(".closa2");

  // 링크 클릭 시 이벤트 처리
  for (var i = 0; i < moreLinks.length; i++) {
      moreLinks[i].addEventListener("click", function(event) {
          event.preventDefault(); // 링크 클릭 기본 동작 취소
          
          const regex = /accImagePath=([^,\]]+)/g;
          const accImagePathList = [];

          let match;
          while ((match = regex.exec(accImagePathString)) !== null) {
            accImagePathList.push(match[1]);
          }

          // 모달 창 보이기
          modal2.style.display = "block";

          // 모달을 제외한 부분을 회색으로 만들기
          modalBackground.style.display = "block";
      });
  }

  //모달 닫기 버튼 클릭 이벤트 처리
  closeButton2.addEventListener("click", function() {
      modal2.style.display = "none"; // 모달 창 숨기기
      modalBackground.style.display = "none"; // 모달 배경 숨기기
  });

  modalBackground.addEventListener("click", function() {
	    console.log("모달 배경 클릭 이벤트 발생");
	    modal1.style.display = "none"; 
	    modal2.style.display = "none"; 
	    modal3.style.display = "none"; 
	    this.style.display = "none"; // 모달 배경 숨기기
	});
	
	

document.querySelectorAll('.openModalBtn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        // 클릭한 버튼이 속한 스와이퍼 슬라이드 찾기
        var slide = btn.closest('.swiper-slide');

        // 모달 요소 찾기
        var modalId = btn.getAttribute('data-modal-id');
        var modal = document.getElementById(modalId);

        // 데이터 가져오기
        var reviewContent = btn.getAttribute('data-review-content');
        var accCleanRate = btn.getAttribute('data-acc-clean-rate');
        var accFacRate = btn.getAttribute('data-acc-fac-rate');
        var accKindRate = btn.getAttribute('data-acc-kind-rate');
        var reviewNo = btn.getAttribute('data-review');
        
        // XSS 방지 처리 해제
        reviewContent = reviewContent.replaceAll("&amp;", "&");
        reviewContent = reviewContent.replaceAll("&lt;", "<");
        reviewContent = reviewContent.replaceAll("&gt;", ">");
        reviewContent = reviewContent.replaceAll("&quot;", "\"");
        // 개행문자 처리 해제
        reviewContent = reviewContent.replaceAll("<br>","\n");

        // 모달3에 정보 설정
        modal.querySelector('.modal-text').value = reviewContent;
        modal.querySelector('input[name="accCleanRate"]').value = accCleanRate;
        modal.querySelector('input[name="accFacRate"]').value = accFacRate;
        modal.querySelector('input[name="accKindRate"]').value = accKindRate;
        modal.querySelector('input[name="accReviewNo"]').value = reviewNo;


        // 모달3 열기
        modal.style.display = 'block';
        modalBackground.style.display = "block";
        
        modal.querySelector('.modal-text').focus();
        
        console.log('accReviewNo:', reviewNo);
    });
});

var span3 = document.getElementsByClassName("reviewCan")[0];
span3.onclick = function() {
    modal3.style.display = "none"; // 모달 창 숨기기
    modalBackground.style.display = "none";
};


	






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







document.getElementById("searchFrm").addEventListener("submit", function(e) {
    e.preventDefault(); 

    const dateString = document.getElementById("startDate").value;
    const dateArray = dateString.split(" ~ ");

    const startDate = dateArray[0];
    const endDate = dateArray[1];

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    if (where.value.trim().length == 0 || where.value == "") {
        alert("주소를 입력해주세요.");
        return;
    }

    if (startDate < formattedDate || endDate < formattedDate) {
        alert("날짜는 오늘보다 이전일 수 없습니다.");
        return;
    }

    if (startDate == endDate) {
        alert("동일한 날짜는 입력이 불가능합니다.");
        return;
    }

    if (adultNum.value.trim().length == 0 || adultNum.value == 0) {
        alert("성인은 1명 이상 가능합니다.");
        return;
    }

    if (grNum.value.trim().length == 0 || grNum.value == 0) {
        alert("객실은 1개 이상 가능합니다.");
        return;
    }
    
    this.submit();

});

