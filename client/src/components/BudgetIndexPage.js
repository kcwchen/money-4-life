import React, { useState, useEffect, useContext } from 'react';
import NewBudgetForm from './NewBudgetForm';
import { Budget, Transaction } from '../requests';
import AuthContext from '../context/auth-context';
import {
  Flex,
  Box,
  Heading,
  Stack,
  Tooltip,
  CircularProgress,
  CircularProgressLabel,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
} from '@chakra-ui/react';
import BudgetDetails from './BudgetDetails';
import { Spinner } from '@chakra-ui/spinner';
import { FiPlus } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

const BudgetIndexPage = (props) => {
  // const { currentUser } = props;
  const ctx = useContext(AuthContext);
  const [budgets, setBudgets] = useState([]);
  const [expensesThisMonth, setExpensesThisMonth] = useState({});
  const [dataReturned, setDataReturned] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [budgetTotal, setBudgetTotal] = useState(0);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: editIsOpen,
    onOpen: editOnOpen,
    onClose: editOnClose,
  } = useDisclosure();

  const getBudgetsAndTransactionsForCurrentMonth = () => {
    return Budget.index().then((data) => {
      let total = 0;
      data = data.filter((b) => b.user_id === ctx.user.id);
      data.forEach((b) => (total += b.amount));
      setBudgetTotal(total);
      setBudgets(data);
      Transaction.index().then((transactions) => {
        transactions = transactions.filter((t) => t.user_id === ctx.user.id);
        const expenses = {};
        transactions.forEach((transaction) => {
          transaction.amount = transaction.amount / 100;
          const transactionMonth =
            new Date(transaction.transaction_date).getMonth() + 1;
          if (transactionMonth === currentMonth + 1) {
            if (expenses[transaction.category]) {
              expenses[transaction.category] += transaction.amount;
            } else {
              expenses[transaction.category] = transaction.amount;
            }
          }
        });
        setExpensesThisMonth(expenses);
        setDataReturned(true);
      });
    });
  };

  useEffect(() => {
    getBudgetsAndTransactionsForCurrentMonth();
  }, []);

  const handleNewBudget = (data) => {
    setDataReturned(false);
    Budget.create(data).then(() => {
      getBudgetsAndTransactionsForCurrentMonth();
    });
  };

  const onEditSubmit = (data) => {
    console.log(data);
    data.amount = data.amount * 100;
    setDataReturned(false);
    Budget.update(
      { amount: data.edit_amount, category: data.edit_category },
      data.budget_id
    ).then(() => {
      getBudgetsAndTransactionsForCurrentMonth();
    });
  };

  const handleEdit = (data) => {
    setValue('edit_amount', data.amount);
    setValue('edit_category', data.category);
    setValue('budget_id', data.id);
    editOnOpen();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleNewBudget)}>
            <ModalHeader>Add Budget Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mt={4}>
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
                <FormLabel>Category</FormLabel>
                <Input
                  type='text'
                  placeholder='Category'
                  name='category'
                  {...register('category')}
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
      <Modal isOpen={editIsOpen} onClose={editOnClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onEditSubmit)}>
            <ModalHeader>Edit Budget Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <Input
                  type='hidden'
                  name='budget_id'
                  {...register('budget_id')}
                />
                <FormLabel>Amount</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    color='gray.500'
                    children='$'
                  />
                  <Input
                    name='edit_amount'
                    type='number'
                    step='0.01'
                    {...register('edit_amount')}
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Category</FormLabel>
                <Input
                  type='text'
                  placeholder='Category'
                  name='edit_category'
                  {...register('edit_category')}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={editOnClose}
                type='submit'
                colorScheme='blue'
                mr={3}
              >
                Save
              </Button>
              <Button onClick={editOnClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      {dataReturned && budgets.length !== 0 ? (
        <>
          <Flex flexDir='column' w='100%' alignItems='center' ml={20} mr={10}>
            <Flex w='100%' justifyContent='flex-start' mt={10}>
              <Stack>
                <Heading as='h1'>
                  Your Total Monthly Budget is ${budgetTotal / 100}
                </Heading>
                <Heading as='h2'>
                  {months[currentMonth]} {new Date().getFullYear()}
                </Heading>
              </Stack>
            </Flex>
            <Flex
              flexDir='row'
              flexWrap='wrap'
              w='100%'
              alignItems='center'
              justifyContent='center'
            >
              {budgets.map((budget) => {
                return (
                  // <h3 key={budget.id}>
                  //   ${budget.amount / 100} - {budget.category} - {budget.user_id}
                  // </h3>
                  <BudgetDetails
                    id={budget.id}
                    amount={budget.amount / 100}
                    category={budget.category}
                    expenses={expensesThisMonth[budget.category]}
                    handleEdit={handleEdit}
                  />
                );
              })}
              <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                // boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}
                _hover={{ transform: 'scale(1.1)' }}
                transition='all 0.5s ease'
                onClick={onOpen}
                cursor='pointer'
              >
                <Stack align={'center'}>
                  <CircularProgress
                    size='250px'
                    transition='all 0.5s ease'
                    value={0}
                    color={
                      ((props.expenses || 0) / props.amount) * 100 > 100
                        ? 'red.300'
                        : 'blue.300'
                    }
                    _hover={{ scale: 2 }}
                  >
                    <Tooltip label='Add Category'>
                      <CircularProgressLabel fontSize='30'>
                        <Icon as={FiPlus} boxSize={36} color='gray.300' />
                      </CircularProgressLabel>
                    </Tooltip>
                  </CircularProgress>
                  <Heading
                    fontSize={'2xl'}
                    fontFamily={'body'}
                    fontWeight={500}
                    visibility='hidden'
                  >
                    Add Budget
                  </Heading>
                </Stack>
              </Box>
            </Flex>
          </Flex>
        </>
      ) : dataReturned ? (
        <>
          <Flex flexDir='column' w='100%' alignItems='center' ml={20} mr={10}>
            <Flex w='100%' justifyContent='flex-start' mt={10}>
              <Stack>
                <Heading as='h1'>You don't have a monthly budget yet!</Heading>
                <Heading as='h2'>Add a category!</Heading>
              </Stack>
            </Flex>
            <Flex
              flexDir='row'
              flexWrap='wrap'
              alignItems='center'
              justifyContent='center'
              mt={5}
            >
              <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                // boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}
                _hover={{ transform: 'scale(1.1)' }}
                transition='all 0.5s ease'
                onClick={onOpen}
                cursor='pointer'
              >
                <Stack align={'center'}>
                  <CircularProgress
                    size='250px'
                    transition='all 0.5s ease'
                    value={0}
                    color={
                      ((props.expenses || 0) / props.amount) * 100 > 100
                        ? 'red.300'
                        : 'blue.300'
                    }
                    _hover={{ scale: 2 }}
                  >
                    <Tooltip label='Add Category'>
                      <CircularProgressLabel fontSize='30'>
                        <Icon as={FiPlus} boxSize={36} color='gray.300' />
                      </CircularProgressLabel>
                    </Tooltip>
                  </CircularProgress>
                  <Heading
                    fontSize={'2xl'}
                    fontFamily={'body'}
                    fontWeight={500}
                    visibility='hidden'
                  >
                    Add Budget
                  </Heading>
                </Stack>
              </Box>
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

export default BudgetIndexPage;
