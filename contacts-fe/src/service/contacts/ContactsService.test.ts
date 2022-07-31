import { jest } from '@jest/globals';
import { RequestContact, ResponseContact, ResponseList } from "./model/ContactsModel";
import ContactsService from './ContactsService';

const contactsService = new ContactsService();

describe('ContactsService 테스트', () => {
    const testIndex = 0;
    const responseList = [{
        cIdx: '1',
        cName: 'Sarah',
        cPhone: '01023121321',
        cEmail: 'aaa@email.com',
        cBirthday: '',
        cGroup: 'AAA'
    }, {
        cIdx: '2',
        cName: 'Wendy',
        cPhone: '01077554633',
        cEmail: '',
        cBirthday: '',
        cGroup: "BBB"
    }]

    describe('1. loadContactsList 테스트', () => {
        test('응답이 성공적이라면 연락처 리스트를 반환한다.', async () => {
            contactsService.fnRest = jest.fn<() => Promise<ResponseList[]>>().mockResolvedValue(responseList);
            const result = await contactsService.loadContactsList();
            expect(result.length).toEqual(responseList.length);
        })
    })

    describe('2. loadContact 테스트', () => {
        test('응답이 성공적이라면 연락처 상세정보를 반환한다.', async () => {
            contactsService.fnRest = jest.fn<() => Promise<ResponseContact>>().mockResolvedValue(responseList[testIndex]);
            const result = await contactsService.loadContact(testIndex.toString());
            expect(result).toEqual(responseList[testIndex]);
        })
    })

    describe('3. insertContact 테스트', () => {
        test('응답이 성공적이라면 등록한 연락처의 상세정보를 반환한다.', async () => {
            const newContact: RequestContact = {
                cName: '새 이름',
                cPhone: '01035345443',
                cEmail: '',
                cBirthday: '',
                cGroup: "AAA"
            }

            const response = {
                ...responseList,
                ...newContact
            }

            contactsService.fnRest = jest.fn<() => Promise<ResponseList[]>>().mockResolvedValue(response);
            const result = await contactsService.insertContact(newContact);
            expect(result).toEqual(response);
        })
    })

    describe('4. updateContact 테스트', () => {
        test('응답이 성공적이라면 수정된 연락처를 반환한다.', async () => {
            const requestContact: RequestContact = {
                cName: '수정된 이름',
                cPhone: '01068576655',
                cEmail: '',
                cBirthday: '',
                cGroup: "BBB"
            }

            const response = {
                ...responseList,
                requestContact
            }

            contactsService.fnRest = jest.fn<() => Promise<ResponseList[]>>().mockResolvedValue(response);
            const result = await contactsService.updateContact(testIndex.toString(), requestContact);
            expect(result).toEqual(response);
        })
    })

    describe('5. deleteContact 테스트', () => {
        test('응답이 성공적이라면 삭제된 연락처를 반환한다.', async () => {
            contactsService.fnRest = jest.fn<() => Promise<ResponseContact>>().mockResolvedValue(responseList[testIndex]);
            const result = await contactsService.deleteContact(testIndex.toString());
            expect(result).toEqual(responseList[testIndex]);
        })
    })
})
