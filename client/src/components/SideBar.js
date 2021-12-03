import React, { useState } from 'react';
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Heading,
  Avatar,
} from '@chakra-ui/react';
import { motion, useCycle } from 'framer-motion';
import {
  FiMenu,
  FiHome,
  FiCalendar,
  FiUser,
  FiBriefcase,
  FiSettings,
  FiArrowLeft,
  FiLogOut,
} from 'react-icons/fi';
import NavItem from './NavItem';
import { Session } from '../requests';
import { withRouter } from 'react-router-dom';

const SideBar = (props) => {
  const { onSignOut } = props;

  const [open, cycleOpen] = useCycle(false, true);
  // const [active, setActive] = useState({
  //   budget: false,
  //   transactions: false,
  //   subscriptions: false,
  //   reports: false,
  //   settings: false,
  // });
  const MotionFlex = motion(Flex);
  const sideVariants = {
    closed: {
      width: '75px',
    },
    open: {
      width: '250px',
    },
  };

  const handleSignOut = () => {
    Session.destroy().then(() => {
      onSignOut();
      window.location.href = 'http://localhost:3002';
    });
  };

  // const handleActive = (match, location) => {
  //   if (!match) {
  //     return false;
  //   }
  //   console.log(match.url.slice(1));
  //   const path = match.url.slice(1);
  //   Object.keys(active).forEach((p) => (active[p] = false));
  //   let items = { ...active };
  //   items[path] = true;
  //   console.log(items);
  //   setActive(items);
  //   return true;
  // };

  return (
    <MotionFlex
      pos='sticky'
      left='5'
      h='95vh'
      marginTop='2.5vh'
      boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.5)'
      borderRadius='15px'
      flexDir='column'
      justifyContent='space-between'
      variants={sideVariants}
      initial={open ? 'closed' : 'open'}
      animate={open ? 'open' : 'closed'}
    >
      <Flex
        p='5%'
        flexDir='column'
        w='100%'
        alignItems={open ? 'flex-start' : 'center'}
        as='nav'
      >
        <IconButton
          background='none'
          mt={5}
          _hover={{ background: 'none' }}
          icon={open ? <FiArrowLeft /> : <FiMenu />}
          alignSelf={open ? 'flex-end' : 'center'}
          onClick={cycleOpen}
        />
        <NavItem
          open={open}
          icon={FiHome}
          title='Budget'
          path='home'
          // active={active}
          // setActive={setActive}
        />
        <NavItem
          open={open}
          icon={FiCalendar}
          title='Transactions'
          path='transactions'
          // active={active}
          // setActive={setActive}
        />
        <NavItem
          open={open}
          icon={FiUser}
          title='Subscriptions'
          path='subscriptions'
          // active={active}
          // setActive={setActive}
        />
        <NavItem
          open={open}
          icon={FiBriefcase}
          title='Reports'
          path='reports'
          // active={active}
          // setActive={setActive}
        />
        <NavItem
          open={open}
          icon={FiSettings}
          title='Settings'
          path='settings'
          // active={active}
          // setActive={setActive}
        />
        <NavItem
          open={open}
          icon={FiLogOut}
          title='Sign Out'
          path='/'
          onClick={handleSignOut}
        />
      </Flex>

      <Flex
        p='5%'
        flexDir='column'
        w='100%'
        alignItems={open ? 'flex-start' : 'center'}
        mb={3}
      >
        <Divider display={open ? 'flex' : 'none'} />
        <Flex mt={5} align='center'>
          <Avatar ml={open ? 3 : 0} size='sm' src='avatar-1.jpg' />
          <Flex ml={4} display={open ? 'flex' : 'none'}>
            <Heading as='h3' size='sm'>
              Kevin Chen
            </Heading>
          </Flex>
        </Flex>
      </Flex>
    </MotionFlex>
  );
};

export default withRouter(SideBar);
