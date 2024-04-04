<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%-- 쪽지 모달 --%>
<div class="modalMessage">
    <div id="writeMessageArea">
        <div>쪽지 작성</div>
        <div class="writeMessageContent">
            <div id="recieverName">To.유저일</div>
            <textarea rows="30" cols="30" name="messageContent" id="messageContent"></textarea>
        </div>
        <div class="countSendMessageArea">
            <div><span id="counter">0</span><span>/1000</span></div>
            <div>
                <button type="button" id="modalMessageCloseBtn">취소하기</button>
                <button type="submit" id="sendMessageBtn">전송하기</button>
            </div>
        </div>

    </div>
</div>