import { ResponseContact } from "../../../service/contacts/model/ContactsModel";
import { phoneEx, printBirthday } from "../../../utils/Expressions";

type ShowDetailProps = {
    detail: ResponseContact;
}

const ShowDetail = ({ detail }: ShowDetailProps) => {
    return (
        <table className="detail-table">
            <tbody>
                <tr>
                    <td>NAME</td>
                    <td>{detail.cName}</td>
                </tr>
                <tr>
                    <td>PHONE</td>
                    <td>{phoneEx(detail.cPhone)}</td>
                </tr>
                {detail.cEmail && (
                    <tr>
                        <td>E-MAIL</td>
                        <td>{detail.cEmail}</td>
                    </tr>
                )}
                {detail.cBirthday && (
                    <tr>
                        <td>B-DAY</td>
                        <td>{printBirthday(detail.cBirthday)}</td>
                    </tr>
                )}
                {detail.cGroup && (
                    <tr>
                        <td>GROUP</td>
                        <td>{detail.cGroup}</td>
                    </tr>
                )}
            </tbody>
        </table >
    )
}

export default ShowDetail;