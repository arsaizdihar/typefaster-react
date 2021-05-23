import axios from "axios";

export const urlRoot = "https://typesfaster.herokuapp.com/";

export const getUserDetails = async () => {
    return await fetchWithToken("api/auth/get-user", "GET", null);
};

export const fetchWithToken = async (endpoint, method, data) => {
    const token = window.localStorage.getItem("token");
    return await axios({
        method: method,
        url: urlRoot + endpoint,
        data: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            if (err.response) {
                if (err.response.status === 422) {
                    refreshToken().then((canRefresh) => {
                        if (canRefresh)
                            return fetchWithToken(endpoint, method, data);
                    });
                } else {
                    return err.response.data;
                }
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
