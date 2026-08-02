# Tesla QR Parking

## 프로젝트 목적
주차 중인 Tesla Model Y 차량에 연락할 수 있도록 QR 기반 연락 페이지 제공

## 현재 버전
v12.1

## 완료된 작업

### v4
- CSS 분리 (style.css)

### v5
- JavaScript 분리 (script.js)

### v6
- 설정 분리 (config.js)

### v7
- 차량 상태 변경 기능
- localStorage 저장

### v8
- PWA 적용
- manifest.json
- service-worker.js

### v9
- QR 코드 생성
- qrcode.min.js 적용

### v10
- 관리자 모드 도입
- ?admin=1

### v10.1
- 마지막 업데이트 시간 표시
- 상대시간 표시 (방금 전, 1분 전 등)

### v12.1
- Firebase Firestore 모듈 분리
- Google 로그인 기반 관리자 인증 구조 추가
- 관리자 이메일 기반 상태 변경 권한 분리

## 현재 구조

index.html
css/style.css
js/config.js
js/script.js
js/qrcode.min.js
manifest.json
service-worker.js

## 향후 계획

### v10.2
- 리팩터링
- 중복 CSS 제거
- script.js 정리

### v11
- admin.html 분리

### v13
- 관리자 로그인

### v14
- 실시간 상태 동기화

## 주의사항

- 현재 상태는 localStorage 기반
- Firebase 아직 미적용
- admin은 query string 방식
  - index.html?admin=1

## GitHub

https://github.com/eecorea365/parking
