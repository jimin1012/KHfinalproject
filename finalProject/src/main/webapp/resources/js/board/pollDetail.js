// 목록으로
const goToListBtn = document.getElementById("gotoList");

goToListBtn.addEventListener("click", () => {

    // location.search : 쿼리스트링만 반환
    location.href = "/board/" + boardCode + location.search;

})


// 게시글 수정 버튼 클릭 시
const updateBtn = document.getElementById("updateBtn");

if (updateBtn != null) {
    updateBtn.addEventListener("click", () => {

        location.href = location.pathname + "/update" + location.search;
        // /board/1/1508/update?cp=1
    });
}

// 게시글 삭제 버튼이 클릭 되었을 때
const deleteBtn = document.getElementById("deleteBtn");
if (deleteBtn != null) {
    deleteBtn.addEventListener("click", () => {
        if (confirm("정말 삭제 하시겠습니까?")) {
            // board/1/2000/delete(GET)
            location.href = location.pathname + "/delete";


            // 삭제 서비스 호출 성공 시 redirect:/board/{boardCode}
            // + "삭제 되었습니다." alert 출력

            // 삭제 서비스 호출 실패 시 redirect:/board/{boardCode}/{boardNo}
            // + "삭제 실패 ㅠㅠ" alert 출력
        } else {

        }
    })
}


Kakao.init('eea8e6af3bfb542702137a33888c62bd'); // 사용하려는 앱의 JavaScript 키 입력
commentCount = Number(document.getElementById("commentCount").innerHTML);
likeCount = Number(document.getElementById("likeCount").innerText);
const shareBtn = document.getElementById("shareBtn");
const pollTitle = document.getElementById("pollTitle").innerHTML

Kakao.Share.createDefaultButton({
    container: shareBtn,
    objectType: 'feed',
    content: {
        title: pollTitle,
        description: pollTitle+"투표가 진행중입니다!! 많은 참여 부탁드려요",
        link: {
            // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
            mobileWebUrl: location.href,
            webUrl: location.href,
        },
    },
    social: {
        likeCount: likeCount,
        commentCount: commentCount,
    },
    buttons: [
        {
            title: '웹으로 보기',
            link: {
                mobileWebUrl: location.href,
                webUrl: location.href,
            },
        },
        {
            title: '앱으로 보기',
            link: {
              mobileWebUrl: 'https://developers.kakao.com',
              webUrl: 'https://developers.kakao.com',
            },
          },
    ],
});

