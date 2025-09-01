// utils/date.ts
export const formatDate = (dateString: string, includeTime = false) => {
    if (!dateString) return "Chưa có";

    try {
        const [datePart, timePart] = dateString.split(' ');
        const [day, month, year] = datePart.split('/');

        if (includeTime) {
            const [hours, minutes] = timePart.split(':');
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        }

        return `${day}/${month}/${year}`;
    } catch (error) {
        return dateString;
    }
};