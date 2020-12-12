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
  Chip,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import RepoIcon from 'components/Icons/RepoIcon';
import StarsIcon from 'components/Icons/StarsIcon';
import ForksIcon from 'components/Icons/ForksIcon';
import IssuesIcon from 'components/Icons/IssuesIcon';
import { langColors } from 'utils/tools';

const useStyles = makeStyles((theme: Theme) =>
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
      textShadow: '1px 1px 1px #222',
      border: 'solid 2px rgba(27, 31, 35, 0.3)',
      boxSizing: 'border-box',
      fontSize: '0.45rem',
      fontWeight: 'bold',
      padding: '1px 3px 2px',
      textAlign: 'center',
      borderRadius: 8,
      minWidth: 20,
      marginRight: 30,
    },
    ghbtn: {
      fontSize: '0.7rem',
      border: 'none',
      marginLeft: 10,
    },
  })
);

export interface RepoCardProps {
  avatar: string;
  author: string;
  repoName: string;
  repoDesc: string;
  repoURL: string;
  lang?: string;
  stars?: number;
  forks?: number;
  openIssues?: number;
}

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
        {/* {lang && <Chip
          className={classes.lang}
          size="small"
          avatar={
            <Avatar style={{
              background: langColors(lang),
              color: '#fff',
              textShadow: '0 0 0 1px #000',
              border: 'solid 2px rgba(27, 31, 35, 0.1)',
              boxSizing: 'border-box',
            }}>
              {lang?.charAt(0)}
            </Avatar>
          }
          variant="outlined"
          label={<b>{lang}</b>}
        />} */}
        {lang && (
          <span
            className={classes.lang}
            style={{ background: langColors(lang) }}>
            {lang}
          </span>
        )}

        <Chip
          className={classes.ghbtn}
          size="small"
          avatar={<StarsIcon />}
          variant="outlined"
          label={<b>{stars}</b>}
        />
        <Chip
          className={classes.ghbtn}
          size="small"
          avatar={<ForksIcon />}
          variant="outlined"
          label={<b>{forks}</b>}
        />
        <Chip
          className={classes.ghbtn}
          size="small"
          avatar={<IssuesIcon />}
          variant="outlined"
          label={<b>{openIssues}</b>}
        />
      </CardActions>
    </Card>
  );
};

export default RepoCard;
