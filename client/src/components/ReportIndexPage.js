import React, { useState, useEffect, useContext } from 'react';
import { Flex, Heading, Box } from '@chakra-ui/react';
import { Subscription, Transaction } from '../requests';
import AuthContext from '../context/auth-context';
import UpcomingPaymentsTable from './UpcomingPaymentsTable';
import PieChart from './PieChart';
import BarChart from './BarChart';
import { Spinner } from '@chakra-ui/spinner';

const ReportIndexPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [lastSixMonthlyTotals, setLastSixMonthlyTotals] = useState([]);
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
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const getSubscriptions = () => {
    return Subscription.indexQuery(
      `id=${ctx.user.id}&is_active=true&order_by=next_payment_date`
    ).then((subscriptions) => {
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
      setSubscriptions(subscriptions.slice(0, 5));
      getTransactions();
      setDataReturned(true);
    });
  };

  const getLastSixMonths = () => {
    const today = new Date();
    let lastSixMonths = [];
    for (let i = 5; i >= 0; i -= 1) {
      if (today.getMonth() - i === -5) {
        lastSixMonths.push({
          month: months[7],
          year: today.getUTCFullYear() - 1,
          monthlyTotal: 0,
          color: 'rgb(202,213,224)',
        });
      } else if (today.getMonth() - i === -4) {
        lastSixMonths.push({
          month: months[8],
          year: today.getUTCFullYear() - 1,
          monthlyTotal: 0,
          color: 'rgb(202,213,224)',
        });
      } else if (today.getMonth() - i === -3) {
        lastSixMonths.push({
          month: months[9],
          year: today.getUTCFullYear() - 1,
          monthlyTotal: 0,
          color: 'rgb(202,213,224)',
        });
      } else if (today.getMonth() - i === -2) {
        lastSixMonths.push({
          month: months[10],
          year: today.getUTCFullYear() - 1,
          monthlyTotal: 0,
          color: 'rgb(202,213,224)',
        });
      } else if (today.getMonth() - i === -1) {
        lastSixMonths.push({
          month: months[11],
          year: today.getUTCFullYear() - 1,
          monthlyTotal: 0,
          color: 'rgb(202,213,224)',
        });
      } else if (i === 0) {
        lastSixMonths.push({
          month: months[today.getUTCMonth() - i],
          year: today.getUTCFullYear(),
          monthlyTotal: 0,
          color: 'rgb(111,85,255)',
        });
      } else {
        lastSixMonths.push({
          month: months[today.getUTCMonth() - i],
          year: today.getUTCFullYear(),
          monthlyTotal: 0,
          color: 'rgb(202,213,224)',
        });
      }
    }
    return lastSixMonths;
  };

  const getTransactions = () => {
    return Transaction.indexQuery(`id=${ctx.user.id}`).then((transactions) => {
      const today = new Date();
      const categoriesName = [];
      const dataForBarChart = getLastSixMonths();
      let transactionsThisMonth = [];
      transactions.forEach((transaction) => {
        const transactionMonth =
          months[new Date(transaction.transaction_date).getUTCMonth()];
        const transactionYear = new Date(
          transaction.transaction_date
        ).getUTCFullYear();
        const month = dataForBarChart.find(
          ({ month, year }) =>
            month === transactionMonth && year === transactionYear
        );
        if (month) {
          month.monthlyTotal += transaction.amount / 100;
        }
        if (
          transactionMonth === months[today.getUTCMonth()] &&
          transactionYear === today.getUTCFullYear()
        ) {
          transactionsThisMonth.push(transaction);
          if (!categoriesName.includes(transaction.category)) {
            categoriesName.push(transaction.category);
          }
        }
      });
      setLastSixMonthlyTotals(dataForBarChart);
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
  }, []);

  return (
    <>
      {dataReturned ? (
        <Flex
          flexDir='column'
          w='100%'
          h='100%'
          // alignItems='center'
          ml={20}
          mr={10}
        >
          <Flex w='100%' justifyContent='flex-start' mt={10}>
            <Heading as='h1'>Reports</Heading>
          </Flex>
          <Flex flexDir='row' w='100%%' h='50%' mt={5} mb={5}>
            <Flex flexDir='column' h='100%' w='50%' mr={10}>
              <Heading as='h3' size='md' mb={5}>
                Category Breakdown for {months[new Date().getUTCMonth()]},{' '}
                {new Date().getUTCFullYear()}
              </Heading>
              <Box boxShadow='lg' h='100%'>
                <PieChart data={categories} />
              </Box>
            </Flex>
            <Flex flexDir='column' h='100%' w='50%'>
              <Heading as='h3' size='md' mb={5}>
                Monthly Breakdown
              </Heading>
              <Box boxShadow='lg' h='100%' minW='0'>
                <BarChart
                  data={lastSixMonthlyTotals}
                  colors={(bar) => bar.data.color}
                />
              </Box>
            </Flex>
          </Flex>
          <Flex flexDir='column' w='100%' mt={5}>
            <Heading as='h3' size='md' mb={5}>
              Upcoming Payments
            </Heading>
            <Box boxShadow={'md'} rounded={'lg'} minW='0'>
              <UpcomingPaymentsTable
                tableData={subscriptions}
                columnsData={columns}
              />
            </Box>
          </Flex>
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
