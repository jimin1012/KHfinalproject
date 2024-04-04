<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>에러페이지</title>


</head>
<body style=" height: 100vh; background-color: red; display: flex; justify-content: center; align-items: center;">
    <img id="img1" style="width: 50%; height: auto" src="https://mblogthumb-phinf.pstatic.net/MjAyMTEyMTdfMjU4/MDAxNjM5NzMyNDQ2NDg3.tF67mBP1lWaX7UJ3-Cmpm3vAtQGHHxPqhSuc30v1IOIg.gokz0DpQ7UO1k91evWdZU4YZXergBm1h9vZJ1rUA6aUg.JPEG.94wlgns/%EA%B3%B5%ED%8F%AC%EA%B2%8C%EC%9E%84_%EB%94%94%EB%B0%94%EC%9A%B0%EB%9F%AC(DEVOUR)_%ED%95%B4%EB%B4%A4%EC%8A%B5%EB%8B%88%EB%8B%A442.jpg?type=w800">


    <script>

        const img = document.getElementById("img1");

        
            let intervalId = setInterval(function() {
                img.style.transform = `scale(2)`;
            }, 500);

            // 5초 후에 clearInterval() 함수를 사용하여 타이머 중지
            setTimeout(function() {
            clearInterval(intervalId);
            }, 5000);
            
      


    </script>
</body>
</html>