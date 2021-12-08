import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  IconProps,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import useScript from '../hooks/useScript';

export default function Hero() {
  const MotionBox = motion(Box);
  return (
    <Container maxW='100%' pos='relative' pt={{ base: 0, md: 10 }}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        pt={{ base: 20, md: 40 }}
        pb={{ base: 20, md: 20 }}
      >
        <Heading fontWeight={600} fontSize='6xl' zIndex={5} data-aos='fade-up'>
          The budget app that works for you
        </Heading>
        <Text
          fontSize='xl'
          color={'gray.700'}
          maxW={'3xl'}
          zIndex={5}
          data-aos='fade-up'
        >
          Managing money can be hard. Don't do it alone. Money 4 Life empowers
          you to save more, spend less, and take back control of your financial
          life.
        </Text>
        <Stack
          spacing={6}
          direction={'row'}
          align='center'
          pb={{ base: 8, md: 32 }}
        >
          <Button
            data-aos='fade-up'
            as='a'
            href='http:/localhost:3001/signup'
            size='lg'
            rounded={'full'}
            px={6}
            colorScheme={'blue'}
            bg={'#6F55FF'}
            _hover={{ bg: '#5842d8' }}
          >
            Sign Up
          </Button>
          <Button
            as='a'
            size='lg'
            href='#features'
            rounded={'full'}
            px={6}
            data-aos='fade-up'
          >
            Learn more
          </Button>
        </Stack>
        {/* <Flex w={'full'}> */}
        <Box data-aos='zoom-out-up' data-aos-delay='500'>
          <Image
            src='./main.png'
            alt='Screenshot of M4L UI'
            maxW={['100%', '100%', '4xl']}
          />
        </Box>
        {/* </Flex> */}
      </Stack>
    </Container>
  );
}
