<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

        
        <!-- 댓글 내용 -->

        <section class="commentArea">
            <!-- 댓글 작성 -->
            <article class="commentWriteStar">
                
                <div id="starRateArea">
                    <label  for="star1">
                        <input type="radio" id="star1" name="starRate" value="1" checked>
                        <span class="fa-solid fa-star fa-lg"></span>
                    </label>
                    <label  for="star2">
                        <input type="radio" id="star2" name="starRate" value="2">
                        <span class="fa-regular fa-star fa-lg"></span>
                    </label>
                    <label  for="star3">
                        <input type="radio" id="star3" name="starRate" value="3">
                        <span class="fa-regular fa-star fa-lg"></span>
                    </label>
                   <label  for="star4">
                        <input type="radio" id="star4" name="starRate" value="4">
                        <span class="fa-regular fa-star fa-lg"></span>
                    </label>
                    <label  for="star5">
                        <input type="radio" id="star5" name="starRate" value="5">
                        <span class="fa-regular fa-star fa-lg"></span>
                    </label>
                </div>
                <div id="starWriteComment">
                    <textarea id="commentContent" placeholder="댓글을 입력하세요." maxlength="1300"></textarea>
                    <i class="fa-solid fa-comments" id="addComment"></i>
                </div>
            </article>

            <article class="commentListArea">
                <ul class="commentList" id="commentList">
                    <c:forEach items="${board.commentList}" var="comment">
                        <li class="commonC <c:if test='${comment.parentNo != 0}' >child</c:if>">
                            <div class="pImage">
                                <c:choose>
                                    <c:when test="${empty comment.profileImage}">
                                        <!-- 프로필 이미지 없을 경우 -->
                                        <img src="/resources/images/main/user.png">
                                    </c:when>
                                    <c:otherwise>
                                        <!-- 프로필 이미지  O-->
                                        <img src="${comment.profileImage}">
                                    </c:otherwise>
                                </c:choose>
                            </div>

                            <div class="rightSide">
                                <div class="side1">
                                    <div class="userName" onClick="showMessageModal(${comment.userNo}, '${comment.userNickName}', this, 'comment')">
                                        ${comment.userNickName} 
                                        <span class="showStar">
                                            <c:forEach var="i" begin="1" end="${comment.commentStar}">
                                                <span class="fa-solid fa-star fa-lg"></span>
                                            </c:forEach>
                                        </span> 
                                    </div>
                                    <div class="etc">${comment.commentCreateDate}
                                        <span><i class="fa-solid fa-circle-exclamation commentReport" onClick="openCommentReport(${comment.commentNo},${comment.userNo})"></i></span>
                                    </div>
                                </div>

                                <!-- 댓글 내용 -->
                                <div class="commentContent">${comment.commentContent}</div>

                                <!-- 답글 달기 / 버튼 영역 -->
                                <div class="side2">

                                    <c:if test="${!empty loginUser}">
                                        <div class="childCommentBtn" onclick="showInsertComment(${comment.commentNo}, this)">
                                            답글 달기<i class="fa-regular fa-comment"></i>
                                        </div>
                                    </c:if>

                                    <div class="buttonArea">
                                        <!-- 로그인 멤버 ==  댓글 작성자 -->
                                        <c:if test="${comment.userNo == loginUser.userNo}">
                                            <button class="btn22"
                                                onClick="showUpdateComment(${comment.commentNo}, this)">수정</button>
                                            <button class="btn22"
                                                onClick="deleteComment(${comment.commentNo})">삭제</button>
                                        </c:if>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </c:forEach>

                </ul>
            </article>
            
        </section>