import axios, { Method } from "axios";
import { RequestContact, ResponseContact } from "../contacts/model/ContactsModel";
import BaseService from "./BaseService";

jest.mock('axios');
const baseService = new BaseService();

describe('BaseService 테스트', () => {

    describe('1. fnRest() 테스트', () => {
        test('응답이 성공적이면 데이터를 반환한다.', async () => {
            const method = 'POST';
            const url = '/contacts';
            const params = null;

            const requestBody: RequestContact = {
                cName: '새 이름',
                cPhone: '01012341234',
                cEmail: '',
                cBirthday: '',
                cGroup: ''
            }

            const newContact: ResponseContact = {
                cIdx: '1',
                ...requestBody
            }

            const response = { data: newContact };
            (axios.request as jest.MockedFunction<typeof axios.get>).mockResolvedValue(response);
            const data = await baseService.fnRest(method, url, params, requestBody);
            expect(data).toEqual(newContact);
        })
    })
})

describe('2. checkHttpMethod 테스트', () => {
    const urlArr: string[] = ['GET', 'get', 'POST', 'post', 'PUT', 'put', 'DELETE', 'delete'];

    for (const e of urlArr) {
        test('요청에 따른 HTTP 메서드와 Url 체크', () => {
            const url: string = e.toUpperCase();
            const result = baseService.checkHttpMethod(url as Method);
            expect(result).toBe(url);
        })
    }

    test('처리하지 않은 HTTP 메서드는 에러를 발생시킨다.', () => {
        const method = 'unknown';
        expect(() => baseService.checkHttpMethod(method)).toThrow();
    })
})