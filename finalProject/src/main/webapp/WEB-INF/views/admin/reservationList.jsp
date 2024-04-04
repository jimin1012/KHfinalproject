<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>예약목록</title>

    <link rel="stylesheet" href="/resources/css/admin/reservationList-style.css">

</head>
<body>
    <div class="wrap">
        <!-- 관리자 헤더 -->
		<jsp:include page="/WEB-INF/views/admin/adminHeader.jsp" />
        <main>
            <section class="main-box">
                <h3>예약관리</h3>
                <section class="main-header">
                    <div>
                        <form action="reservationList" id="searchReserve">
                            <div>
                                <select name="key" id="searchKey">
                                    <option value="T">기차</option>
                                    <option value="B">버스</option>
                                    <option value="A">숙소</option>
                                </select>
                                <input type="text" name="query" id="inputQuery" autocomplete="off" placeholder="예매자를 입력하세요">
                            </div>
                            <div>
                                시작일 : <input type="date" name="startDate" id="startDate" class="selectDate">
                                
                                마지막일 : <input type="date" name="endDate" id="endDate" class="selectDate">
                                <c:if test="${!empty param.delFlag}">
                                    <input type="hidden" name="delFlag" value="${param.delFlag}">
                                </c:if>
                                
                                <button id="searchResBtn">조회</button>
                            </div>
                        </form>
                    </div>

                    <!-- 클래스 추가 -->
                    <c:if test="${empty param.delFlag}">
                        <c:set var="showAll" value="class='selected'"/>
                    </c:if>
                    <c:if test="${param.delFlag eq 'N'}">
                        <c:set var="showN" value="class='selected'"/>
                    </c:if>
                    <c:if test="${param.delFlag eq 'Y'}">
                        <c:set var="showY" value="class='selected'"/>
                    </c:if>

                    <div class="selectReserveState">
                        <span ${showAll}><a href="reservationList">전체</a></span>
                        <span ${showN}><a href="reservationList?delFlag=N">예약완료</a></span>
                        <span ${showY}><a href="reservationList?delFlag=Y">예약취소</a></span>
                    </div>
                </section>

                <section class="main-table">
                    <table id="reserveTable">
                        <thead>
                            <tr>
                                <th>예약 번호</th>
                                <th>분류</th>
                                <th>예매 내역</th>
                                <th>예약한 날짜</th>
                                <th>예매자</th>
                                <th>결제 금액</th>
                                <th>예약 상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            <c:choose>
                                <c:when test="${empty reservationList}">
                                    <tr>
                                        <td colspan="7" style="width : 1000px">조회된 예약내역이 없습니다.</td>
                                    </tr>
                                </c:when>
                                <c:otherwise>
                                    <c:forEach var="reserv" items="${reservationList}">
                                        <tr>
                                            <td>${reserv.reservationNo}</td>
                                            <c:if test="${reserv.reservType eq 'A'}">
                                                <td>숙소</td>
                                            </c:if>
                                            <c:if test="${reserv.reservType eq 'T'}">
                                                <td>기차</td>
                                            </c:if>
                                            <c:if test="${reserv.reservType eq 'B'}">
                                                <td>버스</td>
                                            </c:if>

                                            <td title='${reserv.reservationName}-${reserv.reservationStartDate} ~ ${reserv.reservationEndDate}'></td>
                                            <td>${reserv.payTime}</td>
                                            <td>${reserv.userName}</td>
                                            <td>${reserv.price}</td>
                                            <td>
                                                <select class="resDelFl" onchange="cancelReservation(${reserv.reservationNo},'${reserv.reservUID}','${reserv.userName}','${reserv.reservationName}-${reserv.reservationStartDate} ~ ${reserv.reservationEndDate}',this)">
                                                    <option value="N" <c:if test="${reserv.reservationDelFl eq 'N'}" >selected="selected"</c:if>> 예약완료 </option>
                                                    <option value="Y" <c:if test="${reserv.reservationDelFl eq 'Y'}" >selected="selected"</c:if>>예약취소</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </c:forEach>
                                </c:otherwise>
                            </c:choose>

                        </tbody>
                    </table>
                </section>

            </section>
            
        
        </main>

    </div>


    <script src="/resources/js/admin/adminReservation.js"></script>
</body>
</html>