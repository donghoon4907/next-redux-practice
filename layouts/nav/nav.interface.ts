export type Menu = {
    label: string;
    id: string;
};

export type Gnb = Menu & {
    icon: string;
    content: Lnb[];
    to: string | null;
};

export type Lnb = Menu & {
    to: string;
};
