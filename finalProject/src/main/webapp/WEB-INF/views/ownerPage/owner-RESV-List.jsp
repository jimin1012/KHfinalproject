<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>숙소 예약 리스트</title>

      <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/ownerPage/owner-menu.css" />
      <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/ownerPage/owner-RESV-List.css" />
    </head>

    <body>
      <!-- header 연결 -->
      <jsp:include page="/WEB-INF/views/common/header.jsp" />
      <c:set var="ownerResnList" value="${sessionScope.ownerResnList}" />

      <!-- map에 저장된 값들을 각각 변수에 저장 -->
      <c:set var="pagination" value="${map.pagination}" />
      <c:set var="resnList" value="${map.ReservationList}" />
      <c:set var="todayListCount" value="${map.todayListCount}" />
      <c:if test="${!empty param.key}">
        <c:set var="sp" value="&key=${param.key}&query=${param.query}" />
      </c:if>

      <main>
        <div class="page-container">
          <jsp:include page="/WEB-INF/views/ownerPage/owner-menu.jsp" />

          <div class="content-container">
            <section class="reservation-title" >
              <div class="reservation">
                예약 현황
                <hr />
              </div>
            </section>

            <section class="orderBy-menu">
              <div id="select-orderBy" class="currentList">전체 예약 목록 조회</div>
              <span id="vertical">|</span>
              <div id="todayList">오늘 예약 리스트 (${todayListCount})</div>
              <!-- <span id="vertical">|</span>
              <div>입금 대기 2건</div> -->
            </section>

            <section class="reservation-list">
              <table>
                <thead>
                  <th>예약 번호</th>
                  <th>예약정보</th>
                  <th>예약자 정보</th>
                  <th>방문인원</th>
                  <th>객실정보</th>
                </thead>

                <tbody>

                  <c:forEach var="Resn" items="${resnList}">

                    <tr class="">
                      <td>${Resn.reservationNo}</td>
                      <td>
                        ${Resn.reservationStartDate}
                        <br />
                        ${Resn.reservationEndDate}
                      </td>
                      <td>
                        ${Resn.userName}
                        <br />
                        ${Resn.userTel}
                      </td>
                      <td>${Resn.resPeople}</td>
                      <td>
                        ${Resn.accType}(${Resn.accCode}번)
                        <br />
                        단가 : ${Resn.roomPrice}원
                      </td>
                    </tr>

                  </c:forEach>
                </tbody>
              </table>


              <figure>

                <div class="pagination-area">
                  <ul class="pagination">

                    <!-- 첫 페이지로 이동 -->
                    <li><a href="reservation?cp=1${sp}">&lt;&lt;</a></li>

                    <!-- 이전 목록 마지막 번호로 이동 -->
                    <li><a href="reservation?cp=${pagination.prevPage}${sp}">&lt;</a></li>


                    <!-- 특정 페이지로 이동 -->
                    <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                      <c:choose>
                        <c:when test="${i == pagination.currentPage}">
                          <!-- 현재 보고있는 페이지 -->
                          <li><a class="current">${i}</a></li>
                        </c:when>

                        <c:otherwise>
                          <!-- 현재 페이지를 제외한 나머지 -->
                          <li><a href="reservation?cp=${i}${sp}">${i}</a></li>
                        </c:otherwise>
                      </c:choose>
                    </c:forEach>

                    <!-- 다음 목록 시작 번호로 이동 -->
                    <li><a href="reservation?cp=${pagination.nextPage}${sp}">&gt;</a></li>

                    <!-- 끝 페이지로 이동 -->
                    <li><a href="reservation?cp=${pagination.maxPage}${sp}">&gt;&gt;</a></li>

                  </ul>
                </div>
              </figure>
            </section>
          </div>
        </div>
      </main>

      <!-- footer 연결 -->
      <jsp:include page="/WEB-INF/views/common/footer.jsp" />

      <script src="${pageContext.request.contextPath}/resources/js/ownerPage/owner-resv.js"></script>
    </body>

    </html>