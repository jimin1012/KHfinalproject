<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <%-- <link rel="stylesheet" href="/resources/css/bus/Bus-Ticketing(main).css"> --%>
      <link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://kit.fontawesome.com/632d1cfe2a.js" crossorigin="anonymous"></script>
    <title>Document</title>
</head>
<body>
    <div class="ticketing-Area">
        <div id="ticketing-row-1">
            <div id="ticketing-1-1">
                <!-- 출발지 -->
                <div>
                    <span class="name">출발 터미널</span>
                      <select id="dep-location-code">
                            <option value="0">전체</option>
                            <option value="1">서울 특별시</option>
                            <option value="2">경기도, 인천</option>
                            <option value="3">강원도</option>
                            <option value="4">세종</option>
                            <option value="5">대전,충청도</option>
                            <option value="6">전라도(광주)</option>
                            <option value="7">경상도(부산,대구)</option>
                        </select>
                        
                        <select id="auto-terminal">
                            
                        </select>
                </div>
                <!-- 도착지 -->
                <div>
                    <span class="name">도착 터미널</span>
                    <select id="arr-location-code">
                            <option value="0">전체</option>
                            <option value="1">서울 특별시</option>
                            <option value="2">경기도, 인천</option>
                            <option value="3">강원도</option>
                            <option value="4">세종</option>
                            <option value="5">대전,충청도</option>
                            <option value="6">전라도(광주)</option>
                            <option value="7">경상도(부산,대구)</option>
                        </select>
                        
                        <select id="auto-terminal2">
                            
                        </select>
                </div>

            </div>

            <div id="ticketing-1-2">
                <span class="name">가는 날</span>
                <input type="text" id="datepicker2"  >
            </div>

            <div id="ticketing-2-2">
                <button onclick="goBus()">조회하기</button>
            </div>
        </div>

        <div id="ticketing-row-2">
            <div id="ticketing-2-1">
                <b class="name" id="level-s">등급</b>
                <div id="seat-area">
                    <label for="level-all">전체<input type="radio" id="level-all" value="" name="seat" checked></label>
                    <label for="level-1">우등<input type="radio" id="level-1" value="1" name="seat"></label>
                    <label for="level-2">고속<input type="radio" id="level-2" value="2" name="seat"></label>
                    <label for="level-3">심야우등<input type="radio" id="level-3" value="3" name="seat"></label>
                    <label for="level-4">심야고속<input type="radio" id="level-4" value="4" name="seat"></label>
                    <label for="level-5">일반<input type="radio" id="level-5" value="5" name="seat"></label>
                    <label for="level-6">일반심야<input type="radio" id="level-6" value="6" name="seat"></label>
                    <label for="level-7">프리미엄<input type="radio" id="level-7" value="7" name="seat"></label>
                    <label for="level-8">심야프리미엄<input type="radio" id="level-8" value="8" name="seat"></label>
                </div>
            </div>


        </div>
    </div>
    <script>
            //input을 datepicker로 선언
            $("#datepicker").datepicker({
                dateFormat: 'yymmdd' //달력 날짜 형태
                , showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
                , showMonthAfterYear: true // 월- 년 순서가아닌 년도 - 월 순서
                , changeYear: true //option값 년 선택 가능
                , changeMonth: true //option값  월 선택 가능                
                , showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
                , buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
                , buttonImageOnly: true //버튼 이미지만 깔끔하게 보이게함
                , buttonText: "선택" //버튼 호버 텍스트              
                , yearSuffix: "년" //달력의 년도 부분 뒤 텍스트
                , monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] //달력의 월 부분 텍스트
                , monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] //달력의 월 부분 Tooltip
                , dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'] //달력의 요일 텍스트
                , dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'] //달력의 요일 Tooltip
                , minDate: "-5Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
                , maxDate: "+5y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)  
            });
            //초기값을 오늘 날짜로 설정해줘야 합니다.
            $('#datepicker').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)  
            
             $("#datepicker2").datepicker({
                dateFormat: 'yymmdd' //달력 날짜 형태
                , showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
                , showMonthAfterYear: true // 월- 년 순서가아닌 년도 - 월 순서
                , changeYear: true //option값 년 선택 가능
                , changeMonth: true //option값  월 선택 가능                
                , showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
                , buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
                , buttonImageOnly: true //버튼 이미지만 깔끔하게 보이게함
                , buttonText: "선택" //버튼 호버 텍스트              
                , yearSuffix: "년" //달력의 년도 부분 뒤 텍스트
                , monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] //달력의 월 부분 텍스트
                , monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] //달력의 월 부분 Tooltip
                , dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'] //달력의 요일 텍스트
                , dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'] //달력의 요일 Tooltip
                , minDate: "-5Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
                , maxDate: "+5y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)  
            });
            //초기값을 오늘 날짜로 설정해줘야 합니다.
            $('#datepicker2').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)  
             
    </script>
    <script src="/resources/js/bus/bus-test.js"></script>

</body>
</html>