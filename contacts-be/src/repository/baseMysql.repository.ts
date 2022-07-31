import { injectable } from "inversify";
import DBConnectionFactory from "../util/dbConnectionFactory.util";

@injectable()
class BaseMysqlRepository {
    constructor(protected mysqlPool: DBConnectionFactory) { }

    protected async query<T>(queryStr: string, queryParams?: any[], conn?: any): Promise<T[]> {
        let result: T[];
        let connection;

        try {
            if (conn) {
                connection = conn;

            } else {
                connection = await this.mysqlPool.getConnection();
            }

            const [rows, fields] = await connection.query(queryStr, queryParams);
            result = rows as T[];

            if (!conn) {
                connection.commit();
            }

        } catch (error) {
            if (!conn) {
                connection.rollback();
                throw error;
            }

        } finally {
            if (!conn) {
                connection.release();
            }
        }

        return result;
    }

    protected async execute<T>(queryStr: string, queryParams?: any[], conn?: any): Promise<T> {
        let result: T;
        let connection;

        try {
            if (conn) {
                connection = conn;

            } else {
                connection = await this.mysqlPool.getConnection();
            }

            const [rows, fields] = await connection.query(queryStr, queryParams);
            result = rows as T;

            if (!conn) {
                connection.commit();
            }

        } catch (error) {
            if (!conn) {
                connection.rollback();
                throw error;
            }

        } finally {
            if (!conn) {
                connection.release();
            }
        }

        return result;
    }
}

export default BaseMysqlRepository;