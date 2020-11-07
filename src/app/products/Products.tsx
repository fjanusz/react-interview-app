import {
  Avatar,
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
  Spinner,
  Stack,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/core';
import ReactPaginate from 'react-paginate';
import React, { useState } from 'react';
import BeautyStars from 'beauty-stars';

import theme from '../theme';
import productImage from '../images/product.png';
import avatarImage from '../images/avatar.png';
import { useGetProducts } from 'app/hooks/hooks';
import DetailsModal from '../modals/DetailsModal';
import { useHistory } from 'react-router-dom';
import { AppRoute } from 'routing/AppRoute.enum';

type StatusType = "loading" | "error" | "success";
type ModalState = {
  image: string,
  description: string,
  name: string,
}

export const Products = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [active, setActive] = useState(false);
  const [promo, setPromo] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusType>("loading")
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalState, setModalState] = useState<ModalState>({ image: "", description: "", name: "" });
  const history = useHistory();

  const redirectToLogin = () => {
    history.push(AppRoute.login)
  }

  const products = useGetProducts(search, pageIndex, active, promo, setStatus);

  const onChangePage = (pageNumber: any) => {
    setPageIndex(pageNumber.selected + 1);
    window.scrollTo(0, 0);
  }

  const onActive = () => {
    setActive(value => !value);
  }

  const onPromo = () => {
    setPromo(value => !value);
  }

  const user = {
    login: true
  };

  return (
    <PseudoBox textAlign="center">
      <Flex
        bg="white"
        padding="6"
        justifyContent="space-around"
        alignItems="center"
        flexWrap="wrap"
      >
        <Text fontWeight={600}>join.tsh.io</Text>
        <InputGroup alignSelf="center">
          <Input
            {...theme.input}
            value={search}
            onChange={(event: any) => setSearch(event.target.value)}
            placeholder="search"
          />
          <InputRightElement>
            <Icon name="search" color="standardBlack" />
          </InputRightElement>
        </InputGroup>
        <PseudoBox>
          <Checkbox borderColor="lightGray" variantColor="blue" px={2} onChange={onActive}>Active</Checkbox>
          <Checkbox borderColor="lightGray" variantColor="blue" px={2} onChange={onPromo}>Promo</Checkbox>
        </PseudoBox>
        {user.login
          ? (
            <Menu>
              <MenuButton as={PseudoBox} m={2}>
                <Avatar name="Avatar" src={avatarImage} />
              </MenuButton>
              <MenuList placement="bottom-end">
                <MenuItem onClick={redirectToLogin} bg="white" border="none">Logout</MenuItem>
              </MenuList>
            </Menu>
          )
          : <Button {...theme.buttons.outline} alignSelf="center">Log in</Button>
        }
        {status === "loading" && <Spinner {...theme.spiner} pos="absolute" right={["0rem", "1rem"]} size="lg" />}
      </Flex>
      {status === "error" && <Text>Error</Text>}
      {products?.items.length === 0 && <EmptyProductsList />}
      {products?.items.length !== 0 && (
        <>
          <SimpleGrid columns={[1, 2, 4]} spacing={6} p={12}>
            {products?.items.map((product, index) => {
              const onClick = () => {
                setModalState({ image: product.image, description: product.description, name: product.name });
                onOpen();
              }
              return (
                <Box key={index} bg="white" borderRadius={8} pb={6}>
                  {product.promo && (
                    <PseudoBox bg="standardOrange" color="#fff" pos="absolute" mt={6} px={6} py={2} zIndex={1}>
                      Promo
                    </PseudoBox>
                  )}
                  <Image src={product.image} w="100%" roundedTop={8} opacity={product.active ? 1 : 0.5} />
                  <Stack spacing={3} p={6}>
                    <Text color="standardBlack" fontWeight={600}>{product.name}</Text>
                    <PseudoBox height={16}>
                      <Text color="darkGray" fontSize="sm">{product.description}</Text>
                    </PseudoBox>
                    <PseudoBox>
                      <BeautyStars
                        value={product.rating}
                        maxStars={5}
                        size={15}
                        gap={10}
                        inactiveColor={theme.colors.lightGray}
                        activeColor={theme.colors.standardOrange}
                      />
                    </PseudoBox>
                    <Button {...theme.buttons.full} onClick={onClick} isDisabled={!product.active} justifySelf="flex-end">
                      {product.active ? "Show details" : "Unavailable"}
                    </Button>
                  </Stack>
                </Box>
              )
            })}
          </SimpleGrid>
          {products && products.meta.totalPages > 1 &&
            <ReactPaginate
              breakLabel={'...'}
              pageCount={products.meta.totalPages}
              pageRangeDisplayed={1}
              marginPagesDisplayed={2}
              containerClassName="pagination"
              activeClassName="active"
              onPageChange={onChangePage}
            />
          }
        </>
      )}
      <DetailsModal isOpen={isOpen} onClose={onClose} state={modalState} />
    </PseudoBox>
  );
};

const EmptyProductsList = () => {
  return (
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
      <Text fontWeight={600} color="standardBlack">Ooops... it's empty here</Text>
      <Text color="darkGray" fontSize="sm">There are no products on the list</Text>
    </PseudoBox>
  );
}
