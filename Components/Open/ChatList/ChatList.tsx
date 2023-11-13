'use client';

import React, { useState } from 'react';
import {
	ChatListProps,
	SourceColumnProps,
	TargetType,
	ColumnNames,
} from './ChatList.type';
import { Chat } from '@/app/open/open.type';
import { filterChat } from '@/app/open/open.utils';
import ChatItem from './ChatItem';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from '@/Components/Login/Cookie';
import { fetchAllChat } from '@/app/open/open.utils';
import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from '@hello-pangea/dnd';
import ChatItemDrag from './ChatItemDrag';
import { useFetchPatchDeleteChat } from '@/hooks/Open/useFetchPatchDeleteChat';

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

const ChatList = ({ myChatList }: ChatListProps) => {
	const accessToken = getCookie('accessToken');
	const { data: chatList } = useQuery({
		queryKey: ['myChatList'],
		queryFn: () => fetchAllChat(accessToken),
		initialData: myChatList,
		staleTime: 1000 * 60,
		refetchInterval: 1000 * 60,
	});

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const mutation = useFetchPatchDeleteChat(accessToken);

	const filteredChatList = filterChat(chatList.chats);

	const idAddedfilteredChatList = filteredChatList.map(
		(chat: Chat, index: number) => {
			return {
				...chat,
				indexId: index,
			};
		},
	);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [openDeleteColumn, setOpenDeleteColumn] = useState(false);

	console.log('컴포넌트 실행');
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

			const queryId = chatList.chats[deleteChatIndex].id;
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
					<Droppable droppableId="list-column">
						{(droppableProvided) => (
							<div
								className="h-full w-full text-amber-900  overflow-y-scroll gap-5"
								ref={droppableProvided.innerRef}
								{...droppableProvided.droppableProps}
							>
								{chatListColumnTasks.map((chat, index: number) => {
									return (
										<Draggable
											key={chat.indexId}
											draggableId={chat.indexId.toString()}
											index={index as number}
										>
											{(draggableProvided, snapshot) => (
												<div
													ref={draggableProvided.innerRef}
													{...draggableProvided.draggableProps}
													{...draggableProvided.dragHandleProps}
													className="w-full"
												>
													{snapshot.isDragging ? (
														<ChatItemDrag chat={chat} key={chat.id} />
													) : (
														<ChatItem chat={chat} key={chat.id} />
													)}
												</div>
											)}
										</Draggable>
									);
								})}
								{droppableProvided.placeholder}
							</div>
						)}
					</Droppable>
					<Droppable droppableId="delete-column">
						{(droppableProvided, snapshot) => (
							<div
								className={`${
									openDeleteColumn
										? 'visible opacity-100'
										: 'invisible opacity-0'
								} transition-opacity duration-1000 ease-linear h-24 absolute bg-trash-can bg-contain bg-no-repeat bg-center inset-x-0 bottom-[10%] w-[calc(100%-0.01px)] ${
									snapshot.isUsingPlaceholder ? 'bg-red-700 bg-opacity-75' : ''
								}`}
								ref={droppableProvided.innerRef}
								{...droppableProvided.droppableProps}
							>
								{droppableProvided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			)}
		</>
	);
};

export default ChatList;
