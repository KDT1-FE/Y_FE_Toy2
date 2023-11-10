'use client';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

// axios
import { instance } from '@/lib/api';

interface RequestBody {
    id: string; // 사용자 아이디 (필수!, 영어만)
    password: string; // 사용자 비밀번호, 5자 이상 (필수!)
}

const LoginForm = () => {
    const [formData, setFormData] = useState<RequestBody>({
        id: '',
        password: '',
    });
    const [checkLogin, setCheckLogin] = useState<boolean>(false);

    const router = useRouter();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await instance.post('login', formData);
            // 로그인 검증(userId => sessionStorage)
            const isLoggedIn = Object.keys(res).includes('accessToken');
            setCheckLogin(isLoggedIn);
            if (isLoggedIn) {
                sessionStorage.setItem('userId', formData.id);
                router.push('/');
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <StyledContainer>
            <h1>로그인</h1>
            <StyledForm onSubmit={onSubmit}>
                <div>
                    <label htmlFor="id">아이디</label>
                    <input type="text" name="id" onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" name="password" onChange={onChange} />
                </div>
                <button>로그인</button>
                <a href="/createAccount">아이디가 없으신가요? 회원가입하기</a>
            </StyledForm>
        </StyledContainer>
    );
};

export default LoginForm;

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
