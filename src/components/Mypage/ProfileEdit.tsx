'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import ProfileModal from './ProfileModal';

const ProfileEdit = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <Container>
            {openModal && <ProfileModal setOpenModal={setOpenModal} />}
            <div>
                <h2>프로필</h2>
                <div className="profileDiv">
                    {/* Modal */}
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
                <h2>공지사항</h2>
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

        h2 {
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.15);
            font-size: 1.65rem;
            color: #00956e;
        }

        div.profileDiv {
            padding-left: 0;
            display: flex;
            flex-direction: column;

            button {
                all: unset;
                margin-bottom: 25px;
                font-size: 1.2rem;
                cursor: pointer;
                font-weight: 600;
            }
        }

        div.alertDiv {
            padding-left: 0;
            display: flex;
            flex-direction: column;

            button {
                all: unset;
                margin-bottom: 25px;
                font-size: 1.2rem;
                cursor: pointer;
                font-weight: 600;
            }
        }
    }
`;
