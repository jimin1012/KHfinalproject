<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/resources/css/board/boardPollList-style.css">
            <title>투표게시판 목록</title>
        </head>

        <body>

            <main>
                <c:set var="pagination" value="${map.pagination}" />
                <c:set var="boardList" value="${map.boardList}" />
                <jsp:include page="/WEB-INF/views/common/header.jsp" />
                    <h1 class="titleF">투표게시판</h1>
                <div class="list-wrapper">
                    <table class="pollTable">
                        
                        <c:choose>
                            <c:when test="${empty boardList}">
                                <h1>게시글이 존재하지 않습니다.</h1>
                                
                            </c:when>
                            <c:otherwise>
                                <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>제목</th>
                                        <th>글쓴이</th>
                                        <th>작성일</th>
                                        <th>조회수</th>
                                        <th>좋아요</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <c:forEach var="board" items="${boardList}">
                                        <tr>
                                            <th>${board.boardNo}</th>
                                            <td><a
                                                href="/board/${boardCode}/${board.boardNo}?cp=${pagination.currentPage}">${board.boardTitle}</a><span>[${board.commentCount}]</span>
                                            </td>
                                            <td>${board.userNickname}</td>
                                            <td>${board.boardCreateDate}</td>
                                            <td>${board.readCount}</td>
                                            <td>${board.likeCount}</td>
                                        </tr>
                                    </c:forEach>
                            </c:otherwise>
                        </c:choose>
                        </tbody>
                    </table>
                </div>



           

                
                <div class="write-area">
                    <button onclick="location.href='3/insert'" id="writeBtn">글쓰기</button>
                </div>
                <div class="pagination-area">

                    <ul class="pagination">
                        <li><a href="3?cp=${pagination.prevPage}${kq}">◀</a></li>
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

                        <li><a href="3?cp=${pagination.nextPage}${kq}">▶</a></li>
                    </ul>
                </div>


                <form action="3" method="get" id="boardSearch" onsubmit="return searchValidate()">
                    <input type="hidden" name="type" value="${param.type}">
                    <select name="key" id="search-select" >
                        <option value="t">제목</option>
                        <option value="c">내용</option>
                        <option value="tc">제목+내용</option>
                    </select>
                    <input type="text" name="query" class="input-search">
                    <button id="searchBoardBtn">검색</button>
                </form>

            </main>
            <jsp:include page="/WEB-INF/views/common/footer.jsp" />
        </body>
        <script src="/resources/js/board/pollBoardList.js"></script>

        </html>