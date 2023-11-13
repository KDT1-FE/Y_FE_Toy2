'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Typography } from '@material-tailwind/react';
import { fetchJoin } from '@/app/join/join.utils';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { Input } from '@material-tailwind/react';
import Image from 'next/image';
import DropZone from './DropZone/DropZone';
import axios from 'axios';
// import Image from 'next/image';

type RequestBody = {
	id: string; // 사용자 아이디 (필수!, 영어와 숫자만)
	password: string; // 사용자 비밀번호, 5자 이상 (필수!)
	name: string; // 사용자 이름, 20자 이하 (필수!)
	picture: string; // 사용자 이미지(url or base64, under 1MB)
};

const JoinForm = () => {
	const router = useRouter();
	const [baseImageUrl, setBaseImageUrl] = React.useState<string>();

	const fetchImage = async (file: string) => {
		const data = await axios.post('api/image/post', {
			file: file,
		});
		return data.data;
	};

	const {
		register,
		handleSubmit,
		// watch,
		formState: { errors },
	} = useForm<RequestBody>({ mode: 'onChange' });

	// 로그인 시 api 요청
	const onSubmit: SubmitHandler<RequestBody> = async ({
		id,
		password,
		name,
	}) => {
		if (!baseImageUrl) {
			Swal.fire({
				text: '이미지를 넣어주세요.',
				showCancelButton: false,
				confirmButtonText: '확인',
				confirmButtonColor: '#3085d6',
			});
			return;
		}

		const picture = await fetchImage(baseImageUrl!);
		const data = await fetchJoin(id, password, name, picture);
		const { message } = data;
		if (message === 'User created') {
			router.replace('/login');
		} else {
			console.log('이미 존재한 회원 입니다');
			Swal.fire({
				text: '이미 존재한 회원입니다.',
				showCancelButton: false,
				confirmButtonText: '확인',
				confirmButtonColor: '#3085d6',
			});
		}
	};

	// const image = watch('picture');

	return (
		// 전체
		<div className="w-full h-full flex flex-col items-center justify-center">
			{/* 이미지 & 입력폼 & 회원가입 버튼 */}
			<div className="flex flex-col w-full h-full items-center justify-center ">
				{/* 이미지 */}
				<div className="mb-10">
					{baseImageUrl ? (
						<Image
							src={baseImageUrl}
							alt="Picture of the author"
							width={100}
							height={100}
							className="h-[200px] w-[200px] rounded-full bg-blue-500 "
						/>
					) : (
						<div className="h-[200px] w-[200px] rounded-full bg-blue-500" />
					)}
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col w-3/5 items-center "
				>
					<div className=" flex flex-col gap-1 w-full ">
						{/* 이름 */}
						<div className="flex h-[90] w-full flex-col mt-5">
							<Input
								color="brown"
								placeholder="20자 이하의 이름을 입력해주세요."
								variant="static"
								label="name"
								{...register('name', {
									required: true,
									maxLength: 20,
								})}
								crossOrigin={'anonymous'}
							/>

							<div className="text-red-500 text-[10px] mt-2  h-[10px]">
								{errors?.name?.type === 'required' && (
									<div>name를 입력해주세요.</div>
								)}
								{errors?.name?.type === 'maxLength' && (
									<div>20자 이상은 입력할 수 없습니다.</div>
								)}
							</div>
						</div>

						{/* id */}
						<div className="flex  w-full  h-[90] flex-col  mt-5">
							<Input
								color="brown"
								variant="static"
								label="id"
								placeholder=" "
								{...register('id', {
									required: true,
									pattern: /^[a-zA-Z0-9]*$/,
								})}
								crossOrigin={'anonymous'}
							/>

							<div className="text-red-500 text-[10px] mt-2  h-[10px]">
								{errors?.id?.type === 'pattern' && (
									<div>영어와 숫자만 작성 가능합니다.</div>
								)}
								{errors?.id?.type === 'required' && (
									<div>id를 입력해주세요.</div>
								)}
							</div>
						</div>
						{/* 비밀번호 */}
						<div className="flex w-full  h-[90] flex-col  mt-5">
							<Input
								color="brown"
								variant="static"
								label="password"
								type="password"
								{...register('password', {
									required: true,
									minLength: 5,
								})}
								crossOrigin={'anonymous'}
							/>
							<div className="text-red-500 text-[10px] mt-2  h-[10px]">
								{errors?.password?.type === 'minLength' && (
									<div>입력은 최소 5자 이상이어야 합니다.</div>
								)}
								{errors?.password?.type === 'required' && (
									<div> password를 입력해주세요.</div>
								)}
							</div>
						</div>
						{/* 이미지 url */}
						<div className="flex h-[90] w-full  flex-col  mt-5">
							<Typography color="brown" className=" text-sm text-gray-700">
								이미지를 넣어주세요.
							</Typography>
						</div>
					</div>
					<DropZone setFn={setBaseImageUrl} />
					<Button type="submit" className="w-full bg-main mt-10">
						회원가입
					</Button>
					<div>{baseImageUrl}</div>
				</form>
			</div>
		</div>
	);
};

export default JoinForm;
