import React from 'react';
import {
  Stack,
  Avatar,
  Text,
  Box,
  useColorModeValue,
  Flex,
  Heading,
} from '@chakra-ui/react';

const SubscriptionDetails = ({ name, amount, billingPeriod }) => {
  return (
    <>
      <Flex justifyContent='center' mt={10}>
        <Heading as='h1'>Subscriptions</Heading>
      </Flex>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        bgGradient='linear(135deg, #e3e3e3 0%,#9ea4aa 100%)'
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Stack direction={'row'} spacing={5} align={'center'}>
          <Avatar />
          <Text pr={10} fontWeight={600} alginSelf='center'>
            {name}
          </Text>
          <Stack
            direction={'column'}
            align='flex-end'
            spacing={0}
            fontSize={'sm'}
          >
            <Text fontWeight={600}>${amount / 100}</Text>
            <Text color={'gray.500'}>{billingPeriod}</Text>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default SubscriptionDetails;
