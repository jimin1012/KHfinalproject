<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>비밀번호 변경</title>

     <link rel="stylesheet" href="/resources/css/myPage/myPage-style.css">
    <link rel="stylesheet" href="/resources/css/myPage/sideMenu-style.css">
    <link rel="stylesheet" href="/resources/css/myPage/myPageChangePw-style.css">
</head>
<body>

    <!-- header -->
    <jsp:include page="/WEB-INF/views/common/header.jsp" />

    <main>
    
        <div class="myPage-content">
    
            <!-- 사이트 바 -->
            <jsp:include page="/WEB-INF/views/myPage/sideMenu.jsp" />
    
            <!-- 오른쪽 마이페이지 주요 내용 부분 -->
            <section class="myPage-main">
    
                <h1 class="myPage-title">비밀번호 변경</h1>
                <span class="myPage-subject">현재 비밀번호가 일치하는 경우 새 비밀번호로 변경할 수 있습니다.</span>
    
                <form action="changePw" method="POST" name="myPageFrm" id="changePwFrm">
    
                    <div class="myPage-row">
                        <label>현재 비밀번호</label>
                        <input type="password" name="currentPw" id="currentPw" maxlength="30">
                    </div>
    
                    <div class="myPage-row">
                        <label>새 비밀번호</label>
                        <span class="signUp-message" id="pwMessage"></span>
                        <input type="password" name="newPw" id="newPw" maxlength="30">
                    </div>
    
                    <div class="myPage-row">
                        
                        <label>새 비밀번호 확인</label>
                        <span class="signUp-message" id="pwMessage2"></span>
                        <input type="password" name="newPwConfirm" id="newPwConfirm" maxlength="30">
                    </div>
    
                    <div class="myPage-row">
                        <button class="myPage-submit" id="changePwBtn">변경하기</button>
                    </div>
                </form>
        </div>
    
    </main>

    <!-- footer 연결 -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />

    <script src="/resources/js/myPage/myPage-changePw.js"></script>

</body>
</html>