# 오늘 뭐 입지?

<br />

## 사용 기술

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=React&logoColor=2361DAFB)
![ReactQuery](https://img.shields.io/badge/React--Query-%23FF4154.svg?style=for-the-badge&logo=ReactQuery&logoColor=white)
![Recoil](https://img.shields.io/badge/Recoil-%233578E5.svg?style=for-the-badge&logo=Recoil&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

<br />

## 프로젝트 소개

#### 목표를 저장하고, 현재 달성한 수치를 기록하여 달성률을 확인할 수 있는 웹앱입니다.

1. Google 로그인을 할 수 있고, 로그인 시 글 작성 및 삭제가 가능합니다. (서버의 미완성으로 로그인 유무를 확인할 뿐, 유저별로 게시글 목록을 관계 지어 관리하지 않습니다. 모든 유저가 하나의 게시글 목록을 가집니다.)
2. 유저는 목표를 조회, 작성, 수정, 삭제를 할 수 있고, 목표별로 단위(ex: 권, 개, km)를 다르게 설정할 수 있습니다.
3. 각 목표 별로 현재 달성한 수치를 기록할 수 있습니다. 수치를 업데이트하면 비율을 계산하여 progress bar가 업데이트 되고, 남은 숫자 또한 변경됩니다.

<br />

## 구현 화면

### 1. 로그인

![goal-login](https://user-images.githubusercontent.com/98656282/215397245-a3df1d08-3608-481d-a190-98da033c927b.gif)

<br>

### 2. 목표 추가

![goal-create](https://user-images.githubusercontent.com/98656282/215397304-de8e13a1-ef41-4d4e-977e-d6c2a4fe05c5.gif)

<br>

### 3. 목표 수정 / 달성 수치 업데이트

![goal-update](https://user-images.githubusercontent.com/98656282/215397424-4f55f0da-b8bd-4a96-ab7a-23193043a88a.gif)

<br>

### 4. 목표 삭제

![goal-delete](https://user-images.githubusercontent.com/98656282/215397508-216bbc82-f6e1-4c8b-b950-38545d6cd07f.gif)

<br />

## :hammer_and_wrench: 기술 스택

- React
- TypeScript
- firebase OAuth
- styled-components
- Recoil
- React-query

## :runner: 로컬 실행 방법

1. 클론하고자 하는 레파지토리에서 아래 명령어를 수행

   ```
   git clone <레포지토리 주소>
   ```

<br>

2. 아래 명령어를 통해 필요한 module 설치 및 실행

   ```
   cd server
   yarn install
   yarn start

   cd ../client
   yarn install
   yarn start
   ```
