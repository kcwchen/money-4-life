import React, { useState, useEffect, useContext } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { Subscription } from '../requests';
import AuthContext from '../context/auth-context';
import UpcomingPaymentsTable from './UpcomingPaymentsTable';
import { Spinner } from '@chakra-ui/spinner';

const ReportIndexPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
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
        ).toLocaleDateString('en-CA', { timeZone: 'UTC' });
      });
      setSubscriptions(subscriptions);
      setDataReturned(true);
    });
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <>
      {dataReturned ? (
        <Flex flexDir='column' w='100%' alignItems='center' ml={20} mr={10}>
          <Flex flexDir='column'>
            <Heading>Upcoming Payments</Heading>
            <UpcomingPaymentsTable
              tableData={subscriptions}
              columnsData={columns}
            />
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
