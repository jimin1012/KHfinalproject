$(function(){

    $("tbody > tr").on("click", function(){
        // alert("확인");
        $(".tRow").removeClass("selectedApply"); // 목록 tr태그의 클래스 제거
        $(".tRow").addClass("unselectedApply"); // 목록 tr태그의 클래스 추가
        
        
        if( $(this).next(".tableSlide").css("display") == "none"){
            $(this).siblings(".tableSlide").slideUp();
            $(this).siblings(".tableSlide").children().hide();
            $(this).next(".tableSlide").slideDown();
            $(this).next(".tableSlide").children().show();
            
            $(this).addClass("selectedApply"); // 선택된 목록의 클래스 제거
            $(this).removeClass("unselectedApply"); // 선택된 목록의 클래스 제거
            
        } else{
            $(this).next(".tableSlide").children().hide();
            $(this).next(".tableSlide").slideUp();
        }
        
        
    })
})



// 관리자 사업승인 요청 상태에 따른 목록 조회
const selectAccState = document.getElementById("selectAccState");
const options1 = document.querySelectorAll("#selectAccState > option");

const changeAccState = document.querySelectorAll(".changeAccState");
const options2 = document.querySelectorAll(".changeAccState > option");

if(selectAccState != null){

    selectAccState.addEventListener("change", ()=>{

        const state = selectAccState.value; 
     
        location.href = location.pathname + "?state=" + state;
        
    })

    // tr태그 안의 사업자 승인 요청 상태 변경
    function updateAccStateFl(userNo, accNo, bossNo, select){

        console.log(bossNo);
    
        const params = new URL(location.href).searchParams;

        const op3 = select.children;

        // 요청이 승인된 목록에서 상태변경X
        if(params.get("state") == 'accept'){
            if(select.value == 'wait' || select.value == 'refuse'){
                alert("이미 승인 처리된 요청입니다.");
        
                for(let op of op3){
                    if(op.value == 'accept'){
                        op.selected = true;
                    }
                }
            }
            return;
        }


        // 사업자 요청 -> 승인
        if(select.value == 'accept'){

            fetch("/admin/updateAccStateFl", {
                method : "PUT",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({"accNo" : accNo})
            })
            .then( resp => resp.text())
            .then( result => {
                
                if(result == 0){
                    alert("승인 처리 실패");
                    return;
                }
                
                // 승인 처리된 tr 삭제
                const tr1 = select.parentElement.parentElement;
                const tr2 = tr1.nextElementSibling;
                tr1.remove();
                tr2.remove();

                return;

            })
            .catch(e => console.log(e))

        }


        // 사업자 요청 -> 거절
        if(select.value == 'refuse'){

            fetch("/admin/deleteAccStateFl",{
                method : "DELETE",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({
                    "accNo" : accNo, 
                    "bossNo" : bossNo,
                    "userNo" : userNo
                })
            })
            .then(resp => resp.text())
            .then(result => {

                if(result == 0){
                    alert("요청 거절 실패");
                    return;
                }

                // 거절 처리된 tr 삭제
                const tr1 = select.parentElement.parentElement;
                const tr2 = tr1.nextElementSibling;
                tr1.remove();
                tr2.remove();

                return;


            })
            .catch( e => console.log(e))



        }






    }
}

// 사업자 승인 목록 조회(2)
(function(){
    const params = new URL(location.href).searchParams;

    const state = params.get("state");

    for(let op of options1){
        if(op.value == state){
            op.selected = true;
        }
    }

    for(let op of options2){
        if(op.value == state){
            op.selected = true;
        }
    }


})();









