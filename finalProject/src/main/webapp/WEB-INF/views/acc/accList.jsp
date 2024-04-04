<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>숙소 목록</title>
<link rel="stylesheet" href="/resources/css/acc/accList.css">
<script src="https://kit.fontawesome.com/97cdc46e56.js"
	crossorigin="anonymous"></script>
<script type="text/javascript"
	src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
<script type="text/javascript"
	src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
<script type="text/javascript"
	src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
<link rel="stylesheet" type="text/css"
	href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
	
<style>

footer {
	bottom: 0;
	z-index: 30; <!-- 다른 div나 항목들에 비해 앞쪽으로 -->
}

</style>

	

</head>
<body>

    <jsp:include page="/WEB-INF/views/common/header.jsp" />

<%    
response.setHeader("Cache-Control","no-store");    
response.setHeader("Pragma","no-cache");    
response.setDateHeader("Expires",0);    
if (request.getProtocol().equals("HTTP/1.1"))  
        response.setHeader("Cache-Control", "no-cache");  
%>

	<main id="allMain">



		<section id="allContain">

			<form action="/acc/inputSearch" method="POST" id="searchFrm">
				<section class="mainCon1">

					<div class="mainCla1">
						<button class="mainOne fa-solid fa-bed"></button>
						<input type="text" name="where" class="where" placeholder="어디로 향하시나요?" id="where" autocomplete="off" value="${inputAcc.where}">
					</div>

					<div class="mainCla2">
						<button class="mainOne fa-regular fa-calendar"></button>
						<input type="text" name="dates" id="startDate" value="${inputAcc.startDate} - ${inputAcc.endDate}">
					</div>

					<div class="mainCla3">
						<button class="mainOne fa-regular fa-user" type="button"></button>
						<span class="where" id="totalPer">성인 ${inputAcc.adultNum}명 · 아동 ${inputAcc.childNum}명 · 객실 ${inputAcc.grNum}개</span>
					</div>

					<button class="mainBtn1" id="searchbtn">검색</button>

				</section>

				<section class="mainCon2">

					<div class="mainCla4">
						<div class="search-area">
							<ul id="accAutoSearch" class="close"></ul>
						</div>
					</div>

					<div class="mainCla5"></div>

					<div class="mainCla6" id="totalPerShow">
						<div class="mainCla7">
							<div class="mainDi2">
								<span class="adult">성인</span>
							</div>
							<div class="mainDi1">
								<button class="adultMinus" id="adultMinus" type="button">-</button>
								<input class="adultNum" id="adultNum" name="adultNum" value=${inputAcc.adultNum}>
								<button class="adultPlus" id="adultPlus" type="button">+</button>
							</div>
						</div>

						<div class="mainCla8">
							<div>
								<span>어린이</span>
							</div>
							<div class="mainDi1">
								<button class="childMinus" id="childMinus" type="button">-</button>
								<input class="childNum" id="childNum" name="childNum" value=${inputAcc.childNum}>
								<button class="childPlus" id="childPlus" type="button">+</button>
							</div>
						</div>

						<div class="mainCla9">
							<div>
								<span>객실</span>
							</div>
							<div class="mainDi1">
								<button class="grMinus" id="grMinus" type="button">-</button>
								<input class="grNum" id="grNum" name="grNum" value=${inputAcc.grNum}>
								<button class="grPlus" id="grPlus" type="button">+</button>
							</div>
						</div>
						<div class="mainCla10">
							<button class="grSub" id="grSub" type="button">완료</button>
						</div>
					</div>

				</section>
			</form>

			<section class="con2">

				<div class="con3">
					<div class="cla4">
						<img src="/resources/images/acc/worldmap.png" id="world">
						<button id="worldBtn">
							<a href="map" id="mapChange">지도에서 보기</a>
						</button>
					</div>

					<div class="cla5">
						<span id="searchLo">${inputAcc.where}</span><br> <span id="searchAcc">검색된 숙소 : ${search.selectListCount}개</span>
					</div>

					<div class="cla6">
						<div class="cla7">
							<a id="filter"></a>
						</div>
					</div>

					<div class="cla8">
						<div class="di1">
							<div class="cla9">
								<a class="filterOp" href="highPrice">요금(높은 순)</a>
							</div>
							<div class="cla9">
								<a class="filterOp" href="lowPrice">요금(낮은 순)</a>
							</div>
							<div class="cla9">
								<a class="filterOp" href="highGrade">평점(높은 순)</a>
							</div>
							<div class="cla9">
								<a class="filterOp" href="lowGrade">평점(낮은 순)</a>
							</div>
						</div>
					</div>
				</div>


				
				<c:if test="${!empty search.searchList && !empty search.accGrade}">
					<div class="con4">
						<c:forEach var="i" begin="${start}" end="${fn:length(search.searchList) -1}">
							<form id="reservationForm_${i}" action="/acc/reservation" method="post">
								<c:if test="${search.accGrade[i].roomPrice == 0 || empty search.accGrade[i].roomPrice}">
									<div class="con5" style="background-color: gray;">
								</c:if>
								<c:if test="${search.accGrade[i].roomPrice != 0 && !empty search.accGrade[i].roomPrice}">
									<div class="con5">
								</c:if>
									<div class="cla10">
										<img src="${search.searchList[i].thumbnail}" id="cap2" name="thumbnail">
									</div>
									<div class="cla11">
										<div class="cla12">
											<span>${search.searchList[i].accName}</span> <input type="hidden" name="accName" value="${search.searchList[i].accName}">
										</div>

										<c:set var="accAddr" value="${search.searchList[i].accAddr}" />
										<c:set var="parts" value="${fn:split(accAddr, '^^^')}" />
										<c:set var="changeAddr" value="${parts[1]} ${parts[2]} (${parts[0]})" />

										<div class="cla13">
											<span>주소 : ${changeAddr}</span> <input type="hidden" name="accAddr" value="${search.searchList[i].accAddr}">
										</div>
										<div class="cla14">
											<c:if test="${empty search.searchList[i].accTel}">
												<span>번호 : 미 입력</span>
											</c:if>
											<c:if test="${!empty search.searchList[i].accTel}">
												<span>번호 : ${search.searchList[i].accTel}</span>
											</c:if>
											<input type="hidden" name="accTel" value="${search.searchList[i].accTel}">
										</div>
										<c:if test="${search.accGrade[i].roomPrice != 0 && !empty search.accGrade[i].roomPrice}">
											<div class="cla15">
												<span>가격 : ${search.accGrade[i].roomPrice}</span> <input type="hidden" name="roomPrice" id="roomPrice" value="${search.accGrade[i].roomPrice}">
											</div>
										</c:if>
										<c:if test="${search.accGrade[i].roomPrice == 0 || empty search.accGrade[i].roomPrice}">
											<div class="cla15">
												<span> 매진 </span> <input type="hidden" name="roomPrice" id="roomPrice" value="${search.accGrade[i].roomPrice}">
											</div>
										</c:if>
									</div>
									<div class="cla16">
										<div class="cla17">
											<span class="grade"> <c:choose>
													<c:when test="${search.searchList[i].rate == 0 && search.searchList[i].reviewCount == 0}">미등록</c:when>
													<c:when test="${search.searchList[i].rate >= 9}">추천</c:when>
													<c:when test="${search.searchList[i].rate >= 7}">우수함</c:when>
													<c:when test="${search.searchList[i].rate >= 5}">평범함</c:when>
													<c:otherwise>비추천</c:otherwise>
												</c:choose>
											</span>
											<div class="squa">
												${search.searchList[i].rate} <input type="hidden" name="rate" value="${search.searchList[i].rate}">
											</div>
										</div>
										<div class="cla18">
											<div class="wishList">
												<c:if test="${empty search.searchList[i].wishCheck}">
													<i class="fa-regular fa-heart" id="wishList" class="wishCheck" data-value="${search.searchList[i].accNo}" data-check="${search.searchList[i].wishCheck}"></i>
												</c:if>

												<%-- 좋아요 누른적이 있을 때 --%>
												<c:if test="${!empty search.searchList[i].wishCheck}">
													<i class="fa-solid fa-heart" id="wishList" class="wishCheck" data-value="${search.searchList[i].accNo}" data-check="${search.searchList[i].wishCheck}"></i>
												</c:if>
											</div>
											<input type="hidden" name="accNo" value="${search.searchList[i].accNo}">
										</div>
										<div class="cla19">
											<button class="rev" type="submit">예약 하기</button>
										</div>
									</div>
								</div>
							</form>
						</c:forEach>
						<div class="cla20">
							<button class="mor">검색 결과 더 보기</button>
						</div>
					</div>
				</c:if>
				
				<c:if test="${empty search.searchList && empty search.accGrade}">
					<div class="con5">
						<div class="faultData">
							숙소 정보를 검색해주세요.
						</div>
					</div>
				</c:if>
				
				
				
			</div>

			</section>

		</section>
	</main>
	
					<c:if test="${empty loginUser || loginUser.userNo == 0}">
						<input type="hidden" name="userNo" id="userNo" value=0>
					</c:if>
					<c:if test="${!empty loginUser && loginUser.userNo != 0}">
						<input type="hidden" name="userNo" id="userNo" value="${loginUser.userNo}">
					</c:if>

	<jsp:include page="/WEB-INF/views/common/footer.jsp" />

	<script>
		const startDate = "${inputAcc.startDate}";
		const endDate = "${inputAcc.endDate}";
		const inputName = "${inputAcc.where}";
		const inputAdultNum = "${inputAcc.adultNum}";
		const inputChildNum = "${inputAcc.childNum}";
		const inputGrNum = "${inputAcc.grNum}";	 
		
	</script>
	



	<script src="/resources/js/acc/accList.js"></script>





</body>

</html>