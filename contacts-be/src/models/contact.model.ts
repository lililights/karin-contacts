export type RequestContact = string;

export interface RequestInsertContact {
    cName: string;
    cPhone: string;
    cEmail: string;
    cBirthday: string;
    cGroup: string;
}

export interface RequestUpdateContact {
    cIdx: string;
    cName: string;
    cPhone: string;
    cEmail: string;
    cBirthday: string;
    cGroup: string;
    cVersion: string;
}

export type RequestDeleteContact = string;

export interface ResponseList {
    cIdx: string,
    cName: string
}

export interface ResponseContact extends ResponseList {
    cPhone: string,
    cEmail: string,
    cBirthday: string,
    cGroup: string
}