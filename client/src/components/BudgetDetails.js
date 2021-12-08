import React, { useState, useEffect } from 'react';
import {
  Box,
  Center,
  Heading,
  Stack,
  CircularProgress,
  CircularProgressLabel,
  Tooltip,
  HStack,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function BudgetDetails(props) {
  const { handleEdit, handleDelete } = props;
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(((props.expenses || 0) / props.amount) * 100);
  });

  return (
    <Center py={12} px={5}>
      <Popover placement='bottom'>
        <PopoverTrigger>
          <Box
            role={'group'}
            p={6}
            maxW={'330px'}
            w={'full'}
            boxShadow={'md'}
            rounded={'lg'}
            _hover={{
              transform: 'scale(1.1)',
              boxShadow: 'xl',
              border: '1px solid blue',
            }}
            transition='all 0.5s ease'
            display='flex'
            flexDir='column'
            cursor='pointer'
            bg='#fff'
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
                <Tooltip
                  label={`$${
                    props.amount.toFixed(2) -
                    (props.expenses ? props.expenses : 0)
                  } Remaining`}
                >
                  <CircularProgressLabel fontSize='30'>
                    ${props.expenses ? props.expenses.toFixed(2) : 0}{' '}
                    <hr
                      style={{
                        width: '50%',
                        marginRight: '25%',
                        marginLeft: '25%',
                        border: 'none',
                        height: '1px',
                        backgroundColor: '#333',
                      }}
                    />
                    ${props.amount.toFixed(2)}
                  </CircularProgressLabel>
                </Tooltip>
              </CircularProgress>
              <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                {props.category}
              </Heading>
            </Stack>
          </Box>
        </PopoverTrigger>
        <PopoverContent w='100%'>
          <PopoverArrow />
          <PopoverBody>
            <HStack m={2} spacing={2} justify='center' align='center'>
              <Button
                bg='yellow.300'
                _hover={{ bg: 'yellow.400' }}
                leftIcon={<FiEdit2 />}
                onClick={() => {
                  handleEdit({
                    id: props.id,
                    amount: props.amount,
                    category: props.category,
                  });
                }}
              >
                Edit
              </Button>
              <Button
                bg='red.300'
                _hover={{ bg: 'red.400' }}
                leftIcon={<FiTrash2 />}
                onClick={() => {
                  handleDelete({
                    bid: props.id,
                    amount: props.amount,
                    category: props.category,
                  });
                }}
              >
                Delete
              </Button>
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Center>
  );
}
