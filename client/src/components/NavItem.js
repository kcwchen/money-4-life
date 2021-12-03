import React, { useState, useEffect } from 'react';
import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  Box,
} from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router-dom';

const NavItem = ({ icon, title, open, path, onClick }) => {
  const [active, setActive] = useState({
    budget: false,
    transactions: false,
    subscriptions: false,
    reports: false,
    settings: false,
  });
  const location = useLocation();

  useEffect(() => {
    Object.keys(active).forEach((p) => (active[p] = false));
    let items = { ...active };
    if (path && path === location.pathname.slice(1)) {
      items[path] = true;
      setActive(items);
    }
  }, []);

  return (
    <Flex
      mt={30}
      flexDir='column'
      w='100%'
      alignItems={open ? 'flex-start' : 'center'}
    >
      <Menu placement='right'>
        {title === 'Sign Out' ? (
          <Box
            onClick={onClick}
            backgroundColor={active[`${path}`] && '#000'}
            p={3}
            borderRadius={8}
            _hover={{
              textDecor: 'none',
              backgroundColor: active[`${path}`] ? '#000' : 'gray.200',
            }}
            w={open && '100%'}
          >
            <MenuButton w='100%'>
              <Flex>
                <Icon
                  as={icon}
                  fontSize='xl'
                  color={active[`${path}`] ? '#82AAAD' : 'gray.500'}
                />
                <Text
                  ml={5}
                  color={active[`${path}`] ? '#FFF' : '#000'}
                  display={open ? 'flex' : 'none'}
                >
                  {title}
                </Text>
              </Flex>
            </MenuButton>
          </Box>
        ) : (
          <Link
            as={NavLink}
            to={path}
            backgroundColor={active[`${path}`] && '#000'}
            p={3}
            borderRadius={8}
            _hover={{
              textDecor: 'none',
              backgroundColor: active[`${path}`] ? '#000' : 'gray.200',
            }}
            w={open && '100%'}
          >
            <MenuButton w='100%'>
              <Flex>
                <Icon
                  as={icon}
                  fontSize='xl'
                  color={active[`${path}`] ? '#82AAAD' : 'gray.500'}
                />
                <Text
                  ml={5}
                  color={active[`${path}`] ? '#FFF' : '#000'}
                  display={open ? 'flex' : 'none'}
                >
                  {title}
                </Text>
              </Flex>
            </MenuButton>
          </Link>
        )}
      </Menu>
    </Flex>
  );
};

export default NavItem;
