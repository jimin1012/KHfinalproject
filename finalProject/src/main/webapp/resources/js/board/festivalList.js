

// 상단 시기별, 지역별 조회
(function(){
    const select = document.getElementById("selectDate");
    const optionD = document.querySelectorAll("#selectDate > option");
    const optionL = document.querySelectorAll("#selectLocation > option");

    if(select != null){

        const params = new URL(location.href).searchParams;

        const selectDate = params.get("selectDate");
        const selectLocation = params.get("selectLocation");

        
        for(let op of optionD){
            if(op.value == selectDate){
                op.selected = true;
            }
        }
        for(let op of optionL){
            if(op.value == selectLocation){
                op.selected = true;
            }
        }

    }
})();


// 카테고리 정렬
const dateCate = document.getElementById("dateCate");
const starCate = document.getElementById("starCate");
const readCate = document.getElementById("readCate");

// 축제일순 ()
dateCate.addEventListener("click", (e) =>{

    const params = new URL(location.href).searchParams;

    if( params.get("selectDate") != ""){ // 쿼리스트링에 selectDate가 있을 경우
        
        location.href = location.pathname + "?cp=1&selectDate=" + params.get("selectDate") + "&selectLocation=" + params.get("selectLocation") + "&order=date";

    } else{
        location.href = location.pathname + "?cp=1&order=date";
    }

})

// 별점 순
starCate.addEventListener("click", e =>{

    const params = new URL(location.href).searchParams;

    if( params.get("selectDate") != ""){ // 쿼리스트링에 selectDate가 있을 경우
        
        location.href = location.pathname + "?cp=1&selectDate=" + params.get("selectDate") + "&selectLocation=" + params.get("selectLocation") + "&order=star";

    } else{
        location.href = location.pathname + "?cp=1&order=star";
    }
})


// 조회수 순
readCate.addEventListener("click", e =>{

    const params = new URL(location.href).searchParams;

    if( params.get("selectDate") != ""){ // 쿼리스트링에 selectDate가 있을 경우
        
        location.href = location.pathname + "?cp=1&selectDate=" + params.get("selectDate") + "&selectLocation=" + params.get("selectLocation") + "&order=read";

    } else{
        location.href = location.pathname + "?cp=1&order=read";
    }

})

