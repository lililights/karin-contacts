import moment from 'moment';
import { RequestContact } from '../service/contacts/model/ContactsModel';

const phoneFormat = /^([0-9]{2,3})-?([0-9]{3,4})-?([0-9]{4})$/;
const emailFormat = /^[0-9a-z]([-_.]?[0-9a-z])*@[0-9a-z]([-_.]?[0-9a-z])*(\.[a-z]{2,3})$/;

export const validName = (name: string) => {
    return !name.trim() ? '이름은 필수 입력 항목입니다.' : name.length > 25 ? '입력 가능한 최대 길이는 25자입니다.' : '';
}

export const validPhone = (phone: string) => {
    return !phone ? '전화번호는 필수 입력 항목입니다.' : !phoneFormat.test(phone) ? '올바른 전화번호 형식이 아닙니다.' : '';
}

export const validEmail = (email: string) => {
    return email ? email.length > 40 ? '입력 가능한 최대 길이는 40자입니다.' : !emailFormat.test(email) ? '올바른 이메일 형식이 아닙니다.' : '' : '';
}

export const validBirthday = (birthday: string) => {
    return birthday && !moment(birthday, 'YYYY/MM/DD', true).isValid() ? '올바른 생년월일 형식이 아닙니다. (예: 1999/01/01)' : '';
}

export const validGroup = (group: string) => {
    return group && (group.trim().length < 1 || group.length > 20) ? '그룹명은 1~20자 사이로 입력해주세요.' : '';
}

export const validAll = ({ cName, cPhone, cEmail, cBirthday, cGroup }: RequestContact): string => {
    const message = validName(cName)
        || validPhone(cPhone)
        || validEmail(cEmail)
        || validBirthday(cBirthday)
        || validGroup(cGroup);

    return message;
}