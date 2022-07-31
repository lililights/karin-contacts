import { ChangeEvent, useState } from "react";
import { birthdayEx, phoneEx } from "../../../utils/Expressions";
import { validBirthday, validEmail, validGroup, validName, validPhone } from "../../../utils/ValidationCheck";
import { useFormDispatchContext, useFormStateContext } from "./FormConextProvider";

const InsertForm = () => {
    const { cName, cPhone, cEmail, cBirthday, cGroup } = useFormStateContext();
    const formDispatch = useFormDispatchContext();

    const [warnName, setWarnName] = useState<string>('');
    const [warnPhone, setWarnPhone] = useState<string>('');
    const [warnEmail, setWarnEmail] = useState<string>('');
    const [warnBirthday, setWarnBirthday] = useState<string>('');
    const [warnGroup, setWarnGroup] = useState<string>('');

    const setFormValue = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        switch (e.target.name) {
            case 'cName':
                setWarnName('');
                formDispatch({ type: 'NAME', name: value });
                break;
            case 'cPhone':
                setWarnPhone('');
                formDispatch({ type: 'PHONE', phone: phoneEx(value.replaceAll('-', '').trim()) });
                break;
            case 'cEmail':
                setWarnEmail('');
                formDispatch({ type: 'EMAIL', email: value.trim() });
                break;
            case 'cBirthday':
                setWarnBirthday('');
                formDispatch({ type: 'BIRTHDAY', birthday: birthdayEx(value.replaceAll('/', '').trim()) });
                break;
            case 'cGroup':
                setWarnGroup('');
                formDispatch({ type: 'GROUP', group: value });
                break;
            default:
                throw new Error('정의되지 않은 input영역입니다.');
        }
    }

    return (
        <div className="insert-form">
            <div className="insert-col">NAME*</div>
            {warnName && <div className="insert-warning">{warnName}</div>}
            <div>
                <input
                    name="cName"
                    id="input-name"
                    value={cName}
                    placeholder="이름"
                    onChange={setFormValue}
                    onBlur={() => { setWarnName(validName(cName)) }}
                    autoFocus
                />
            </div>
            <div className="insert-col">PHONE*</div>
            {warnPhone && <div className="insert-warning">{warnPhone}</div>}
            <div>
                <input
                    name="cPhone"
                    id="input-phone"
                    value={cPhone}
                    placeholder="전화번호"
                    onChange={setFormValue}
                    onBlur={() => { setWarnPhone(validPhone(cPhone)) }}
                />
            </div>
            <div className="insert-col">E-MAIL</div>
            {warnEmail && <div className="insert-warning">{warnEmail}</div>}
            <div>
                <input
                    name="cEmail"
                    value={cEmail}
                    placeholder="이메일"
                    onChange={setFormValue}
                    onBlur={() => { setWarnEmail(validEmail(cEmail)) }}
                />
            </div>
            <div className="insert-col">BIRTHDAY</div>
            {warnBirthday && <div className="insert-warning">{warnBirthday}</div>}
            <div>
                <input
                    name="cBirthday"
                    value={cBirthday}
                    placeholder="생일(YYYY/MM/DD)"
                    onChange={setFormValue}
                    onBlur={() => { setWarnBirthday(validBirthday(cBirthday)) }}
                />
            </div>
            <div className="insert-col">GROUP</div>
            {warnGroup && <div className="insert-warning">{warnGroup}</div>}
            <div>
                <input
                    name="cGroup"
                    value={cGroup}
                    placeholder="그룹"
                    onChange={setFormValue}
                    onBlur={() => { setWarnGroup(validGroup(cGroup)) }}
                />
            </div>
        </div>
    )
}

export default InsertForm;