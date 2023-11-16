# Cat Talk

<p align="center">
  <img src="public/icon_cat.svg"  width="150" height="150"/><br/>
  <a href="/">
    <img src="https://img.shields.io/badge/Cat Talk-pink?style=for-the-badge&logoColor=white" alt="Cat Talk"/>
  </a>
  <a href="https://github.com/MOVIEJOJO7/cat-talk">
    <img src="https://img.shields.io/badge/배포 repository-212125?style=for-the-badge&logoColor=white" alt="배포 레포"/>
  </a>
  <br/>
</p>

```
Test ID : cat
Test PW : 00000
```

## 🧑🏻‍💻 프로젝트 소개

`Cat Talk`는 반려묘를 기르고 있는 집사들을 위한 채팅 웹 서비스 입니다.

### [필수 구현 사항]

✅ `useState`를 활용한 상태 관리 구현  
✅ `tailwind CSS`를 활용한 스타일 구현  
✅ `react` 상태를 통한 CRUD 구현 (Next.js 'use client')  
✅ 상태에 따라 달라지는 스타일 구현  
✅ `custom hook`을 통한 비동기 처리 구현  
✅ 유저인증 시스템(로그인, 회원가입) 구현  
✅ `jwt`등의 유저 인증 시스템 (로그인, 회원가입 기능)  
✅ 소켓을 이용한 채팅 구현

### [선택 구현 사항]

✅ `Next.js`를 활용한 서버 사이드 렌더링 구현  
✅ `typescript`를 활용한 앱 구현  
❎ `storybook`을 활용한 디자인 시스템 구현  
❎ `jest`를 활용한 단위 테스트 구현

<br/>

<details>
<summary>야놀자 테크 캠프 토이 프로젝트 2 요구 사항</summary>

# 🍋 소켓 기반 채팅앱

주어진 API와 소켓을 분석해 어떤 프로젝트를 진행/완성할 것인지 팀 단위로 자유롭게 결정하고 만들어보세요.  
과제 수행 및 리뷰 기간은 별도 공지를 참고하세요!

## 과제 수행 및 제출 방법

```
Y_FE_Toy2_{팀명}

E.g, Y_FE_Toy2_GYOHEON
```

1. 현재 저장소를 로컬에 클론(Clone)합니다.
1. 자신의 팀명으로 브랜치를 생성합니다.(구분 가능하도록 팀명을 꼭 파스칼케이스로 표시하세요, `git branch Y_FE_Toy2_Team13`)
1. 자신의 팀명 브랜치에서 과제를 수행합니다.
1. 과제 수행이 완료되면, 자신의 팀명 브랜치를 원격 저장소에 푸시(Push)합니다.(`main` 브랜치에 푸시하지 않도록 꼭 주의하세요, `git push origin Y_FE_Toy2_Team13`)
1. 저장소에서 `main` 브랜치를 대상으로 Pull Request 생성하면, 과제 제출이 완료됩니다!(E.g, `main` <== `Y_FE_Toy2_Team13`)
1. Pull Request 링크를 LMS로도 제출해 주셔야 합니다.
1. main 혹은 다른 사람의 브랜치로 절대 병합하지 않도록 주의하세요!
1. Pull Request에서 보이는 설명을 다른 사람들이 이해하기 쉽도록 꼼꼼하게 작성하세요!

- 과제 수행 및 제출 과정에서 문제가 발생한 경우, 바로 담당 멘토나 강사에게 얘기하세요!

- 백엔드 서버에 문제가 생겼을 경우, 바로 슬랙의 GyoHeon Lee에게 연락하세요!

## 필수 구현 사항

- [ ] `useState` 또는 `useReducer`를 활용한 상태 관리 구현
- [ ] `Sass`, `styled-component`, `emotion`, `Chakra UI`, `tailwind CSS` 등을 활용한 스타일 구현
- [ ] `react` 상태를 통한 CRUD 구현
- [ ] 상태에 따라 달라지는 스타일 구현
- [ ] `custom hook`을 통한 비동기 처리 구현
- [ ] 유저인증 시스템(로그인, 회원가입) 구현
- [ ] `jwt`등의 유저 인증 시스템 (로그인, 회원가입 기능)
- [ ] 소켓을 이용한 채팅 구현

## 선택 구현 사항

- [ ] `Next.js`를 활용한 서버 사이드 렌더링 구현
- [ ] `typescript`를 활용한 앱 구현
- [ ] `storybook`을 활용한 디자인 시스템 구현
- [ ] `jest`를 활용한 단위 테스트 구현

## 추가 사항

- api들의 응답 데이터들을 일부러 파편화 해두었습니다!
- api들 간의 데이터를 조합하여 이상적인 구조를 만들어보세요.

## 예시 프로젝트

![private-messaging-part-1-chat-ab610e9e03738ad37f7b0fb55c771087](https://github.com/KDT1-FE/Y_FE_Toy2/assets/66263916/c5247dde-2ca6-4285-a60e-8dcf23326d0e)

## API 사용법

- 모든 network 요청(Request) `headers`에 아래 정보가 꼭 포함돼야 합니다!
- serverId는 팀마다 개별 전달됩니다.
- 확인할 수 없는 사용자나 팀의 DB 정보는 임의로 삭제될 수 있습니다!

```json
{
	"content-type": "application/json",
	"serverId": "nREmPe9B"
}
```

## 기본 데이터 구조

### user

```ts
interface User {
	id: string;
	password: string;
	name: string;
	picture: string;
	chats: string[]; // chat id만 속합니다.
}
```

### chat

```ts
interface Chat {
	id: string;
	name: string;
	isPrivate: boolean;
	users: string[];
	messages: Message[]; // message 객체가 속합니다.

	updatedAt: Date;
}
```

### message

```ts
interface Message {
	id: string;
	text: string;
	userId: string;

	createdAt: Date;
}
```

## 회원

### 회원가입

사용자가 `id`에 종속되어 회원가입합니다.

- 사용자 비밀번호는 암호화해 저장합니다.
- 프로필 이미지는 url or base64 형식이어야 합니다.
- 프로필 이미지는 1MB 이하여야 합니다.

```curl
curl https://fastcampus-chat.net/signup
  \ -X 'POST'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
	id: string; // 사용자 아이디 (필수!, 영어와 숫자만)
	password: string; // 사용자 비밀번호, 5자 이상 (필수!)
	name: string; // 사용자 이름, 20자 이하 (필수!)
	picture?: string; // 사용자 이미지(url or base64, under 1MB)
}
```

```json
{
	"id": "abcd",
	"password": "********",
	"name": "GyoHeon",
	"picture": "https://avatars.githubusercontent.com/u/66263916?v=4"
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
	message: title;
}
```

```json
{
	"message": "User created"
}
```

### id 중복 체크

`id` 중복 체크를 합니다.

```curl
curl https://fastcampus-chat.net/check/id
  \ -X 'POST'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
	id: string; // 사용자 아이디 (필수!, 영어와 숫자만)
}
```

```json
{
	"id": "abcd"
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
	isDuplicated: boolean;
}
```

```json
{
	"isDuplicated": false
}
```

### 로그인

- 발급된 `accessToken`은 7일 후 만료됩니다.

```curl
curl https://fastcampus-chat.net/login
  \ -X 'POST'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
	id: string; // 사용자 아이디 (필수!)
	password: string; // 사용자 비밀번호 (필수!)
}
```

```json
{
	"id": "abcd",
	"password": "********"
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
	accessToken: string; // 사용자 접근 토큰
	refreshToken: string; // access token 발급용 토큰
}
```

```json
{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlQS3I...(생략)",
	"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlQS3I...(생략)"
}
```

### 인증 확인

`id` 중복 체크를 합니다.

```curl
curl https://fastcampus-chat.net/auth/me
  \ -X 'GET'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

- 없음

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
	auth: boolean;
	user?: User;
}

interface User {
	id: string;
	name: string;
	picture: string;
}
```

```json
{
	"auth": true,
	"user": {
		"id": "test1",
		"name": "abcde",
		"picture": "https://avatars.githubusercontent.com/u/42333366?v=4"
	}
}
```

### 토큰 재발급

```curl
curl https://fastcampus-chat.net/refresh
  \ -X 'POST'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
	refreshToken: string; // access token 발급용 토큰
}
```

```json
{
	"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlQS3I...(생략)"
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
	accessToken: string; // 사용자 접근 토큰
}
```

```json
{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlQS3I...(생략)"
}
```

### 사용자 정보 수정

- 프로필 이미지는 url or base64 형식이어야 합니다.
- 프로필 이미지는 1MB 이하여야 합니다.

```curl
curl https://fastcampus-chat.net/user
  \ -X 'PATCH'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
	name?: string; // 새로운 표시 이름
	picture?: string; // 사용자 프로필 이미지(url or base64)
}
```

```json
{
	"name": "abcde",
	"picture": "https://avatars.githubusercontent.com/u/42333366?v=4"
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
	messgae: string;
}
```

```json
{
	"message": "User updated"
}
```

## 채팅

### 특정 유저 조회

- 특정 유저를 조회합니다.

```curl
curl https://fastcampus-chat.net/user?userId=${userId}
  \ -X 'GET'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

- 없음
- 조회하고 싶은 id는 query string으로 사용합니다.

응답 데이터 타입 및 예시:

```ts
type ResponseValue = {
	user: User;
};

interface User {
	id: string;
	name: string;
	picture: string;
}
```

```json
{
	"user": {
		"id": "user1",
		"name": "lgh",
		"picture": "https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro"
	}
}
```

### 모든 유저 조회

- 현재 존재하는 모든 유저를 조회합니다.

```curl
curl https://fastcampus-chat.net/users
  \ -X 'GET'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

- 없음

응답 데이터 타입 및 예시:

```ts
type ResponseValue = User[];

interface User {
	id: string;
	name: string;
	picture: string;
}
```

```json
[
	{
		"id": "user1",
		"name": "lgh",
		"picture": "https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro"
	},
	{
		"id": "user2",
		"name": "ldj",
		"picture": "https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro"
	}
]
```

### 채팅 생성하기

```curl
curl https://fastcampus-chat.net/chat
  \ -X 'POST'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
	name: string; // chat 이름
	users: string[]; // 참가자들 id(자신 미포함)
	isPrivate?: boolean; // 공개 비공개
}
```

```json
{
	"name": "test chat",
	"users": ["user1", "user2"]
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
	id: string;
	name: string;
	users: User[]; // 자신을 포함한 참가자들 정보
	isPrivate: boolean;
	updatedAt: Date;
}

interface User {
	id: string;
	name: string;
	picture: string;
}
```

```json
{
	"id": "fasgadsfdsghssdlsdafasd",
	"name": "test chat",
	"users": [
		{
			"id": "user1",
			"name": "lgh",
			"picture": "https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro"
		},
		{
			"id": "user2",
			"name": "ldj",
			"picture": "https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro"
		}
	],
	"isPrivate": false,
	"updatedAt": "2023-11-01T08:23:39.850Z"
}
```

### 특정 채팅 조회

- 특정 id의 채팅을 조회합니다.
- isPrivate: true인 채팅방은 해당 채팅방 참가자만 볼 수 있습니다.

```curl
curl https://fastcampus-chat.net/chat/only?chatId=${chatId}
  \ -X 'GET'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

- 없음

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
	chat: Chat;
}

interface Chat {
	id: string;
	name: string;
	users: User[]; // 속한 유저 정보
	isPrivate: boolean;
	latestMessage: Message | null;
	updatedAt: Date;
}

interface User {
	id: string;
	name: string;
	picture: string;
}

interface Message {
	id: string;
	text: string;
	userId: string;
	createAt: Date;
}
```

```json
{
	"chat": {
		"id": "f189ab25-5644-4d72-bd7c-0170ee9c8ede",
		"name": "chat room 1",
		"users": [
			{
				"id": "user1",
				"name": "lgh",
				"picture": "https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro"
			},
			{
				"id": "user2",
				"name": "ldj",
				"picture": "https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro"
			}
		],
		"isPrivate": false,
		"updatedAt": "2023-10-31T13:18:38.216Z",
		"latestMessage": null
	}
}
```

### 모든 채팅 조회

- 현재 존재하는 모든 채팅을 조회합니다.
- isPrivate: true인 채팅방은 보이지 않습니다.

```curl
curl https://fastcampus-chat.net/chat/all
  \ -X 'GET'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

- 없음

응답 데이터 타입 및 예시:

```ts
type ResponseValue = Chat[];

interface Chat {
	id: string;
	name: string;
	users: User[]; // 속한 유저 정보
	isPrivate: boolean;
	latestMessage: Message | null;
	updatedAt: Date;
}

interface User {
	id: string;
	name: string;
	picture: string;
}

interface Message {
	id: string;
	text: string;
	userId: string;
	createAt: Date;
}
```

```json
[
	{
		"id": "f189ab25-5644-4d72-bd7c-0170ee9c8ede",
		"name": "chat room 1",
		"users": [
			{
				"id": "user1",
				"name": "lgh",
				"picture": "https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro"
			},
			{
				"id": "user2",
				"name": "ldj",
				"picture": "https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro"
			}
		],
		"isPrivate": false,
		"updatedAt": "2023-10-31T13:18:38.216Z",
		"latestMessage": null
	},
	{
		"id": "f189ab25-5644-4d72-bd7c-0170ee9c8edj",
		"name": "chat room 2",
		"users": [
			{
				"id": "user1",
				"name": "lgh",
				"picture": "https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro"
			},
			{
				"id": "user2",
				"name": "ldj",
				"picture": "https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro"
			}
		],
		"isPrivate": false,
		"updatedAt": "2023-10-31T15:18:38.216Z",
		"latestMessage": {
			"id": "8f7f67bb-f1ab-4792-9678-0b8546adcb6f",
			"text": "testtest444",
			"userId": "test:test6",
			"createdAt": "2023-11-06T11:15:50.588+00:00"
		}
	}
]
```

### 나의 채팅 조회

```curl
curl https://fastcampus-chat.net/chat
  \ -X 'GET'
  \ -H 'Authorization: Bearer <accessToken>'
```

- 내가 속한 모든 채팅을 조회합니다.
- isPrivate: true인 채팅방도 모두 보이게 됩니다.

요청 데이터 타입 및 예시:

- 없음

응답 데이터 타입 및 예시:

```ts
type ResponseValue = Chat[];

interface Chat {
	id: string;
	name: string;
	users: User[]; // 속한 유저 id
	isPrivate: boolean;
	latestMessage: Message | null;
	updatedAt: Date;
}

interface User {
	id: string;
	name: string;
	picture: string;
}

interface Message {
	id: string;
	text: string;
	userId: string;
	createAt: Date;
}
```

```json
[
	{
		"id": "f189ab25-5644-4d72-bd7c-0170ee9c8ede",
		"name": "chat room 1",
		"users": [
			{
				"id": "user1",
				"name": "lgh",
				"picture": "https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro"
			},
			{
				"id": "user2",
				"name": "ldj",
				"picture": "https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro"
			}
		],
		"isPrivate": true,
		"updatedAt": "2023-10-31T13:18:38.216Z",
		"latestMessage": null
	},
	{
		"id": "f189ab25-5644-4d72-bd7c-0170ee9c8edj",
		"name": "chat room 2",
		"users": [
			{
				"id": "user1",
				"name": "lgh",
				"picture": "https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro"
			},
			{
				"id": "user2",
				"name": "ldj",
				"picture": "https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro"
			}
		],
		"isPrivate": false,
		"updatedAt": "2023-10-31T15:18:38.216Z",
		"latestMessage": {
			"id": "8f7f67bb-f1ab-4792-9678-0b8546adcb6f",
			"text": "testtest444",
			"userId": "test:test6",
			"createdAt": "2023-11-06T11:15:50.588+00:00"
		}
	}
]
```

## 채팅 참여하기

```curl
curl https://fastcampus-chat.net/chat/participate
  \ -X 'PATCH'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
	chatId: string;
}
```

```json
{
	"chatId": "f189ab25-5644-4d72-bd7c-0170ee9c8ede"
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
	id: string;
	name: string;
	users: User[]; // 속한 유저 id
	isPrivate: boolean;
	updatedAt: Date;
}

interface User {
	id: string;
	name: string;
	picture: string;
}
```

```json
{
	"id": "f189ab25-5644-4d72-bd7c-0170ee9c8ede",
	"name": "chat room 1",
	"users": [
		{
			"id": "user1",
			"name": "lgh",
			"picture": "https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro"
		},
		{
			"id": "user2",
			"name": "ldj",
			"picture": "https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro"
		}
	],
	"isPrivate": true,
	"updatedAt": "2023-10-31T13:18:38.216Z"
}
```

## 채팅 나가기

```curl
curl https://fastcampus-chat.net/chat/leave
  \ -X 'PATCH'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
	chatId: string;
}
```

```json
{
	"chatId": "f189ab25-5644-4d72-bd7c-0170ee9c8ede"
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
	message: string;
}
```

```json
{
	"message": "Leave success"
}
```

## 채팅 초대하기

```curl
curl https://fastcampus-chat.net/chat/invite
  \ -X 'PATCH'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
	chatId: string;
	users: string[]; // 초대할 유저 id
}
```

```json
{
	"chatId": "f189ab25-5644-4d72-bd7c-0170ee9c8ede",
	"users": ["user1", "user2"]
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
	id: string;
	name: string;
	users: User[]; // 속한 유저 정보
	isPrivate: boolean;
	updatedAt: Date;
}

interface User {
	id: string;
	name: string;
	picture: string;
}
```

```json
{
	"id": "f189ab25-5644-4d72-bd7c-0170ee9c8ede",
	"name": "chat room 1",
	"users": [
		{
			"id": "user1",
			"name": "lgh",
			"picture": "https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro"
		},
		{
			"id": "user2",
			"name": "ldj",
			"picture": "https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro"
		}
	],
	"isPrivate": true,
	"updatedAt": "2023-10-31T13:18:38.216Z"
}
```

# Socket

- socket.io 의 사용을 추천드립니다.
- Socket 연결시에도 headers는 유지해야 합니다.

## 기본 연결

```ts
io(`https://fastcampus-chat.net/chat?chatId=${chatId}`, {
	extraHeaders: {
		Authorization: 'Bearer <accessToken>',
		serverId: 'test',
	},
});
```

## emit Event(client -> server)

### example

```ts
socket.emit('message-to-server', text);
```

### message-to-server

- 같은 방에 있는 사람들에게 메세지를 전달합니다.

요청 데이터

```ts
type RequestData: string;
```

### fetch-messages

- 이전 대화 목록을 불러옵니다.
- `messages-to-client`로 데이터를 받을 수 있습니다.

요청 데이터

- 없음

### users

- 접속 상태인 유저 목록을 불러옵니다.
- `users-to-client`로 데이터를 받을 수 있습니다.

요청 데이터

- 없음

## on Event(server -> client)

### example

```ts
socket.on('message-to-client', (messageObject) => {
	console.log(messageObject);
});
```

### message-to-client

- 같은 방에 있는 사람들에게 메세지를 전달합니다.

응답 데이터

```ts
interface ResponseData {
	id: string;
	text: string;
	userId: string; // 메세지를 보낸 사람의 id
	createdAt: Date;
}
```

### messages-to-client

- 이전 대화 목록을 불러옵니다.

응답 데이터

```ts
interface Message {
	id: string;
	text: string;
	userId: string; // 메세지를 보낸 사람의 id
	createdAt: Date;
}

interface ResponseData {
	messages: Message[];
}
```

### join

- 같은 방에 새로운 사람이 들어오면 모든 유저의 정보를 다시 받습니다.

응답 데이터

```ts
interface ResponseData {
	users: string[]; // 참여자들 id
	joiners: string[]; // 새로운 참여자 id
}
```

### leave

- 같은 방에 사람이 나가면 모든 유저의 정보를 다시 받습니다.

응답 데이터

```ts
interface ResponseData {
	users: string[]; // 참여자들 id
	leaver: string; // 나간 사용자 id
}
```

### users-to-client

- 접속 상태인 유저 목록을 불러옵니다.

응답 데이터

```ts
interface ResponseData {
	user: string[]; // 참가자들 id
}
```

## server 연결

```ts
io(`https://fastcampus-chat.net/server`, {
	extraHeaders: {
		Authorization: 'Bearer <accessToken>',
		serverId: 'test',
	},
});
```

## emit Event(client -> server)

### example

```ts
socket.emit('users-server');
```

### users-server

- 같은 serverId를 사용하는 online 사용자를 불러옵니다.
- `users-server-to-client`로 데이터를 받을 수 있습니다.

요청 데이터

- 없음

## on Event(server -> client)

### example

```ts
socket.on('message-to-client', (messageObject) => {
	console.log(messageObject);
});
```

### users-server-to-client

- 같은 serverId를 사용하는 접속 상태인 유저 목록을 불러옵니다.

응답 데이터

```ts
interface ResponseData {
	user: string[]; // 참가자들 id
}
```

### invite

- 새로운 채팅방 생성시 해당 채팅방 유저에게 채팅방 정보를 전송합니다.
- 기존 채팅방에 유저 초대시 초대된 유저에게 채팅방 정보를 전송합니다.

응답 데이터

```ts
interface ResponseData {
	id: string;
	name: string;
	users: string[]; // 참여자들 id
	isPrivate: boolean;
	updatedAt: Date;
}
```

### new-chat

- 새로운 대화방이 생긴 경우 (not private) 서버(팀에서 사용하는 serverId)의 참여자들에게 이를 전달합니다.

응답 데이터

```ts
interface ResponseData {
	id: string;
	name: string;
	users: string[]; // 참여자들 id
	isPrivate: boolean;
	updatedAt: Date;
}
```

</details>

<br/>

## 🧑🏻‍💻 Contributor

> @[TaePoong719](https://github.com/TaePoong719) (최우혁) : 유저 목록, 참여한 채팅 및 유저 검색  
> @[LikeFireAndSky](https://github.com/LikeFireAndSky) (김민섭) : 채팅 목록 구현, 클라우디너리 연동, 퍼블리싱  
> @[hhjs2](https://github.com/hhjs2) (정효주) : 로그인, 회원가입, 채팅 기능 구현  
> @[JitHoon](https://github.com/JitHoon) (최지훈) : 채팅 검색, 채팅 기능 구현  
> @[syb0127](https://github.com/syb0127) (서예빈) : 로그아웃, 푸터 구현 및 디자인 작업

<br/>

## 🧑🏻‍💻 Stack

![Stack](https://github.com/MOVIEJOJO7/cat-talk/assets/101972330/68bb2746-7f5f-40da-9cd6-3a57cb4c89fc)

<br/>

## 🧑🏻‍💻 디자인

### Userflow

|||
|---|---|
| ![유저플로우1](https://github.com/MOVIEJOJO7/cat-talk/assets/98576512/cdee66fe-afdd-4bf1-94dc-dced5168065e) | ![유저플로우2](https://github.com/MOVIEJOJO7/cat-talk/assets/98576512/9ddde385-660d-4b8f-8f53-d3adea2a5769) |
| ![유저플로우3](https://github.com/MOVIEJOJO7/cat-talk/assets/98576512/0cc08deb-85e3-43fe-95dc-3bad21be3da0) | ![유저플로우4](https://github.com/MOVIEJOJO7/cat-talk/assets/98576512/5b253557-ce1f-41a3-8e31-0d07c712f4d1) |
| ![유저플로우5](https://github.com/MOVIEJOJO7/cat-talk/assets/98576512/718aa86d-dddd-4866-921f-cee666886457) |

### 디자인 프로토타입

<img width="1146" alt="image" src="https://github.com/MOVIEJOJO7/cat-talk/assets/102405617/41a2d804-95ea-4d5e-9ac5-0ad051ab0739 /">

<br/>

## 🧑🏻‍💻 주요 기능 구현

<div align="center" style="display: flex; flex-direction: column;">
	<div style="display: flex;">
		<div>
			<h3>로그인, 회원가입</h3>
			<img src="https://github.com/cs-yum/cs-yum-blog/assets/101972330/08a39e06-34d9-47a7-9292-c2dccb19e158"  width="200" />
		</div>
		<div>
			<h3>유저 목록 조회, 검색, 채팅</h3>
			<img src="https://github.com/cs-yum/cs-yum-blog/assets/101972330/65bb7482-bc1e-414c-a145-d8e469a3f3f2"  width="200" />
		</div>
	</div>
	<div style="display: flex;">
		<div>
			<h3>채팅방 검색 및 채팅</h3>
			<img src="https://github.com/cs-yum/cs-yum-blog/assets/101972330/70c44318-4dd2-4a52-8b25-dcc17de62081"  width="200" />
		</div>
		<div>
			<h3>드래그 & 드롭</h3>
			<img src="https://github.com/cs-yum/cs-yum-blog/assets/101972330/5a6b5b54-dfe3-40ec-b8c5-28c6c3607a92"  width="200" />
		</div>
	</div>
</div>

### 로그인, 회원가입

<img src="https://github.com/cs-yum/cs-yum-blog/assets/101972330/08a39e06-34d9-47a7-9292-c2dccb19e158"  width="200" />

### 유저 목록 조회, 검색, 채팅

<img src="https://github.com/cs-yum/cs-yum-blog/assets/101972330/65bb7482-bc1e-414c-a145-d8e469a3f3f2"  width="200" />

### 채팅방 검색 및 채팅

<img src="https://github.com/cs-yum/cs-yum-blog/assets/101972330/70c44318-4dd2-4a52-8b25-dcc17de62081"  width="200" />

### 드래그 & 드롭

<img src="https://github.com/cs-yum/cs-yum-blog/assets/101972330/5a6b5b54-dfe3-40ec-b8c5-28c6c3607a92"  width="200" />


<br/>

## 🧑🏻‍💻 Script

### Development Mode

```
$ git clone https://github.com/MOVIEJOJO7/cat-talk.git
$ npm i
$ npm run dev
```

<br/>

## 🧑🏻‍💻 팀 소개

<table>
  <tr>
    <td align="center" width="150px">
      <a href="https://github.com/TaePoong719" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/98576512?v=4" alt="최우혁 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/LikeFireAndSky" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/107862297?v=4" alt="김민섭 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/hhjs2" target="_blank">
        <img src="https://github.com/MOVIEJOJO7/cat-talk/assets/102405617/4c79f630-d84a-4a33-a7a9-ccf2df68305a" alt="정효주 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/JitHoon" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/101972330?v=4" alt="최지훈 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/syb0127" target="_blank">
        <img src="https://github.com/MOVIEJOJO7/cat-talk/assets/57075876/b094f8b2-322f-47f5-989e-2f4bf6e76b15" alt="서예빈 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/minsoo-web" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/57122180?v=4" alt="김민수 멘토님" />
      </a>
    </td>
  </tr>
  <tr> 
    <td align="center">
      <a href="https://github.com/TaePoong719" target="_blank">
        최우혁<br />
        Frontend
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/LikeFireAndSky" target="_blank">
        김민섭<br />
        Frontend
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/hhjs2" target="_blank">
        정효주<br />
        Frontend
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/JitHoon" target="_blank">
        최지훈<br />
        Frontend
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/syb0127" target="_blank">
        서예빈<br />
        Frontend
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/minsoo-web" target="_blank">
        김민수 멘토님<br /> 
        멘토링
      </a>
    </td>
  </tr>
</table>

### 🧑🏻‍💻 개발 기간 : `11일` `23.11.06 월 ~ 23.11.16 목`