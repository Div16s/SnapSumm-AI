
const getENV = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`❌ Environment variable ${key} is not defined`);
    }
    return value;
}

export default getENV;