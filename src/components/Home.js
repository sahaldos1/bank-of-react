  
import React, { Component } from "react";
import AccountBalance from "./AccountBalance";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var balance = this.props.accountBalance;
    balance = balance.toFixed(2);


    return (
      <div><br></br>
        <h1>Bank of React</h1><br></br>
        <div className="links">
        <div><br></br>
            <Link to="/userProfile">User Profile</Link>
          </div> <br></br>
          <div>
            <Link to="/LogIn">Change User</Link>
          </div> <br></br>
          <div>
            <Link to="/debits">Debits</Link>
          </div><br></br>
          <div>
            <Link to="/credits">Credits</Link>
          </div><br></br>
        </div>
        <div className="AccountSummary">
        <div><br></br>
        <AccountBalance accountBalance={balance} /><br></br>
          <h2>Current Debit: {this.props.totalDebits}</h2>
        </div><br></br>
        <div>
          <h2>Current Credit: {this.props.totalCredits}</h2>
        </div><br></br>
        </div>      
      </div>
    );
  }
}

export default Home;

Home.propTypes = {
  accountBalance: PropTypes.number.isRequired
};
