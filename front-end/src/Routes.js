import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import PrivateRoute from './auth/PrivateRoute';

/**
 * The top-level routing component for the entire app.
 *
 * This component renders a Router from react-router-dom that
 * contains a Switch and two Route components. The first
 * Route component renders the UserInfoPage component when
 * the user visits the root URL ("/"), and the second Route
 * component renders the LogInPage component when the user
 * visits the "/login" URL.
 * The `Routes` component sets up the routing for the application.
 * 
 * It uses the `Router` component from `react-router-dom` to enable
 * client-side navigation. Within the router, a `Switch` is used to
 * render the first matching route among its children.
 * 
 * The following routes are defined:
 * - The root path ("/") renders the `UserInfoPage` component.
 * - The "/login" path renders the `LogInPage` component.
 * 
 * Each route uses the `exact` prop to ensure that the route only
 * matches when the path is exactly the same as the current URL.
 */
export const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute path="/" exact>
                    <UserInfoPage />
                </PrivateRoute>
                <Route path="/login" exact>
                    <LogInPage />
                </Route>
                <Route path="/signup">
                    <SignUpPage />
                </Route>
            </Switch>
        </Router>
    );
}