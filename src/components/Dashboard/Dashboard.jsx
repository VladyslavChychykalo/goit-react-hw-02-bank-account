import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import shortid from 'shortid';
import Controls from './Controls/Controls';
import Balance from './Balance/Balance';
import TransactionHistory from './TransactionHistory/TransactionHistory';
import 'react-toastify/dist/ReactToastify.css';

class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  componentDidMount() {
    const persistedAccount = localStorage.getItem('account');

    if (persistedAccount) {
      this.setState(JSON.parse(persistedAccount));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      localStorage.setItem('account', JSON.stringify(this.state));
    }
  }

  noMoney = () => {
    toast('На счету недостаточно средств для проведения операции!');
  };

  equalZero = () => {
    toast('Введите сумму для проведения операции!');
  };

  addBankValue = (amount, target) => {
    const date = new Date();
    const { balance } = this.state;

    if (Number(amount) <= 0) {
      this.equalZero();
      return;
    }

    if (target.name === 'withdraw' && Number(amount) >= balance) {
      this.noMoney();
      return;
    }

    const transaction = {
      id: shortid.generate(),
      type: target.name,
      amount,
      date: date.toLocaleString(),
    };
    this.setState(prevState => ({
      transactions: [...prevState.transactions, transaction],
      balance:
        target.name === 'deposit'
          ? prevState.balance + amount
          : prevState.balance - amount,
    }));
  };

  render() {
    const { transactions, balance } = this.state;
    return (
      <>
        <div className="dashboard">
          <Controls onTakeValue={this.addBankValue} balance={balance} />
          <Balance balance={balance} items={transactions} />
          <TransactionHistory items={transactions} />
        </div>
        <ToastContainer autoClose={5000} />
      </>
    );
  }
}

export default Dashboard;
