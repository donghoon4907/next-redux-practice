import type { ReactNode, Dispatch, SetStateAction } from 'react';

export interface CoreProps {
    children?: ReactNode;
}

export interface CorePayload {
    callback?: (props: any) => void;
}

export interface CoreSelectOption {
    label: string;
    value: string;
    isFixed: boolean;
}

export interface CoreMenuOption {
    id: string;
    to: string;
    label: string;
}

export type CoreSetState<T> = Dispatch<SetStateAction<T>>;
