'use client';

import React, { ChangeEvent, FormEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';
import { UserProfile } from '@/store/atoms';
import { useRecoilValue } from 'recoil';
import { AiOutlineCamera } from 'react-icons/ai';
import { instance } from '@/lib/api';

interface RequestBody {
    name: string;
    picture?: string;
}

interface PropsType {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileModal = ({ setOpenModal }: PropsType) => {
    const userInfo = useRecoilValue(UserProfile);

    const [formData, setFormData] = useState<RequestBody>({
        name: userInfo.name,
        picture: userInfo.picture,
    });
    const [image, setImage] = useState<string>(userInfo.picture);

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

    const onChangeField = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const onCancel = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenModal(false);
        router.push('/mypage');
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await instance.patch('user', formData);
            setOpenModal(false);
            // 임시
            router.push('/mypage');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Container>
            <StyledContainer>
                <h1>프로필 수정</h1>
                <StyledDiv>
                    <span>미설정시 이전과 같은 이미지로 등록됩니다.</span>
                </StyledDiv>
                <StyledForm onSubmit={onSubmit}>
                    <StyledProfile>
                        <img src={image ? image : userInfo.picture} alt="profile-image" />
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
                        <input type="text" name="name" placeholder={userInfo.name} onChange={onChangeField} />
                    </div>

                    <div>
                        <button type="submit" className="submitFullButton">
                            수정하기
                        </button>
                    </div>

                    <div>
                        <button type="submit" onClick={onCancel} className="cancelButton">
                            취소
                        </button>
                    </div>
                </StyledForm>
            </StyledContainer>
        </Container>
    );
};

export default ProfileModal;

const Container = styled.div`
    width: 100%;
    height: 83vh;
    position: absolute;
    top: -300px;
    left: 0;
    background-color: #fff;
    backdrop-filter: blur(5px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    overflow-y: auto;
    z-index: 999;
`;

const StyledContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 3rem;
`;

const StyledProfile = styled.div`
    width: 100px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        width: 190px;
        height: 190px;
        border: 1px dotted #00956e;
        border-radius: 50%;
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
    position: absolute;
    top: 130px;
    right: 250px;
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
        font-size: 1.1rem;
    }
    span:last-child {
        opacity: 0.35;
        font-size: 0.85rem;
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

        margin-bottom: 1rem;
        padding: 0 8rem;

        label {
            text-align: left;
            margin-bottom: 0.3rem;
            padding-left: 0.125rem;
            font-weight: 600;
            span {
                margin-right: 2rem;
            }
            display: flex;
            align-items: center;
        }
        .labelId {
            position: relative;
            margin-bottom: 0.55rem;
        }

        input {
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 4.5px;
            padding: 0.9rem;
            width: 100%;
            outline: none;
            &:focus {
                border: 1px solid #00956e;
            }
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

        button.submitFullButton {
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
        button.cancelButton {
            all: unset;
            opacity: 0.6;
            border-bottom: 1px solid rgba(0, 0, 0, 0.3);
            cursor: pointer;
            &:hover {
                transition: all 0.3s;
                opacity: 1;
            }
        }
    }
    div:nth-child(2) {
        margin-top: 1.25rem;
    }
    div: last-child {
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }
`;
