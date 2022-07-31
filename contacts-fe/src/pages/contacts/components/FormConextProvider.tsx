import { createContext, ReactNode, useContext, useReducer } from "react"
import { RequestContact } from "../../../service/contacts/model/ContactsModel"

const initialForm: RequestContact = {
    cName: '',
    cPhone: '',
    cEmail: '',
    cBirthday: '',
    cGroup: ''
}

type Action =
    | { type: 'NAME', name: string }
    | { type: 'PHONE', phone: string }
    | { type: 'EMAIL', email: string }
    | { type: 'BIRTHDAY', birthday: string }
    | { type: 'GROUP', group: string }
    | { type: 'ALL', state: RequestContact }
    | { type: 'INIT' }

const formReducer = (state: RequestContact, action: Action) => {
    switch (action.type) {
        case 'NAME':
            return {
                ...state,
                cName: action.name
            }
        case 'PHONE':
            return {
                ...state,
                cPhone: action.phone
            }
        case 'EMAIL':
            return {
                ...state,
                cEmail: action.email
            }
        case 'BIRTHDAY':
            return {
                ...state,
                cBirthday: action.birthday
            }
        case 'GROUP':
            return {
                ...state,
                cGroup: action.group
            }
        case 'ALL':
            return action.state;
        case 'INIT':
            return initialForm;
        default:
            throw new Error('정의되지 않은 액션타입입니다.');
    }
}

const formStateContext = createContext(initialForm);
const formDispatchContext = createContext((props: Action) => { });

const FormConextProvider = ({ children }: { children: ReactNode }) => {
    const [formState, formDispatch] = useReducer(formReducer, initialForm);
    const setFormDispatch = (props: Action) => {
        formDispatch(props);
    }

    return (
        <formStateContext.Provider value={formState}>
            <formDispatchContext.Provider value={setFormDispatch}>
                {children}
            </formDispatchContext.Provider>
        </formStateContext.Provider>
    )
}

export const useFormStateContext = () => {
    const context = useContext(formStateContext);
    if (!context) {
        throw new Error('formStateContext Provider 를 찾을 수 없습니다.');
    }
    return context;
}

export const useFormDispatchContext = () => {
    const context = useContext(formDispatchContext);
    if (!context) {
        throw new Error('formDispatchContext Provider 를 찾을 수 없습니다.');
    }
    return context;
}

export default FormConextProvider;