import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import styles from './Controls.module.css';

class Controls extends Component {
  state = {
    amount: '',
  };

  static propTypes = {
    onDeposit: PropTypes.func.isRequired,
    onWithdraw: PropTypes.func.isRequired,
    balance: PropTypes.number.isRequired,
  };

  noMoney = () => {
    toast('На счету недостаточно средств для проведения операции!');
  };

  equalZero = () => {
    toast('Введите сумму для проведения операции!');
  };

  handleItemDeposit = () => {
    const { amount } = this.state;
    const date = new Date();
    if (Number(amount) <= 0) {
      this.equalZero();
    } else {
      const transactionItem = {
        id: shortid.generate(),
        type: 'deposit',
        amount: Number(amount),
        date: date.toLocaleString(),
      };
      this.props.onDeposit(transactionItem);
    }
    this.reset();
  };

  handleItemWithdraw = () => {
    const { amount } = this.state;
    const { balance } = this.props;
    const date = new Date();
    if (Number(amount) >= balance) {
      this.noMoney();
    } else {
      const transactionItem = {
        id: shortid.generate(),
        type: 'withdraw',
        amount: Number(amount),
        date: date.toLocaleString(),
      };
      this.props.onWithdraw(transactionItem);
    }
    this.reset();
  };

  reset = () => {
    this.setState({
      amount: '',
    });
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { amount } = this.state;
    return (
      <>
        <section className={styles.controls}>
          <input
            className={styles.input}
            type="number"
            name="amount"
            value={amount}
            onChange={this.handleChange}
          />
          <button
            className={styles.button}
            type="button"
            onClick={this.handleItemDeposit}
          >
            Deposit
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={this.handleItemWithdraw}
          >
            Withdraw
          </button>
        </section>
        <ToastContainer autoClose={5000} />
      </>
    );
  }
}

export default Controls;
