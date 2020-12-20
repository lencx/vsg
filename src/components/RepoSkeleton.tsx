/**
 * @author: lencx
 * @create_at: Dec 16, 2020
 */

import React, { FC } from 'react';
import { Grid, Card, CardHeader, CardContent, List, ListItem, Avatar } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      // maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }),
);

export const RepoSkeletonCard = () => {
  return (
    <Card>
      <CardHeader
        avatar={<Skeleton animation="wave" variant="circle" width={40} height={40} />}
        title={<Skeleton animation="wave" height={20} width="40%" style={{ marginBottom: 6 }} />}
        subheader={<Skeleton animation="wave" height={10} width="20%" />}
      />
      <CardContent>
        <Skeleton animation="wave" height={30} width="50%" />
        <Skeleton animation="wave" height={20} width="100%" />
        <Skeleton animation="wave" height={20} width="100%" />
        <Skeleton animation="wave" height={16} width="60%" style={{ marginTop: 20 }} />
      </CardContent>
    </Card>
  );
};

export const RepoSkeletonItem = () => {
  const classes = useStyles();
  return (
    <ListItem className={classes.root}>
      <Skeleton variant="circle"><Avatar /></Skeleton>
      <Skeleton animation="wave" height={60} width="20%" />
      <Skeleton animation="wave" height={60} width="20%" />
      <Skeleton animation="wave" height={60} width="20%" />
    </ListItem>
  );
};

export interface RepoSkeletonListProps {
  number?: number;
  type?: 'grid' | 'list';
};

const RepoSkeletonList: FC<RepoSkeletonListProps> = ({ number, type }) => {
  switch (type) {
    case 'grid': {
      return (
        <Grid container spacing={2}>
          {Array.from({ length: number || 0 }).map((i: any, idx: number) => {
            return (
              <Grid item md={4} sm={6} xs={12} key={+idx}>
                <RepoSkeletonCard key={+idx} />
              </Grid>
            );
          })}
        </Grid>
      );
    }
    case 'list': {
      return (
        <List>
          {Array.from({ length: number || 0 }).map((i: any, idx: number) => {
            return <RepoSkeletonItem key={+idx} />;
          })}
        </List>
      );
    }
    default: return null;
  }
};

RepoSkeletonList.defaultProps = {
  number: 6,
  type: 'list',
};

export default RepoSkeletonList;
