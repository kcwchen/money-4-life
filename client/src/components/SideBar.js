import React, { useState } from 'react';
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Heading,
  Avatar,
  Image,
  HStack,
} from '@chakra-ui/react';
import { motion, useCycle } from 'framer-motion';
import {
  FiMenu,
  FiHome,
  FiDollarSign,
  FiBarChart,
  FiLayers,
  FiArrowLeft,
  FiLogOut,
} from 'react-icons/fi';
import NavItem from './NavItem';
import { Session } from '../requests';
import { withRouter } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';

const SideBar = (props) => {
  const { onSignOut, currentUser } = props;

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
    });
  };

  return (
    <MotionFlex
      pos='sticky'
      left='5'
      top='5'
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
        <Flex
          flexDir={open ? 'row' : 'column'}
          // align='space-between'
          // justify='center'
        >
          <HStack>
            <Image
              src={logo}
              boxSize={open ? '50px' : '50px'}
              mt={5}
              display='inline-block'
            />
            {open ? (
              <Heading as='h2' fontSize={30} display='inline-block' pt={5}>
                M4L.
              </Heading>
            ) : null}
          </HStack>
          <IconButton
            background='none'
            mt={3}
            _hover={{ background: 'none' }}
            icon={open ? <FiArrowLeft /> : <FiMenu />}
            alignSelf={open ? 'flex-end' : 'center'}
            onClick={cycleOpen}
            ml={open ? 5 : 0}
          />
        </Flex>
        <NavItem open={open} icon={FiHome} title='Budget' path='home' />
        <NavItem
          open={open}
          icon={FiDollarSign}
          title='Transactions'
          path='transactions'
        />
        <NavItem
          open={open}
          icon={FiLayers}
          title='Subscriptions'
          path='subscriptions'
        />
        <NavItem open={open} icon={FiBarChart} title='Reports' path='reports' />
        <NavItem
          open={open}
          icon={FiLogOut}
          title='Sign Out'
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
              {currentUser
                ? `${currentUser.first_name} ${currentUser.last_name}`
                : null}
            </Heading>
          </Flex>
        </Flex>
      </Flex>
    </MotionFlex>
  );
};

export default withRouter(SideBar);
