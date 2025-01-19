# 이벤트 생성기

## 관련 프로젝트
[클라이언트 프로젝트](https://github.com/SseongWoo/SedolStock)

[서버 프로젝트](https://github.com/SseongWoo/SedolStock_Server)

## 프로젝트 소개
- 관련 프로젝트 "세돌스탁"의 간단한 이벤트 생성기 어플입니다.
- 이벤트를 쉽게 생성하기 위해 제작.

## 개요
- 프로젝트 : 이벤트 생성기
- 분류 : 개인 프로젝트
- 제작기간 : 25.01.18.~ 25.01.19
- 사용기술 : React Native, TypeScript, JavaScript
- 사용 IDE : Visual Studio Code

## 주요 기능
- RESTful API를 사용해 사용자가 입력한 데이터를 기반으로 이벤트를 생성하고 서버로 전송합니다.

## 프로젝트 구성

### 디렉토리 구조
```sh
├── App.tsx
├── assets
│   ├── fonts
│   └── images
│       └── title.png
├── screens                     // 앱 화면
│   ├── ChoiceScreen.tsx        // 메인 화면
│   └── CreateEventScreen.tsx   // 이벤트 생성 화면
├── services
│   └── HttpRequest.tsx         // 서버 통신 서비스
├── styles
│   ├── colors.ts               // 색상 설정
│   └── globalStyles.ts         // 공용 스타일 설정
└── types.ts
```

### 화면 구성
|메인|이벤트 생성|
|:---:|:---:|
|<img src = "https://github.com/user-attachments/assets/bfebbb9c-4bb2-4b8b-a065-1dd1368f1953" width="350" height="750">|<img src = "https://github.com/user-attachments/assets/3e7fb196-98c0-4016-87ab-28176eed72a3" width="350" height="750">|
