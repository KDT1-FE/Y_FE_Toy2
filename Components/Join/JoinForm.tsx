'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@material-tailwind/react';
import { fetchJoin } from '@/app/join/join.utils';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { Input } from '@material-tailwind/react';

type RequestBody = {
	id: string; // 사용자 아이디 (필수!, 영어와 숫자만)
	password: string; // 사용자 비밀번호, 5자 이상 (필수!)
	name: string; // 사용자 이름, 20자 이하 (필수!)
	picture: string; // 사용자 이미지(url or base64, under 1MB)
};

const JoinForm = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RequestBody>({ mode: 'onChange' });

	// 로그인 시 api 요청
	const onSubmit: SubmitHandler<RequestBody> = async ({
		id,
		password,
		name,
		picture,
	}) => {
		// 모든 input 값에 에러없이 값이 있으면
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

	const image = watch('picture');
	console.log(image);

	return (
		// 전체
		<div className="w-full h-full flex flex-col items-center justify-center">
			{/* 이미지 & 입력폼 & 회원가입 버튼 */}
			<div className="flex flex-col items-center justify-center  bg-red-400">
				{/* 이미지 */}
				<div className="mb-3 h-50 bg-red-200">
					{image ? (
						<img src={image} className="h-20 w-20 rounded-full bg-blue-500 " />
					) : (
						<div className="h-20 w-20 rounded-full bg-blue-500" />
					)}
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-full flex flex-col items-center "
				>
					<div className=" flex flex-col gap-1 bg-red-100">
						{/* 이름 */}
						<div className="flex h-[90] flex-col  mt-5">
							<Input
								placeholder="20자 이하의 이름을 입력해주세요."
								variant="static"
								label="name"
								{...register('name', {
									required: true,
									maxLength: 20,
								})}
								crossOrigin={'anonymous'}
							/>

							{errors?.name?.type === 'maxLength' && (
								<p className="text-red-500 text-[10px] mt-2">
									20자 이상은 입력할 수 없습니다.
								</p>
							)}
							{errors?.name?.type === 'required' && (
								<p className="text-red-500 text-[10px] mt-2">
									{' '}
									name를 입력해주세요.
								</p>
							)}
						</div>

						{/* id */}
						<div className="flex w-72 h-[90] flex-col  mt-5">
							<Input
								variant="static"
								label="id"
								placeholder=" "
								{...register('id', {
									required: true,
									pattern: /^[a-zA-Z0-9]*$/,
								})}
								crossOrigin={'anonymous'}
							/>
							{errors?.id?.type === 'pattern' && (
								<p className="text-red-500 text-[10px] mt-2">
									{' '}
									영어와 숫자만 작성 가능합니다.
								</p>
							)}
							{errors?.id?.type === 'required' && (
								<p className="text-red-500 text-[10px] mt-2">
									id를 입력해주세요.
								</p>
							)}
						</div>
						{/* 비밀번호 */}
						<div className="flex w-72  h-[90] flex-col  mt-5">
							<Input
								variant="static"
								label="password"
								type="password"
								{...register('password', {
									required: true,
									minLength: 5,
								})}
								crossOrigin={'anonymous'}
							/>

							{errors?.password?.type === 'minLength' && (
								<p className="text-red-500 text-[10px] mt-2">
									입력은 최소 5자 이상이어야 합니다.
								</p>
							)}
							{errors?.password?.type === 'required' && (
								<p className="text-red-500 text-[10px] mt-2">
									password를 입력해주세요.
								</p>
							)}
						</div>
						{/* 이미지 url */}
						<div className="flex w-72 h-[90] flex-col  mt-5">
							<Input
								variant="static"
								label="image URL"
								placeholder=" image URL을 입력해주세요 "
								{...register('picture', {
									required: true,
								})}
								crossOrigin={'anonymous'}
							/>
						</div>
					</div>
					<Button type="submit" className="w-full bg-main mt-10">
						회원가입
					</Button>
				</form>
			</div>
		</div>
	);
};

export default JoinForm;
