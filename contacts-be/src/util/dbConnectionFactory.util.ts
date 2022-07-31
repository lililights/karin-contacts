import { injectable } from "inversify";
import * as mysql from 'mysql2/promise';

@injectable()
class DBConnectionFactory {
    private static pool: mysql.Pool;
    private static instance: mysql.PoolConnection;

    public async getConnection(): Promise<mysql.PoolConnection> {
        const options: mysql.PoolOptions = {
            host: 'localhost',
            port: 3307,
            user: 'root',
            password: 'karin111',
            database: 'KARIN',
            waitForConnections: true,
            connectionLimit: 5,
            multipleStatements: true
        }

        try {
            if (!DBConnectionFactory.pool) {
                DBConnectionFactory.pool = mysql.createPool(options);
            }

            if (!DBConnectionFactory.instance) {
                DBConnectionFactory.instance = await DBConnectionFactory.pool.getConnection();
            }

            if (!DBConnectionFactory.instance.ping()) {
                DBConnectionFactory.instance = await DBConnectionFactory.pool.getConnection();
            }

        } catch (error) {
            throw error;
        }

        return DBConnectionFactory.instance;
    }
}

export default DBConnectionFactory;