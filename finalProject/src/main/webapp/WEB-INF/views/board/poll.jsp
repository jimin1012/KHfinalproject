<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <!-- Google Charts 스크립트 로드 -->
            <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        </head>

        <body>
            <%-- 선택지를 저장할 input --%>
                <input type="hidden" id="OptionNo" name="OptionNo" value="0" />
                    <div class="pollArea">
                        <h1 id="pollTitle">${poll.pollTitle}</h1>
                        <ul class="optionArea">
                            <c:forEach var="option" items="${option}" varStatus="loop">
                                <c:if test="${loop.index < 5}">
                                    <div class="optionCount">
                                        ${option.optionCount}
                                    </div>

                                    <li class="choice" onclick="selectChoice(this,${option.optionNo})">
                                        ${option.optionContent}</li>
                                </c:if>
                            </c:forEach>
                        </ul>

                        <c:if test="${poll.pollSt == 2}">
                            <h1>종료된 투표입니다.</h1>
                            <button id="voteResult">결과 확인</button>
                        </c:if>
                        <c:if test="${poll.pollSt == 1}">
                        <div id="pollBtnArea">
                                <button id="voteBtn">투표하기</button>
                                <button id="voteResult">결과 확인</button>
                        </div>
                        </c:if>

                        <div id="pollInfo">
                            <span id="allVote">투표 참여 수 : </span>
                            <span>투표 기간 : ~${poll.pollEndDate}</span>
                        </div>

                        <!-- 막대 그래프를 그릴 div -->
                    </div>
                    <div id="pollResult">
                    <div id="chart_div" style="width: 960px; height: 400px;"></div>
                        <div id="resultBtnArea">
                            <button id="backBtn">이전으로</button>
                        </div>
                    </div>
        </body>
        <script>


            function selectChoice(selectedElement, optionNo) {
                var choices = document.querySelectorAll('.choice'); // 모든 선택지 요소를 가져옴
                document.getElementById('OptionNo').value = optionNo; // 선택한 선택지 value에 저장

                // 모든 선택지의 색상을 기본 색상으로 변경
                choices.forEach(function (choice) {
                    choice.classList.remove('selected');
                });
                // 클릭된 선택지에만 색상을 적용
                selectedElement.classList.add('selected');
            }

               

                document.getElementById("voteResult").addEventListener("click", function () {
                    
                    document.getElementsByClassName("pollArea")[0].style.display = 'none';
                    document.getElementById("pollResult").style.display = "flex";
                    
                    // 구글 차트
                    google.charts.load('current', { packages: ['corechart'] });
                    google.charts.setOnLoadCallback(drawChart);

                    function drawChart() {

                        // 투표 데이터
                    const data = google.visualization.arrayToDataTable([
                        ['선택지', '투표 수'],
                        <c:forEach var="option" items="${option}" varStatus="loop">
                            <c:if test="${loop.index < 5}">
                                ['${option.optionContent}', ${option.optionCount}],
                            </c:if>
                        </c:forEach>
                    ]);
                    var options = {
                        title: '투표 결과',
                        legend: { position: 'none' },
                        chartArea: { width: '50%'},
                        hAxis: {
                            title: '투표수',
                            titleTextStyle: { bold: true, fontSize: 14 , italic: false },
                            minValue: 0
                        },
                        vAxis: {
                            title: '선택지',
                            titleTextStyle: { bold: true, fontSize: 14, italic: false }
                        }

                        
                    };

                    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
                    
                    chart.draw(data, options);
                }
            });

            // 전체 투표수 
            const optionCount = document.getElementsByClassName("optionCount")
            let c = 0;
            for (count of optionCount) {
                console.log(count.innerText)
                c += Number(count.innerText)
            }
            console.log(c)
            
            document.getElementById("allVote").innerText = "전체 투표수 : " + c
            



                
            if(document.getElementById("voteBtn")!= null){
                /*  */

                document.getElementById("voteBtn").addEventListener("click", function () {

                    if (loginMemberNo == "") { // 로그인 X
                        alert("로그인 후 이용해주세요.");
                    return;
                    }


                    const selectedOption = document.getElementById('OptionNo').value;
                    if (selectedOption==0) {
                     alert("선택지를 선택해주세요.");
                        return; // 선택지가 없으면 함수 종료
                    }
                    console.log(boardNo)
                    console.log(loginMemberNo)
                    console.log(OptionNo.value)
                    
                    const data = {
                        "boardNo": boardNo,
                        "memberNo": loginMemberNo,
                        "optionNo": OptionNo.value
                    };
                    
                    console.log(data)
                    
                    

                    fetch("/board/insertVote", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data) // JS 객체 -> JSON 파싱
                })
                .then(resp => resp.text())
                .then(result => {
                    if (result > 0) {
                            location.reload(true)
                            alert("투표완료")
                        } else {
                            location.reload(true)
                            alert("아이디당 투표는 1번만 할 수 있습니다!")
                        }
                    })
                    .catch(err => console.log(err));
                });
            }

            document.getElementById("backBtn").addEventListener("click", function () {
                location.reload(true)
            })


        </script>

        </html>