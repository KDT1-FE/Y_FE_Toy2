import { Cookies } from 'react-cookie';

const cookies = new Cookies();

interface CookieOptions {
	expires?: Date;
	path?: string;
	domain?: string;
	secure?: boolean;
	// 다른 속성이 있다면 추가할 수 있습니다.
}

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
