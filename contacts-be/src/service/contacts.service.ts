import { inject, injectable } from "inversify";
import TYPES from "../constant/types";
import { RequestDeleteContact, RequestContact, RequestInsertContact, RequestUpdateContact } from "../models/contact.model";
import ContactsRepository from "../repository/contacts.repository";
import DBConnectionFactory from "../util/dbConnectionFactory.util";

@injectable()
class ContactsService {
    constructor(
        @inject(TYPES.mysqlPool) private mysqlPool: DBConnectionFactory,
        @inject(TYPES.ContactsRepositoryInterface) private repository: ContactsRepository
    ) { }

    public async getContactsList<T>(): Promise<T[]> {
        let result: T[];
        let connection = await this.mysqlPool.getConnection();
        result = await this.repository.getContactsList(connection);

        return result;
    }

    public async getContact<T>(request: RequestContact): Promise<T> {
        let result: T;
        let connection = await this.mysqlPool.getConnection();
        result = await this.repository.getContact(request, connection);

        return result;
    }

    public async insertContact<T>(request: RequestInsertContact): Promise<T> {
        let result: T;
        let connection;

        try {
            connection = await this.mysqlPool.getConnection();
            connection.beginTransaction();

            const { insertId: newIdx } = await this.repository.insertContact(request, connection);
            result = await this.repository.getContact(newIdx, connection);

            connection && connection.commit();

        } catch (error) {
            connection && connection.rollback();
            throw error;

        } finally {
            connection && connection.release();
        }

        return result;
    }

    public async updateContact<T>(request: RequestUpdateContact): Promise<T> {
        let result: T;
        let connection;

        try {
            connection = await this.mysqlPool.getConnection();
            connection.beginTransaction();

            await this.repository.updateContact(request, connection);
            result = await this.repository.getContact(request.cIdx, connection);

            connection && connection.commit();

        } catch (error) {
            connection && connection.rollback();
            throw error;

        } finally {
            connection && connection.release();
        }

        return result;
    }

    public async deleteContact<T>(request: RequestDeleteContact): Promise<T> {
        let result: T;
        let connection;

        try {
            connection = await this.mysqlPool.getConnection();
            connection.beginTransaction();

            result = await this.repository.deleteContact(request, connection);

            connection && connection.commit();

        } catch (error) {
            connection && connection.rollback();
            throw error;

        } finally {
            connection && connection.release();
        }

        return result;
    }
}

export default ContactsService;