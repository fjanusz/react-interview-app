import { Box, Button, Flex, Image, Input, Stack, Text } from '@chakra-ui/core';
import React from 'react';
import loginImage from '../images/loginBackground.png';

import { useHistory } from 'react-router-dom';

import { AppRoute } from 'routing/AppRoute.enum';

export const Login = () => {
  const history = useHistory();

  const redirectToProduct = () => {
    history.push(AppRoute.product)
  }
  return (
    <Flex>
      <Image flex="1" h="100vh" src={loginImage}/>
      <Box flex="1" mx="32" my="6" alignContent="center">
        <Text fontSize="md" fontWeight="bold" pb="32">join.tsh.io</Text>
        <Text fontSize="lg" fontWeight="bold">Login</Text>
        <Stack spacing={0}>
          <Text fontSize="xs">Username</Text>
          <Input isFullWidth={false} variant="outline" placeholder="username" />
        </Stack>
        <Stack spacing={0}>
          <Text fontSize="xs">Password</Text>
          <Input isFullWidth={false} variant="outline" placeholder="password" />
        </Stack>
        <Stack spacing={0} mt="20">
          <Button variantColor="blue" variant="solid" onClick={() => redirectToProduct()}>
            Log in
          </Button>
          <Text as="u" fontSize="xs">forgot password?</Text>
        </Stack>
      </Box>
    </Flex>
  );
};
