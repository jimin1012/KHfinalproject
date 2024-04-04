<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>사업장 정보</title>

                <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/ownerPage/owner-menu.css">

                <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/ownerPage/owner-info.css">

                <script src="https://code.jquery.com/jquery-3.7.1.min.js"
                    integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
            </head>
            <c:set var="owner" value="${sessionScope.owner}" />




            <body>
                <!-- header 연결 -->
                <jsp:include page="/WEB-INF/views/common/header.jsp" />

                <form action="info" method="POST">

                    <main>

                        <div class="page-container">

                            <jsp:include page="/WEB-INF/views/ownerPage/owner-menu.jsp" />

                            <div class="content-container">

                                <section class="business-section">

                                    <div class="business-div">
                                        <div class="owner-name">
                                            <label>대표자명</label>
                                            <span name="owner-name">${owner.userName}</span>
                                        </div>
                                        <hr>
                                        <div class="business-number">
                                            <label>사업자번호</label>
                                            <span name="business-number">${owner.bossNo}</span>
                                        </div>
                                        <hr>
                                        <div class="business-account">
                                            <label>정산계좌</label>
                                            <span id="accountDisplay">${owner.bossAccount}</span>
                                            <input type="text" name="business-account" class="business-account-input"
                                                id="accountInput" maxlength="14" placeholder="계좌번호를 입력하세요"
                                                value="${owner.bossAccount}" />
                                        </div>
                                        <hr>
                                        <div class="change-account-area">
                                            <button type="button" onclick="toggleAccountInput()"
                                                id="get-account-input">정산계좌
                                                변경</button>
                                            <button type="button" onclick="toggleAccountInput()" id="change-account">변경
                                                내역
                                                제출</button>
                                        </div>

                                    </div>

                                </section>


                                <section class="accInfo-section">

                                    <div class="acc-info-div">
                                        <div class="acc-name">
                                            <label>상호</label>
                                            <span name="acc-name" maxlength="20">${owner.accName}</span>
                                        </div>
                                        <hr>
                                        <div class="open-date">

                                            <label>개업 년 월 일</label>
                                            <span name="open-date" maxlength="20">${owner.openDate}</span>
                                        </div>
                                        <hr>
                                        <div class="acc-tel">

                                            <label>숙소 전화번호</label>
                                            <input type="text" name="accTel" maxlength="11" placeholder="'-'없이 번호입력"
                                                value="${owner.accTel}" id="acc-tel" />

                                        </div>
                                        <hr>

                                        <c:if test="${owner.accStFl == Y}">

                                        </c:if>
                                        <div class="acc-state">
                                            <label>숙소 영업 상태</label>

                                            <select name="accStFl" id="acc-state">
                                                <option id="nowSt" selected value="${owner.accStFl}">( 현재상태 :
                                                    ${owner.accStFl} )
                                                </option>
                                                <option value="Y">Y(영업중)</option>
                                                <option value="N">N(휴업중)</option>
                                                <option value="C">C(폐업)</option>
                                            </select>
                                        </div>

                                        <hr>
                                        <div class="acc-type">

                                            <label>숙박업 형태</label>
                                            <span name="acc-type" maxlength="20">${owner.accCategory}</span>

                                        </div>
                                        <hr>
                                        <div class="acc-addr">
                                            <label> 숙소 주소</label>
                                            <button type="button" onclick="sample6_execDaumPostcode()">검색</button>
                                        </div>

                                        <c:set var="addr" value="${fn:split(owner.accAddr, '^^^')}" />

                                        <div class="info-address">
                                            <input type="text" name="Address" placeholder="우편번호" value="${addr[0]}"
                                                value="${addr[0]}" id="sample6_postcode">
                                        </div>

                                        <div class="info-address">
                                            <input type="text" name="Address" placeholder="도로명/지번 주소" value="${addr[1]}"
                                                value="${addr[1]}" id="sample6_address">
                                        </div>

                                        <div class="info-address">
                                            <input type="text" name="Address" placeholder="상세 주소를 입력하세요."
                                                value="${addr[2]}" id="sample6_detailAddress">
                                        </div>

                                        <div class="info-change-area">
                                            <button type="submit">정보 수정하기</button>
                                        </div>

                                    </div>

                                </section>


                            </div>

                        </div>

                    </main>
                </form>




                <!-- 다음 주소 api 추가 -->
                <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
                <script>
                    function sample6_execDaumPostcode() {
                        new daum.Postcode({
                            oncomplete: function (data) {
                                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                                var addr = ''; // 주소 변수

                                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                                    addr = data.roadAddress;
                                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                                    addr = data.jibunAddress;
                                }

                                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                                document.getElementById('sample6_postcode').value = data.zonecode;
                                document.getElementById("sample6_address").value = addr;
                                // 커서를 상세주소 필드로 이동한다.
                                document.getElementById("sample6_detailAddress").focus();
                            },

                            /* 주소 AIP css */
                            theme: {
                                //bgColor: "", //바탕 배경색
                                searchBgColor: "#455ba8", //검색창 배경색
                                //contentBgColor: "", //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
                                //pageBgColor: "", //페이지 배경색
                                //textColor: "", //기본 글자색
                                queryTextColor: "#FFFFFF" //검색창 글자색
                                //postcodeTextColor: "", //우편번호 글자색
                                //emphTextColor: "", //강조 글자색
                                //outlineColor: "", //테두리
                            }
                        }).open();
                    }
                </script>

                <script>
                    // 문서가 완전히 로드된 후 실행
                    document.addEventListener('DOMContentLoaded', function () {
                        // acc-state 요소를 가져옵니다.
                        var selectElement = document.getElementById('acc-state');

                        // 현재상태가 R인지 확인합니다.
                        if (selectElement.value === 'R') {
                            // select 요소를 비활성화합니다.
                            selectElement.disabled = true;
                        }
                    });
                </script>

                <script src="${pageContext.request.contextPath}/resources/js/ownerPage/owner-info.js"></script>


                <!-- footer 연결 -->
                <jsp:include page="/WEB-INF/views/common/footer.jsp" />
            </body>


            </html>