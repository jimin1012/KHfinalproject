<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>버스매수 및 좌석 선택</title>
    <link rel="stylesheet" href="/resources/css/bus/bus-ticketing.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> 

    <script src="https://cdn.iamport.kr/v1/iamport.js"></script>
    <!-- iamport.payment.js -->
    <script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"></script>
</head>
<body>
    <jsp:include page="/WEB-INF/views/common/header.jsp" />
    <main>

    <div class="bus-ticketing-area">

        <div class="page-title">
            버스 예매
        </div>
        <div id="ticketing-area">
            <!-- 터미널 출,도착지 정보 부분 -->
            <div id="terminal-info">
                <span id="dep-date"></span>
                <hr>
                <div>
                    <span id="dep-ter">출발터미널</span>
                    <span>출발</span>
                </div>
                <div>
                    <span id="arr-ter">도착터미널</span>
                    <span>도착</span>
                </div>
                <hr>
                <section>
                    <span id="gradeNm">좌석 등급 : 우등</span>
                    <hr>
                    <span id="dep-time">출발 시간 :</span>
                    <hr>
                    <span id="arr-time">도착 시간 : </span>
                </section>
            </div>
            
            <!-- 일반,어린이,노인 선택 부분 -->
            <div id="select-age">
                <label for="adult" ><div class="back" ><input type="radio" class="age" name="age" id="adult" value="일반" onchange="checkedAge()">일반</div></label>
                <hr>
                <label for="children"><div class="back"><input type="radio" class="age" name="age" id="children" value="어린이" onchange="checkedAge()" >어린이</div></label>
                <hr>
                <label for="old"><div class="back"><input type="radio" class="age" name="age" id="old" value="노약자" onchange="checkedAge()">노약자</div></label>
            </div>
            
            <!-- 좌석 선택 부분 -->
            <div id="bus-seat-area">
                <div id="left-seat">
                    <div>
                        <label for="1"><input type="radio" name="seat" class="seat" id="1" value="1">1</label>
                        <label for="2"><input type="radio" name="seat" class="seat" id="2" value="2">2</label>
                    </div>
                    <div>
                        <label for="5"><input type="radio" name="seat" class="seat" class="seat" id="5" value="5">5</label>
                        <label for="6"><input type="radio" name="seat" class="seat" id="6" value="6">6</label>
                    </div>
                    <div>
                        <label for="9"><input type="radio" name="seat" class="seat" id="9" value="9">9</label>
                        <label for="10"><input type="radio" name="seat" class="seat" id="10" value="10">10</label>
                    </div>
                    <div>
                        <label for="13"><input type="radio" name="seat" class="seat" id="13" value="13">13</label>
                        <label for="14"><input type="radio" name="seat" class="seat" id="14" value="14">14</label>
                    </div>
                    <div>
                        <label for="17"><input type="radio" name="seat" class="seat" id="17" value="17">17</label>
                        <label for="18"><input type="radio" name="seat" class="seat" id="18" value="18">18</label>
                    </div>
                    <div>
                        <label for="21"><input type="radio" name="seat" class="seat" id="21" value="21">21</label>
                        <label for="22"><input type="radio" name="seat" class="seat" id="22" value="22">22</label>
                    </div>
                    <div>
                        <label for="25"><input type="radio" name="seat" class="seat" id="25" value="25">25</label>
                        <label for="26"><input type="radio" name="seat" class="seat" id="26" value="26">26</label>
                    </div>
                    <div>
                        <label for="29"><input type="radio" name="seat" class="seat" id="29" value="29">29</label>
                        <label for="30"><input type="radio" name="seat" class="seat" id="30" value="30">30</label>
                    </div>
                    <div>
                        <label for="33"><input type="radio" name="seat" class="seat" id="33" value="33">33</label>
                        <label for="34"><input type="radio" name="seat" class="seat" id="34" value="34">34</label>
                    </div>
                    <div>
                        <label for="37"><input type="radio" name="seat" class="seat" id="37" value="37">37</label>
                        <label for="38"><input type="radio" name="seat" class="seat" id="38" value="38">38</label>
                    </div>
                    <div>
                        <label for="41"><input type="radio" name="seat" class="seat" id="41" value="41">41</label>
                        <label for="42"><input type="radio" name="seat" class="seat" id="42" value="42">42</label>
                        <label for="43"><input type="radio" name="seat" class="seat" id="43" value="43">43</label>
                        <label for="44"><input type="radio" name="seat" class="seat" id="44" value="44">44</label>
                        <label for="45"><input type="radio" name="seat" class="seat" id="45" value="45">45</label>
                    </div>
                </div>
                <div id="right-seat">
                    <div>
                        <label for="3"><input type="radio" name="seat" class="seat" id="3" value="3">3</label>
                        <label for="4"><input type="radio" name="seat" class="seat" id="4" value="4">4</label>
                    </div>
                    <div>
                        <label for="7"><input type="radio" name="seat" class="seat" id="7" value="7">7</label>
                        <label for="8"><input type="radio" name="seat" class="seat" id="8" value="8">8</label>
                    </div>
                    <div>
                        <label for="11"><input type="radio" name="seat" class="seat" id="11" value="11">11</label>
                        <label for="12"><input type="radio" name="seat" class="seat" id="12" value="12">12</label>
                    </div>
                    <div>
                        <label for="15"><input type="radio" name="seat" class="seat" id="15" value="15">15</label>
                        <label for="16"><input type="radio" name="seat" class="seat" id="16" value="16">16</label>
                    </div>
                    <div>
                        <label for="19"><input type="radio" name="seat" class="seat" id="19" value="19">19</label>
                        <label for="20"><input type="radio" name="seat" class="seat" id="20" value="20">20</label>
                    </div>
                    <div>
                        <label for="23"><input type="radio" name="seat" class="seat" id="23" value="23">23</label>
                        <label for="24"><input type="radio" name="seat" class="seat" id="24" value="24">24</label>
                    </div>
                    <div>
                        <label for="27"><input type="radio" name="seat" class="seat" id="27" value="27">27</label>
                        <label for="28"><input type="radio" name="seat" class="seat" id="28" value="28">28</label>
                    </div>
                    <div>
                        <label for="31"><input type="radio" name="seat" class="seat" id="31" value="31">31</label>
                        <label for="32"><input type="radio" name="seat" class="seat" id="32" value="32">32</label>
                    </div>
                    <div>
                        <label for="35"><input type="radio" name="seat" class="seat" id="35" value="35">35</label>
                        <label for="36"><input type="radio" name="seat" class="seat" id="36" value="36">36</label>
                    </div>
                    <div>
                        <label for="39"><input type="radio" name="seat" class="seat" id="39" value="39">39</label>
                        <label for="40"><input type="radio" name="seat" class="seat" id="40" value="40">40</label>
                    </div>
                </div>
            </div>
            
            <!-- 선택 정보, 요금 -->
            <div id="final-price">
                <span>탑승 인원 정보</span>
                <h1 id="age-info">   </h1>
                <hr>
                <span >좌석 정보</span>
                <h1 id="seat-info">  </h1>
                <hr>
                <div>
                    <h3>총 결제 금액 :</h3>
                    <h3 id="final-price1"></h3>
                </div>
                <select name="paymentMethod" id="paymentMethod">
                    <option value=0 disabled selected>결제수단</option>
                    <option value=1>카카오결제</option>
                    <option value=2>토스페이</option>
                    <option value=3>KG이니시스</option>
                </select>
                <hr>
                <section id="btn-area">
                    <button id="reservBtn">결제하기</button>
                </section>
            </div>
            
            
        </div>
    </div>


    <script>
        const userNo = '${loginUser.userNo}';
        const userEmail ='${loginUser.userEmail}';
        const userName ='${loginUser.userName}';
        const userTel ='${loginUser.userTel}';
        const userAddress ='${loginUser.userAddress}';
    </script>
    <script src="/resources/js/bus/bus-ticketing.js"></script>
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />
</main>
</body>
</html>