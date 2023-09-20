import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TabModule } from '@utils/storage';
import { initTab } from '@actions/tab/tab.action';
import { getContractorRequest } from '@actions/contract/common/set-contractor.action';

import { useApi } from './use-api';
// 상세페이지에서 동적 메타데이터로 탭 구현시 사용
export const useInitTab = (label: string) => {
    const router = useRouter();

    const dispatch = useDispatch();
    // 라우팅 시 재호출
    useEffect(() => {
        // 탭 추가
        const tab = new TabModule();

        if (!tab.read(router.asPath)) {
            tab.create({
                id: router.asPath,
                label,
                to: router.asPath,
            });
        }

        dispatch(initTab(tab.getAll()));
    }, [router]);

    return null;
};
// 상세페이지에서 고객데이터가 필요한 경우 사용
export const useInitCustomer = (c_idx: string) => {
    const router = useRouter();

    const getContractor = useApi(getContractorRequest);
    // 라우팅 시 재호출
    useEffect(() => {
        if (c_idx) {
            getContractor({ idx: c_idx });
        }
    }, [router, c_idx]);

    return null;
};
