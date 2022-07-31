import { inject, injectable } from "inversify";
import TYPES from "../constant/types";
import { RequestInsertContact, RequestDeleteContact, RequestContact, RequestUpdateContact } from "../models/contact.model";
import { QueryInfo } from "../models/transaction.model";
import { ContactsQuery, ContactsQueryId } from "../query/contacts.query";
import DBConnectionFactory from "../util/dbConnectionFactory.util";
import BaseMysqlRepository from "./baseMysql.repository";
import ContactsRepositoryInterface from "./contacts.repository.interface";

@injectable()
class ContactsRepository extends BaseMysqlRepository implements ContactsRepositoryInterface {
    constructor(@inject(TYPES.mysqlPool) protected mysqlPool: DBConnectionFactory) {
        super(mysqlPool);
    }

    public async getContactsList<T>(connection?: any): Promise<T[]> {
        const queryInfo: QueryInfo = ContactsQuery(ContactsQueryId.getContactsList);
        return await this.query(queryInfo.queryStr, queryInfo.queryParams, connection);
    }

    public async getContact<T>(request: RequestContact, connection?: any): Promise<T> {
        const queryInfo: QueryInfo = ContactsQuery(ContactsQueryId.getContact, request);
        const result = await this.query(queryInfo.queryStr, queryInfo.queryParams, connection);
        return result ? result[0] as T : undefined;
    }

    public async insertContact<T>(request: RequestInsertContact, connection?: any): Promise<T> {
        const queryInfo: QueryInfo = ContactsQuery(ContactsQueryId.insertContact, request);
        return await this.execute(queryInfo.queryStr, queryInfo.queryParams, connection);
    }

    public async updateContact<T>(request: RequestUpdateContact, connection?: any): Promise<T> {
        const queryInfo: QueryInfo = ContactsQuery(ContactsQueryId.updateContact, request);
        return await this.execute(queryInfo.queryStr, queryInfo.queryParams, connection);
    }

    public async deleteContact<T>(request: RequestDeleteContact, connection?: any): Promise<T> {
        const queryInfo: QueryInfo = ContactsQuery(ContactsQueryId.deleteContact, request);
        return await this.execute(queryInfo.queryStr, queryInfo.queryParams, connection);
    }
}

export default ContactsRepository;