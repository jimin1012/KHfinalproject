
const goToListBtn = document.getElementById("goToListBtn");

goToListBtn.addEventListener("click",()=>{
        
        // location.search : 쿼리스트링만 반환
        location.href = "/board/" + boardCode + location.search;

})


// 게시글 수정 버튼 클릭 시
const updateBtn = document.getElementById("updateBtn");

if(updateBtn != null){
    updateBtn.addEventListener("click", ()=>{

        location.href = location.pathname+"/update"+location.search;
        // /board/1/1508/update?cp=1
    });
}

// 게시글 삭제 버튼이 클릭 되었을 때
const deleteBtn = document.getElementById("deleteBtn");
if(deleteBtn!=null){
    deleteBtn.addEventListener("click",()=>{
        if(confirm("정말 삭제 하시겠습니까?")){
            // board/1/2000/delete(GET)
            location.href= location.pathname+"/delete";
    

            // 삭제 서비스 호출 성공 시 redirect:/board/{boardCode}
            // + "삭제 되었습니다." alert 출력
    
            // 삭제 서비스 호출 실패 시 redirect:/board/{boardCode}/{boardNo}
            // + "삭제 실패 ㅠㅠ" alert 출력
        }else{
    
        }
    })
}