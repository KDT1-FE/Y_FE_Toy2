'use client';

import React from 'react';

import ProfileModal from './ProfileModal';

import { useRecoilState } from 'recoil';
import { UserProfileModal } from '@/store/atoms';

import styled from 'styled-components';

const ProfileEdit = () => {
    const [openModal, setOpenModal] = useRecoilState(UserProfileModal);

    return (
        <Container>
            {openModal && <ProfileModal />}
            <div>
                <h3>프로필</h3>
                <div className="profileDiv">
                    <button
                        onClick={() => {
                            setOpenModal((prev) => !prev);
                        }}
                    >
                        내 정보 수정하기
                    </button>
                </div>
            </div>
            <div>
                <h3>공지사항</h3>
                <div className="alertDiv">
                    <button>신규 업데이트</button>
                    <button>진행중인 이벤트</button>
                    <button>자주 묻는 질문</button>
                    <button>문의하기</button>
                </div>
            </div>
        </Container>
    );
};

export default ProfileEdit;

const Container = styled.div`
    position: relative;

    div {
        padding-left: 0.5rem;

        margin-bottom: 2rem;

        h3 {
            padding-bottom: 20px;

            border-bottom: 1px solid rgba(0, 0, 0, 0.15);

            font-size: ${({ theme }) => theme.fontSize.title};
            color: ${({ theme }) => theme.color.mainGreen};
        }

        div.profileDiv {
            padding-left: 0;

            display: flex;
            flex-direction: column;

            button {
                all: unset;

                margin-bottom: 25px;

                font-size: ${({ theme }) => theme.fontSize.lg};
                font-weight: 500;

                cursor: pointer;
            }
        }

        div.alertDiv {
            padding-left: 0;

            display: flex;
            flex-direction: column;

            button {
                all: unset;

                margin-bottom: 25px;

                font-size: ${({ theme }) => theme.fontSize.lg};
                font-weight: 500;

                cursor: pointer;
            }
        }
    }
`;
