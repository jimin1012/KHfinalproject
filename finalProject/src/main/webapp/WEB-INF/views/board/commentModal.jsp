<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<link rel="stylesheet" href="/resources/css/board/boardReport-style.css">
<%-- 댓글 신고 모달 --%>
<div class="modalComment">
    <div class="reportArea">
        <h3>댓글 신고</h3>
        <div>
            <input type="hidden" id="cNo">
            <ul class="reportList">
                <label>
                    <li><input type="radio" name="reportContent" value="스팸홍보/도배글입니다.">스팸홍보/도배글입니다.</li>
                </label>
                <label>
                    <li><input type="radio" name="reportContent" value="불법정보를 포함하고 있습니다.">불법정보를 포함하고 있습니다.</li>
                </label>
                <label>
                    <li><input type="radio" name="reportContent" value="욕설/혐오/불쾌한 표현이 있습니다.">욕설/혐오/불쾌한 표현이 있습니다.</li>
                </label>
                <label>
                    <li><input type="radio" name="reportContent" value="현재 게시판과 맞지않은 내용입니다.">현재 게시판과 맞지않은 내용입니다.</li>
                </label> 
                <label>
                    <li><input type="radio" name="reportContent" value="개인정보 노출 게시물입니다.">개인정보 노출 게시물입니다.</li>
                </label>
                <label>
                    <li>
                        <input type="radio" name="reportContent" value="기타">기타 사유
                        <input type="text" name="etcContent" id="writeEtcC" placeholder="기타 선택 시 사유 작성" autocomplete="off">
                    </li>
                </label>
            </ul>
            <div class="reportBtnArea">
                <button class="sendReportBtn">제출</button>
                <button id="modalCommentCloseBtn">취소</button>
            </div>
            
        </div>
                    
    </div>
</div>