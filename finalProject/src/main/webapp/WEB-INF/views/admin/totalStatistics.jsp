<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>예약통계</title>

    <link rel="stylesheet" href="/resources/css/admin/totalStatistics-style.css">
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>

</head>
<body>
    <div class="wrap">
        <!-- 관리자 헤더 -->
		<jsp:include page="/WEB-INF/views/admin/adminHeader.jsp" />

        <main>
            <section class="main-box">
                <h3>예약 통계</h3>
                <section class="main-header">
                    <div class="chooseSt">
                        <span class="chosenSt"><a href="/admin/totalStatistics">전체 예약/구매 건수</a></span>
                        <span class="notChosenSt"><a href="/admin/totalStatistics2">숙소별 예약 건수</a></span>
                    </div>
                    <select id="selectCondition">
                        <option value="gender">성별</option>
                        <option value="age">나이대별</option>
                    </select>
                </section>
                <section class="main-containerSt1">
                    <div class="showChart1">
                        <div class="chartTitle1">
                            <select id="selectYearMonth">
                                <c:forEach var="pt" items="${payTimeList}">
                                    <option value="${pt.PAY_TIME}">${pt.PAY_TIME}</option>
                                </c:forEach>
                            </select>
                            성별 예약/구매 비율
                        </div>
                        <div class="chart1" id="container1">
                        </div>
                    </div>
                    
                    
                    
                    <div class="showTable1">
                        <!-- <c:if test="${empty param.year}">
                            <div class="tableTitle1">${payTimeList[0].PAY_TIME} 예약/구매 건수</div>
                        </c:if>
                        <c:if test="${!empty param.year}">
                            <div class="tableTitle1"> 예약/구매 건수</div>
                        </c:if> -->
                        <div class="tableTitle1">${payTimeList[0].PAY_TIME} 예약/구매 건수</div>
                        <table class="table1">
                            <thead>
                                <tr>
                                    <th>숙소</th>
                                    <th>버스</th>
                                    <th>기차</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <c:forEach var="tb1" items="${table1}">
                                        <td>${tb1.BUY_COUNT}</td>
                                    </c:forEach>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>
                    
                </section>
            </section>
        </main>
      
    
    </div>

    <script>
        const chart1 = "${chart1}";

        // 조회해온 값 string -> 객체로 변경
        const cleanedString = chart1.slice(1, -1);

        const dataArray = cleanedString.split('}, {').map(item => {
        // 중괄호 및 등호를 제거하고 쉼표로 분할하여 키-값 쌍을 추출합니다.
        const keyValuePairs = item.replace(/[{}]/g, '').split(', ');
        const obj = {};
        // 각 키-값 쌍을 사용하여 객체를 생성합니다.
        keyValuePairs.forEach(pair => {
            const [key, value] = pair.split('=');
            obj[key] = value;
        });
        return obj;
        });

        // 성별, 나이대별 구분
        const params1 = new URL(location.href).searchParams;
        const condition1 = params1.get("condition");

        // 성별 조회
        if(condition1 == "gender" || condition1 == null){
            const manChartData = {
                "A" : "",
                "T" : "",
                "B" : ""
            };

            const womanChartData = {
                "A" : "",
                "T" : "",
                "B" : ""
            };

            for(const i of dataArray){

                if(i.USER_GENDER == 'M'){
                    switch (i.RESERV_TYPE) {
                        case 'A' : manChartData.A = parseInt(i.RES_COUNT); break;
                        case 'T' : manChartData.T = parseInt(i.RES_COUNT); break;
                        case 'B' : manChartData.B = parseInt(i.RES_COUNT); break;
                    }
                }
                if(i.USER_GENDER == 'F'){
                    switch (i.RESERV_TYPE) {
                        case 'A' : womanChartData.A = parseInt(i.RES_COUNT); break;
                        case 'T' : womanChartData.T = parseInt(i.RES_COUNT); break;
                        case 'B' : womanChartData.B = parseInt(i.RES_COUNT); break;
                    }
                }
            }

            const data1 = [manChartData.A, manChartData.T, manChartData.B];
            const data2 = [womanChartData.A, womanChartData.T, womanChartData.B];

            Highcharts.chart('container1', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: '',
                    align: 'left'
                },
                xAxis: {
                    categories: ['숙소', '기차', '버스'],
                    crosshair: true,
                    accessibility: {
                        description: 'Reserv_Type'
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '예약 비율(%)'
                    }
                },
                tooltip: {
                    valueSuffix: '%'
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [
                    {
                        name: '남',
                        
                        data: data1
                    },
                    {
                        name: '여',
                        data: data2
                    }
                ]
            });
            
        }


        // // 나이대별 조회
        if(condition1 == "age" ){
            const accChartData = {
                "a" : "",
                "b" : "",
                "c" : "",
                "d" : "",
                "e" : "",
                "f" : ""
            };

            const busChartData = {
                "a" : "",
                "b" : "",
                "c" : "",
                "d" : "",
                "e" : "",
                "f" : ""
            };

            const trainChartData = {
                "a" : "",
                "b" : "",
                "c" : "",
                "d" : "",
                "e" : "",
                "f" : ""
            };

            for(const i of dataArray){

                if(i.RESERV_TYPE == 'A'){
                    switch (i.AGE_GROUP) {
                        case '1' : accChartData.a = parseInt(i.BUY_COUNT); break;
                        case '2' : accChartData.b = parseInt(i.BUY_COUNT); break;
                        case '3' : accChartData.c = parseInt(i.BUY_COUNT); break;
                        case '4' : accChartData.d = parseInt(i.BUY_COUNT); break;
                        case '5' : accChartData.e = parseInt(i.BUY_COUNT); break;
                        case '60' : accChartData.f = parseInt(i.BUY_COUNT); break;
                    }
                }
                if(i.RESERV_TYPE == 'B'){
                    switch (i.AGE_GROUP) {
                        case '1' : busChartData.a = parseInt(i.BUY_COUNT); break;
                        case '2' : busChartData.b = parseInt(i.BUY_COUNT); break;
                        case '3' : busChartData.c = parseInt(i.BUY_COUNT); break;
                        case '4' : busChartData.d = parseInt(i.BUY_COUNT); break;
                        case '5' : busChartData.e = parseInt(i.BUY_COUNT); break;
                        case '60' : busChartData.f = parseInt(i.BUY_COUNT); break;
                    }
                }
                 if(i.RESERV_TYPE == 'T'){
                    switch (i.AGE_GROUP) {
                        case '1' : trainChartData.a = parseInt(i.BUY_COUNT); break;
                        case '2' : trainChartData.b = parseInt(i.BUY_COUNT); break;
                        case '3' : trainChartData.c = parseInt(i.BUY_COUNT); break;
                        case '4' : trainChartData.d = parseInt(i.BUY_COUNT); break;
                        case '5' : trainChartData.e = parseInt(i.BUY_COUNT); break;
                        case '60' : trainChartData.f = parseInt(i.BUY_COUNT); break;
                    }
                }
            }

            const data4 = [accChartData.a, accChartData.b, accChartData.c, accChartData.d, accChartData.e, accChartData.f];
            const data5 = [trainChartData.a, trainChartData.b, trainChartData.c, trainChartData.d, trainChartData.e, trainChartData.f];
            const data6 = [busChartData.a, busChartData.b, busChartData.c, busChartData.d, busChartData.e, busChartData.f];

            Highcharts.chart('container1', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: '',
                    align: 'left'
                },
                xAxis: {
                    categories: ['10s', '20s', '30s', '40s', '50s', '60s'],
                    crosshair: true,
                    accessibility: {
                        description: 'AGE_GROUP'
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '예약 비율(%)'
                    }
                },
                tooltip: {
                    valueSuffix: '%'
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [
                    {
                        name: '숙소',
                        
                        data: data4
                    },
                    
                    {
                        name: '기차',
                        data: data5
                    },

                    {
                        name: '버스',
                        data: data6
                    }
                ]
            });
        }
        
        
        
        
        
    </script>

    


    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="/resources/js/admin/totalStatistics.js"></script>
</body>
</html>