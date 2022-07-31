import ContactsService from "../../service/contacts/ContactsService";
import Frame from "../common/components/Frame"
import ShowList from "./components/ShowList";
import ErrorMessage from "../common/components/ErrorMessage";
import LinkBtn from "../common/components/LinkBtn"
import { ChangeEvent, useEffect, useState } from "react";
import { useListDispatchContext } from "./components/ListContextProvider";
import { useSearchContext, useSetSearchContext } from "./components/SearchContextProvider";

const ListPg = () => {
    const contactsService = new ContactsService();
    const [error, setError] = useState(false);
    const listDispatch = useListDispatchContext();
    const { type, keyword } = useSearchContext();
    const setSearch = useSetSearchContext();
    const getKeyword = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch({ type: 'INPUT', keyword: e.target.value });
    }

    useEffect(() => {
        contactsService
            .loadContactsList()
            .then((data) => listDispatch({ type: 'ALL', list: data }))
            .catch(() => setError(true))
    }, []) // eslint-disable-line

    return (
        <Frame title="CONTACTS" name="pg list-pg">
            {error ?
                <ErrorMessage message="ERROR" description="리스트 불러오기에 실패했습니다. 관리자에게 문의하세요." />
                :
                <div>
                    <div className="btns">
                        <LinkBtn name="add" icon="💘" path="/add" />
                    </div>
                    <input
                        name="search"
                        className="search-input"
                        value={(type === 'INPUT' ? keyword : '')}
                        placeholder="🔍 SEARCH"
                        onChange={getKeyword}
                    />
                    <ShowList />
                </div>
            }
        </Frame>
    )
}

export default ListPg;