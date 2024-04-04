<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>객실 관리</title>

      <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/ownerPage/owner-menu.css" />
      <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/ownerPage/owner-rooms.css" />
    </head>

    <c:set var="restList" value="${sessionScope.restList}" />

    <c:set var="pagination" value="${map.pagination}" />
    <c:set var="roomList" value="${map.roomList}" />

    <body>
      <!-- header 연결 -->
      <jsp:include page="/WEB-INF/views/common/header.jsp" />

      <main>
        <div class="page-container">
          <jsp:include page="/WEB-INF/views/ownerPage/owner-menu.jsp" />

          <div class="content-container">

            <section class="reservation-title">
              <div class="reservation">
                객실 관리
                <hr />
              </div>
            </section>

            <section class="orderBy-menu">
              <div id="allRooms">방 목록</div>
              <span id="vertical">|</span>
              <div id="insertRooms">방 추가</div>
            </section>



            <section class="reservation-list">

              <table class="roomListTable">
                <thead>
                  <th></th>
                  <th class="accCode-td">객실코드</th>
                  <th class="accType-td">객실타입(이름)</th>
                  <th class="roomCapacity-td">수용인원</th>
                  <th class="roomCheckIn-td">체크인</th>
                  <th class="roomCheckOut-td">체크아웃</th>
                  <th class="roomPrice-td">방단가</th>
                  <th class="btn-td"></th>
                </thead>

                <tbody>

                  <c:forEach var="room" items="${roomList}">

                    <tr class="">
                      <td class="deleteSpan-td">
                        <span class="deleteSpan">&times;</span>
                      </td>
                      <td class="accCode-td">
                        <input type="text" name="accCode" value="${room.accCode}" readonly="true">
                        <span id="originCode">${room.accCode}</span>
                      </td>
                      <td class="accType-td">
                        <input type="text" name="accType" value="${room.accType}" maxlength="15"
                          placeholder="최대 15자 기입">
                        <span id="originType">${room.accType}</span>
                      </td>
                      <td class="roomCapacity-td">
                        <input type="text" name="roomCapacity" value="${room.roomCapacity}" maxlength="3"
                          placeholder="최대 백 단위" oninput="this.value = this.value.replace(/[^0-9]/g, '');">
                        <span id="originCapacity">${room.roomCapacity}</span>
                      </td>


                      <td class="roomCheckIn-td">
                        <input type="time" id="timeInput" name="roomCheckInTime" value="${room.roomCheckIn}">
                        <span id="roomCheckIn">${room.roomCheckIn}</span>
                      </td>
                      <td class="roomCheckOut-td">
                        <input type="time" id="timeInput" name="roomCheckOutTime" value="${room.roomCheckOut}">
                        <span id="roomCheckOut">${room.roomCheckOut}</span>
                      </td>

                      <td class="roomPrice-td">
                        <input type="text" name="roomPrice" value="${room.roomPrice}" maxlength="8"
                          placeholder="최대 억 단위" oninput="this.value = this.value.replace(/[^0-9]/g, '');">
                        <span id="originPrice">${room.roomPrice}원</span>
                      </td>
                      <td class="btn-td">
                        <div class="change-btn-area">
                          <button type="button" id="get-roomInput" class="roomInputBtn">
                            객실정보 변경
                          </button>
                          <button type="button" id="change-accGrade" class="changeBtn">
                            변경내역 제출
                          </button>
                        </div>
                      </td>
                    </tr>

                  </c:forEach>
                </tbody>
              </table>


              <figure>

                <div class="pagination-area">
                  <ul class="pagination">

                    <!-- 첫 페이지로 이동 -->
                    <li><a href="rooms?cp=1${sp}">&lt;&lt;</a></li>

                    <!-- 이전 목록 마지막 번호로 이동 -->
                    <li><a href="rooms?cp=${pagination.prevPage}${sp}">&lt;</a></li>


                    <!-- 특정 페이지로 이동 -->
                    <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                      <c:choose>
                        <c:when test="${i == pagination.currentPage}">
                          <!-- 현재 보고있는 페이지 -->
                          <li><a class="current">${i}</a></li>
                        </c:when>

                        <c:otherwise>
                          <!-- 현재 페이지를 제외한 나머지 -->
                          <li><a href="rooms?cp=${i}${sp}">${i}</a></li>
                        </c:otherwise>
                      </c:choose>
                    </c:forEach>

                    <!-- 다음 목록 시작 번호로 이동 -->
                    <li><a href="rooms?cp=${pagination.nextPage}${sp}">&gt;</a></li>

                    <!-- 끝 페이지로 이동 -->
                    <li><a href="rooms?cp=${pagination.maxPage}${sp}">&gt;&gt;</a></li>

                  </ul>
                </div>
              </figure>

            </section>

          </div>
        </div>
      </main>

      <!-- footer 연결 -->
      <jsp:include page="/WEB-INF/views/common/footer.jsp" />
    </body>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <script src="${pageContext.request.contextPath}/resources/js/ownerPage/owner-rooms.js"></script>


    </html>