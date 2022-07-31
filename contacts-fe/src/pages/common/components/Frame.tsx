import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useSetSearchContext } from "../../contacts/components/SearchContextProvider";
import { isWindows } from "react-device-detect";

interface FrameProps {
    title: string;
    name: string;
    children: ReactNode;
}

const Frame = ({ title, name, children }: FrameProps) => {
    const navigate = useNavigate();
    const setSearch = useSetSearchContext();

    return (
        <section>
            <div id="title" onClick={() => {
                navigate('/');
                setSearch({ type: 'NONE', keyword: '' });
            }}>
                <h1 className={isWindows ? 'title-win' : ''}>{title}</h1>
            </div>
            <div className={name}>
                {children}
            </div>
        </section >
    )
}

export default Frame;