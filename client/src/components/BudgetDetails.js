import React from 'react';
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
import { motion } from 'framer-motion';

export default function BudgetDetails(props) {
  const MotionCircularProgress = motion(CircularProgress);
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
          <MotionCircularProgress
            size='250px'
            value={(props.expenses / props.amount) * 100}
            color={
              (props.expenses / props.amount) * 100 > 100
                ? 'red.300'
                : 'blue.300'
            }
          >
            <CircularProgressLabel fontSize='30'>
              ${props.amount}
            </CircularProgressLabel>
          </MotionCircularProgress>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {props.category}
          </Heading>
        </Stack>
      </Box>
    </Center>
  );
}
