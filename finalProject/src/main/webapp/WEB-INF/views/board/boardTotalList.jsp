<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%-- map 변수 저장 --%>
<c:set var="pagination" value="${map.pagination}"/>
<c:set var="boardList" value="${map.boardList}"/>
<c:set var="commentList" value="${map.commentList}"/>

<%-- 검색을 진행할 경우 key, query 쿼리스트링 선언--%>
<c:if test="${!empty param.key}" >
    <c:set var="kq" value="&key=${param.key}&query=${param.query}"/>
</c:if>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>통합 검색</title>
    <link rel="stylesheet" href="/resources/css/board/boardTotlaList-style.css">

    <script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>
</head>
<body>
    <!-- header 연결 -->
    <jsp:include page="/WEB-INF/views/common/header.jsp" />

    <main>
    
        <h1>통합게시판</h1>
    
        <section class="boardList">
    
            <c:choose>
                <c:when test="${empty searchResult.boardList}">
                    게시글이 존재하지 않습니다.
                </c:when>
                <c:otherwise>
                    <c:forEach var="board" items="${searchResult.boardList}">
                        <article class="board">
    
                            <div class="boardName">${board.boardName}</div>
                            <div class="etc">
                                <div class="date">${board.boardCreateDate}</div>
                                <div class="etc1-1"><i class="fa-solid fa-eye"></i> ${board.readCount}</div>
                            </div>
                            <div class="boardTitle"><a
                                    href="/board/${board.boardCode}/${board.boardNo}?cp=${searchResult.pagination.currentPage}${sp}">${board.boardTitle}</a>
                            </div>
    
                        </article>
                    </c:forEach>
                </c:otherwise>
            </c:choose>
    
        </section>
    
        <div class="pagination-area">
            <ul class="pagination">
    
                <li><a href="4?cp=${searchResult.pagination.prevPage}${kq}">◀</a></li>
    
                <!-- 특정 페이지로 이동 -->
                <c:forEach var="i" begin="${searchResult.pagination.startPage}" end="${searchResult.pagination.endPage}"
                    step="1">
                    <c:choose>
                        <c:when test="${i == searchResult.pagination.currentPage}">
                            <li><a class="current">${i}</a></li>
                        </c:when>
                        <c:otherwise>
                            <li><a href="${boardCode}?cp=${i}${kq}">${i}</a></li>
                        </c:otherwise>
                    </c:choose>
                </c:forEach>
    
                <li><a href="4?cp=${searchResult.pagination.nextPage}${kq}">▶</a></li>
            </ul>
    </main>

    <!-- footer 연결 -->
    
</body>
<jsp:include page="/WEB-INF/views/common/footer.jsp" />
<script src="/resources/js/board/freeList.js"></script>
</html>