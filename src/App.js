import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import LogIn from "./components/LogIn";
import Debits from "./components/Debits";
import Credits from "./components/Credits";


class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 0,
      debits: [],
      totalDebits: 0,
      credits: [],
      totalCredits: 0,
      currentUser: {
       userName: "John Smith",
       memberSince: "02/14/20"
      }
    }
  }

  componentDidMount = async () => {
    await this.getDebit();
    await this.getCredit();
  };

  getDebit = async () => {
    try {
      let result = await axios.get(`https://moj-api.herokuapp.com/debits`);
      this.updateDebits(result.data);
    } catch (error) {
      console.log(error);
    }
  };


  updateDebits = async input => {
    try {
      for (let i in input) {
        let currentDebit = input[i];
        this.setState(prevState => ({
          debits: [...prevState.debits, currentDebit],
          totalDebits: prevState.totalDebits + currentDebit.amount,
          accountBalance: prevState.accountBalance - currentDebit.amount
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  setDebits = input => {      
    this.setState(prevState => ({
    debits: [...prevState.debits, input],
    totalDebits: prevState.totalDebits + input.amount
    }));
    this.getBalance();
  };

  getCredit = async () => {
    try {
      let result = await axios.get(`https://moj-api.herokuapp.com/credits`);
      this.updateCredits(result.data);
    } catch (error) {
      console.log(error);
    }
  };


  updateCredits = async input => {
    try {
      for (let i in input) {
        let currentCredit = input[i];
        this.setState(prevState => ({
          credits: [...prevState.credits, currentCredit],
          totalCredits: prevState.totalCredits + currentCredit.amount,
          accountBalance: prevState.accountBalance + currentCredit.amount
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  setCredits = input => {
    this.setState(prevState => ({
      credits: [...prevState.credits, input],
      totalCredits: prevState.totalCredits + input.amount
    }));
    this.getBalance();
  };

  getBalance = () => {
    this.setState(prevState => ({
      accountBalance: prevState.totalCredits - prevState.totalDebits
    }));
  };

  logIn = logInInfo => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  render() {
    const homePage = () => (
      <Home
        accountBalance={this.state.accountBalance}
        totalDebits={this.state.totalDebits}
        totalCredits={this.state.totalCredits}
      />
    );

    const userProfilePage = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );

    const logInPage = () => (
      <LogIn
        user={this.state.currentUser}
        logIn={this.logIn}
        {...this.props}
      />
    );

    const debitsPage = () => (
      <Debits
        accountBalance={this.state.accountBalance}
        debits={this.state.debits}
        totalDebits={this.state.totalDebits}
        onDataFetched={this.setDebits}
      />
    );

    const creditsPage = () => (
      <Credits
        accountBalance={this.state.accountBalance}
        credits={this.state.credits}
        totalCredits={this.state.totalCredits}
        onDataFetched={this.setCredits}
      />
    );

    return (
      <Router>
        <div className="App" 
        style={{
        backgroundColor: 'linen'}}>
          <Route exact path="/" render={homePage} />
          <Route exact path="/userProfile" render={userProfilePage} />
          <Route exact path="/login" render={logInPage} />
          <Route exact path="/debits" render={debitsPage} />
          <Route exact path="/credits" render={creditsPage} />
        </div>
      </Router>
    );
  }
}

export default App;