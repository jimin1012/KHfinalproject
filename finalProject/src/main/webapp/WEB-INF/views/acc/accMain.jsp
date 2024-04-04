<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>숙소 검색</title>
   <link rel="stylesheet" href="/resources/css/acc/accMain.css">
    <script src="https://kit.fontawesome.com/97cdc46e56.js" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
   <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
   <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
   <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
   
   
</head>
<body>

<%    
response.setHeader("Cache-Control","no-store");    
response.setHeader("Pragma","no-cache");    
response.setDateHeader("Expires",0);    
if (request.getProtocol().equals("HTTP/1.1"))  
        response.setHeader("Cache-Control", "no-cache");  
%>

   <main class="mainContainer">
   
      <form action="/acc/inputSearch" method="POST" id="searchFrm">
      
         <section class="mainCon1">
            
            <div class="mainCla1">
               <button class="mainOne fa-solid fa-bed"></button><input type="text" name="where" class="where" placeholder="어디로 향하시나요?" id="where" autocomplete="off">
           </div>
            
         <div class="mainCla2">
             <button class="mainOne fa-regular fa-calendar"></button><input type="text" name="dates" id="startDate">
         </div>

            <div class="mainCla3">
               <button class="mainOne fa-regular fa-user" type="button"></button><span class="where" id="totalPer">성인 1명 · 아동 1명 · 객실 1개</span>
               
               <c:if test="${!empty loginUser}">
                  <input type="hidden" name="userNo" class="userNo" id="userNo" value="${loginUser.userNo}">
               </c:if>
            </div>
            
            <button class="mainBtn1" id="searchbtn">검색</button>
            
         </section>
   
         <section class="mainCon2">
   
            <div class="mainCla4">
               <div class="search-area">
                   <ul id="accAutoSearch" class="close"></ul>
               </div>
            </div>
   
            <div class="mainCla6" id="totalPerShow">
               <div class="mainCla7">
                  <div class="mainDi2">
                     <span class="adult">성인</span>
                  </div>
                  <div class="mainDi1">
                     <button class="adultMinus" id="adultMinus" type="button">-</button><input class="adultNum" id="adultNum" name="adultNum" value="1"><button class="adultPlus" id="adultPlus" type="button">+</button>
                  </div>
               </div>
               
               <div class="mainCla8">
                  <div>
                     <span>어린이</span>
                  </div>
                  <div class="mainDi1">
                     <button class="childMinus" id="childMinus" type="button">-</button><input class="childNum" id="childNum" name="childNum" value="1"><button class="childPlus" id="childPlus" type="button">+</button>
                  </div>
               </div>
               
               <div class="mainCla9">
                  <div>
                     <span>객실</span>
                  </div>
                  <div class="mainDi1">
                     <button class="grMinus" id="grMinus" type="button">-</button><input class="grNum" id="grNum" name="grNum" value="1"><button class="grPlus" id="grPlus" type="button">+</button>
                  </div>
               </div>
               <div class="mainCla10">
                  <button class="grSub" id="grSub" type="button">완료</button>
               </div>
            </div>
   
         </section>
       
      </form>
      
               
   

         
         
      
   </main>
   
   

    <script src="/resources/js/acc/accMain.js"></script>
    






   
</body>
</html>