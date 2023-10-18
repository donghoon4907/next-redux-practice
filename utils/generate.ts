import type { CoreSelectOption } from '@interfaces/core';

// 목록의 인덱스 값 설정
export function generateIndex(arr: Array<any>, start = 1) {
    let output = start;
    if (arr.length > 0) {
        output = arr[arr.length - 1].index + 1;
    }

    return output;
}

// 목록 데이터 생성
export function generateListSuccessPayload(data: any, payload: any) {
    const output: any = {
        rows: [],
        fields: [],
        total: {
            count: 0,
        },
        lastPayload: payload,
    };

    if (data.hasOwnProperty('data')) {
        const target = data.data;

        if (target.hasOwnProperty('rows')) {
            output.rows = target['rows'];
        }

        if (target.hasOwnProperty('fields')) {
            output.fields = target['fields'];
        }

        if (target.hasOwnProperty('total')) {
            output.total = target['total'];
        }
    }

    return output;
}

// 목록 params 생성
export function generateListParams(condition: any, query: any) {
    const { page, nums, order, userid, ...rest } = query;

    const params: any = {
        page: 1,
        nums: 25,
        condition,
        order: {},
    };
    // 페이지공통 - 페이지 번호
    if (page) {
        params.page = Number(page);
    }
    // 페이지공통 - 페이지 크기
    if (nums) {
        params.nums = Number(nums);
    }
    // 페이지공통 - 정렬
    if (order) {
        const [type, sort] = String(order).split(',');

        params.order[type] = sort;
    }

    if (userid) {
        params.condition['userid'] = String(userid).toUpperCase();
    }
    // 나머지
    for (const [key, value] of Object.entries(rest)) {
        const val = value as string;
        // 여러 개인 데이터 처리
        if (val.includes(',')) {
            params.condition[key] = val.split(',');
        } else if (val === 'Y') {
            params.condition[key] = true;
        } else if (val === 'N') {
            params.condition[key] = false;
        } else {
            params.condition[key] = val;
        }
    }

    return params;
}
// 옵션 목록에 전체 추가
export function generateAllOption(options: CoreSelectOption[]) {
    const target = {
        label: '전체',
        value: '',
        isFixed: false,
    };

    return [target, ...options];
}
