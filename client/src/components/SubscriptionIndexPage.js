import React, { useState, useEffect, useContext } from 'react';
import { Subscription } from '../requests';
import { Spinner } from '@chakra-ui/spinner';
import {
  Flex,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
} from '@chakra-ui/react';
import AuthContext from '../context/auth-context';
import SubscriptionDetails from './SubscriptionDetails';
import { get } from 'react-hook-form';

const SubscriptionIndexPage = (props) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [activeSubscriptions, setActiveSubscriptions] = useState([]);
  const [inactiveSubscriptions, setInactiveSubscriptions] = useState([]);
  const [dataReturned, setDataReturned] = useState(false);
  const [toastMessage, setToastMessage] = useState(undefined);
  const toast = useToast();

  const ctx = useContext(AuthContext);

  const getSubscriptions = () => {
    // get all active subscriptions
    Subscription.indexQuery(`id=${ctx.user.id}&is_active=true`).then(
      (subscriptions) => {
        setActiveSubscriptions(subscriptions);
      }
    );
    // get all inactive subscriptions
    Subscription.indexQuery(`id=${ctx.user.id}&is_active=false`).then(
      (subscriptions) => {
        setInactiveSubscriptions(subscriptions);
      }
    );
    return setDataReturned(true);
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const { title, status } = toastMessage;

      toast({
        title,
        status,
        duration: 9000,
        isClosable: true,
      });
    }
  }, [toastMessage, toast]);

  const handleSubscriptionStatus = (params, sid) => {
    setDataReturned(false);
    Subscription.update({ is_active: params.is_active }, sid).then(() => {
      getSubscriptions();
    });
    setToastMessage({
      title: `${params.name} subscription set to ${
        params.is_active === 'true' ? 'active' : 'inactive'
      }`,
      status: 'info',
    });
  };

  return (
    <>
      {dataReturned ? (
        <>
          <Flex flexDir='column' w='100%' alignItems='center' ml={20} mr={10}>
            <Flex w='100%' justifyContent='flex-start' mt={10}>
              <Heading as='h1'>Subscriptions</Heading>
            </Flex>
            <Flex w='100%' alignItems='center' mt={10}>
              <Tabs isFitted w='100%'>
                <TabList>
                  <Tab>Active {`(${activeSubscriptions.length})`}</Tab>
                  <Tab>Inactive {`(${inactiveSubscriptions.length})`}</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Flex
                      flexDir='row'
                      flexWrap='wrap'
                      w='100%'
                      alignItems='center'
                    >
                      {activeSubscriptions.map((subscription) => {
                        return (
                          <SubscriptionDetails
                            id={subscription.id}
                            name={subscription.name}
                            amount={subscription.amount}
                            billingPeriod={subscription.billing_period}
                            handleSubscriptionStatus={handleSubscriptionStatus}
                            isActive={subscription.is_active}
                          />
                        );
                      })}
                    </Flex>
                  </TabPanel>
                  <TabPanel>
                    <Flex
                      flexDir='row'
                      flexWrap='wrap'
                      w='100%'
                      alignItems='center'
                    >
                      {inactiveSubscriptions.map((subscription) => {
                        return (
                          <SubscriptionDetails
                            id={subscription.id}
                            name={subscription.name}
                            amount={subscription.amount}
                            billingPeriod={subscription.billing_period}
                            handleSubscriptionStatus={handleSubscriptionStatus}
                            isActive={subscription.is_active}
                          />
                        );
                      })}
                    </Flex>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Flex>
          </Flex>
        </>
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
