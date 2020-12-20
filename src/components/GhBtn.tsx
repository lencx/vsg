/**
 * @author: lencx
 * @create_at: Dec 20, 2020
 */

import React, { FC } from 'react';
import { Chip } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() =>
  createStyles({
    ghbtn: {
      fontSize: '0.7rem',
      border: 'none',
      marginLeft: 10,
      color: '#666',
    },
  })
);

export interface GhBtnProps {
  className?: string;
  icon?: React.ReactElement;
  count?: number;
}

const GhBtn: FC<GhBtnProps> = ({ icon, count }) => {
  const classes = useStyles();
  return count ? (
    <Chip
      className={classes.ghbtn}
      size="small"
      avatar={icon}
      variant="outlined"
      label={<b>{count}</b>}
    />
  ) : null;
};

export default GhBtn;
