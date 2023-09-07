import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TabModule } from '@utils/storage';
import { initTab } from '@actions/tab/tab.action';
import { getContractorRequest } from '@actions/contract/common/set-contractor.action';

import { useApi } from './use-api';
import { useRouter } from 'next/router';

export const useInitTab = (label: string) => {
    const router = useRouter();

    const dispatch = useDispatch();

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

export const useInitCustomer = (c_idx: string) => {
    const router = useRouter();

    // console.log(router);

    const getContractor = useApi(getContractorRequest);
    // URL 변경 시 재호출
    useEffect(() => {
        if (c_idx) {
            getContractor({ idx: c_idx });
        }
    }, [router, c_idx]);

    return null;
};