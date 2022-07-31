import 'reflect-metadata';
import { jest } from '@jest/globals';
import ContactsController from './contacts.controller';
import { ResponseList, ResponseContact, RequestInsertContact } from '../models/contact.model';

describe('ContactsController 테스트', () => {

    const testIndex = 0;
    const mockRequestParam = { params: { cIdx: testIndex + 1 } };

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

    const requestInsert = {
        body: mockRequestContact
    }

    const requestUpdate = {
        params: mockRequestParam,
        body: mockRequestContact
    }

    const contactsService: any = {};
    contactsService.getContactsList = jest.fn<() => Promise<ResponseList[]>>().mockResolvedValue(mockResponseContacts);
    contactsService.getContact = jest.fn<() => Promise<ResponseContact>>().mockResolvedValue(mockResponseContacts[testIndex]);
    contactsService.insertContact = jest.fn<() => Promise<RequestInsertContact>>().mockResolvedValue(mockRequestContact);
    contactsService.updateContact = jest.fn<() => Promise<RequestInsertContact>>().mockResolvedValue(mockRequestContact);
    contactsService.deleteContact = jest.fn<() => Promise<any>>().mockResolvedValue(mockRequestParam);
    const contactsController = new ContactsController(contactsService);

    test('1. getContactsList 테스트', () => {
        const result = contactsController.getContactsList();
        result.then(response => {
            expect(response.length).toEqual(mockResponseContacts.length);
        })
    })

    test('2. getContact 테스트', () => {
        const result = contactsController.getContact(mockRequestParam);
        result.then(response => {
            expect(response).toEqual(mockResponseContacts[testIndex]);
        })
    })

    test('3. insertContact 테스트', () => {
        const result = contactsController.insertContact(requestInsert, null);
        result.then(response => {
            expect(response).toEqual(mockRequestContact);
        })
    })

    test('4. updateContact 테스트', () => {
        const result = contactsController.updateContact(requestUpdate);
        result.then(response => {
            expect(response).toEqual(mockRequestContact);
        })
    })

    test('5. deleteContact 테스트', () => {
        const result = contactsController.deleteContact(mockRequestParam);
        result.then(response => {
            expect(response).toEqual(mockRequestParam);
        })
    })
})