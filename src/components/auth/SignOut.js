import { useEffect } from "react";

const SignOut = (props) => {
    useEffect(() => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("refresh_token");
        props.history.push("/login");
        props.signoutCallback();
    });
    return <div></div>;
};

export default SignOut;
