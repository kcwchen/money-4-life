import React from 'react';
import { Flex, Text, Icon, Link, Menu, MenuButton } from '@chakra-ui/react';

export default function NavItem({ icon, title, active, open }) {
  return (
    <Flex
      mt={30}
      flexDir='column'
      w='100%'
      alignItems={open ? 'flex-start' : 'center'}
    >
      <Menu placement='right'>
        <Link
          backgroundColor={active && '#000'}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: 'none', backgroundColor: 'lightgrey' }}
          w={open && '100%'}
        >
          <MenuButton w='100%'>
            <Flex>
              <Icon
                as={icon}
                fontSize='xl'
                color={active ? '#82AAAD' : 'gray.500'}
              />
              <Text
                ml={5}
                color={active ? '#FFF' : '#000'}
                display={open ? 'flex' : 'none'}
              >
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
