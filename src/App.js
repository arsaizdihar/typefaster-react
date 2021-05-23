import NavBar from "./components/main-ui/NavBar";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Home from "./components/main-ui/Home";
import Race from "./components/main-ui/Race";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import { useEffect, useState } from "react";
import { getUserDetails } from "./util";
import SignOut from "./components/auth/SignOut";

const publicPages = ["/sign-up", "/login"];

const checkPublicPath = (path) => {
    for (let i = 0; i < publicPages.length; i++) {
        if (path.startsWith(publicPages[i])) return true;
    }
    return false;
};

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const location = useLocation();
    let history = useHistory();
    useEffect(() => {
        const getData = async () => {
            if (checkPublicPath(location.pathname)) return;
            const data = await getUserDetails();
            if (!data || !data.email)
                history.push("/login?msg=Please login first");
            else setAuthenticated(true);
        };
        getData();
    }, [history, location.pathname]);
    return (
        <>
            <NavBar authenticated={authenticated} />
            <div className="max-w-7xl m-auto">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/race" component={Race} />
                    <Route
                        path="/sign-up"
                        render={(props) => (
                            <SignUp
                                {...props}
                                authenticate={() => setAuthenticated(true)}
                                authenticated={authenticated}
                            />
                        )}
                    />
                    <Route
                        path="/login"
                        render={(props) => (
                            <Login
                                {...props}
                                authenticate={() => setAuthenticated(true)}
                                authenticated={authenticated}
                            />
                        )}
                    />
                    <Route
                        path="/sign-out"
                        render={(props) => (
                            <SignOut
                                {...props}
                                signoutCallback={() => setAuthenticated(false)}
                            />
                        )}
                    />
                </Switch>
            </div>
        </>
    );
}

export default App;
