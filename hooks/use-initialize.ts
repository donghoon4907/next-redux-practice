import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TabModule } from '@utils/storage';
import { initTab } from '@actions/tab/tab.action';
import customersService from '@services/customersService';
import { updateLoadedContractor } from '@actions/contract/common/set-contractor.action';

export const useInitTab = (to: string, label: string) => {
    const dispatch = useDispatch();

    useEffect(() => {
        // 탭 추가
        const tab = new TabModule();

        if (!tab.read(to)) {
            tab.create({
                id: to,
                label,
                to,
            });
        }

        dispatch(initTab(tab.getAll()));
    }, [to]);

    return null;
};

export const useInitCustomer = (c_idx: string) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (c_idx) {
            fetchCustomer(c_idx);
        }

        async function fetchCustomer(idx: string) {
            try {
                const { data } = await customersService.getCustomer({
                    idx,
                });

                dispatch(updateLoadedContractor(data.data));
            } catch {
                alert('고객정보 로드 중 오류가 발생했습니다.');
            }
        }
    }, [c_idx]);

    return null;
};
