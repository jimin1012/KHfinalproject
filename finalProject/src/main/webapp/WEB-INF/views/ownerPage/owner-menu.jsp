<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>사이드 바</title>

      <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/ownerPage/owner-menu.css" />
    </head>

    <c:set var="owner" value="${sessionScope.owner}" />
    <c:set var="getACCImageOwners" value="${owner.ACCImageOwners}" />

    <body>
      <div class="side-menu">
        <section>
          <div class="title">사업자 페이지</div>
        </section>

        <section>
          <div class="circle-img">

            <c:forEach items="${getACCImageOwners}" var="item">
              <c:if test="${item.accImgLevel == 0}">
                <img class="current-image" src="${item.srcPath}">
                <c:set var="found" value="true" scope="page" />
              </c:if>
            </c:forEach>

            <c:if test="${not found}">
              <img src='/resources/images/ownerPage/ACC.jpg'>
            </c:if>

          </div>
        </section>

        <section class="accName">
          <p>${owner.accName}</p>
        </section>

        <section class="list" id="menu">
          <a href="info">사업장 정보</a>
        </section>
        <section class="list" id="menu">
          <a href="photo">홍보 이미지</a>
        </section>

        <section class="list" id="menu">
          <a href="reservation">예약 리스트</a>
        </section>

        <section class="list" id="menu">
          <a href="rooms">객실 관리</a>
        </section>

        <section class="list" id="menu">
          <a href="stats">이용 통계</a>
        </section> 
      </div>



      <script>
        document.addEventListener('DOMContentLoaded', function () {
          // '.current-image' 클래스를 가진 모든 이미지 요소를 선택
          const currentProfile = document.querySelectorAll('.current-image');

          currentProfile.forEach(function (image) {
            // 이미지의 src가 특정 경로인 경우
            if (image.src.endsWith('/resources/images/acc/')) {
              // 이미지의 src를 변경
              image.src = '/resources/images/ownerPage/ACC.jpg';
            }
          });
        });
      </script>
    </body>

    </html>