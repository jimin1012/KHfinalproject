<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resources/css/train/timetable.css">
    <link rel="stylesheet" href="/resources/css/train/mainTrain.css">
    
    
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://kit.fontawesome.com/632d1cfe2a.js" crossorigin="anonymous"></script>

    <title>기차 예약 메인</title>
</head>
<body>
 <jsp:include page="/WEB-INF/views/common/header.jsp" />
    
    <main>
        <!-- 로딩화면 -->
        <div class ="loading" id="loading">
            <img class="loadingImg" src="/resources/images/bus/loading_img.gif">
        </div>


        <div class="page-title">
            기차 예매
        </div>
    
        <div class="ticketing-Area">
            <div id="ticketing-row-1">
                <div id="ticketing-1-1">
                        <!-- 출발지 -->
                        <div id="departBox">
                            <span id="selectDeparture" class="name">출발지</span>
                            <span id="stationNameD">${param.depName}</span>
                            <span id="stationCodeD">${param.depCode}</span>
                        </div>
                      
                        <!-- 도착지 -->
                       <div id="arriveBox">
                            <span class="name"  id="selectArrival">도착지</span>
                            <span id="stationNameA">${param.arrName}</span>
                            <span id="stationCodeA">${param.arrCode}</span>
                        </div>
                </div>
    
                <div id="ticketing-1-2">
                    <span class="name">가는 날</span>
                    <input type="text"class="datepicker" id="datepicker" value="${param.realDate}">
                </div>
            </div>
    
            <div id="ticketing-row-2">
                <div id="ticketing-2-1">
                    <span class="name">등급</span>
                    <div id="seat-area">
                        *1호차/2호차는 특실입니다.*<br>
    
                    </div>
                </div>
    
                <div id="ticketing-2-2">
                    <button type="button" id="selectBtn">조회하기</button>
                </div>
            </div>
        </div>

        <div id="info-msg" class="disNone">

            <pre id="info-pre">
                    당일출발 차량의 경우 출발시간 1시간 전까지 홈페이지 예매가 가능하며 1시간 미만 출발임박 차량의 예매를 원하시면 고속버스 모바일앱에서 예매하시기 바랍니다.
    
                    1회 최대 예매 매수는 1매입니다. 
    
                    일반기차 청소년(중, 고등학생) 할인은 터미널 현장에서 학생증 및 청소년증을 제시 해야만 할인이 적용되며 탑승 시 소지가 꼭 필요합니다.
    
                    할인 승차권 부정 사용 시 운임의 10배 부가운임을 요구할 수 있습니다.
            </pre>

        </div>



        <!-- 날짜/지역/요금정보-->
        <section id="trainInformation" class="disNone">
            <div id="date"></div>
            <div>
                <!-- 지역 -->
                <div id="destination">
                    <div class="des" id="to"></div>
                    <span>_________</span>
                    <div class="des" id="from"></div>
                </div>
            </div>
        </section>

        


        <section  class="disNone" id="timeCon">
            <section id="timetable">
                <table>
                    <thead>
                        <tr>
                            <th>구분</th>
                            <th>열차종</th>
                            <th>열차번호</th>
                            <th>출발시간</th>
                            <th>도착시간</th>
                            <th>가격(일반)</th>
                            <th>선택</th>
                        </tr>
                    </thead>
                    <tbody id="tbody">

        
                    </tbody>
                </table>

            </section>
        </section>



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
            <div class="desti" id="desti">
<%-- 
                <label for="11"><div class="destiBox">상봉</div></label>
                <input type="radio" id="11" name="desName" class="desCheck" value="상봉"> --%>
                
            </div>

            <div class="btnArea"><button id="stationBtn">확인</button></div>
        </section>
    </main>

<jsp:include page="/WEB-INF/views/common/footer.jsp" />
</body>
<script>
console.log("")
    $(function() {
        //input을 datepicker로 선언
        $(".datepicker").datepicker({
            dateFormat: 'yymmdd' //달력 날짜 형태
            ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
            ,showMonthAfterYear:true // 월- 년 순서가아닌 년도 - 월 순서
            ,changeYear: true //option값 년 선택 가능
            ,changeMonth: true //option값  월 선택 가능                
            ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
            ,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
            ,buttonImageOnly: true //버튼 이미지만 깔끔하게 보이게함
            ,buttonText: "선택" //버튼 호버 텍스트              
            ,yearSuffix: "년" //달력의 년도 부분 뒤 텍스트
            ,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 텍스트
            ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip
            ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 텍스트
            ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 Tooltip
            ,minDate: "-5Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
            ,maxDate: "+5y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)  
        });                    
        console.log("123")
        console.log("${param.realDate}" + "!@");
        //초기값을 오늘 날짜로 설정해줘야 합니다.

        if("${param.realDate}" != ""){
            $('.datepicker').datepicker('${param.realDate}', 'today');

        }else{
            $('.datepicker').datepicker('setDate', 'today');
        }

    });
    
 </script>

<!-- <script src="../js/timeTable copy.js"></script> -->
<script src="/resources/js/train/train.js"></script>

</html>