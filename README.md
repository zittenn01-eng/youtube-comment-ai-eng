# Youtube-Comment-AI-Analysis

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
### GEMINI API 키  받기
프롬프트
- GOOOGLE AI Studio 에서 발급받은 Gemini API 키를 .env.local 파일에 저장
GOOGLE_GENERATIVE_AI_API_KEY=YOUR_GEMINI_API_KEY
---
### 유튜브 영상 댓글 AI 분석 서비스 제작

프롬프트:
```
- 유튜브 댓글 수집: YouTube API를 통해 유튜브 URL 또는 비디오 ID로 댓글 가져오기
- Gemini 모델: gemini-3.1-flash-lite-preview
- 댓글 분석: Gemini API를 사용한 감정 분석(긍정/부정/중립) 및 키워드 추출
- 시각화:
	○ 감정 분포 파이 차트
	○ 시간대별 긍정,부정,중립 댓글 수
	○ 시간대별 댓글 수 라인 차트
	○ 댓글 통계 카드(총 댓글 수, 평균 길이 등)
	○ bigram 단어 쌍을 분석하고 네트워크 시각화로 나타내기
	○ 시각화는 모두 인터렉티브하게 구현
- UI: 밝은 톤의 모던한 디자인
- 에러처리 및 로딩상태 관리
	○ 분석이 진행 중일 때 화면에 로딩 효과 구현
```

- `578015682-ffb3200c-8703-46c8-bc5d-ab584a1b47a0.png` 를 에이전트에 입력하여 디자인 참고 정보 제공
- `578015682-ffb3200c-8703-46c8-bc5d-ab584a1b47a0.png` 를 에이전트에 입력하여 디자인 시스템처럼 참고

---

###웹앱에서

> https://www.youtube.com/watch?v=tQJscLJdsxc   

사이트 분석시킴

---
# 추가 분석시키는 프롬프트
AI가 종합분석하는 시간이 오래 걸리거나 문구만 걸려 있는 것 같다. 종합해석을 정확히 할 수 있도록 수정해주고, 바이그램 단어짝 분석ㅇ서 고빈도 단어짝들만을 나타내주는 데 너무 적은 짝 보다는 다양하게 살펴볼 수 있도록 20개 짝 정도를 나타내줘.  그리고 화면은 모두 한글로 변경해줘

# 또 추가
URL을 입력하는 영역 하단ㅇ 분석 결과를 나타내줘


### 코드 최적화

터미널에서 

> npm run build
---------------------------------------------------------------------------------------------------
### GitHub 연동 및 코드베이스 업로드
- 깃허브에 접속해서 저장소 생성

### 아래는 이전에 맨 처음 깃허브 업로드 할 때 쓰던 방법임
```
git config --global user.email "zittenn01@gmail.com"
git config --global user.name "zitten01-eng"

git init
git add README.md
git commit -m "complete"
git branch -M main
git remote add origin https://github.com/Kyonam/youtube-comment-ai-eng.git
git push -u origin main
```
프롬프트:

>현재 연결된 깃허브 정보를 알려줘

연결된 저장소가 없나는데

> https://github.com/zittenn01-eng/youtube-comment-ai-eng.git  이 곳에 코드 베이스를 업로드해줘

깃허브를 연동하고 코드베이스를 업로드해줘
---------------------------------------------------------------------------------------------------
* vercel 배포

