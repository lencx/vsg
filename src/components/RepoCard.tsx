/**
 * @author: lencx
 * @create_at: Dec 12, 2020
 */

import React, { FC } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Button,
  Tooltip,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import GhBtn from 'components/GhBtn';
import RepoIcon from 'components/Icons/RepoIcon';
import StarsIcon from 'components/Icons/StarsIcon';
import ForksIcon from 'components/Icons/ForksIcon';
import IssuesIcon from 'components/Icons/IssuesIcon';
import { langColors } from 'utils/tools';
import { RepoInfo } from 'github/type';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100%',
    },
    repoBtn: {
      textTransform: 'none',
    },
    repoName: {
      fontSize: '0.9rem',
      marginLeft: 5,
      wordBreak: 'break-all',
      textAlign: 'left',
      lineHeight: 1.1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': 1,
      '-webkit-box-orient': 'vertical',
    },
    repoDescBox: {
      height: 34,
    },
    repoDesc: {
      fontSize: '0.9rem',
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
      color: '#666',
    },
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

export interface RepoCardProps extends RepoInfo {}

const RepoCard: FC<RepoCardProps> = (props) => {
  const {
    avatar,
    author,
    repoName,
    repoDesc,
    repoURL,
    lang,
    stars,
    forks,
    openIssues,
  } = props;
  const classes = useStyles();

  const handleGoRepo = () => {
    window.location.href = repoURL;
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar aria-label="recipe" src={avatar} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={author}
        // subheader={}
      />
      <CardContent>
        {/* <Chip
          // variant="outlined"
          // size="small"
          label={repoName}
          color="primary"
        /> */}

        <Button
          // variant="outlined"
          size="small"
          color="primary"
          className={classes.repoBtn}
          onClick={handleGoRepo}>
          <RepoIcon size={18} />
          <b className={classes.repoName}>{repoName}</b>
        </Button>
        <Tooltip title={repoDesc || ''}>
          <div className={classes.repoDescBox}>
            <p className={classes.repoDesc}>{repoDesc}</p>
          </div>
        </Tooltip>
      </CardContent>
      <CardActions>
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
    </Card>
  );
};

export default RepoCard;
