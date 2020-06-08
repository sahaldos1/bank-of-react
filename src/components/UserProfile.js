import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserProfile extends Component {
  render() {
    return (
      <div className="userProfilePage">
        <h1>User Profile</h1><br></br>

        <div>Username: {this.props.userName}</div>
        <br></br>
        <div>Member Since: {this.props.memberSince}</div>
        <br></br>
        <Link to="/">Back to Home</Link>
        <br /><br />
      </div>
    );
  }
}