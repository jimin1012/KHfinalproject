<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

            <!DOCTYPE html>
            <html>

            <head>
                <meta charset="utf-8">
                <title>맛집 지도</title>

                <link rel="stylesheet" href="/resources/css/tastyRest/tastyRest-map.css">

            </head>


            <body>
                <!-- header 연결 -->
                <jsp:include page="/WEB-INF/views/common/header.jsp" />

                <main>

                    <!-- container -->
                    <div class="map-container">
                        <!-- 검색목록-->
                        <div id="menu_wrap" class="bg_white">
                            <div class="option">
                                <div class="input-area">
                                    <form onsubmit="searchPlaces(); return false;">
                                        <input type="text" value="역삼" id="placeInput" size="16"
                                            placeholder="지역을 입력하세요.">
                                        <input type="hidden" value="맛집" id="hiddenInput">
                                        <button type="submit" class="search-btn">검색하기</button>
                                    </form>
                                </div>
                            </div>
                            <hr>
                            <ul id="placesList"></ul>
                            <div id="pagination"></div>

                            <div class="hidden-div">
                                <section class="restImg-section">
                                    <div class="restImg-div">
                                        <img id="restProfile" src="https://i.postimg.cc/Dwv0Ns85/image.jpg">

                                        <span class="back-to-list">
                                            << </span>
                                    </div>
                                </section>

                                <section class="restInfo-section">
                                    <div class="restInfo-div">
                                        <div class="restName">1</div>
                                        <div class="restAddr">1</div>
                                        <div class="restTel">1</div>
                                        <form action="insert-RestReview" method="get">
                                            <input type="hidden" name="getRestName" value="" class="hidden">
                                            <div class="reviewBtn-div"><button class="reviewBtn">리뷰 작성하기</button></div>
                                        </form>
                                    </div>
                                </section>

                                <section class="restReview-section"> </section>
                            </div>
                        </div>

                        <!-- 지도 -->
                        <div class="map_wrap">
                            <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;"></div>
                        </div>

                    </div>
                </main>

                <!-- footer 연결 -->
                <jsp:include page="/WEB-INF/views/common/footer.jsp" />

                <!-- 015e9fec160649824e0356913198771a -->

                <script type="text/javascript"
                    src="//dapi.kakao.com/v2/maps/sdk.js?appkey=015e9fec160649824e0356913198771a&libraries=services"></script>

                <script src="/resources/js/tastyRest/tastyRest-map.js"></script>


                <script>

                </script>

            </body>

            </html>