import React, { useState, useEffect, useContext } from 'react';
import { Session } from '../requests';
import { Link as ReactLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  HStack,
  Image,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import logo from '../assets/images/logo.png';
import AuthContext from '../context/auth-context';

export default function SignInPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { onSignIn } = props;
  const ctx = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (ctx.user) {
      props.history.push('/home');
    }
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    Session.create(data).then((user) => {
      if (user?.id) {
        onSignIn();
        setTimeout(() => {
          props.history.push('home');
        }, 2000);
      }
    });
  };

  return (
    <>
      <Link
        href='http://localhost:3002'
        textDecor='none'
        _hover={{ textDecor: 'none' }}
      >
        <HStack ml={5} pos='absolute'>
          <Image src={logo} boxSize='50px' mt={5} display='inline-block' />
          <Heading as='h2' fontSize={30} display='inline-block' pt={5}>
            M4L.
          </Heading>
        </HStack>
      </Link>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Welcome to Money 4 Life</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Sign in to your account!
            </Text>
          </Stack>
          <Box
            // rounded={'lg'}
            // bg={useColorModeValue('white', 'gray.700')}
            // boxShadow={'lg'}
            p={5}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl id='email'>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type='email'
                    placeholder='Email'
                    {...register('email')}
                  />
                  {errors.email}
                </FormControl>
                <FormControl id='password'>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type='password'
                    placeholder='Password'
                    {...register('password')}
                  />
                  {errors.password}
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    isLoading={isLoading}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    type='submit'
                  >
                    Sign In
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
          <Box align='center'>
            <Text fontSize={'lg'} color={'gray.600'}>
              Don't have an account?{' '}
              <Link as={ReactLink} to='/sign_up' color={'blue.400'}>
                Sign Up!
              </Link>
            </Text>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
