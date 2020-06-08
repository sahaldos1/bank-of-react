import React, { Component } from "react";

export default class AccountBalance extends Component {
  render() {
    return (
      <div>
        <h2>Current Account Balance: {this.props.accountBalance}</h2>
      </div>
    );
  }
}