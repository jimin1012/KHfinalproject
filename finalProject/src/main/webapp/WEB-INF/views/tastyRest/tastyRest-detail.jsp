<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

      <!DOCTYPE html>
      <html>

      <head>
        <meta charset="utf-8">
        <title>리뷰 글 상세조회</title>

        <link rel="stylesheet" href="/resources/css/tastyRest/tastyRest-write.css">

      </head>

      <c:set var="restName" value="${param.getRestName}" />

      <body>
        <!-- header 연결 -->
        <jsp:include page="/WEB-INF/views/common/header.jsp" />

        <main>

          <div class="outline">
            <div class="review-container">
              <h2 class="board-name">'${review.restName}'의 리뷰 입니다. </h2>
              <input type="hidden" name="restName" value="${review.reviewNo}">

              <!-- 제목 -->
              <h1 class="board-title">
                ${review.title}
              </h1>
              <div class="reviewInfo">
                <div class="userName"> 작성자 : ${review.userName}</div>
                <div class="createDate">작성일 : ${review.createDate}</div>
              </div>
              <!-- 별점 -->
              <div class="point-div">
                별점 : <span id="resultPoint">${review.starPoint}</span>
              </div>
              

              <!-- 업로드 이미지 영역 -->
              <c:if test="${!empty review.thumbnail}" >
                <div class="img-box">
                  <div class="img">
                    <img src="${review.thumbnail}">
                  </div>
                </div>
              </c:if>

              <!-- 내용 -->
              <div class="reviewContent">
                ${review.boardContent}
              </div>

              <!-- 버튼 영역 -->
              <div class="board-btn-area">

                <c:if test="${loginUser.userNo == review.userNo}">
                  <button type="button" id="deleteReview">삭제</button>
                </c:if>

                <button type="button" id="goMap">지도로 이동</button>
              </div>
            </div>

          </div>




        </main>

        <!-- footer 연결 -->
        <jsp:include page="/WEB-INF/views/common/footer.jsp" />

        <script>

          function getQueryStringParameter(param) {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            return urlParams.get(param);
          }

          const reviewNo = getQueryStringParameter('reviewNo');

          deleteReviewBtn = document.getElementById("deleteReview");


          document.getElementById("goMap").addEventListener("click", () => {
            console.log(123);
            location.href = "/tastyRest/map";
          });

          deleteReviewBtn.addEventListener("click", () => {
            location.href = "/tastyRest/deleteReview?reviewNo=" + reviewNo;
            alert("리뷰가 삭제되었습니다.");
          })


          // 문서가 완전히 로드된 후 실행
          document.addEventListener('DOMContentLoaded', function () {
            var point = document.getElementById('resultPoint'); // 'resultPoint' ID를 가진 요소 찾기

            var starPoint = parseInt(point.innerText, 10); // 내부 텍스트(숫자)를 정수로 변환
            var stars = ''; // 별을 담을 빈 문자열 초기화
            for (var i = 0; i < starPoint; i++) {
              stars += '⭐'; // 별점 수만큼 별 추가
            }
            point.innerText = stars; // 생성된 별 문자열로 요소의 내부 텍스트 업데이트
          });


        </script>

      </body>

      </html>