'use client';

import React, { useState } from 'react';
import { ChatListProps } from './ChatList.type';
import { Chat } from '@/app/open/open.type';
import { filterChat } from '@/app/open/open.utils';
import ChatItem from './ChatItem';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from '@/Components/Login/Cookie';
import { fetchAllChat } from '@/app/open/open.utils';
import { animated, useSpring, useSpringRef } from '@react-spring/web';
import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from '@hello-pangea/dnd';
import ChatItemDrag from './ChatItemDrag';

type Columns = 'list-column' | 'delete-column';

const ChatList = ({ myChatList }: ChatListProps) => {
	const accessToken = getCookie('accessToken');
	const { data: chatList } = useQuery({
		queryKey: ['myChatList'],
		queryFn: () => fetchAllChat(accessToken),
		initialData: myChatList,
		staleTime: 1000 * 60,
		refetchInterval: 1000 * 60,
	});

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
	const [listData, setListData] = useState({
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
	const api = useSpringRef();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const styles = useSpring({
		ref: api,
		from: { visible: '70' },
		// to: {
		// 	opacity: openDeleteColumn ? '1' : '0',
		// },
		config: { duration: 1000 },
	});

	console.log('컴포넌트 실행');
	const onDragStart = () => {
		api.start({
			visible: '0',
		});
		setOpenDeleteColumn(true);
	};

	const dragEndDeleteColumn = () => {
		api.start({
			visible: '70',
		});
		setOpenDeleteColumn(false);
	};

	const onDragEnd = (result: DropResult) => {
		const { destination, source } = result;
		console.log(destination);
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

		if (destination.droppableId === 'delete-column') {
			console.log('delete');
		}

		const sourceColumn = listData.columns[source.droppableId as Columns];
		const destinationColumn =
			listData.columns[destination.droppableId as Columns];

		const isSameColumn = sourceColumn.id === destinationColumn.id;
		if (isSameColumn) {
			const newTaskIds = Array.from(sourceColumn.taskIds);
			const [removed] = newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, removed);

			const newColumn = {
				...sourceColumn,
				taskIds: newTaskIds,
			};

			const newState = {
				...listData,
				columns: {
					...listData.columns,
					[newColumn.id]: newColumn,
				},
			};
			setListData(newState);
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
				<DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
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
							<animated.div
								className={`h-48 flex flex-col ${
									snapshot.isDraggingOver ? 'text-red-700' : ''
								} items-center justify-center absolute inset-x-0 bottom-40 bg-brown-800 w-96 p-0 ${
									snapshot.isUsingPlaceholder ? 'bg-pink-400' : ''
								}`}
								ref={droppableProvided.innerRef}
								{...droppableProvided.droppableProps}
							>
								삭제
								{droppableProvided.placeholder}
							</animated.div>
						)}
					</Droppable>
				</DragDropContext>
			)}
		</>
	);
};

export default ChatList;
