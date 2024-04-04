
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
                $(".tableTitle1").text(`${op.value} 예약/구매 건수`);
            }
        }
    }

    // 성별 선택
    if(params.get("condition") == "gender"){

        const options2 = document.querySelectorAll("#selectCondition > option");

        for(let op of options2){
            if(op.value == "gender"){
                op.selected = true;
            }
        }
    }

    // // 나이대별 선택
    if(params.get("condition") == "age"){

        const options3 = document.querySelectorAll("#selectCondition > option");
        console.log("확인2")

        for(let op of options3){
            if(op.value == "age"){
                op.selected = true;
            }
        }
    }



})();








// 나이별 선택 시
const selectCondition = document.getElementById("selectCondition");


selectCondition.addEventListener("change", () => {

    if(selectCondition.value == "age"){
        location.href = `/admin/selectAgeChart1?condition=${selectCondition.value}`;

    }
    if(selectCondition.value == "gender"){
        location.href = `/admin/totalStatistics`;

    }


})

// 날짜 조회 chart1
const selectYM = document.getElementById("selectYearMonth");
selectYM.addEventListener("change", e =>{
    
    const year = selectYM.value.substr(0,4);
    let month = selectYM.value.substr(6,2);

    const params2 = new URL(location.href).searchParams;

    // 성별
    if(params2.get("condition") == null || params2.get("condition") == "gender"){
        location.href = `/admin/selectYearMonthChart1?year=${year}&month=${month}`;
    }
    // 나이대별
    if(params2.get("condition") == "age"){
        location.href = `/admin/selectAgeChart1?condition=${selectCondition.value}&year=${year}&month=${month}`;
    }



});


