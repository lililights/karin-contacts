import { createContext, ReactNode, useContext, useState } from "react"

type SearchProps = { type: 'INPUT' | 'GROUP' | 'NONE', keyword: string };
const initialSearch: SearchProps = { type: 'NONE', keyword: '' };

const searchContext = createContext(initialSearch);
const setSearchContext = createContext((props: SearchProps) => { });

const SearchContextProvider = ({ children }: { children: ReactNode }) => {
    const [search, setSearch] = useState<SearchProps>(initialSearch);
    const setSetSearch = (props: SearchProps) => {
        setSearch(props);
    }

    return (
        <searchContext.Provider value={search}>
            <setSearchContext.Provider value={setSetSearch}>
                {children}
            </setSearchContext.Provider>
        </searchContext.Provider>
    )
}

export const useSearchContext = () => {
    const context = useContext(searchContext);
    if (!context) {
        throw new Error('searchContext Provider 를 찾을 수 없습니다.');
    }
    return context;
}

export const useSetSearchContext = () => {
    const context = useContext(setSearchContext);
    if (!context) {
        throw new Error('setSearchContext Provider 를 찾을 수 없습니다.');
    }
    return context;
}

export default SearchContextProvider;