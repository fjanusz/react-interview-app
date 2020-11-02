import { Box, Button, Checkbox, Flex, Grid, Icon, Image, Input, InputGroup, InputRightElement, PseudoBox, SimpleGrid, Stack, Text } from '@chakra-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import productImage from '../images/product.png';

type products = {
  id: number,
  name: string,
  description: string,
  rating: number,
  image: string,
  active: boolean,
  promo: boolean,
}[];

export const Products = () => {
  const [products, setProducts] = useState <products>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await Axios.get('https://join-tsh-api-staging.herokuapp.com/product?limit=8&page=1&promo=true&active=true')
      .then((response) => {
        return response.data.items;
      });
      setProducts(products);
    }
    fetchProducts();
  }, []);
  console.log(products)
  return (
    <PseudoBox bg="#F2F2F2" textAlign="center">
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
      {products.length > 0 && (
        <SimpleGrid minChildWidth="300px" spacing="6" p="6">
          {products.map((product, index) => (
            <Box key={index} flex="1" bg="white"  w="100%" borderRadius={8} pb={6}>
              <Image src={product.image} w="100%" rounded={8} opacity={product.active ? 100 : 50}/>
              <Stack spacing={0}>
                <Text>{product.name}</Text>
                <Text color="grey" fontSize="sm">{product.description}</Text>
              </Stack>
              <Button isDisabled={!product.active} variantColor="blue" variant="solid" justifySelf="flex-end">Show details</Button>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </PseudoBox>
  );
};
