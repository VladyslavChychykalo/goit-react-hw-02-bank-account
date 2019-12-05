import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ balance, items }) => {
  return (
    <section className={styles.balance}>
      <span className={styles.balance}>
        <span className={styles.green} role="img" aria-label="ArrowUp">
          ⬆
        </span>
        {items
          .filter(el => el.type === 'deposit')
          .reduce((acc, el) => acc + Number(el.amount), 0)}
        $
      </span>
      <span className={styles.balance}>
        <span className={styles.red} role="img" aria-label="ArrowDown">
          ⬇
        </span>
        {items
          .filter(el => el.type === 'withdraw')
          .reduce((acc, el) => acc + Number(el.amount), 0)}
        $
      </span>
      <span>Balance: {balance}$</span>
    </section>
  );
};

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Balance;
