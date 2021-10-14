export default function getMonthName(item: number): string {
    var month = new Array(12);
    month[0] = "Jan";
    month[1] = "Fev";
    month[2] = "Mar";
    month[3] = "Abr";
    month[4] = "Mai";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Set";
    month[9] = "Out";
    month[10] = "Nov";
    month[11] = "Dez";

    return month[item];
}