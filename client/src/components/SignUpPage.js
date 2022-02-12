import React, { useState, useEffect, useContext } from 'react';
import { User } from '../requests';
import { Link as ReactLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  HStack,
  Image,
} from '@chakra-ui/react';
import logo from '../assets/images/logo.png';
import AuthContext from '../context/auth-context';

export default function SignUpPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { onSignUp } = props;
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
    User.create(data).then((user) => {
      if (user?.id) {
        onSignUp();
        setTimeout(() => {
          props.history.push('/home');
        }, 2000);
      }
    });
  };

  return (
    <>
      <Link
        href='https://money-4-life.vercel.app'
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
            <Heading fontSize={'4xl'}>Get started with Money 4 Life</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Sign up for a free account!
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
                <HStack>
                  <Box>
                    <FormControl id='firstName' isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        name='first_name'
                        type='text'
                        placeholder='First Name'
                        {...register('first_name')}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id='lastName'>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        name='last_name'
                        type='text'
                        placeholder='Last Name'
                        {...register('last_name')}
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id='email' isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type='email'
                    name='email'
                    placeholder='Email'
                    {...register('email')}
                  />
                  {errors.email}
                </FormControl>
                <FormControl id='password' isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type='password'
                    name='password'
                    placeholder='Password'
                    {...register('password')}
                  />
                  {errors.password}
                </FormControl>
                <FormControl id='passwordConfirmation' isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type='password'
                    name='password'
                    placeholder='Password'
                    {...register('password_confirmation')}
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
                    Sign Up
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
          <Box align='center'>
            <Text fontSize={'lg'} color={'gray.600'}>
              Already have an account?{' '}
              <Link as={ReactLink} to='/' color={'blue.400'}>
                Sign In!
              </Link>
            </Text>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
