import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";


class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        userName: "",
        password: ""
      },
      redirect: false
    };
  }

  handleChange = (event) => {
    const updatedUser = { ...this.state.user };
    const inputField = event.target.name;
    const inputValue = event.target.value;
    updatedUser[inputField] = inputValue;

    this.setState({ user: updatedUser });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.logIn(this.state.user);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/userProfile" />;
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div><br></br><br></br>
            <label htmlFor="userName">User Name</label>{"     "}
            <input
              type="text"
              name="userName"
              onChange={this.handleChange}
              value={this.state.user.userName}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>{"       "}
            <input type="password" name="password" />
          </div><br></br>
          <button>Log In</button>
        </form>
        <br></br><br></br><br></br>
        <Link to="/">Back to Home</Link>
        <br /><br />
      </div>
    );
  }
}

export default LogIn;