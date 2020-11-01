import { Button } from '@chakra-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from 'routing/AppRoute.enum';

export const Products = () => {
  return (
    <>
      <h2>Products page</h2>
      <Link to={AppRoute.login}>
        <Button variantColor="blue" variant="solid">
          Login
        </Button>
      </Link>
    </>
  );
};
