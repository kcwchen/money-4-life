import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';

export default function BudgetDetails(props) {
  return (
    <Center py={12} px={5}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Stack align={'center'}>
          <CircularProgress size='250px' value={80}>
            <CircularProgressLabel fontSize='30'>
              ${props.amount / 100}
            </CircularProgressLabel>
          </CircularProgress>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {props.category}
          </Heading>
        </Stack>
      </Box>
    </Center>
  );
}
