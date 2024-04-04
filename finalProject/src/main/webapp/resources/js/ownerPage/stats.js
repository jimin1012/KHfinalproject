(() => {

    fetch("getStatsData", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', // 콘텐츠 타입을 JSON으로 지정
        },
        body: JSON.stringify({ "accNo": accNo })
    })
        .then(resp => resp.json())
        .then(data => {

            // console.log(data);

            function updatePeopleCount(data) {
                const thisYear = new Date().getFullYear();
                const stats = {
                    thisYear: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0 },
                    oneYearBefore: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0 },
                    twoYearsBefore: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0 }
                };

                data.forEach(item => {
                    const startDate = new Date(item.resnStartDate);
                    const endDate = new Date(item.resnEndDate);
                    let currentDate = new Date(startDate);

                    while (currentDate <= endDate) {
                        const yearDiff = thisYear - currentDate.getFullYear();
                        const month = currentDate.getMonth() + 1; // getMonth()는 0에서 시작하므로 +1

                        // item.resPeople을 정수로 변환
                        const resPeopleNumber = parseInt(item.resPeople, 10);

                        if (yearDiff === 0) {
                            stats.thisYear[month.toString()] += resPeopleNumber;
                        } else if (yearDiff === 1) {
                            stats.oneYearBefore[month.toString()] += resPeopleNumber;
                        } else if (yearDiff === 2) {
                            stats.twoYearsBefore[month.toString()] += resPeopleNumber;
                        }

                        // 다음 달로 이동
                        currentDate.setMonth(currentDate.getMonth() + 1);
                    }
                });

                // console.log(stats);
                return stats;
            }

            function updateProfitCount(data) {
                const thisYear = new Date().getFullYear();
                const stats = {
                    thisYear: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0 },
                    oneYearBefore: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0 },
                    twoYearsBefore: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0 }
                };

                data.forEach(item => {
                    const startDate = new Date(item.resnStartDate);
                    const endDate = new Date(item.resnEndDate);
                    let currentDate = new Date(startDate);

                    // 각 예약에 대한 총 개월 수 계산
                    const monthsCount = ((endDate.getFullYear() - startDate.getFullYear()) * 12) + (endDate.getMonth() - startDate.getMonth() + 1);

                    // roomPrice를 월 수로 나누어 평균 가격 계산
                    const avgRoomPrice = item.roomPrice / monthsCount;

                    while (currentDate <= endDate) {
                        const yearDiff = thisYear - currentDate.getFullYear();
                        const month = currentDate.getMonth() + 1; // getMonth()는 0에서 시작하므로 +1

                        if (yearDiff === 0) {
                            stats.thisYear[month.toString()] += avgRoomPrice;
                        } else if (yearDiff === 1) {
                            stats.oneYearBefore[month.toString()] += avgRoomPrice;
                        } else if (yearDiff === 2) {
                            stats.twoYearsBefore[month.toString()] += avgRoomPrice;
                        }

                        // 다음 달로 이동
                        currentDate.setMonth(currentDate.getMonth() + 1);
                    }
                });

                // 모든 월의 값을 반올림
                Object.keys(stats).forEach(year => {
                    Object.keys(stats[year]).forEach(month => {
                        stats[year][month] = Math.round(stats[year][month]);
                    });
                });

                return stats;
            }


            // 숙소 이름
            let accName = "";
            // 방문객 field
            let resPeopleData = [0];
            let thisYearPeopleData = [0];
            let oneYearBeforePeopleData = [0];
            let twoYearsBeforePeopleData = [0];
            // 정산금 field
            let profitData = [0];
            let thisYearProfitData = [0];
            let oneYearBeforeProfitData = [0];
            let twoYearsBeforeProfitData = [0];

            if(data.length != 0){

                // 숙소 이름
                accName = data[0].accName;
    
                // 방문객 field
                resPeopleData = updatePeopleCount(data);
                thisYearPeopleData = Object.values(resPeopleData.thisYear);
                oneYearBeforePeopleData = Object.values(resPeopleData.oneYearBefore);
                twoYearsBeforePeopleData = Object.values(resPeopleData.twoYearsBefore);
    
                // 정산금 field
                profitData = updateProfitCount(data);
                thisYearProfitData = Object.values(profitData.thisYear);
                oneYearBeforeProfitData = Object.values(profitData.oneYearBefore);
                twoYearsBeforeProfitData = Object.values(profitData.twoYearsBefore);
                
            }




            // 년도 가져오기
            const now = new Date();
            const thisYear = now.getFullYear() + "년";
            const oneYearAgo = now.getFullYear() - 1 + "년";
            const twoYearAgo = now.getFullYear() - 2 + "년";


            // 차트 시작
            Highcharts.chart('resPeopleChart', {

                title: {
                    text: '연별 대비 방문객 수'
                },

                subtitle: {
                    text: accName
                },

                yAxis: {
                    title: {
                        text: '방문 인원'
                    }
                },

                xAxis: {
                    categories: [
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
                        'Sep', 'Oct', 'Nov', 'Dec'
                    ]
                },

                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        }

                    }
                },

                series: [{
                    name: twoYearAgo,
                    data: twoYearsBeforePeopleData
                }, {
                    name: oneYearAgo,
                    data: oneYearBeforePeopleData
                }, {
                    name: thisYear,
                    data: thisYearPeopleData
                }],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }

            });


            Highcharts.chart('profitChart', {

                title: {
                    text: '예년 대비 매출 지표'
                },

                subtitle: {
                    text: accName
                },

                yAxis: {
                    title: {
                        text: '정산 금액'
                    }
                },

                chart: {
                    backgroundColor: '#FFFF',
                    type: 'column'
                },
                xAxis: {
                    categories: [
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
                        'Sep', 'Oct', 'Nov', 'Dec'
                    ]
                },
                legend: {
                    layout: '매출액',
                    backgroundColor: '#FFFFFF',
                    floating: true,
                    align: 'left',
                    x: 100,
                    verticalAlign: 'top',
                    y: 70
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br/>',
                    pointFormat: '{point.category}: {point.y}'
                },
                series: [{
                    name: twoYearAgo,
                    data: twoYearsBeforeProfitData
                }, {
                    name: oneYearAgo,
                    data: oneYearBeforeProfitData
                }, {
                    name: thisYear,
                    data: thisYearProfitData
                }]
            });



        })
        .catch((error) => {
            console.error("Error:", error);
            // 오류 처리
        });

})();



