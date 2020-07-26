import React from "react";
import { withRouter } from "react-router-dom";

function withAuth(Component) {
  const Auth = (props) => {
    const isAuth = Boolean(localStorage.getItem("token"));

    if (!isAuth) {
      props.history.push("/login");
    }

    return isAuth ? (
      <Component {...props} />
    ) : (
      <div>You are not authorized!!</div>
    );
  };

  return withRouter(Auth);
}

export default withAuth;
