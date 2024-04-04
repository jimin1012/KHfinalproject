<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resources/css/train/trainSeat.css">
    <title>기차 좌석 조회</title>
    <script src="https://cdn.iamport.kr/v1/iamport.js"></script>
    <!-- jQuery -->
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" ></script>
    <!-- iamport.payment.js -->
    <script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"></script>

</head>
<body>
 <jsp:include page="/WEB-INF/views/common/header.jsp" />
    <main>

        <c:set var="depTime" value="${param.depTime}" />
        <c:set var="arrTime" value="${param.arrTime}" />
        <c:set var="realDate" value="${param.realDate}" />

        <!-- 날짜/지역/요금정보-->
        <section id="trainInfo">
            <div id="date">${param.realDate}</div>
            <div>
                <!-- 지역 -->
                <div id="destination">
                    <div class="des" id="to">${param.depName}</div>
                    <span>_________</span>
                    <div class="des" id="from">${param.arrName}</div>
                </div>
                <div class="info">${param.trainGrade} | </div>
                <div class="info" id="totalT"></div>
                <div class="info">|</div>
                <div class="info"><span> *1/2호칸은 특실입니다.*</span></div>
            </div>
        </section>

        <section id="pCount">

            <label for="adult">
                <div class="box deleteBox">일반</div>
            </label>

            <label for="child">
                <div class="box deleteBox">어린이</div>
            </label>

            <label for="senior">
                <div class="box  deleteBox">경로</div>
            </label>

        </section>

        <input type="radio" class="spec" name="spec" id="adult" value="${param.charge}">
        <input type="radio" class="spec" name="spec" id="child" value="${param.charge *0.80}">
        <input type="radio" class="spec" name="spec" id="senior" value="${param.charge *0.50}">

        <section id="trainRoom">
            <div>열차(호실)</div>
            
            <div id="roomNumber">
                <label for="1"> <div class="rNum">1</div></label>
                <label for="2"> <div class="rNum">2</div></label>
                <label for="3"> <div class="rNum">3</div></label>
                <label for="4"> <div class="rNum">4</div></label>
                <label for="5"> <div class="rNum">5</div></label>
                <label for="6"> <div class="rNum">6</div></label>
                <label for="7"> <div class="rNum">7</div></label>
                <label for="8"> <div class="rNum">8</div></label>
            </div>
        </section>

        
        <input type="radio" class="carN" name="carN" id="1" value="1.5">
        <input type="radio" class="carN" name="carN" id="2" value="1.5">
        <input type="radio" class="carN" name="carN" id="3" value="1">
        <input type="radio" class="carN" name="carN" id="4" value="1">
        <input type="radio" class="carN" name="carN" id="5" value="1">
        <input type="radio" class="carN" name="carN" id="6" value="1">
        <input type="radio" class="carN" name="carN" id="7" value="1">
        <input type="radio" class="carN" name="carN" id="8" value="1">



        <section id="trainSeat">
            <article class="rowS">
                <article class="row2">
                    <div class="tSeat first">A</div>
                    <div class="tSeat" id="A1"></div>
                    <div class="tSeat" id="A2"></div>
                    <div class="tSeat" id="A3"></div>
                    <div class="tSeat" id="A4"></div>
                    <div class="tSeat" id="A5"></div>
                    <div class="tSeat" id="A6"></div>
                    <div class="tSeat" id="A7"></div>
                    <div class="tSeat" id="A8"></div>
                    <div class="tSeat" id="A9"></div>
                    <div class="tSeat" id="A10"></div>
                    <div class="tSeat" id="A11"></div>
                    <div class="tSeat" id="A12"></div>
                    <div class="tSeat" id="A13"></div>
                    <div class="tSeat" id="A14"></div>
                </article>
    
                <article class="row2">
                    <div class="tSeat first">B</div>
                    <div class="tSeat" id="B1"></div>
                    <div class="tSeat" id="B2"></div>
                    <div class="tSeat" id="B3"></div>
                    <div class="tSeat" id="B4"></div>
                    <div class="tSeat" id="B5"></div>
                    <div class="tSeat" id="B6"></div>
                    <div class="tSeat" id="B7"></div>
                    <div class="tSeat" id="B8"></div>
                    <div class="tSeat" id="B9"></div>
                    <div class="tSeat" id="B10"></div>
                    <div class="tSeat" id="B11"></div>
                    <div class="tSeat" id="B12"></div>
                    <div class="tSeat" id="B13"></div>
                    <div class="tSeat" id="B14"></div>

                </article>

            </article>
            <article class="rowS">
                <article class="row2">
                    <div class="tSeat first">C</div>
                    <div class="tSeat" id="C1"></div>
                    <div class="tSeat" id="C2"></div>
                    <div class="tSeat" id="C3"></div>
                    <div class="tSeat" id="C4"></div>
                    <div class="tSeat" id="C5"></div>
                    <div class="tSeat" id="C6"></div>
                    <div class="tSeat" id="C7"></div>
                    <div class="tSeat" id="C8"></div>
                    <div class="tSeat" id="C9"></div>
                    <div class="tSeat" id="C10"></div>
                    <div class="tSeat" id="C11"></div>
                    <div class="tSeat" id="C12"></div>
                    <div class="tSeat" id="C13"></div>
                    <div class="tSeat" id="C14"></div>
                </article>
    
                <article class="row2">
                    <div class="tSeat first">D</div>
                    <div class="tSeat" id="D1"></div>
                    <div class="tSeat" id="D2"></div>
                    <div class="tSeat" id="D3"></div>
                    <div class="tSeat" id="D4"></div>
                    <div class="tSeat" id="D5"></div>
                    <div class="tSeat" id="D6"></div>
                    <div class="tSeat" id="D7"></div>
                    <div class="tSeat" id="D8"></div>
                    <div class="tSeat" id="D9"></div>
                    <div class="tSeat" id="D10"></div>
                    <div class="tSeat" id="D11"></div>
                    <div class="tSeat" id="D12"></div>
                    <div class="tSeat" id="D13"></div>
                    <div class="tSeat" id="D14"></div>
                </article>

            </article>
            
        </section>

        <section id="bookInfo">
            <article id="seatInfo">
                <div>
                    <div class="infoTitle">호실</div>
                    <div class="valueT" id="car"></div>
                </div>
                <div>
                    <div class="infoTitle">좌석</div>
                    <div class="valueT" id="seatNo"></div>
                </div>
            </article>
            <article id="countInfo">
                <div class="infoTitle">시간</div>
                <div>
                    <table border="1">
                        <tr>
                            <th>출발</th>
                            <th>도착</th>
                        </tr>
                        <tr>
                            <td id="departTime"></td>
                            <td id="arriveTime"></td>
                        </tr>

                    </table>
                </div>
            </article>

            <article id="priceInfo">
                <div class="infoTitle">결제 금액</div>
                <div class="moneyInfo">
                    <div id="finalPrice"></div>
                    <div>원</div>
                </div>

        <select name="paymentMethod" id="paymentMethod">
            <option value=0 disabled  selected>결제수단</option>
            <option value=1>카카오톡결제</option>
            <option value=2>토스페이</option>
            <option value=3>KG이니시스</option>
        </select>
    
            </article>
        </section>


        
        <section class="btnArea">
            <button id="checkBtn">예 약</button>
        </section>

        

    </main>
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />
    <script>
        
        const depTime = '${depTime}';
        const arrTime = '${arrTime}';
        const realDate = '${realDate}';

        const userNo = '${loginUser.userNo}';
        const userEmail ='${loginUser.userEmail}';
        const userName ='${loginUser.userName}';
        const userTel ='${loginUser.userTel}';
        const userAddress ='${loginUser.userAddress}';
    </script>
    

    <script src="/resources/js/train/trainSeat.js"></script>
</body>
</html>