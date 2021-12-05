import React, { useState, useEffect, useContext } from 'react';
import { Subscription } from '../requests';
import { Spinner } from '@chakra-ui/spinner';
import { Flex, Heading } from '@chakra-ui/layout';
import AuthContext from '../context/auth-context';
import SubscriptionDetails from './SubscriptionDetails';

const SubscriptionIndexPage = (props) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [dataReturned, setDataReturned] = useState(false);
  const ctx = useContext(AuthContext);

  useEffect(() => {
    Subscription.index().then((subscriptions) => {
      subscriptions = subscriptions.filter((s) => s.user_id === ctx.user.id);
      setSubscriptions(subscriptions);
      setDataReturned(true);
    });
  }, []);
  return (
    <>
      {dataReturned ? (
        <Flex
          flexDir='column'
          w='100%'
          justifyContent='center'
          alignItems='center'
        >
          <Flex justify='flex-start' mt={10}>
            <Heading as='h1'>Subscriptions</Heading>
          </Flex>
          {subscriptions.map((subscription) => {
            return (
              <SubscriptionDetails
                name={subscription.name}
                amount={subscription.amount}
                billingPeriod={subscription.billing_period}
              />
            );
          })}
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
    </>
  );
};

export default SubscriptionIndexPage;
