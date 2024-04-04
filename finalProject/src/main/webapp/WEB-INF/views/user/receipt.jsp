<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:if test="${reservation.reservType == 'A'}">
    <c:set var="reservType" value="숙소"/>
</c:if>
<c:if test="${reservation.reservType == 'B'}">
    <c:set var="reservType" value="버스"/>
</c:if>
<c:if test="${reservation.reservType == 'T'}">
    <c:set var="reservType" value="기차"/>
</c:if>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>영수증</title>
<link rel="stylesheet" href="/resources/css/user/receipt.css">
</head>
<body>
    <main>
        <div id="mainWrap">
            <div id="receiptHeader">
                <div>NXSHXW</div>
                <div>- 예약내역</div>
            </div>
            <div id="userInfo">
                <div class="infoTitle">이용자 정보</div>
                <div class="infoCon">
                    <div>이름</div>
                    <div>${reservation.userName}</div>
                </div>
                <div class="infoCon">
                    <div>휴대폰번호</div>
                    <div>${reservation.userTel}</div>
                </div>
            </div>
            <div id="productInfo">
                <div class="infoTitle">상품 및 이용정보</div>
                <div class="infoCon">
                    <div>예약 ID</div>
                    <div>${reservation.reservationNo}</div>
                </div>
                <div class="infoCon">
                    <div>상품명</div>
                    <div>${reservation.reservationName}</div>
                </div>
                <div class="infoCon">
                    <div>이용날짜</div>
                    <div>${reservation.reservationStartDate} ~ ${reservation.reservationEndDate}</div>
                </div>
                <div class="infoCon">
                    <div>결제일시</div>
                    <div>${reservation.payTime}</div>
                </div>
                <div class="infoCon">
                    <div>결제금액</div>
                    <div>${reservation.price}원</div>
                </div>
                <div class="infoCon">
                    <div>종류</div>
                    <div>
                        ${reservType}
                    </div>
                </div>
            </div>
            <div id="btnWrap">
                <button id="myPageBtn">마이페이지</button>
                <button id="cancleBtn">결제취소</button>
            </div>
        </div>
    </main>
    <script>
        const reservUID = "${reservation.reservUID}";
        const reservationNo = "${reservation.reservationNo}";
    </script>
    <script src="/resources/js/user/receipt.js"></script>
</body>
</html>