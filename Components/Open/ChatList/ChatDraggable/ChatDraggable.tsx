'use client';

import { Draggable } from '@hello-pangea/dnd';
import React from 'react';
import ChatItemDrag from '../ChatItem/ChatItemDrag';
import ChatItem from '../ChatItem/ChatItem';
import { Chat } from '@/app/chatting/chatting.type';

type ChatDraggableProps = {
	chat: Chat;
	index: number;
};

const ChatDraggable = ({ chat, index }: ChatDraggableProps) => {
	return (
		<Draggable
			key={chat.indexId}
			draggableId={chat.indexId!.toString()}
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
};

export default ChatDraggable;
