'use client';

import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineCamera } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

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
        picture: '',
    });
    const [image, setImage] = useState<string>('');
    const router = useRouter();
    const imageRef = useRef<HTMLInputElement | null>(null);

    const onChangeProfile = () => {
        if (imageRef.current) {
            const profile = imageRef.current.files?.[0];
            if (profile) {
                const reader = new FileReader();
                reader.readAsDataURL(profile);
                reader.onloadend = () => {
                    const imageData = reader.result as string;
                    setFormData({ ...formData, picture: imageData });
                    setImage(imageData);
                };
            }
        }
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await instance.post('/signup', formData);
            console.log(formData);
            router.push('/login');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <StyledContainer>
            <h1>회원가입</h1>
            <StyledDiv>
                <span>프로필 설정</span>
                <span>미기입시 기본 이미지로 등록됩니다.</span>
            </StyledDiv>
            <StyledForm onSubmit={onSubmit}>
                <StyledProfile>
                    <img src={image ? image : `/defaultProfile.jpg`} alt="profile-image" />

                    <StyledLabel htmlFor="file">
                        <StyledAiOutlineCamera />
                    </StyledLabel>

                    <input
                        type="file"
                        name="file"
                        id="file"
                        accept="image/*"
                        onChange={onChangeProfile}
                        ref={imageRef}
                    />
                </StyledProfile>
                <div>
                    <label htmlFor="name">이름</label>
                    <input type="text" name="name" placeholder="이름은 20자 이하만 가능합니다." onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="id">
                        <span>아이디</span>
                        <button className="checkButton">중복 확인</button>
                    </label>

                    <input type="text" name="id" placeholder="아이디는 영어만 가능합니다." onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호는 5자 이상만 가능합니다."
                        onChange={onChange}
                    />
                </div>
                <div>
                    <button type="submit" className="submitButton">
                        회원가입
                    </button>
                </div>
                <StyledLink href="/login" className="anchor">
                    이미 아이디가 있으신가요? 로그인하기
                </StyledLink>
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
    padding-top: 3rem;
    height: auto;
`;
const StyledProfile = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        width: 210px;
        height: 210px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        padding: 5px;
    }
`;
const StyledAiOutlineCamera = styled(AiOutlineCamera)`
    font-size: 1.8rem;
    font-weight: 300;
    width: 35px;
    height: 35px;
    padding: 2.5px;
    z-index: 999;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
`;
const StyledLabel = styled.label`
    text-align: center !important;
    position: absolute;
    bottom: 10%;
    right: 38.3%;
`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    font-weight: 600;

    span:first-child {
        margin-bottom: 0.5rem;
    }
    span:last-child {
        opacity: 0.35;
    }
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
            font-weight: 600;
            span {
                margin-right: 0.5rem;
            }
            display: flex;
            align-items: center;
        }

        input {
            border: 0.1px solid rgba(0, 0, 0, 0.4);
            padding: 0.9rem;
            width: 100%;
        }

        input[type='file'] {
            display: none;
        }

        div {
            border: 1px solid red;
            display: flex;
            flex-direction: row;
            gap: 20px;
            label {
                display: inline-block;
                width: 100px;
                border: 1px solid green;
                padding: 10px;
            }
        }

        button.checkButton {
            border: none;
            border-radius: 4.5px;
            background-color: #00956e;
            color: #eee;
            font-weight: 600;
            font-size: 0.65rem;
            padding: 0.2rem 0.3rem;
            cursor: pointer;
            &:hover {
                transition: all 0.3s;
                background-color: #05664c;
            }
        }

        button.submitButton {
            margin-top: 1rem;
            border: none;
            border-radius: 4.5px;
            background-color: #00956e;
            color: #eee;
            font-weight: 600;
            font-size: 1.05rem;
            padding: 1rem 0;
            width: 100%;
            cursor: pointer;
            &:hover {
                transition: all 0.3s;
                background-color: #05664c;
            }
        }
    }
    div:nth-child(2) {
        margin-top: 1.25rem;
    }
`;

const StyledLink = styled(Link)`
    color: #000;
    margin-top: 0.5rem;
`;