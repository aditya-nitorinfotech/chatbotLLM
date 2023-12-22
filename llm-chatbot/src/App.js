
// theme
import ThemeProvider from './theme/index';
// components
import ThemeSettings from './components/settings';

/* eslint-disable react/display-name */
import { HashRouter as Router, Route, BrowserRouter, Redirect, Outlet, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard";
import LoadingScreen from "./components/LoadingScreen";
import { Fragment } from 'react';
import Login from './pages/login/Login';



const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

const GeneralApp = Loadable(
  lazy(() => import("./pages/dashboard/GeneralApp")),
);
const Page404 = Loadable(lazy(() => import("./pages/Page404")));



function PrivateRoute({ children, ...rest }) {
  return (

    <Route
      {...rest}
      render={({ location }) =>
        1 == 1 ? (
          <Redirect
            to={{
              pathname: '/',
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





function App() {

  const hist = createBrowserHistory()

  return (
    < BrowserRouter history={hist} >


      <ThemeProvider>
        {/* <ThemeSettings> */}
        {" "}
        {/* <Router />{" "} */}


        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/chat">
            <DashboardLayout />
          </PrivateRoute>
          <Route exact path="/login" component={Login} />

          <Route exact path="/404" component={Page404} />

          <Route component={Page404} />
        </Switch>

        {/* </ThemeSettings> */}
      </ThemeProvider>
    </BrowserRouter>


  );
}

export default App;
