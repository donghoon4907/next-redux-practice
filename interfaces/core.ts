import type { ReactNode, Dispatch, SetStateAction } from 'react';

export interface CoreProps {
    children?: ReactNode;
}

export interface CorePayload {
    callback?: (props: any) => void;
    successAction?: (props: any) => void;
}

export interface CoreSelectOption {
    label: string;
    value: string;
    isFixed?: boolean;
}

export interface CoreMenuOption {
    id: string;
    to: string;
    label: string;
    level: number;
    items?: CoreMenuOption[];
}

export interface CoreTabOption {
    id: string;
    panelId: string;
    label: string;
}

export interface CoreTabpanelOption extends CoreTabOption {
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
    width: number;
    items: CoreSelectOption[];
    colspan: number;
    placeholder: string;
}

export type CoreSetState<T> = Dispatch<SetStateAction<T>>;
