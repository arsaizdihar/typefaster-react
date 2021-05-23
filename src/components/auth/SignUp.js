import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { urlRoot } from "../../util";

const SignUp = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [loadingPercent, setLoadingPercent] = useState(0);
    let history = useHistory();
    const [errors, setErrors] = useState({
        username: null,
        email: null,
        password: null,
    });

    useEffect(() => {
        if (props.authenticated) history.push("/");
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let errors = {};
        if (username === "") errors.username = "Username is required.";
        if (email === "") errors.email = "Email is required.";
        else if (
            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                email
            )
        )
            errors.email = "Email is not valid.";
        if (password === "") errors.password = "Password is required.";
        else if (password2 === "") errors.password = "Please confirm password.";
        else if (password !== password2)
            errors.password = "Password doesn't match.";
        if (errors.username || errors.email || errors.password) {
            setErrors(errors);
            console.log("error");
            return;
        }
        axios
            .post(
                urlRoot + "api/auth/sign-up",
                {
                    username: username,
                    email: email,
                    password: password,
                },
                {
                    headers: { "Content-Type": "application/json" },
                    onUploadProgress: (e) =>
                        setLoadingPercent(
                            Math.floor((e.loaded / e.total) * 100)
                        ),
                }
            )
            .then((res) => {
                const data = res.data;
                console.log(res);
                console.log(data);
                window.localStorage.setItem("token", data.access_token);
                window.localStorage.setItem(
                    "refresh_token",
                    data.refresh_token
                );
                props.authenticate();
                history.push("/");
            })
            .catch((error) => {
                setErrors({ password: error.response.data.error });
                return;
            });
    };
    return (
        <div className="w-full lg:w-1/2 md:m-auto  md:w-3/4 p-8">
            <form noValidate autoComplete="off" onSubmit={handleFormSubmit}>
                <h1 className="text-2xl font-bold">Sign up here.</h1>
                <p className="text-gray-600 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-gray-700 font-semibold">
                        Log in here.
                    </Link>
                </p>
                <div className="mt-8 mb-4">
                    <label
                        htmlFor="username"
                        className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:border-gray-800 h-10"
                        placeholder="Your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    ></input>
                    <span className="text-sm text-red-600 font-semibold">
                        {errors.username}
                    </span>
                </div>
                <div className="mt-6 mb-6">
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
                        htmlFor="password1"
                        className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password1"
                        className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:border-gray-800 h-10"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        name="password2"
                        className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:border-gray-800 h-10"
                        placeholder="Password confirmation"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    ></input>
                    <span className="text-sm text-red-600 font-semibold">
                        {errors.password}
                    </span>
                </div>
                {!loadingPercent === 0 ||
                    (!loadingPercent === 100 && (
                        <div className="relative pt-1">
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                                <div
                                    style={{
                                        width: `${loadingPercent.toString()}%`,
                                    }}
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                                ></div>
                            </div>
                        </div>
                    ))}
                {loadingPercent === 100 && !errors.password && (
                    <span className="text-sm text-green-500 font-semibold">
                        Sign Up success! Redirecting...
                    </span>
                )}
                <button
                    type="submit"
                    className="border-2 border-gray-100 focus:outline-none bg-indigo-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-indigo-700"
                >
                    Sign Up Now
                </button>
            </form>
        </div>
    );
};

export default SignUp;
