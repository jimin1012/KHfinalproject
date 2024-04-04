<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="list" value="${map.list}"/>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>구매내역</title>

    <link rel="stylesheet" href="/resources/css/myPage/myPage-style.css">
    <link rel="stylesheet" href="/resources/css/myPage/sideMenu-style.css">
    <link rel="stylesheet" href="/resources/css/myPage/myPagePurchaseDetails-style.css">

    <script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.js"></script>
    
    

</head>
<body>

    <!-- header -->
    <jsp:include page="/WEB-INF/views/common/header.jsp" />
     <main>
      <div class="myPage-content">
    
        <!-- 사이트 바 -->
        <jsp:include page="/WEB-INF/views/myPage/sideMenu.jsp" />
    
        <!-- 오른쪽 마이페이지 주요 내용 부분 -->
        <section class="myPage-main">
          <h1 class="myPage-title">구매내역</h1>
          <span class="myPage-subject"><span class="myPostNick">${loginUser.userNickname}</span>님의 구매내역입니다.</span>
    
          <!-- <form action="orderCancle" method="POST" name="myPageFrm-myPost" id="myPost"> --><!-- 버튼 누르면 결제취소 -->


            <div class="select-box">
              <select name="category" id="category">
                <option value="all">전체</option>
                <option value="train">기차</option>
                <option value="bus">버스</option>
                <option value="acc">숙소</option>
              </select>
            </div>
            <div id="tableWrap">
              <table class="fold-table">
                <thead>
                  <tr>
                    <th>예약 ID</th>
                    <th>상품명</th>
                    <th>출발지(숙소주소)</th>
                    <th>도착지</th>
                    <th>출발시간(체크인)</th>
                    <th>도착시간(체크아웃)</th>
                    <th>결제금액</th>
                    <th>예약일시</th>
                    <th>구별</th>
                    <th>예약</th>
                  </tr>
                </thead>
                <tbody>
                    <c:choose>
                      <c:when test="${empty list}">
                          <tr>
                            <th colspan="10">결제내역이 존재하지 않습니다.</th>
                          </tr>
                      </c:when>
                      <c:otherwise>
                          <c:forEach var="resList" items="${list}">
                              <tr class="view">			    
                                <td>${resList.reservationNo}</td>
                                <td>${resList.reservationName}</td>
                                <td>${resList.depPlace}${resList.accAddr}</td>
                                <td>${resList.arrPlace}</td>
                                <td>${resList.reservationStartDate}</td>
                                <td>${resList.reservationEndDate}</td>
                                <td>${resList.price}원</td>
                                <td>${resList.payTime}</td>
                                <td>
                                  <c:choose>
                                    <c:when test="${fn:contains(resList.reservType, 'A')}">
                                      <c:set var="reservType" value="숙소"/>
                                    </c:when>
                                    <c:when test="${fn:contains(resList.reservType, 'T')}">
                                      <c:set var="reservType" value="기차"/>
                                    </c:when>
                                    <c:when test="${fn:contains(resList.reservType, 'B')}">
                                      <c:set var="reservType" value="버스"/>
                                    </c:when>
                                  </c:choose>
                                  ${reservType}
                                </td>
                                <td>
									 <c:set var="found" value="false"/> 
									 <c:forEach var="btn" items="${reviewBtn}">
									 	   <input type="hidden" value="${btn.reservationNo}" class="reserVal" />
									       <c:if test="${resList.reservationNo eq btn.reservationNo}">
									            <button type="button" style="background-color: blue; color: white;" data-reservationNo="${resList.reservationNo}" id="reviewBtn" class="reviewBtn">리뷰</button>
									            <c:set var="found" value="true"/> 
									       </c:if>
									 </c:forEach>

									 <c:if test="${not found}">
									     <button type="button" onclick="return orderCancle('${resList.reservationNo}','${resList.reservUID}')">취소</button>
									 </c:if>

                                </td>
                              </tr>
                            </c:forEach>
                      </c:otherwise>
                    </c:choose>
  
                </tbody>
              </table>
            </div>
          <!-- </form> -->
        </section>
      </div>
    </main>
    
    
    <div id="modal-background1" class="modal-overlay1"></div>

	<div id="myModal1" class="modal1">
		<form action="/review/insert" method="POST" id="insertFrm">
			<div class="modal-content">
				<div>
					<textarea class="modal-text" name="accReviewContent" id="accReviewContent" rows="4" cols="50" maxlength="300"></textarea>
				</div>
				<div class="rateDi">
					청결도 : <input type="number" min="1" max="10" name="accCleanRate" id="accCleanRate" value="5">
					시설 : <input type="number" min="1" max="10" name="accFacRate" id="accFacRate" value="5">
					친절도 : <input type="number" min="1" max="10" name="accKindRate"  id="accKindRate" value="5">
				</div>
				<div class="buttonDi">
					<button type="button" id="reviewCan">취소</button>
					<button type="submit" id="reviewSub">등록</button>
					<input type="hidden" name="reservationNo" class="reservationNo"/>
				</div>
			</div>
		</form>
	</div>



    <!-- footer 연결 -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />
    


    <script src="/resources/js/myPage/myPage-purchaseDetails.js"></script>
    
    

</body>
</html>