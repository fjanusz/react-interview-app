import { Box, Button, Flex, Image, Input, Stack, Text } from '@chakra-ui/core';
import React from 'react';
import loginImage from '../images/loginBackground.png';

import { useHistory } from 'react-router-dom';

import { AppRoute } from 'routing/AppRoute.enum';
import theme from 'app/theme';

export const Login = () => {
  const history = useHistory();

  const redirectToProduct = () => {
    history.push(AppRoute.product)
  }
  return (
    <Flex justifyContent="center" h="100vh" bg="white">
      <Image d={["none", "none", "none", "initial"]} h="100vh" flex="1" src={loginImage} />
      <Box flex="1" mx="32" my="6" alignContent="center">
        <Text fontSize="md" fontWeight={600} color="standardBlack" pb="32">join.tsh.io</Text>
        <Stack spacing={6}>
          <Text fontSize="lg" fontWeight={600} color="standardBlack">Login</Text>
          <Stack spacing={0}>
            <Text fontSize="xs" color="standardBlack">Username</Text>
            <Input isFullWidth={false} _focus={{ outline: "none" }} variant="outline" placeholder="username" />
          </Stack>
          <Stack spacing={0}>
            <Text fontSize="xs" color="standardBlack">Password</Text>
            <Input isFullWidth={false} _focus={{ outline: "none" }} type="password" variant="outline" placeholder="password" />
          </Stack>
        </Stack>
        <Stack spacing={0} mt="20">
          <Button {...theme.buttons.full} onClick={() => redirectToProduct()}>
            Log in
          </Button>
          <Text as="u" fontSize="xs" color="darkGray">forgot password?</Text>
        </Stack>
      </Box>
    </Flex>
  );
};
