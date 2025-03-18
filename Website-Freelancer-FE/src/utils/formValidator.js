import checker from "./checker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const phone = (setLoading, initialPhone = "") => [
    () => ({
        async validator(_, value) {
            if (!value) return Promise.reject("Vui lòng nhập số điện thoại!");

            const phoneRegex = /^(0[2-9]|84[2-9])[0-9]{8}$/;
            const isInvalidFormat = !phoneRegex.test(value);
            const isSameAsInitial = value === initialPhone;

            if (isInvalidFormat) return Promise.reject("Số điện thoại không hợp lệ!");
            if (isSameAsInitial) return Promise.resolve();

            const phoneExists = await checker.checkPhoneExists(value, setLoading);
            if (phoneExists) return Promise.reject("Số điện thoại đã được sử dụng!");

            return Promise.resolve();
        },
    }),
];


const email = (setLoading, initialEmail = "", requireExist = true) => [
    () => ({
        async validator(_, value) {
            if (!value) return Promise.reject("Vui lòng nhập email!");

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const isInvalidFormat = !emailRegex.test(value);
            const isSameAsInitial = value === initialEmail;

            if (isInvalidFormat) return Promise.reject("Email không đúng định dạng!");
            if (isSameAsInitial) return Promise.resolve();

            const emailExists = requireExist && await checker.checkEmailExists(value, setLoading);
            if (emailExists) return Promise.reject("Email đã được sử dụng!");

            return Promise.resolve();
        },
    }),
];

const birthday = (minAge = 18) => [
    () => ({
        validator(_, value) {
            if (!value) return Promise.reject("Vui lòng chọn ngày sinh!");

            if (!dayjs.isDayjs(value)) return Promise.reject("Ngày sinh không hợp lệ!");

            const today = dayjs();
            const age = today.diff(value, "year");

            if (value.isAfter(today, "day")) return Promise.reject("Ngày sinh không hợp lệ!");
            if (age < minAge) return Promise.reject(`Phải từ ${minAge} tuổi trở lên!`);

            return Promise.resolve();
        },
    }),
];



const fullName = () => [
    () => ({
        async validator(_, value) {
            if (!value) return Promise.reject("Vui lòng nhập họ tên!");

            value = value.trim();

            const hasInvalidChars = /[^a-zA-ZÀ-ỹ\s]/u.test(value);
            const hasExtraSpaces = /\s{2,}/.test(value);
            const isTooShort = value.length < 2;
            const isTooLong = value.length > 50;
            const isWrongCapitalization = value
                .split(/\s+/)
                .some((word) => word && word[0] !== word[0].toUpperCase());

            if (hasInvalidChars) return Promise.reject("Họ tên không hợp lệ!");
            if (hasExtraSpaces) return Promise.reject("Họ tên có khoảng trắng thừa!");
            if (isTooShort) return Promise.reject("Họ tên tối thiểu 2 ký tự!");
            if (isTooLong) return Promise.reject("Họ tên tối đa 50 ký tự!");
            if (isWrongCapitalization) return Promise.reject("Vui lòng viết hoa ký tự đầu!");

            return Promise.resolve();
        },
    }),
];

const password = ({ minLength = 8, maxLength = 50, requireUpper = false, requireLower = false, requireNumber = false, requireSpecial = false } = {}) => [
    () => ({
        validator(_, value) {
            if (!value) return Promise.reject("Vui lòng nhập mật khẩu!");
            if (value.length < minLength) return Promise.reject(`Mật khẩu tối thiểu ${minLength} kí tự!`);
            if (value.length > maxLength) return Promise.reject(`Mật khẩu tối đa ${maxLength} kí tự!`);

            if (requireUpper && !/[A-Z]/.test(value)) return Promise.reject("Mật khẩu cần ít nhất 1 chữ hoa!");
            if (requireLower && !/[a-z]/.test(value)) return Promise.reject("Mật khẩu cần ít nhất 1 chữ thường!");
            if (requireNumber && !/[0-9]/.test(value)) return Promise.reject("Mật khẩu cần ít nhất 1 số!");
            if (requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) return Promise.reject("Mật khẩu cần ít nhất 1 ký tự đặc biệt!");

            return Promise.resolve();
        },
    }),
];

const iso = (setLoading, initialISO = "") => [
    () => ({
        async validator(_, value) {
            if (!value) return Promise.reject("Vui lòng nhập ISO!");
            if (value.length < 2) return Promise.reject("ISO tối thiểu 2 kí tự!");
            if (value.length > 3) return Promise.reject("ISO tối đa 3 kí tự!");
            if (/[0-9]/.test(value)) return Promise.reject("ISO không được chứa số!");
            if (/[!@#$%^&*(),.?":{}|<>\s]/.test(value)) return Promise.reject("ISO không được chứa kí tự đặc biệt hoặc khoảng trắng!");

            const isSameAsInitial = value === initialISO;
            if (isSameAsInitial) return Promise.resolve();

            const ISOExits = await checker.checkISOExists(value, setLoading);
            if (ISOExits) return Promise.reject("ISO đã tồn tại!");

            return Promise.resolve();
        },
    }),

];
const introduce = ({ minLength = 100, maxLength = 10000 } = {}) => [
    () => ({
        validator(_, value) {
            if (!value) return Promise.reject("Vui lòng nhập giới thiệu!");
            if (value.length < minLength) return Promise.reject(`Giới thiệu tối thiểu ${minLength} kí tự!`);
            if (value.length > 10000) return Promise.reject(`Giới thiệu tối đa ${maxLength} kí tự!`);

            return Promise.resolve();
        },
    }),
];

const skills = ({ minLength = 1, maxLength = 10 } = {}) => [
    () => ({
        validator(_, value) {
            if (!value || value.length < minLength) return Promise.reject(`Vui lòng chọn ít nhất ${minLength} kỹ năng!`);
            if (value.length > maxLength) return Promise.reject(`Vui lòng chọn tối đa ${maxLength} kỹ năng!`);
            return Promise.resolve();
        },
    }),
];

const languages = ({ minLength = 1, maxLength = 20 } = {}) => [
    () => ({
        validator(_, value) {
            if (!value || value.length < minLength) return Promise.reject(`Vui lòng chọn ít nhất ${minLength} ngôn ngữ!`);
            if (value.length > maxLength) return Promise.reject(`Vui lòng chọn tối đa ${maxLength} ngôn ngữ!`);
            return Promise.resolve();
        },
    }),
];

const title = ({ minLength = 20, maxLength = 100 } = {}) => [
    () => ({
        validator(_, value) {
            if (!value) return Promise.reject("Vui lòng nhập tiêu đề!");
            if (value.length < minLength) return Promise.reject(`Tiêu đề tối thiểu ${minLength} kí tự!`);
            if (value.length > maxLength) return Promise.reject(`Tiêu đề tối đa ${maxLength} kí tự!`);
            return Promise.resolve();
        },
    }),
];

const description = ({ minLength = 1000, maxLength = 100000 } = {}) => [
    () => ({
        validator(_, value) {
            if (!value) return Promise.reject("Vui lòng nhập mô tả!");
            if (value.length < minLength) return Promise.reject(`Mô tả tối thiểu ${minLength} kí tự!`);
            if (value.length > maxLength) return Promise.reject(`Mô tả tối đa ${maxLength} kí tự!`);
            return Promise.resolve();
        },
    }),
];

const startDate = () => [
    () => ({
        validator(_, value) {
            if (!value) return Promise.reject("Vui lòng chọn ngày bắt đầu!");
            return Promise.resolve();
        },
    }),
];

const endDate = () => [
    () => ({
        validator(_, value) {
            if (!value) return Promise.reject("Vui lòng chọn ngày kết thúc!");
            return Promise.resolve();
        },
    }),
];

const content = ({ minLength = 100, maxLength = 5000 } = {}) => [
    () => ({
        async validator(_, value) {
            if (!value) return Promise.reject("Vui lòng nhập nội dung!");
            if (value.length < minLength) return Promise.reject(`Nội dung tối thiểu ${minLength} kí tự!`);
            if (value.length > maxLength) return Promise.reject(`Nội dung tối đa ${maxLength} kí tự!`);
        
            return Promise.resolve();
        },
    }),
];

const companyName = () => [
    () => ({
        async validator(_, value) {
            if (!value) return Promise.reject("Vui lòng nhập tên công ty!");

            value = value.trim();

            const hasInvalidChars = /[^a-zA-ZÀ-ỹ0-9\s&.,'-]/u.test(value);
            const hasExtraSpaces = /\s{2,}/.test(value);
            const isTooShort = value.length < 2;
            const isTooLong = value.length > 100;

            if (hasInvalidChars) return Promise.reject("Tên công ty không hợp lệ!");
            if (hasExtraSpaces) return Promise.reject("Tên công ty có khoảng trắng thừa!");
            if (isTooShort) return Promise.reject("Tên công ty tối thiểu 2 ký tự!");
            if (isTooLong) return Promise.reject("Tên công ty tối đa 100 ký tự!");

            return Promise.resolve();
        },
    }),
];

const languageName = () => [
    () => ({
        async validator(_, value) {
            if (!value) return Promise.reject("Vui lòng nhập tên ngôn ngữ!")

            value = value.trim()

            const hasNumbers = /\d/.test(value)
            const hasSpecialChars = /[^a-zA-ZÀ-ỹ\s]/u.test(value)
            const hasExtraSpaces = /\s{2,}/.test(value)
            const isTooShort = value.length < 3
            const isTooLong = value.length > 50

            if (hasNumbers) return Promise.reject("Tên ngôn ngữ không được chứa số!")
            if (hasSpecialChars) return Promise.reject("Tên ngôn ngữ không được chứa ký tự đặc biệt!")
            if (hasExtraSpaces) return Promise.reject("Tên ngôn ngữ có khoảng trắng thừa!")
            if (isTooShort) return Promise.reject("Tên ngôn ngữ tối thiểu 3 ký tự!")
            if (isTooLong) return Promise.reject("Tên ngôn ngữ tối đa 50 ký tự!")

            return Promise.resolve()
        },
    }),
]

const skillName = () => [
    () => ({
        async validator(_, value) {
            if (!value) return Promise.reject("Vui lòng nhập tên kỹ năng!")

            value = value.trim()

            const hasNumbers = /\d/.test(value)
            const hasExtraSpaces = /\s{2,}/.test(value)
            const isTooShort = value.length < 2
            const isTooLong = value.length > 40

            if (hasNumbers) return Promise.reject("Tên kỹ năng không được chứa số!")
            if (hasExtraSpaces) return Promise.reject("Tên kỹ năng có khoảng trắng thừa!")
            if (isTooShort) return Promise.reject("Tên kỹ năng tối thiểu 2 ký tự!")
            if (isTooLong) return Promise.reject("Tên kỹ năng tối đa 40 ký tự!")

            return Promise.resolve()
        },
    }),
]

const skillDescription = () => [
    () => ({
        async validator(_, value) {
            if (!value) return Promise.reject("Vui lòng nhập mô tả kỹ năng!")
            value = value.trim()
            return Promise.resolve()
        },
    }),
]
export default { phone, email, fullName, birthday, password, iso, introduce, skills, languages, title, description, startDate, endDate, content, companyName, languageName, skillName, skillDescription};
