import React, { useState, useEffect, useContext, useRef } from 'react';
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
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
  Heading,
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { IconButton } from '@chakra-ui/button';
import { useForm } from 'react-hook-form';

const TransactionIndexPage = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [dataReturned, setDataReturned] = useState(false);
  const [rowValues, setRowValues] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [toastMessage, setToastMessage] = useState(undefined);
  const toast = useToast();
  const {
    isOpen: alertIsOpen,
    onOpen: alertOnOpen,
    onClose: alertOnClose,
  } = useDisclosure();
  const cancelRef = useRef();
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
      accessor: 'transaction_date',
    },
    {
      Header: 'AMOUNT ($)',
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
            mr={1}
            onClick={() => handleEdit(row.original)}
          >
            Edit
          </IconButton>
          <IconButton
            icon={<FiTrash2 />}
            onClick={() => {
              handleDelete(row.original);
            }}
          >
            Delete
          </IconButton>
        </div>
      ),
    },
  ];

  const getTransactions = () => {
    return Transaction.indexQuery(`id=${ctx.user.id}`).then((transactions) => {
      transactions.forEach((transaction) => {
        transaction.amount = transaction.amount / 100;
        transaction.transaction_date = new Date(
          transaction.transaction_date
        ).toLocaleDateString('en-CA', { timeZone: 'UTC' });
      });
      setTransactions(transactions);
      setDataReturned(true);
    });
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const onSubmit = (data) => {
    setDataReturned(false);
    data.amount = data.amount * 100;
    Transaction.create(data).then(() => {
      getTransactions();
    });
    setToastMessage({ title: 'Transaction created' });
  };

  useEffect(() => {
    if (toastMessage) {
      const { title } = toastMessage;

      toast({
        title,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [toastMessage, toast]);

  const onEditSubmit = (data) => {
    data.amount = data.amount * 100;
    setDataReturned(false);
    Transaction.update(data, data.transaction_id).then(() => {
      getTransactions();
    });
    setToastMessage({ title: 'Transaction updated' });
  };

  const handleEdit = (row) => {
    console.log(row);
    setValue('amount', `${row.amount}`);
    setValue('description', `${row.description}`);
    setValue('category', `${row.category}`);
    setValue('account', `${row.account}`);
    setValue('transaction_date', `${row.transaction_date}`);
    setValue('transaction_id', `${row.id}`);
    onOpen();
  };

  const handleDelete = (row) => {
    setRowValues(row);
    alertOnOpen();
  };

  const handleDeleteSubmit = () => {
    setDataReturned(false);
    Transaction.destroy(rowValues.id).then(() => {
      getTransactions();
    });
    setToastMessage({ title: 'Transaction deleted' });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onEditSubmit)}>
            <ModalHeader>Edit Transaction</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Input
                type='hidden'
                name='transaction_id'
                {...register('transaction_id')}
              />
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
      <AlertDialog
        isOpen={alertIsOpen}
        onClose={alertOnClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Transaction
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={alertOnClose}>
                Cancel
              </Button>
              <Button
                type='submit'
                colorScheme='red'
                onClick={() => {
                  alertOnClose();
                  handleDeleteSubmit();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {dataReturned ? (
        <Flex flexDir='column' w='100%' alignItems='center' ml={20} mr={10}>
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
          {transactions.length === 0 ? null : (
            <TransactionsTable
              tableData={transactions}
              columnsData={columns}
              onSubmit={onSubmit}
            />
          )}
        </Flex>
      )}
    </>
  );
};

export default TransactionIndexPage;
