import { Chat } from '@/types';
import { fetchMyChats, fetchProfileData } from './profile.utils';
import ProfileModal from '@/Components/Users/ProfileModal';
import { cookies } from 'next/headers';

const Profile = async ({ params }: { params: { id: string } }) => {
	const cookieStore = cookies();
	const accessToken = cookieStore.get('accessToken')!.value;
	const user = await fetchProfileData(accessToken, params.id);
	const myChats: Chat[] = await fetchMyChats(accessToken);
	const existPrivateChat: Chat | undefined = myChats.filter(
		(chat) =>
			chat.isPrivate &&
			chat.users.length === 2 &&
			(chat.users[0].id === params.id || chat.users[1].id === params.id),
	)[0];

	return <ProfileModal user={user} existPrivateChat={existPrivateChat} />;
};

export default Profile;
