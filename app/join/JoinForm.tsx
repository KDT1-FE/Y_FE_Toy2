'use client';

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@material-tailwind/react';

type RequestBody = {
	id: string; // 사용자 아이디 (필수!, 영어와 숫자만)
	password: string; // 사용자 비밀번호, 5자 이상 (필수!)
	name: string; // 사용자 이름, 20자 이하 (필수!)
	picture: string; // 사용자 이미지(url or base64, under 1MB)
	image: string;
};

const JoinForm = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RequestBody>();
	// 로그인 시 api 요청
	const onSubmit: SubmitHandler<RequestBody> = (data) => console.log(data);

	const [imagePreview, setImagePreview] = useState('');

	const fileReader = new FileReader();
	fileReader.readAsDataURL;
	const picture = watch('picture');
	useEffect(() => {
		if (picture && picture.length > 0) {
			const file = picture[0];
			console.log(picture);
			setImagePreview(URL.createObjectURL(file));
		}
	}, [picture]);

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-[300px] h-[500px] bg-white flex flex-col items-center "
			>
				<div className="flex flex-col items-center justify-center h-screen">
					{/* 이미지 */}
					{imagePreview ? (
						<img
							src={imagePreview}
							className="h-14 w-14 rounded-full bg-blue-500"
						/>
					) : (
						<div className="h-20 w-20 rounded-full bg-blue-500" />
					)}
					<label
						htmlFor="picture"
						className="h-4 w-4 rounded-full bg-pink-500 text-white flex  items-center justify-center"
					>
						+
					</label>
					<input
						{...register('picture', {
							// required: true,
						})}
						id="picture"
						type="file"
						accept="image/*"
						className="hidden"
					/>
					{/* id */}
					<div className="relative m-3 group">
						<input
							placeholder=" dd"
							{...register('id', {
								required: true,
								pattern: /^[a-zA-Z0-9]*$/,
							})}
							className="border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer"
						/>
						<label className="absolute left-0 top-1 text-gray-600 cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-purple-600 transition-all">
							id
						</label>
					</div>
					{/* 비밀번호 */}
					<div className="relative m-3">
						<input
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
					</div>
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
							<p>입력은 최대 20자 이상이어야 합니다.</p>
						)}

						{errors?.id ? <p className="error">{errors.id?.message}</p> : null}
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
