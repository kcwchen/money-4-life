import React from 'react';
import {
  Stack,
  Avatar,
  Text,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Portal,
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
  Select,
  Button,
} from '@chakra-ui/react';
import {
  FiMoreHorizontal,
  FiEdit2,
  FiTrash2,
  FiCornerDownRight,
} from 'react-icons/fi';
import { useForm } from 'react-hook-form';

const SubscriptionDetails = ({
  id,
  name,
  amount,
  billingPeriod,
  handleSubscriptionStatus,
  isActive,
  handleSubscriptionEdit,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEdit = () => {
    setValue('name', name);
    setValue('subscription_id', id);
    onOpen();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleSubscriptionEdit)}>
            <ModalHeader>Edit {name} Subscription</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <Input
                  type='hidden'
                  name='subscription_id'
                  {...register('subscription_id')}
                />
                <FormLabel>Name</FormLabel>
                <Input
                  type='text'
                  placeholder='Name'
                  name='name'
                  value={name}
                  {...register('name')}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Billing Period</FormLabel>
                <Select
                  name='billing_period'
                  defaultValue='monthly'
                  {...register('billing_period')}
                >
                  <option value='weekly'>Weekly</option>
                  <option value='biweekly'>Bi-Weekly</option>
                  <option value='monthly'>Monthly</option>
                  <option value='yearly'>Annually</option>
                </Select>
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
      <Box
        maxW='400px'
        w='100%'
        boxShadow={'md'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
        _hover={{ backgroundColor: 'gray.200' }}
        m={2}
        opacity={isActive ? '1' : '0.5'}
      >
        <Flex flexDir='row' justifyContent='space-between' align={'center'}>
          <Stack direction={'row'} spacing={5}>
            <Avatar name={name} />
            <Text fontWeight={600} alignSelf='center'>
              {name}
            </Text>
          </Stack>
          <Stack direction={'row'}>
            <Stack
              direction={'column'}
              align='flex-end'
              spacing={0}
              fontSize={'sm'}
            >
              <Text fontWeight={600}>${amount / 100}</Text>
              <Text color={'gray.500'}>{billingPeriod}</Text>
            </Stack>
            <Menu>
              <MenuButton
                bg='transparent'
                as={IconButton}
                icon={<FiMoreHorizontal />}
              />
              <Portal>
                <MenuList>
                  <MenuItem
                    icon={<FiEdit2 />}
                    onClick={
                      isActive
                        ? () => {
                            handleEdit();
                          }
                        : null
                    }
                    isDisabled={isActive ? false : true}
                  >
                    Edit
                  </MenuItem>
                  {isActive ? (
                    <MenuItem
                      icon={<FiCornerDownRight />}
                      onClick={() => {
                        handleSubscriptionStatus(
                          { is_active: 'false', name: name },
                          id
                        );
                      }}
                    >
                      Set Inactive
                    </MenuItem>
                  ) : (
                    <MenuItem
                      icon={<FiCornerDownRight />}
                      onClick={() => {
                        handleSubscriptionStatus(
                          { is_active: 'true', name: name },
                          id
                        );
                      }}
                    >
                      Set Active
                    </MenuItem>
                  )}
                  <MenuItem icon={<FiTrash2 />}>Delete</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Stack>
        </Flex>
      </Box>
    </>
  );
};

export default SubscriptionDetails;
