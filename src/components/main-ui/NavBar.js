import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";
import { Fragment, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function NavBar(props) {
    const location = useLocation();
    const disButton = useRef();
    const navigation = [
        { name: "Home", href: "/", current: location.pathname === "/" },
        { name: "Race", href: "/race", current: location.pathname === "/race" },
    ];
    return (
        <Disclosure as="nav" className="bg-indigo-800">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center p-4 text-indigo-400 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    ref={disButton}
                                >
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        {open ? (
                                            <>
                                                <span
                                                    aria-hidden="true"
                                                    className="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out rotate-45"
                                                ></span>
                                                <span
                                                    aria-hidden="true"
                                                    className="block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out opacity-0"
                                                ></span>
                                                <span
                                                    aria-hidden="true"
                                                    className="block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out -rotate-45"
                                                ></span>
                                            </>
                                        ) : (
                                            <>
                                                <span
                                                    aria-hidden="true"
                                                    className="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out -translate-y-1.5"
                                                ></span>
                                                <span
                                                    aria-hidden="true"
                                                    className="block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out"
                                                ></span>
                                                <span
                                                    aria-hidden="true"
                                                    className="block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out translate-y-1.5"
                                                ></span>
                                            </>

                                            //     <XIcon
                                            //         className="block h-6 w-6"
                                            //         aria-hidden="true"
                                            //     />
                                            // ) : (
                                            //     <MenuIcon
                                            //         className="block h-6 w-6"
                                            //         aria-hidden="true"
                                            //     />
                                        )}
                                    </div>
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0 flex items-center text-lg text-white font-mono font-extrabold select-none">
                                    TypeFaster
                                </div>
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? "bg-indigo-900 text-white"
                                                        : "text-indigo-300 hover:bg-indigo-700 hover:text-white",
                                                    "px-3 py-2 rounded-md text-sm font-medium select-none"
                                                )}
                                                aria-current={
                                                    item.current
                                                        ? "page"
                                                        : undefined
                                                }
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {props.authenticated ? (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <button className="bg-indigo-800 p-1 rounded-full text-indigo-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus:ring-white">
                                        <span className="sr-only">
                                            View notifications
                                        </span>
                                        <BellIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="ml-3 relative">
                                        {({ open }) => (
                                            <>
                                                <div>
                                                    <Menu.Button className="bg-indigo-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus:ring-white">
                                                        <span className="sr-only">
                                                            Open user menu
                                                        </span>
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            src="https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255532-stock-illustration-profile-placeholder-male-default-profile.jpg"
                                                            alt=""
                                                        />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items
                                                        static
                                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                    >
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    to="#"
                                                                    className={classNames(
                                                                        active
                                                                            ? "bg-indigo-100"
                                                                            : "",
                                                                        "block px-4 py-2 text-sm text-indigo-700"
                                                                    )}
                                                                >
                                                                    Your Profile
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    to="#"
                                                                    className={classNames(
                                                                        active
                                                                            ? "bg-indigo-100"
                                                                            : "",
                                                                        "block px-4 py-2 text-sm text-indigo-700"
                                                                    )}
                                                                >
                                                                    Settings
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    to="/sign-out"
                                                                    className={classNames(
                                                                        active
                                                                            ? "bg-indigo-100"
                                                                            : "",
                                                                        "block px-4 py-2 text-sm text-indigo-700"
                                                                    )}
                                                                >
                                                                    Sign out
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </>
                                        )}
                                    </Menu>
                                </div>
                            ) : (
                                <div className="hidden flex-1 sm:flex items-center justify-end mr-6">
                                    <div className="flex space-x-2">
                                        <Link
                                            to="/login"
                                            className="text-indigo-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium border-indigo-200 border-2"
                                        >
                                            Login
                                        </Link>
                                        <div className="flex space-x-4">
                                            <Link
                                                to="/sign-up"
                                                className="text-indigo-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium border-indigo-200 border-2"
                                            >
                                                Sign Up
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <Transition
                        show={open}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Disclosure.Panel className="sm:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={classNames(
                                            item.current
                                                ? "bg-indigo-900 text-white"
                                                : "text-indigo-300 hover:bg-indigo-700 hover:text-white",
                                            "block px-3 py-2 rounded-md text-base font-medium"
                                        )}
                                        aria-current={
                                            item.current ? "page" : undefined
                                        }
                                        onClick={() =>
                                            disButton.current.click()
                                        }
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                {!props.authenticated && (
                                    <>
                                        <Link
                                            key="login"
                                            to="/login"
                                            className="text-indigo-300 hover:bg-indigo-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                            onClick={() =>
                                                disButton.current.click()
                                            }
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            key="signup"
                                            to="/sign-up"
                                            className="text-indigo-300 hover:bg-indigo-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                            onClick={() =>
                                                disButton.current.click()
                                            }
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    );
}

export default NavBar;
