<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
		<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>



			<!DOCTYPE html>
			<html lang="ko">

			<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>숙소 상세보기</title>
				<link rel="stylesheet" href="/resources/css/acc/accDetail.css">
				<script src="https://kit.fontawesome.com/97cdc46e56.js" crossorigin="anonymous"></script>
				<script src="https://cdn.iamport.kr/v1/iamport.js"></script>
				<!-- iamport.payment.js -->
				<script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"></script>
				<script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
				<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
				<script type="text/javascript"
					src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
				<link rel="stylesheet" type="text/css"
					href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />

				<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">

				<style>
					.swiper-container {
						width: 100%;
						/* 스와이퍼 컨테이너의 너비를 화면에 맞게 조정합니다. */
						height: 300px;
						/* 높이를 조정합니다. */
						position: relative;
						overflow: hidden;
					}

					.swiper-wrapper {
						width: 100%;
						/* 스와이퍼 슬라이드의 너비를 화면에 맞게 조정합니다. */
						height: 300px;

					}

					.swiper-slide {
						width: 100%;
						/* 스와이퍼 슬라이드의 너비를 화면에 맞게 조정합니다. */
						text-align: center;
						font-size: 18px;
						background: #fff;
						justify-content: center;
						align-items: center;
					}


					.rating-item {
						width: 250px;
						display: flex;
						margin-left: 65px;
						margin-top: 15px;
						justify-content: space-between;
						/* 요소들 간의 간격을 동일하게 분배합니다. */
						margin-bottom: 10px;
						/* 기본 간격을 줄입니다. */
					}

					/* 각 요소들의 마진을 조절하여 간격을 일정하게 유지합니다. */
					.rating-item span {
						margin: 0 5px;
						/* 좌우 간격을 조절합니다. */
					}

					/* 모달 스타일 */
					.modal1 {
						display: none;
						/* 초기에는 보이지 않도록 설정 */
						position: fixed;
						/* 화면에 고정 */
						z-index: 2002;
						/* 다른 요소보다 위에 나타나도록 설정 */
						left: 50%;
						/* 가로 중앙 정렬 */
						top: 50%;
						/* 세로 중앙 정렬 */
						transform: translate(-50%, -50%);
						/* 가운데 정렬 */
						width: 80%;
						/* 모달의 너비 */
						max-width: 430px;
						/* 최대 너비 */
						max-height: 500px;
						/* 최대 너비 */
						border-radius: 5px;
						/* 테두리 둥글게 */
						background-color: #fefefe;
						/* 모달 내용 배경색 */
						padding: 20px;
					}

					.userName {
						margin-left: 5px;
						font-size: 20px;
						font-weight: bold;
					}

					/* 모달 콘텐츠 스타일 */
					.modal-content {
						background-color: #fefefe;
						padding: 20px;
						width: 90%;
					}

					/* 모달 외부 배경 스타일 */
					.modal-overlay1 {
						position: fixed;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background-color: rgba(0, 0, 0, 0.5);
						/* 회색 배경 */
						z-index: 999;
						/* 다른 요소 위에 모달을 표시하기 위한 우선 순위 */
						display: none;
						/* 초기에는 화면에 표시하지 않음 */
					}


					/* 모달 닫기 버튼 스타일 */
					.closa {
						position: absolute;
						/* 절대 위치 */
						top: 10px;
						/* 위에서 10px로 위치 */
						right: 10px;
						/* 오른쪽에서 10px로 위치 */
						cursor: pointer;
						/* 커서를 포인터로 변경하여 클릭 가능하도록 설정 */
					}

					.closa:hover,
					.closa:focus {
						color: black;
						text-decoration: none;
						cursor: pointer;
					}

					/* 모달을 제외한 부분을 회색으로 바꿈 */
					.modal-open1 .modal-overlay1 {
						display: block;
					}








					.modal2 {
						display: none;
						/* 기본적으로 모달은 숨김 처리 */
						position: fixed;
						z-index: 1002;
						width: 50%;
						height: 50%;
						transform: translate(-50%, -50%);
						/* 가운데 정렬 */
						max-width: 630px;
						/* 최대 너비 */
						max-height: 630px;
						overflow: auto;
						left: 50%;
						/* 가로 중앙 정렬 */
						top: 50%;
						/* 세로 중앙 정렬 */
					}

					/* 모달 내용 */
					.modal-content2 {
						position: relative;
						background-color: #fefefe;
						margin: 10% auto;
						padding: 20px;
						border: 1px solid #888;
						width: 80%;
						max-width: 600px;
					}



					/* 모달 닫기 버튼 스타일 */
					.closa2 {
						position: absolute;
						/* 절대 위치 */
						top: 10px;
						/* 위에서 10px로 위치 */
						right: 10px;
						/* 오른쪽에서 10px로 위치 */
						cursor: pointer;
						/* 커서를 포인터로 변경하여 클릭 가능하도록 설정 */
					}

					.closa2:hover,
					.closa2:focus {
						color: black;
						text-decoration: none;
						cursor: pointer;
					}


					.swiper-container2 {
						width: 100%;
						height: auto;
						overflow: hidden;
					}

					.swiper-wrapper2 {
						position: relative;
						width: 100%;
						height: 100%;
						z-index: 1;
						display: flex;
						transition-property: transform;
						box-sizing: content-box;
					}

					.swiper-slide2 {
						flex: 0 0 auto;
						width: 100%;
						height: auto;
					}

					/* 스와이퍼 네비게이션 버튼 */
					.swiper-button-prev2,
					.swiper-button-next2 {
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
						z-index: 10;
						cursor: pointer;
					}

					/* 이전 버튼 */
					.swiper-button-prev2 {
						left: 10px;
					}

					/* 다음 버튼 */
					.swiper-button-next2 {
						right: 10px;
					}

					.swiper-slide2 img {
						max-width: 80%;
						max-height: 100%;
						margin-top: 13px;
					}



					.modal3 {
						display: none;
						/* 초기에는 보이지 않도록 설정 */
						position: fixed;
						/* 화면에 고정 */
						z-index: 2002;
						/* 다른 요소보다 위에 나타나도록 설정 */
						left: 50%;
						/* 가로 중앙 정렬 */
						top: 50%;
						/* 세로 중앙 정렬 */
						transform: translate(-50%, -50%);
						/* 가운데 정렬 */
						width: 80%;
						/* 모달의 너비 */
						max-width: 430px;
						/* 최대 너비 */
						max-height: 500px;
						/* 최대 너비 */
						border-radius: 5px;
						/* 테두리 둥글게 */
						background-color: #fefefe;
						/* 모달 내용 배경색 */
						padding: 20px;
					}

					/* 모달 내용 */
					.modal-content3 {
						background-color: #fefefe;
						padding: 20px;
						width: 90%;
					}

					.rateDi {
						margin-left: 5px;
						margin-top: 5px;
					}

					.buttonDi {
						display: flex;
						align-items: center;
						justify-content: right;
						margin-top: 12px;
					}

					#reviewCan,
					#reviewSub {
						background-color: white;
						border: 1px solid gray;
						height: 26px;
						text-align: center;
						margin-right: 7px;
						border-radius: 5px;
						cursor: pointer;
					}

					.openModalBtn,
					.reviewDeleteBtn {
						background-color: white;
						border: 1px solid gray;
						height: 26px;
						text-align: center;
						margin-right: 1px;
						border-radius: 5px;
						cursor: pointer;
					}

					#reviewCan:hover {
						border: 2px solid black;
						solid black;
					}

					#reviewSub:hover {
						border: 2px solid black;
						solid black;
					}




					input[type=number]::-webkit-inner-spin-button,
					input[type=number]::-webkit-outer-spin-button {
						height: 20px;
						width: 20px;
						margin: 0;
						opacity: 1;
					}

					input[type=number] {
						-moz-appearance: textfield;
						width: 30px;
						height: 20px;
						margin-top: 10px;
						margin-right: 18px;
						padding-left: 10px;
					}
				</style>

			</head>

			<body>

				<% response.setHeader("Cache-Control","no-store"); response.setHeader("Pragma","no-cache");
					response.setDateHeader("Expires",0); if (request.getProtocol().equals("HTTP/1.1"))
					response.setHeader("Cache-Control", "no-cache" ); %>



					<jsp:include page="/WEB-INF/views/common/header.jsp" />

					<main id="allMain">

						<section class="allContain">
							<section class="DetailCon1">

								<div class="DetailDi1">
									<form action="/acc/inputSearch" method="POST" id="searchFrm">
										<div class="DetailDi2">

											<div class="claNm">
												<span class="searchNm">여행지/숙소 이름</span>
											</div>
											<div class="mainCla1">
												<button class="mainOne fa-solid fa-bed"></button>
												<input type="text" name="where" class="where" placeholder="어디로 향하시나요?"
													id="where" autocomplete="off" value="${inputAcc.where}">
											</div>
											<div class="mainCla4">
												<div class="search-area">
													<ul id="accAutoSearch" class="close"></ul>
												</div>
											</div>

											<div class="DetailClaNm">
												<span class="searchNm">체크인 날짜 - 체크아웃 날짜</span>
											</div>

											<div class="DetailCla2">
												<button class="mainOne fa-regular fa-calendar"></button>
												<input type="text" name="dates" id="startDate">
											</div>


											<div class="DetailClaNm">
												<span class="searchNm">인원</span>
											</div>
											<div class="mainCla5">
												<button class="mainOne fa-regular fa-user" type="button"></button>
												<span class="where" id="totalPer">성인 ${inputAcc.adultNum}명 · 아동
													${inputAcc.childNum}명 · 객실 ${inputAcc.grNum}개</span>
											</div>

											<div class="mainCla6" id="totalPerShow">
												<div class="mainCla7">
													<div class="mainDi2">
														<span class="adult">성인</span>
													</div>
													<div class="mainDi1">
														<button class="adultMinus" id="adultMinus"
															type="button">-</button>
														<input class="adultNum" id="adultNum" name="adultNum"
															value=${inputAcc.adultNum}>
														<button class="adultPlus" id="adultPlus"
															type="button">+</button>
													</div>
												</div>

												<div class="mainCla8">
													<div>
														<span>어린이</span>
													</div>
													<div class="mainDi1">
														<button class="childMinus" id="childMinus"
															type="button">-</button>
														<input class="childNum" id="childNum" name="childNum"
															value=${inputAcc.childNum}>
														<button class="childPlus" id="childPlus"
															type="button">+</button>
													</div>
												</div>

												<div class="mainCla9">
													<div>
														<span>객실</span>
													</div>
													<div class="mainDi1">
														<button class="grMinus" id="grMinus" type="button">-</button>
														<input class="grNum" id="grNum" name="grNum"
															value=${inputAcc.grNum}>
														<button class="grPlus" id="grPlus" type="button">+</button>
													</div>
												</div>
												<div class="mainCla10">
													<button class="grSub" id="grSub" type="button">완료</button>
												</div>
											</div>


											<button class="mainBtn1" id="searchbtn">검색</button>

										</div>
									</form>


									<div class="DetailDi3">
										<img src="/resources/images/acc/worldmap.png" id="world">
										<button id="worldBtn">
											<a href="map?accName=${selectAcc.accName}" id="mapChange">지도에서 보기</a>
										</button>
									</div>

								</div>

								<div class="DetailDi4">

									<div class="DetailCla5">

										<div class="DetailCla7">
											<div class="DetailCla8">

												
												<c:set var="accAddr" value="${selectAcc.accAddr}" />
												<c:set var="parts" value="${fn:split(accAddr, '^^^')}" />

												<c:set var="changeAddr" value="${parts[1]} ${parts[2]} (${parts[0]})" />

												<span class="add1">${selectAcc.accName}</span><span class="add2">주소 :
													${changeAddr}</span>
												<span class="tel">
													<c:if test="${!empty selectAcc.accTel}">
														번호 : ${selectAcc.accTel}
													</c:if>
													<c:if test="${empty selectAcc.accTel}">
														번호 : 미등록
													</c:if>

												</span>
											</div>
											<div class="DetailCla9">
												<span class="grade">
													<c:choose>
														<c:when
															test="${selectAcc.rate == 0 && empty detail.detailReivew}">
															미등록</c:when>
														<c:when test="${selectAcc.rate >= 9}">추천</c:when>
														<c:when test="${selectAcc.rate >= 7}">우수함</c:when>
														<c:when test="${selectAcc.rate >= 5}">평범함</c:when>
														<c:otherwise>비추천</c:otherwise>
													</c:choose>

												</span>
												<div class="squa">${selectAcc.rate}</div>
											</div>
										</div>

										<div class="DetailCla10">

											<div class="DetailCla11">
												<img src="${detail.detailImage[0].accImagePath}" class="mainc">
											</div>

											<div class="DetailCla12">

												<div class="DetailCla13">

													<div class="DetailCla15">
														<c:if test="${empty detail.detailImage[1].accImagePath}">
															<img src="/resources/images/acc/logo.jpg" class="cap">
														</c:if>
														<c:if test="${!empty detail.detailImage[1].accImagePath}">
															<img src="${detail.detailImage[1].accImagePath}"
																class="cap">
														</c:if>
													</div>

													<div class="DetailCla16">
														<c:if test="${empty detail.detailImage[2].accImagePath}">
															<img src="/resources/images/acc/logo.jpg" class="cap">
														</c:if>
														<c:if test="${!empty detail.detailImage[2].accImagePath}">
															<img src="${detail.detailImage[2].accImagePath}"
																class="cap">
														</c:if>
													</div>

												</div>

												<div class="DetailCla14">

													<div class="DetailCla17">
														<c:if test="${empty detail.detailImage[3].accImagePath}">
															<img src="/resources/images/acc/logo.jpg" class="cap">
														</c:if>
														<c:if test="${!empty detail.detailImage[3].accImagePath}">
															<img src="${detail.detailImage[3].accImagePath}"
																class="cap">
														</c:if>
													</div>

													<div class="DetailCla18">
														<div class="DetailDi6">
															<c:if test="${empty detail.detailImage[4].accImagePath}">
																<img src="/resources/images/acc/logo.jpg" class="cap">
															</c:if>
															<c:if test="${!empty detail.detailImage[4].accImagePath}">
																<img src="${detail.detailImage[4].accImagePath}"
																	class="cap">
															</c:if>
														</div>
														<div class="DetailDi7">
															<button class="morePic" id="morePic">
																더 보기<span
																	class="imageCount">+${fn:length(detail.detailImage)}</span>
															</button>
														</div>
													</div>

												</div>

											</div>

										</div>

									</div>

									<c:if test="${!empty detail.detailCode}">
										<div class="DetailCla6">

											<table>

												<tr id="rename">
													<th>객실 유형</th>
													<th>투숙객 수</th>
													<th>1박 요금</th>
													<th>수량 선택</th>
													<th>
														<select name="paymentMethod" id="paymentMethod">
															<option value=0 disabled selected>결제수단</option>
															<option value=1>카카오결제</option>
															<option value=2>토스페이</option>
															<option value=3>KG이니시스</option>
														</select>
													</th>
												</tr>



												<c:forEach var="i" begin="${start}"
													end="${fn:length(detail.detailCode) -1}">
													<tr>
														<td>${detail.detailCode[i].accType}</td>
														<td>${detail.detailCode[i].roomCapacity}명</td>
														<td>${detail.detailCode[i].roomPrice}원</td>
														<td>1</td>
														<td>
															<button id="res" class="res">예약 하기</button>
														</td>
														<input type="hidden" id="accNo" name="accNo"
															value="${selectAcc.accNo}" />
														<input type="hidden" id="accCode" name="accCode"
															value="${detail.detailCode[i].accCode}" />
													</tr>
												</c:forEach>



											</table>

										</div>
									</c:if>

									<c:if test="${empty detail.detailCode}">
										<div class="DetailCla6"
											style="border: 4px solid black; height: 250px; border-radius:10px;">
											<span class="allSell">매진 됐습니다.</span>
										</div>
									</c:if>

								</div>

							</section>

							<section class="DetailDi5">

								<c:if test="${!empty detail.detailRate[0]}">
									<div class="DetailCla19">

										<div class="DetailCla21">
											<span class="avg">평점</span>
										</div>

										<div class="DetailCla22">
											<div>
												<span>직원 친절도</span>
											</div>
											<div>
												<span class="kindGr">${detail.detailRate[0].avgKindRate}</span>
											</div>
										</div>

										<div class="DetailCla23">
											<input type="range" value="${detail.detailRate[0].avgKindRate}" max="10"
												class="kind" id="kind">
										</div>

										<div class="DetailCla24">
											<div>
												<span>시설</span>
											</div>
											<div>
												<span class="hmGr">${detail.detailRate[0].avgFacRate}</span>
											</div>
										</div>

										<div class="DetailCla25">
											<input type="range" value="${detail.detailRate[0].avgFacRate}" max="10"
												class="hm" id="hm">
										</div>

										<div class="DetailCla26">
											<div>
												<span>청결도</span>
											</div>
											<div>
												<span class="cleanGr">${detail.detailRate[0].avgCleanRate}</span>
											</div>
										</div>

										<div class="DetailCla27">
											<input type="range" value="${detail.detailRate[0].avgCleanRate}" max="10"
												class="clean" id="clean">
										</div>

									</div>
								</c:if>

								<c:if test="${!empty detail.detailReivew}">
									<div class="DetailCla20">

										<div class="DetailCla28">
											<span class="review">리뷰</span>
										</div>

										<div class="DetailCla29">


											<div class="swiper-container">
												<div class="swiper-button-prev"></div>
												<div class="swiper-wrapper">
													<c:forEach var="x" begin="${start}"
														end="${fn:length(detail.detailReivew)-1}" varStatus="loop">
														<div class="swiper-slide">
															<div class="DetailClaM31">
																<span class="userNm"
																	id="userNm">${detail.detailReivew[x].userNickName}</span>
															</div>
															<div class="DetailClaM32">
																<textarea
																	class="tex">${detail.detailReivew[x].accReviewContent}</textarea>
															</div>
															<div class="DetailClaM33">
																<a href="#" class="more"
																	data-reviewno="${detail.detailReivew[x].accReviewNo}">더보기</a>

																<c:if
																	test="${loginUser.userNo == detail.detailReivew[x].userNo}">
																	<button class="openModalBtn"
																		data-modal-id="myModal3"
																		data-review-content="${detail.detailReivew[x].accReviewContent}"
																		data-acc-clean-rate="${detail.selectAllRate[x].accCleanRate}"
																		data-acc-fac-rate="${detail.selectAllRate[x].accFacRate}"
																		data-acc-kind-rate="${detail.selectAllRate[x].accKindRate}"
																		data-review="${detail.detailReivew[x].accReviewNo}">수정</button>
																	<button class="reviewDeleteBtn">
																		<a href="/review/delete?accReviewNo=${detail.detailReivew[x].accReviewNo}"
																			class="revDeleteBtn">삭제</a>
																	</button>
																</c:if>
															</div>

															<c:if
																test="${detail.detailReivew[x].accReviewNo == detail.selectAllRate[x].accReviewNo}">
																<input type="hidden" id="accCleanRate"
																	name="accCleanRate"
																	value="${detail.selectAllRate[x].accCleanRate}" />
																<input type="hidden" id="accFacRate" name="accFacRate"
																	value="${detail.selectAllRate[x].accFacRate}" />
																<input type="hidden" id="accKindRate" name="accKindRate"
																	value="${detail.selectAllRate[x].accKindRate}" />
															</c:if>


														</div>
													</c:forEach>
												</div>

												<div class="swiper-button-next"></div>
											</div>
										</div>
									</div>
								</c:if>
							</section>
						</section>

					</main>


					<jsp:include page="/WEB-INF/views/common/footer.jsp" />










					<div id="modal-background1" class="modal-overlay1"></div>


					<div id="myModal1" class="modal1">
						<div class="modal-content">
							<span class="closa">&times;</span>
							<div class="DetailCla31">
								<span id="modal-userName" class="userName"></span>
							</div>
							<div class="DetailCla32">
								<textarea id="modal-content1" class="tex"></textarea>
							</div>
							<div class="rating-item">
								<span class="kindGr"></span>
							</div>
							<div class="rating-item">
								<span class="cleanGr"></span>
							</div>
							<div class="rating-item">
								<span class="hmGr"></span>
							</div>
						</div>
					</div>



					<div id="myModal3" class="modal3">
						<form action="/review/accUpdate" method="POST" class="updateFrm">
							<div class="modal-content3">
								<div class="DetailCla31">
									<span class="userName"></span>
								</div>
								<div>
									<textarea class="modal-text" name="accReviewContent" rows="4" cols="50"
										maxlength="300"></textarea>
								</div>
								<div class="rateDi">
									시설 : <input type="number" min="0" max="10" name="accFacRate" id="accFacRate">
									청결도 : <input type="number" min="0" max="10" name="accCleanRate" id="accCleanRate">
									친절도 : <input type="number" min="0" max="10" name="accKindRate" id="accKindRate">
								</div>
								<div class="buttonDi">
									<button type="button" class="reviewCan" id="reviewCan">취소</button>
									<button type="submit" id="reviewSub">등록</button>
									<input type="hidden" name="accReviewNo" class="accReviewNo" />
								</div>
							</div>
						</form>
					</div>




					<div id="myModal2" class="modal2">
						<div class="modal-content2">
							<span class="closa2">&times;</span>
							<div class="swiper-container swiper-container2">
								<div class="swiper-wrapper">
									<!-- 반복문으로 이미지 슬라이드 생성 -->
									<c:forEach var="image" items="${detail.detailImage}">
										<div class="swiper-slide">
											<img src="${image.accImagePath}" class="mainc">
										</div>
									</c:forEach>
								</div>
								<!-- 스와이퍼 네비게이션 버튼 -->
								<div class="swiper-button-prev2 swiper-button-prev"></div>
								<div class="swiper-button-next2 swiper-button-next"></div>
							</div>
						</div>
					</div>


					<script>

						const startDate = "${inputAcc.startDate}";
						const endDate = "${inputAcc.endDate}";
						const avgKindRate = "${detail.detailRate[0].avgKindRate}";
						const avgFacRate = "${detail.detailRate[0].avgFacRate}";
						const avgCleanRate = "${detail.detailRate[0].avgCleanRate}";
						let accImagePathString = "${detail.detailImage}";
						const checkIn = "${detail.detailCode[0].roomCheckIn}";
						const checkOut = "${detail.detailCode[0].roomCheckOut}";



						//결제에 필요함
						const userNo = '${loginUser.userNo}';
						const userEmail = '${loginUser.userEmail}';
						const userName = '${loginUser.userName}';
						const userTel = '${loginUser.userTel}';
						const userAddress = '${loginUser.userAddress}';

						const accName = "${selectAcc.accName}";
					</script>

					<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
					<script src="/resources/js/acc/accDetail.js"></script>


			</body>

			</html>