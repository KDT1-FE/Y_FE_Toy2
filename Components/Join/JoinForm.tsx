'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Typography } from '@material-tailwind/react';
import { fetchJoin } from '@/app/join/join.utils';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { Input } from '@material-tailwind/react';
import DropZone from './DropZone/DropZone';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import useAsyncLoading from '@/hooks/Open/useAsyncLoading';
import { FetchImageProps, RequestBody } from './Join.types';
// import Image from 'next/image';

const fetchImage = async (params: FetchImageProps) => {
	const data = await axios.post('api/image/post', {
		id: params.id,
		name: params.name,
		password: params.password,
		file: params.file,
	});
	return data.data;
};

const JoinForm = () => {
	const loadingControl = useAsyncLoading();
	const router = useRouter();
	const [baseImageUrl, setBaseImageUrl] = useState<string>();

	const mutation = useMutation({
		mutationFn: (data: FetchImageProps) => fetchImage(data),
		onSuccess: async (data) => {
			const props = data.data;
			const { message } = await fetchJoin(
				props.id,
				props.password,
				props.name,
				props.picture,
			);
			console.log(props);
			if (message === 'User created') {
				Swal.fire({
					text: '회원가입이 완료되었습니다.',
					showCancelButton: false,
					confirmButtonText: '확인',
					confirmButtonColor: '#3085d6',
				});
				router.replace('/login');
			} else {
				console.log('이미 존재한 회원 입니다');
				Swal.fire({
					text: '이미 존재한 회원입니다.',
					showCancelButton: false,
					confirmButtonText: '확인',
					confirmButtonColor: 'red',
				});
			}
			loadingControl(false);
		},
		onMutate: () => {
			console.log('onMutate');
		},
		onError: (error) => {
			console.log(error);
		},
	});

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
		loadingControl(true);

		mutation.mutate({
			file: baseImageUrl!,
			id: id,
			password: password,
			name: name,
		});
	};

	return (
		// 전체
		<div className="w-full h-full flex flex-col items-center justify-center">
			{/* 이미지 & 입력폼 & 회원가입 버튼 */}
			<div className="flex flex-col w-full h-full items-center justify-center ">
				{/* 이미지 */}
				<div className="mb-10">
					<DropZone setFn={setBaseImageUrl} baseImageUrl={baseImageUrl} />
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
					</div>
					<Button type="submit" className="w-full bg-main mt-10 text-subtext">
						회원가입
					</Button>
				</form>
			</div>
		</div>
	);
};

export default JoinForm;
