import { 
  Box, 
  Button, 
  Checkbox, 
  Flex, 
  Icon, 
  Image, 
  Input, 
  InputGroup, 
  InputRightElement, 
  PseudoBox, 
  SimpleGrid, 
  Stack, 
  Text 
} from '@chakra-ui/core';
import Axios from 'axios';
import ReactPaginate from 'react-paginate';
import React, { useEffect, useState } from 'react';

import productImage from '../images/product.png';

type productsType = {
  items: {
    id: number,
    name: string,
    description: string,
    rating: number,
    image: string,
    active: boolean,
    promo: boolean,
  }[],
  links: {
    first: string,
    last: string,
    next: string,
    previous: string,
  },
  meta: {
    currentPage: number,
    totalPages: number
  }
};

export const Products = () => {
  const [products, setProducts] = useState <productsType>();
  const [pageIndex, setPageIndex] = useState(1);
  const [active, setActive] = useState(false);
  const [promo, setPromo] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await Axios.get('https://join-tsh-api-staging.herokuapp.com/product', {
        params: {
          search: search,
          limit: 8,
          page: pageIndex,
          active: active ? active : null,
          promo: promo ? promo : null,
        }
      })
      .then((response) => {
        return response.data;
      });
      setProducts(products);
    }
    fetchProducts();
  }, [pageIndex, active, promo, search]);

  const onChangePage = (pageNumber: any) => {
    setPageIndex(pageNumber.selected + 1);
    window.scrollTo(0,0);
  }

  const onActive = () => {
    setActive(value => !value);
  }

  const onPromo = () => {
    setPromo(value => !value);
  }

  return (
    <PseudoBox bg="#F2F2F2" textAlign="center">
      <Flex bg="white" padding="6" justifyContent="space-around" alignItems="center">
        <Stack spacing={6} direction="row" display="contents">
          <PseudoBox>
            <Text fontWeight="bold">join.tsh.io</Text>
          </PseudoBox>
          <Stack spacing={6} direction="row">
            <InputGroup alignSelf="center">
              <Input value={search} onChange={(event: any) => setSearch(event.target.value)} placeholder="search" />
              <InputRightElement>
                <Icon name="search" color="gray.300" />
              </InputRightElement>
            </InputGroup>
            <Checkbox variantColor="blue" borderColor="#E0E2EA" onChange={onActive}>Active</Checkbox>
            <Checkbox variantColor="blue" borderColor="#E0E2EA" onChange={onPromo}>Promo</Checkbox>
          </Stack>
          <Button alignSelf="center" variantColor="blue" variant="outline">Log in</Button>
        </Stack>
      </Flex>
      {products?.items.length === 0 && (
        <PseudoBox 
          display="inline-block" 
          bg="white" 
          mt="16" 
          py="16" 
          px="32" 
          textAlign="center" 
          justifyContent="center" 
          borderRadius={8} 
          boxShadow="md"
        >
          <Image src={productImage} />
          <Text fontWeight="bold">Ooops... it's empty here</Text>
          <Text color="gray.300" fontSize="sm">There are no products on the list</Text>
        </PseudoBox>
      )}
      {products && products.items.length > 0 && (
        <>
          <SimpleGrid minChildWidth="300px" spacing="6" p={6}>
            {products?.items.map((product, index) => (
              <Box key={index} bg="white"  w="100%" borderRadius={8} pb={6}>
                {product.promo && <PseudoBox bg="#F9A52B" color="#fff" pos="absolute" mt={6} px={6} py={2} zIndex={1}>Promo</PseudoBox>}
                <Image src={product.image} w="100%" roundedTop={8} opacity={product.active ? 1 : 0.5}/>
                <Stack spacing={3} px={6}>
                  <Text>{product.name}</Text>
                  <PseudoBox height={16}>
                    <Text color="grey" fontSize="sm">{product.description}</Text>
                  </PseudoBox>
                  <Button isDisabled={!product.active} variantColor="blue" variant="solid" justifySelf="flex-end">
                    {product.active ? "Show details" : "Unavailable"}
                  </Button>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
          <ReactPaginate
            breakLabel={'...'}
            pageCount={products.meta.totalPages}
            pageRangeDisplayed={2}
            marginPagesDisplayed={3}
            containerClassName="pagination"
            activeClassName="active"
            onPageChange={onChangePage}
          />
        </>
      )}
    </PseudoBox>
  );
};
