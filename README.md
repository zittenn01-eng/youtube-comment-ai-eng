# Youtube-Comment-AI-Analysis

### 빈 폴더 만들기

폴더 이름:'Youtube-comment-eng'로 이름 수정

> 반드시 폴더명은 '소문자' 로 작성
---
### 안티그래비티를 열고 폴더 오픈
---
### Next.js 기반 코드 베이스 구축

터미널을 열고 

>npx create-next-app@latest .
---
### 코드 수정
- readme.md 파일 내용 삭제
- public 폴더에 있는 이미지 삭제
- app/layout.tsx 파일에서 title, description 수정
-----

### 프런트 UI 추가 기능 설치
터미널을 열고

>npx shadcn@latst init


---
### clonecn skill 설치
* 참고: https://github.com/hunvreus/clonecn/blob/main/README.md

>npx skills add hunbreus/clonecn --skill clonecn


### AI 툴킷 설치
터미널에서 
>npm install ai@ai-sdk/react@ai-sdk/google zod

### 테스트 실행
npm run dev

---
* 코드 베이스 수정

---
### YouTube Data API 키 받기
브라우저에서 

>https://console.cloud.google.com/apis
---
### Youtube data api 키 저장하기
- .env.local 파일만들기

프롬프트:
'YOUR_YOUTUBE_API_KEY' 키를 .env.local 파일에 저장해줘
- 직접 안티그래비트 public 폴더 아래에 파일추가를 해 env.local 파일을 만들고 오른쪽 창에 YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY
로 넣음 
- 복사한 API 키 값을 'YOUTUBE_API_KEY=' 에 연결

---
### GEMINI 시 API 키 받기
프롬프트
- GOOOGLE AI Studio 에서 발급받은 Gemini API 키를 .env.local 파일에 저장
GOOGLE_GENERATIVE_AI_API_KEY=YOUR_GEMINI_API_KEY

