import React, { Component } from 'react';
import Controls from './Controls/Controls';
import Balance from './Balance/Balance';
import TransactionHistory from './TransactionHistory/TransactionHistory';

export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
    income: 0,
    expenses: 0,
  };

  handleDeposit = item => {
    const { transactions, balance, income } = this.state;
    this.setState({
      transactions: [...transactions, item],
      balance: balance + item.amount,
      income: income + item.amount,
    });
  };

  handleWithdraw = item => {
    const { transactions, balance, expenses } = this.state;
    this.setState({
      transactions: [...transactions, item],
      balance: balance - item.amount,
      expenses: expenses + item.amount,
    });
  };

  render() {
    const { transactions, balance, income, expenses } = this.state;
    return (
      <div className="dashboard">
        <Controls
          onDeposit={this.handleDeposit}
          onWithdraw={this.handleWithdraw}
          balance={balance}
        />
        <Balance balance={balance} income={income} expenses={expenses} />
        <TransactionHistory items={transactions} />
      </div>
    );
  }
}
