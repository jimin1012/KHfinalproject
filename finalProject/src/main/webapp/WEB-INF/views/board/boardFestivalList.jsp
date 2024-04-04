<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%-- map 변수 저장 --%>
<c:set var="pagination" value="${map.pagination}"/>
<c:set var="boardList" value="${map.boardList}"/>

<%-- 시기별, 지역별 조회 selectDate, selectLocation 쿼리스트링 선언--%>
<c:if test="${!empty param.selectDate}" >
    <c:set var="dl" value="&selectDate=${param.selectDate}&selectLocation=${param.selectLocation}"/>
</c:if>

<%-- 검색을 진행할 경우 key, query 쿼리스트링 선언--%>
<c:if test="${!empty param.order}" >
    <c:set var="odr" value="&order=${param.order}"/>
</c:if>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>축제게시판 목록</title>

    <link rel="stylesheet" href="/resources/css/board/boardFestivalList-style.css">

</head>
<body>
    <!-- header 연결 -->
    <jsp:include page="/WEB-INF/views/common/header.jsp" />

    <main>
        <section class="content">
            <h1>국내 축제 소개 게시판</h1>
            <div class="selectBoxCategoryArea">
                <form action="2" id="festivalSelectFrm">
                    <div>
                        <i class="fa-regular fa-calendar-days fa-lg"></i>
                        <select name="selectDate" id="selectDate">
                            <option value="present">시기</option>
                            <option value="present">개최중</option>
                            <option value="coming">개최예정</option>
                            <option value="1">1월</option>
                            <option value="2">2월</option>
                            <option value="3">3월</option>
                            <option value="4">4월</option>
                            <option value="5">5월</option>
                            <option value="6">6월</option>
                            <option value="7">7월</option>
                            <option value="8">8월</option>
                            <option value="9">9월</option>
                            <option value="10">10월</option>
                            <option value="11">11월</option>
                            <option value="12">12월</option>
                        </select>
                    </div>

                    <div>
                        <i class="fa-solid fa-location-dot fa-lg"></i>
                        <select name="selectLocation" id="selectLocation">
                            <option value="local">지역</option>
                            <option value="서울">서울</option>
                            <option value="인천">인천</option>
                            <option value="세종">세종</option>
                            <option value="대전">대전</option>
                            <option value="대구">대구</option>
                            <option value="광주">광주</option>
                            <option value="부산">부산</option>
                            <option value="울산">울산</option>
                            <option value="경기도">경기도</option>
                            <option value="강원도">강원도</option>
                            <option value="충청북">충청북도</option>
                            <option value="충청남도">충청남도</option>
                            <option value="경상북도">경상북도</option>
                            <option value="경상남도">경상남도</option>
                            <option value="전북" >전북특별자치도</option>
                            <option value="전라남도">전라남도</option>
                            <option value="제주">제주도</option>
                        </select>
                    </div>
                    <button id="selectFesBtn">조회</button>
                </form>

                <c:if test="${!empty param.order}">
                    <c:choose>
                        <c:when test="${param.order == 'date'}">
                            <c:set var="d" value="cSelected" />
                        </c:when>
                        <c:when test="${param.order == 'star'}">
                            <c:set var="s" value="cSelected" />
                        </c:when>
                        <c:when test="${param.order == 'read'}">
                            <c:set var="r" value="cSelected" />
                        </c:when>
                        <c:otherwise>
                            <c:set var="d" value="cSelected" />
                        </c:otherwise>
                    </c:choose>
                </c:if>
                <c:if test="${empty param.order}">
                    <c:set var="d" value="cSelected" />
                </c:if>

            
                <div id="categoryArea">
                    <button class="${d}" id="dateCate">축제일순</button> |
                    <button class="${s}" id="starCate">별점순</button> |
                    <button class="${r}" id="readCate">조회수순</button>
                </div>

            </div>

            <div class="fetivalListArea">

                <ul>

                    <c:choose>
                        <c:when test="${empty boardList}">
                            <li>
                                <div>게시글이 존재하지 않습니다.</div>
                            </li>
                        </c:when>
                        <c:otherwise>

                            <c:forEach var="board" items="${boardList}">
                                <li>
                                    <a href="/board/${boardCode}/${board.boardNo}?cp=${pagination.currentPage}">
                                        <div class="imgContainer">
                                            <c:if test="${empty board.festivalThumbnail}" >
                                                <img src="/resources/images/main/festivalNone.png">
                                            </c:if>
                                            <c:if test="${!empty board.festivalThumbnail}" >
                                                <img src="${board.festivalThumbnail}">
                                            </c:if>

                                        </div>
                                        <div>${board.boardTitle} (${board.readCount})</div>
                                        <div>${board.festival.festivalStartDate} ~ ${board.festival.festivalEndtDate}</div>
                                        <div>${board.festival.festivalAddress}</div>
                                        <div>★${board.festival.commentStar}</div>
                                    </a>
                                </li>
                                  
                            </c:forEach>
                        </c:otherwise>
                    </c:choose>

                </ul>


            </div>


                
            <div class="write-area">
                <button onclick="location.href='${boardCode}/insert'" id="writeBtn">글쓰기</button>
            </div>
            
            <%-- <form action="2" method="get" id="boardSearch" onsubmit="return searchValidate()">
                <input type="hidden" name="selectDate" value="${param.selectDate}">
                <input type="hidden" name="selectLocation" value="${param.selectLocation}">
                <select name="key" id="search-select">
                    <option value="t">제목</option>
                    <option value="c">내용</option>
                    <option value="tc">제목+내용</option>
                </select>
                <input type="text" name="query" class="input-search">
                <button id="searchBoardBtn">검색</button>
            </form> --%>
            

            <div class="pagination-area">

                

                <ul class="pagination">
                    

                    <li><a href="2?cp=${pagination.prevPage}${dl}${odr}">◀</a></li>


                    <!-- 특정 페이지로 이동 -->
                    <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                        <c:choose>
                            <c:when test="${i == pagination.currentPage}">
                                <li><a class="current">${i}</a></li>
                            </c:when>
                            <c:otherwise>
                                <li><a href="${boardCode}?cp=${i}${dl}${odr}">${i}</a></li>
                            </c:otherwise>
                        </c:choose>
                    </c:forEach>

                    <li><a href="2?cp=${pagination.nextPage}${dl}${odr}">▶</a></li>



                </ul>

            </div>

        </section>



    </main>


    <!-- header 연결 -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />

    <script src="/resources/js/board/festivalList.js"></script>

</body>
</html>