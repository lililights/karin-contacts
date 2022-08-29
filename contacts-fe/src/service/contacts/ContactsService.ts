import BaseService from "../common/BaseService";
import { RequestContact, ResponseContact, ResponseList } from "./model/ContactsModel";

export default class ContactsService extends BaseService {
    async loadContactsList(): Promise<ResponseList[]> {
        const method = 'GET';
        const url = '/contacts';
        const params = null;
        const body = null;

        try {
            return await this.fnRest(method, url, params, body);

        } catch (error) {
            throw error;
        }
    }

    async loadContact(cIdx: string): Promise<ResponseContact> {
        const method = 'GET';
        const url = `/contacts/${cIdx}`;
        const params = null;
        const body = null;

        try {
            return await this.fnRest(method, url, params, body);

        } catch (error) {
            throw error;
        }
    }

    async insertContact(contact: RequestContact): Promise<ResponseContact> {
        contact.cName = contact.cName.trim();
        contact.cPhone = contact.cPhone.replaceAll('-', '');
        if (contact.cGroup) { contact.cGroup = contact.cGroup.trim(); }

        const method = 'POST';
        const url = '/contacts';
        const params = null;
        const body = contact;

        try {
            return await this.fnRest(method, url, params, body);

        } catch (error) {
            throw error;
        }
    }

    async updateContact(cIdx: string, cVersion: string, contact: RequestContact): Promise<ResponseContact> {
        contact.cName = contact.cName.trim();
        contact.cPhone = contact.cPhone.replaceAll('-', '');
        if (contact.cGroup) { contact.cGroup = contact.cGroup.trim(); }

        const method = 'PUT';
        const url = `/contacts/${cIdx}/${cVersion}`;
        const params = null;
        const body = contact;

        try {
            return await this.fnRest(method, url, params, body);

        } catch (error) {
            throw error;
        }
    }

    async deleteContact(cIdx: string): Promise<ResponseContact> {
        const method = 'DELETE';
        const url = `/contacts/${cIdx}`;
        const params = null;
        const body = null;

        try {
            return await this.fnRest(method, url, params, body);

        } catch (error) {
            throw error;
        }
    }
}