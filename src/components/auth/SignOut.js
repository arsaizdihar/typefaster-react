import { useEffect } from "react";

const SignOut = (props) => {
    useEffect(() => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("refresh_token");
        props.signoutCallback();
        props.history.push("/login");
    });
    return <div></div>;
};

export default SignOut;
