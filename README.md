# Helth Friend(HELF)

# 1. 서비스 설명

### 개요

- **진행 기간** : **2022.02.21 ~ 2022.04.08(7주)**

- 한줄 소개 : 인공지능을 이용하여 간편한 식단 관리 및 기록과 간단한 맨몸 운동을 도와주는 서비스
- 서비스 명 : **헬프(HELF)**

<br/>

<br/>

# 2. 기획 배경

### 🖼 배경

우리는 **코로나19가 장기화**되면서 사회적 거리두기로 인한 **외출 자제로 무기력 및 우울감과 살이 찌는 등 건강이 안좋아 졌다**는 기사들을 보았습니다. `헬프`는 '이러한 문제점들을 **어떠한 서비스를 이용 하면 도움이 될까?' 에 집중**하였습니다.

따라서 `헬프` 는 **인공지능을 이용**하여 간편한 **식단 관리및 기록**과 **간단한 맨몸 운동을 도와**주며, 식단 **공유 게시판을 통하여 다양한 사람들의 식단 정보**를 얻을 수 있는 서비스를 만들게 되었습니다.

### 🎯 타겟

- 헬린이라 어떻게 운동을 시작할지 모르는 사람들
- 식단을 일일이 기록하기 귀찮은 사람들
- COVID-19로 인한 외출 자제로 살이 찌는 등 건강이 안 좋아져 홈트에 관심 있는 사람들

<br/>

<br/>

# 3. 서비스 화면

### 📺 시연영상

[![시연영상](./exec/assets/youtube_thumbnail.PNG)](https://www.youtube.com/watch?v=JmRPuGKEBKg)

<br/>

<br/>

### 🛠 주요기능

<br/>

- 식단 기록

  ![식단기록](./exec/assets/dietRegister.gif)

- 식단 공유

  <br/>

  ![식단공유](./exec/assets/shareBoard.gif)

- 운동

  

- 통계
  
  <br/>
  
  - 영상 성분 통계
  
  ![영상성분통계](./exec/assets/nutri.gif)
  
  - 체중 기록
  
  ![체중 기록](./exec/assets/weight.gif)
  
  - 운동 기록
  
  ![운동 기록](./exec/assets/exercise.gif)

<br/>
<br/>

# 4. 기술스택

## API

`헬프` 에서는 , `헬프` 만의 차별점을 갖기 위해 다양한 API를 사용합니다.

### Teachable Machine [🔗](https://teachablemachine.withgoogle.com/)

> Teachable Machine은 누구나 머신러닝 모델을 쉽고 빠르고 간단하게 만들 수 있도록 제작된 웹 기반 API입니다. 특정 동작, 영상, 이미지 등을 학습시켜 이를 모델로 추출하여 클라우드에 업로드하면, 코드내에서 import하여 사용이 가능합니다.

`헬프` 에서는 `Teachable Machine` 을 사용하여 `운동 자세 체크 및 개수 측정`에 사용합니다.

`Teachable Machine` 을 통해서 `운동을 한다` 까지 인식시킬 수는 없습니다.

어떤 자세인지만 인식하는 것이 가능하며, 자세를 인식시킨 뒤, 알고리즘을 통해 대기자세에서 운동자세로 진행할 때, 다시 대기자세로 돌아올 때 와 같은 상황을 나누어, 운동이 진행되고 있음을 구분합니다.

먼저 아래 그림처럼 준비자세와 운동자세를 각각 학습시킵니다.

![image-20220405113330197](./exec/assets/image-20220405113330197.png)

<br/>

<img src="./exec/assets/rerendering.gif" alt="rerendering" style="zoom: 33%;" />

학습시킨 모델은 티처블머신 사이트 상에서 위와 같이 나타나며, `자세를 인식`합니다.

앞을 바라보고 서있는 자세(맨 위)일 때 스쿼트 자세(위에서 세번째)로 인식 상태가 바뀌면 `운동중`으로 인식합니다.

스쿼트 자세에서 다시 서있는 자세로 돌아오면 운동 개수를 하나 카운트 하며, 원하는 횟수에 카운트값이 도달하면 운동의 해당 세트를 종료합니다.
<br/>
<br/>

# 5. 프로젝트 진행

프로젝트 진행 기간동안 전면 비대면으로, 온라인으로 진행되었기에 특히나 진행 방식과 소통 방법이 중요했습니다. 그래서 우리는 `Agile` 방법으로 프로젝트를 진행했고, Jira를 사용한 스프린트 관리, Discord를 활용하여 커뮤니케이션 소통을 하였습니다.

<br/>

## (1). Git Flow

git flow 사용을 위해 `우아한 형제들`의 [git flow 사용](https://techblog.woowahan.com/2553/)을 참고했습니다. 각자 맡은 기능에 맞게 `feature` 브랜치를 생성하고, 완료된 기능은 `develop`에 merge하여 사용했습니다. 충돌 상황을 최소화하고자 매일 오전 스크럼에 `develop` 최신 버전을 `pull`받고 시작할 것을 강조했습니다.

또한 `commit message` 는 `[feature/역할/기능] git 컨벤션` 와 같이 통일하여 작성했습니다.

```update : 기존의 기능 수정
- add : 새로운 기능 추가
- update : 기존의 기능 수정
- delete: 기존의 파일 삭제
- fix : 버그를 고친 경우
- rename : 이름 변경이 있을 때
- chore : 빌드 태스트 업데이트, 패키지 매니저를 설정하는 경우
- test : 테스트 코드 추가, 테스트 리팩토링
- build : 시스템 또는 외부 종속성에 영향을 미치는 변경사항 (npm, gulp, yarn 레벨)
- ci : CI관련 설정 style : 코드 의미에 영향을 주지 않는 변경사항 (포맷, 세미콜론 누락, 공백 등)
- refactor : 성능 개선
```

<br/>

## (2). Jira

매주 월요일 오전 회의에서 차주에 진행되어야 할 이슈를 백로그에 등록했습니다. 금주에 완료하지 못한 이슈나, 앞으로 진행할 이슈들을 추가합니다.

- 에픽은 가장 큰 단위 기준으로 구성하였습니다.

- 스토리는 실제 유저 플로우를 고려하여 `홈페이지에서 로그인 창을 통해 로그인 한다` 와 같이 작성하였으며,

- 이슈는 스토리를 완료하기 위한 작은 업무 단위로 생성했습니다.
- 에픽링크 태그를 사용하여 이슈를 구별하기 쉽게 했습니다.
- 무엇보다 담당자와 스토리 포인트 설정, 현재 작업중인 내용 지라에 실시간으로 반영하는 것을 가장 중요하게 생각했습니다.

<br/>

## (3). Notion

모두가 공유해야할 자료 및 링크는 노션에 정리했습니다. 특히 `userflow`나 `api 명세` 와 같이 여러번 다시 봐야하고 중요한 정보들은 특히 노션에 공유하여 불필요한 커뮤니케이션 리소스를 줄이기 위해 노력했습니다.

프로젝트 컨벤션, 문서, 참고자료, 산출물, 데일리 스크럼 등을 설정했습니다.

![notion1](./exec/assets/notion1.png)

![notion2](./exec/assets/notion2.PNG)<br/>

<br/>

# 6. 배포

서버는 AWS EC2 ubuntu를 사용했습니다

<br/>

## (1). ⚙ 시스템 환경 및 구성

- OS: Windows10
- Backend Framework: Spring Boot 2.4.5
- Frontend Framework: React
- DB: mysql Ver 8.0.27 for Win64 on x86_64 (MySQL Community Server - GPL)
- WAS: Gradle
- JVM: openJDK (1.8.0_192)
- Node.js: 16.14
- Docker: 20.10.13
- WEB: Nginx (1.18.0)

<br/>

## (2). Docker

서로 다른 도커 이미지로 저장되어 있어 각각의 이미지를 실행시킵니다.

필요한 이미지들의 설정은 docker-compose.yml 파일에 작성합니다.

docker 내부는 같은 네트워크로 묶어주기 위해 docker-compose로 실행합니다.
<br/>

## (3). DevOps

`Jenkins`로 CI/CD를 구축하여 develop 브랜치에 `merge` 이벤트 발생시 build하도록 구성했습니다.

build 후 docker-compose를 실행하도록 했습니다.

<br/>

# 7. UI / UX

## (1). 와이어프레임(Figma)

figma를 사용해 홈페이지의 초안을 작성합니다. 관련 레퍼런스를 참고하고, 서비스 특성에 맞게 제작했습니다.

![figma](./exec/assets/figma.PNG)

<br/>

<br/>

# 8. DB

## (1). ERD

![image-20220405113330197](./exec/assets/ERD.png)

<br/>
<br/>

# 9. 팀원 소개 및 소감

## 👩‍💻 팀원 소개

<br/>

<table>
  <tr>
    <td align="center"><a href="https://github.com/heeya15"><img src="https://avatars.githubusercontent.com/u/57131143?v=4?s=100" width="100px;" alt=""/><br /><sub><b>김광희</b></sub></a></td>
    <td align="center"><a href="https://github.com/bandong92"><img src="https://avatars.githubusercontent.com/u/38877090?v=4?s=100" width="100px;" alt=""/><br /><sub><b>반형동</b></sub></a></td>
      <td align="center"><a href="https://github.com/onegi95"><img src="https://avatars.githubusercontent.com/u/87519180?v=4?s=100" width="100px;" alt=""/><br /><sub><b>손한기</b></sub></a></td>
      <td align="center"><a href="https://github.com/sorrow4468"><img src="https://avatars.githubusercontent.com/u/82122491?v=4?s=100" width="100px;" alt=""/><br /><sub><b>이정원</b></sub></a></td>
      <td align="center"><a href="https://github.com/youngjin98"><img src="https://avatars.githubusercontent.com/u/92037407?v=4?s=100" width="100px;" alt=""/><br /><sub><b>최영진</b></sub></a></td>
      <td align="center"><a href="https://github.com/ehhclaire"><img src="https://avatars.githubusercontent.com/u/22373060?v=4?s=100" width="100px;" alt=""/><br /><sub><b>한성희</b></sub></a></td>
  </tr>
</table>
<br/>

### 🐮🍅 소감

- 김광희 : 이번 프로젝트로 처음 사용하는 IDE툴인  React 와 IntelliJ를 이용해 보자고 제가 의견을 내며 주제도 제가 생각한 주제가 선정되어 부담이 어느 정도 되었습니다. 그런데 팀원들 각자 맡은 역할에 책임감을 가져 프로젝트에 임해 주며 팀원들의 장점이 모여 서로의 부족한 점을 보완할 수 있었고, 팀원들과 함께라면 어떠한 것도 해낼 수 있을거 같다는 자신감이 있었습니다. 이번 `특화` 프로젝트를 통해 처음하는 Jenkins와 React, IntelliJ 등 많이 배우며 성장했고, Git Flow, Jira를 사용하여 비대면 상황이더라도 효율적으로 소통하고 협업하는 법을 익힐 수 있었습니다. 체력적(잠을 못 잠)으로 정신적으로(Local 에선 되는대 Server 배포한 곳에선 왜 안되지?) 많이 힘들었지만, 팀원들과 소통하며 문제를 잘 해결해 나아갔고, 저 스스로 정말 열정적으로 프로젝트에 임했다고 자부할 수 있습니다. 마지막으로 우리 팀원들 모두 수고했고 AI셔(아이셔)팀 화이팅!!😀

- 반형동 :

- 손한기 :

- 이정원 :

- 최영진 :

- 한성희 :

  <br/>
