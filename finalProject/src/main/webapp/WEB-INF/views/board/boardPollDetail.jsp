<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>투표게시판 상세</title>
    <link rel="stylesheet" href="/resources/css/board/boardFreeDetail.css">
    <link rel="stylesheet" href="/resources/css/board/poll-style.css">
    <link rel="stylesheet" href="/resources/css/board/comment-style.css">
    <link rel="stylesheet" href="/resources/css/chat-message/messageModal-style.css">
    <script src="https://kit.fontawesome.com/632d1cfe2a.js" crossorigin="anonymous"></script>
</head>
<body>
    <jsp:include page="/WEB-INF/views/common/header.jsp" />
    <main>
        <!-- 게시글 제목 -->
        <section class="boardTitleArea">
            <div class="titleF">${board.boardTitle}</div>
            <!-- etc 정보 -->
            <div class="etcArea">
                <div class="etcArea1">
                    <div class="profileImg">
                        <!-- 프로필 이미지 -->
                        <c:choose>
                            <c:when test="${empty board.profileImage}">
                                <!-- 프로필 이미지가 없을 경우 기본이미지 출력 -->
                                <img src="/resources/images/main/user.png">
                            </c:when>
                            <c:otherwise>
                                <!-- 프로필 이미지가 있을 경우 출력 -->
                                <img src="${board.profileImage}">
                            </c:otherwise>
                        </c:choose>
                        
                    </div>
                    <div class="nickName" onClick="showMessageModal(${board.userNo}, '${board.userNickname}', this, 'board')">${board.userNickname}</div>
                    <div class="boardCDate">${board.boardCreateDate}</div>
                    <div></div>
                </div>
                <div class="etcArea2">
                    <span><i class="fa-solid fa-eye"></i>${board.readCount}</span>
                    <span><i class="fa-solid fa-comment"></i><span id="commentCount">${board.commentCount}</span></span> 
                    <span>

                        <%-- 좋아요 누른 적이 없거나, 로그인X --%>
                        <c:if test="${empty likeCheck}">
                            <i class="fa-regular fa-heart" id="boardLike" style="font-size: 20px;"></i>
                        </c:if>

                        <%-- 좋아요를 누른 적이 있을 때 --%>
                        <c:if test="${!empty likeCheck}">
                            <i class="fa-solid fa-heart" id="boardLike"></i>
                        </c:if>
                        
                        <span id="likeCount">${board.likeCount}</span>
                    </span>
                    <span><i class="fa-solid fa-share" id="shareBtn"></i></span>
                </div>

            </div>
        </section>

        <!-- 게시글 내용 -->
        <section class="boardContentArea">
            <jsp:include page="/WEB-INF/views/board/poll.jsp" />
            ${board.boardContent}
        </section>

        <!-- 버튼 영역(수정/삭제) -->
        <section class="btnArea">
        
            <c:if test="${board.userNo == loginUser.userNo}">
                <button  class="btn11" id="updateBtn">수정</button>
                <button  class="btn11" id="deleteBtn">삭제</button>
            </c:if>
        </section>

        <jsp:include page="comment.jsp"/>

        <div class="buttonArea2">
            <button class="btn33" id="gotoList">목록으로</button>
            <button class="btn33" id="reportBtn">신고</button>
        </div>

        <jsp:include page="/WEB-INF/views/board/boardModal.jsp" />
        <jsp:include page="/WEB-INF/views/board/commentModal.jsp" />
        <jsp:include page="/WEB-INF/views/chat-message/messageModal.jsp" />
    </main>

    <jsp:include page="/WEB-INF/views/common/footer.jsp" />
    
        <script>
        // JSP에서 작성 가능한 언어/라이브러리
        // -> html, css, js, java, EL, JSTL
        
        // JSP 해서 우선 순위 : java/EL/JSTL > HTML,CSS,JS

        // 게시글 번호 전역 번수로 선언
        const boardNo = "${board.boardNo}";
        // console.log(boardNo);

        // 로그인한 회원 번호를 전역 변수로 선언
        // -> 작성한 EL 구문이 null일 경우 빈칸으로 출력되어 
        //     변수에 값이 대입되지 않는 문제가 발생할 수 있음!
        // 해결방법 : EL 구문을 '', ""문자열로 감싸면 해결
        //              -> EL 값이 null 이여도 ""(빈문자열)로 출력
        const loginMemberNo = "${loginUser.userNo}";

        const boardCode = "${boardCode}";

        const writerNo = "${board.userNo}";
        const userNo = "${loginUser.userNo}";
    </script>

    <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js"
    integrity="sha384-kDljxUXHaJ9xAb2AzRd59KxjrFjzHa5TAoFQ6GbYTCAG0bjM55XohjjDT7tDDC01" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="/resources/js/board/pollDetail.js"></script>
    <script src="/resources/js/board/comment.js"></script>
    <script src="/resources/js/board/like.js"></script>
    <script src="/resources/js/board/boardReport.js"></script>
    <script src="/resources/js/chat-message/messageModal.js"></script>
</body>
</html>