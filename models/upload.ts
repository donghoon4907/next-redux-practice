export type UploadedFile = {
    index: number;
    // origin: string;
    progress: number;
    filename?: string;
    file: any;
    // size: number;
};

export type Attach = {
    original: string;
    savefile: string;
    inbody: boolean;
};
