export default function cleanDate(date, days) {
    var result = new Date(date.toString());
    result.setDate(result.getDate() + days);
    return result;
}

export function toJSONLocal(date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
}
