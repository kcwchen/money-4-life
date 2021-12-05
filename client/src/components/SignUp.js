import React, { useState } from 'react';
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
} from '@chakra-ui/react';

export default function SignUp(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { onSignUp } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    // e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // const params = {
    //   email: formData.get('email'),
    //   password: formData.get('password'),
    // };
    // console.log(params);
    User.create(data).then((user) => {
      if (user?.id) {
        onSignUp();
        setTimeout(() => {
          props.history.push('home');
        }, 2000);
      }
    });
  };

  return (
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
            <Link as={ReactLink} to='/sign_in' color={'blue.400'}>
              Sign In!
            </Link>
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
}
