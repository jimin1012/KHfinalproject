<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<link rel="stylesheet" href="/resources/css/admin/adminHeader-style.css">
<script src="https://kit.fontawesome.com/0ddb604158.js" crossorigin="anonymous"></script>
   <header>
            <div class="header-top-wrap">
               <div>Admin</div>
               <div><a href="/">NXSHXW</a></div>
            </div>
            <div>
                <div>
                    <a href="/admin" class="listTitle"><i class="fa-solid fa-user-group" style="color: #ffffff;"></i><span>회원관리</span></a>
                    <ul class="listCon">
                        <li><a href="/admin">회원목록</a> </li>
                        <li><a href="/admin/userStatistics">회원통계</a></li>
                    </ul>
                </div>
                <div>
                    <a href="/admin/accList" class="listTitle"><i class="fa-solid fa-building"  style="color: #ffffff;"></i><span>사업장관리</span></a>
                    <ul class="listCon">
                        <li><a href="/admin/accList">사업장 목록</a></li>
                        <li><a href="/admin/accPermitList">사업자 전환 요청</a></li>
                        <li><a href="/admin/totalStatistics">예약 통계</a></li>
                    </ul>
                </div>
                <div>
                    <a href="/admin/reservationList" class="listTitle"><i class="fa-solid fa-list" style="color: #ffffff;"></i><span>예약관리</span></a>
                </div>
                <div>
                    <a href="/admin/boardReportList" class="listTitle"><i class="fa-solid fa-skull-crossbones" style="color: #ffffff;"></i><span>신고목록</span></a>
                </div>
                <div>
                    <a href="/admin/adminChatList" class="listTitle"><i class="fa-solid fa-headset" style="color: #ffffff;"></i><span> 1:1 상담</span></a>
                </div>
            </div>
    </header>