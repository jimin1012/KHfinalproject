<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>축제게시판 수정</title>
 <link rel="stylesheet" href="/resources/css/board/boardFestivalUpdate-style.css">
<script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>
<!-- Editor's Style -->
<link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css" />
</head>

<body>
	<jsp:include page="/WEB-INF/views/common/header.jsp" />
	 <main>
        <section class="content">
            <h1>축제게시판 수정</h1>
			<div class="board-wrap">
				<div id="boardFrm">
					<div>
						<label for="boardTitle">제목 : </label>
						<input type="text" name="boardTitle" id="boardTitle" value="${board.boardTitle}" placeholder="제목을 입력해주세요." maxlength="50">
                        <div class="festival-data-wrap">
                            <div class="festival-data">
                                <label for="festivalStartDate">축제 날짜 : </label>
                                <input type="date" id="festivalStartDate">
                                <input type="date" id="festivalEndDate">
                            </div>
                            <div class="festival-data">
                                <label for="festivalAddr">장소 : </label>
                                <input type="text" id="festivalAddr" value="${board.festival.festivalAddress}" placeholder="장소를 입력해주세요." maxlength="100">
                            </div>
                            <div class="festival-data">
                                <label for="festivalHost">주관/주최 : </label>
                                <input type="text" id="festivalHost" value="${board.festival.festivalHost}" placeholder="주최기관명을 입력해주세요." maxlength="50">
                            </div>
                            <div class="festival-data">
                                <label for="festivalPrice">요금 : </label>
                                <input type="number" id="festivalPrice" value="${board.festival.festivalPrice}" placeholder="요금을 입력해주세요.">
                            </div>
                     
                            
                        </div>
                    
                    </div>
					<div name="boardContent" id="content">${board.boardContent}</div>
					<div>
						<button id="writeBtn" type="submit">등록</button>
					</div>
				</div>
			</div>
        </section>
    </main>
	<jsp:include page="/WEB-INF/views/common/footer.jsp" />

    <script>
        const fStartDate = "${board.festival.festivalStartDate}";
        const fEndDate = "${board.festival.festivalEndtDate}";
    </script>
	<script src="/resources/js/board/festivalUpdate.js"></script>
</body>
</html>