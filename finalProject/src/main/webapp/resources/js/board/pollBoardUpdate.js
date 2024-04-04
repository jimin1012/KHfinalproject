const boardFrm = document.getElementById("boardFrm");
const boardTitle = document.getElementById("boardTitleInput");
const writeBtn = document.getElementById("insertBtn");


const editor = new toastui.Editor({
    el: document.querySelector('#content'), // 에디터를 적용할 요소 (컨테이너)
    height: '700px',                        // 에디터 영역의 높이 값 (OOOpx || auto)
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

    // 2. url, parameter 세팅
    const params = {
        "boardTitle": boardTitle.value,
        "boardContent": editor.getHTML()
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
                location.href="/board/3";
            }else{
                alert("게시글 등록을 실패하였습니다.");
                location.href="update";
            }
    })
    .catch(e=>{console.log(e);})

    
}