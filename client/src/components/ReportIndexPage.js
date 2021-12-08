import React, { useState, useEffect, useContext } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { Subscription, Transaction } from '../requests';
import AuthContext from '../context/auth-context';
import UpcomingPaymentsTable from './UpcomingPaymentsTable';
import PieChart from './PieChart';
import { Spinner } from '@chakra-ui/spinner';

const ReportIndexPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dataReturned, setDataReturned] = useState(false);
  const ctx = useContext(AuthContext);
  const columns = [
    {
      Header: 'SUBSCRIPTION',
      accessor: 'name',
    },
    {
      Header: 'BILLING PERIOD',
      accessor: 'billing_period',
    },
    {
      Header: 'COST',
      accessor: 'amount',
    },
    {
      Header: 'DATE',
      accessor: 'next_payment_date',
    },
  ];

  const getSubscriptions = () => {
    return Subscription.indexQuery(
      `id=${ctx.user.id}&is_active=true&order_by=next_payment_date`
    ).then((subscriptions) => {
      console.log(subscriptions);
      subscriptions.forEach((subscription) => {
        subscription.amount = subscription.amount / 100;
        subscription.next_payment_date = new Date(
          subscription.next_payment_date
        ).toLocaleDateString('en-CA', {
          timeZone: 'UTC',
          month: 'long',
          day: '2-digit',
          year: 'numeric',
        });
      });
      setSubscriptions(subscriptions);
      getTransactions();
      setDataReturned(true);
    });
  };

  const getTransactions = () => {
    return Transaction.indexQuery(`id=${ctx.user.id}`).then((transactions) => {
      let transactionsThisMonth = [];
      const categoriesName = [];
      transactions.forEach((transaction) => {
        const transactionMonth =
          new Date(transaction.transaction_date).getUTCMonth() + 1;
        const transactionYear = new Date(
          transaction.transaction_date
        ).getUTCFullYear();
        if (
          transactionMonth === new Date().getUTCMonth() + 1 &&
          transactionYear === new Date().getUTCFullYear()
        ) {
          transactionsThisMonth.push(transaction);
          if (!categoriesName.includes(transaction.category)) {
            categoriesName.push(transaction.category);
          }
        }
      });

      const categoriesForPieChart = [];
      categoriesName.forEach((category) => {
        const categoryDetails = {};
        let amount = 0;
        categoryDetails['id'] = category;
        categoryDetails['label'] = category;
        transactionsThisMonth
          .filter((transaction) => transaction.category === category)
          .forEach((transaction) => (amount += transaction.amount / 100));
        categoryDetails['value'] = amount.toFixed(2);
        categoriesForPieChart.push(categoryDetails);
      });
      setCategories(categoriesForPieChart);
    });
  };

  useEffect(() => {
    getSubscriptions();
    console.log(categories);
  }, []);

  return (
    <>
      {dataReturned ? (
        <Flex
          flexDir='column'
          w='100%'
          h='100%'
          alignItems='center'
          ml={20}
          mr={10}
        >
          <Flex flexDir='column'>
            <Heading>Upcoming Payments</Heading>
            <UpcomingPaymentsTable
              tableData={subscriptions}
              columnsData={columns}
            />
          </Flex>
          <PieChart data={categories} />
        </Flex>
      ) : (
        <Flex
          flexDir='column'
          w='100%'
          justifyContent='center'
          alignItems='center'
          ml={20}
          mr={10}
        >
          <Spinner
            size='xl'
            thickness='4px'
            emptyColor='gray.200'
            color='blue.300'
            zIndex='9999'
            pos='absolute'
          />
        </Flex>
      )}
    </>
  );
};

export default ReportIndexPage;
