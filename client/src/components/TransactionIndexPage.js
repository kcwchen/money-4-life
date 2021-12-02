import React, { useState, useEffect, useContext } from 'react';
import { Transaction } from '../requests';
import AuthContext from '../context/auth-context';

const TransactionIndexPage = () => {
  const [transactions, setTransactions] = useState([]);
  const ctx = useContext(AuthContext);
  console.log(ctx.user);

  useEffect(() => {
    // Transaction.index().then((transactions) => {
    //   setTransactions(transactions);
    //   console.log(transactions);
    // });
    if (ctx.user) {
      setTransactions(ctx.user.transactions);
    }
  }, [ctx.user]);

  return (
    <div>
      {transactions.map((transaction) => {
        return (
          <h3>
            {transaction.transaction_date.toLocaleDateString('en-CA', {
              month: 'long',
              day: '2-digit',
              year: 'numeric',
            })}{' '}
            - ${transaction.amount / 100} - {transaction.description} -{' '}
            {transaction.account}
          </h3>
        );
      })}
    </div>
  );
};

export default TransactionIndexPage;
