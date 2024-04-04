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
    <script src="https://code.highcharts.com/modules/data.js"></script>
    <script src="https://code.highcharts.com/modules/drilldown.js"></script>
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
                        <span class="notChosenSt"><a href="/admin/totalStatistics">전체 예약/구매 건수</a></span>
                        <span class="chosenSt"><a href="/admin/totalStatistics2">숙소별 예약 건수</a></span>
                    </div>
                    <select id="selectCondition">
                        <option value="months">월별</option>
                        <option value="years">연도별</option>
                    </select>
                </section>
                <section class="main-containerSt2">
                    <div class="showChart2">
                        <div class="chart2">
                            <div class="chartTitle2">
                                <select id="selectYearMonth">
                                    <c:if test="${empty payTimeYear}">
                                        <c:forEach var="pt" items="${payTimeList}">
                                            <option value="${pt.PAY_TIME}">${pt.PAY_TIME}</option>
                                        </c:forEach>
                                    </c:if>
                                    <c:if test="${!empty payTimeYear}">
                                        <c:forEach var="pt" items="${payTimeYear}">
                                            <option value="${pt.PAY_TIME}">${pt.PAY_TIME}</option>
                                        </c:forEach>
                                    </c:if>

                                </select>
                                숙소 예약 수 5순위
                            </div>
                            <div class="chartBar" id="container2">
                                
                            </div>
                        </div>
                        <div class="chart3">
                            <div id="container3">

                            </div>
                            <div id="chart3Title"></div>
                        </div>

                    </div>
                    <div class="showTable2">
                        <table class="table2">
                            <thead>
                                <tr>
                                    <th>순위</th>
                                    <th>업체명</th>
                                    <c:if test="${empty payTimeYear}">
                                        <th>당월 예약 건수</th>
                                        <th>전월 예약 건수 비교</th>
                                    </c:if>
                                    <c:if test="${!empty payTimeYear}">
                                        <th>올해 예약 건수</th>
                                        <th>작년 예약 건수 비교</th>
                                    </c:if>
                                </tr>
                            </thead>
                            <tbody>

                                <c:forEach var="tb" items="${table2}">
                                    <tr onclick="showGenderCHart3(${tb.ACC_NO}, '${tb.ACC_NAME}' )">
                                        <td>${tb.ROWNUM}</td>
                                        <td>${tb.ACC_NAME}</td>
                                        <td>${tb.PRESENT_TIME}</td>
                                        <td>
                                           <c:if test="${(tb.PRESENT_TIME - tb.LAST_TIME) > 0}">
                                                +
                                           </c:if>
                                           ${tb.PRESENT_TIME - tb.LAST_TIME}
                                        </td>
                                    </tr>
                                </c:forEach>
                            </tbody>
                            
                            
                        </table>
                    </div>
                    
                </section>
            </section>
        </main>
    
    
    </div>

    <script>
        const chart2 = "${chart2}";

        // 조회해온 값 string -> 객체로 변경
        const cleanedString = chart2.slice(1, -1);

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

        
        const firstChartData = {
            "A" : "",
            "accName" : ""
        };
        const secondChartData = {
            "A" : "",
            "accName" : ""
        };
        const thirdChartData = {
            "A" : "",
            "accName" : ""
        };
        const forthChartData = {
            "A" : "",
            "accName" : ""
        };
        const fifthChartData = {
            "A" : "",
            "accName" : ""
        };

       

        for(const i of dataArray){

            if(i.ROWNUM == 1){
                firstChartData.A = parseInt(i.PRESENT_TIME);
                firstChartData.accName = i.ACC_NAME;

            }
            if(i.ROWNUM == 2){
                secondChartData.A = parseInt(i.PRESENT_TIME);
                secondChartData.accName = i.ACC_NAME;
            }
            if(i.ROWNUM == 3){
                thirdChartData.A = parseInt(i.PRESENT_TIME);
                thirdChartData.accName = i.ACC_NAME;
            }
            if(i.ROWNUM == 4){
                forthChartData.A = parseInt(i.PRESENT_TIME);
                forthChartData.accName = i.ACC_NAME;
            }
            if(i.ROWNUM == 5){
                fifthChartData.A = parseInt(i.PRESENT_TIME);
                fifthChartData.accName = i.ACC_NAME;
            }
            
        }


        const data7 = [firstChartData.A, secondChartData.A, thirdChartData.A, forthChartData.A, fifthChartData.A];

        Highcharts.chart('container2', {
            chart: {
                type: 'column'
            },
            title: {
                align: 'left',
                text: ''
            },
            accessibility: {
                announceNewData: {
                    enabled: true
                }
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: '예약 건수'
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:f}'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },

            series: [
                {
                    name: '숙소',
                    colorByPoint: true,
                    data: [
                        {
                            name: firstChartData.accName,
                            y: firstChartData.A,
                            drilldown: firstChartData.A
                        },
                        {
                            name: secondChartData.accName,
                            y: secondChartData.A,
                            drilldown: firstChartData.A
                        },
                        {
                            name: thirdChartData.accName,
                            y: thirdChartData.A,
                            drilldown: firstChartData.A
                        },
                        {
                            name: forthChartData.accName,
                            y: forthChartData.A,
                            drilldown: firstChartData.A
                        },
                        {
                            name: fifthChartData.accName,
                            y: fifthChartData.A,
                            drilldown: firstChartData.A
                        }
                        
                    ]
                }
            ],
            drilldown: {
                breadcrumbs: {
                    position: {
                        align: 'right'
                    }
                },
                series: 
                {
                    name: '예약건수',
                    data: data7
                }
                
            }
        });


    </script>

    

    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="/resources/js/admin/totalStatistics2.js"></script>
</body>
</html>