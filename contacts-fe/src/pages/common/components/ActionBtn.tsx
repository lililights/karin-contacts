interface ActionBtnProps {
    name: string;
    icon?: string;
    type?: string;
    handleClick?: () => void;
}

const ActionBtn = ({ name, icon, type, handleClick }: ActionBtnProps) => {

    if (type && (type === 'submit' || type === 'button')) {
        return (
            <button className="btn" type={type} onClick={handleClick}>
                <div className="icon">{icon}</div>
                <div className="menu">{name}</div>
            </button>
        )

    } else {
        return <div>[{name}]에 해당하는 버튼이 존재하지 않습니다.</div>
    }
}

export default ActionBtn;