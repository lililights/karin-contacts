import LinkBtn from "./LinkBtn";

type ErrorMessageProps = {
    message: string;
    description: string;
}

const ErrorMessage = ({ message, description }: ErrorMessageProps) => {
    return (
        <div className="error">
            <h3>{message}</h3>
            {description}
            <LinkBtn name=">> list" icon="👻" path="/" />
        </div>
    )
}

export default ErrorMessage;