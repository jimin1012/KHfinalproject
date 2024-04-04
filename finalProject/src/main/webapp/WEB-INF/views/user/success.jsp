<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>NXSHXW</title>

    <link rel="stylesheet" href="/resources/css/user/signUp-style.css">

    <script   script src="https://kit.fontawesome.com/97cdc46e56.js" crossorigin="anonymous"></script>

    <script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.js"></script>
</head>
<body class="page3">

    <jsp:include page="/WEB-INF/views/common/header.jsp" />

    <main>
    
        <section class="success-content">
    
            <div class="title">
                <p>회원가입</p>
            </div>
            
   <div class="progress-area">
    <div class="progress">
        <div class="circle active">1</div>
        <div class="progressBar" id="progressBar1"></div>
        <div class="circle">2</div>
        <div class="progressBar" id="progressBar2"></div>
        <div class="circle">3</div>
    </div>
</div>
            <div class="success-Information">
    
                <h2>NXSHXW의 회원이 되신걸 환영합니다.</h2>
    
                <br>
                <div class="successBtn">
                    <div class="successBtn1">
                        <a class="mainHome" href="/">메인페이지</a>
                    </div>
                    <div class="successBtn2">
                        <a class="login" href="/login">로그인</a>
                    </div>
                </div>
                <br>
                <br>
                <span class="successMgMent">사업자 전환서비스는 로그인 후 마이페이지에서 이용 가능합니다.</span>
            </div>
    
        </section>
    
    </main>

     <jsp:include page="/WEB-INF/views/common/footer.jsp" />
      <script src="/resources/js/user/progress.js"></script>

</body>
</html>