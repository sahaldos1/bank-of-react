import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Form, Label, Input, Button } from "reactstrap";
import AccountBalance from "./AccountBalance";

export default class Credits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credits: this.props.credits,
      totalCredits: this.props.totalCredits,
      accountBalance: this.props.accountBalance,
      formDescription: "",
      formAmount: 0,
      formDate: new Date().toLocaleDateString()
    };
  }


  componentWillReceiveProps = async nextProps => {
    this.setState({
      accountBalance: nextProps.accountBalance,
      credits: nextProps.credits,
      totalCredits: nextProps.totalCredits
    });
  };

  setChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  onSubmit = (event) => {
    event.preventDefault();
    let newCredit = {
      description: this.state.formDescription,
      amount: parseFloat(this.state.formAmount),
      date: this.state.formDate
    };
    this.sendData(newCredit);
  };

  sendData = async input => {
    await this.props.onDataFetched(input);
  };

  displayCredits = () => {
    return (
      <div className="credits">
        {this.state.credits.map((credit, index) => (
          <div className="credit" key={index}>
            <div>Description: {credit.description}</div>
            <div>Amount: {credit.amount}</div>
            <div>Date: {credit.date}</div>
          </div>
        ))}
      </div>
    );
  };

  displayForm = () => {
    return (
      <div className="creditsForm">
        <Form>
          <Label for="formDescription">Credit Description:   </Label>
          <Input
            name="formDescription"
            type="text"
            placeholder="Describe the Item"
            onChange={this.setChange}
          /><br /><br />
          <Label for="formAmount">Credit Amount:   </Label>
          <Input
            name="formAmount"
            type="number"
            placeholder="0.00"
            onChange={this.setChange}
          /><br /><br />
          <Label for="formDate">Credit Date:   </Label>
          <Input
            name="formDate"
            type="text"
            value={new Date().toLocaleDateString()}
            readOnly
          />
        </Form>
        <br /><br />
        <Button onClick={this.onSubmit}>Add Credit</Button>
      </div>
    );
  };

  render() {
    var balance = this.props.accountBalance;
    balance = balance.toFixed(2);
    return (
      <div>
        <h1>Your Credits</h1>
        <h2>
          <AccountBalance accountBalance={balance} />
        </h2>
        <h2>Total Credits: {this.state.totalCredits}</h2>
        <br />
        <h3>Credit List</h3>
        {this.displayCredits()}
        <br />
        {this.displayForm()}
        <br />
        <Link to="/">Back to Home</Link>
        <br /><br />
      </div>
    );
  }
}

Credits.propTypes = {
  accountBalance: PropTypes.number.isRequired,
  credits: PropTypes.array.isRequired,
  totalCredits: PropTypes.number.isRequired
};
