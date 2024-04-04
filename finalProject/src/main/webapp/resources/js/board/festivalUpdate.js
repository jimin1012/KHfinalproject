/* 축제 게시판js */

const boardFrm = document.getElementById("boardFrm");
const boardTitle = document.getElementById("boardTitle");
const writeBtn = document.getElementById("writeBtn");

const festivalStartDate =document.getElementById("festivalStartDate");
const festivalEndDate =document.getElementById("festivalEndDate");
const festivalAddr =document.getElementById("festivalAddr");
const festivalHost = document.getElementById("festivalHost");
const festivalPrice = document.getElementById("festivalPrice");


festivalStartDate.value = fStartDate.replaceAll(".","-");
festivalEndDate.value = fEndDate.replaceAll(".","-");

const editor = new toastui.Editor({
    el: document.querySelector('#content'), // 에디터를 적용할 요소 (컨테이너)
    height: '500px',                        // 에디터 영역의 높이 값 (OOOpx || auto)
    initialEditType: 'markdown',            // 최초로 보여줄 에디터 타입 (markdown || wysiwyg)
    initialValue: '',     // 내용의 초기 값으로, 반드시 마크다운 문자열 형태여야 함
    previewStyle: 'vertical',// 마크다운 프리뷰 스타일 (tab || vertical)
   /* start of hooks */
   hooks: {
        async addImageBlobHook(blob, callback) { // 이미지 업로드 로직 커스텀
            try {
                /*
                * 1. 에디터에 업로드한 이미지를 FormData 객체에 저장
                *    (이때, 컨트롤러 uploadEditorImage 메서드의 파라미터인 'image'와 formData에 append 하는 key('image')값은 동일해야 함)
                */
               
                const formData = new FormData();
                formData.append('image', blob);

                // 2. FileApiController - uploadEditorImage 메서드 호출
                const response = await fetch('/tui-editor/image-upload', {
                    method : 'POST',
                    body : formData,
                });

                // 3. 컨트롤러에서 전달받은 디스크에 저장된 파일명
                const filename = await response.text();
                console.log(filename);

                // 4. addImageBlobHook의 callback 함수를 통해, 디스크에 저장된 이미지를 에디터에 렌더링
                const imageUrl = `/resources/images/board/${filename}`;
                callback(imageUrl, 'image alt attribute');

            } catch (error) {
                // console.error('업로드 실패 : ', error);
                console.log(error);
            }
        }
    }
});


if(boardFrm!=null){
    writeBtn.addEventListener("click",function(){
        savePost();
    })
}


// form에서 값을 안넘기고 fetch로 url 호출해서 저장할거임
 function savePost() {
    // 1. 콘텐츠 입력 유효성 검사
    // if (editor.getMarkdown().length < 1) {
    //     alert('에디터 내용을 입력해 주세요.');
    //     throw new Error('editor content is required!');
    // }

    if(boardTitle.value.trim().length==0){
        alert("게시판 제목을 입력해주세요.");
        boardTitle.focus();
        boardTitle.value="";
        return;
    }

    if(editor.getMarkdown().trim().length==0){
        alert("게시판 내용을 입력해주세요.");
        editor.focus();
        return;
    }

    if(festivalStartDate.value.length==0){
        alert("축제 시작 날짜를 입력해주세요.");
        festivalStartDate.focus();
        return;
    }

    if(festivalEndDate.value.length==0){
        alert("축제가 끝나는 날짜를 입력해주세요.");
        festivalEndDate.focus();
        return;
    }

    if(festivalStartDate.value > festivalEndDate.value){
        alert("축제가 끝나는 제대로 입력해주세요.");
        festivalEndDate.focus();
        return;
    }

    if(festivalAddr.value.trim().length==0){
        alert("축제 장소를 입력해주세요.");
        festivalAddr.focus();
        return;
    }

    if(festivalHost.value.trim().length==0){
        alert("주최기관명을 입력해주세요.");
        festivalHost.focus();
        return;
    }

    if(festivalPrice.value.trim().length==0){
        alert("요금을 입력해주세요.");
        festivalPrice.focus();
        return;
    }

    if(festivalPrice.value.trim() < 0){
        alert("요금을 제대로 입력해주세요.");
        festivalPrice.focus();
        return;
    }

    // 2. url, parameter 세팅

    const festival = {
        "festivalStartDate": festivalStartDate.value,
        "festivalEndtDate" : festivalEndDate.value,
        "festivalAddress" : festivalAddr.value,
        "festivalPrice" : festivalPrice.value,
        "festivalHost" : festivalHost.value
    }

    const params = {
        "boardTitle": boardTitle.value,
        "boardContent": editor.getHTML(),
        "festival" : festival
    }
    


    // 3. API 호출
    
    fetch("update", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(params),
    })
    .then(res => res.text())
    .then(result => {
            console.log("result : "+result);
            if(result>0){
                alert("게시글이 수정되었습니다.");
                location.href="/board/2";
            }else{
                alert("게시글 수정을 실패하였습니다.");
                location.href="update";
            }
    })
    .catch(e=>{console.log(e);})

    
}