const getItem = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

const setItem = (key, data) => {
    const res = typeof data === "object" ? JSON.stringify(data) : data;
    return localStorage.setItem(key, res);
};

const removeItem = (key) => {
    localStorage.removeItem(key);
};

export { getItem, setItem, removeItem };
