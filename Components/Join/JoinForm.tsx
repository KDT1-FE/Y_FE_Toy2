'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@material-tailwind/react';
import { fetchJoin } from '@/app/join/join.utils';

type RequestBody = {
	id: string; // 사용자 아이디 (필수!, 영어와 숫자만)
	password: string; // 사용자 비밀번호, 5자 이상 (필수!)
	name: string; // 사용자 이름, 20자 이하 (필수!)
	picture: string; // 사용자 이미지(url or base64, under 1MB)
	// image: string;
};

const JoinForm = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RequestBody>();
	// 로그인 시 api 요청
	const onSubmit: SubmitHandler<RequestBody> = ({
		id,
		password,
		name,
		picture,
	}) => {
		fetchJoin(id, password, name, picture);
	};
	// const [imagePreview, setImagePreview] = useState('');

	const image = watch('picture');
	console.log(image);
	// useEffect(() => {
	// 	if (image && image.length > 0) {
	// 		const file = image[0];
	// 		console.log(image);
	// 		console.log(file);
	// 		console.log(URL.createObjectURL(file));
	// 		setImagePreview(URL.createObjectURL(file));
	// 	}
	// }, [image]);

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
					{/* <label
						htmlFor="picture"
						className="h-4 w-4 rounded-full bg-pink-500 text-white flex  items-center justify-center"
					>
						+
					</label> */}
					{/* <input
						{...register('picture', {
							// required: true,
						})}
						id="picture"
						type="file"
						accept="image/*"
						className="hidden"
					/> */}
					{/* 이미지 url */}
					<div className="relative m-3 group">
						<input
							placeholder=" "
							{...register('picture', {
								required: true,
							})}
							className="border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer"
						/>
						<label className="absolute left-0 top-1 text-gray-600 cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-purple-600 transition-all">
							Image URL
						</label>
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
