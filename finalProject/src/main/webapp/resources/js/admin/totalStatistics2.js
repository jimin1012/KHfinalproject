
// 우측상단 select박스
(()=>{
    const params = new URL(location.href).searchParams;

    // 날짜 선택
    if(params.get("year") != null){
        const year = params.get("year");
        const month = params.get("month");
        
        const options1 = document.querySelectorAll("#selectYearMonth > option");

        for(let op of options1){
            if(op.value.substr(0,4) == year && op.value.substr(6,2) == month){
                op.selected = true;
                $(".tableTitle2").text(`${op.value} 숙소 예약 수 5순위`);
            }
        }
    }

    // 월별 선택
    if(params.get("condition") == "months"){

        const options2 = document.querySelectorAll("#selectCondition > option");

        for(let op of options2){
            if(op.value == "months"){
                op.selected = true;
            }
        }
    }

    // 연도별 선택
    if(params.get("condition") == "years"){

        const options3 = document.querySelectorAll("#selectCondition > option");

        for(let op of options3){
            if(op.value == "years"){
                op.selected = true;
            }
        }
    }



})();



// 날짜 조회 chart2
const selectYM = document.getElementById("selectYearMonth");
selectYM.addEventListener("change", () =>{
    
    const year = selectYM.value.substr(0,4);
    let month = selectYM.value.substr(6,2);

    const params2 = new URL(location.href).searchParams;

    // 월별
    if(params2.get("condition") == null || params2.get("condition") == "months"){
        location.href = `/admin/selectYearMonthChart2?year=${year}&month=${month}`;
    }
    // 연도별
    if(params2.get("condition") == "years"){
        location.href = `/admin/selectYearChart2?condition=${selectCondition.value}&year=${year}&month=${month}`;
    }

    

});


// chart1 날짜 선택 시 요청 보내기
const selectCondition = document.getElementById("selectCondition");
selectCondition.addEventListener("change", () => {

    if(selectCondition.value == "years"){
        location.href = `/admin/selectYearChart2?condition=${selectCondition.value}`;

    }
    if(selectCondition.value == "months"){
        location.href = `/admin/totalStatistics2`;

    }

});


// chart3 숙소별 성별 이용 내역
function showGenderCHart3(accNo, accName){

    document.getElementById("container3").innerHTML = "";

    const params3 = new URL(location.href).searchParams;
    let year = params3.get("year");
    let month = params3.get("month");
    if(params3.get("year") == null){
        let today = new Date();
        year = today.getFullYear();
        month = today.getMonth() + 1;
    }

    document.getElementById("chart3Title").innerText = accName;

    // 월별
    if(params3.get("condition") == null || params3.get("condition") == "months"){

        fetch(`/admin/selectAccGenderChart3?accNo=${accNo}&year=${year}&month=${month}`)
        .then(resp => resp.json())
        .then(chart3 => {
            console.log(chart3);

            // 결과값이 없는 경우
            if(chart3.length == 0){
                document.getElementById("container3").innerHTML = "<h2>해당 숙소는 예약건수가 없습니다.</h2>"
                return;
            }


            const manChartData = {
                "A" : ""
            };
            const womanChartData = {
                "A" : ""
            };

            for(const i of chart3){

                if(i.USER_GENDER == 'M'){
                    manChartData.A = i.RES_COUNT;
    
                }
                if(i.USER_GENDER == 'F'){
                    womanChartData.A = i.RES_COUNT;
                }
            }
            
            Highcharts.chart('container3', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: '',
                    align: 'left'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: [{
                        name: '남자',
                        y: manChartData.A,
                        sliced: true,
                        selected: true
                    },  {
                        name: '여자',
                        y: womanChartData.A
                    }]
                }]
            });
    
            return;
    
        })
        .catch(e => console.log(e))


    }    

    // 연도별
    if(params3.get("condition") == "years"){

        

        fetch(`/admin/selectAccGenderChart3Year?accNo=${accNo}&year=${year}`)
        .then(resp => resp.json())
        .then(chart3 => {
            console.log(chart3);

            // 결과값이 없는 경우
            if(chart3.length == 0){
                document.getElementById("container3").innerHTML = "<h2>해당 숙소는 예약건수가 없습니다.</h2>"
                return;
            }


            const manChartData = {
                "A" : ""
            };
            const womanChartData = {
                "A" : ""
            };

            for(const i of chart3){

                if(i.USER_GENDER == 'M'){
                    manChartData.A = i.RES_COUNT;
    
                }
                if(i.USER_GENDER == 'F'){
                    womanChartData.A = i.RES_COUNT;
                }
            }
            
            Highcharts.chart('container3', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: '',
                    align: 'left'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: [{
                        name: '남자',
                        y: manChartData.A,
                        sliced: true,
                        selected: true
                    },  {
                        name: '여자',
                        y: womanChartData.A
                    }]
                }]
            });
    
            return;
    
        })
        .catch(e => console.log(e))

    }



};