import { useEffect, Dispatch, SetStateAction } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { refreshToken } from '@/lib/token';

export const authCheck = (
    setter?: Dispatch<SetStateAction<boolean>>,
    router?: AppRouterInstance,
    pathname?: string,
) => {
    useEffect(() => {
        const token = sessionStorage.getItem('accessToken');

        const nowDate = new Date().getTime();
        const expiresAt = sessionStorage.getItem('expiresAt');

        if (expiresAt) {
            const isExpires = nowDate - JSON.parse(expiresAt);

            if (isExpires >= 0) {
                console.log(expiresAt);
                refreshToken();
            }
        }

        if (setter && router && pathname) {
            if (token) {
                if (pathname === '/login' || pathname === '/createAccount') {
                    setter((prevState) => {
                        if (prevState !== true) {
                            setTimeout(() => {
                                setter(false);
                                router.push('/');
                            }, 1500);
                        }
                        return true;
                    });
                }
            } else {
                if (pathname !== '/login' && pathname !== '/createAccount') {
                    setter((prevState) => {
                        if (prevState !== true) {
                            setTimeout(() => {
                                setter(false);
                                router.push('/login');
                            }, 1500);
                        }
                        return true;
                    });
                }
            }
        }
    }, [setter, router, pathname]);
};
