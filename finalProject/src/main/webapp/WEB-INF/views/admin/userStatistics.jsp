<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원통계</title>
<link rel="stylesheet" href="/resources/css/admin/userStatistics-style.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.5.1/dist/chart.min.js"></script>
</head>
<body>
    <div class="wrap">
        <!-- 관리자 헤더 -->
     	<jsp:include page="/WEB-INF/views/admin/adminHeader.jsp" />
            <main>
                <div class="main-wrap">
                    <div>
                        <h3>회원통계</h3>
                    </div>
                    
                    <div>
                        <canvas id="myChart"></canvas>
                    </div>
                </div>
            </main>
    </div>




    <script>
        const chart = "${chart}";

        const manChartData = {
            "a" : "",
            "b" : "",
            "c" : "",
            "d" : "",
            "e" : "",
            "f" : "",
            "g" : "",
            "h" : "",
            "i" : "",
            "j" : "",
            "k" : ""
        };
        const womanChartData = {
            "a" : "",
            "b" : "",
            "c" : "",
            "d" : "",
            "e" : "",
            "f" : "",
            "g" : "",
            "h" : "",
            "i" : "",
            "j" : "",
            "k" : ""
        };


        const cleanedString = chart.slice(1, -1);

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





        for (const i of dataArray) {
            
            if(i.USER_GENDER == 'M'){
                switch (parseInt(i.AGE_GROUP)) {
                case 1:  manChartData.a = parseInt(i.USER_COUNT);  break;
                case 2:  manChartData.b = parseInt(i.USER_COUNT);  break;
                case 3:  manChartData.c = parseInt(i.USER_COUNT);   break;
                case 4:  manChartData.d = parseInt(i.USER_COUNT);   break;
                case 5:  manChartData.e = parseInt(i.USER_COUNT);   break;
                case 6:  manChartData.f = parseInt(i.USER_COUNT);   break;
                case 7:  manChartData.g = parseInt(i.USER_COUNT);   break;
                case 8:  manChartData.h = parseInt(i.USER_COUNT);   break;
                case 9:  manChartData.i = parseInt(i.USER_COUNT);   break;
                case 10: manChartData.j = parseInt(i.USER_COUNT);    break; 
                case 60: manChartData.k = parseInt(i.USER_COUNT);    break; 
                }
            }

            if(i.USER_GENDER == 'F'){
                switch (parseInt(i.AGE_GROUP)) {
                case 1:  womanChartData.a = parseInt(i.USER_COUNT);  break;
                case 2:  womanChartData.b = parseInt(i.USER_COUNT);  break;
                case 3:  womanChartData.c = parseInt(i.USER_COUNT);   break;
                case 4:  womanChartData.d = parseInt(i.USER_COUNT);   break;
                case 5:  womanChartData.e = parseInt(i.USER_COUNT);   break;
                case 6:  womanChartData.f = parseInt(i.USER_COUNT);   break;
                case 7:  womanChartData.g = parseInt(i.USER_COUNT);   break;
                case 8:  womanChartData.h = parseInt(i.USER_COUNT);   break;
                case 9:  womanChartData.i = parseInt(i.USER_COUNT);   break;
                case 10: womanChartData.j = parseInt(i.USER_COUNT);    break; 
                case 60: womanChartData.k = parseInt(i.USER_COUNT);    break; 
                }
            }
            
        }

       
        const data1 = [manChartData.a, manChartData.b, manChartData.c, manChartData.d, manChartData.e, manChartData.f, manChartData.g, manChartData.h, manChartData.i, manChartData.j, manChartData.k];
        const data2 = [womanChartData.a, womanChartData.b, womanChartData.c, womanChartData.d, womanChartData.e, womanChartData.f, womanChartData.g, womanChartData.h, womanChartData.i, womanChartData.j, womanChartData.k];

       

        var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["0 - 12", "13 - 18", "19 - 24", "25 - 29", "30 - 34", "35 - 39", "40 - 44", "45 - 49", "50 - 54", "55 - 59", "60+"],
                    datasets: [{ 
                        data: data1,
                        label: "남자",
                        borderColor: "rgb(62,149,205)",
                        backgroundColor: "rgb(62,149,205,0.1)",
                        borderWidth:2
                    }, { 
                        data: data2,
                        label: "여자",
                        borderColor: "rgb(196,88,80)",
                        backgroundColor:"rgb(196,88,80,0.1)",
                        borderWidth:2
                    }
                    ]
            },
            options: {
			    responsive: true,
			    scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
			    },
		}
        });
    </script>
</body>
</html>