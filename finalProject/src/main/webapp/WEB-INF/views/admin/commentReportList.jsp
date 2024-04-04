<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>신고목록</title>

    <link rel="stylesheet" href="/resources/css/admin/reportList-style.css">

</head>
<body>

    <div class="wrap">
        <!-- 관리자 헤더 -->
		<jsp:include page="/WEB-INF/views/admin/adminHeader.jsp" />

        <main>
            <section class="main-box">
                <h3>신고관리</h3>
                <section class="main-header">
                    <div>
                        <span class="noshow RPList" id="boardReportList">게시글</span>
                        <span class="show RPList" id="commentReportList">댓글</span>
                        <select id="selectReportST">
                            <option value="all">전체</option>
                            <option value="wait">처리대기중</option>
                            <option value="delete">삭제완료</option>
                            <option value="cancel">신고취소</option>
                        </select>
                    </div>
                </section>

                <section class="main-table">
                    <table id="reportTable">
                        <thead>
                            <tr>
                                <th>댓글 번호</th>
                                <th>댓글 내용</th>
                                <th>작성자</th>
                                <th>신고사유</th>
                                <th>댓글 처리</th>
                            </tr>
                        </thead>
                        <tbody>
                            <c:choose>
                                <c:when test="${empty reportCommentList}">
                                    <tr class="tRow">
                                        <td colspan="5" id="noResult" style="width : 1000px">조회된 신고 목록이 없습니다.</td>
                                    </tr>
                                </c:when>
                                <c:otherwise>
                                    <c:forEach var="report" items="${reportCommentList}">
                                        <tr class="tRow">
                                            <td class="firstTd">${report.commentNo}</td>
                                            <td><div>${report.commentContent}</div></td>
                                            <td>${report.userNickName}</td>
                                            <td>${report.reportList[0].reportContent}</td>
                                            <td>
                                                <c:if test="${report.reportList[0].reportStFlag eq 'W'}">
                                                    처리대기중
                                                </c:if>
                                                <c:if test="${report.reportList[0].reportStFlag eq 'Y'}">
                                                    삭제완료
                                                </c:if>
                                                <c:if test="${report.reportList[0].reportStFlag eq 'N'}">
                                                    신고취소
                                                </c:if>
                                            </td>
                                        </tr>
                                        <tr class="reportBoard tableSlide">
                                            <td colspan="5" >
                                                <span class="reportBoardTitle">${report.boardName}
                                                    <div class="reportBoardContent">
                                                    ${report.commentContent}
                                                    </div>
                                                </span>
                                                <span class="reportMS">
                                                    <div>
                                                        <p>
                                                            총 신고 사유 : ${report.reportCount}
                                                            <br>
                                                            신고 사유 :
                                                        </p>
                                                        <ul class="reportContentList">
                                                            <c:forEach var="content" items="${report.reportList}">
                                                                <li>${content.reportContent}</li>
                                                            </c:forEach>
                                                        </ul>
                                                        <br><br>
                                                    </div>
                                                    <div>
                                                        <select class="changeState">
                                                            <option value="wait">처리대기</option>
                                                            <option value="cancel">신고취소</option>
                                                            <option value="delete">게시중단</option>
                                                        </select>
                                                        <button type="button" class="finishReport" onClick="updateCommentReportSt(${report.commentNo}, this)">처리</button>
                                                    </div>
                                                </span>
                                            </td>
                                        </tr>
                                    </c:forEach>
                                </c:otherwise>
                            </c:choose>
                        </tbody>
                    </table>
                </section>

            </section>
        </main>

    </div>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="/resources/js/admin/accPermitList.js"></script>
    <script src="/resources/js/admin/adminReport.js"></script>
</body>
</html>