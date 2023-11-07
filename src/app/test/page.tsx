'use client';

// api 테스트용
// lib/api.ts에서 인터셉터로 헤더에 자동으로 authorization accesstoken 전달.

import React from 'react';
import { instance } from '@/lib/api';

const page = () => {
    const onClick = async () => {
        try {
            const res = await instance.get('/users');
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <button onClick={onClick}>유저 조회 </button>
        </div>
    );
};

export default page;
