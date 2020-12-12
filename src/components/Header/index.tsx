import React, { FC } from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import { useGhState, useGhDispatch } from 'github';

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const dispatch = useGhDispatch();
  const ghState = useGhState();

  return (
    <div>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button
          onClick={() =>
            dispatch({ type: 'setData', payload: { count: ghState.count + 1 } })
          }>
          Three
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Header;
