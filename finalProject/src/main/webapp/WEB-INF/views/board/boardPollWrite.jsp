<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>투표게시판 작성</title>
 <link rel="stylesheet" href="/resources/css/board/boardPollWrite-style.css">
<script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>
<!-- Editor's Style -->
<link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css" />
</head>

<body>
	<jsp:include page="/WEB-INF/views/common/header.jsp" />



        <main>

                <section class="content">
                    <h1>투표게시판 작성</h1>
                    <div class="board-wrap">
                        <div id="boardFrm">
                            <div>
                            <label for="boardTitle">제목 : </label>
                            <input type="text" name="boardTitle" id="boardTitle" placeholder="제목을 입력해주세요." maxlength="50">
                        </div>
                        <div name="boardContent" id="content"></div>
                        
                        <section>
                            <h2>투표 제목 : <input type="text" name="pollTitle" id="pollTitle" maxlength="30"></h2>
                            <h2>투표 종료일자 : <input type="date" name="pollEndDate" id="pollEndDate"></h2>
                            <h2>선택지  <button id="addOption" onclick="addOption()"><i class="fa-solid fa-plus"></i></button><button id="removeOption" onclick="removeOption()"><i class="fa-solid fa-minus"></i></button></h2> 
                            <input type="text" name="options" placeholder="선택지 1번" class="show" maxlength="30"> 
                            <br>
                            <input type="text"  name="options" placeholder="선택지 2번" class="show" maxlength="30">
                            <br>
                            <input type="text"  name="options" placeholder="선택지 3번" class="hide" maxlength="30">
                            <input type="text" name="options" placeholder="선택지 4번" class="hide" maxlength="30"> 
                            <input type="text" name="options" placeholder="선택지 5번" class="hide" maxlength="30"> 

                        </section>
                        <div>
                        <button id="writeBtn" type="submit">등록</button>
					</div>
				</div>
			</div>
            
        </section>
    </main>
	<jsp:include page="/WEB-INF/views/common/footer.jsp" />

	<script src="/resources/js/board/pollWrite.js"></script>
</body>
</html>