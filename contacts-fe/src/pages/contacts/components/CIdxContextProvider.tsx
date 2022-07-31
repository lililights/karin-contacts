import { createContext, ReactNode, useContext, useRef } from "react"

const cIdxContext = createContext({ current: '0' });
const setCIdxContext = createContext((cIdx: string) => { });

const CIdxContextProvider = ({ children }: { children: ReactNode }) => {
    const currentCIdx = useRef<string>('0');
    const setCIdx = (cIdx: string) => {
        currentCIdx.current = cIdx;
    }

    return (
        <cIdxContext.Provider value={currentCIdx}>
            <setCIdxContext.Provider value={setCIdx}>
                {children}
            </setCIdxContext.Provider>
        </cIdxContext.Provider>
    )
}

export const useCIdxContext = () => {
    const currentCIdx = useContext(cIdxContext);
    if (!currentCIdx) {
        throw new Error('cIdxContext Provider 를 찾을 수 없습니다.');
    }
    return currentCIdx;
}

export const useSetCIdxContext = () => {
    const setCIdx = useContext(setCIdxContext);
    if (!setCIdx) {
        throw new Error('PsetCIdxContext Provider 를 찾을 수 없습니다.');
    }
    return setCIdx;
}

export default CIdxContextProvider;