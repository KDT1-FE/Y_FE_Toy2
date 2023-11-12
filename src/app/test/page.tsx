'use client';

import React from 'react';
import Move from '@/components/Move';
import { useState } from 'react';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const page = () => {
    const [shouldRenderMoveComponent, setShouldRenderMoveComponent] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = sessionStorage.getItem('accessToken');

        if (token) {
            if (pathname === '/test') {
                setShouldRenderMoveComponent(true);
                setTimeout(() => {
                    setShouldRenderMoveComponent(false);
                    router.push('/');
                }, 1500);
            }
        }
    }, []);

    return <div>{shouldRenderMoveComponent && <Move />}</div>;
};

export default page;
