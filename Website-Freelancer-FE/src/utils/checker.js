import checkApi from "@api/checkApi";

const checkEmailExists = async (email, setLoading) => {
    setLoading(true);
    const response = await checkApi.checkEmailExists(email);
    setLoading(false);
    if (response.status == 200 && response.data) {
        return true;
    }

    return false;
};

const checkPhoneExists = async (phone, setLoading) => {
    setLoading(true);
    const response = await checkApi.checkPhoneExists(phone);
    setLoading(false);

    if (response.status === 200 && response.data) {
        return true;
    }
    return false;
};

const checkISOExists = async (iso, setLoading) => {
    setLoading(true);
    const response = await checkApi.checkISOExists(iso);
    setLoading(false);

    if (response.status === 200 && response.data) {
        return true;
    }
    return false;
}

export default { checkEmailExists, checkPhoneExists, checkISOExists };