<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resources/css/user/findId.css">
    <title>아이디 찾기</title>
</head>
<body>

    <main>

        <h1>계정 찾기</h1>

        <section class="findContainer">
            <div><a href="findId">아이디</a></div>            
            <div><a href="findPw">비밀번호</a></div>            
        </section>

        <!-- <div class="comment">
            아이디를 찾았습니다
        </div>     -->

        <section class="findComment">
            
            <p> 
                휴대폰 본인인증을 통해 <br>
                아이디(이메일)를 확인합니다.
                
            </p>
            
        </section>
        

        <form action="/findId" id="findFrm" class="findFrm" method="POST">
            <input type="text" placeholder="-없이 입력해주세요." id="phoneNum" name="phoneNum">
            <button class="findbtn">휴대폰 인증</button>
        </form>



    </main>
    <c:if test="${!empty message}">
        <script>
            alert("${message}");
			
            // EL 작성시 scope를 지정하지 않으면
            // page -> rquest -> session -> application 순서로 검색하여
            // 일치하는 속성이 있으면 출력
        </script>
        <!-- message 1회 출력 후 session에서 제거 -->

    <c:remove var="message" />
</c:if>

    <script src="/resources/js/user/find.js"></script>
</body>
</html>