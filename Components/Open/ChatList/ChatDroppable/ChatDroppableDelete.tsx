'use client';

import { Droppable } from '@hello-pangea/dnd';
import React from 'react';

type ChatDroppableDelete = {
	openDeleteColumn: boolean;
};

const ChatDroppableDelete = ({ openDeleteColumn }: ChatDroppableDelete) => {
	return (
		<Droppable droppableId="delete-column">
			{(droppableProvided, snapshot) => (
				<div
					className={`${
						openDeleteColumn ? 'visible opacity-100' : 'invisible opacity-0'
					} transition-opacity absolute duration-1000 ease-linear h-24 bg-trash-can bg-contain bg-no-repeat bg-center inset-x-0 bottom-[10%] w-[calc(100%-0.01px)] ${
						snapshot.isUsingPlaceholder
							? 'bg-red-700 bg-opacity-75'
							: 'bg-yellow-700 bg-opacity-75'
					}`}
					ref={droppableProvided.innerRef}
					{...droppableProvided.droppableProps}
				>
					{droppableProvided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default ChatDroppableDelete;
