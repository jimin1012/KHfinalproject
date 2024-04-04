<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>약관동의</title>

<link rel="stylesheet" href="/resources/css/user/signUp-style.css">
</head>
<body>

    <main>
        <section class="container">

            <section class="signUp-content">
                
                <h1 class="logo"><a href="/">NXSHXW</a></h1>
    
                <!-- <div class="bossInsert">
                    <a href="">사업자 회원 가입 >></a>
                </div> -->
    
                <div class="title">
                    <p>사업자 회원 전환</p>
                </div>
    
                <!-- 진행상황 -->
                <div class="progress"></div>
    
                <!-- 부제목 -->
                <div class="titleSub">
                    <p>약관동의<br><span>사업자 회원 전환에 필요한 약관에 동의해주세요.</span></p>
                </div>
    
                <form action="/changeAuthKeyAgree" method="POST" class="signup-form">
    
                    <!-- 전체 동의 -->
                    <div class="form-group">
                        <div class="form-check-all">
                            <div class="checkbox-group">
                                <input type="checkbox" id="checkAll" name="checkAll">
                                <label for="checkAll" class="required">전체 동의</label>
                            </div>
                            <div class="form-detail">
                                <span>
                                    이용약관, 개인정보 수집 및 이용, 프로모션 정보 수신 동의 내용 약관에 모두 동의합니다.
                                </span>
                            </div>
                        </div>
                    </div>
    
                    <!-- [필수] 노쇼 이용약관 -->
                    <div class="form-group">
                        <div class="form-title">
                            <label for="privacyPolicy" class="required">
                                <span><span>[필수]</span> 노쇼 이용약관</span>
                            </label>
                        </div>
                        <div class="form-detail">
                            안녕노쇼 개인정보보호법에 따라 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" id="privacyPolicy" name="agreement" value="privacyPolicy" required>
                            <label for="privacyPolicy" class="required">동의합니다.</label>
                        </div>
                    </div>

                    <!-- [필수] 개인정보 수집 및 이용 -->
                    <div class="form-group">
                        <div class="form-title">
                            <label for="termsOfService" class="required">
                                <span><span>[필수]</span> 개인정보 수집 및 이용</span>
                            </label>
                        </div>
                        <div class="form-detail">
                            개인정보보호법에 따라 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" id="termsOfService" name="agreement" value="termsOfService" required>
                            <label for="termsOfService" class="required">동의합니다.</label>
                        </div>
                    </div>
    
                    <!-- [선택] 프로모션 정보 수신 동의 -->
                    <div class="form-group">
                        <div class="form-title">
                            <label for="allowPromotions" class="required">
                                <span><span>[선택]</span> 프로모션 정보 수신 동의</span>
                            </label>
                        </div>
                        <div class="form-detail">
                            제공하는 이벤트/혜택 등 다양한 정보를 휴대전화(앱 알림 또는 문자), 이메일로 받아보실 수 있습니다. 일부 서비스(별도 회원 체계로 운영하거나 가입 이후 추가 가입하여 이용하는 서비스 등)의 경우, 개별 서비스에 대해 별도 수신 동의를 받을 수 있으며, 이때에도 수신 동의에 대해 별도로 안내하고 동의를 받습니다.
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" id="allowPromotions" name="agreement" value="allowPromotions" required>
                            <label for="allowPromotions" class="required">동의합니다.</label>
                        </div>
                    </div>
                  
                    <div class="btn">
                        <button class="back-button" onclick="history.back()">뒤로</button>
                        <button type="submit" class="next-button" id="result" onclick="location.href='/changeAuthKey'" disabled>다음</button>
                    </div>
                </form>
            </section>
        </section>
    </main>

    <script src="/resources/js/user/signUpAgree.js"></script>

</body>
</html>