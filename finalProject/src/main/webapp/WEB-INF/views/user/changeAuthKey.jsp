<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>회원전환</title>

    <link rel="stylesheet" href="/resources/css/user/signUp-style.css">

    <script   script src="https://kit.fontawesome.com/97cdc46e56.js" crossorigin="anonymous"></script>

    <script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.js"></script>
</head>
<body>
    <main>
        <section class="container">
    
            <section class="signUp-content">
    
                <h1 class="logo"><a href="/">NXSHXW</a></h1>
    
                <div class="title">
                    <p>사업자 회원전환</p>
                </div>
    
                <!-- 진행상황 -->
                <div class="progress"></div>
    
                <!-- 부제목 -->
                <div class="titleSub1">
                    <p>사업자 정보 입력<br><span>사업자 회원 전환에 필요한 개인정보를 입력해주세요.</span></p>
                </div>
    
                <form action="/changeAuthKey" method="POST" name="signUpFrm" id="signUpFrm">
                    <div class="personalInformation">
                
                        <!-- [필수] 사업자 번호 -->
                        <div class="form-title">
                            <label for="bossNo">
                                <span><span class="required">[필수]</span> 사업자 번호</span>
                                <span class="signUp-message" id="bossNoMessage"></span>
                            </label>
                        </div>
                
                        <div class="signUp-input-area">
                            <span class="box int_bossNo">
                                <input type="text" name="bossNo" id="bossNo" class="int" value="${param.accName}"
                                    placeholder="사업자 번호 입력해주세요.(- 제외)" maxlength="10" autocomplete="off">
                            </span>
                        </div>

                        <!-- [필수] 사업장 이름 -->
                        <div class="form-title">
                            <label for="accName">
                                <span><span class="required">[필수]</span> 사업장 이름</span>
                                <span class="signUp-message" id="accNameMessage"></span>
                            </label>
                        </div>
                
                        <div class="signUp-input-area">
                            <span class="box int_accName">
                                <input type="text" name="accName" id="accName" class="int" value="${param.accName}"
                                    placeholder="사업장 이름을 입력해주세요." maxlength="20" autocomplete="off">
                            </span>
                        </div>
                
                        <!-- [필수] 개업일 -->
                        <div class="form-title">
                            <label for="openDate">
                                <span><span class="required">[필수]</span> 개업일</span>
                                <span class="signUp-message" id="openDateMessage"></span>
                            </label>
                        </div>
                
                        <div class="signUp-input-area">
                            <span class="box int_openDate">
                                <input type="test" name="openDate" id="openDate" class="int" value="${param.openDates}"
                                    placeholder="개업일을 입력해주세요." maxlength="20">
                            </span>
                        </div>
                
                        <!-- [필수] 사업장 번호 -->
                        <div class="form-title">
                            <label for="accrTel">
                                <span><span class="required">[필수]</span> 사업장 번호</span>
                                <span class="signUp-message" id="accTelMessage"></span>
                            </label>
                        </div>

                        <div class="signUp-input-area tel">
                            <span class="box int_accTel">
                                <input type="text" name="accTel" id="accTel" class="int" value="${param.userTel}" placeholder="전화번호를 입력해주세요."
                                    maxlength="20" autocomplete="off">
                            </span>
                        </div>
                
                        <!-- [선택] 사업장 주소 -->
                        <div class="form-title">
                            <label for="accAddress">
                                <span><span class="required">[필수]</span> 사업장 주소</span>
                            </label>
                        </div>
                
                        <div class="signUp-input-area addr">
                            <span class="box accAddress">
                                <input type="text" name="accAddress" placeholder="우편번호" maxlength="6" id="sample6_postcode">
                                <button type="button" id="addressCheckBtn" onclick="sample6_execDaumPostcode()">검색</button>
                            </span>
                            <span class="box int_accAddress2">
                                <input type="text" name="accAddress" placeholder="도로명/지번 주소" id="sample6_address">
                            </span>
                            <span class="box int_accAddress3">
                                <input type="text" name="accAddress" placeholder="상세 주소" id="sample6_detailAddress">
                            </span>
                        </div>

                        <!-- [선택] 입금 계좌 -->
                        <div class="form-title">
                            <label for="bossAccount">
                                <span><span class="required">[선택]</span> 입금 계좌</span>
                                <span class="signUp-message" id="bossAccountMessage"></span>
                            </label>
                        </div>
                
                        <div class="signUp-input-area">
                            <span class="box int_bossAccount">
                                <input type="text" name="bossAccount" id="bossAccount" class="int"
                                    placeholder="입금 계좌를 입력해주세요." maxlength="20" autocomplete="off">
                            </span>
                        </div>
                
                        <div class="btn">
                            <a class="back-button" href="/changeAuthKeyAgree">뒤로가기</a>
                            <button type="submit" class="next-button">가입하기</button>
                        </div>
                    </div>
                </form>
    
            </section>
        </section>
    </main>
   
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <script>
        function sample6_execDaumPostcode() {
            new daum.Postcode({
                oncomplete: function(data) {
                    
                    var addr = ''; // 주소 변수

                    if (data.userSelectedType === 'R') {
                        addr = data.roadAddress;
                    } else { 
                        addr = data.jibunAddress;
                    }

                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    document.getElementById('sample6_postcode').value = data.zonecode;
                    document.getElementById("sample6_address").value = addr;
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

    <script src="/resources/js/user/changeAuthKey.js"></script>



</body>
</html>