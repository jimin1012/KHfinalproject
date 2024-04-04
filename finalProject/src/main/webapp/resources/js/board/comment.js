
// 댓글 목록 조회 
function selectCommentList() {
    fetch("/comment?boardNo=" + boardNo) // GET 방식은 주소에 파라미터를 담아서 전달 
        .then(response => response.json()) // 응답객체 -> 파싱
        .then(cList => { // cList : 댓글목록 (객체 배열)
            console.log(cList);

            // 화면에 출력되어 있는 댓글 목록 삭제
            const commentList = document.getElementById("commentList"); // ul태그
            commentList.innerHTML = "";

            // cList에 저장된 요소를 하나씩 접근
            for (let comment of cList) {
                // 댓글 한 줄을 나타내는 li 엘리먼트를 생성합니다.
                const commentRow = document.createElement("li");
                commentRow.classList.add("commonC");
                if (comment.parentNo != 0) {
                    commentRow.classList.add("child");
                }

                // 프로필 이미지
                const pImage = document.createElement("div");
                pImage.classList.add("pImage");

                const profileImage = document.createElement("img");
                if (comment.profileImage != null) {
                    profileImage.setAttribute("src", comment.profileImage);
                } else {
                    profileImage.setAttribute("src", "/resources/images/main/user.png");
                }
                pImage.appendChild(profileImage);

                // 오른쪽 영역
                const rightSide = document.createElement("div");
                rightSide.classList.add("rightSide");

                // side1
                const side1 = document.createElement("div");
                side1.classList.add("side1");

                const userNickName = document.createElement("div");
                userNickName.classList.add("userName");
                userNickName.textContent = comment.userNickName;
                userNickName.addEventListener("click",function(){ // 쪽지 이벤트 추가
                    showMessageModal(comment.userNo, comment.userNickName, this, 'comment')
                });
                const etc = document.createElement("div");
                etc.classList.add("etc");
                etc.textContent = comment.commentCreateDate;

                // 축제 게시판 별점 
                if(boardCode == 2){
                    const showStar = document.createElement("span");
                    showStar.classList.add("showStar");
                    
                    for(let x = 1; x<= comment.commentStar; x++){
                        const star = document.createElement("span");
                        star.classList.add("fa-solid", "fa-star", "fa-lg");
                        showStar.appendChild(star);
                    }
                    
                    userNickName.appendChild(showStar);
                }

                const iconSpan = document.createElement("span");
                etc.appendChild(iconSpan);

                // span에 아이콘을 추가합니다.
                const reportIcon = document.createElement("i");
                reportIcon.classList.add("fa-solid", "fa-circle-exclamation"); // 아이콘 클래스 설정
                reportIcon.addEventListener("click",function(){ // 신고 이벤트 추가
                    openCommentReport(comment.commentNo,comment.userNo)
                });
                iconSpan.appendChild(reportIcon); // exclamationIcon을 iconSpan에 추가합니다.
                
                

                side1.appendChild(userNickName);
                side1.appendChild(etc);

                // 댓글 내용
                
                const commentContent = document.createElement("div");

                // xss
                comment.commentContent = comment.commentContent.replaceAll("&amp;", "&");
                comment.commentContent= comment.commentContent.replaceAll("&lt;", "<");
                comment.commentContent = comment.commentContent.replaceAll("&gt;", ">");
                comment.commentContent = comment.commentContent.replaceAll("&quot;", "\"");

                commentContent.classList.add("commentContent");
                commentContent.textContent = comment.commentContent;

                // side2
                const side2 = document.createElement("div");
                side2.classList.add("side2");


                // 답글 달기 버튼
                const childCommentBtn = document.createElement("div");
                childCommentBtn.classList.add("childCommentBtn");
                childCommentBtn.textContent = "답글 달기";
                
                const replyIcon = document.createElement("i");
                replyIcon.classList.add("fa-regular", "fa-comment"); // 아이콘 클래스 설정
                childCommentBtn.appendChild(replyIcon); // replyIcon을 childCommentBtn에 추가합니다.
                childCommentBtn.addEventListener("click",function(){
                    showInsertComment(comment.commentNo, this);
                });
                


                // 버튼 영역
                const buttonArea = document.createElement("div");
                buttonArea.classList.add("buttonArea");

                // 댓글 작성자와 로그인한 사용자가 같으면 수정/삭제 버튼 추가
                if (comment.userNo == loginMemberNo) {
                    const updateBtn = document.createElement("button");
                    updateBtn.classList.add("btn22");
                    updateBtn.textContent = "수정";
                    updateBtn.addEventListener("click", function () {
                        showUpdateComment(comment.commentNo, this);
                    });

                    const deleteBtn = document.createElement("button");
                    deleteBtn.classList.add("btn22");
                    deleteBtn.textContent = "삭제";
                    deleteBtn.addEventListener("click", function () {
                        deleteComment(comment.commentNo);
                    });

                    buttonArea.appendChild(updateBtn);
                    buttonArea.appendChild(deleteBtn);
                }

                side2.appendChild(childCommentBtn);
                side2.appendChild(buttonArea);

                rightSide.appendChild(side1);
                rightSide.appendChild(commentContent);
                rightSide.appendChild(side2);

                commentRow.appendChild(pImage);
                commentRow.appendChild(rightSide);

                commentList.appendChild(commentRow);
                document.getElementsByClassName("commentListArea")[0].scrollTop = document.getElementsByClassName("commentListArea")[0].scrollHeight;
            }
        })
        .catch(err => console.error('댓글 목록 조회 중 오류 발생:', err));
}


// 댓글 등록 ------------------------------------------------------------------------

const addComment = document.getElementById("addComment");
const commentContent = document.getElementById("commentContent");

addComment.addEventListener("click", e => { // 댓글 등록 버튼이 클릭이 되었을 때
    
    let starRate = document.getElementsByName("starRate");
    let selected = Array.from(starRate).find(starRate => starRate.checked);
   

    // 1) 로그인이 되어있나? -> 전역변수 memberNo 이용
    if (loginMemberNo == "") { // 로그인 X
        alert("로그인 후 이용해주세요.");
        return;
    }

    // 2) 댓글 내용이 작성되어있나?
    if (commentContent.value.trim().length == 0) { // 미작성인 경우
        alert("댓글을 작성한 후 버튼을 클릭해주세요.");

        commentContent.value = ""; // 띄어쓰기, 개행문자 제거
        commentContent.focus();
        return;
    }

    // 3) AJAX를 이용해서 댓글 내용 DB에 저장(INSERT)

    const data = {
        "commentContent": commentContent.value,
        "boardNo": boardNo,
        "userNo": loginMemberNo // JS 객체
    };

    if(boardCode == 2){
        data.commentStar = selected.value;
    }



    fetch("/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data) // JS 객체 -> JSON 파싱
    })
        .then(resp => resp.text())
        .then(result => {
            if (result > 0) { // 등록 성공
                alert("댓글이 등록되었습니다.");
                if(boardCode == 2){
                    star2.nextElementSibling.classList.remove("fa-solid");
                    star3.nextElementSibling.classList.remove("fa-solid");
                    star4.nextElementSibling.classList.remove("fa-solid");
                    star5.nextElementSibling.classList.remove("fa-solid");
                    star2.nextElementSibling.classList.add("fa-regular");
                    star3.nextElementSibling.classList.add("fa-regular");
                    star4.nextElementSibling.classList.add("fa-regular");
                    star5.nextElementSibling.classList.add("fa-regular"); // 별점 리셋
                    selected.checked = false;
                    document.getElementById("star1").checked = true; // 별점 리셋
                }


                commentContent.value = ""; // 작성했던 댓글 삭제
                selectCommentList(); // 비동기 댓글 목록 조회 함수 호출
                // -> 새로운 댓글이 추가되어짐

            } else { // 실패
                alert("댓글 등록에 실패했습니다...");
            }
        })
        .catch(err => console.log(err));
});

// 댓글 삭제
function deleteComment(commentNo) {

    if (confirm("정말로 삭제 하시겠습니까?")) {

        fetch("/comment", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: commentNo // 값 하나만 전달 시에는 JSON 필요 없음 

        })
            .then(resp => resp.text())
            .then(result => {
                if (result > 0) {
                    alert("삭제되었습니다");
                    selectCommentList(); // 목록을 다시 조회해서 삭제된 글을 제거
                } else {
                    alert("삭제 실패");
                }
            })
            .catch(err => console.log(err));
    }
}



function showUpdateComment(commentNo, element) {
    // 댓글 내용을 감싸고 있는 div 가져오기
    const commentDiv = element.closest('.commonC');

    // 댓글 내용 가져오기
    const commentContent = commentDiv.querySelector('.commentContent').innerText.trim();

    // 댓글 내용을 수정할 textarea 생성
    const textarea = document.createElement('textarea');
    textarea.className = 'updateTextarea';
    textarea.maxLength = '1300'
    textarea.value = commentContent;

    // 기존 댓글 내용을 textarea로 교체
    const commentContentDiv = commentDiv.querySelector('.commentContent');
    commentContentDiv.innerHTML = '';
    commentContentDiv.appendChild(textarea);

    // 기존 버튼을 수정 버튼으로 변경
    const buttonArea = commentDiv.querySelector('.buttonArea');
    buttonArea.innerHTML = `
        <button class="btn22" onclick="updateComment(${commentNo}, this)">수정 </button>
        <button class="btn22" onclick="cancelUpdateComment(${commentNo}, this)">취소</button>
    `;
}

// 수정 완료 버튼 클릭 시
function updateComment(commentNo, element) {
    const commentDiv = element.closest('.commonC');
    const updatedContent = commentDiv.querySelector('.updateTextarea').value;

    const data = {
        "commentContent": updatedContent,
        "commentNo" : commentNo // JS 객체
    };

    fetch("/comment", {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body : JSON.stringify(data) // JS 객체 -> JSON 파싱
    })
        .then(resp => resp.text())
        .then(result => {
            if (result > 0) {
                alert("댓글이 수정되었습니다.");
                selectCommentList();
            } else {
                alert("댓글 수정 실패");
            }
        })
        .catch(err => console.log(err));

    const commentContentDiv = commentDiv.querySelector('.commentContent');
    commentContentDiv.innerHTML = updatedContent;

    // 버튼을 다시 수정/삭제 버튼으로 변경
    const buttonArea = commentDiv.querySelector('.buttonArea');
    buttonArea.innerHTML = `
        <button class="btn22" onclick="showUpdateComment(${commentNo}, this)">수정</button>
        <button class="btn22" onclick="deleteComment(${commentNo})">삭제</button>
    `;
}

// 취소 버튼 클릭 시
function cancelUpdateComment(commentNo, element) {
    const commentDiv = element.closest('.commonC');
    const originalContent = commentDiv.querySelector('.updateTextarea').value;

    // 기존 댓글 내용으로 되돌리기
    const commentContentDiv = commentDiv.querySelector('.commentContent');
    commentContentDiv.innerHTML = originalContent;

    // 버튼을 다시 수정/삭제 버튼으로 변경
    const buttonArea = commentDiv.querySelector('.buttonArea');
    buttonArea.innerHTML = `
        <button class="btn22" onclick="showUpdateComment(${commentNo}, this)">수정</button>
        <button class="btn22" onclick="deleteComment(${commentNo})">삭제</button>
    `;
}


function showInsertComment(parentNo, btn) {
    // 부모 댓글 번호, 클릭한 답글 버튼


    // ** 답글 작성 textarea가 한 개만 열릴 수 있도록 만들기 **
    const temp = document.getElementsByClassName("commentInsertContent");

    if (temp.length > 0) { // 답글 작성 textara가 이미 화면에 존재하는 경우

        if (confirm("다른 답글을 작성 중입니다. 현재 댓글에 답글을 작성 하시겠습니까?")) {
            temp[0].nextElementSibling.remove(); // 버튼 영역부터 삭제
            temp[0].remove(); // textara 삭제 (기준점은 마지막에 삭제해야 된다!)

        } else {
            return; // 함수를 종료시켜 답글이 생성되지 않게함.
        }
    }

    // 답글을 작성할 textarea 요소 생성
    const textarea = document.createElement("textarea");
    textarea.classList.add("commentInsertContent");
    textarea.maxLength = '1300';

    // 답글 버튼의 부모의 뒤쪽에 textarea 추가
    // after(요소) : 뒤쪽에 추가
    btn.parentElement.parentElement.parentElement.after(textarea);


    // 답글 버튼 영역 + 등록/취소 버튼 생성 및 추가
    const commentBtnArea = document.createElement("div");
    commentBtnArea.classList.add("comment-btn-area");


    const insertBtn = document.createElement("button");
    insertBtn.innerText = "등록";
    insertBtn.setAttribute("onclick", "insertChildComment(" + parentNo + ", this)");


    const cancelBtn = document.createElement("button");
    cancelBtn.innerText = "취소";
    cancelBtn.setAttribute("onclick", "insertCancel(this)");

    // 답글 버튼 영역의 자식으로 등록/취소 버튼 추가
    commentBtnArea.append(insertBtn, cancelBtn);

    // 답글 버튼 영역을 화면에 추가된 textarea 뒤쪽에 추가
    textarea.after(commentBtnArea);

}


// 답글 취소
function insertCancel(btn) {
    // 취소
    btn.parentElement.previousElementSibling.remove(); // 취소의 부모의 이전 요소(textarea) 제거
    btn.parentElement.remove(); // 취소의 부모 요소(comment-btn-area) 제거
}


// 답글 등록
function insertChildComment(parentNo, btn) {
    // 부모 댓글 번호, 답글 등록 버튼

    // 누가?                loginMemberNo(로그인한 회원의 memberNo )(전역변수)
    // 어떤 내용?           textarea에 작성된 내용
    // 몇번 게시글?         현재 게시글 boardNo (전역변수)
    // 부모 댓글은 누구?    parentNo (매개변수)

    // 답글 내용
    
    const commentContent = btn.parentElement.previousElementSibling.value;
    // 답글 내용이 작성되지 않은 경우
    if (commentContent.trim().length == 0) {
        alert("답글 작성 후 등록 버튼을 클릭해주세요.");
        btn.parentElement.previousElementSibling.value = "";
        btn.parentElement.previousElementSibling.focus();
        return;
    }
    


    const data = {
        "commentContent": commentContent,
        "boardNo": boardNo,
        "userNo": loginMemberNo,
        "parentNo": parentNo 
    };

    fetch("/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body : JSON.stringify(data) // JS 객체 -> JSON 파싱
    })
        .then(resp => resp.text())
        .then(result => {
            if (result > 0) { // 등록 성공
                alert("답글이 등록되었습니다.");
                selectCommentList(); // 비동기 댓글 목록 조회 함수 호출

            } else { // 실패
                alert("답글 등록에 실패했습니다...");
            }
        })
        .catch(err => console.log(err));


}

