import type { ReactNode } from 'react';

export interface CoreProps {
    children?: ReactNode;
}

export interface CorePayload {
    callback?: (props: any) => void;
}
