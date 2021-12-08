import {
  Box,
  Button,
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';

export default function Feature({ heading, desc, inverted, id, img }) {
  return (
    <Box bg={inverted ? 'none' : '#F1F5F9'}>
      <Container id={id} maxW={'6xl'} pb={32} pt={32}>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          rows={{ base: 2, md: 1 }}
          spacing={10}
          alignItems='center'
        >
          <Stack
            spacing={4}
            gridArea={[1, 1, inverted ? '1/2' : 1]}
            data-aos='fade-left'
          >
            <Heading>{heading}</Heading>
            <Text color={'gray.700'} fontSize={'lg'}>
              {desc}
            </Text>
            <Box>
              <Button
                as='a'
                rounded='full'
                px={8}
                bg='blue'
                variant='ghost'
                color='#fff'
                cursor='pointer'
                rightIcon={<FiArrowRight />}
                href='http://localhost:3001/sign_up'
              >
                Get started
              </Button>
            </Box>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.100', 'gray.700')}
                />
              }
            ></Stack>
          </Stack>
          <Flex
            justify={inverted ? 'start' : 'end'}
            pos='relative'
            data-aos='fade-right'
          >
            <Image
              rounded={'md'}
              alt='feature image'
              src={img ? `./${img}.png` : './feature.png'}
              objectFit='cover'
              zIndex={2}
            />
          </Flex>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
