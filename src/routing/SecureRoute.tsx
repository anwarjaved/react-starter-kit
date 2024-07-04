import React from "react";
import { Navigate } from "react-router";

const SecureRoute: React.FC<RouteProps> = (props) => {
	if (!props.isSignedIn) {
		return (<Navigate to="/sign-in" replace />);
	}
	return props.children;
};

export default SecureRoute;