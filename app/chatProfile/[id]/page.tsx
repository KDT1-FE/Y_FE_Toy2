import { Chat } from '@/types';
import { fetchAllOpenChat } from './chatProfile.utils';
import { cookies } from 'next/headers';
import OpenChatModal from '@/Components/Search/OpenChatModal';

const page = async ({ params }: { params: { id: string } }) => {
	const cookieStore = cookies();
	const accessToken = cookieStore.get('accessToken')!.value;
	const allChat: Chat[] = await fetchAllOpenChat(accessToken);
	const modal = allChat.find((chat) => chat.id === params.id) as Chat;
	return <OpenChatModal modalChat={modal} />;
};

export default page;
