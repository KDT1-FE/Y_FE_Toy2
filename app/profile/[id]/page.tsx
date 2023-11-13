import { User } from '@/types';
import { fetchProfileData } from './profile.utils';
import ProfileModal from '@/Components/Profile/ProfileModal';

const Profile = async ({ params }: { params: { id: string } }) => {
	const accessToken = process.env.NEXT_PUBLIC_ACCESSTOKEN as string;
	console.log('params', params);
	const user: User = await fetchProfileData(accessToken, params.id);

	return <ProfileModal user={user}></ProfileModal>;
};

export default Profile;
