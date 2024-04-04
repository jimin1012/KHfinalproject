<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>축제소개게시판</title>
 <link rel="stylesheet" href="/resources/css/board/boardFestivalDetail-style.css">
 <link rel="stylesheet" href="/resources/css/board/comment-style.css">
 <link rel="stylesheet" href="/resources/css/chat-message/messageModal-style.css">
<script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>
</head>
<body>
    <jsp:include page="/WEB-INF/views/common/header.jsp" />
        <main>
            <section class="content">
                <h1>국내 축제 소개 게시판</h1>
                <div class="board-wrap">
                    <div id="boardFrm">
                        <div>
                           ${board.boardTitle}
                        </div>
                        <div id="subInfo" onClick="showMessageModal(${board.userNo}, '${board.userNickname}', this, 'boardF')"> 
                            <div class="writerInfoBox">
                                <div>작성자 : ${board.userNickname}</div>
                                <div>작성일 : ${board.boardCreateDate}</div>
                                <div>조회 수 : ${board.readCount}</div>
                            </div>
                        </div>
                        <div id="festivalInfo">
                            <div>기간 : ${board.festival.festivalStartDate} ~ ${board.festival.festivalEndtDate}</div>
                            <div>장소 : ${board.festival.festivalAddress}</div>
                            <div>주최/주관 : ${board.festival.festivalHost}</div>
                            <div>요금 : ${board.festival.festivalPrice} 원</div>
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
            
            <%-- 댓글, 신고하기 --%>
            <jsp:include page="commentFestival.jsp"/>

            <div class="reportBoardArea">
                <div>
                    <button id="reportBtn">게시글 신고</button>
                </div>
            </div>

            
            <jsp:include page="/WEB-INF/views/board/boardModal.jsp" />
            <jsp:include page="/WEB-INF/views/board/commentModal.jsp" />
            <jsp:include page="/WEB-INF/views/chat-message/messageModal.jsp" />
        </main>
    <script>
        const boardNo = "${board.boardNo}";
        const loginMemberNo = "${loginUser.userNo}";

        const boardCode = "${boardCode}";
        const writerNo = "${board.userNo}";
        const userNo = "${loginUser.userNo}";
    </script>
	<jsp:include page="/WEB-INF/views/common/footer.jsp" />

    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="/resources/js/board/festivalDetail.js"></script>
    <script src="/resources/js/board/commentStar.js"></script>
    <script src="/resources/js/board/comment.js"></script>
    <script src="/resources/js/board/boardReport.js"></script> 
    <script src="/resources/js/chat-message/messageModal.js"></script>
</body>
</html>