import React, { useState, useEffect, useContext } from 'react';
import { Transaction } from '../requests';
import AuthContext from '../context/auth-context';
import TransactionsTable from './TransactionsTable';
import { Spinner } from '@chakra-ui/spinner';
import { Flex } from '@chakra-ui/layout';

const TransactionIndexPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [dataReturned, setDataReturned] = useState(false);
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
      setDataReturned(true);
    });
    // if (ctx.user) {
    //   setTransactions(ctx.user.transactions);
    // }
  }, []);

  const onSubmit = (data) => {
    Transaction.create(data).then(() => {
      window.location.reload();
    });
  };

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
      {dataReturned ? (
        <Flex
          flexDir='column'
          w='100%'
          justifyContent='center'
          alignItems='center'
        >
          <TransactionsTable
            tableData={transactions}
            columnsData={columns}
            onSubmit={onSubmit}
          />
        </Flex>
      ) : (
        <Flex w='100%' h='100%' justifyContent='center' alignItems='center'>
          <Spinner
            size='xl'
            thickness='4px'
            emptyColor='gray.200'
            color='blue.300'
          />
        </Flex>
      )}
    </div>
  );
};

export default TransactionIndexPage;
