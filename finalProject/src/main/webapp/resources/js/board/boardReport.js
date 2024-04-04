
// 자유게시판 게시글 신고
const reportBtn = document.getElementById("reportBtn");
const modalBoard = document.querySelector(".modalBoard");
const modalComment = document.querySelector(".modalComment");

const reportContent = document.getElementsByName("reportContent");
const writeEtcB = document.getElementById("writeEtcB");
const writeEtcC = document.getElementById("writeEtcC");

// 게시글 신고 작성 모달 열기
if(reportBtn != null){
    
    reportBtn.addEventListener("click", e => {

        if(loginMemberNo.trim().length ==0){
            alert("로그인한 회원만 신고할 수 있습니다.");
            return;
        }
        if(writerNo == loginMemberNo){
            alert("본인이 작성한 게시글은 신고할 수 없습니다.");
            return;
        }
        
        modalBoard.classList.toggle("show");
        writeEtcB.setAttribute("disabled", true);
    })
}


// 게시글 신고 모달창 닫는 함수
function closeModalBoard(){

    writeEtcB.value = "";
    
    modalBoard.classList.toggle("hide"); // hide 클래스 추가

    for(let r of reportContent){
        r.checked = false;
    }

           
    setTimeout( function(){ // 0.45초 후 동작
        modalBoard.classList.toggle("hide"); // hide 클래스 제거
        modalBoard.classList.toggle("show"); // remove
    } ,450); 
    
}


// 게시글 신고 모달창 닫기
if(document.getElementById("modalCloseBtn") != null){
    document.getElementById("modalCloseBtn").addEventListener("click", ()=>{
        closeModalBoard();
    })
}



// 댓글 신고 작성 모달 열기
function openCommentReport( commentNo, cUserNo ){
    console.log(commentNo);

    if(cUserNo == loginMemberNo){
        alert("본인이 작성한 댓글은 신고할 수 없습니다.");
        return;
    }

    modalComment.classList.toggle("show");
    const cNo = document.getElementById("cNo");
    cNo.value = commentNo;
    writeEtcC.setAttribute("disabled", true);

};


// 댓글 신고 모달창 닫는 함수
function closeModalComment(){

    writeEtcC.value = "";
    
    modalComment.classList.toggle("hide"); // hide 클래스 추가

    for(let r of reportContent){
        r.checked = false;
    }


    const cNo = document.getElementById("cNo");
    cNo.value = "";
           
    setTimeout( function(){ // 0.45초 후 동작
        modalComment.classList.toggle("hide"); // hide 클래스 제거
        modalComment.classList.toggle("show"); // remove
    } ,450); 
    
}


// 댓글 신고 모달창 닫기
if(document.getElementById("modalCommentCloseBtn") != null){
    document.getElementById("modalCommentCloseBtn").addEventListener("click", ()=>{
        closeModalComment();
    })
}


/* 기타 사유 작성 */
if(reportContent != null){
    for(let r of reportContent){
        r.addEventListener("click", e =>{
            if(e.target.value == '기타'){

                if(cNo.value != ""){
                    writeEtcC.removeAttribute("disabled");
                    writeEtcC.focus();
                }else{
                    writeEtcB.removeAttribute("disabled");
                    writeEtcB.focus();
                }

                
            } else{
                if(cNo.value != ""){
                    writeEtcC.value = "";
                    writeEtcC.setAttribute("disabled", true);
                }else{
                    writeEtcB.value = "";
                    writeEtcB.setAttribute("disabled", true);
                }
            }
        })
    }
}


// 신고 제출
const sendReportBtn = document.getElementsByClassName("sendReportBtn");
if(sendReportBtn != null){

    

    for(let sr of sendReportBtn){

        sr.addEventListener("click", ()=>{
            
            if(loginMemberNo.trim().length ==0){
                alert("로그인한 회원만 신고할 수 있습니다.");
                return;
            }

            let repCt;
            let sendFlag = false;

            // 신고 사유 선택 확인
            for(let r of reportContent){ 
                if(r.checked){
                    sendFlag = true;
                    repCt= r.value;
                }
            }
            
            if(!sendFlag){
                alert("신고 사유를 선택해주세요.");
                return;
            }

            // 기타 선택 시 기타사유를 작성하지 않은 경우
            if(repCt == "기타"){
               console.log(repCt);
               console.log(document.getElementById("cNo").value);
               
               // 댓글
               if(document.getElementById("cNo").value != ""){
                   console.log(writeEtcC.value);
                   if(writeEtcC.value.trim().length == 0){
                       sendFlag = false;
                    }
                } else{ // 게시글
                    console.log(writeEtcB.value);
                    if(writeEtcB.value.trim().length == 0){
                       sendFlag = false;
                    }
                }
            }

            if(!sendFlag){
                alert("기타 신고 사유를 작성해주세요.");
                return;
            }


            sendReport(repCt);
            
        })
    }
}


// 게시글, 댓글 신고 전송
function sendReport(repCt){

    
    // 댓글 신고 
    const cNo = document.getElementById("cNo");
    if(cNo.value != ""){

        fetch("/report/insertCommentReport",{
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
                "userNo" : loginMemberNo,
                "replyNo" : cNo.value,
                "reportContent" : repCt,
                "etcContent" : writeEtcC.value
            })
        })
        .then(resp => resp.text())
        .then( result => {
            console.log(result);
            if(result == 0){
                alert("신고 실패");
                return;
            }
    
            alert("해당 댓글이 신고되었습니다.");
            location.href = `/board/${boardCode}/${boardNo}`;
            
    
        })
        .catch(e => console.log(e))

        return;
    }





    // 게시글 신고
    fetch("/report/insertBoardReport",{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
            "userNo" : loginMemberNo,
            "boardNo" : boardNo,
            "reportContent" : repCt,
            "etcContent" : writeEtcB.value
        })
    })
    .then(resp => resp.text())
    .then( result => {
        console.log(result);
        if(result == 0){
            alert("신고 실패");
            return;
        }

        alert("해당 게시글이 신고되었습니다.");
        location.href = `/board/${boardCode}`;
        

    })
    .catch(e => console.log(e))

}