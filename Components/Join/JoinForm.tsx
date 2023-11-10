'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@material-tailwind/react';
import { fetchJoin } from '@/app/join/join.utils';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

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
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-[300px] h-[500px] bg-white flex flex-col items-center "
			>
				<div className="flex flex-col items-center justify-center h-screen">
					{/* 이미지 */}
					{image ? (
						<img src={image} className="h-14 w-14 rounded-full bg-blue-500" />
					) : (
						<div className="h-20 w-20 rounded-full bg-blue-500" />
					)}
					{/* 이름 */}
					<div className="relative m-3">
						<input
							{...register('name', {
								required: true,
								maxLength: 20,
							})}
							className="border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer"
						/>
						<label className="absolute left-0 top-1 text-gray-600 cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-purple-600 transition-all">
							name
						</label>
						{errors?.name?.type === 'maxLength' && (
							<p> 20자 이상은 입력할 수 없습니다.</p>
						)}
						{errors?.name?.type === 'required' && <p> name를 입력해주세요.</p>}
					</div>

					{/* id */}
					<div className="relative m-3 group">
						<input
							placeholder=" "
							{...register('id', {
								required: true,
								pattern: /^[a-zA-Z0-9]*$/,
							})}
							className="border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer"
						/>
						<label className="absolute left-0 top-1 text-gray-600 cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-purple-600 transition-all">
							id
						</label>
						{errors?.id?.type === 'pattern' && (
							<p> 영어와 숫자만 작성 가능합니다.</p>
						)}
						{errors?.id?.type === 'required' && <p> id를 입력해주세요.</p>}
					</div>
					{/* 비밀번호 */}
					<div className="relative m-3">
						<input
							type="password"
							{...register('password', {
								required: true,
								minLength: 5,
							})}
							className="border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer"
						/>
						<label className="absolute left-0 top-1 text-gray-600 cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-purple-600 transition-all">
							password
						</label>
						{errors?.password?.type === 'minLength' && (
							<p>입력은 최소 5자 이상이어야 합니다.</p>
						)}
						{errors?.password?.type === 'required' && (
							<p> password를 입력해주세요.</p>
						)}
					</div>
					{/* 이미지 url */}
					<div className="relative m-3 group">
						<input
							placeholder=" image URL을 입력해주세요 "
							{...register('picture', {
								required: true,
							})}
							className="border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer"
						/>
						<label>Image URL</label>
					</div>
				</div>
				<Button type="submit" className="w-full bg-main">
					회원가입
				</Button>
			</form>
		</>
	);
};

export default JoinForm;
