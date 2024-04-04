<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <%-- <link rel="stylesheet" href="/resources/css/train/timetable.css"> --%>
    <link rel="stylesheet" href="/resources/css/train/train.css">
    
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://kit.fontawesome.com/632d1cfe2a.js" crossorigin="anonymous"></script>

    <title>기차예매</title>
</head>
<body>


    
        <div class="ticketing-Area">
            <div id="ticketing-row-1">
                <div id="ticketing-1-1">
                        <!-- 출발지 -->
                        <div id="departBox">
                            <span id="selectDeparture" class="name">출발지</span>
                            <span id="stationNameD"></span>
                            <span id="stationCodeD"></span>
                        </div>
                      
                        <!-- 도착지 -->
                       <div id="arriveBox">
                            <span class="name"  id="selectArrival">도착지</span>
                            <span id="stationNameA"></span>
                            <span id="stationCodeA"></span>
                        </div>
                </div>
    
                <div id="ticketing-1-2">
                    <span class="name">가는 날</span>
                    <input type="text" id="datepicker" class="datepicker">
                </div>

               <div id="ticketing-2-2">
                    <button type="button" id="selectBtn" onclick="goTrain()">조회하기</button>
                </div>
            </div>
    
            <div id="ticketing-row-2">
                <%-- <div id="ticketing-2-1">
                    <span class="name">등급</span>
                    <div id="seat-area">
                        *1호차/2호차는 특실입니다.*<br>
    
                    </div>
                </div>
     --%>

            </div>
        </div>
    
        <div class="modal-background"></div> 

        <section class="modalArea">
            <div class="titleArea">지역 선택</div>
            <span id="cancelBtn">X</span>                          

            <div class="cityCheckArea" id="cityArea">
                <%-- <label for="S"><div class="cityBox">서울특별시</div></label>
                <input type="radio" id="S" name="cityName" class="cityCheck" value="11">
                 --%>
            </div>
            
            <div class="title">기차역 선택</div>
            <div class="desti"id="desti">
<%-- 
                <label for="11"><div class="destiBox">상봉</div></label>
                <input type="radio" id="11" name="desName" class="desCheck" value="상봉"> --%>
                
            </div>

            <div class="btnArea"><button id="stationBtnM">확인</button></div>
        </section>


</body>
<script>
        //input을 datepicker로 선언
        // (function(){
        //      $(".datepicker").datepicker({
        //     dateFormat: 'yymmdd' //달력 날짜 형태
        //     ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
        //     ,showMonthAfterYear:true // 월- 년 순서가아닌 년도 - 월 순서
        //     ,changeYear: true //option값 년 선택 가능
        //     ,changeMonth: true //option값  월 선택 가능                
        //     ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
        //     ,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
        //     ,buttonImageOnly: true //버튼 이미지만 깔끔하게 보이게함
        //     ,buttonText: "선택" //버튼 호버 텍스트              
        //     ,yearSuffix: "년" //달력의 년도 부분 뒤 텍스트
        //     ,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 텍스트
        //     ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip
        //     ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 텍스트
        //     ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 Tooltip
        //     ,minDate: "-5Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
        //     ,maxDate: "+5y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)  
        // });                    
        
        // //초기값을 오늘 날짜로 설정해줘야 합니다.
        
        // $('#datepicker').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후) 
        // })()
                  
 </script>

<!-- <script src="../js/timeTable copy.js"></script> -->
<script src="/resources/js/train/trainTicketing.js"></script>

</html>