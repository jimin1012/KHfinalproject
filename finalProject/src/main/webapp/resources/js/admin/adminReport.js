// 게시글 / 댓글 신고 목록 이동
const boardReportList = document.getElementById("boardReportList");
const commentReportList = document.getElementById("commentReportList");

// 게시글 신고 목록으로 이동
boardReportList.addEventListener("click", ()=>{
    location.href = "boardReportList";
})

// 댓글 신고 목록으로 이동
commentReportList.addEventListener("click", ()=>{
    location.href = "commentReportList";
})





// 신고된 게시글 처리
const changeState = document.getElementsByClassName("changeState");
const finishReport = document.getElementsByClassName("finishReport");

const check = location.pathname.split("/")[2];

function updateBoardReportSt(boardNo, btn){
        
    // 처리대기 상태이면 신고처리X
    if(btn.previousElementSibling.value == 'wait'){
        alert("신고된 게시글/댓글 처리를 선택하세요.");
        return;
    }
        
    fetch("/admin/updateBoardReportSt", {
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({ 
            "boardNo" : boardNo,
            "state" :  btn.previousElementSibling.value
        })
    })
    .then(resp => resp.text())
    .then( result => {
        if(result == 0){
            alert("신고처리 실패");
            return;
        }
        location.href = "boardReportList";
    })
    .catch(e => console.log(e))
}



// 신고된 댓글 처리

function updateCommentReportSt(commentNo, btn){
        
    // 처리대기 상태이면 신고처리X
    if(btn.previousElementSibling.value == 'wait'){
        alert("신고된 게시글/댓글 처리를 선택하세요.");
        return;
    }
        
    fetch("/admin/updateCommentReportSt", {
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({ 
            "commentNo" : commentNo,
            "state" :  btn.previousElementSibling.value
        })
    })
    .then(resp => resp.text())
    .then( result => {

        console.log(result)
        if(result == 0){
            alert("신고처리 실패");
            return;
        }
        location.href = "commentReportList";
    })
    .catch(e => console.log(e))
}








// 신고별 목록 조회
const selectReportST = document.getElementById("selectReportST");


selectReportST.addEventListener("change", e => {

    if(check == 'boardReportList'){
        if(selectReportST.value == 'all'){
            location.href = "boardReportList";
            return;
        }
        location.href = "boardReportList?state="+ selectReportST.value;
    }

    if(check == 'commentReportList'){
        if(selectReportST.value == 'all'){
            location.href = "commentReportList";
            return;
        }
        location.href = "commentReportList?state="+ selectReportST.value;
    }
})

const options = document.querySelectorAll("#selectReportST > option");
(function(){
    const params = new URL(location.href).searchParams;
    const state = params.get("state");

    for(let op of options){
        if(op.value == state){
            op.selected = true;
        }
    }

})();
