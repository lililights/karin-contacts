import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut, request, response } from "inversify-express-utils";
import TYPES from "../constant/types";
import ContactsService from '../service/contacts.service'
import * as express from 'express';
import { RequestContact, RequestDeleteContact, RequestInsertContact, RequestUpdateContact, ResponseContact } from "../models/contact.model";

@controller('/contacts')
class ContactsController {
    constructor(@inject(TYPES.ContactsService) private service: ContactsService) { }

    @httpGet('/')
    public async getContactsList() {
        return await this.service.getContactsList();
    }

    @httpGet('/:cIdx')
    public async getContact(@request() req: express.Request) {
        const cIdx: RequestContact = req.params.cIdx;
        return await this.service.getContact(cIdx);
    }

    @httpPost('/')
    public async insertContact(@request() req: express.Request, @response() res: express.Response) {
        const newContact: RequestInsertContact = {
            cName: req.body.cName,
            cPhone: req.body.cPhone,
            cEmail: req.body.cEmail,
            cBirthday: req.body.cBirthday,
            cGroup: req.body.cGroup
        }

        const result: ResponseContact = await this.service.insertContact(newContact);
        const responseResult = {
            statusCode: res.statusCode === 200 ? "성공" : res.statusCode,
            ...result
        }

        return responseResult;
    }

    @httpPut('/:cIdx')
    public async updateContact(@request() req: express.Request) {
        const editContact: RequestUpdateContact = {
            cIdx: req.params.cIdx,
            cName: req.body.cName,
            cPhone: req.body.cPhone,
            cEmail: req.body.cEmail,
            cBirthday: req.body.cBirthday,
            cGroup: req.body.cGroup
        }

        return await this.service.updateContact(editContact);
    }

    @httpDelete('/:cIdx')
    public async deleteContact(@request() req: express.Request) {
        const cIdx: RequestDeleteContact = req.params.cIdx;
        return await this.service.deleteContact(cIdx);
    }
}

export default ContactsController;