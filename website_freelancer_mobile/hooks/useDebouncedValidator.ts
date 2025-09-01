import debounce from "lodash.debounce";

export const debounceValidator = (
    validator: (rule: any, value: any) => Promise<void>,
    wait: number = 800
) => {
    let lastCallReject: ((reason?: any) => void) | null = null;

    const debounced = debounce(async (val: any, resolve: () => void, reject: (err: any) => void) => {
        try {
            await validator(null, val);
            resolve();
        } catch (err) {
            reject(err);
        }
    }, wait);

    return (_: any, value: any) => {
        return new Promise<void>((resolve, reject) => {
            if (lastCallReject) lastCallReject();
            lastCallReject = reject;

            debounced(value, resolve, reject);
        });
    };
};
