import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Controls.module.css';

class Controls extends Component {
  state = {
    amount: '',
  };

  static propTypes = {
    onTakeValue: PropTypes.func.isRequired,
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: Number(target.value),
    });
  };

  handleItemValue = target => {
    const { amount } = this.state;
    this.props.onTakeValue(amount, target);
    this.reset();
  };

  reset = () => {
    this.setState({
      amount: '',
    });
  };

  render() {
    const { amount } = this.state;
    return (
      <section className={styles.controls}>
        <input
          className={styles.input}
          type="number"
          name="amount"
          value={amount}
          onChange={this.handleChange}
        />
        <button
          name="deposit"
          className={styles.button}
          type="button"
          onClick={({ target }) => this.handleItemValue(target)}
        >
          Deposit
        </button>
        <button
          name="withdraw"
          className={styles.button}
          type="button"
          onClick={({ target }) => this.handleItemValue(target)}
        >
          Withdraw
        </button>
      </section>
    );
  }
}

export default Controls;
