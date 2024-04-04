<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NXSHXW</title>

    <link rel="stylesheet" href="/resources/css/common/main-style.css">
    <link rel="stylesheet" type="text/css" href="resources/css/slick-1.8.1/slick/slick.css"/>
    <link rel="stylesheet" type="text/css" href="resources/css/slick-1.8.1/slick/slick-theme.css"/>

    <link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<script src="//code.jquery.com/jquery-1.12.4.js"></script>
	<script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <script src="https://code.jquery.com/jquery-3.6.1.slim.min.js" integrity="sha256-w8CvhFs7iHNVUtnSP0YKEg00p9Ih13rlL9zGqvLdePA=" crossorigin="anonymous"></script>
        <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
    <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
</head>

<body>
    <!-- header 연결 -->
    <jsp:include page="/WEB-INF/views/common/header.jsp" />

    <main>
        <div class="main-container1">
            <div class="main-viewContainer">
                <div class="main-view">
                    <ul>
                        <li><img src="/resources/images/main/mainImage1.png" /></li>
                        <li><img src="/resources/images/main/mainImage1.png" /></li>
                        <li><img src="/resources/images/main/mainImage1.png" /></li>
                    </ul>
                </div>
                    
                <!-- 메인 문구 -->       
                <div class="cater3-movingBG">
                    <div class="flyinTxtCont">
                        <div class="flyIn lineOne">여행은 항상</div>
                        <div class="flyIn lineTwo"><span id="lineTwo">NXSHXW</span>와 함께하세요.</div>
                    </div>
                </div>
            </div>

        </div>

        <div class="main-container2">

            <!-- totalReserv -->
            <div class="totalReserv">
                <!-- ReservNav -->
                <ul class="reservNav">
                    <li class="tab-link current" data-tab="reservNav-train">
                        <i class="fa-solid fa-train"></i>
                        기차
                    </li>
                    <li class="tab-link" data-tab="reservNav-bus">
                        <i class="fa-solid fa-bus"></i>
                        버스
                    </li>
                    <li class="tab-link" data-tab="reservNav-acc">
                        <i class="fa-solid fa-hotel"></i>
                        숙소
                    </li>
                    <li class="tab-link" data-tab="reservNav-weather" id="weatherBtn">
                        <i class="fa-solid fa-cloud"></i>
                        날씨
                    </li>
                </ul>
        
                <div id="reservNav-train" class="reservNav-content current">
                    <!-- 기차 화면 -->
                    <jsp:include page="/WEB-INF/views/train/trainTicketing.jsp" />
                </div>
        
                <div id="reservNav-bus" class="reservNav-content">
                    <!-- 버스 화면 -->
                    <jsp:include page="/WEB-INF/views/bus/bus-ticketing-area.jsp" />
                </div>
        
                <div id="reservNav-acc" class="reservNav-content">
                    <!-- 숙소 화면  -->
                    <jsp:include page="/WEB-INF/views/acc/accMain.jsp" />
                </div>
        
                <div id="reservNav-weather" class="reservNav-content">
                    <!-- 날씨 조회 화면 -->
                    <div class="weather-area">
                        <div class="weather-container">
                            <div class="weather-area1">
                                <span class="temperature"></span>
                            </div>
                            <div class="weather-area2">
                                <span class="place"></span>
                                <span class="description"></span>
                            </div>
                            <div class="weather-area3">
                                <img class="icon" />
                            </div>
                        </div>
                        <div class="weather-area1">
                            <span id="weatherNoshow">NXSHXW</span>
                        </div>
                    </div>
                </div>
        
            </div>
    
             <!-- 축제 게시판 조회수 순 -->
            <div class="festival-list">
            
                <div class="festival-titleArea">
                    <span id="main-festivalTitle">FESTIVAL NOTICE</span>
                    <span id="main-festivalSub">축제 게시판</span>
                </div>
            
                <c:choose>
                    <c:when test="${empty festivalBoardList}">
                        <img src="/resources/images/main/comingSoon_img.png" id="commingSoon">
                    </c:when>
                    <c:otherwise>
                            <div class="festival-area">
                        <c:forEach var="board" items="${festivalBoardList}" begin="0" end="3">
                                <a href="/board/2/${board.boardNo}?cp=1" id="festival-item">
                                    <c:choose>
                                        <c:when test="${!empty board.festivalThumbnail}">
                                            <img src="${board.festivalThumbnail}" id="festivalImg">
                                        </c:when>
                                        <c:otherwise>
                                            <!-- 대체 이미지 URL 설정 -->
                                            <img src="/resources/images/main/festivalNone.png" id="festivalImg">
                                        </c:otherwise>
                                    </c:choose>
                                    <div class="festival-info">
                                        <span>${board.boardTitle}</span>
                                        <i class="fa-solid fa-plus" id="infoPlus"></i>
                                    </div>
                                </a>
                        </c:forEach>
                            </div>
                            <button type="button" class="slick-prev">Previous</button>
                    </c:otherwise>
                </c:choose>
            </div>
          
            <div class="main-container3">

                <div class="accevent-area">
                    <div class="accevent-container">
                        <div class="accevent-time">
                            <span id="timeMent">
                                오늘의 특가가 <span id="remainingTime">86400</span> 남았습니다
                            </span>
                        </div>
                        <div class="accevent-content1">
                
                            <div class="accevent-info">

                                <div class="slideshow-container">
                                    <div class="SlideBackground">
                                        <div class="mySlides fade">
                                            <img src="/resources/images/main/hotel1.png" class="slideshow-image">
                                        </div>
                                        <div class="mySlides fade">
                                            <img src="/resources/images/main/hotel2.png" class="slideshow-image">
                                        </div>
                                        <div class="mySlides fade">
                                            <img src="/resources/images/main/hotel3.png" class="slideshow-image">
                                        </div>
                                        <div class="mySlides fade">
                                            <img src="/resources/images/main/hotel4.png" class="slideshow-image">
                                        </div>
                                    </div>
                                </div>

                                <div id="accCheckBtn">
                                    <a href="/acc/changeList">지금 바로 확인하기</a>
                                </div>
                            </div>
                
                        </div>
                        <c:choose>
                            <c:when test="${empty accBoardList}">
                                <span>업데이트 예정입니다.</span>
                            </c:when>
                            <c:otherwise>
                                <div class="accevent-content2">
                                    <div class="acc-itemArea">
                                        <!-- 다른 숙소 정보 -->
                                        <c:forEach var="accBoardList" items="${accBoardList}" begin="0" end="3">
                                            <div class="acc-item">
                                                <a href="acc/reservation?accName=${accBoardList.accName}">
                                                    <c:choose>
                                                        <c:when test="${!empty accBoardList.thumbnail}">
                                                            <img src="${accBoardList.thumbnail}" id="accImg">
                                                        </c:when>
                                                        <c:otherwise>
                                                            <!-- 대체 이미지 URL 설정 -->
                                                            <img src="/resources/images/main/festivalNone.png" id="accImg">
                                                        </c:otherwise>
                                                    </c:choose>
                                                    <div class="acc-info">
                                                        <span>${accBoardList.accName}</span>
                                                    </div>
                                                </a>
                                            </div>
                    
                                        </c:forEach>
                                    </div>
                                </div>
                            </c:otherwise>
                        </c:choose>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- footer 연결 -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />


    <script src="/resources/js/main.js"></script>

</body>
</html>