import { Cookies } from 'react-cookie';

const cookies = new Cookies();

type CookieOptions = {
	expires?: Date;
	path?: string;
	domain?: string;
	secure?: boolean; // true : 웹 브라우저와 웹 서버가 https로 통신하는 경우에만 쿠키 저장
	httpOnly?: boolean; // true : document.cookie라는 자바스크립트 코드로 쿠키에 비정상적으로 접속하는 것을 막는 옵션
	// 다른 속성이 있다면 추가할 수 있습니다.
};

// setCookie: 쿠키를 저장하는 함수
export const setCookie = (
	name: string,
	value: string,
	option: CookieOptions,
) => {
	return cookies.set(name, value, { ...option });
};

// getCookie: 쿠키를 가지고 오는 함수
export const getCookie = (name: string) => {
	return cookies.get(name);
};

// removeCookie: 쿠키를 삭제하는 함수
export const removeCookie = (name: string, option: CookieOptions) => {
	return cookies.remove(name, { ...option });
};
