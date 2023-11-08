'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

// axios
import { instance } from '@/lib/api';

interface RequestBody {
    id: string; // 사용자 아이디 (필수!, 영어만)
    password: string; // 사용자 비밀번호, 5자 이상 (필수!)
    name: string; // 사용자 이름, 20자 이하 (필수!)
    picture?: string; // 사용자 이미지(url)
}

const RegisterForm = () => {
    const [formData, setFormData] = useState<RequestBody>({
        id: '',
        password: '',
        name: '',
        picture: 'https://avatars.githubusercontent.com/u/66263916?v=4',
    });

    const router = useRouter();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await instance.post('/signup', formData);
            router.push('/login');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <StyledContainer>
            <h1>회원가입</h1>
            <StyledForm onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name">이름</label>
                    <input type="text" name="name" onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="id">아이디</label>
                    <input type="text" name="id" onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" name="password" onChange={onChange} />
                </div>
                <button>회원가입</button>
                <a href="/login">이미 아이디가 있으신가요? 로그인하기</a>
            </StyledForm>
        </StyledContainer>
    );
};

export default RegisterForm;

const StyledContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
const StyledForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        padding: 0 12rem;

        label {
            text-align: left;
            margin-bottom: 0.3rem;
        }

        input {
            border: 0.1px solid rgba(0, 0, 0, 0.4);
            padding: 0.7rem;
            width: 100%;
        }
    }
`;
