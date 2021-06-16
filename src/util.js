import axios from "axios";

export const urlRoot = "https://typesfaster.herokuapp.com/";

export const getUserDetails = async () => {
    return await fetchWithToken("api/auth/get-user", "GET", null);
};

export const fetchWithToken = async (
    endpoint,
    method,
    data,
    optional = false
) => {
    const token = window.localStorage.getItem("token");
    if (token === null && !optional) return {};
    let headers = {
        "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    return await axios({
        method: method,
        url: urlRoot + endpoint,
        data: data,
        headers,
    })
        .then((res) => {
            return res.data;
        })
        .catch(async (err) => {
            if (err.response) {
                return await refreshToken().then(async (canRefresh) => {
                    if (canRefresh)
                        return await fetchWithToken(endpoint, method, data);
                    else return err.response.data;
                });
            }
        });
};

const refreshToken = async () => {
    const token = window.localStorage.getItem("refresh_token");
    if (!token) return false;
    const res = await fetch(urlRoot + "api/auth/refresh", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (res.ok) {
        const data = await res.json();
        window.localStorage.setItem("token", data.access_token);
        return true;
    }
    return false;
};
