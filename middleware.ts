import { NextApiRequest } from 'next';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const middleware = (request: NextApiRequest) => {
	const cookieStore = cookies();
	const cookie = cookieStore.get('accessToken');
	if (cookie) {
		return NextResponse.next();
	}
	return NextResponse.redirect(new URL('/login', request.url));
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
