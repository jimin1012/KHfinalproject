<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%-- map 변수 저장 --%>
<c:set var="pagination" value="${map.pagination}"/>
<c:set var="boardList" value="${map.boardList}"/>

<%-- 검색을 진행할 경우 key, query 쿼리스트링 선언--%>
<c:if test="${!empty param.key}" >
    <c:set var="kq" value="&key=${param.key}&query=${param.query}"/>
</c:if>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>자유게시판 목록</title>
    <link rel="stylesheet" href="/resources/css/board/boardFreeList.css">

    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>
</head>
<body>
    <!-- header 연결 -->
    <jsp:include page="/WEB-INF/views/common/header.jsp" />

    <main>
        <h1>자유게시판</h1>
        <form action="4" method="GET" id="freeSearch" onsubmit="return searchValidate()">
            <input type="text" placeholder="검색어를 입력하세요." class="FreeSearch" name="query">
            <input type="hidden" name="key" value="t">
            <button id="searchBtn" class="fa-solid fa-magnifying-glass"></button>
        </form>


        <section class="boardList">

            <c:choose>
                <c:when test="${empty boardList}">
                        게시글이 존재하지 않습니다.
                </c:when>
                <c:otherwise>

                    <c:forEach var="board" items="${boardList}">

                        <article class="board">
                            <div class="date">${board.boardCreateDate}</div>
                            <div class="boardTitle"><a href="/board/${boardCode}/${board.boardNo}?cp=${pagination.currentPage}${sp}">${board.boardTitle}</a></div>
                            <div class="boardInfo">
                            <div class="boardWriter">${board.userNickname}</div>
                            <div class="etc">
                                <div class="etc1-1"><i class="fa-solid fa-eye"></i> ${board.readCount}</div>
                                <div class="etc1-1"><i class="fa-solid fa-comment"></i> ${board.commentCount}</div>
                                <div class="etc1-1"><i class="fa-solid fa-heart"></i> ${board.likeCount}</div>
                            </div>
                        </article>
                    </c:forEach>
                </c:otherwise>
            </c:choose>


        </section>

        <div class="buttonArea">

            <c:if test="${!empty loginUser.userNo}">

                <button onclick="location.href='${boardCode}/insert'" id="writeBtn">글쓰기</button>
            </c:if>
        </div>

        <div class="pagination-area">
            <ul class="pagination">
                

                <li><a href="4?cp=${pagination.prevPage}${kq}">◀</a></li>


                <!-- 특정 페이지로 이동 -->
                <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                    <c:choose>
                        <c:when test="${i == pagination.currentPage}">
                            <li><a class="current">${i}</a></li>
                        </c:when>
                        <c:otherwise>
                            <li><a href="${boardCode}?cp=${i}${kq}">${i}</a></li>
                        </c:otherwise>
                    </c:choose>
                </c:forEach>

                <li><a href="4?cp=${pagination.nextPage}${kq}">▶</a></li>



            </ul>

        </div>


    </main>

    <!-- footer 연결 -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />
    
</body>
<script src="/resources/js/board/freeList.js"></script>
</html>