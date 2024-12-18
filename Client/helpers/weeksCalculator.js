import { fDays } from "./fConstants";

export function getWeeksInMonth(year, month) {
    // Get the first day of the month
    const whichDay = new Date(year, month).getDay(); // Day of the week (0 = Sunday, ..., 6 = Saturday)

    // Get the total days in the month
    const lastDay = new Date(year, month + 1, 0).getDate(); // Last day of the month


    // Calculate the number of weeks
    const totalWeeks = calculateWeeks(1, lastDay, whichDay);

    return totalWeeks; // Either 4 or 5
}

const calculateWeeks = (firstDay, lastDay, whichDay) => {
    let totalWeeks = 0;
    let findWedDate = 0;
    let totalNum = 0;
    switch (fDays[whichDay]) {
        case "Mon":
            findWedDate = firstDay + 2;
            break;
        case "Tue":
            findWedDate = firstDay + 1;

            break;
        case "Wed":
            findWedDate = firstDay;

            break;
        case "Thur":
            findWedDate = firstDay + 7 - 1;

            break;
        case "Fri":
            findWedDate = firstDay + 7 - 2;

            break;
        case "Sat":
            findWedDate = firstDay + 7 - 3;

            break;
        case "Sun":
            findWedDate = firstDay + 7 - 4;

            break;
    }

    if (findWedDate > 0) {
        while (findWedDate <= lastDay) {
            totalWeeks++;
            findWedDate += 7;
        }

    }
    return totalWeeks;
}

export const getCurrentWeek = (year, month) => {
    const lastDate = new Date(year, month + 1, 0).getDate();
    const curDate = new Date().getDate();
    let totalWeeks = getWeeksInMonth(year, month);
    if (curDate == lastDate) {
        return totalWeeks;
    } else {
        let curWeekNo = Math.floor(curDate / 7) + 1;
        if (curWeekNo > totalWeeks) {
            return totalWeeks;
        } else {
            return curWeekNo;
        }
    }
}