import React, { useState, useEffect } from 'react';
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  CircularProgress,
  CircularProgressLabel,
  Tooltip,
} from '@chakra-ui/react';

export default function BudgetDetails(props) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue((props.expenses / props.amount) * 100);
  });

  return (
    <Center py={12} px={5}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Stack align={'center'}>
          <CircularProgress
            size='250px'
            transition='all 0.5s ease'
            value={value}
            color={
              (props.expenses / props.amount) * 100 > 100
                ? 'red.300'
                : 'blue.300'
            }
          >
            <CircularProgressLabel fontSize='30'>
              ${props.amount}
            </CircularProgressLabel>
          </CircularProgress>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {props.category}
          </Heading>
        </Stack>
      </Box>
    </Center>
  );
}
