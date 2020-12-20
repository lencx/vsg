/**
 * @author: lencx
 * @create_at: Dec 12, 2020
 */

import React, { FC } from 'react';
import { CardActions } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import GhBtn from 'components/GhBtn';
import StarsIcon from 'components/Icons/StarsIcon';
import ForksIcon from 'components/Icons/ForksIcon';
import IssuesIcon from 'components/Icons/IssuesIcon';
import { langColors } from 'utils/tools';

const useStyles = makeStyles(() =>
  createStyles({
    lang: {
      color: '#fff',
      textShadow: '1px 1px 1px #666',
      border: 'solid 2px rgba(27, 31, 35, 0.1)',
      boxSizing: 'border-box',
      fontSize: '0.4rem',
      fontWeight: 'bold',
      padding: '0 4px 2px',
      textAlign: 'center',
      borderRadius: 10,
      minWidth: 20,
      marginRight: 30,
    },
  })
);

export interface RepoActionsProps {
  lang?: string;
  stars?: number;
  forks?: number;
  openIssues?: number;
  className?: string;
}

const RepoActions: FC<RepoActionsProps> = (props) => {
  const {
    lang,
    stars,
    forks,
    openIssues,
    className,
  } = props;
  const classes = useStyles();

  return (
    <CardActions className={className}>
      {lang && (
        <span
          className={classes.lang}
          style={{ background: langColors(lang) }}>
          {lang}
        </span>
      )}
      <GhBtn icon={<StarsIcon />} count={stars} />
      <GhBtn icon={<ForksIcon />} count={forks} />
      <GhBtn icon={<IssuesIcon />} count={openIssues} />
    </CardActions>
  );
};

export default RepoActions;
