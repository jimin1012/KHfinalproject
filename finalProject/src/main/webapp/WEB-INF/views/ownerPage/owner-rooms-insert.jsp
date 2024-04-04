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
                  <th class="accType-td">객실타입(이름)</th>
                  <th class="roomCapacity-td">수용인원</th>
                  <th class="roomCheckIn-td">체크인</th>
                  <th class="roomCheckOut-td">체크아웃</th>
                  <th class="roomPrice-td">방단가</th>
                  <th class="roomPrice-td">추가 객실 수 </th>
                  <th class="btn-td"></th>
                </thead>

                <tbody>

                  <tr class="">

                    <td class="accType-td">
                      <input type="text" name="accType" maxlength="15" placeholder="최대 15자 기입">
                    </td>
                    <td class="roomCapacity-td">
                      <input type="text" name="roomCapacity" maxlength="3" placeholder="최대 백 단위" 
                      oninput="this.value = this.value.replace(/[^0-9]/g, '');">
                    </td>
                    <td class="roomCheckIn-td">
                      <input type="time" id="InTimeInput" name="roomCheckInTime">
                    </td>
                    <td class="roomCheckOut-td">
                      <input type="time" id="OutTimeInput" name="roomCheckOutTime">
                    </td>
                    <td class="roomPrice-td">
                      <input type="text" name="roomPrice" maxlength="8" placeholder="최대 억 단위"
                      oninput="this.value = this.value.replace(/[^0-9]/g, '');">
                    </td>

                    <td class="roomCount-td">
                      <input type="text" name="roomCount" maxlength="2" placeholder="최대 십 단위"
                      oninput="this.value = this.value.replace(/[^0-9]/g, '');">
                    </td>

                    <td class="btn-td">
                      <div class="change-btn-area">
                        <button type="button" id="insertRoomBtn">
                          객실 추가
                        </button>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>



            </section>

          </div>
        </div>
      </main>

      <!-- footer 연결 -->
      <jsp:include page="/WEB-INF/views/common/footer.jsp" />
    </body>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>


    <script src="${pageContext.request.contextPath}/resources/js/ownerPage/owner-rooms-insert.js"></script>


    </html>