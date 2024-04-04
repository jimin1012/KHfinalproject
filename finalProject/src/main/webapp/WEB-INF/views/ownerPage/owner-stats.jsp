<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>이용 통계</title>

      <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/ownerPage/owner-menu.css" />
      <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/ownerPage/owner-stats.css" />

      <script src="https://code.highcharts.com/highcharts.js" />
      // series의 name값을 선 위에 표시해주는데 필요한 모듈
      <script src="https://code.highcharts.com/modules/series-label.js" />
      </script>
      <!-- <%-- 오른쪽 상단에 삼발버튼 --%> -->
      <script src="https://code.highcharts.com/modules/exporting.js"></script>

    </head>

    <body>
      <!-- header 연결 -->
      <jsp:include page="/WEB-INF/views/common/header.jsp" />

      <main>
        <div class="page-container">
          <jsp:include page="/WEB-INF/views/ownerPage/owner-menu.jsp" />

          <div class="content-container">

            <div class="chartContainer">
              <figure class="highcharts-figure">
                <div id="resPeopleChart"></div>
              </figure>
              <div id="profitChart"></div>
            </div>




          </div>
        </div>
      </main>


      <script>
        var accNo = '${sessionScope.owner.accNo}'; // js변수 전달
        // console.log(accNo);
      </script>

      <script src="https://code.highcharts.com/highcharts.js"></script>
      <script src="${pageContext.request.contextPath}/resources/js/ownerPage/stats.js"></script>
    
      <!-- footer 연결 -->
      <jsp:include page="/WEB-INF/views/common/footer.jsp" />
    </body>

    </html>