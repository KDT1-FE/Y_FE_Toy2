'use client';

import React, { useState } from 'react';
import {
	ChatListProps,
	SourceColumnProps,
	TargetType,
	ColumnNames,
} from './ChatList.type';
import { Chat } from '@/app/private/chatting.type';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useFetchPatchDeleteChat } from '@/hooks/Open/useFetchPatchDeleteChat';
import ChatDroppableDelete from './ChatDroppable/ChatDroppableDelete';
import ChatDroppableList from './ChatDroppable/ChatDroppableList';

const setNewListData = (
	sourceColumn: SourceColumnProps,
	newTaskIds: number[],
	listData: TargetType,
	setFn: React.Dispatch<React.SetStateAction<TargetType>>,
) => {
	const newSourceColumn = {
		...sourceColumn,
		taskIds: newTaskIds,
	};

	const newState = {
		...listData,
		columns: {
			...listData.columns,
			[newSourceColumn.id]: newSourceColumn,
		},
	};
	setFn(newState);
};

const ChatList = ({ myChatList, accessToken }: ChatListProps) => {
	const mutation = useFetchPatchDeleteChat(accessToken as string);

	const idAddedfilteredChatList = myChatList.map(
		(chat: Chat, index: number) => {
			return {
				...chat,
				indexId: index,
			};
		},
	);

	const [listData, setListData] = useState<TargetType>({
		tasks: idAddedfilteredChatList,
		columns: {
			'list-column': {
				id: 'list-column',
				title: 'list-column',
				taskIds: idAddedfilteredChatList.map((chat) => chat.indexId),
			},
			'delete-column': {
				id: 'delete-column',
				title: 'delete-column',
				taskIds: [],
			},
		},
		columnOrder: [0, 1],
	});

	const [openDeleteColumn, setOpenDeleteColumn] = useState(false);

	const onDragStart = () => {
		setOpenDeleteColumn(true);
	};

	const dragEndDeleteColumn = () => {
		setOpenDeleteColumn(false);
	};

	const onDragEnd = (result: DropResult) => {
		const { destination, source } = result;
		if (!destination) {
			dragEndDeleteColumn();
			return null;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			dragEndDeleteColumn();
			return null;
		}

		const sourceColumn = listData.columns[source.droppableId as ColumnNames];
		const destinationColumn =
			listData.columns[destination.droppableId as ColumnNames];

		if (sourceColumn.id === destinationColumn.id) {
			const newTaskIds = Array.from(sourceColumn.taskIds);
			const [removed] = newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, removed);

			setNewListData(sourceColumn, newTaskIds, listData, setListData);
			dragEndDeleteColumn();
			return null;
		}

		if (destination.droppableId === 'delete-column') {
			const newTaskIds = Array.from(sourceColumn.taskIds);
			newTaskIds.splice(source.index, 1);
			const deleteChatIndex = sourceColumn.taskIds[source.index];

			setNewListData(sourceColumn, newTaskIds, listData, setListData);

			const queryId = myChatList[deleteChatIndex].id;
			console.log(queryId);
			mutation.mutate({
				chatId: queryId,
			});
			dragEndDeleteColumn();
			return null;
		}
		dragEndDeleteColumn();
	};

	const chatListColumn = listData.columns['list-column'];
	const chatListColumnTasks = chatListColumn.taskIds.map((indexId) => {
		const task = listData.tasks[indexId as number];
		return task;
	});

	return (
		<>
			{idAddedfilteredChatList && (
				<DragDropContext onDragEnd={onDragEnd} onBeforeDragStart={onDragStart}>
					<ChatDroppableList chatListColumnTasks={chatListColumnTasks} />
					<ChatDroppableDelete openDeleteColumn={openDeleteColumn} />
				</DragDropContext>
			)}
		</>
	);
};

export default ChatList;
