import { React } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";

export default function ProtectedRoute({ children, ...props }) {
    const { isAuthenticated } = useAppContext();
    return (
        <Route 
          {...props} 
          render={props => (
            isAuthenticated ?
              children :
              <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
          )} 
        />
    );
}
