import React from "react";
import { Route, Switch } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Welcome from "../pages/Welcome";
import Dashboard from "../pages/Dashboard";
import Locations from "../pages/Locations";
import ProtectedRoute from "./ProtectedRoute";

export default function MainRoutes() {
    return (
        <Switch>
            <Route path={['/login', '/welcome']}>
                <AuthLayout>
                    <Route path='/login' component={Login} />
                    <Route path='/welcome' component={Welcome} />
                </AuthLayout>
            </Route>            
            <ProtectedRoute exact path={['/', '/locations']}>
                <MainLayout>                    
                    <Route path='/locations' component={Locations} />
                    <Route exact path='/' component={Dashboard} />
                </MainLayout>
            </ProtectedRoute>
            {/* Finally, catch all unmatched routes */}
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}