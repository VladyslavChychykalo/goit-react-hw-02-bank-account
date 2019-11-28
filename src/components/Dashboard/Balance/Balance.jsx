import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ balance, income, expenses }) => {
  return (
    <section className={styles.balance}>
      <span className={styles.balance}>
        <span className={styles.green} role="img" aria-label="ArrowUp">
          ⬆
        </span>
        {income}$
      </span>
      <span className={styles.balance}>
        <span className={styles.red} role="img" aria-label="ArrowDown">
          ⬇
        </span>
        {expenses}$
      </span>
      <span>Balance: {balance}$</span>
    </section>
  );
};

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  income: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired,
};

export default Balance;
