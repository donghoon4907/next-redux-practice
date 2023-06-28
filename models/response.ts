export type Response<T> = {
    fields: Array<any>;
    data: Array<T>;
    total: {
        cntrow: number;
        sumpay: number;
        sumcpc: number;
    } | null;
};
