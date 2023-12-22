/* eslint-disable react/display-name */
import { HashRouter as Router, Route, Routes, BrowserRouter, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from '../layouts/dashboard';
import LoadingScreen from '../components/LoadingScreen';


const Loadable = (Component) => (props) => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Component {...props} />
        </Suspense>
    );
};

const GeneralApp = Loadable(
    lazy(() => import("../pages/dashboard/GeneralApp")),
);
const Page404 = Loadable(lazy(() => import("../pages/Page404")));



function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                1 == 2 ? (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                )
            }
        />
    )
}

const hist = createBrowserHistory()
// eslint-disable-next-line import/no-anonymous-default-export
export default Router => (
    <BrowserRouter history={hist}>
        <Routes>
            <Route exact path="/" component={{}} />

            <PrivateRoute path="/chat">
                <DashboardLayout />
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
                <DashboardLayout />
            </PrivateRoute>
            <Route path="/404" component={{}} />
            <Route path="/login" component={{}} />

            <Route component={{}} />
        </Routes>
    </BrowserRouter>
)









