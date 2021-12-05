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
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  IconButton,
} from '@chakra-ui/react';
import { FiMoreHorizontal } from 'react-icons/fi';

const SubscriptionDetails = ({ name, amount, billingPeriod }) => {
  return (
    <Box
      maxW='400px'
      w='100%'
      // bg={useColorModeValue('white', 'gray.900')}
      // bgGradient='linear(135deg, #e3e3e3 0%,#9ea4aa 100%)'
      boxShadow={'md'}
      rounded={'md'}
      p={6}
      overflow={'hidden'}
      _hover={{ backgroundColor: 'gray.200' }}
      m={2}
      cursor='pointer'
    >
      <Flex flexDir='row' justifyContent='space-between' align={'center'}>
        <Stack direction={'row'} spacing={5}>
          <Avatar name={name} />
          <Text pr={10} fontWeight={600} alignSelf='center'>
            {name}
          </Text>
        </Stack>
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
          <MenuButton as={IconButton} icon={<FiMoreHorizontal />} />
          <MenuList>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Set Inactive</MenuItem>
            <MenuItem>Delete</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default SubscriptionDetails;
