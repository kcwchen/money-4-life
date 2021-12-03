import React, { useState, useEffect, useContext } from 'react';
import { Transaction } from '../requests';
import AuthContext from '../context/auth-context';
import TransactionsTable from './TransactionsTable';

const TransactionIndexPage = () => {
  const [transactions, setTransactions] = useState([]);
  const ctx = useContext(AuthContext);
  const columns = [
    {
      Header: 'DATE',
      accessor: 'date',
    },
    {
      Header: 'AMOUNT',
      accessor: 'amount',
    },
    {
      Header: 'DESCRIPTION',
      accessor: 'description',
    },
    {
      Header: 'CATEGORY',
      accessor: 'category',
    },
    {
      Header: 'ACCOUNT',
      accessor: 'account',
    },
  ];

  useEffect(() => {
    Transaction.index().then((transactions) => {
      transactions = transactions.filter((t) => t.user_id === ctx.user.id);
      setTransactions(transactions);
    });
    // if (ctx.user) {
    //   setTransactions(ctx.user.transactions);
    // }
  }, []);

  return (
    <div>
      {/* {transactions.map((transaction) => {
        return (
          <h3>
            {transaction.transaction_date} - ${transaction.amount / 100} -{' '}
            {transaction.description} - {transaction.category} -{' '}
            {transaction.account} - {transaction.user_id}
          </h3>
        );
      })} */}
      <TransactionsTable tableData={transactions} columnsData={columns} />
    </div>
  );
};

export default TransactionIndexPage;
