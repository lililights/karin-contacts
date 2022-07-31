import ContactsService from "../../service/contacts/ContactsService";
import Frame from "../common/components/Frame";
import InsertForm from "./components/InsertForm";
import LinkBtn from "../common/components/LinkBtn";
import ActionBtn from "../common/components/ActionBtn";
import { FormEvent, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetCIdxContext } from "./components/CIdxContextProvider";
import { useFormDispatchContext, useFormStateContext } from "./components/FormConextProvider";
import { validAll } from "../../utils/ValidationCheck";

const AddPg = () => {
    const contactsService = new ContactsService();
    const navigate = useNavigate();
    const setCIdx = useSetCIdxContext();
    const formState = useFormStateContext();
    const formDispatch = useFormDispatchContext();

    useEffect(() => {
        formDispatch({ type: 'INIT' });
    }, []) // eslint-disable-line

    const onSubmitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const warning = validAll(formState);

        if (warning) {
            alert(warning);
            return;
        } else {
            contactsService.insertContact(formState)
                .then((data) => {
                    alert('등록이 완료되었습니다.');
                    setCIdx(data.cIdx);
                    navigate('/detail');
                })
                .catch((err) => {
                    alert('에러가 발생했습니다. 관리자에게 문의하세요.');
                    console.log(err.response?.status);
                    navigate('/');
                })
        }
    }, [formState, navigate]) // eslint-disable-line

    return (
        <Frame title="CONTACTS" name="pg add-pg">
            <form onSubmit={onSubmitForm}>
                <div className="btns">
                    <ActionBtn name="Ok!" icon="💕" type="submit" />
                    <LinkBtn name="cancel" icon="🍒" />
                </div>
                <InsertForm />
            </form>
        </Frame>
    )
}

export default AddPg;