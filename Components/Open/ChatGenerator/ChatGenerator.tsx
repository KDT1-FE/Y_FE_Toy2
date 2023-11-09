'use client';

import {
	Button,
	Card,
	Checkbox,
	Chip,
	Input,
	Typography,
} from '@material-tailwind/react';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ChatGeneratorMenu from './ChatGeneratorMenu/ChatGeneratorMenu';
import chatModalAtom from '@/atoms/chatModalAtom';
import { useRecoilState } from 'recoil';

type Inputs = {
	name: string;
};
const checkIsOpen = (chatModal: boolean) => {
	if (chatModal) {
		return 'visible';
	} else {
		return 'invisible';
	}
};

const ChatGenerator = () => {
	const [chatModal, setChatModal] = useRecoilState(chatModalAtom);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	const handleModalClose = () => {
		setChatModal(false);
	};

	return (
		<div
			className={`${checkIsOpen(
				chatModal,
			)} absolute w-full  inset-0 flex flex-col items-center justify-center bg-white border-4 box-border`}
		>
			<Chip
				value="X"
				className="absolute bg-primary top-0 left-0"
				onClick={handleModalClose}
			/>
			<Card color="transparent" shadow={false}>
				<Typography color="gray" className="mt-1 font-normal">
					채팅방 주제 잘 정하고 만드세요!
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-full">
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
						<ChatGeneratorMenu />
					</div>
					<Checkbox
						crossOrigin={'anonymous'}
						label={
							<Typography
								variant="small"
								color="gray"
								className="flex items-center font-normal"
							>
								I agree the
								<a
									href="#"
									className="font-medium transition-colors hover:text-gray-900"
								>
									&nbsp;Terms and Conditions
								</a>
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
	);
};

export default ChatGenerator;
