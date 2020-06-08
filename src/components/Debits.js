import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Form, Label, Input, Button } from "reactstrap";
import AccountBalance from "./AccountBalance";

export default class Debits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debits: this.props.debits,
      totalDebits: this.props.totalDebits,
      accountBalance: this.props.accountBalance,
      formDescription: "",
      formAmount: 0,
      formDate: new Date().toLocaleDateString()
    };
  }

  componentWillReceiveProps = async nextProps => {
    this.setState({
      accountBalance: nextProps.accountBalance,
      debits: nextProps.debits,
      totalDebits: nextProps.totalDebits
    });
  };

  setChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    let newDebit = {
      description: this.state.formDescription,
      amount: parseFloat(this.state.formAmount),
      date: this.state.formDate
    };
    this.sendData(newDebit);
  };

  sendData = async input => {
    await this.props.onDataFetched(input);
  };

  displayDebits = () => {
    return (
      <div className="debits">
        {this.state.debits.map((debit, index) => (
          <div className="debit" key={index}>
            <div>Item: {debit.description}</div>
            <div>Cost: {debit.amount}</div>
            <div>Date: {debit.date}</div>
          </div>
        ))}
      </div>
    );
  };

  displayForm = () => {
    return (
      <div className="debitsForm">
        <Form>
          <Label for="formDescription">Debit Description:   </Label>
          <Input
            name="formDescription"
            type="text"
            placeholder="Describe the Item"
            onChange={this.setChange}
          /><br /><br />
          <Label for="formAmount">Debit Amount:   </Label>
          <Input
            name="formAmount"
            type="number"
            placeholder="0.00"
            onChange={this.setChange}
          /><br /><br />
          <Label for="formDate">Debit Date:   </Label>
          <Input
            name="formDate"
            type="text"
            value={new Date().toLocaleDateString()}
            readOnly
          />
        </Form>
        <br /><br />
        <Button onClick={this.onSubmit}>Add Debit</Button>
      </div>
    );
  };

  render() {
    var balance = this.props.accountBalance;
    balance = balance.toFixed(2);

    return (
      <div>
        <h1> Your Debits</h1>
        <h2>
          <AccountBalance accountBalance={balance} />
        </h2>
        <h2>Total Debits: {this.state.totalDebits}</h2>
        <br />
        <h3>Debit List</h3>
        {this.displayDebits()}
        <br />
        {this.displayForm()}
        <br />
        <Link to="/">Back to Home</Link>
        <br /><br />
      </div>
    );
  }
}

Debits.propTypes = {
  accountBalance: PropTypes.number.isRequired,
  debits: PropTypes.array.isRequired,
  totalDebits: PropTypes.number.isRequired
};