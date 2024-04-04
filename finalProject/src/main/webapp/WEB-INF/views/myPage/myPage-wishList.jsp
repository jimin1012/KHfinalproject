<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>숙소 위시리스트</title>
    <link rel="stylesheet" href="/resources/css/myPage/myPage-style.css">
    <link rel="stylesheet" href="/resources/css/myPage/sideMenu-style.css">
	<link rel="stylesheet" href="/resources/css/acc/wishList.css">
    <script src="https://kit.fontawesome.com/97cdc46e56.js" crossorigin="anonymous"></script>
    
    <style>
    
    
 /* 스와이퍼 컨테이너의 스타일 */
.swiper-container {
    width: 90%;
    height: auto; /* 높이를 자동으로 조절하여 내용에 맞게 표시 */
    overflow: hidden;
    position: relative; /* 상대 위치 지정 */
}

/* 스와이퍼 슬라이드의 스타일 */
.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    width: 200px; /* 슬라이드의 고정 너비 */
    height: auto;
    margin-right: 15px;
}

/* 스와이퍼의 이전/다음 버튼 스타일 */
.swiper-button-prev {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute; /* 절대 위치 지정 */
    top: 45%; /* 상단 위치 중앙 정렬 */
    transform: translateY(-50%); /* 세로 정렬 */
    z-index: 10; /* 다른 요소 위에 나타나도록 설정 */
    border: none; /* 버튼의 테두리 제거 */
    background: none; /* 배경색 제거 */
}

.swiper-button-next {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute; /* 절대 위치 지정 */
    top: 45%; /* 상단 위치 중앙 정렬 */
    transform: translateY(-50%); /* 세로 정렬 */
    z-index: 10; /* 다른 요소 위에 나타나도록 설정 */
    border: none; /* 버튼의 테두리 제거 */
    background: none; /* 배경색 제거 */
}

/* 이전 버튼에 화살표 모양 추가 */
.swiper-button-prev::after {
    content: '';
    width: 25px;
    height: 25px;
    border-top: 3px solid black; 
    border-right: 3px solid black; 
    transform: rotate(-135deg); /* 회전 */
    position: absolute;
    transform-origin: center;
    margin-right: 15px;
    cursor: pointer;
}

/* 다음 버튼에 화살표 모양 추가 */
.swiper-button-next::after {
    content: '';
    width: 25px;
    height: 25px;
    border-top: 3px solid black; 
    border-right: 3px solid black; 
    transform: rotate(45deg); /* 회전 */
    position: absolute;
    transform-origin: center;
    margin-left: 15px;
    cursor: pointer;
}

.swiper-button-prev {
    left: 6px; /* 왼쪽에 위치 */
}

.swiper-button-next {
    right: 8px; /* 오른쪽에 위치 */
}

/* 스와이퍼 페이지네이션의 스타일 */
.swiper-pagination {
    position: absolute;
    right: 10px;
    bottom: 10px;
}

.swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    background: rgba(0, 0, 0, 0.5);
}

.swiper-pagination-bullet-active {
    background: rgba(0, 0, 0, 1);
}

/* 스와이퍼 wrapper의 스타일 */
.swiper-wrapper {
    display: flex;
    margin-left: 10px;
}

.wishSubm{
    cursor: pointer;
}


    </style>

</head>
<body>

    <!-- header -->
    <jsp:include page="/WEB-INF/views/common/header.jsp" />

	<main>

		<div class="myPage-content">

			<!-- 사이트 바 -->
			<jsp:include page="/WEB-INF/views/myPage/sideMenu.jsp" />


			<div class="myPage-main">

				<section class="wishCon1">

					<div class="wishCla1">위시리스트</div>

					<div class="wishCla2">
						<i class="wishOne fa-solid fa-heart"></i>
						저장된 숙소 <span id="wishNums">${fn:length(wishList)}개</span>
					</div>

				</section>


				<section class="wishCon2">
					<div class="swiper-container">
						<div class="swiper-button-prev"></div>
						<div class="swiper-wrapper">
							<%-- wishList를 순회하면서 숙소 정보를 생성 --%>
							<c:forEach var="wish" items="${wishList}">
								<div class="swiper-slide">
									<form action="/acc/wishListDetail" method="POST" id="wishDetailFrm">
										<div class="wishCla3">
											<img src="${wish.thumbnail}" id="wishCap">
											<div class="wishCla4">
												<span class="wishNm">${wish.accName}</span> <input type="hidden" class="accName" name="accName" id="accName" value="${wish.accName}">
											</div>
											<a class="wishDel" href="/acc/deleteWish?accNo=${wish.accNo}">X</a>
											<hr>
											<div class="wishCla5">
												<span class="wishAddr">주소 : ${wish.accAddr}</span> 
												<input type="hidden" class="accAddr" name="accAddr" id="accAddr" value="${wish.accAddr}">
												<input type="hidden" class="accNo" name="accNo" id="accNo" value="${wish.accNo}">
											</div>
											<hr>
											<div class="wishCla6">
												<div class="wishDi1">${wish.rate}</div>
												<div class="wishDi2">
													<span class="wishGrade">									
														<c:choose>
															<c:when test="${wish.rate == 0 && reviewCount == 0}">미등록</c:when>
															<c:when test="${wish.rate >= 9}">추천</c:when>
															<c:when test="${wish.rate >= 7}">우수함</c:when>
															<c:when test="${wish.rate >= 5}">평범함</c:when>
															<c:otherwise>비추천</c:otherwise>
														</c:choose> 
													</span>
												</div>
											</div>
											<hr>
											<div class="wishCla7">
												<div class="wishCla8">
													<span class="wishPrice">가격 : ${wish.price}</span>
												</div>
												<div class="wishCla9">
													<button class="wishSubm">숙소 보기</button>
												</div>
											</div>
										</div>
									</form>
								</div>
							</c:forEach>
						</div>
						<div class="swiper-button-next"></div>
					</div>
				</section>
			</div>
		
		


			<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
			<script>
		
		    var swiper = new Swiper('.swiper-container', {
		        slidesPerView: 4,
		        spaceBetween: 20,
		        pagination: {
		            el: '.swiper-pagination',
		            clickable: true,
		        },
		        navigation: {
		            nextEl: '.swiper-button-next',
		            prevEl: '.swiper-button-prev',
		        },
		        on: {
		            init: function () {
		                checkArrows(this);
		            },
		            resize: function () {
		                checkArrows(this);
		            },
		            slideChange: function () {
		                checkArrows(this);
		            }
		        },
		    });

		    function checkArrows(swiper) {
		        var nextButton = document.querySelector('.swiper-button-next');
		        var prevButton = document.querySelector('.swiper-button-prev');

		        if (swiper.slides.length <= swiper.params.slidesPerView) {
		            nextButton.style.display = 'none';
		            prevButton.style.display = 'none';
		        } else {
		            if (swiper.isBeginning) {
		                prevButton.style.opacity = '0.5'; 
		            } else {
		                prevButton.style.opacity = '1';
		            }
		            if (swiper.isEnd) {
		                nextButton.style.opacity = '0.5'; 
		            } else {
		                nextButton.style.opacity = '1';
		            }
		            nextButton.style.display = 'block';
		            prevButton.style.display = 'block';
		        }
		    }
			
		</script>


		</div>

	</main>

	<!-- footer 연결 -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />

    <script src="/resources/js/myPage/myPage.js"></script>

</body>
</html>