import { GetContactInfo, InsertContactReq, UpdateContactReq, DeleteContactReq } from '../models/contact.model';

interface ContactsRepositoryInterface {
    getContactsList<T>(connection?: any): Promise<T[]>;
    getContact<T>(request: GetContactInfo, connection?: any): Promise<T>;
    insertContact<T>(request: InsertContactReq, connection?: any): Promise<T>;
    updateContact<T>(request: UpdateContactReq, connection?: any): Promise<T>;
    deleteContact<T>(request: DeleteContactReq, connection?: any): Promise<T>;
}

export default ContactsRepositoryInterface;