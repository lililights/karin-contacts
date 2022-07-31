import { Link } from "react-router-dom";
import { useSetCIdxContext } from "./CIdxContextProvider"
import { ResponseList } from "../../../service/contacts/model/ContactsModel";
import { useIndexCharContext, useListStateContext, useSetIndexCharContext } from "./ListContextProvider";
import { phoneEx } from "../../../utils/Expressions";
import { useSearchContext, useSetSearchContext } from "./SearchContextProvider";
import ErrorMessage from "../../common/components/ErrorMessage";
import { useRef } from "react";

const checkEng = /^[a-zA-Z]*$/;

const ListRow = ({ cIdx, cName, cPhone, cGroup }: ResponseList) => {
    const setCIdx = useSetCIdxContext();
    const indexChar = useIndexCharContext().current;
    const setIndexChar = useSetIndexCharContext();
    const search = useSearchContext();
    const setSearch = useSetSearchContext();
    const isShowIndex = useRef<boolean>(true);

    let firstChar: string = cName.charAt(0).toUpperCase();
    !checkEng.test(firstChar) && (firstChar = 'etc.');
    isShowIndex.current = (firstChar !== indexChar);
    setIndexChar(firstChar);

    return (
        <div className="list-row">
            {isShowIndex.current
                && !search.keyword
                && <h2>{firstChar}</h2>
            }
            <Link to={'/detail'} onClick={() => { setCIdx(cIdx) }}>
                <div className="list-row-link">
                    <div className="list-row-name">{cName}</div>
                    <div className="list-row-phone">{phoneEx(cPhone)}</div>
                </div>
            </Link>
            <div className="list-row-group">
                {cGroup &&
                    <div onClick={() => {
                        setSearch({ type: 'GROUP', keyword: cGroup })
                    }}>{cGroup}</div>}
            </div>
        </div>
    )
}

const ShowList = () => {
    const listState = useListStateContext();
    const { type, keyword } = useSearchContext();
    const setIndexChar = useSetIndexCharContext();
    setIndexChar('');

    let list: ResponseList[] = [];
    if (!keyword.trim()) {
        list = listState;
    } else {
        if (type === 'INPUT') {
            listState.forEach((row: ResponseList) => {
                if (row.cName.toUpperCase().includes(keyword.trim().toUpperCase())) {
                    list.push(row);
                } else if (row.cPhone.includes(keyword.trim().replace('-', ''))) {
                    list.push(row);
                }
            })
        } else if (type === 'GROUP') {
            listState.forEach((row: ResponseList) => {
                if (row.cGroup === keyword) {
                    list.push(row);
                }
            })
        }
    }

    return (
        <div className="list">
            {type === 'INPUT'
                && keyword
                && <h3>'{keyword}' 검색 결과...</h3>}
            {list.length > 0
                && type === 'GROUP'
                && <h3>그룹명 - {keyword}</h3>}
            {list.length > 0 ?
                (list.map((row) =>
                    <ListRow key={row.cIdx} {...row} />)
                ) : (
                    <ErrorMessage
                        message={keyword ? '' : 'SORRY..'}
                        description={keyword ? '검색 결과가 없습니다.' : '등록된 연락처가 없습니다.'}
                    ></ErrorMessage>
                )
            }
        </div>
    )
}

export default ShowList;