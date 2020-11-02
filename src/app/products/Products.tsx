import { Button, Checkbox, Flex, Icon, Image, Input, InputGroup, InputRightElement, PseudoBox, Stack, Text } from '@chakra-ui/core';
import React, { useState } from 'react';
import productImage from '../images/product.png'

export const Products = () => {
  const [products, setProducts] = useState([]);

  return (
    <PseudoBox bg="#F2F2F2" h="100vh" textAlign="center">
      <Flex bg="white" padding="6" justifyContent="space-around" alignItems="center">
        <Stack spacing={6} direction="row" display="contents">
          <PseudoBox>
            <Text fontWeight="bold">join.tsh.io</Text>
          </PseudoBox>
          <Stack spacing={6} direction="row">
            <InputGroup alignSelf="center">
              <Input placeholder="search" />
              <InputRightElement>
                <Icon name="search" color="gray.300" />
              </InputRightElement>
            </InputGroup>
            <Checkbox variantColor="blue" defaultIsChecked>Active</Checkbox>
            <Checkbox variantColor="blue" defaultIsChecked>Promo</Checkbox>
          </Stack>
          <Button alignSelf="center" variantColor="blue" variant="outline">Log in</Button>
        </Stack>
      </Flex>
      {products.length === 0 && (
        <PseudoBox display="inline-block" bg="white" mt="16" py="16" px="32" textAlign="center" justifyContent="center" borderRadius={8} boxShadow="md">
          <Image src={productImage} />
          <Text fontWeight="bold">Ooops... it's empty here</Text>
          <Text color="gray.300" fontSize="sm">There are no products on the list</Text>
        </PseudoBox>
      )}
    </PseudoBox>
  );
};
