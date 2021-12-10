import Image from 'next/image';
import { Box, useColorModeValue, Flex } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box
      as='footer'
      color={useColorModeValue('gray.700', 'gray.200')}
      bg='#fff'
    >
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Image src='/logo512.png' alt='m4l logo' width='50px' height='50px' />
        </Flex>
      </Box>
    </Box>
  );
}
