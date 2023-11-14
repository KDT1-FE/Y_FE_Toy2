import { Chat } from '@/app/chatting/chatting.type';

export type ChatListProps = {
	myChatList: Chat[];
	accessToken?: string;
};

export type ChatItemProps = {
	chat: Chat;
};

export type SourceColumnProps = {
	id: string;
	title: string;
	taskIds: number[];
};

export type IndexIdIsNumber = Omit<Chat, 'indexId'> & {
	indexId: number;
};

export type ColumnNames = 'list-column' | 'delete-column';

export type Columns = Record<ColumnNames, SourceColumnProps>;

export type TargetType = {
	tasks: IndexIdIsNumber[];
	columns: Columns;
	columnOrder: number[];
};
