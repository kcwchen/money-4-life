import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';

export default function Hero() {
  return (
    <Flex
      maxW='100%'
      pos='relative'
      pt={{ base: 0, md: 10 }}
      backgroundImage={{ base: 0, lg: './hero.svg' }}
      backgroundRepeat={'no-repeat'}
      backgroundPosition={'right'}
      backgroundSize={'contain'}
      backgroundColor={'lightblue'}
    >
      <Stack
        textAlign={'left'}
        align='flex-start'
        spacing={{ base: 8, md: 10 }}
        pt={{ base: 20, md: 60 }}
        pb={{ base: 20, md: 20 }}
        ml={{ base: 5, md: 60 }}
        maxW='lg'
      >
        <Heading fontWeight={600} fontSize='6xl' zIndex={5} data-aos='fade-up'>
          Budgeting that works for you
        </Heading>
        <Text
          fontSize='xl'
          color={'gray.700'}
          maxW={'3xl'}
          zIndex={5}
          data-aos='fade-up'
        >
          Managing money can be hard. Don't do it alone. <br />
          <strong>Money 4 Life</strong> empowers you to save more, spend less,
          and take back control of your financial life.
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
            href='http://localhost:3001/sign_up'
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
      </Stack>
    </Flex>
  );
}
