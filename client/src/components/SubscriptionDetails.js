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
} from '@chakra-ui/react';
import {
  FiMoreHorizontal,
  FiEdit2,
  FiTrash2,
  FiCornerDownRight,
} from 'react-icons/fi';

const SubscriptionDetails = ({
  id,
  name,
  amount,
  billingPeriod,
  handleSubscriptionStatus,
  isActive,
}) => {
  return (
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
      cursor='pointer'
      onClick={() => console.log('hello')}
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
                <MenuItem icon={<FiEdit2 />}>Edit</MenuItem>
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
  );
};

export default SubscriptionDetails;
