import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';

export default function SignUpNow() {
  return (
    <Container maxW={'6xl'}>
      <Box
        py='4rem'
        bg='linear-gradient(
      45deg,#8E2DE2,#4A00E0)'
        borderRadius={32}
        shadow='xl'
        data-aos='fade-up'
      >
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
          <Heading color='white' fontSize={'4xl'}>
            Get started today
          </Heading>
          <Text color='whiteAlpha.900' fontSize={'xl'}>
            Let us help you keep your Money for Life.
          </Text>
          <Box>
            <Button
              as='a'
              href='http://money-4-life-app.vercel.app/sign_up'
              size='lg'
              rounded='full'
              px={6}
              colorScheme='blue'
              bg={'#6F55FF'}
              _hover={{ bg: '#5842d8' }}
            >
              Sign Up
            </Button>
          </Box>
        </Stack>
      </Box>
      <Divider />
    </Container>
  );
}
