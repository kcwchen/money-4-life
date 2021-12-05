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
    setValue(((props.expenses || 0) / props.amount) * 100);
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
        _hover={{ transform: 'scale(1.2)' }}
        transition='all 0.5s ease'
      >
        <Stack align={'center'}>
          <CircularProgress
            size='250px'
            transition='all 0.5s ease'
            value={value}
            color={
              ((props.expenses || 0) / props.amount) * 100 > 100
                ? 'red.300'
                : 'blue.300'
            }
            _hover={{ scale: 2 }}
          >
            <Tooltip label={`$${props.expenses || 0} / $${props.amount}`}>
              <CircularProgressLabel fontSize='30'>
                ${props.amount}
              </CircularProgressLabel>
            </Tooltip>
          </CircularProgress>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {props.category}
          </Heading>
        </Stack>
      </Box>
    </Center>
  );
}
