import React, { FC } from 'react';
import { ButtonGroup, Button } from '@material-ui/core';

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <div>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </div>
  );
};

export default Header;
