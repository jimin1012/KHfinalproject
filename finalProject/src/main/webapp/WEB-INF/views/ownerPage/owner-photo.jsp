<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>홍보 이미지</title>


      <link rel="stylesheet" href="/resources/css/ownerPage/owner-menu.css">
      <link rel="stylesheet" href="/resources/css/ownerPage/owner-photo.css">


    </head>

    <body>
      <!-- header 연결 -->
      <jsp:include page="/WEB-INF/views/common/header.jsp" />

      <main>
        

        <c:set var="owner" value="${sessionScope.owner}" />
        <c:set var="ACCImageOwners" value="${owner.ACCImageOwners}" />

        <div class="page-container">

          <jsp:include page="/WEB-INF/views/ownerPage/owner-menu.jsp" />


          <div class="content-container">

            <section class="title-section">
              <div class="title">숙소이미지
                <hr>
              </div>
            </section>

            <section class="acc-profileImage-section">
              <div class="acc-profile">

                <c:forEach items="${ACCImageOwners}" var="item">
                  <c:if test="${item.accImgLevel == 0}">
                    <c:if test="${item.srcPath != '/resources/images/acc/' }">
                      <img id="acc-profileImage" src="${item.srcPath}">
                      <c:set var="found" value="true" scope="page" />
                    </c:if>
                  </c:if>
                </c:forEach>

                <c:if test="${not found}">
                  <img id="acc-profileImage" src="/resources/images/ownerPage/ACC.jpg">
                </c:if>

                <!-- <img id="acc-profileImage" src="https://ibb.co/xCpYj2B"> -->
                <!-- <img id="acc-profileImage" src="https://i.postimg.cc/Dwv0Ns85/image.jpg"> -->
              </div>
              <br>
              <input type="file" id="acc-profileInput" accept="image/*" name="acc-profileImage" />

              <div class="div-for-accProfile">
                <div class="accprofile-textArea">숙소 대표이미지</div>

                <label for="acc-profileInput" class="acc-p-img-lable">
                  <div id="div-profileInput">
                    이미지 선택
                  </div>
                </label>

                <button id="change-acc-profile">변경</button>
              </div>

            </section>

            <section class="accOtherImgArea">
              <button id="upload-acc-img">숙소 이미지 추가하기</button>
              <div class="img-container" id="imgContainer">
                <!-- ${ACCImageOwners} -->

                <c:forEach items="${ACCImageOwners}" var="item" varStatus="status">
                  <c:if test="${item.accImgLevel != 0}">
                    <div class="other-acc-img">
                      <!-- 이미지를 포함하는 div -->
                      <img id="acc-profileImage-${status.index}" src="${item.srcPath}">

                      <!-- 데이터 속성(data-item-accImgNo)에 item의 고유 식별자를 설정 -->
                      <span class="delete-image" data-item-accImgNo="${item.accImgNo}">
                        &times;
                      </span>
                    </div>
                  </c:if>
                </c:forEach>

              </div>
              <br>
            </section>

          </div>

        </div>

      </main>


      <script src="${pageContext.request.contextPath}/resources/js/ownerPage/owner-photo.js"></script>



      <!-- footer 연결 -->
      <jsp:include page="/WEB-INF/views/common/footer.jsp" />
    </body>


    </html>