'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchLogin } from './login.utils';

type IFormInput = {
	id: string; // 사용자 아이디 (필수!, 영어와 숫자만)
	password: string; // 사용자 비밀번호, 5자 이상 (필수!)
};

const Form = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>();
	// 로그인 시 api 요청
	const onSubmit: SubmitHandler<IFormInput> = ({ id, password }) => {
		console.log('id: ', id, 'password:', password);
		const res = fetchLogin(id, password);
		console.log(res);
	};

	return (
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
			<input type="submit" />
		</form>
	);
};

export default Form;
