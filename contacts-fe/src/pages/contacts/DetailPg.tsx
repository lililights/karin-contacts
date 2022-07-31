import ContactsService from "../../service/contacts/ContactsService";
import Frame from "../common/components/Frame"
import ShowDetail from "./components/ShowDetail";
import ErrorMessage from "../common/components/ErrorMessage";
import LinkBtn from "../common/components/LinkBtn";
import ActionBtn from "../common/components/ActionBtn";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { ResponseContact } from "../../service/contacts/model/ContactsModel";
import { useCIdxContext } from "./components/CIdxContextProvider";

const DetailPg = () => {
    const contactsService = new ContactsService();
    const navigate = useNavigate();
    const currentCIdx = useCIdxContext().current;
    const [error, setError] = useState(false);
    const [detail, setDetail] = useState<ResponseContact | null>(null)

    useEffect(() => {
        contactsService
            .loadContact(currentCIdx)
            .then((data) => {
                data ? setDetail(data) : setError(true);
            })
            .catch((err) => {
                setError(true);
                console.log(err.response?.status);
            })
    }, [currentCIdx]) // eslint-disable-line

    const deleteContact = useCallback(() => {
        const contactsService = new ContactsService();
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            contactsService.deleteContact(currentCIdx)
                .then(() => {
                    alert('삭제되었습니다.');
                    navigate('/');
                })
                .catch((err) => {
                    alert('에러가 발생했습니다. 관리자에게 문의하세요.');
                    console.log(err.response?.status);
                    navigate('/');
                })
        }
    }, [currentCIdx, navigate])

    return (
        <Frame title="CONTACTS" name="pg detail-pg">
            {error &&
                <ErrorMessage message="ERROR" description='네트워크 오류 또는 잘못된 요청입니다.' />}
            {detail &&
                <div>
                    <div className="btns">
                        <LinkBtn name="add" icon="💘" path="/add" />
                        <LinkBtn name="edit" icon="✨" path={`/edit`} />
                        <ActionBtn name="delete" icon="🍰" type="button" handleClick={deleteContact} />
                        <LinkBtn name="list" icon="🍬" path="/" />
                    </div>
                    <div className="detail">
                        <ShowDetail detail={detail} />
                    </div>
                </div>
            }
        </Frame>
    )
}

export default DetailPg;