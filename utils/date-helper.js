export const monthDaysCount = {
    '1': 31,
    '2': 29,
    '3': 31,
    '4': 30,
    '5': 31,
    '6': 30,
    '7': 31,
    '8': 31,
    '9': 30,
    '10': 31,
    '11': 30,
    '12': 31,
}

export const isDateValid = (dateString) =>
    dateString.match(/(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/);

export const convertDateStringToDateObject = (dateString, separatedBy) => {
    const date = dateString.split(separatedBy);
    return new Date(date[2] + '/' + date[1] + '/' + date[0]);
}

export const isMonthValid = ({month}) => {
    return !isNaN(month) && month >= 1 && month <= 12 ? 
        { isValid: true, message: '' } : { isValid: false, message: 'Month has to be between 1 and 12' }
}

export const isDayValid = ({day, month}) => {
    const countDaysOfTheMonth = monthDaysCount[month];
    return countDaysOfTheMonth && day <= countDaysOfTheMonth ? 
        { isValid: true, message: '' } : { isValid: false, message: `${day} is not a valid day for month ${month}` }
}

export const areDatesEqualWithoutHour = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();
}