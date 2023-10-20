import type { ReactNode, Dispatch, SetStateAction } from 'react';

export interface CoreProps {
    children?: ReactNode;
}

export interface CorePayload {
    callback?: (props: any) => void;
    successAction?: (props: any) => void;
}

export interface CorePaginateOption {
    order?: any;
    page: number;
    nums: number;
    condition?: any;
}

export interface CoreSelectOption {
    label: string;
    value: string;
    // 모든 데이터
    origin?: any;
    isFixed?: boolean;
    // 멀티사용시 선택 여부
    isSelected?: boolean;
    color?: string;
    fontWeight?: string;
}

export interface CoreMenuOption {
    id: string;
    to: string;
    label: string;
    // 사용여부
    disabled?: boolean;
}

export interface CoreTabOption {
    id: string;
    panelId: string;
    label: string;
}

export type CoreColumnOption = Record<string, string>;

export interface CoreTabpanelOption {
    id: string;
    tabId: string;
    hidden: boolean;
}

export interface CoreLinkTabOption {
    id: string;
    label: string;
    to: string;
}

export interface CoreFilterOption {
    id: string;
    type: 'checkbox' | 'radio';
    label: string;
    value: string;
}

export interface CoreSelectFilterOption {
    id: string;
    label: string;
    // width: number;
    items: CoreSelectOption[];
    colspan: number;
    placeholder: string;
}

export interface CorePaginateSuccessPayload<T extends CorePayload> {
    lastPayload: T | null;
    fields: any;
    rows: any;
    total: any;
}

export type CoreSetState<T> = Dispatch<SetStateAction<T>>;

export interface CoreEditableComponent {
    editable: boolean;
}
