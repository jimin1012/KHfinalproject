<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>공지사항 게시글 상세페이지</title>
 <link rel="stylesheet" href="/resources/css/board/boardNoticeDetail-style.css">
<script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>
</head>
<body>
    <jsp:include page="/WEB-INF/views/common/header.jsp" />
        <main>
            <section class="content">
                <h1>공지사항</h1>
                <div class="board-wrap">
                    <div id="boardFrm">
                        <div>
                           ${board.boardTitle}
                        </div>
                        <div id="subInfo"> 
                            <div>작성자 : ${board.userNickname}</div>
                            <div>작성일 : ${board.boardCreateDate}</div>
                            <div>조회 수 : ${board.readCount}</div>
                        </div>
                        <div name="boardContent" id="boardContent">
                            ${board.boardContent}
                        </div>
                        <div>
                            <c:if test="${loginUser.userNo==board.userNo}">
                                <button id="deleteBtn">삭제</button>
                                <button id="updateBtn">수정</button>
                            </c:if>
                            <button id="goToListBtn">목록으로</button>
                        </div>
                    </div>
                </div>
            </section>
            <jsp:include page="/WEB-INF/views/common/footer.jsp" />
        </main>
    <script>
        const boardNo = "${board.boardNo}";
        const loginMemberNo = "${loginUser.userNo}";

        const boardCode = "${boardCode}";
    </script>

    <script src="/resources/js/board/noticeDetail.js"></script>
</body>
</html>