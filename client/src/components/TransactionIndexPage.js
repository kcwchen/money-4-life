import React, { useState, useEffect, useContext } from 'react';
import { Transaction } from '../requests';
import AuthContext from '../context/auth-context';

const TransactionIndexPage = () => {
  const [transactions, setTransactions] = useState([]);
  const ctx = useContext(AuthContext);
  console.log(ctx.user);

  useEffect(() => {
    Transaction.index().then((transactions) => {
      setTransactions(transactions);
      console.log(transactions);
    });
  }, []);

  return (
    <div>
      {/* {transactions.map((transaction) => {
        return (
          <h3>
            ${transaction.amount / 100} - {transaction.account}
          </h3>
        );
      })} */}
    </div>
  );
};

export default TransactionIndexPage;
