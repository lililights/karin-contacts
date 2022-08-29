import { RequestContact, RequestInsertContact, RequestUpdateContact, RequestDeleteContact } from '../models/contact.model';

interface ContactsRepositoryInterface {
    getContactsList<T>(connection?: any): Promise<T[]>;
    getContact<T>(request: RequestContact, connection?: any): Promise<T>;
    insertContact<T>(request: RequestInsertContact, connection?: any): Promise<T>;
    updateContact<T>(request: RequestUpdateContact, connection?: any): Promise<T>;
    deleteContact<T>(request: RequestDeleteContact, connection?: any): Promise<T>;
}

export default ContactsRepositoryInterface;