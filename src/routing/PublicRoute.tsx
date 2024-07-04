import React from "react";
import { Navigate } from "react-router";


const PublicRoute: React.FC<RouteProps> = (props) => {
	if (props.isSignedIn) {
		return (<Navigate to="/" replace />);
	}
	return props.children;
};

export default PublicRoute;