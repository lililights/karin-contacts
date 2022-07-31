export interface ResponseList {
    cIdx: string;
    cName: string;
    cPhone: string;
    cGroup: string;
}

export interface ResponseContact {
    cIdx: string;
    cName: string;
    cPhone: string;
    cEmail: string;
    cBirthday: string;
    cGroup: string;
}

export interface RequestContact {
    cName: string;
    cPhone: string;
    cEmail: string;
    cBirthday: string;
    cGroup: string;
}