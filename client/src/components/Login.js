import React from "react";
import { withRouter } from "react-router-dom";
import api from "../helpers/api";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    department: "",
  };

  submit = async (e) => {
    e.preventDefault();

    try {
      const { username, password, department } = this.state;

      const result = await api.post("/login", {
        username,
        password,
        department,
      });
      localStorage.setItem("token", result.data.token);
      this.props.history.push("/users");
    } catch (err) {
      console.error(err);
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    return (
      <>
        <h1>Login</h1>

        <form onSubmit={this.submit}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <input
            type="text"
            id="department"
            placeholder="Department"
            onChange={this.handleChange}
            value={this.state.department}
          />
          <button type="submit">Login</button>
        </form>
      </>
    );
  }
}

export default withRouter(Login);
