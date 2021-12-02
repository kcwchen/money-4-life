import React from 'react';
import { Flex, Text, IconButton, Divider, Heading } from '@chakra-ui/react';
import { motion, useCycle } from 'framer-motion';
import {
  FiMenu,
  FiHome,
  FiCalendar,
  FiUser,
  FiBriefcase,
  FiSettings,
  FiArrowLeft,
} from 'react-icons/fi';
import NavItem from './NavItem';

export default function SideBar() {
  const [open, cycleOpen] = useCycle(false, true);
  const MotionFlex = motion(Flex);
  const sideVariants = {
    closed: {
      width: '75px',
    },
    open: {
      width: '250px',
    },
  };

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
        <NavItem open={open} icon={FiHome} title='Budget' active />
        <NavItem open={open} icon={FiCalendar} title='Transactions' />
        <NavItem open={open} icon={FiUser} title='Subscriptions' />
        <NavItem open={open} icon={FiBriefcase} title='Reports' />
        <NavItem open={open} icon={FiSettings} title='Settings' />
      </Flex>
    </MotionFlex>
  );
}
