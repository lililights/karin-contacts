import { QueryInfo } from "../models/transaction.model";

export enum ContactsQueryId {
    getContactsList,
    getContact,
    insertContact,
    updateContact,
    deleteContact
}

export const ContactsQuery = (queryId: ContactsQueryId, request: any = {}): QueryInfo => {
    const queryInfo: QueryInfo = {
        queryStr: ``,
        queryParams: []
    }

    const queryStr: string[] = [];
    const queryParams: any[] = [];

    switch (queryId) {
        case ContactsQueryId.getContactsList:
            queryStr.push(`
            SELECT
                KC_IDX as cIdx,
                KC_NAME as cName,
                KC_PHONE as cPhone,
                KC_GROUP as cGroup
            FROM KC_CONTACTS
            ORDER BY UPPER(KC_NAME) ASC
            `)
            break;

        case ContactsQueryId.getContact:
            queryStr.push(`
            SELECT
                KC_IDX as cIdx,
                KC_NAME as cName,
                KC_PHONE as cPhone,
                KC_EMAIL as cEmail,
                CONVERT_TZ(KC_BIRTHDAY, "+0:00", "+9:00") as cBirthday,
                KC_GROUP as cGroup
            FROM KC_CONTACTS
            WHERE KC_IDX = ?
            `)
            queryParams.push(request);
            break;

        case ContactsQueryId.insertContact:
            queryStr.push(`
            INSERT INTO KC_CONTACTS
            (
                KC_NAME,
                KC_PHONE,
                KC_EMAIL,
                KC_BIRTHDAY,
                KC_GROUP
            )
            VALUES (?, ?, ?, ?, ?)
            `);
            queryParams.push(request.cName);
            queryParams.push(request.cPhone);
            queryParams.push(request.cEmail || null);
            queryParams.push(request.cBirthday || null);
            queryParams.push(request.cGroup || null);
            break;

        case ContactsQueryId.updateContact:
            queryStr.push(`
            UPDATE KC_CONTACTS
            SET
                KC_NAME = ?,
                KC_PHONE = ?,
                KC_EMAIL = ?,
                KC_BIRTHDAY = ?,
                KC_GROUP = ?
            WHERE KC_IDX = ?
            `);
            queryParams.push(request.cName);
            queryParams.push(request.cPhone);
            queryParams.push(request.cEmail || null);
            queryParams.push(request.cBirthday || null);
            queryParams.push(request.cGroup || null);
            queryParams.push(request.cIdx);
            break;

        case ContactsQueryId.deleteContact:
            queryStr.push(`
                DELETE FROM KC_CONTACTS
                WHERE KC_IDX = ?
                `);

            queryParams.push(request);
            break;

        default:
            break;
    }

    if (queryStr.length > 0) {
        queryInfo.queryStr = queryStr.join(' ');
        queryInfo.queryParams = queryParams;
    }

    return queryInfo;
}