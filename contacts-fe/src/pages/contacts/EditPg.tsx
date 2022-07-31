import ContactsService from "../../service/contacts/ContactsService";
import Frame from "../common/components/Frame"
import InsertForm from "./components/InsertForm";
import ErrorMessage from "../common/components/ErrorMessage";
import LinkBtn from "../common/components/LinkBtn"
import ActionBtn from "../common/components/ActionBtn";
import { useState, useCallback, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { birthdayEx, phoneEx } from "../../utils/Expressions";
import { useCIdxContext } from "./components/CIdxContextProvider";
import { useFormDispatchContext, useFormStateContext } from "./components/FormConextProvider";
import { validAll } from "../../utils/ValidationCheck";

const EditPg = () => {
    const contactsService = new ContactsService();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const currentCIdx = useCIdxContext().current;
    const formState = useFormStateContext();
    const formDispatch = useFormDispatchContext();

    useEffect(() => {
        contactsService.loadContact(currentCIdx)
            .then((data) => {
                data.cName || setError(true);
                formDispatch({
                    type: 'ALL', state: {
                        ...data,
                        cPhone: phoneEx(data.cPhone),
                        cEmail: data.cEmail ? data.cEmail : '',
                        cBirthday: data.cBirthday ? birthdayEx(data.cBirthday.substring(0, 10).replaceAll('-', '')) : '',
                        cGroup: data.cGroup ? data.cGroup : '',
                    }
                })
            })
            .catch(() => setError(true))
    }, [currentCIdx]) // eslint-disable-line

    const onSubmitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const contactsService = new ContactsService();
        const warning = validAll(formState);

        if (warning) {
            alert(warning);
            return;
        } else {
            contactsService.updateContact(currentCIdx, formState)
                .then(() => {
                    alert('변경사항이 저장되었습니다.');
                    navigate('/detail');
                })
                .catch((err) => {
                    alert('에러가 발생했습니다. 관리자에게 문의하세요.');
                    console.log(err.response?.status);
                    navigate('/');
                })
        }
    }, [currentCIdx, formState, navigate])

    return (
        <Frame title="CONTACTS" name="pg edit-pg">
            {error ?
                <ErrorMessage message="ERROR" description='네트워크 오류 또는 잘못된 요청입니다.' />
                :
                <form onSubmit={onSubmitForm}>
                    <div className="btns">
                        <ActionBtn name="Ok!" icon="💝" type="submit" />
                        <LinkBtn name="cancel" icon="🍒" />
                    </div>
                    <InsertForm />
                </form>
            }
        </Frame>
    )
}

export default EditPg;