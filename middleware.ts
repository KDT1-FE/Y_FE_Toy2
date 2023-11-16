import { NextResponse } from 'next/server';

export const middleware = () => {
	// const cookieStore = cookies();
	// const cookie = cookieStore.get('accessToken');
	// if (cookie) {
	return NextResponse.next();
	// }
	// return NextResponse.redirect(new URL('/login', request.url));
};

export const config = {
	matcher: [
		'/open',
		'/search',
		'/users',
		'/private',
		'/searchmychat',
		'/chat',
		'/profile',
		'/chatProfile',
	],
};
