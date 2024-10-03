# Karin Contacts

- ### 개요
    연락처 정보(이름, 전화번호, 이메일, 생일, 그룹명)을 저장하고 관리할 수 있는 프로그램입니다.  
    새 연락처 등록, 리스트 보기, 상세보기, 수정, 삭제, 이름 또는 전화번호로 검색, 그룹 별로 보기 등의 기능이 제공됩니다.  

- ### 개발스택
  ReactJS, TypeScript, MySQL  
  테스트: jest, cypress, Postman  

- ### 개발환경
  VS Code, docker, adminer  

- ### 실행방법
    1. __karin-contacts__ 디렉토리에서 아래 명령어 실행  (Docker 설치 필요)
        ```bash
        $ docker-compose up -d
        ```

    1. localhost로 DB연결해서 __karin-contacts/ddl__ 의 스크립트 실행  
       (adminer로 실행 시  
       데이터베이스 형식: MySQL  
       서버: mysql  
       사용자이름: root  
       비밀번호: karin111  
       입력하고 로그인 후 __SQL 명령__ 에서 __ddl__ 스크립트 실행)  

    1. __karin-contacts/contacts-be__ 에서 다음 명령어 실행
        ```bash
        $ npm install
        $ npm run start  
        
        (command not found: ts-node 오류가 나올 시 아래 명령어 실행)
        $ npm install -g ts-node
        ```

    1. __karin-contacts/contacts-fe__ 에서 다음 명령어 실행
        ```bash
        $ npm install
        $ npm run start
        ```

- ### 사용법
    - 첫 실행 시 이름순으로 정렬된 연락처 목록이 뜹니다.
    - 이름 또는 전화번호 영역을 클릭해 해당 연락처의 상세정보를 볼 수 있습니다.
    - 우측 그룹명을 클릭해 그룹별로 저장된 연락처를 모아볼 수 있습니다.
    - 우측 상단 __SEARCH__ 영역에 이름 또는 전화번호의 일부를 입력해 검색할 수 있습니다.
    - 상단 __CONTACTS__ 헤더를 클릭해 언제든지 메인으로 돌아올 수 있습니다.
    - 좌측 상단 __add__ 버튼을 누르면 새 연락처 등록 화면으로 이동합니다.
        - 이름과 전화번호는 필수 입력 항목이며 이메일, 생일, 그룹은 입력하지 않아도 등록 가능합니다.
        - 잘못된 형식으로 입력하면 각 항목 별 경고메세지가 노출됩니다.
        - 등록을 원하지 않으면 __cancel__ 버튼 또는 __CONTACTS__ 헤더를 클릭해 빠져나올 수 있습니다.
        - __OK!__ 버튼을 눌러 등록에 성공하면 등록된 연락처 상세보기 화면으로 이동합니다.
    - 상세보기 화면에서 __edit__ 버튼을 눌러 연락처 정보를 수정할 수 있습니다.
    - __delete__ 버튼을 눌러 삭제를 승인하면 해당 연락처가 삭제되고 메인으로 이동합니다.
