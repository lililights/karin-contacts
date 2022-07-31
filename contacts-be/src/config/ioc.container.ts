import { Container } from 'inversify';
import TYPES from '../constant/types';
import ContactsRepository from '../repository/contacts.repository';
import ContactsRepositoryInterface from '../repository/contacts.repository.interface';
import DBConnectionFactory from '../util/dbConnectionFactory.util';
import ContactsService from '../service/contacts.service'

const container = new Container();

// container.bind<AAA>('BBB').to(CCC);

// @injectable() class CCC 를
// <AAA> 타입으로, 이름은 'BBB'로 사용하겠다.

try {
    container.bind<DBConnectionFactory>(TYPES.mysqlPool).to(DBConnectionFactory);
    container.bind<ContactsRepositoryInterface>(TYPES.ContactsRepositoryInterface).to(ContactsRepository);
    container.bind<ContactsService>(TYPES.ContactsService).to(ContactsService);

} catch (error) {
    throw error;
}

export default container;
