import React, { useState, useEffect, useContext } from 'react';
import { Transaction } from '../requests';
import AuthContext from '../context/auth-context';
import TransactionsTable from './TransactionsTable';
import { Spinner } from '@chakra-ui/spinner';
import {
  Flex,
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
  InputGroup,
  InputLeftElement,
  Select,
  Input,
  Button,
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { IconButton } from '@chakra-ui/button';
import { useForm } from 'react-hook-form';

const TransactionIndexPage = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [dataReturned, setDataReturned] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ctx = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const columns = [
    {
      Header: 'DATE',
      accessor: 'date',
    },
    {
      Header: 'AMOUNT',
      accessor: 'amount',
    },
    {
      Header: 'DESCRIPTION',
      accessor: 'description',
    },
    {
      Header: 'CATEGORY',
      accessor: 'category',
    },
    {
      Header: 'ACCOUNT',
      accessor: 'account',
    },
    {
      Header: '',
      id: 'action',
      Cell: ({ row }) => (
        <div>
          <IconButton
            icon={<FiEdit2 />}
            onClick={() => handleEdit(row.original)}
          >
            Edit
          </IconButton>
          <IconButton
            icon={<FiTrash2 />}
            onClick={() => handleDelete(row.original)}
          >
            Delete
          </IconButton>
        </div>
      ),
    },
  ];

  useEffect(() => {
    Transaction.index().then((transactions) => {
      transactions = transactions.filter((t) => t.user_id === ctx.user.id);
      setTransactions(transactions);
      setDataReturned(true);
    });
    // if (ctx.user) {
    //   setTransactions(ctx.user.transactions);
    // }
  }, []);

  const onSubmit = (data) => {
    setDataReturned(false);
    Transaction.create(data).then(() => {
      Transaction.index().then((transactions) => {
        transactions = transactions.filter((t) => t.user_id === ctx.user.id);
        setTransactions(transactions);
        setDataReturned(true);
      });
      // props.history.push('/transactions');
    });
  };

  const onEditSubmit = (data) => {
    console.log(data);
    setDataReturned(false);
    Transaction.update();
  };

  const handleEdit = (row) => {
    const transactionDate = new Date(row.transaction_date).toLocaleDateString(
      'en-CA'
    );
    setValue('amount', `${row.amount}`);
    setValue('description', `${row.description}`);
    setValue('category', `${row.category}`);
    setValue('account', `${row.account}`);
    setValue('transaction_date', `${transactionDate}`);
    onOpen();
  };

  const handleDelete = (row) => {
    setDataReturned(false);
    Transaction.destroy(row.id).then(() => {
      Transaction.index().then((transactions) => {
        transactions = transactions.filter((t) => t.user_id === ctx.user.id);
        setTransactions(transactions);
        setDataReturned(true);
      });
    });
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onEditSubmit)}>
            <ModalHeader>Edit Transaction</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    color='gray.500'
                    children='$'
                  />
                  <Input
                    name='amount'
                    type='number'
                    step='0.01'
                    {...register('amount')}
                  />
                </InputGroup>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  type='text'
                  placeholder='Description'
                  name='description'
                  {...register('description')}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Category</FormLabel>
                <Input
                  type='text'
                  placeholder='Category'
                  name='category'
                  {...register('category')}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Account</FormLabel>
                <Input
                  type='text'
                  placeholder='Account'
                  name='account'
                  {...register('account')}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Transaction Date</FormLabel>
                <Input
                  type='date'
                  name='transaction_date'
                  {...register('transaction_date')}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} type='submit' colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      {dataReturned ? (
        <Flex
          flexDir='column'
          w='100%'
          justifyContent='center'
          alignItems='center'
        >
          <TransactionsTable
            tableData={transactions}
            columnsData={columns}
            onSubmit={onSubmit}
          />
        </Flex>
      ) : (
        <Flex
          flexDir='column'
          w='100%'
          justifyContent='center'
          alignItems='center'
        >
          <Spinner
            size='xl'
            thickness='4px'
            emptyColor='gray.200'
            color='blue.300'
            zIndex='9999'
            pos='absolute'
          />
          <TransactionsTable
            tableData={transactions}
            columnsData={columns}
            onSubmit={onSubmit}
          />
        </Flex>
      )}
    </div>
  );
};

export default TransactionIndexPage;
