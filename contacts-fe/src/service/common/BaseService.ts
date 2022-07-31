import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'

export default class BaseService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'http://localhost:4001';
    }

    protected config: AxiosRequestConfig = {
        method: 'GET',
        url: '',
        params: {},
        data: {}
    }

    public async fnRest(method: string, url: string, params?: any, requestBody?: any): Promise<any> {
        this.config.method = this.checkHttpMethod(method);
        this.config.url = this.baseUrl + url;
        this.config.params = params || {};
        this.config.data = requestBody || {};

        try {
            const response: AxiosResponse<any> = await axios.request(this.config);
            return response.data;

        } catch (error) {
            throw error;
        }
    }

    public checkHttpMethod(method: string): Method {
        let httpMethod: Method;

        switch (method) {
            case 'GET':
            case 'get':
                httpMethod = 'GET';
                break;
            case 'POST':
            case 'post':
                httpMethod = 'POST';
                break;
            case 'PUT':
            case 'put':
                httpMethod = 'PUT';
                break;
            case 'DELETE':
            case 'delete':
                httpMethod = 'DELETE';
                break;
            default:
                throw new Error(`unhandled method: ${method}`);
        }

        return httpMethod;
    }
}