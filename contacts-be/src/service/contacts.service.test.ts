import 'reflect-metadata';
import { jest } from '@jest/globals';
import ContactsService from './contacts.service';
import DBConnectionFactory from "../util/dbConnectionFactory.util";
import { ResponseList, ResponseContact, RequestInsertContact } from "../models/contact.model";

describe('ContactsService 테스트', () => {

    const testIndex = 0;
    const mockRequestParam: string = (testIndex + 1).toString();

    const mockResponseContacts: ResponseContact[] = [{
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

    const mockRequestContact: RequestInsertContact = {
        cName: '새 이름',
        cPhone: '01011111111',
        cEmail: '',
        cBirthday: '',
        cGroup: '새 그룹'
    }

    const mockInsertId = { insertId: testIndex };

    const requestUpdate = {
        cIdx: mockRequestParam,
        ...mockRequestContact
    }

    const ContactsRepository: any = {};
    ContactsRepository.getContactsList = jest.fn<() => Promise<ResponseList[]>>().mockResolvedValue(mockResponseContacts);
    ContactsRepository.getContact = jest.fn<() => Promise<ResponseContact>>().mockResolvedValue(mockResponseContacts[testIndex]);
    ContactsRepository.insertContact = jest.fn<() => Promise<any>>().mockResolvedValue(mockInsertId);
    ContactsRepository.updateContact = jest.fn<() => void>();
    ContactsRepository.deleteContact = jest.fn<() => Promise<any>>().mockResolvedValue(mockRequestParam);
    const mysqlPool = new DBConnectionFactory();
    const contactsService = new ContactsService(mysqlPool, ContactsRepository);

    test('1. getContactsList 테스트', async () => {
        const result = await contactsService.getContactsList();
        expect(result.length).toEqual(mockResponseContacts.length);
    })

    test('2. getContact 테스트', async () => {
        const result = await contactsService.getContact(mockRequestParam);
        expect(result).toEqual(mockResponseContacts[testIndex]);
    })

    test('3. insertContact 테스트', async () => {
        const result = await contactsService.insertContact(mockRequestContact);
        expect(result).toEqual(mockResponseContacts[testIndex]);
    })

    test('4. updateContact 테스트', async () => {
        const result = await contactsService.updateContact(requestUpdate);
        expect(result).toEqual(mockResponseContacts[testIndex]);
    })

    test('5. deleteContact 테스트', async () => {
        const result = await contactsService.deleteContact(mockRequestParam);
        expect(result).toEqual(mockRequestParam);
    })
})