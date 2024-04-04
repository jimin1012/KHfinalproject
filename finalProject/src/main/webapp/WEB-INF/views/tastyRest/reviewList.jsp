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
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NXSHXW</title>

    <link rel="stylesheet" href="/resources/css/board/boardNotice-style.css">

</head>
<body>
    <!-- header 연결 -->
    <jsp:include page="/WEB-INF/views/common/header.jsp" />
    
    <main>
        <section class="content">
            <h1>맛집리뷰</h1>
            <div class="list-area">
                <table class="notice-table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회</th>
                        </tr>
                    </thead>
                    <tbody>
                        <c:choose>
                            <c:when test="${empty boardList}">
                                <tr>
                                    <td colspan="5">게시글이 존재하지 않습니다.</td>
                                </tr>
                            </c:when>
                            <c:otherwise>

                                <c:forEach var="board" items="${boardList}">

                                    <tr>
                                        <td>${board.boardNo}</td>
                                        <td><a href="/board/${boardCode}/${board.boardNo}?cp=${pagination.currentPage}${sp}">${board.boardTitle}</a></td>
                                        <td>관리자</td>
                                        <td>${board.boardCreateDate}</td>
                                        <td>${board.readCount}</td>
                                    </tr>
                                </c:forEach>
                            </c:otherwise>
                        </c:choose>
                        
                    </tbody>
                </table>
            </div>
            <div class="write-area">
                <c:if test="${loginUser.authority == 3}">
                    <button onclick="location.href='${boardCode}/insert'" id="writeBtn">글쓰기</button>
                </c:if>
            </div>
            
            <form action="1" method="get" id="boardSearch" onsubmit="return searchValidate()">
                <%-- <input type="hidden" name="type" value="${param.type}"> --%>
                <select name="key" id="search-select">
                    <option value="t">제목</option>
                    <option value="c">내용</option>
                    <option value="tc">제목+내용</option>
                </select>
                <input type="text" name="query" class="input-search">
                <button id="searchBoardBtn">검색</button>
            </form>
            

            <div class="pagination-area">

                

                <ul class="pagination">
                    

                    <li><a href="1?cp=${pagination.prevPage}${kq}">◀</a></li>


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

                    <li><a href="1?cp=${pagination.nextPage}${kq}">▶</a></li>



                </ul>

            </div>

        </section>



    </main>


    <!-- footer 연결 -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />

    <script src="/resources/js/board/noticeList.js"></script>

</body>
</html>