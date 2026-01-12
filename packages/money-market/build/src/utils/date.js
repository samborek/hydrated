export function toUnixTimestamp(date) {
    const ts = typeof date === "number" ? date : date.getTime();
    return Math.floor(ts / 1000);
}
export function getAdjustedTimestamp(date, value = 0, unit = "day", operation = "subtract") {
    const modifier = operation === "add" ? 1 : -1;
    const adjustedValue = value * modifier;
    switch (unit) {
        case "day":
            date.setDate(date.getDate() + adjustedValue);
            break;
        case "month":
            date.setMonth(date.getMonth() + adjustedValue);
            break;
        case "year":
            date.setFullYear(date.getFullYear() + adjustedValue);
            break;
    }
    return date.getTime();
}
