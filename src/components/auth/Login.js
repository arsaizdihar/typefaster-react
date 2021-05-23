import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { urlRoot } from "../../util";

const Login = (props) => {
    const msgParam = new URLSearchParams(props.location.search).get("msg");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();
    const [errors, setErrors] = useState({
        email: null,
        password: null,
    });

    useEffect(() => {
        if (props.authenticated) history.push("/");
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(urlRoot + "api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        const data = await res.json();
        if ("error" in data) {
            setErrors({ password: data.error });
            return;
        }
        window.localStorage.setItem("token", data.access_token);
        window.localStorage.setItem("refresh_token", data.refresh_token);
        props.authenticate();
        history.push("/");
    };
    return (
        <div className="w-full lg:w-1/2 md:m-auto  md:w-3/4 p-8">
            <form noValidate autoComplete="off" onSubmit={handleFormSubmit}>
                {msgParam ? (
                    <h1 className="text-2xl font-bold text-red-600">
                        {msgParam}
                    </h1>
                ) : (
                    <h1 className="text-2xl font-bold">Login here.</h1>
                )}
                <p className="text-gray-600 text-sm">
                    Don't have an account?{" "}
                    <Link to="/sign-up" className="text-gray-700 font-semibold">
                        Sign up here.
                    </Link>
                </p>
                <div className="mt-8 mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:border-gray-800 h-10"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <span className="text-sm text-red-600 font-semibold">
                        {errors.email}
                    </span>
                </div>
                <div className="mt-6 mb-2">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:border-gray-800 h-10"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <span className="text-sm text-red-600 font-semibold">
                        {errors.password}
                    </span>
                </div>
                <button
                    type="submit"
                    className="border-2 border-gray-100 focus:outline-none bg-indigo-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-indigo-700"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
