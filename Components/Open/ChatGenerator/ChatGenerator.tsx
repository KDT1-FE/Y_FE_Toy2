'use client';

import {
	Button,
	Card,
	Checkbox,
	Input,
	Typography,
} from '@material-tailwind/react';
import React, { useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ChatGeneratorMenu from './ChatGeneratorMenu/ChatGeneratorMenu';
import { chatModalAtom } from '@/atoms/chatModalAtom';
import { useRecoilState } from 'recoil';
import { Inputs } from './ChatGenerator.type';
import { useFetchPostNewChat } from '@/hooks/Open/useFetchPostNewChat';
import { useCurrentSearchParams } from '@/hooks/Open/useCurrentSearchParmas';
import { getCookie } from '@/Components/Login/Cookie';
import useAsyncLoading from '@/hooks/Open/useAsyncLoading';

const ChatGenerator = () => {
	const loadingControl = useAsyncLoading();
	const accessToken = getCookie('accessToken');
	const mutation = useFetchPostNewChat(accessToken);
	const params = useCurrentSearchParams('type');

	const modalRef = useRef(null);
	const [chatModal, setChatModal] = useRecoilState(chatModalAtom);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const checkIsPrivateChat = () => {
		if (params === 'private') {
			return true;
		}
		return false;
	};

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		loadingControl(true);
		mutation.mutate({
			name: data.name,
			users: data.users,
			isPrivate: checkIsPrivateChat(),
		});
	};

	const handleModalClose = () => {
		setChatModal(false);
	};

	return (
		<>
			{chatModal && (
				<div
					ref={modalRef}
					className={`absolute z-[60] w-full  inset-0 flex flex-col items-center justify-center bg-white border-4 box-border`}
				>
					<button
						type="button"
						className="absolute w-8 h-8 rounded-xl bg-primary top-3 left-3 block"
						onClick={handleModalClose}
					>
						X
					</button>
					<Card color="transparent" shadow={false}>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="mt-8 mb-2 w-full"
						>
							<div className="mb-1 flex flex-col gap-6">
								<Typography variant="h6" color="blue-gray" className="-mb-3">
									채팅방 이름
								</Typography>
								<Input
									crossOrigin={'anonymous'}
									size="lg"
									placeholder="채팅방 이름을 입력해 주세요."
									className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
									labelProps={{
										className: 'before:content-none after:content-none',
									}}
									{...register('name', { required: true })}
								/>
							</div>
							<p>{errors.name && <span>This field is required</span>}</p>
							<div className="w-full">
								<ChatGeneratorMenu register={register} />
							</div>
							<Checkbox
								crossOrigin={'anonymous'}
								label={
									<Typography
										variant="small"
										color="gray"
										className="flex items-center font-normal"
									>
										채팅방에서 폭언과 욕설을 하지 아니합니다.
									</Typography>
								}
								containerProps={{ className: '-ml-2.5' }}
							/>
							<Button type="submit" className="mt-6 bg-primary" fullWidth>
								채팅방 만들기
							</Button>
						</form>
					</Card>
				</div>
			)}
		</>
	);
};

export default ChatGenerator;
