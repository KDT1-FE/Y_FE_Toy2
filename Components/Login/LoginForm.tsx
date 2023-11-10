'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchLogin } from '../../app/login/login.utils';
import { setCookie } from '@/Components/Login/Cookie';
import { Button } from '@material-tailwind/react';
import Link from 'next/link';

type IFormInput = {
	id: string; // 사용자 아이디 (필수!, 영어와 숫자만)
	password: string; // 사용자 비밀번호, 5자 이상 (필수!)
};

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>();

	// 로그인 버튼 클릭 시
	const onSubmit: SubmitHandler<IFormInput> = async ({ id, password }) => {
		console.log('id: ', id, 'password:', password);
		const { accessToken, refreshToken } = await fetchLogin(id, password);
		console.log('accessToken:', accessToken);
		console.log('refreshToken:', refreshToken);
		// 현재 시간
		const time = new Date();
		// 1일 뒤
		time.setMinutes(time.getMinutes() + 60 * 24);

		setCookie('accessToken', accessToken, { path: '/', expires: time });
		setCookie('refreshToken', refreshToken, { path: '/' });
	};

	return (
		<div className="flex-col">
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>id</label>
				{/* 영어와 숫자만 */}
				<input
					{...register('id', {
						required: true,
					})}
				/>
				{errors?.id ? <p className="error">{errors.id?.message}</p> : null}

				<label>password</label>
				{/* 5자 이상 */}
				<input {...register('password')} />
				<Button type="submit" className=" bg-pink-200">
					로그인
				</Button>
			</form>
			<Link href="/join">
				<div>회원가입</div>
			</Link>
		</div>
	);
};

export default LoginForm;
