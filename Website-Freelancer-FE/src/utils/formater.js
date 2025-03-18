import { format } from "@cloudinary/url-gen/actions/delivery";
import dayjs from "dayjs";

function formatCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(value);
}

function timePeriodFromNow(day) {
    const currentDate = dayjs();
    const hoursDiff = currentDate.diff(day, "hour");
    const daysDiff = currentDate.diff(day, "day");
    const monthsDiff = currentDate.diff(day, "month");

    if (monthsDiff > 0) {
        return `${monthsDiff} tháng`
    } else if (daysDiff > 0) {
        return `${daysDiff} ngày`
    } else {
        return `${hoursDiff} giờ`
    }
}

function formatDate(date) {
    return dayjs(date).format("DD/MM/YYYY");
}

export default { formatCurrency, timePeriodFromNow, formatDate };