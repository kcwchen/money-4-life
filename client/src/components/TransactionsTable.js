import {
  Button,
  Flex,
  Icon,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Heading,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import React, { useState, useMemo } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from 'react-icons/ti';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import { useForm } from 'react-hook-form';

function TransactionsTable(props) {
  const { columnsData, tableData } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState('false');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(value);
  const columns = useMemo(() => columnsData, []);
  const data = useMemo(() => tableData, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    gotoPage,
    pageCount,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
    setGlobalFilter,
    state,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const createPages = (count) => {
    let arrPageCount = [];

    for (let i = 1; i <= count; i++) {
      arrPageCount.push(i);
    }

    return arrPageCount;
  };

  const { pageIndex, pageSize, globalFilter } = state;

  return (
    <>
      <Box pos='absolute' right='10' top='10'>
        <Button bg='#fff' border='1px solid #000' onClick={onOpen}>
          Add Transaction
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input
                type='number'
                step='0.01'
                placeholder='Amount'
                {...register('amount')}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                type='text'
                placeholder='Description'
                {...register('description')}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Input
                type='text'
                placeholder='Category'
                {...register('category')}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Account</FormLabel>
              <Input
                type='text'
                placeholder='Account'
                {...register('account')}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Transaction Date</FormLabel>
              <Input type='date' {...register('transactionDate')} />
            </FormControl>

            <RadioGroup
              onChange={setValue}
              value={value}
              mt={4}
              defaultValue='false'
            >
              <FormLabel>Subscription</FormLabel>
              <Stack spacing={5} direction='row'>
                <Radio value='true'>Yes</Radio>
                <Radio value='false'>No</Radio>
              </Stack>
            </RadioGroup>

            {value === 'true' ? (
              <FormControl mt={4}>
                <FormLabel>Transaction Date</FormLabel>
                <Input type='date' {...register('transactionDate')} />
              </FormControl>
            ) : null}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex justifyContent='center' mt={10}>
        <Heading as='h1'>Transactions</Heading>
      </Flex>
      <Flex
        direction='column'
        w='100%'
        overflowX={{ sm: 'scroll', lg: 'hidden' }}
      >
        <Flex justify='space-between' align='center' w='100%' px='22px'>
          <Stack
            direction={{ sm: 'column', md: 'row' }}
            spacing={{ sm: '4px', md: '12px' }}
            align='center'
            me='12px'
            my='24px'
            minW={{ sm: '100px', md: '200px' }}
          >
            <Select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              color='gray.500'
              size='sm'
              borderRadius='12px'
              maxW='75px'
              cursor='pointer'
            >
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
              <option>25</option>
            </Select>
            <Text fontSize='xs' color='gray.400' fontWeight='normal'>
              entries per page
            </Text>
          </Stack>
          <Input
            type='text'
            placeholder='Search...'
            minW='75px'
            maxW='175px'
            fontSize='sm'
            _focus={{ borderColor: 'teal.300' }}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </Flex>
        <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe='0px'
                  >
                    <Flex
                      justify='space-between'
                      align='center'
                      fontSize={{ sm: '10px', lg: '12px' }}
                      color='gray.400'
                    >
                      {column.render('Header')}
                      <Icon
                        w={{ sm: '10px', md: '14px' }}
                        h={{ sm: '10px', md: '14px' }}
                        color={columns.isSorted ? 'gray.500' : 'gray.400'}
                        float='right'
                        as={
                          column.isSorted
                            ? column.isSortedDesc
                              ? TiArrowSortedDown
                              : TiArrowSortedUp
                            : TiArrowUnsorted
                        }
                      />
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td {...cell.getCellProps()} fontSize={{ sm: '14px' }}>
                        {cell.render('Cell')}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <Flex
          direction={{ sm: 'column', md: 'row' }}
          justify='space-between'
          align='center'
          px='22px'
          w='100%'
          px={{ md: '22px' }}
        >
          <Text
            fontSize='sm'
            color='gray.500'
            fontWeight='normal'
            mb={{ sm: '24px', md: '0px' }}
          >
            Showing {pageSize * pageIndex + 1} to{' '}
            {pageSize * (pageIndex + 1) <= tableData.length
              ? pageSize * (pageIndex + 1)
              : tableData.length}{' '}
            of {tableData.length} entries
          </Text>
          <Stack direction='row' alignSelf='flex-end' spacing='4px' ms='auto'>
            <Button
              variant='no-hover'
              onClick={() => previousPage()}
              transition='all .5s ease'
              w='40px'
              h='40px'
              borderRadius='50%'
              bg='#fff'
              border='1px solid lightgray'
              display={
                pageSize === 5 ? 'none' : canPreviousPage ? 'flex' : 'none'
              }
              _hover={{
                bg: 'gray.200',
                opacity: '0.7',
                borderColor: 'gray.500',
              }}
            >
              <Icon as={GrFormPrevious} w='16px' h='16px' color='gray.400' />
            </Button>
            {pageSize === 5 ? (
              <NumberInput
                max={pageCount - 1}
                min={1}
                w='75px'
                mx='6px'
                defaultValue='1'
                onChange={(e) => gotoPage(e)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper onClick={() => nextPage()} />
                  <NumberDecrementStepper onClick={() => previousPage()} />
                </NumberInputStepper>
              </NumberInput>
            ) : (
              createPages(pageCount).map((pageNumber) => {
                return (
                  <Button
                    variant='no-hover'
                    transition='all .5s ease'
                    onClick={() => gotoPage(pageNumber - 1)}
                    w='40px'
                    h='40px'
                    borderRadius='160px'
                    bg={pageNumber === pageIndex + 1 ? 'teal.300' : '#fff'}
                    border='1px solid lightgray'
                    _hover={{
                      bg: 'gray.200',
                      opacity: '0.7',
                      borderColor: 'gray.500',
                    }}
                  >
                    <Text
                      fontSize='xs'
                      color={pageNumber === pageIndex + 1 ? '#fff' : 'gray.600'}
                    >
                      {pageNumber}
                    </Text>
                  </Button>
                );
              })
            )}
            <Button
              variant='no-hover'
              onClick={() => nextPage()}
              transition='all .5s ease'
              w='40px'
              h='40px'
              borderRadius='160px'
              bg='#fff'
              border='1px solid lightgray'
              display={pageSize === 5 ? 'none' : canNextPage ? 'flex' : 'none'}
              _hover={{
                bg: 'gray.200',
                opacity: '0.7',
                borderColor: 'gray.500',
              }}
            >
              <Icon as={GrFormNext} w='16px' h='16px' color='gray.400' />
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}

export default TransactionsTable;
