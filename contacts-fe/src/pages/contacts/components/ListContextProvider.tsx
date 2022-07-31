import { createContext, ReactNode, useContext, useReducer, useRef } from "react"
import { ResponseList } from "../../../service/contacts/model/ContactsModel";

const initialList: ResponseList[] = [{
    cIdx: '',
    cName: '',
    cPhone: '',
    cGroup: ''
}]

type ListAction = {
    type: 'ALL',
    list: ResponseList[]
}

const listReducer = (state: ResponseList[], action: ListAction) => {
    switch (action.type) {
        case 'ALL':
            return action.list;
        default:
            throw new Error('정의되지 않은 액션타입입니다.');
    }
}

const listStateContext = createContext(initialList);
const listDispatchContext = createContext((props: ListAction) => { });

const indexCharContext = createContext({ current: '' });
const setIndexCharContext = createContext((props: string) => { });

const ListContextProvider = ({ children }: { children: ReactNode }) => {
    const [listState, listDispatch] = useReducer(listReducer, initialList);
    const setListDispatch = (props: ListAction) => {
        listDispatch(props);
    }
    const indexChar = useRef<string>('');
    const setIndexChar = (props: string) => {
        indexChar.current = props;
    }

    return (
        <listStateContext.Provider value={listState}>
            <listDispatchContext.Provider value={setListDispatch}>
                <indexCharContext.Provider value={indexChar}>
                    <setIndexCharContext.Provider value={setIndexChar}>
                        {children}
                    </setIndexCharContext.Provider>
                </indexCharContext.Provider>
            </listDispatchContext.Provider>
        </listStateContext.Provider>
    )
}

export const useListStateContext = () => {
    const context = useContext(listStateContext);
    if (!context) {
        throw new Error('listStateContext Provider 를 찾을 수 없습니다.');
    }
    return context;
}

export const useListDispatchContext = () => {
    const context = useContext(listDispatchContext);
    if (!context) {
        throw new Error('listDispatchContext Provider 를 찾을 수 없습니다.');
    }
    return context;
}

export const useIndexCharContext = () => {
    const context = useContext(indexCharContext);
    if (!context) {
        throw new Error('indexCharContext Provider 를 찾을 수 없습니다.');
    }
    return context;
}

export const useSetIndexCharContext = () => {
    const context = useContext(setIndexCharContext);
    if (!context) {
        throw new Error('setIndexCharContext Provider 를 찾을 수 없습니다.');
    }
    return context;
}

export default ListContextProvider;