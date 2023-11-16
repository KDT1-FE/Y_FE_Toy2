import { Chat, User } from '@/types';

export const search = <T extends Chat | User>(
	inputValue: string,
	searchData: T[],
	resultSetter: React.Dispatch<React.SetStateAction<T[]>>,
) => {
	const result = searchData.filter((item: Chat | User) =>
		toLower(item.name).includes(inputValue),
	);

	resultSetter(result);
};

export const toLower = (inputValue: string) => {
	return inputValue.toLowerCase().replace(/(\s*)/g, '');
};
