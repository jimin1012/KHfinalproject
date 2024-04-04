<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>회원 탈퇴</title>

    <link rel="stylesheet" href="/resources/css/myPage/myPage-style.css">
    <link rel="stylesheet" href="/resources/css/myPage/sideMenu-style.css">
    <link rel="stylesheet" href="/resources/css/myPage/myPageSecession-style.css">
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
 
                <h1 class="myPage-title">회원 탈퇴</h1>
                <span class="myPage-subject">현재 비밀번호가 일치하는 경우 탈퇴할 수 있습니다.</span>

                <form action="secession" method="POST" name="myPageFrm-session" id="mysecessionFrm">
                    
                    <div class="myPage-session-row">
                        <label>회원 탈퇴 약관</label>
                    </div>

                    <div class="secession-terms">
제1조
이 약관은 샘플 약관입니다.

① 약관 내용 1

② 약관 내용 2

③ 약관 내용 3

④ 약관 내용 4


제2조
이 약관은 샘플 약관입니다.

① 약관 내용 1

② 약관 내용 2

③ 약관 내용 3

④ 약관 내용 4

                    </div>

                    <div>
                        <input type="checkbox" name="agree" id="agree">
                        <label for="agree">위 약관에 동의합니다.</label>
                    </div>

                    <br>

                    <div class="myPage-row">
                       <label>비밀번호</label>
                       <input type="password" name="userPw" id="userPw" maxlength="30">              
                   </div>



                    <button class="myPage-submit">탈퇴</button>

                </form>
                </div>
            
            </div>
        </div>
        
    </main>

    <!-- footer 연결 -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />

    <script src="/resources/js/myPage/myPage-secession.js"></script>

</body>
</html>