# KHfinalproject
KH FINAL PROJECT

kh 정보 교육원에서 진행한 파이널 프로젝트


<div align= "center">
    <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=180&text=NOSHOW&animation=&fontColor=000000&fontSize=40" />
</div>
    <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;"> 프로젝트  소개 </h2> <br> 
     <ul>
         <li>프로젝트 기간 :  2024.02.08 ~ 2024.04.04 (주제선정까지 포함기간) 실제구현은 1달정도</li>
         <li>조원 : 신승민, 양지선, 전지민, 강설민, 윤형식, 박성현, 김황조</li>
         <li>예약 대행 사이트로써 숙박,기차,버스등의 데이터를 공공데이터를 활용하여 가져온뒤 유저에게 화면으로 노출하고 선택한 좌석 혹은 방을 결제하게 한뒤 예약해주는 사이트입니다.</li>
     </ul>
    <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;"> 개발환경 </h2> <br> 
     <ul>
         <li>사용 기술(언어) : Java, javascript, css, html, jsp, sql(oracle) </li>
         <li>형상관리 : github</li>
     </ul>
     <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;"> 실행 시 화면 </h2> <br> 
     <ul>
         <li><a href="https://amplified-success-14b.notion.site/65c6493152074601bf0f74df2003a6a6">화면 참조</a></li>
     </ul>
     <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;">ERD </h2> <br> 
     <img src="https://file.notion.so/f/f/9ea9ba60-1184-44bf-b0b7-c58d1b73dd6a/050ad074-0f01-4b4e-a065-46c89571788b/Untitled.png?id=4b155dd7-65fa-45f5-8890-e95a8ec90716&table=block&spaceId=9ea9ba60-1184-44bf-b0b7-c58d1b73dd6a&expirationTimestamp=1718352000000&signature=I7RR-JFjEEW0ZRbqaRw0OmIvZQtsBb25iViaFHG-sGk&downloadName=Untitled.png">
     <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;"> SQL문 </h2> <br>
     <details>
         <summary>
             첫번째 SQL
         </summary>
         <br>
         SQL문 실행순서 : 첫번째 SQL문 -> 프로그램 실행 -> 두번째 SQL문
         <br>
     <pre>
         <code>
/*
--------------- 계정 생성 안되어있다면 실행 ------------------------

-- 오라클 11G 이전 버전의 SQL 작성을 가능하게 하는 구문.
ALTER SESSION SET "_ORACLE_SCRIPT" = TRUE;

-- C## : 일반 사용자(사용자 계정을 의미)

-- 계정 생성
CREATE USER nxshxw IDENTIFIED BY nxshxw1234;

-- 접속, 기본 객체 생성 권한
GRANT CONNECT, RESOURCE TO nxshxw;

-- 객체(테이블 등) 가 생성될 수 있는 공간 할당량 지정
ALTER USER nxshxw DEFAULT TABLESPACE SYSTEM QUOTA UNLIMITED ON SYSTEM;

*/



------------------- drop 구문 테이블 23개 지워져도 되는 거 순서대로 정렬 -----------------

DROP TABLE "FESTIVAL";
DROP TABLE "WISHLIST";
DROP TABLE "RESTAURANT_REVIEW";
DROP TABLE "ACC_RATE";
DROP TABLE "TRANSPORTATION";
DROP TABLE "VOTE";
DROP TABLE "OPTION";
DROP TABLE "POLL";
DROP TABLE "REPORT";
DROP TABLE "ACC_REVIEW";
DROP TABLE "ACC_IMAGE";
DROP TABLE "CHATTING";
DROP TABLE "CHATROOM";
DROP TABLE "COMMENT";
DROP TABLE "MESSAGE";
DROP TABLE "BOARD_LIKE";
DROP TABLE "BOARD";
DROP TABLE "ACC_RESERVATION";
DROP TABLE "RESERVATION";
DROP TABLE "USER";
DROP TABLE "BOARD_TYPE";

DROP TABLE "ACC_GRADE";


DROP TABLE "ACC";
DROP TABLE "BOSS";


--------------------------시퀀스 삭제구문---------------------------------------------

DROP SEQUENCE SEQ_USER_NO;
DROP SEQUENCE SEQ_ACC_NO;
DROP SEQUENCE SEQ_ACC_IMG_NO;
DROP SEQUENCE SEQ_RATE_NO;
DROP SEQUENCE SEQ_A_REV_NO;
DROP SEQUENCE SEQ_RES_NO;
DROP SEQUENCE SEQ_R_REV_NO;
DROP SEQUENCE SEQ_BOARD_NO;
DROP SEQUENCE SEQ_COMMENT_NO;
DROP SEQUENCE SEQ_MESSAGE_NO;
DROP SEQUENCE SEQ_CHATROOM_NO;
DROP SEQUENCE SEQ_CHAT_NO;
DROP SEQUENCE SEQ_OPTION_NO;
DROP SEQUENCE SEQ_A_GRADE_NO;

------------------- create 구문 테이블 23개 ---------------------------






CREATE TABLE "MESSAGE" (
   "MESSAGE_NO" NUMBER   NOT NULL PRIMARY KEY,
   "MESSAGE_CONTENT"   VARCHAR2(3000)   NOT NULL,
   "M_CREATE_DATE"   DATE   DEFAULT SYSDATE   NOT NULL,
   "MESSAGE_DEL_FL"   CHAR(1)   DEFAULT 'N'   NOT NULL,
   "SENDER_NO"   NUMBER      NOT NULL,
   "RECIEVER_NO"   NUMBER      NOT NULL
);

COMMENT ON COLUMN "MESSAGE"."MESSAGE_NO" IS '쪽지번호(시퀀스)';

COMMENT ON COLUMN "MESSAGE"."MESSAGE_CONTENT" IS '쪽지내용';

COMMENT ON COLUMN "MESSAGE"."M_CREATE_DATE" IS '작성일';

COMMENT ON COLUMN "MESSAGE"."MESSAGE_DEL_FL" IS '삭제여부(정상:N, 삭제:Y)';

COMMENT ON COLUMN "MESSAGE"."SENDER_NO" IS '쪽지를 보낸 회원';

COMMENT ON COLUMN "MESSAGE"."RECIEVER_NO" IS '쪽지를 받은 회원';



CREATE TABLE "POLL" (
   "BOARD_NO"   NUMBER      NOT NULL,
   "POLL_TITLE"   VARCHAR2(150)      NOT NULL,
   "POLL_END_DATE"   DATE      NOT NULL,
   "POLL_ST_FL"   CHAR(1)   DEFAULT '1'   NOT NULL
);

COMMENT ON COLUMN "POLL"."BOARD_NO" IS '게시글번호(시퀀스)';

COMMENT ON COLUMN "POLL"."POLL_TITLE" IS '투표제목';

COMMENT ON COLUMN "POLL"."POLL_END_DATE" IS '투표 종료 일자';

COMMENT ON COLUMN "POLL"."POLL_ST_FL" IS '진행중(1), 종료(2)';



CREATE TABLE "BOARD" (
   "BOARD_NO"   NUMBER      NOT NULL PRIMARY KEY,
   "BOARD_TITLE"   VARCHAR2(150)      NOT NULL,
   "BOARD_CONTENT"   CLOB      NOT NULL,
   "CREATE_DATE"   DATE   DEFAULT SYSDATE   NOT NULL,
   "READ_COUNT"   NUMBER   DEFAULT 0   NOT NULL,
   "BOARD_DEL_FL"   CHAR(1)   DEFAULT 'N'   NOT NULL,
   "BOARD_CODE"   NUMBER      NOT NULL,
   "USER_NO"   NUMBER      NOT NULL
);

COMMENT ON COLUMN "BOARD"."BOARD_NO" IS '게시글번호(시퀀스)';

COMMENT ON COLUMN "BOARD"."BOARD_TITLE" IS '게시글 제목';

COMMENT ON COLUMN "BOARD"."BOARD_CONTENT" IS '게시글 내용';

COMMENT ON COLUMN "BOARD"."CREATE_DATE" IS '작성일';

COMMENT ON COLUMN "BOARD"."READ_COUNT" IS '조회수';

COMMENT ON COLUMN "BOARD"."BOARD_DEL_FL" IS '게시글 상태(정상 N 삭제 Y )';

COMMENT ON COLUMN "BOARD"."BOARD_CODE" IS '게시판 코드';

COMMENT ON COLUMN "BOARD"."USER_NO" IS '사용자 번호(SEQ_USER_NO)';



CREATE TABLE "REPORT" (
   "USER_NO"   NUMBER      NOT NULL,
   "BOARD_NO"   NUMBER      NULL,
   "REPLY_NO"   NUMBER      NULL,
   "REPORT_ST_FL"   CHAR(1)   DEFAULT 'W'   NOT NULL,
   "REPORT_CONTENT"   VARCHAR2(1000)      NOT NULL
);

COMMENT ON COLUMN "REPORT"."USER_NO" IS '신고자 번호';

COMMENT ON COLUMN "REPORT"."BOARD_NO" IS '신고된 게시글 번호';

COMMENT ON COLUMN "REPORT"."REPLY_NO" IS '신고된 댓글 번호';

COMMENT ON COLUMN "REPORT"."REPORT_ST_FL" IS '신고 처리 여부(대기:W, 처리:Y, 취소:N)';

COMMENT ON COLUMN "REPORT"."REPORT_CONTENT" IS '신고 사유 내용';



CREATE TABLE "BOARD_TYPE" (
   "BOARD_CODE"   NUMBER      NOT NULL PRIMARY KEY,
   "BOARD_NAME"   VARCHAR2(30)      NOT NULL
);

COMMENT ON COLUMN "BOARD_TYPE"."BOARD_CODE" IS '게시판 코드';

COMMENT ON COLUMN "BOARD_TYPE"."BOARD_NAME" IS '게시판 이름';



CREATE TABLE "COMMENT" (
   "COMMENT_NO"   NUMBER      NOT NULL PRIMARY KEY,
   "COMMENT_CONTENT"   VARCHAR2(4000)      NOT NULL,
   "C_CREATE_DATE"   DATE   DEFAULT SYSDATE   NOT NULL,
   "COMMENT_DEL_FL"   CHAR(1)   DEFAULT 'N'   NOT NULL,
   "USER_NO"   NUMBER      NOT NULL,
   "BOARD_NO"   NUMBER      NOT NULL,
   "COMMENT_STAR"   NUMBER      NULL,
   "PARENT_NO"   NUMBER      NULL
);

COMMENT ON COLUMN "COMMENT"."COMMENT_NO" IS '댓글번호(시퀀스)';

COMMENT ON COLUMN "COMMENT"."COMMENT_CONTENT" IS '댓글 내용';

COMMENT ON COLUMN "COMMENT"."C_CREATE_DATE" IS '댓글 작성일';

COMMENT ON COLUMN "COMMENT"."COMMENT_DEL_FL" IS '삭제여부(정상:N, 삭제:Y)';

COMMENT ON COLUMN "COMMENT"."USER_NO" IS '사용자 번호(SEQ_USER_NO)';

COMMENT ON COLUMN "COMMENT"."BOARD_NO" IS '게시글번호(시퀀스)';

COMMENT ON COLUMN "COMMENT"."COMMENT_STAR" IS '댓글 별점';

COMMENT ON COLUMN "COMMENT"."PARENT_NO" IS '부모댓글 번호';



CREATE TABLE "USER" (
   "USER_NO"   NUMBER      NOT NULL PRIMARY KEY,
   "USER_NAME"   VARCHAR2(50)      NOT NULL,
   "USER_BIRTH"   VARCHAR(8)      NOT NULL,
   "USER_GENDER"   CHAR(1)      NOT NULL,
   "USER_ADDR"   VARCHAR2(300)      NULL,
   "USER_ID"   VARCHAR2(50)      NOT NULL,
   "USER_PW"   VARCHAR2(250)      NOT NULL,
   "USER_NICKNAME"   VARCHAR2(50)      NOT NULL,
   "USER_TEL"   VARCHAR2(11)      NOT NULL,
   "USER_EMAIL"   VARCHAR2(50)      NOT NULL,
   "ENROLL_DATE"   DATE   DEFAULT SYSDATE   NOT NULL,
   "PROFILE_IMG"   VARCHAR2(300),
   "USER_DEL_FL"   CHAR(1 BYTE)   DEFAULT 'N'   NOT NULL,
   "AUTHORITY"   NUMBER   DEFAULT 1   NOT NULL
);

COMMENT ON COLUMN "USER"."USER_NO" IS '사용자 번호(SEQ_USER_NO)';

COMMENT ON COLUMN "USER"."USER_NAME" IS '사용자 이름';

COMMENT ON COLUMN "USER"."USER_BIRTH" IS '사용자 생년월일(-제외)';

COMMENT ON COLUMN "USER"."USER_GENDER" IS '사용자 성별(남자 :  M, 여자 : F)';

COMMENT ON COLUMN "USER"."USER_ADDR" IS '사용자 주소';

COMMENT ON COLUMN "USER"."USER_ID" IS '사용자 아이디';

COMMENT ON COLUMN "USER"."USER_PW" IS '사용자 비밀번호(암호화 적용)';

COMMENT ON COLUMN "USER"."USER_NICKNAME" IS '사용자 닉네임';

COMMENT ON COLUMN "USER"."USER_TEL" IS '사용자 전화번호';

COMMENT ON COLUMN "USER"."USER_EMAIL" IS '사용자 이메일';

COMMENT ON COLUMN "USER"."ENROLL_DATE" IS '사용자 가입일';

COMMENT ON COLUMN "USER"."PROFILE_IMG" IS '프로필 이미지 저장 경로';

COMMENT ON COLUMN "USER"."USER_DEL_FL" IS '탈퇴여부(N:탈퇴X, Y: 탈퇴O)';

COMMENT ON COLUMN "USER"."AUTHORITY" IS '회원권한(일반 : 1, 사업자 : 2, 관리자 : 3)';



CREATE TABLE "BOARD_LIKE" (
   "USER_NO"   NUMBER      NOT NULL,
   "BOARD_NO"   NUMBER      NOT NULL,
    PRIMARY KEY("USER_NO","BOARD_NO")
);

COMMENT ON COLUMN "BOARD_LIKE"."USER_NO" IS '사용자 번호(SEQ_USER_NO)';

COMMENT ON COLUMN "BOARD_LIKE"."BOARD_NO" IS '게시글번호(시퀀스)';


-- 투표 결과 저장 테이블 
CREATE TABLE "VOTE" (
   "USER_NO"   NUMBER      NOT NULL,
   "OPTION_NO"   NUMBER      NOT NULL
);
COMMENT ON COLUMN "VOTE"."USER_NO" IS '투표한 사용자 번호';

COMMENT ON COLUMN "VOTE"."OPTION_NO" IS '투표한 선택지 번호';



CREATE TABLE "ACC_REVIEW" (
   "A_REVIEW_NO"   NUMBER      NOT NULL PRIMARY KEY,
   "A_REVIEW_CONTENT"   VARCHAR2(3000)      NOT NULL,
   "A_CREATE_DATE"   DATE   DEFAULT SYSDATE   NOT NULL,
   "A_REVIEW_DEL_FL"   CHAR(1)   DEFAULT 'N'   NOT NULL,
   "ACC_NO"   NUMBER      NOT NULL,
   "USER_NO"   NUMBER      NOT NULL
);

COMMENT ON COLUMN "ACC_REVIEW"."A_REVIEW_NO" IS '리뷰 번호(SEQ_REV_NO)';

COMMENT ON COLUMN "ACC_REVIEW"."A_REVIEW_CONTENT" IS '리뷰 내용';

COMMENT ON COLUMN "ACC_REVIEW"."A_CREATE_DATE" IS '작성일';

COMMENT ON COLUMN "ACC_REVIEW"."A_REVIEW_DEL_FL" IS '삭제여부(정상:N, 삭제:Y)';

COMMENT ON COLUMN "ACC_REVIEW"."ACC_NO" IS '숙소 번호';

COMMENT ON COLUMN "ACC_REVIEW"."USER_NO" IS '회원 번호';



CREATE TABLE "ACC" (
   "ACC_NO"   NUMBER      NOT NULL PRIMARY KEY,
   "ACC_NAME"   VARCHAR2(100 )      NOT NULL,
   "ACC_TEL"   VARCHAR2(100),
   "ACC_ADDR"   VARCHAR2(300 )      NOT NULL,
   "ACC_ST_FL"   CHAR(1 )   DEFAULT 'R'   NOT NULL,
   "BOSS_NO"   NUMBER      NOT NULL,
   "ACC_CATEGORY"   VARCHAR2(20),
   "OPEN_DATE"   DATE      NOT NULL
);

COMMENT ON COLUMN "ACC"."ACC_NO" IS '숙소 번호(SEQ_ACC_NO)';

COMMENT ON COLUMN "ACC"."ACC_NAME" IS '숙소 이름';

COMMENT ON COLUMN "ACC"."ACC_TEL" IS '숙소 전화번호';


COMMENT ON COLUMN "ACC"."ACC_ADDR" IS '숙소 주소';

COMMENT ON COLUMN "ACC"."ACC_ST_FL" IS 'R(영업준비) Y(영업중) N(휴업중)C(폐업)';

COMMENT ON COLUMN "ACC"."BOSS_NO" IS '사업자번호(-제외)(숫자10자리)';


COMMENT ON COLUMN "ACC"."ACC_CATEGORY" IS '숙소종류(호텔,모텔,펜션)';

COMMENT ON COLUMN "ACC"."OPEN_DATE" IS '개업일 (form 사업자 등록증)';



CREATE TABLE "WISHLIST" (
   "ACC_NO2"   NUMBER      NOT NULL,
   "USER_NO"   NUMBER      NOT NULL,
    PRIMARY KEY("ACC_NO2","USER_NO")
);

COMMENT ON COLUMN "WISHLIST"."ACC_NO2" IS '숙소 번호(SEQ_ACC_NO)';

COMMENT ON COLUMN "WISHLIST"."USER_NO" IS '사용자 번호(SEQ_USER_NO)';



-- 선택지 테이블
CREATE TABLE "OPTION" (
   "OPTION_NO"   NUMBER      NOT NULL,
   "OPTION_CONTENT"   VARCHAR2(150)      NOT NULL,
   "BOARD_NO"   NUMBER      NOT NULL
);

COMMENT ON COLUMN "OPTION"."OPTION_NO" IS '선택지 번호';

COMMENT ON COLUMN "OPTION"."OPTION_CONTENT" IS '선택지 내용';

COMMENT ON COLUMN "OPTION"."OPTION_CONTENT" IS '게시글번호(시퀀스)';



CREATE TABLE "BOSS" (
   "BOSS_NO"   NUMBER      NOT NULL PRIMARY KEY,
   "BOSS_ACCOUNT"   VARCHAR2(30)      NULL,
   "USER_NO"   NUMBER      NOT NULL
);

COMMENT ON COLUMN "BOSS"."BOSS_NO" IS '사업자번호(-제외)(숫자10자리)';

COMMENT ON COLUMN "BOSS"."BOSS_ACCOUNT" IS '입금계좌';

COMMENT ON COLUMN "BOSS"."USER_NO" IS '사용자 번호(SEQ_USER_NO)';



CREATE TABLE "CHATROOM" (
   "CHATROOM_NO"   NUMBER      NOT NULL PRIMARY KEY,
   "CHATROOM_ST_FL"   CHAR(1)   DEFAULT 'N'   NOT NULL,
   "USER_NO"   NUMBER      NOT NULL,
   "MANAGER_NO"   NUMBER      NOT NULL
);

COMMENT ON COLUMN "CHATROOM"."CHATROOM_NO" IS '1:1상담방(채팅방) 번호';

COMMENT ON COLUMN "CHATROOM"."CHATROOM_ST_FL" IS '채팅방 상태(일반:N, 중요:S, 차단:B)';

COMMENT ON COLUMN "CHATROOM"."USER_NO" IS '회원 번호';

COMMENT ON COLUMN "CHATROOM"."MANAGER_NO" IS '관리자 번호';



CREATE TABLE "RESTAURANT_REVIEW" (
   "R_REVIEW_NO"   NUMBER      NOT NULL PRIMARY KEY,
   "R_REVIEW_TITLE"   VARCHAR2(50)      NOT NULL,
   "R_REVIEW_CONTENT"   VARCHAR2(3000)      NOT NULL,
   "R_CREATE_DATE"   DATE   DEFAULT SYSDATE   NOT NULL,
   "R_REVIEW_DEL_FL"   CHAR(1)   DEFAULT 'N'   NOT NULL,
   "R_STAR_POINT"   NUMBER      NOT NULL,
   "USER_NO"   NUMBER      NOT NULL,
   "R_PLACE_NAME"   VARCHAR2(50)      NOT NULL,
   "R_THUMBNAIL"   VARCHAR2(300)      NULL
);

COMMENT ON COLUMN "RESTAURANT_REVIEW"."R_REVIEW_NO" IS '리뷰 번호(SEQ_REV_NO)';

COMMENT ON COLUMN "RESTAURANT_REVIEW"."R_REVIEW_TITLE" IS '글 제목';

COMMENT ON COLUMN "RESTAURANT_REVIEW"."R_REVIEW_CONTENT" IS '리뷰 내용';

COMMENT ON COLUMN "RESTAURANT_REVIEW"."R_CREATE_DATE" IS '작성일';

COMMENT ON COLUMN "RESTAURANT_REVIEW"."R_REVIEW_DEL_FL" IS '삭제여부(정상:N, 삭제:Y)';

COMMENT ON COLUMN "RESTAURANT_REVIEW"."R_STAR_POINT" IS '평점';

COMMENT ON COLUMN "RESTAURANT_REVIEW"."USER_NO" IS '회원 번호(SEQ_USER_NO)';

COMMENT ON COLUMN "RESTAURANT_REVIEW"."R_THUMBNAIL" IS '썸네일이미지';



CREATE TABLE "CHATTING" (
   "CHAT_NO"   NUMBER      NOT NULL PRIMARY KEY,
   "CHAT_CONTENT"   VARCHAR2(1500)      NOT NULL,
   "SEND_TIME"   DATE  DEFAULT SYSDATE   NOT NULL,
   "SENDER_NO"   NUMBER      NOT NULL,
   "CHATROOM_NO"   NUMBER      NOT NULL,
   "READ_ST_FL"   CHAR(1)   DEFAULT 'N'   NOT NULL
);

COMMENT ON COLUMN "CHATTING"."CHAT_NO" IS '채팅 메세지 번호';

COMMENT ON COLUMN "CHATTING"."CHAT_CONTENT" IS '채팅 내용';

COMMENT ON COLUMN "CHATTING"."SEND_TIME" IS '채팅 전송 시간';

COMMENT ON COLUMN "CHATTING"."SENDER_NO" IS '작성자 번호';

COMMENT ON COLUMN "CHATTING"."CHATROOM_NO" IS '1:1상담방(채팅방) 번호';

COMMENT ON COLUMN "CHATTING"."READ_ST_FL" IS '읽음여부(N:안읽음, Y:읽음)';



CREATE TABLE "RESERVATION" (
   "RESERVATION_NO"   NUMBER      NOT NULL PRIMARY KEY,
   "RESERVATION_NAME"   VARCHAR2(500)     NOT NULL,
   "RESERVATION_DEL_FL"   CHAR(1)   DEFAULT 'N'   NOT NULL,
   "RESERV_START_DATE"   VARCHAR2(200)     NOT NULL,
   "RESERV_END_DATE"   VARCHAR2(200)     NOT NULL,
   "PRICE"   NUMBER      NOT NULL,
    "RESERV_TYPE" CHAR(1) NOT NULL,
   "PAY_TIME"   DATE   DEFAULT SYSDATE   NOT NULL,
   "RESERV_UID" VARCHAR2(200) NOT NULL,
   "USER_NO"   NUMBER      NOT NULL
);

COMMENT ON COLUMN "RESERVATION"."RESERV_TYPE" IS '숙소 : A, 기차 :T, 버스 : B';

COMMENT ON COLUMN "RESERVATION"."RESERV_UID" IS '포트원 결제 고유아이디(취소를위해필요)';

COMMENT ON COLUMN "RESERVATION"."RESERVATION_NAME" IS '상품명(예약명)';

COMMENT ON COLUMN "RESERVATION"."RESERVATION_DEL_FL" IS '예약:N /  취소:Y';

COMMENT ON COLUMN "RESERVATION"."RESERV_START_DATE" IS '예약 시작 날짜';

COMMENT ON COLUMN "RESERVATION"."RESERV_END_DATE" IS '예약 끝 날짜';

COMMENT ON COLUMN "RESERVATION"."PRICE" IS '이용 가격';

COMMENT ON COLUMN "RESERVATION"."PAY_TIME" IS '결제한 시간';

COMMENT ON COLUMN "RESERVATION"."USER_NO" IS '사용자 번호(SEQ_USER_NO)';



CREATE TABLE "ACC_GRADE" (
   "ACC_CODE"   NUMBER      NOT NULL,
   "ACC_TYPE"   VARCHAR2(20)      NOT NULL,
   "ROOM_PRICE"   NUMBER      NOT NULL,
   "ROOM_CAPACITY"   NUMBER      NOT NULL,
   "ROOM_CHECKIN" VARCHAR2(50) NOT NULL,
   "ROOM_CHECKOUT" VARCHAR2(50) NOT NULL,
   "ACC_NO"   NUMBER      NOT NULL
);

COMMENT ON COLUMN "ACC_GRADE"."ACC_CODE" IS '객실 번호(SEQ_A_GRADE_NO)';

COMMENT ON COLUMN "ACC_GRADE"."ACC_TYPE" IS '객실 이름(일반, 디럭스, 스위트)';

COMMENT ON COLUMN "ACC_GRADE"."ROOM_PRICE" IS '객실 가격';

COMMENT ON COLUMN "ACC_GRADE"."ROOM_CAPACITY" IS '객실 수용인원';

COMMENT ON COLUMN "ACC_GRADE"."ROOM_CHECKIN" IS '객실 체크인시간';

COMMENT ON COLUMN "ACC_GRADE"."ROOM_CHECKOUT" IS '객실 체크아웃시간';

COMMENT ON COLUMN "ACC_GRADE"."ACC_NO" IS '숙소 번호(SEQ_ACC_NO)';

CREATE TABLE "TRANSPORTATION" (
   "RESERVATION_NO"   NUMBER      NOT NULL ,
   "DEP_PLACE"   VARCHAR2(100)      NOT NULL,
   "ARR_PLACE"   VARCHAR2(100)      NOT NULL,
   "SEAT_NO"   VARCHAR2(30)      NOT NULL,
   "TRANSP_CODE"   NUMBER      NOT NULL,
   "GRADE"   VARCHAR2(20)      NOT NULL,
   "TRAIN_CAR_NO"   NUMBER      NULL
);

COMMENT ON COLUMN "TRANSPORTATION"."DEP_PLACE" IS '출발지';

COMMENT ON COLUMN "TRANSPORTATION"."ARR_PLACE" IS '도착지';

COMMENT ON COLUMN "TRANSPORTATION"."SEAT_NO" IS '좌석번호';

COMMENT ON COLUMN "TRANSPORTATION"."TRANSP_CODE" IS '기차:1 / 버스:2';

COMMENT ON COLUMN "TRANSPORTATION"."GRADE" IS '등급';

COMMENT ON COLUMN "TRANSPORTATION"."TRAIN_CAR_NO" IS '열차칸';



CREATE TABLE "ACC_IMAGE" (
   "ACC_IMG_NO"   NUMBER      NOT NULL PRIMARY KEY,
   "ACC_IMG_RENAME"   VARCHAR2(500)      NOT NULL,
   "ACC_IMG_ORIGINAL"   VARCHAR2(500)      NOT NULL,
   "ACC_IMG_LEVEL"   NUMBER      NULL,
   "ACC_IMG_PATH"   VARCHAR2(500)      NOT NULL,
   "ACC_NO"   NUMBER      NOT NULL
);

COMMENT ON COLUMN "ACC_IMAGE"."ACC_IMG_NO" IS '이미지번호(시퀀스)';

COMMENT ON COLUMN "ACC_IMAGE"."ACC_IMG_RENAME" IS '이미지 변경명';

COMMENT ON COLUMN "ACC_IMAGE"."ACC_IMG_ORIGINAL" IS '이미지 원본명';

COMMENT ON COLUMN "ACC_IMAGE"."ACC_IMG_LEVEL" IS '이미지 위치 지정 번호';

COMMENT ON COLUMN "ACC_IMAGE"."ACC_IMG_PATH" IS '이미지 저장 폴더 경로';

COMMENT ON COLUMN "ACC_IMAGE"."ACC_NO" IS '숙소 번호';



CREATE TABLE "ACC_RATE" (
   "RATE_NO"   NUMBER      NOT NULL PRIMARY KEY,
   "A_CLEAN_RATE"   NUMBER      NOT NULL,
   "A_FAC_RATE"   NUMBER      NOT NULL,
   "A_KIND_RATE"   NUMBER      NOT NULL,
   "A_REVIEW_NO"   NUMBER      NOT NULL
);

COMMENT ON COLUMN "ACC_RATE"."RATE_NO" IS '평점 번호(SEQ_RATE_NO)';

COMMENT ON COLUMN "ACC_RATE"."A_CLEAN_RATE" IS '청결도 평점';

COMMENT ON COLUMN "ACC_RATE"."A_FAC_RATE" IS '시설 평점';

COMMENT ON COLUMN "ACC_RATE"."A_KIND_RATE" IS '직원 친절도 평점';

COMMENT ON COLUMN "ACC_RATE"."A_REVIEW_NO" IS '리뷰 번호(SEQ_REV_NO)';



CREATE TABLE "ACC_RESERVATION" (
   "RESERVATION_NO"   NUMBER      NOT NULL,
   "ACC_NO"   NUMBER      NOT NULL,
   "RES_PEOPLE"   NUMBER      NOT NULL,
   "ACC_CODE"   NUMBER      NOT NULL
);

COMMENT ON COLUMN "ACC_RESERVATION"."ACC_NO" IS '숙소 번호';

COMMENT ON COLUMN "ACC_RESERVATION"."RES_PEOPLE" IS '예약인원';

COMMENT ON COLUMN "ACC_RESERVATION"."ACC_CODE" IS '숙소 분류 코드';



-- 축제 게시판 테이블 추가
CREATE TABLE "FESTIVAL" (
   "BOARD_NO"   NUMBER   NOT NULL,
   "F_START_DATE"   DATE   NOT NULL,
   "F_END_DATE"   DATE   NOT NULL,
   "F_ADDR"   VARCHAR2(300)   NOT NULL,
   "F_PRICE"   NUMBER   NOT NULL,
   "F_HOST"   VARCHAR2(150)   NOT NULL
);

COMMENT ON COLUMN "FESTIVAL"."BOARD_NO" IS '게시글번호';
COMMENT ON COLUMN "FESTIVAL"."F_START_DATE" IS '축제시작날짜';
COMMENT ON COLUMN "FESTIVAL"."F_END_DATE" IS '축제끝날짜';
COMMENT ON COLUMN "FESTIVAL"."F_ADDR" IS '지역';
COMMENT ON COLUMN "FESTIVAL"."F_PRICE" IS '요금';
COMMENT ON COLUMN "FESTIVAL"."F_HOST" IS '주최기관';


------------------------------ 제약 조건 생성 구문---------------------------

-- 외래키 시작




ALTER TABLE "BOARD_LIKE" ADD CONSTRAINT "FK_USER_TO_BOARD_LIKE_1" FOREIGN KEY (
   "USER_NO"
)
REFERENCES "USER" (
   "USER_NO"
);

ALTER TABLE "BOARD_LIKE" ADD CONSTRAINT "FK_BOARD_TO_BOARD_LIKE_1" FOREIGN KEY (
   "BOARD_NO"
)
REFERENCES "BOARD" (
   "BOARD_NO"
);



ALTER TABLE "WISHLIST" ADD CONSTRAINT "FK_ACC_TO_WISHLIST_1" FOREIGN KEY (
   "ACC_NO2"
)
REFERENCES "ACC" (
   "ACC_NO"
);

ALTER TABLE "WISHLIST" ADD CONSTRAINT "FK_USER_TO_WISHLIST_1" FOREIGN KEY (
   "USER_NO"
)
REFERENCES "USER" (
   "USER_NO"
);



ALTER TABLE "TRANSPORTATION" ADD CONSTRAINT "FK_RESERVATION_TO_TRANSPORTATION_1" FOREIGN KEY (
   "RESERVATION_NO"
)
REFERENCES "RESERVATION" (
   "RESERVATION_NO"
);

ALTER TABLE "ACC_RESERVATION" ADD CONSTRAINT "FK_RESERVATION_TO_ACC_RESERVATION_1" FOREIGN KEY (
   "RESERVATION_NO"
)
REFERENCES "RESERVATION" (
   "RESERVATION_NO"
);

ALTER TABLE "ACC_RESERVATION" ADD CONSTRAINT "FK_ACC_TO_ACC_RESERVATION_1" FOREIGN KEY (
   "ACC_NO"
)
REFERENCES "ACC" (
   "ACC_NO"
);

ALTER TABLE "FESTIVAL" ADD CONSTRAINT "PK_FESTIVAL" PRIMARY KEY (
   "BOARD_NO"
);

--기본키 
ALTER TABLE "POLL" ADD CONSTRAINT "PK_POLL" PRIMARY KEY (
   "BOARD_NO"
);
ALTER TABLE "VOTE" ADD CONSTRAINT "PK_VOTE" PRIMARY KEY (
   "USER_NO",
   "OPTION_NO"
);
ALTER TABLE "OPTION" ADD CONSTRAINT "PK_OPTION" PRIMARY KEY (
   "OPTION_NO"
);

ALTER TABLE "TRANSPORTATION" ADD CONSTRAINT "PK_TRANSPORTATION" PRIMARY KEY (
   "RESERVATION_NO"
);

ALTER TABLE "ACC_RESERVATION" ADD CONSTRAINT "PK_ACC_RESERVATION" PRIMARY KEY (
   "RESERVATION_NO"
);



-- 외래
ALTER TABLE "POLL" ADD CONSTRAINT "FK_BOARD_TO_POLL_1" FOREIGN KEY (
   "BOARD_NO"
)
REFERENCES "BOARD" (
   "BOARD_NO"
);

ALTER TABLE "VOTE" ADD CONSTRAINT "FK_USER_TO_VOTE_1" FOREIGN KEY (
   "USER_NO"
)
REFERENCES "USER" (
   "USER_NO"
);

ALTER TABLE "VOTE" ADD CONSTRAINT "FK_OPTION_TO_VOTE_1" FOREIGN KEY (
   "OPTION_NO"
)
REFERENCES "OPTION" (
   "OPTION_NO"
);

ALTER TABLE "ACC_GRADE" ADD CONSTRAINT "PK_ACC_GRADE" PRIMARY KEY (
   "ACC_CODE"
);

ALTER TABLE "ACC_GRADE" ADD CONSTRAINT "FK_ACC_TO_ACC_GRADE" FOREIGN KEY (
   "ACC_NO"
)
REFERENCES "ACC" (
   "ACC_NO"
) ON DELETE CASCADE;

ALTER TABLE "ACC" ADD CONSTRAINT "FK_BOSS_TO_ACC" FOREIGN KEY (
   "BOSS_NO"
)
REFERENCES "BOSS" (
   "BOSS_NO"
) ON DELETE CASCADE;

--USER테이블 USER_NO 연결

ALTER TABLE "BOARD" ADD CONSTRAINT "FK_USER_TO_BOARD" FOREIGN KEY (
   "USER_NO"
)
REFERENCES "USER" (
   "USER_NO"
);

ALTER TABLE "COMMENT" ADD CONSTRAINT "FK_USER_TO_COMMENT" FOREIGN KEY (
   "USER_NO"
)
REFERENCES "USER" (
   "USER_NO"
);

ALTER TABLE "REPORT" ADD CONSTRAINT "FK_USER_TO_REPORT" FOREIGN KEY (
   "USER_NO"
)
REFERENCES "USER" (
   "USER_NO"
);

ALTER TABLE "MESSAGE" ADD CONSTRAINT "FK_USER_TO_MESSAGE" FOREIGN KEY (
   "SENDER_NO"
)
REFERENCES "USER" (
   "USER_NO"
);

ALTER TABLE "CHATROOM" ADD CONSTRAINT "FK_USER_TO_CHATROOM_1" FOREIGN KEY (
   "USER_NO"
)
REFERENCES "USER" (
   "USER_NO"
);

ALTER TABLE "CHATROOM" ADD CONSTRAINT "FK_USER_TO_CHATROOM_2" FOREIGN KEY (
   "MANAGER_NO"
)
REFERENCES "USER" (
   "USER_NO"
);


ALTER TABLE "CHATTING" ADD CONSTRAINT "FK_USER_TO_CHATTING" FOREIGN KEY (
   "SENDER_NO"
)
REFERENCES "USER" (
   "USER_NO"
);

ALTER TABLE "RESERVATION" ADD CONSTRAINT "FK_USER_TO_RESERVATION" FOREIGN KEY (
   "USER_NO"
)
REFERENCES "USER" (
   "USER_NO"
);

ALTER TABLE "ACC_REVIEW" ADD CONSTRAINT "FK_USER_TO_ACC_REVIEW" FOREIGN KEY (
   "USER_NO"
)
REFERENCES "USER" (
   "USER_NO"
);

ALTER TABLE "RESTAURANT_REVIEW" ADD CONSTRAINT "FK_USER_TO_RESTAURANT_REVIEW" FOREIGN KEY (
   "USER_NO"
)
REFERENCES "USER" (
   "USER_NO"
);


-- 채팅룸 - 채팅 연결
ALTER TABLE "CHATTING" ADD CONSTRAINT "FK_CHATROOM_TO_CHATTING" FOREIGN KEY (
   "CHATROOM_NO"
)
REFERENCES "CHATROOM" (
   "CHATROOM_NO"
)ON DELETE CASCADE;


-- 신고 - 댓글, 게시글 연결
ALTER TABLE "REPORT" ADD CONSTRAINT "FK_COMMENT_TO_REPORT" FOREIGN KEY (
   "REPLY_NO"
)
REFERENCES "COMMENT" (
   "COMMENT_NO"
);

ALTER TABLE "REPORT" ADD CONSTRAINT "FK_BOARD_TO_REPORT" FOREIGN KEY (
   "BOARD_NO"
)
REFERENCES "BOARD" (
   "BOARD_NO"
);


-- 게시판 - 댓글 연결
ALTER TABLE "COMMENT" ADD CONSTRAINT "FK_BOARD_TO_COMMENT" FOREIGN KEY (
   "BOARD_NO"
)
REFERENCES "BOARD" (
   "BOARD_NO"
);

-- 게시판 - 축제 연결
ALTER TABLE "FESTIVAL" ADD CONSTRAINT "FK_BOARD_TO_FESTIVAL" FOREIGN KEY (
   "BOARD_NO"
)
REFERENCES "BOARD" (
   "BOARD_NO"
);


-- 숙소 예약 - 객실 연결
ALTER TABLE "ACC_RESERVATION" ADD CONSTRAINT "FK_ACC_GRADE_TO_ACC_RESERVATION" FOREIGN KEY (
   "ACC_CODE"
)
REFERENCES "ACC_GRADE" (
   "ACC_CODE"
);

-- 숙소 - 숙소 이미지 연결
ALTER TABLE "ACC_IMAGE" ADD CONSTRAINT "FK_ACC_TO_ACC_IMAGE" FOREIGN KEY (
   "ACC_NO"
)
REFERENCES "ACC" (
   "ACC_NO"
) ON DELETE CASCADE;


-- 숙소리뷰 - 평점 연결
ALTER TABLE "ACC_RATE" ADD CONSTRAINT "FK_ACC_REVIEW_TO_ACC_RATE" FOREIGN KEY (
   "A_REVIEW_NO"
)
REFERENCES "ACC_REVIEW" (
   "A_REVIEW_NO"
);


-- 게시판 - 게시판 종류 연결
ALTER TABLE "BOARD" ADD CONSTRAINT "FK_BOARD_TYPE_TO_BOARD" FOREIGN KEY (
   "BOARD_CODE"
)
REFERENCES "BOARD_TYPE" (
   "BOARD_CODE"
);

-- 투표 - 선택지 연결
ALTER TABLE "OPTION" ADD CONSTRAINT "FK_POLL_TO_OPTION" FOREIGN KEY (
   "BOARD_NO"
)
REFERENCES "POLL" (
   "BOARD_NO"
);




-------- 시퀀스 추가-------------------------------------------
CREATE SEQUENCE SEQ_USER_NO NOCACHE; -- 회원번호
CREATE SEQUENCE SEQ_ACC_NO NOCACHE; -- 숙소
CREATE SEQUENCE SEQ_ACC_IMG_NO NOCACHE; -- 숙소 이미지 번호
CREATE SEQUENCE SEQ_RATE_NO NOCACHE; -- 숙소 평점 번호
CREATE SEQUENCE SEQ_A_REV_NO NOCACHE; -- 숙소 리뷰 번호
CREATE SEQUENCE SEQ_RES_NO NOCACHE; -- 예약 번호
CREATE SEQUENCE SEQ_R_REV_NO NOCACHE;  -- 맛집 리뷰 번호
CREATE SEQUENCE SEQ_BOARD_NO NOCACHE; -- 게시글 번호
CREATE SEQUENCE SEQ_COMMENT_NO NOCACHE; -- 댓글 번호 
CREATE SEQUENCE SEQ_MESSAGE_NO NOCACHE; -- 쪽지 번호
CREATE SEQUENCE SEQ_CHATROOM_NO NOCACHE; -- 채팅방 번호
CREATE SEQUENCE SEQ_CHAT_NO NOCACHE; -- 채팅 번호
CREATE SEQUENCE SEQ_OPTION_NO NOCACHE; -- option 번호(투표)
CREATE SEQUENCE SEQ_A_GRADE_NO NOCACHE;

-------------------------------- 더미데이터 작업 시작 ---------------------------------------


-- 회원 , 관리자 더미데이터
INSERT INTO "USER" VALUES(SEQ_USER_NO.NEXTVAL,'관리자쨩','20010101','M','주소','admin01','$2a$10$vdsGrVXvJp3OsSfFCgYZpev8mVHaqDhC.smXgz8OisUeRgFDLReZ6','나는관리자','01012341234','admin@naver.com',sysdate,'',default,3);
INSERT INTO "USER" VALUES(SEQ_USER_NO.NEXTVAL,'이순신','20010101','M','asd','user01','$2a$10$vdsGrVXvJp3OsSfFCgYZpev8mVHaqDhC.smXgz8OisUeRgFDLReZ6','나는장군','01012341234','jimin10722@naver.com',sysdate,'',default,1);
INSERT INTO "USER" VALUES(SEQ_USER_NO.NEXTVAL,'사업자','20010101','M','qwe','boss01','$2a$10$vdsGrVXvJp3OsSfFCgYZpev8mVHaqDhC.smXgz8OisUeRgFDLReZ6','나는사업자','01012341234','jimin10723@naver.com',sysdate,'',default,2);
INSERT INTO "USER" VALUES(SEQ_USER_NO.NEXTVAL,'유저','20010101','M','zxc','user02','$2a$10$vdsGrVXvJp3OsSfFCgYZpev8mVHaqDhC.smXgz8OisUeRgFDLReZ6','나는유저','01012341234','jimin1074@naver.com',sysdate,'',default,1);
INSERT INTO "BOSS" VALUES('1231231234', '1231231234', 3); 
commit;

-- 게시판 카테고리
INSERT INTO BOARD_TYPE VALUES(1,'공지사항');
INSERT INTO BOARD_TYPE VALUES(2,'국내축제 게시판');
INSERT INTO BOARD_TYPE VALUES(3,'투표 게시판');
INSERT INTO BOARD_TYPE VALUES(4,'자유 게시판');



-- 샘플 유저
INSERT INTO "USER" VALUES(SEQ_USER_NO.NEXTVAL,'유재신','19931001','M','asd','user03','$2a$10$vdsGrVXvJp3OsSfFCgYZpev8mVHaqDhC.smXgz8OisUeRgFDLReZ6','짱짱','01020189926','sunnyy215@naver.com',sysdate,'',default,2);

INSERT INTO "USER" VALUES(SEQ_USER_NO.NEXTVAL,'장두연','19951212','F','경기도 어딘가 저리고리','user04','$2a$10$vdsGrVXvJp3OsSfFCgYZpev8mVHaqDhC.smXgz8OisUeRgFDLReZ6','숙소짱','01066665555','sunnyy215@naver.com',sysdate,'',default,2);
commit;
         </code>
     </pre>
</details>

<br>
첫번째 SQL문 DB에 실행하고 프로그램 구동 후 두번째 SQL문 넣는 이유는
프로그램 구동할 때 숙소공공데이터 끌어와서 DB에 자동으로 넣고 그 숙소에 맞는 데이터 값 두번째 SQL에서 넣기 때문입니다.
<br>
<br>

<details>
    <summary>
        두번째 SQL문
    </summary>
    <pre>
      <code>
-- 지선님 데이터 시작


-- 공지사항 테이블 샘플 데이터 삽입(PL/SQL)
BEGIN
   FOR I IN 1..80 LOOP
      INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              SEQ_BOARD_NO.CURRVAL || '번째 공지사항 게시글',
              SEQ_BOARD_NO.CURRVAL || '번째 공지사항 게시글 내용 입니다.',
              DEFAULT, DEFAULT, DEFAULT, 1, 1
      );
   END LOOP;
END;
/
commit;



-- 축제 샘플 데이터
INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '웨이뷰 유채꽃 축제',
              '<p>웨이뷰는 제주시 한림읍에 위치한 프리미엄 베이커리 카페이다. 2024년 봄을 맞아 유채꽃 축제가 열리고있다. 제주 봄의 꽃 유채, 시원한 파노라마 오션뷰, 맛있는 베이커리와 음료들을 웨이뷰에서 한번에 즐길 수 있다.<br>
웨이뷰는 지상 1층과 2층, 루프탑을 포함한 총 3층으로 운영되고있으며, 모든 층 전 좌석에서 파노라마 오션뷰를 느껴볼 수 있다. 또한, 웨이뷰에서 사용되는 모든 식재료들은 제주 농장에서 재배한 특산물을 엄선핸 선정했으며, 당일 생산, 당일폐기를 원칙으로 높은 퀄리티의 베이커리를 제공하는 것을 원칙으로 하고있다. 축제 기간동안에는 웨이뷰의 유채꽃 관련된 음료와 베이커리를 만나볼 수 있다.</p>',
              DEFAULT, 20, DEFAULT, 2, 1
      );
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-03-15 00:00:00',
            '2024-05-31 00:00:00',
            '제주특별자치도 제주시 한림읍 옹포7길 25-3 ',
            '0',
            '주식회사 웨이뷰'
    );
      
      
      
      
INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '구례산수유꽃축제',
              '<p>새봄의 정취를 느낄 수 있는 대한민국 대표 봄꽃축제이다. 산수유꽃은 3월에 다른 꽃보다 먼저 개화해 봄 소식을 전한다. 산수유의 꽃말인 ‘영원불변의 사랑’을 주제로 다양한 체험프로그램과 음악회가 개최된다.</p>',
              DEFAULT, 30, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-03-09 00:00:00',
            '2024-03-17 00:00:00',
            '전라남도 구례군 산동면 상관1길 45',
            '0',
            '구례산수유꽃축제추진위원회'
    );
    
INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '광양 매화축제',
              '<p>광양매화축제는 섬진강변과 청매실농원을 중심으로 33㎡ 매화군락이 환상적인 장관을 이루며 해마다 100만이 넘는 관광객을 불러모은다. 올해로 제23회를 맞는 광양매화축제는 오는 3월8일부터 17일까지 광양 매화, K-문화를 담다라는 주제와 매화가 오니 봄이 피었습니다를 슬로건 아래 차별화되고 매력적인 콘텐츠가 준비되어 있다. K-문화의 원조인 4군자 테마관을 운영하고 안전하고 쾌적한 축제장 마련을 위해 개최 최초 축제장 유료화(전액 축제상품권 환원), 차 없는 거리 등을 시도한다. 아울러 매화 꽃 흩날리는 매화 팜파티 등을 선사하는 1박2일 프로그램, 매실 하이볼 체험, 나만의 공간 매화나무 아래, 섬진강 맨발(얼음길)걷기 등 광양매화축제에서만 즐길 수 있는 킬러콘텐츠를 대거 도입한다.</p>',
              DEFAULT, 15, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-03-08 00:00:00',
            '2024-03-17 00:00:00',
            '전라남도 광양시 다압면 지막1길 55' ,
            '5000',
            '광양매화축제위원회'
    );
    

INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '마노르블랑 봄에 꽃향기축제',
              '<p>마노르블랑은 서귀포시에 위치한 가든 카페이다.
마노르블랑에서는 올해 봄을 맞이하여 봄에 꽃향기축제가 열리고 있다. 꽃의 여왕 장미, 다양한 색의 프리지어꽃과 레몬향이 나며 노랑색 꽃이 일품인 애니시다 그리고 샤넬향수의 원료로 쓰이며 향이좋은 서향동백과 함께 즐길수있다. 그밖에 왕수선화, 노란색 아카시아, 루피너스 등도 있다.
또한, 마노르블랑은 우리나라 최남단에 위치하고 있어 다양한 식물들이 식재되어 있기에 제주도를 찾는 수많은 관광객들은 물론이며 제주도민까지도 찾는 명소이다. 4000여 평 정원 속에 다양한 산책로가 있으며 산방산과 송악산 사이로 형제섬과 사계 앞바다가 보이는 환상적인 조망 또한 마노르블랑의 자랑거리이다.</p>',
              DEFAULT, 295, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-03-05 00:00:00',
            '2024-04-14 00:00:00',
            '제주특별자치도 서귀포시 안덕면 일주서로2100번길 46' ,
            '0',
            '마노르블랑'
    );
    
    
INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '세계오르골페스티벌와 유럽동화나라축제',
              '<p>우선 쁘띠프랑스에서 올해 처음으로 진행되는 2024 세계오르골 페스티벌에서는, 3월 오르골하우스 리뉴얼 개장과 함께 쁘띠프랑스만의 명물이자 국내에서 보기 힘든 오르골 150여 종을 선보일 예정이다. 유럽 중심의 세계적인 오르골들의 다양한 종소리, 조화롭게 울려 퍼지는 금속 실린더 소리와 함께 19세기 유럽 그 시절로 떠나보는 세계오르골시연와 설명도 매일 현장에서 진행된다.
그리고 이탈리아마을에서 진행되는 이번 유럽동화나라축제는, 3월 개학시즌을 맞이하여 학생자녀를 둔 가족관람객들에게 어린 시절 읽어보았던 동화책 속 주인공들을 마리오네트 퍼포먼스 등의 인형극과 다양한 동화나라 포토존 및 전시체험을 통해 선보일 예정이다. 특히 3월부터 진행되는 실내인형극 피노키오의 모험은, 1833년 이탈리아 동화작가 카를로 콜로디가 쓴 원작을 바탕으로, 목수인 제페토 할아버지의 간절한 소원으로 생명을 얻은 나무 인형 피노키오가, 사악한 여우 사기꾼, 어린이를 당나귀로 만드는 마술사, 잔인한 서커스 단장 등에 맞서 파란만장한 모험을 겪는 이야기를 교육적이고 재미있는 마리오네트 인형극으로 재해석한 공연작품이다.</p>',
              DEFAULT, 26, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-03-01 00:00:00',
            '2024-05-13 00:00:00',
            '경기도 가평군 청평면 호반로 1063' ,
            '0',
            '㈜쁘띠프랑스'
    );
    
    
INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '청도 프로방스 빛축제',
              '<p>1996년 청도 테마랜드로 오픈하였다. 2012년 청도프로방스 포토랜드로 새롭게 단장하여 여러분을 맞이한지 10년이 흘렀다.<br>
프랑스의 정감있는 프로방스마을을 청도에 그대로 재현하였다. 투명한 햇살 아래 무르익은 포도, 광활하게 펼쳐진 보랏빛의 라벤더, 풍요로운 대자연 속에 독특한 문화와 예술이 살아 숨 쉬는 그 곳은 바로 프랑스 남동부 지역의 프로방스 마을이다. 고흐, 세잔, 샤갈, 마티스 등이 사랑한 그 곳 프로방스 마을로의 로맨틱한 여행과 빛축제를 즐길수 있는 곳이다. 낮에는 100여가지 다양한 포토존과 아기자기한 소품, 예쁜 집들이 여러분을 맞이하고 어둠이 내리면 눈부시게 빛나는 빛 축제로 변신하는 곳이다.</p>',
              DEFAULT, 42, DEFAULT, 2, 2
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-02-19 00:00:00',
            '2024-11-17 00:00:00',
            '경상북도 청도군 화양읍 이슬미로 272-23 ' ,
            '12000',
            '청도 프로방스'
    );


INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '만수천 빛의거리',
              '<p>만수천 빛의거리는 인천광역시 남동구 만수복개천 공영주차장 양옆 일방통행 전구간(만수동 1003)에 걸쳐 2023년 12월에 조성되었다. 1공영주차장과 2공영주차장 사이에 12m의 대형 크리스마스 트리가 설치되고 2가지의 서로다른 빛의 터널이 방문객들을 맞는다. 2공영주차장과 3공영주차장 사이에는 민들레 꽃밭과 보름달을 형상화한 포토존이 놓이고 3공영주차장과 4공영주차장 사이에는 LED놀이터 포토존도 선보인다. 더불어 전구간에 걸쳐 아름다운 오로라라이트와 전구조명이 밤을 밝게 밝힌다.</p>',
              DEFAULT, 48, DEFAULT, 2, 2
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-02-01 00:00:00',
            '2024-12-31 00:00:00',
            '인천광역시 남동구 만수동 1003 일원' ,
            '00',
            '남동구'
    );
    
    
INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '율봄식물원 딸기 시즌',
              '<p>달콤한 딸기의 계절. 율봄식물원에서 딸기를 활용한 다양한 체험과 아이들을 위한 즐길거리를 만날 수 있다. 농촌테마식물원인 율봄식물원은 2만 여평에 실외 공간에 조성된 야외 식물원으로 식물원과 어우러지는 농촌경관의 모습, 그 안에서 진행되는 계절별 농촌체험, 아름답게 가꿔진 청정 자연 속에서의 편안한 휴식과 함께 정직하게 재배된 신선한 농산물을 이용한 계절별 체험이 가능한 청정 자연 체험 학습 공간이다.</p>',
              DEFAULT, 63, DEFAULT, 2, 2
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2023-12-16 00:00:00',
            '2024-04-28 00:00:00',
            '경기도 광주시 퇴촌면 도마리 84' ,
            '5000',
            '율봄식물원(율봄농업예술원)'
    );
    
INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '휴애리 유채꽃 축제',
              '<p>2023 휴애리 유채꽃 축제는 서귀포시 남원읍 신례리에 위치한 휴애리의 새로운 축제이다. 이번 휴애리 유채꽃 축제는 한라산이 가장 예쁘게 보이는 유채꽃 5,000평 밭에서 직접 감상할 수 있다. 휴애리 유채꽃 축제는 웨딩스냅, 우정스냅 등 인생사진 찍기 좋은 장소로 인정받아 지금현재 많은 스냅업체에서 사진찍기 좋은 필수 코스로 각광 받고 있다.</p>',
              DEFAULT, DEFAULT, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2023-11-07 00:00:00',
            '2024-04-30 00:00:00',
            '제주특별자치도 서귀포시 신례동로 256 휴애리' ,
            '13000',
            '휴애리 자연생활공원/휴애리 자연생활공원'
    );
    
INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '이천백사 산수유꽃축제',
              '<p>세계적인 관광도시로의 발전가능성을 안고 있는 이천에 매년 새봄을 알리는 산수유꽃축제가 개최된다. 공해에 약하지만 내한성이 강하고 이식력이 좋아 진달래나 개나리,벚꽃보다 먼저 개화하는 봄의 전령사인 산수유 나무는 시원한 느낌을 주는 수형과 아름다운 열매로 조경수로서의 가치가 상당히 높다. 큰 그늘을 만들어 여름철 사랑을 듬뿍 받고 있는 산수유나무는 특히 이른 봄에 개화하는 화사한 황금색의 꽃이 매우 인상적이다. 행사 개최지인 백사면은 수령이 100년이 넘는 산수유가 자생군략지를 형성하고 있는데 백사면 송말리, 경사리, 도립리 등 원적산 기슭의 농가에서 산수유나무로 뒤덮여 있어 초봄에는 노란 꽃이, 가을엔 빨간 열매가 온 마을을 감싸는 전국 제일의 산수유 산지이다. 이천에서 가장 높은 원적산(634m) 아래 자리한 영원사를 향해 가는 길은 송말리에서부터 도립리를 거쳐 경사리에 이르기까지 산수유나무가 대규모 군락을 이루고 있다. 구불구불한 길을 따라 원적산 자락을 향하여 조금만 가다 보면 이내 주변 풍경을 노란색 원색으로 물들인 산수유 꽃 군락과 마주친다.</p>',
              DEFAULT, 84, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-03-22 00:00:00',
            '2024-03-24 00:00:00',
            '경기도 이천시 백사면 원적로775번길 12' ,
            '0',
            '이천백사 산수유꽃축제추진위원회/산수유꽃축제추진위원회'
    );

INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '청춘, 금오천 벚꽃 페스티벌',
              '<p>봄의 시작을 알리는 벚꽃 시즌, 구미시 금오천을 따라 다양한 경험이 가능한 거리예술축제가 개최된다. 8가지 포토스팟, 게임, 15가지 길거리 음식, 생활예술공예 등 다양한 체험을 한 자리에서 경험할 수 있다. 가족, 연인과 함께 벚꽃와 개나리가 피어난 거리에서 사진도 찍을 수 있다.</p>',
              DEFAULT, 102, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-03-22 00:00:00',
            '2024-03-26 00:00:00',
            '경상북도 구미시 산책길 105 (남통동)' ,
            '0',
            '구미시/숨협동조합'
    );
    
    
INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '여주 남한강 대보름 달집태우기 축제',
               '<p>여주 달맞이광장에서는 정월대보름에 높이15m 지름12m인 달집태우기 축제가 열린다.
여주 정월대보름 달집태우기 축제는 승마체험, 쥐불놀이용 깡통 만들기, 연 만들기와 함께 참여한 주민들이 한해의 계획과 소망을 적은 소원지를 작성해 달집에 미리 묶어 놓아 축제이다. 재미있고 다양한 각종 공연행사, 이벤트행사, 체험행사가 준비되어있다.</p>',
                DEFAULT, 64, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-02-24 00:00:00' ,
            '2024-02-24 23:00:00',
            '경기도 여주시 천송동 575' ,
            '0',
            '여주시민연합/여주세종문화재단'
    );
    
INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '정월대보름 한마당',
               '<p>2024 갑진년 정월대보름 한마당은 민족 고유의 세시풍속인 정월대보름의 의미 공유하며 대보름 관련 세시풍속행사 체험을 통한 민속 문화 이해 증진한다. 국내‧외 관람객, 전 연령층이 함께 할 수 있는 다양한 문화체험 공간을 제공한다.</p>',
               DEFAULT, 85, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-02-24 00:00:00',
            '2024-02-24 23:00:00',
            '서울특별시 종로구 삼청로 37 (세종로)' ,
            '0',
            '국립민속박물관'
    );    
    
    
COMMIT;


INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '얼음나라화천 산천어축제',
               '<p>강원특별자치도 화천에서 열리는 얼음나라화천 산천어축제는 2011년 미국 CNN이 선정한 겨울의 7대 불가사의 중 하나로 꼽힌 이색 겨울축제다. 물 맑기로 유명한 화천천이 꽁꽁 얼어붙는 매년 1월에 축제가 열리며 얼음낚시, 맨손잡기 등으로 계곡의 여왕이라고 불리는 산천어를 잡는 체험을 할 수 있다. 산천어 얼음낚시의 손맛은 물론 바로 회나 구이로 맛있게 먹을 수 있고 낚시 외에도 얼음썰매, 눈썰매, 봅슬레이 등의 다양한 겨울놀이가 펼쳐져 매년 100만명 이상이 방문하고 있다.</p>',
               DEFAULT, 68, DEFAULT, 2, 3
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-01-06 00:00:00',
            '2024-01-28 00:00:00',
            '강원특별자치도 화천군 화천읍 산천어길 137 ' ,
            '15000',
            '화천군/재단법인 나라'
    ); 


INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '영양꽁꽁겨울축제',
               '<p>제1회 영양꽁꽁겨울축제는 영양군 영양읍 현리 670번지 일원에서 개최되는 겨울축제로서 20년 전통의 영양무료빙상장을 확대개편하여 개최되는 최초의 영양군 겨울축제이다. 영양군 반변천에서 개최되는 영양겨울축제는 빙상장(스케이트장. 얼음썰매장, 얼음열차), 놀이 시설(눈썰매장, 회전눈썰매장) 그리고 체험프로그램인 빙어체험장, 빙어낚시터 부대행사로서 마술쇼와 페이스페인팅과 목공예 체험 등의 다양한 프로그램이 있으며 이외에도 에어돔과 이글루 체험 등 다양한 부대 시설을 갖추어 온 가족이 참가하여 즐길 수 있는 따뜻한 겨울 축제가 마련되어있다. 이제 온 가족이 함께 꽁꽁 영양 겨울 축제에 참가하여 겨울의 정취를 만끽하고 따뜻하고 아름다운 추억을 만들 수 있다.</p>',
               DEFAULT, 84, DEFAULT, 2, 3
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-01-05 00:00:00',
            '2024-01-28 00:00:00',
            '경상북도 영양군 영양읍 현리 670번지 빙상장일원' ,
            '2000',
            '영양군/영양군체육회'
    ); 

INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '함안곶감축제',
               '<p>아라가야의 역사가 깃든 함안곶감은 옛부터 맛과 향이 좋아 조선시대 임금님께 올리는 진상품곶감으로 유명하다. 함안수시감은 다른 품종의 감보다 무게는 제일 적지만 홍시가 되었을때 가장 달고 향이 짖은 감이다. 이 감으로 곶감을 만들어 놓으니 맛과 향, 식감이 아주좋아 전국에서 제일 맛있는 함안 수시 곶감이 탄생되었다.</p>',
               DEFAULT, 236, DEFAULT, 2, 3
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-01-12 00:00:00',
            '2024-01-14 00:00:00',
            '경상남도 함안군 함안대로 619-4 함안스포츠타운' ,
            '0',
            '함안곶감축제위원회'
    ); 


INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '양평 빙어축제',
               '<p><양평빙어축제>는 매년 12월 말부터 2월 중순까지 백동저수지에서 개최된다. 양평의 깊은 산중에 자리잡은 백동저수지는 1992년을 시작으로 매년 빙어자원을 꾸준이 조성하여, 수려한 경관과 함께 빙어낚시의 명소로 자리매김하고 있다. 빙어낚시는 물론이고, 드넓은 얼음나라에서 다양한 겨울놀이를 온 가족과 함께 즐길 수 있다.</p>',
               DEFAULT, 410, DEFAULT, 2, 3
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-01-05 00:00:00',
            '2024-01-21 00:00:00',
            '경기도 양평군 단월면 백동길 269-19 백동저수지' ,
            '10000',
            '양평빙어축제위원회'
    );

commit;

INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '논산딸기축제',
               '<p>제26회 `2024논산딸기축제’는 2027 세계 엑스포를 향하여 만전을 기하고 있다. ‘논산딸기와 사랑에 빠지다’를 주제로 펼쳐지는 이번 축제는 ‘딸기 모형의 무대’, ‘딸기 디저트 카페’,‘가족들간의 쉼터를 위한 피크닉 존’, ‘어린이들의 재미를 위한 과학체험키즈존, 타이탄 퍼포먼스 그 외 키즈프로그램’ 등의 새롭고 다양한 프로그램을 선보인다. 특히 육군항공학교와 함께하는 ‘헬기 탑승 체험, ‘헬기 전시’ 체험 프로그램은 국방친화적인 논산의 특화 콘텐츠로 특별히 마련되어 먹거리, 볼거리, 즐길거리가 풍성한 축제로 기대를 모으고 있다.</p>',
               DEFAULT, 25, DEFAULT, 2, 3
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-03-21 00:00:00',
            '2024-03-24 00:00:00',
            '충청남도 논산시 시민로 270 (내동)' ,
            '0',
            '논산시/(재)논산문화관광재단'
    );

INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '영암왕인문화축제',
              '<p>왕인문화축제는 왕인박사의 학문과 업적을 기리고 계승하기 위해 매년 봄 개최된다. "시공초월(時空超越), 왕인의 문화 빛이 되다!"라는 주제로 3월 28일부터 3월 31일까지 4일간 왕인박사유적지 일원에서 펼쳐지며 왕인의 인문학적 가치를 현대적으로 재해석한 문자, 활자를 활용한 주요 콘텐츠와 왕인과 함께 일본 아스카 문화를 꽃피운 도공(陶工), 와공(瓦工), 불공(佛工) 등 다양한 분야의 기술과 왕인 일본 방문을 기점으로 일본의 사회적, 정치적, 경제적인 변화를 축제 콘텐츠를 통해 선보이는 대한민국 대표 인문축제이다.</p>',
               DEFAULT, 84, DEFAULT, 2, 3
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-03-28 00:00:00',
            '2024-03-31 00:00:00',
            '전라남도 영암군 군서면 왕인로 440' ,
            '0',
            '영암군/영암문화관광재단'
    );
    
INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '고령대가야축제',
              '<p>2024년 고령대가야축제는 「지산동 고분군 세계유산 등재」와 함께 다가오는 2025년 축제 탄생 20주년을 기념하는 다양한 퍼포먼스를 구현하여 관광객들에게 많은 볼거리를 선사할 예정이다.</p>',
               DEFAULT, 23, DEFAULT, 2, 3
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-03-29 00:00:00',
            '2024-03-31 00:00:00',
            '경상북도 고령군 대가야로 1216 대가야역사테마관광지' ,
            '0',
            '고령군/(사)고령군관광협의회'
    );

INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '렛츠런파크 서울 벚꽃축제 벚꽃야경',
              '<p>‘나만 알고 싶은’ 숨은 벚꽃 명소 렛츠런파크 서울에서 올해도 벚꽃축제가 개최된다. 2024년 벚꽃축제 ’벚꽃야경’은 벚꽃과 야경, 야간경마가 어우러진 렛츠런파크 서울에서만 즐길 수 있는 특별한 벚꽃축제를 의미한다. 올해는 기존에 여름에 진행되었던 야간경마를 봄에 시행하면서 꽃놀이를 즐기며 야간경마를 관람할 수 있는 더욱 이색적인 경험을 제공할 예정이다. 총 4주간 진행되는 축제는 벚꽃 기간 2주와 야간경마 기간 2주로 구성된다. 벚꽃을 만끽할 수 있는 다양한 포토존과 참여 프로그램들이 준비되어 있다.</p>',
               DEFAULT, 51, DEFAULT, 2, 3
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-03-29 00:00:00',
            '2024-04-21 00:00:00',
            '경기도 과천시 경마공원대로 107 (주암동)' ,
            '0',
            '렛츠런파크 서울'
    );

INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '부곡온천축제',
              '<p>`부곡온천`은 의료적 효능이 입증된 전국 최고의 수온(78℃)으로 전국에서 가장 뜨거운 온천수를 자랑하는 온천이다. 또한 부곡온천수는 활성산소를 제거해 피부노화 방지와 성인병 치료, 피부미용 효과가 탁월한 것으로 유명하다. `부곡온천축제`는 부곡온천의 효능에 걸맞게 온천수를 이용한 다채로운 프로그램이 마련된 대표적인 온천축제이다. 행사기간 동안 부곡 온천수의 영구분출과 부곡온천관광특구의 안녕을 기원하는 산신제`를 시작으로 온정제와 관광객 노래자랑, 개막 축하 공연, 연극공연 등 온천수를 활용한 다양한 프로그램이 진행된다. 온천욕과 더불어 다양한 공연을 즐길 수 있는 창녕 부곡온천으로 오셔서 가족과 함께 좋은 추억을 만들어가시길 바란다.</p>',
               DEFAULT, 86, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-03-29 00:00:00',
            '2024-03-31 00:00:00',
            '경상남도 창녕군 부곡면 거문리' ,
            '0',
            '창녕군/(사)부곡온천관광협의회'
    );
 
 INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '창덕궁 달빛기행',
              '<p>창덕궁 달빛기행은 은은 달빛아래 녹음이 어우러진 창덕궁에서 전문해설사와 함께 궁궐의 곳곳을 관람하며, 각 전각에 대한 해설과 전통예술공연을 관람할 수 있는 프로그램이다. 창덕궁 정문인 돈화문에서 출발해 진선문 · 인정전 · 희정당 · 낙선재 · 상량정 · 부용지 · 불로문 · 애련정 · 연경당 · 후원 숲길을 이동하며 창덕궁 달빛기행에서만 경험할 수 있는 특별한 감동을 선사할 것이다.</p>',
              DEFAULT, 108, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-04-11 00:00:00',
            '2024-06-02 00:00:00',
            '서울특별시 종로구 율곡로 99 (와룡동)' ,
            '30000',
            '문화재청 궁능유적본부/한국문화재재단'
    );   
    
 INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '4·19혁명국민문화제',
              '<p>4·19혁명을 기념하여 범정부 차원의 지원 하에 전국민이 참여하는 4·19혁명국민문화제가 개최된다. 자유,민주,정의의 역사인 4·19혁명을 계승하고 전국민이 소통하는 화합의 장으로 마련된 이번 문화제는 4·19혁명의 감동과 대한민국의 희망을 온몸으로 느낄 수 있다.</p>',
              DEFAULT, 64, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-04-12 00:00:00',
            '2024-04-19 00:00:00',
            '서울특별시 강북구 도봉로89길 13 (수유동)' ,
            '0',
            '강북구, 4·19민주혁명회, 4·19혁명희생자유족회, 4·19혁명공로자회/ 4·19혁명국민문화제위원회'
    );     
    
 INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '베어트리파크 철쭉제 `봄과 철쭉`',
              '<p>베어트리파크에서는 4월 13일(토)부터 5월 6일(월)까지 봄꽃 페스티벌 ‘철쭉제’가 열린다.<br>
매화와 벚꽃이 지는 아쉬움을 뒤로하고 봄꽃의 대미를 장식할 화려한 철쭉이 베어트리파크 전체를 수놓는다. 베어트리파크에는 붉은 꽃잎의 영산홍, 흰 꽃이 피는 백철쭉, 진한 보랏빛의 대왕철쭉 등 다양한 색의 철쭉 9만여 그루가 화려하게 피어난다. 특히 입구의 오색연못에서는 수백 마리의 비단잉어와 철쭉이 만나 화려한 색채로 장관을 이룬다. 이 기간 동안 봄꽃구경과 함께 가족, 연인과 즐겁고 안전한 추억을 만들어 갈 수 있도록 다양한 이벤트가 진행된다.</p>',
              DEFAULT, 812, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-04-13 00:00:00',
            '2024-05-06 00:00:00',
            '세종특별자치시 신송로 217 베어트리파크' ,
            '12000',
            '베어트리파크'
    );  

 INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '부여 문화유산 야행',
              '<p>2024 부여 문화유산 야행은 백제시대 제작된 건축용 벽돌 부여외리문양전(보물)을 활용하여 지역 문화유산과 개방기관을 연결하고 행사장 연출 및 팔문양에 담긴 내용들을 경관과 체험 등에 녹여 사비 백제만의 이야기로 색다른 즐거움을 느낄 수 있게 해주는 문화유산 프로그램으로서 세계유산 백제역사유적지구의 가치를 보존하고 알리고 전승하며 지역민 및 관광객들이 다 함께 즐길 수 있는 문화의 장을 마련한다.</p>',
               DEFAULT, 48, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-04-13 00:00:00',
            '2024-04-14 00:00:00',
            '충청남도 부여군 부여읍 정림로 83 정림사지' ,
            '0',
            '부여군, 문화재청, 충청남도/(재)백제역사문화연구원'
    ); 



INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '겨울공주 군밤축제',
              '<p>중부권 대표 겨울 축제인 `겨울공주 군밤축제`가 `공주 알밤과 떠나는 달콤한 여행`을 주제로 1월 26일부터 28일부터 3일간 공주 금강신관공원에서 개최 된다. 대표프로그램은 지름 2m에 달하는 대형화로에서 긴 알밤뜰망을 활용해 직접 품질좋은 공주 알밤을 구워먹는 `대형화로체험`, 공주에서 생산된 지역 농축산물을 그릴위에서 구워 먹을 수 있는 `공주 군밤 그릴존,` 알밤관련 음식, 물품 만들기 체험이 있으며, 추억의 민속놀이 체험, 추억 포토존 등 다양한 볼거리와 즐길거리를 제공한다.</p>',
              DEFAULT, 35, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-01-26 00:00:00',
            '2024-01-28 00:00:00',
            '충청남도 공주시 금벽로 368 (신관동) ' ,
            '0',
            '공주시/겨울공주군밤축제조직위원회'
    );
    
    
INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '대관령눈꽃축제',
              '<p>30년 전, 대한민국 겨울의 중심 ‘대관령’의 청년 여럿이 모여 눈꽃축제를 만들었다. 1993년 시작된 ‘대관령눈꽃축제’는 전국에서 가장 먼저 탄생한 겨울축제로 30여 년의 역사를 자랑한다. 겨울철 비수기를 이겨내고 지역경제 활성화와 주민화합을 목표로 해마다 개최되고 있으며, 많은 관광객이 찾는 축제로 발전하였다. 올해로 축제 개최 30주년을 맞이한 대관령눈꽃축제는 과거 대관령 사람들의 삶과 문화를 재조명한다. 겨울이 긴 계절 특성 때문에 생겨난 이색적인 지역문화와 대관령의 변천사를 담은 공간을 조성하고, 옛 문화가 담긴 체험 프로그램을 통해 대관령의 겨울 문화를 경험할 수 있다.</p>',
              DEFAULT, 180, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-01-27 00:00:00',
            '2024-02-11 00:00:00',
            '강원특별자치도 평창군 대관령로 135-9  (대관령면)' ,
            '10000',
            '대관령면축제위원회/대관령면축제위원회'
    );    

INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '공주 석장리 구석기축제',
              '<p>공주 석장리 구석기축제는 어린이들이 직접 체험하고 즐기며 구석기 시대 생활상의 문화를 자연스럽게 익힐 수 있는 역사문화 축제이다. 행사장 내 시설물은 구석기 시대 삶의 터전인 막집으로 조성하여 최대한 구석기시대를 연상할 수 있도록 연출되며 아이들의 호기심과 창의성을 샘솟게 하는 교육과 놀이가 결합된 다양한 체험이 축제기간 상시 운영된다. 특히, 석장리 유적 발굴 60주년을 기념하는 올해 축제에는 세계 구석기 학자를 초청하여 해외의 구석기 문화를 체험할수 있는 특별 프로그램과, 발굴 60주년 특별 기획공연, 특별전시회, 어린이직업체험 테마마크(키자니아), 시그니처 포토존 등 더욱 풍부하고 다양한 프로그램을 통해 축제장을 찾는 관광객에게 색다른 볼거리를 제공한다. 어린이 맞춤형 체험과 더불어 젊은세대를 겨냥한 다양한 포토존은 자연속에서 힐링하며 인생샷을 남길 수 있다. 매년 5월 석장리구석기 축제에서는 다양한 체험과 볼거리가 있다.</p>',
              DEFAULT, 65, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-01-26 00:00:00',
            '2024-01-28 23:00:00',
            '충청남도 공주시 금벽로 990' ,
            '0',
            '공주시 /공주 석장리 구석기 축제'
    );

INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '영동곶감축제',
              '<p>영동군의 따듯한 새해를 알리는 첫 축제로 영동군 곶감을 비롯한 임, 농, 특산물을 전시, 홍보, 판매하여 우수성을 대내외에 널리 알리고 판매 촉진을 도모하는 축제이며, 외지관광객 유치 및 가족단위 체험에 초점을 맞춘 전국 명품 겨울 축제로 농가소득증대 및 지역경제 활성화에 기여하는 축제이다.</p>',
              DEFAULT, 87, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-01-19 00:00:00',
            '2024-01-21 00:00:00',
            '충청북도 영동군 영동읍 계산리 867-71 영동 하상주차장 일원' ,
            '0',
            '영동군/(재)영동축제관광재단, 영동곶감연합회'
    );

INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '네이처파크 스윗윈터페스티벌',
              '<p>네이처파크는 12만평 부지의 식물원 내 초대형 글라스하우스 동물원과 방사형 야외 동물원으로 구성된 네이처파크는 50여종, 300마리 이상의 동물. 350여종의 수목, 100여종 이상의 다양한 꽃들이 공존하는 전국 최초 교감형 생태 동물원이다.<br>

4계절 축제가 다양하게 열리며, 이번 [스윗윈터 페스티벌]축제기간동안 동물탐험대 프로그램을 운영중에 있어 동물들과 좀 더 가까운 교감을 할수 있다. 가족과 함께 체험할 수있는 만들기 체험키트도 판매중이니 추운 겨울엔 가족과 함께 체험활동도 추천한다. 또한 네이처파크 [스윗윈터 페스티벌]축제 기간동안 럭키백 판매를 진행한다.<br>

럭키백은 산타가 주는 새해 선물 가방으로 안에는 다양한 랜덤선물들이 들어가있다. 재미삼아 아이들과 또는 연인과함께 럭키백 구매를 해서 뜯어보며 선물을 기대하는것도 재미있는 프로그램이다. 달콤한 겨울을 위해 발렌타인데이 이벤트와 설날 이벤트도 예정중이다.</p>',
              DEFAULT, 57, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-01-08 00:00:00',
            '2024-03-03 00:00:00',
            '대구광역시 달성군 가창면 가창로 891' ,
            '18000',
            '리조트 스파밸리/네이처파크'
    );


INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '서울 아시테지 겨울축제',
              '<p>서울 아시테지 겨울축제는 침체되어 있는 겨울철, 국내 아동청소년극의 활기를 불어넣고자 2005년부터 ‘서울 아시테지 겨울축제’를 개최하고 있다. 매년 겨울방학이면 어김없이 찾아오는 이 축제는 온 가족이 함께 즐길 수 있는 가족문화체험 축제로, 관객 모두가 만족할 수 있는 양질의 문화예술을 소개하고, 우리 아이들에게 무한한 상상력과 희망이라는 날개를 펼칠 수 있는 시간을 제공하고 있다. 또한, 대·외적으로 국내 작품의 해외 시장 진출의 플랫폼 역할을 하고 있다.</p>',
              DEFAULT, 98, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-01-03 00:00:00',
            '2024-01-14 00:00:00',
            '서울특별시 종로구 동숭길 114' ,
            '35000',
            '(사)국제아동청소년연극협회/(사)국제아동청소년연극협회'
    );

INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '유달산 봄축제',
              '<p>2024 목포 유달산 봄축제가 `이순신의 선택, 노적봉!`- 이라는 주제로 개최된다. 봄꽃 토크콘서트, 이순신 및 수군문화 프로그램, 각종 공연 및 체험프로그램 등 다채로운 볼거리와 먹거리가 있다. 따사로운 봄날 가족·연인, 남녀노소 모두가 즐길 수 있다.</p>',
              DEFAULT, 32, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-03-30 00:00:00',
            '2024-03-31 23:00:00',
            '전라남도 목포시 대의동2가 ' ,
            '0',
            '목포시/목포시축제추진위원회'
    );


INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '대덕물빛축제',
              '<p>대전의 대표관광지 대청호에 빛경관을 조성하고 공연,전시,체험을 연계하여 새롭게 출범하는 대덕구 대표 축제이다. 주요 프로그램으로는 인기뮤지션 참여 뮤직페스티벌, 루미페스타 점등식 , 어린이 페스티벌 등이 있다.</p>',
              DEFAULT, 87, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-03-29 00:00:00',
            '2024-05-06 00:00:00',
            '대전광역시 대덕구 대청로 607 (미호동) ' ,
            '0',
            '대전광역시 대덕구, 대덕문화원, 대덕문화관광재단'
    );



INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '피나클랜드 불꽃축제',
              '<p> 피나클랜드의 명물이 되어버린 불꽃축제이다. 봄 하늘에도 화려한 꽃을 그린다. 낮에는 억만송이 봄꽃과 튤립수선화가 맞이하고, 밤에는 불꽃이 피나클랜드의 밤 하늘에 꽃을 피운다.</p>',
              DEFAULT, 12, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-03-23 00:00:00',
            '2024-05-26 00:00:00',
            '충청남도 아산시 영인면 월선길 20-42 ' ,
            '14000',
            '㈜피나클랜드농업회사법인'
    );

INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '경복궁 별빛야행',
              '<p>은은한 별빛 아래 경복궁 소주방에서 국악공연을 즐기며 수라상을 맛보고 전문해설사와 함께 경복궁 북측권역으로 떠나 볼 수 있다.</p>',
              DEFAULT, 86, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-04-03 00:00:00',
            '2024-05-04 00:00:00',
            '서울특별시 종로구 사직로 161 경복궁' ,
            '60000',
            '문화재청 궁능유적본부/한국문화재재단'
    );


INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '청남대 꽃·문화축제 영춘제',
              '<p>청남대 영춘제는 2003년 개방이후 매년 봄 대표축제로서 전시와 공연, 작가특별초대전 등 다양한 볼거리와 힐링 휴식의 최적의 장소이며 축제이다.
올해는 문화예술공연이 시니어 모델 페스티벌을 시작으로 한복패션쇼, 합창단, 밴드, 휘스킨아트쇼, 색소폰연주, 세자전거 공연이 기다리고 있다. 체험행사로는 꽃차시음과 발마사지, 7080체험, 한방체험 등이 있으며 와이너리와 완제품 먹거리도 준비중이다. 전시로는 야생화전시와 목석부작, 바위솔, 석곡개화작품이 전시되며 특별전으로 백두대간의 김준권 작가의 판화전과 박은관 컬렉션도 특별기획하고 있다.</p>',
              DEFAULT, 78, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-04-20 00:00:00',
            '2024-05-06 00:00:00',
            '충청북도 청주시 상당구 문의면 청남대길 646 ' ,
            '6000',
            '충청북도 청남대관리사업소/청남대관리사업소'
    );

INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '이천도자기축제',
              '<p>2024년 제38회 이천도자기축제는 `자연에 도자기가 피어나다, 이천에코세라믹스`를 주제로 일회용품 사용 지양, 도자제품 사용을 권고하며 친환경 용기 사용을 적극 장려한다. 머그컵 구매 시 커피 제공, 가정 내 플라스틱을 가져오면 도자기 구매 쿠폰으로 교환 해준다. 에어돔 도자 전시, 명장전, 도자기x지역콜라보 세트 한정판 제품, 행복한 삼만원전, 트레저헌팅(보물찾기), 전국모집 상시공연 등 이천도자기축제의 한층 업그레이드 된 체험, 전시, 판매를 볼 수 있으니 12일간 하루도 빠짐없이 축제를 즐길 수 있다.</p>',
              DEFAULT, 32, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-04-25 00:00:00',
            '2024-05-06 00:00:00',
            '경기도 이천시 신둔면 도자예술로62번길 123 ' ,
            '0',
            '이천시,이천문화재단/이천시도자기축제추진위원회'
    );

INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '부산연등회',
              '<p>부산연등회는 국가중요무형문화재 122호로 지정된 연등회를 부산지역에서 계승하는 행사이다. 연등회는 1,300년을 넘게 이어져 온 우리고유의 문화로, 부처님오신날을 맞아 우리사회 전반에서 서로가 화합하고 번성하기를 기원하며 등을 밝히는 축제이다. 주요행사인 봉축연합대회, 연등행렬, 전통등 전시를 비롯한 우리 전통문화를 계승 발전시키는데 목적이 있다.</p>',
              DEFAULT, 87, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-04-26 00:00:00',
            '2024-05-12 00:00:00',
            '부산광역시 부산진구 동성로112번길 121-1  송상현광장 및 부산시민공원 일원' ,
            '0',
            '부산광역시불교연합회/2568부산연등회봉행위원회'
    );

INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '연천 구석기축제',
              '<p>연천 구석기 축제는 한반도 최최의 인류가 살았던 연천 전곡리 유적에서 열리는 세계 최대의 선사문화축제이다. 1978년 연천 전곡리에서 아슐리안형 주먹도끼(전기 구석기 시대를 대표하는 석기로 뛰어난 석기공작 기술을 보여준다)가 발견되면서 당시 세계 구석기 문화를 동양과 서양, 이분법으로 구분하던 모비우스의 학설을 반증하는 계기가 되었다. 세계 선사 문화사에서 중요한 전곡리 유적을 널리 알리고, 잘 보존하고 활용하기 위해 1993년 작은 축제로 시작하여 이제는 매년 10만명 이상이 방문하는 우리나라 대표 선사문화축제가 되었다. 매년 5월이 되면 연천에 세계의 선사문화가 다 모인다. 현대 문명을 벗어나 자연을 탐구하며 살았던 인류의 지혜를 엿볼 수 있는 특별한 체험 축제에서 특별한 감동과 즐거움을 느낄 수 있다.</p>',
              DEFAULT, 98, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-05-03 00:00:00',
            '2024-05-06 23:00:00',
            '경기도 연천군 전곡읍 양연로 1510 ' ,
            '5000',
            '연천군'
    );


INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '웰컴투조선:구인구직의 난',
              '<p>웰컴투조선:구인구직의 난은 현대의 사회 현상을 재밌게 풀어낸 콘텐츠 이다. 조선 시대의 경제 활동을 체험할 수 있는 엽전환전소, 사또의 일자리 소개소 등 관람객은 조선시대 마을 캐릭터들과 직접 소통하며 조선으로의 시간여행을 경험할 수 있다. 매일 열리는 사또의 생일잔치 공연은 한국민속촌을 대표하는 코믹 마당극 공연이다.</p>',
              DEFAULT, 48, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-03-23 00:00:00',
            '2024-06-09 00:00:00',
            '경기도 용인시 기흥구 민속촌로 90 (보라동) ' ,
            '0',
            '한국민속촌'
    );


INSERT INTO BOARD 
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              '자라섬 꽃 페스타',
              '<p>자라섬 꽃 페스타는 매년 봄(5~6월), 가을(9~10월) 자라섬 남도에서 개최되는 꽃 축제이다. `북한강에 띄운 꽃, 피어나는 힐링과 행복`을 주제로 봄, 가을 테마별 꽃 정원이 조성되며 공연·전시·체험 프로그램과 지역 농특산물 판매부스, 반려동물 놀이터 등이 운영된다.</p>',
              DEFAULT, 89, DEFAULT, 2, 1
      );
      
      
INSERT INTO FESTIVAL
    VALUES( SEQ_BOARD_NO.CURRVAL,
            '2024-05-25 00:00:00',
            '2024-06-16 00:00:00',
            '경기도 가평군 가평읍 자라섬로 60 ' ,
            '7000',
            '가평군'
    );

-- 축제 게시판 댓글(별점)추가
BEGIN
   FOR I IN 1..50 LOOP
      INSERT INTO "COMMENT" 
      VALUES( SEQ_COMMENT_NO.NEXTVAL,
              '가족들과 좋은 추억을 만들 수 있었습니다.',
              DEFAULT, DEFAULT, 
              CEIL(DBMS_RANDOM.VALUE(2,6)), 
              CEIL(DBMS_RANDOM.VALUE(81,122)), 
              CEIL(DBMS_RANDOM.VALUE(1,5)), 
              NULL);
   END LOOP;
END;
/

BEGIN
   FOR I IN 1..50 LOOP
      INSERT INTO "COMMENT" 
      VALUES( SEQ_COMMENT_NO.NEXTVAL,
              '생각보단 재밌지 않았어요',
              DEFAULT, DEFAULT, 
              CEIL(DBMS_RANDOM.VALUE(2,6)), 
              CEIL(DBMS_RANDOM.VALUE(81,122)), 
              CEIL(DBMS_RANDOM.VALUE(1,5)), 
              NULL);
   END LOOP;
END;
/


BEGIN
   FOR I IN 1..50 LOOP
      INSERT INTO "COMMENT" 
      VALUES( SEQ_COMMENT_NO.NEXTVAL,
              '내년에도 또 들르고 싶은 축제입니다! 추천드려요!',
              DEFAULT, DEFAULT, 
              CEIL(DBMS_RANDOM.VALUE(1,2)), 
              CEIL(DBMS_RANDOM.VALUE(81,122)), 
              CEIL(DBMS_RANDOM.VALUE(1,5)), 
              NULL);
   END LOOP;
END;
/

BEGIN
   FOR I IN 1..50 LOOP
      INSERT INTO "COMMENT" 
      VALUES( SEQ_COMMENT_NO.NEXTVAL,
              '그럭저럭 즐거웠습니다. 내년에는 더 준비가 필요할 것 같아요.',
              DEFAULT, DEFAULT, 
              CEIL(DBMS_RANDOM.VALUE(2,6)), 
              CEIL(DBMS_RANDOM.VALUE(81,122)), 
              CEIL(DBMS_RANDOM.VALUE(1,5)), 
              NULL);
   END LOOP;
END;
/



commit;




-- 예약 샘플 (3월)
-- 기차, 버스 샘플 (3월)


INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '무궁화호 | 6호실 | B8', DEFAULT, 
    '2024-03-01  06:57', '2024-03-01  08:47', 8400,  'T', '2024-03-01 1:15:55', 
    'imp_456739152117' , 2);
    
INSERT INTO TRANSPORTATION
VALUES (SEQ_RES_NO.CURRVAL, '조치원', '서울', 'B8', 1,  '무궁화호', 6);


INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, 'KTX | 5호실 | A5', DEFAULT, 
    '2024-03-01  05:17', '2024-03-01  08:14', 53900,  'T', '2024-03-02 1:14:27', 
    'imp_048648665343' , 4);
    
INSERT INTO TRANSPORTATION
VALUES (SEQ_RES_NO.CURRVAL, '서울', '부산', 'A5', 1,  'KTX', 5);

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, 'KTX | 7호실 | A9', DEFAULT, 
    '2024-03-07  05:17', '2024-03-07  08:14', 53900,  'T', '2024-03-06 1:14:27', 
    'imp_048648665343' , 4);
    
INSERT INTO TRANSPORTATION
VALUES (SEQ_RES_NO.CURRVAL, '세종', '강릉', 'A9', 1,  'KTX', 7);




INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '무궁화호 | 1호실 | C8', DEFAULT, 
    '2024-03-15  06:57', '2024-03-15  08:47', 8400,  'T', '2024-03-05 1:15:55', 
    'imp_456739152117' , 5);
    
INSERT INTO TRANSPORTATION
VALUES (SEQ_RES_NO.CURRVAL, '조치원', '서울', 'C8', 1,  '무궁화호', 1);

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '무궁화호 | 7호실 | B7', DEFAULT, 
    '2024-03-11  06:57', '2024-03-11  08:47', 8400,  'T', '2024-03-11 1:15:55', 
    'imp_456739152117' , 2);
    
INSERT INTO TRANSPORTATION
VALUES (SEQ_RES_NO.CURRVAL, '서울', '조치원', 'B7', 1,  '무궁화호', 7);







INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, 'KTX | 3호실 | D14', DEFAULT, 
    '2024-03-01  07:36', '2024-03-01  09:31', 28400,  'T', '2024-03-01 1:17:55', 
    'imp_912851250408' , 2);
    
INSERT INTO TRANSPORTATION
VALUES (SEQ_RES_NO.CURRVAL, '논산', '서울', 'D14', 1,  'KTX', 3);

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '서울경부 | 우등 | 27번 좌석', DEFAULT, 
    '2024년03월01일  06 : 00', '2024년03월01일  10 : 00', 37800,  'B', '2024-03-01 1:19:01', 
    'imp_073923961481' , 3);
    
INSERT INTO TRANSPORTATION
VALUES (SEQ_RES_NO.CURRVAL, '서울경부 터미널', '부산 터미널', '27', 1,  '우등', 0);



INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '속초 | 프리미엄 | 32번 좌석', DEFAULT, 
    '2024년03월01일  08 : 00', '2024년03월01일  10 : 20', 27600,  'B', '2024-03-01 1:24:18', 
    'imp_890245305571' , 5);
    
INSERT INTO TRANSPORTATION
VALUES (SEQ_RES_NO.CURRVAL, '속초 터미널', '서울경부 터미널', '32', 1,  '프리미엄', 0);

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '동해 | 우등 | 25번 좌석', DEFAULT, 
    '2024년03월01일  10 : 00', '2024년03월01일  13 : 05', 27100,  'B', '2024-03-01 1:25:10', 
    'imp_277295395072' , 4);
    
INSERT INTO TRANSPORTATION
VALUES (SEQ_RES_NO.CURRVAL, '동해 터미널', '서울경부 터미널', '25', 1,  '우등', 0);



-- 숙소 샘플
INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '어반스테이 명동', DEFAULT, 
    '2024-03-01 14:00', '2024-03-01 12:00', 369400,  'A', 
    '2024-03-01 1:38:14', 
    'imp_528079206986' , 4);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 1, 2, 2 );




INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '어반스테이 명동', DEFAULT, 
    '2024-05-02 14:00', '2024-05-05 12:00', 150700,  'A', 
    '2024-03-01 1:40:49', 'imp_385231303924' , 3);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 1, 2, 3 );

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '어반스테이 명동', DEFAULT, 
    '2024-03-11 14:00', '2024-03-13 12:00', 276500,  'A', 
    '2024-03-01 1:41:35', 'imp_734279440684' , 5);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 1, 2, 1 );


--
INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '드림펜션', DEFAULT, 
    '2024-04-01 14:00', '2024-04-01 12:00', 418700,  'A', 
    '2024-03-01 2:07:58', 'imp_248865393801' , 2);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 45, 2, 123 );

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '드림펜션', DEFAULT, 
    '2024-03-01 14:00', '2024-03-01 12:00', 150300,  'A', 
    '2024-03-01 2:08:29', 'imp_790896267277' , 4);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 45, 2, 121 );




--
INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '실로암펜션', DEFAULT, 
    '2024-03-01 14:00', '2024-03-02 12:00', 182100,  'A', 
    '2024-03-01 2:11:30', 'imp_187078499084' , 2);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 37, 2, 109 );

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '리비니하우스', DEFAULT, 
    '2024-03-06 14:00', '2024-03-08 12:00', 407900,  'A', 
    '2024-03-01 2:13:09', 'imp_244165485176' , 3);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 13, 4, 37 );

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '실로암펜션', DEFAULT, 
    '2024-03-14 14:00', '2024-03-15 12:00', 172900,  'A', 
    '2024-03-01 2:13:52', 'imp_567217790036' , 2);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 37, 2, 111 );

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '실로암펜션', DEFAULT, 
    '2024-03-15 14:00', '2024-03-16 12:00', 172900,  'A', 
    '2024-03-03 2:13:52', 'imp_567217790036' , 4);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 37, 2, 111 );

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '실로암펜션', DEFAULT, 
    '2024-03-20 14:00', '2024-03-21 12:00', 172900,  'A', 
    '2024-03-18 2:13:52', 'imp_567217790036' , 5);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 37, 2, 111 );

-- 
INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '파라다이스', DEFAULT, 
    '2024-03-18 14:00', '2024-03-19 12:00', 389900,  'A', 
    '2024-03-01 2:14:53', 'imp_201278902365' , 5);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 23, 2, 69 );

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '파라다이스', DEFAULT, 
    '2024-04-07 14:00', '2024-04-08 12:00', 202200,  'A', 
    '2024-03-01 2:15:40', 'imp_323325238560' , 6);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 23, 2, 67 );



INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '자연속에 둥지펜션', DEFAULT, 
    '2024-04-06 14:00', '2024-04-08 12:00', 442700,  'A', 
    '2024-03-01 2:17:10', 'imp_879418129661' , 4);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 32, 3, 94 );




-- 기차, 버스 샘플(4월)
INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, 'KTX | 5호실 | A5', DEFAULT, 
    '2024-04-01  05:17', '2024-04-01  08:14', 53900,  'T', '2024-04-01 1:14:27', 
    'imp_048648665343' , 2);
    
INSERT INTO TRANSPORTATION
VALUES (SEQ_RES_NO.CURRVAL, '서울', '부산', 'A5', 1,  'KTX', 5);

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '무궁화호 | 6호실 | B8', DEFAULT, 
    '2024-04-01  06:57', '2024-04-01  08:47', 8400,  'T', '2024-04-01 1:15:55', 
    'imp_456739152117' , 3);
    
INSERT INTO TRANSPORTATION
VALUES (SEQ_RES_NO.CURRVAL, '조치원', '서울', 'B8', 1,  '무궁화호', 6);


INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, 'KTX | 3호실 | D14', DEFAULT, 
    '2024-04-01  07:36', '2024-04-01  09:31', 28400,  'T', '2024-04-01 1:17:55', 
    'imp_912851250408' , 4);
    
INSERT INTO TRANSPORTATION
VALUES (SEQ_RES_NO.CURRVAL, '논산', '서울', 'D14', 1,  'KTX', 3);

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '서울경부 | 우등 | 27번 좌석', DEFAULT, 
    '2024년04월01일  06 : 00', '2024년04월01일  10 : 00', 37800,  'B', '2024-04-01 1:19:01', 
    'imp_073923961481' , 2);
    
INSERT INTO TRANSPORTATION
VALUES (SEQ_RES_NO.CURRVAL, '서울경부 터미널', '부산 터미널', '27', 1,  '우등', 0);

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, 'ITX-새마을 | 7호실 | D7', DEFAULT, 
    '2024-04-01  07:39', '2024-04-01  09:50', 19000,  'T', '2024-04-01 1:22:27', 
    'imp_411129516004' , 6);
    
INSERT INTO TRANSPORTATION
VALUES (SEQ_RES_NO.CURRVAL, '조치원', '동대구', 'D7', 1,  'ITX-새마을', 7);


INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '속초 | 프리미엄 | 32번 좌석', DEFAULT, 
    '2024년04월01일  08 : 00', '2024년04월01일  10 : 20', 27600,  'B', '2024-04-01 1:24:18', 
    'imp_890245305571' , 5);
    
INSERT INTO TRANSPORTATION
VALUES (SEQ_RES_NO.CURRVAL, '속초 터미널', '서울경부 터미널', '32', 1,  '프리미엄', 0);

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '동해 | 우등 | 25번 좌석', DEFAULT, 
    '2024년04월01일  10 : 00', '2024년04월01일  13 : 05', 27100,  'B', '2024-04-01 1:25:10', 
    'imp_277295395072' , 6);
    
INSERT INTO TRANSPORTATION
VALUES (SEQ_RES_NO.CURRVAL, '동해 터미널', '서울경부 터미널', '25', 1,  '우등', 0);



-- 숙소 샘플
INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '어반스테이 명동', DEFAULT, 
    '2024-04-01 14:00', '2024-04-01 12:00', 369400,  'A', 
    '2024-04-01 1:38:14', 
    'imp_528079206986' , 2);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 1, 2, 2 );


INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '어반스테이 명동', DEFAULT, 
    '2024-04-01 14:00', '2024-04-01 12:00', 276500,  'A', 
    '2024-04-01 1:38:59', 'imp_349124736357' , 3);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 1, 2, 1 );

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '어반스테이 명동', DEFAULT, 
    '2024-05-10 14:00', '2024-05-12 12:00', 150700,  'A', 
    '2024-04-01 1:39:41', 'imp_524168817850' , 4);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 1, 2, 3 );

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '어반스테이 명동', DEFAULT, 
    '2024-05-02 14:00', '2024-05-05 12:00', 150700,  'A', 
    '2024-04-01 1:40:49', 'imp_385231303924' , 4);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 1, 2, 3 );

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '어반스테이 명동', DEFAULT, 
    '2024-04-11 14:00', '2024-04-13 12:00', 276500,  'A', 
    '2024-04-01 1:41:35', 'imp_734279440684' , 6);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 1, 2, 1 );


--
INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '드림펜션', DEFAULT, 
    '2024-04-01 14:00', '2024-04-01 12:00', 418700,  'A', 
    '2024-04-01 2:07:58', 'imp_248865393801' , 5);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 45, 2, 123 );

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '드림펜션', DEFAULT, 
    '2024-04-01 14:00', '2024-04-01 12:00', 150300,  'A', 
    '2024-04-01 2:08:29', 'imp_790896267277' , 6);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 45, 2, 121 );

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '드림펜션', DEFAULT, 
    '2024-04-17 14:00', '2024-04-19 12:00', 183200,  'A', 
    '2024-04-01 2:09:07', 'imp_065934665000' , 4);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 45, 2, 122 );

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '드림펜션', DEFAULT, 
    '2024-04-27 14:00', '2024-04-28 12:00', 418700,  'A', 
    '2024-04-01 2:09:50', 'imp_904977185452' , 4);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 45, 2, 123 );

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '드림펜션', DEFAULT, 
    '2024-04-29 14:00', '2024-04-30 12:00', 183200,  'A', 
    '2024-04-01 2:10:41', 'imp_540028895337' , 3);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 45, 2, 122 );


--
INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '실로암펜션', DEFAULT, 
    '2024-04-01 14:00', '2024-04-01 12:00', 182100,  'A', 
    '2024-04-01 2:11:30', 'imp_187078499084' , 2);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 37, 2, 109 );

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '리비니하우스', DEFAULT, 
    '2024-04-06 14:00', '2024-04-08 12:00', 407900,  'A', 
    '2024-04-01 2:13:09', 'imp_244165485176' , 3);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 13, 4, 37 );

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '실로암펜션', DEFAULT, 
    '2024-04-14 14:00', '2024-04-15 12:00', 172900,  'A', 
    '2024-04-01 2:13:52', 'imp_567217790036' , 2);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 37, 2, 111 );

-- 
INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '파라다이스', DEFAULT, 
    '2024-04-18 14:00', '2024-04-19 12:00', 389900,  'A', 
    '2024-04-01 2:14:53', 'imp_201278902365' , 5);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 23, 2, 69 );

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '파라다이스', DEFAULT, 
    '2024-04-07 14:00', '2024-04-08 12:00', 202200,  'A', 
    '2024-04-01 2:15:40', 'imp_323325238560' , 6);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 23, 2, 67 );

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '파라다이스', DEFAULT, 
    '2024-04-28 14:00', '2024-04-29 12:00', 389900,  'A', 
    '2024-04-01 2:16:20', 'imp_175368425253' , 4);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 23, 2, 69 );

INSERT INTO RESERVATION
VALUES (SEQ_RES_NO.NEXTVAL, '자연속에 둥지펜션', DEFAULT, 
    '2024-04-06 14:00', '2024-04-08 12:00', 442700,  'A', 
    '2024-04-01 2:17:10', 'imp_879418129661' , 4);
    
INSERT INTO ACC_RESERVATION
VALUES (SEQ_RES_NO.CURRVAL, 32, 3, 94 );

commit;

-- 채팅

-- 채팅방 생성
INSERT INTO CHATROOM
VALUES(SEQ_CHATROOM_NO.NEXTVAL, 'N', 2, 1);


-- 채팅 내역
INSERT INTO "CHATTING"
VALUES(SEQ_CHAT_NO.NEXTVAL, '안녕하세요. 모두의 쾌적한 여행을 돕는 NXSHXW입니다. 무엇을 도와드릴까요?', '2024-02-12 12:22:01', 1, SEQ_CHATROOM_NO.CURRVAL , 'Y');


INSERT INTO "CHATTING"
VALUES(SEQ_CHAT_NO.NEXTVAL, '안녕하세요. 제가 A숙소에 예약을 해두었는데 인원수를 변경하고 싶어서 연락드렸어요.', '2024-02-12 12:24:01' , 2, SEQ_CHATROOM_NO.CURRVAL , 'Y' );


INSERT INTO "CHATTING"
VALUES(SEQ_CHAT_NO.NEXTVAL, '네, A숙소 예약 일자와 결제한 날짜를 알려주시면 빠른 상담 진행해드리겠습니다.', '2024-02-12 12:26:01', 1, SEQ_CHATROOM_NO.CURRVAL , 'Y');


INSERT INTO "CHATTING"
VALUES(SEQ_CHAT_NO.NEXTVAL, '네 체크인날짜는 2월22일이고 결제한 날은 2월8일이였습니다.', '2024-02-12 12:28:01' , 2, SEQ_CHATROOM_NO.CURRVAL , 'Y' );


INSERT INTO "CHATTING"
VALUES(SEQ_CHAT_NO.NEXTVAL, '네 확인되었습니다. 인원수 변경은 어떻게 되시나요?', '2024-02-12 12:30:01', 1, SEQ_CHATROOM_NO.CURRVAL , 'Y');


INSERT INTO "CHATTING"
VALUES(SEQ_CHAT_NO.NEXTVAL, '넵 인원수 2명에서 3명으로 변경되었습니다.', '2024-02-12 12:31:01' , 2, SEQ_CHATROOM_NO.CURRVAL , 'Y' );

INSERT INTO "CHATTING"
VALUES(SEQ_CHAT_NO.NEXTVAL, '네 확인되었습니다. 저희가 예약내역 변경 해드리겠습니다. 혹시 더 필요하신 것 있으신가요?', '2024-02-12 12:33:01', 1, SEQ_CHATROOM_NO.CURRVAL , 'Y');

INSERT INTO "CHATTING"
VALUES(SEQ_CHAT_NO.NEXTVAL, '아뇨 없습니다~~ 감사합니다!', '2024-02-12 12:33:05' , 2, SEQ_CHATROOM_NO.CURRVAL , 'Y' );


INSERT INTO "CHATTING"
VALUES(SEQ_CHAT_NO.NEXTVAL, '네~ 지금까지 NXSHXW였습니다. 좋은 하루 보내세요.', '2024-02-12 12:33:31', 1, SEQ_CHATROOM_NO.CURRVAL , 'Y');


--
INSERT INTO "CHATTING"
VALUES(SEQ_CHAT_NO.NEXTVAL, '안녕하세요. 모두의 쾌적한 여행을 돕는 NXSHXW입니다. 무엇을 도와드릴까요?', '2024-03-01 12:22:01', 1, SEQ_CHATROOM_NO.CURRVAL , 'Y');


INSERT INTO "CHATTING"
VALUES(SEQ_CHAT_NO.NEXTVAL, '안녕하세요. 3월3일 부산행 KTX를 예매한 뒤 예약 취소를 했는데 결제취소가 되지않은것 같아서요. 확인 부탁드릴게요.', '2024-03-01 12:24:01' , 2, SEQ_CHATROOM_NO.CURRVAL , 'Y' );


INSERT INTO "CHATTING"
VALUES(SEQ_CHAT_NO.NEXTVAL, '네, 확인한 결과 결제취소가 제대로 진행이 되지 않았습니다. 결체 취소 요청 진행해드렸습니다. 결제 취소는 3일 이내에 되실 예정입니다.', '2024-03-01 12:26:01', 1, SEQ_CHATROOM_NO.CURRVAL , 'Y');


INSERT INTO "CHATTING"
VALUES(SEQ_CHAT_NO.NEXTVAL, '네 결제 내역 취소 확인했습니다! 감사합니다~', '2024-03-01 12:28:01' , 2, SEQ_CHATROOM_NO.CURRVAL , 'Y' );

INSERT INTO "CHATTING"
VALUES(SEQ_CHAT_NO.NEXTVAL, '네~ 지금까지 NXSHXW였습니다. 좋은 하루 보내세요.', '2024-03-01 12:28:05', 1, SEQ_CHATROOM_NO.CURRVAL , 'Y');


commit;
-- 지선님 더미데이터 끝

-- 윤형식 더미데이터 시작

INSERT INTO "USER" VALUES (
10000, '김철수', '19850205', 'M', '서울시 서초구', 'chulsoo02', 
'$2a$10$kOgRikd7YM1BT2BTjDITxu83522gBWzHbiFqPaBD9hlLCjAZPAS.q', 
'철수네', '01023456789', 
'chulsoo02@example.com',sysdate, NULL, DEFAULT, 2);

INSERT INTO "BOSS" VALUES (9234567890, '123456789012', 10000 );

INSERT INTO "ACC" VALUES (
10000, '산속의 펜션', '0331234561', 
'13806^^^경기 과천시 향교말길 7-13^^^203호', 'Y', 
9234567890, '펜션', TO_DATE('2021-05-15', 'YYYY-MM-DD'));
--
commit;


---- 차트용 년별 예약 더미 데이터
INSERT INTO "ACC_GRADE" VALUES (10001,'차트용 방', 10005, 100,'16:00','12:00',10000);
--2022 . 1월
INSERT INTO RESERVATION VALUES( 10001,'산속의 펜션','N','2022-01-02','2022-01-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10001, 10000, 5, 10001);
commit;
--2022 . 2월
INSERT INTO RESERVATION VALUES( 10002,'산속의 펜션','N','2022-02-02','2022-02-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10002, 10000, 5, 10001);
commit;

--2022 . 3월
INSERT INTO RESERVATION VALUES(10003,'산속의 펜션','N','2022-03-02','2022-03-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10003, 10000, 5, 10001);
commit;

--2022 . 4월
INSERT INTO RESERVATION VALUES(10004,'산속의 펜션','N','2022-04-02','2022-04-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10004, 10000, 5, 10001);
commit;

--2022 . 5월
INSERT INTO RESERVATION VALUES(10005,'산속의 펜션','N','2022-05-02','2022-05-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10005, 10000, 5, 10001);
commit;

--2022 . 6월
INSERT INTO RESERVATION VALUES(10006,'산속의 펜션','N','2022-06-02','2022-06-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10006, 10000, 5, 10001);
commit;

--2022 . 7월
INSERT INTO RESERVATION VALUES(10007,'산속의 펜션','N','2022-07-02','2022-07-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10007, 10000, 5, 10001);
commit;

--2022 . 8월
INSERT INTO RESERVATION VALUES(10008,'산속의 펜션','N','2022-08-02','2022-08-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10008, 10000, 5, 10001);
commit;

--2022 . 9월
INSERT INTO RESERVATION VALUES(10009,'산속의 펜션','N','2022-09-02','2022-09-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10009, 10000, 5, 10001);
commit;

--2022 . 10월
INSERT INTO RESERVATION VALUES(10010,'산속의 펜션','N','2022-10-02','2022-10-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE) 
VALUES (10010, 10000, 5, 10001);
commit;

--2022 . 11월
INSERT INTO RESERVATION VALUES(10011,'산속의 펜션','N','2022-11-02','2022-11-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE) 
VALUES (10011, 10000, 5, 10001);
commit;

--2022 . 12월
INSERT INTO RESERVATION VALUES(10012,'산속의 펜션','N','2022-12-02','2022-12-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE) 
VALUES (10012, 10000, 5, 10001);
commit;

--2023 . 1월
INSERT INTO RESERVATION VALUES( 10013,'산속의 펜션','N','2023-01-02','2023-01-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10013, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES( 10014,'산속의 펜션','N','2023-01-15','2023-01-16',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10014, 10000, 5, 10001);
commit;

--2023 . 2월
INSERT INTO RESERVATION VALUES( 10015,'산속의 펜션','N','2023-02-02','2023-02-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10015, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES( 10016,'산속의 펜션','N','2023-02-15','2023-02-16',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10016, 10000, 5, 10001);
commit;

--2023 . 3월
INSERT INTO RESERVATION VALUES(10017,'산속의 펜션','N','2023-03-02','2023-03-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10017, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10018,'산속의 펜션','N','2023-03-15','2023-03-16',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10018, 10000, 5, 10001);
commit;

--2023 . 4월
INSERT INTO RESERVATION VALUES(10019,'산속의 펜션','N','2023-04-02','2023-04-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10019, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10020,'산속의 펜션','N','2023-04-15','2023-04-16',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10020, 10000, 5, 10001);
commit;

--2023 . 5월
INSERT INTO RESERVATION VALUES(10021,'산속의 펜션','N','2023-05-02','2023-05-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10021, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10022,'산속의 펜션','N','2023-05-15','2023-05-16',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10022, 10000, 5, 10001);
commit;

--2023 . 6월
INSERT INTO RESERVATION VALUES(10023,'산속의 펜션','N','2023-06-02','2023-06-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10023, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10024,'산속의 펜션','N','2023-06-15','2023-06-16',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10024, 10000, 5, 10001);
commit;

--2023 . 7월
INSERT INTO RESERVATION VALUES(10025,'산속의 펜션','N','2023-07-02','2023-07-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10025, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10026,'산속의 펜션','N','2023-07-15','2023-07-16',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10026, 10000, 5, 10001);
commit;

--2023 . 8월
INSERT INTO RESERVATION VALUES(10027,'산속의 펜션','N','2023-08-02','2023-08-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10027, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10028,'산속의 펜션','N','2023-08-15','2023-08-16',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10028, 10000, 5, 10001);
commit;

--2023 . 9월
INSERT INTO RESERVATION VALUES(10029,'산속의 펜션','N','2023-09-02','2023-09-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10029, 10000, 5, 10001);
commit;


INSERT INTO RESERVATION VALUES(10030,'산속의 펜션','N','2023-09-15','2023-09-16',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10030, 10000, 5, 10001);
commit;

--2023 . 10월
INSERT INTO RESERVATION VALUES(10031,'산속의 펜션','N','2023-10-02','2023-10-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10031, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10032,'산속의 펜션','N','2023-10-15','2023-10-16',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10032, 10000, 5, 10001);
commit;

--2023 . 11월
INSERT INTO RESERVATION VALUES(10033,'산속의 펜션','N','2023-11-02','2023-11-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10033, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10034,'산속의 펜션','N','2023-11-15','2023-11-16',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10034, 10000, 5, 10001);
commit;

--2023 . 12월
INSERT INTO RESERVATION VALUES(10035,'산속의 펜션','N','2023-12-02','2023-12-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10035, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10036,'산속의 펜션','N','2023-12-15','2023-12-16',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10036, 10000, 5, 10001);
commit;

--2024 . 1월
INSERT INTO RESERVATION VALUES(10037,'산속의 펜션','N','2024-01-02','2024-01-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10037, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10038,'산속의 펜션','N','2024-01-15','2024-01-16',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10038, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10039,'산속의 펜션','N','2024-01-27','2024-01-28',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10039, 10000, 5, 10001);
commit;

--2024 . 2월
INSERT INTO RESERVATION VALUES(10040,'산속의 펜션','N','2024-02-02','2024-02-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10040, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10041,'산속의 펜션','N','2024-02-15','2024-02-16',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10041, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10042,'산속의 펜션','N','2024-02-25','2024-02-26',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10042, 10000, 5, 10001);
commit;

--2024 . 3월
INSERT INTO RESERVATION VALUES(10043,'산속의 펜션','N','2024-03-02','2024-03-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10043, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10044,'산속의 펜션','N','2024-03-15','2024-03-16',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10044, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10045,'산속의 펜션','N','2024-03-27','2024-03-28',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10045, 10000, 5, 10001);
commit;

--2024 . 4월
INSERT INTO RESERVATION VALUES(10046,'산속의 펜션','N','2024-04-02','2024-04-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10046, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10047,'산속의 펜션','N','2024-04-15','2024-04-16',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10047, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10048,'산속의 펜션','N','2024-04-27','2024-04-28',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10048, 10000, 5, 10001);
commit;

--2024 . 5월
INSERT INTO RESERVATION VALUES(10049,'산속의 펜션','N','2024-05-02','2024-05-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10049, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10050,'산속의 펜션','N','2024-05-15','2024-05-16',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10050, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10051,'산속의 펜션','N','2024-05-27','2024-05-28',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10051, 10000, 5, 10001);
commit;

--2024 . 6월
INSERT INTO RESERVATION VALUES(10052,'산속의 펜션','N','2024-06-02','2024-06-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10052, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10053,'산속의 펜션','N','2024-06-15','2024-06-16',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10053, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10054,'산속의 펜션','N','2024-06-27','2024-06-28',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10054, 10000, 5, 10001);
commit;

--2024 . 7월
INSERT INTO RESERVATION VALUES(10055,'산속의 펜션','N','2024-07-02','2024-07-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10055, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10056,'산속의 펜션','N','2024-07-15','2024-07-16',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10056, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10057,'산속의 펜션','N','2024-07-27','2024-07-28',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10057, 10000, 5, 10001);
commit;

--2024 . 8월
INSERT INTO RESERVATION VALUES(10058,'산속의 펜션','N','2024-08-02','2024-08-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10058, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10059,'산속의 펜션','N','2024-08-15','2024-08-16',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10059, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10060,'산속의 펜션','N','2024-08-27','2024-08-28',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10060, 10000, 5, 10001);
commit;

--2024 . 9월
INSERT INTO RESERVATION VALUES(10061,'산속의 펜션','N','2024-09-02','2024-09-03',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10061, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10062,'산속의 펜션','N','2024-09-15','2024-09-16',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10062, 10000, 5, 10001);
commit;

INSERT INTO RESERVATION VALUES(10063,'산속의 펜션','N','2024-09-27','2024-09-28',
'11000','A',TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),'아이디',10000);
INSERT INTO ACC_RESERVATION (RESERVATION_NO, ACC_NO, RES_PEOPLE, ACC_CODE)
VALUES (10063, 10000, 5, 10001);
commit;

-- 윤형식 더미데이터 끝
      </code>
    </pre>
    
</details>

<br>
<br>
 <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;"> notion 주소 </h2>
 <span><a href="https://amplified-success-14b.notion.site/8853f975f871414a852773459256657a">세미프로젝트</a></span>
 <br>
 <br>
 <br>
 <br>
    <div style="text-align: left;"> <a href=https://blog.naver.com/jimin10722> <img src="https://img.shields.io/badge/Naver-03C75A?style=for-the-badge&logo=Naver&logoColor=white&link=https://blog.naver.com/jimin10722"> </a>
         <a href=mailto:iamjimin0722@gmail.com> <img src="https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=Gmail&logoColor=white&link=mailto:iamjimin0722@gmail.com"> </a>
          </div>  <br> 
    <div style="text-align: left;"> <a href="https://hits.seeyoufarm.com"> <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fjimin1012%2F&count_bg=%23000000&title_bg=%23000000&icon=github.svg&icon_color=%23FFFFFF&title=GitHub&edge_flat=false"/></a>
       </div> 
    <div style="text-align: left;"> 
    <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;"> 🏅 Stats </h2> <div style="text-align: left;"> <img src="https://github-readme-stats.vercel.app/api?username=jimin1012&bg_color=180,000000,&title_color=000000&text_color=000000"
         /> <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=jimin1012&layout=compact&bg_color=180,000000,&title_color=000000&text_color=000000"
          /> </div> 
    </div>
    
