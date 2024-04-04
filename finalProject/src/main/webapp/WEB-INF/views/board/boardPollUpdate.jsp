<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>투표게시판 수정</title>
        <link rel="stylesheet" href="/resources/css/board/boardFreeWrite.css">
        <script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>
        <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css" />
    </head>
    <script src="https://kit.fontawesome.com/632d1cfe2a.js" crossorigin="anonymous"></script>
</head>
<body>
    <jsp:include page="/WEB-INF/views/common/header.jsp" />   
    <main id="boardFrm">
        <!-- 게시글 제목 -->
        <section class="boardTitleArea">
            <div class="titleF">
                <input type="text" name="boardTitle" id="boardTitleInput" value="${board.boardTitle}" placeholder="제목을 입력해 주세요." value="" maxlength="50">
            </div>
        </section>
        
        <!-- 게시글 내용 -->
        <section class="boardContentArea">
            <div id="content">
                ${board.boardContent}
            </div>
            
        </section>
        
        <!-- 버튼 영역(수정/삭제) -->
        <section class="btnArea">
            <button class="btn11" id="insertBtn">수정</button>
        </section>
        
    </main>
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />
	<script src="/resources/js/board/pollBoardUpdate.js"></script>
    
</body>
</html>