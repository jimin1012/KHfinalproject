<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>공지사항 작성</title>
 <link rel="stylesheet" href="/resources/css/board/boardNoticeWrite-style.css">
<script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>
<!-- Editor's Style -->
<link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css" />
</head>

<body>
	<jsp:include page="/WEB-INF/views/common/header.jsp" />
	 <main>
        <section class="content">
            <h1>공지사항</h1>
			<div class="board-wrap">
				<div id="boardFrm">
					<div>
						<label for="boardTitle">제목 : </label>
						<input type="text" name="boardTitle" id="boardTitle" placeholder="제목을 입력해주세요." maxlength="50">
					</div>
					<div name="boardContent" id="content"></div>
					<div>
						<button id="writeBtn" type="submit">등록</button>
					</div>
				</div>
			</div>
        </section>
    </main>
	<jsp:include page="/WEB-INF/views/common/footer.jsp" />

	<script src="/resources/js/board/noticeWrite.js"></script>
</body>
</html>