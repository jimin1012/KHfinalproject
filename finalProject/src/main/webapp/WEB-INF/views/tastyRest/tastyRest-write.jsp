<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

      <!DOCTYPE html>
      <html>

      <head>
        <meta charset="utf-8">
        <title>리뷰 작성</title>

        <link rel="stylesheet" href="/resources/css/tastyRest/tastyRest-write.css">

      </head>

      <c:set var="restName" value="${param.getRestName}" />

      <body>
        <!-- header 연결 -->
        <jsp:include page="/WEB-INF/views/common/header.jsp" />

        <main>

          <form action="insert-RestReview" method="POST" class="board-write" id="boardWriteFrm"
            enctype="multipart/form-data">

            <h2 class="board-name">'${restName}'의 경험을 공유해주세요 </h2>
            <input type="hidden" name="restName" value="${restName}">

            <!-- 제목 -->
            <h1 class="board-title">
              <input type="text" name="title" placeholder="제목을 15글자 이내로 입력해주세요." value="" maxlength="15">
            </h1>

            <!-- 내용 -->
            <div class="board-content">
              <textarea name="boardContent" maxlength="650" placeholder="650자 이내로 작성 가능합니다."></textarea>
            </div>

            <!-- 별점 -->
            <p class="starGuide">별점을 입력해주세요.</p>
            <div class="rating_box">
              <div class="rating">
                ★★★★★
                <span class="rating_star">★★★★★</span>
                <input type="range" value="1" step="1" min="0" max="5" name="starPoint">
              </div>
            </div>
            <br/>


            <!-- 업로드 이미지 영역 -->
            <h4>미리보기 이미지를 선택하실 수 있습니다.</h4>
            <div class="img-box">
              <!-- 썸네일 영역 -->
              <div class="img-box">
                <div class="boardImg thumbnail">
                  <label for="img0">
                    <img class="preview" src="">
                    
                  </label>

                  <input type="file" name="images" class="inputImage" id="img0" accept="image/*">
                  <span class="delete-image">&times;</span>
                </div>
                
              </div>
            </div>
            <div class="guideText">클릭하여 이미지 선택.</div>
            <!-- 버튼 영역 -->
            <div class="board-btn-area">
              <button type="submit" id="writebtn">작성 완료</button>
            </div>

          </form>

        </main>

        <!-- footer 연결 -->
        <jsp:include page="/WEB-INF/views/common/footer.jsp" />

        <script src="/resources/js/tastyRest/tastyRest-write.js"></script>

      </body>

      </html>