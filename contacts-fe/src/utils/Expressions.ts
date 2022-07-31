export const phoneEx = (str: string): string => {
    let result: string = str;
    const [pos1, pos2] = str.length < 10 ? [2, 6] : str.length < 11 ? [2, 7] : [3, 8];

    if (str.length > 3) {
        result = str.substring(0, pos1) + '-' + str.substring(pos1);

        if (result.length > 9) {
            result = result.substring(0, pos2) + '-' + result.substring(pos2);
        }
    }

    return result;
}

export const birthdayEx = (str: string): string => {
    let result: string = str;

    if (str.length > 4) {
        result = str.substring(0, 4) + '/' + str.substring(4);

        if (result.length > 7) {
            result = result.substring(0, 7) + '/' + result.substring(7, 9);
        }
    }

    return result;
}

export const printBirthday = (str: string): string => {
    return str.substring(0, 4) + '년 '
        + (str.charAt(5) === '0' ? str.substring(6, 7) : str.substring(5, 7)) + '월 '
        + (str.charAt(8) === '0' ? str.substring(9, 10) : str.substring(8, 10)) + '일';
}