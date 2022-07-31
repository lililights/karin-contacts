import { useNavigate } from "react-router-dom";
import { useSetSearchContext } from "../../contacts/components/SearchContextProvider";
import { isWindows } from "react-device-detect";

interface LinkBtnProps {
    name: string;
    icon?: string;
    path?: string;
}

const LinkBtn = ({ name, icon, path }: LinkBtnProps) => {
    const navigate = useNavigate();
    const setSearch = useSetSearchContext();

    if (name === 'cancel') {
        return (
            <div className="btn" onClick={() => navigate(-1)}>
                <div className="icon">{icon}</div>
                <div className={isWindows ? 'menu menu-win' : 'menu'}>{name}</div>
            </div>
        )

    } else if (!path) {
        return (
            <div>[{name}]에 해당하는 버튼이 존재하지 않습니다.</div>
        )

    } else {
        return (
            <div className="btn" onClick={() => {
                navigate(path);
                setSearch({ type: 'NONE', keyword: '' });
            }}>
                <div className="icon">{icon}</div>
                <div className={isWindows ? 'menu menu-win' : 'menu'}>{name}</div>
            </div>
        )
    }
}

export default LinkBtn;