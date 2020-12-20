import React, { FC } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography, Divider } from '@material-ui/core';
import { RepoInfo } from 'github/type';
import RepoActions from 'components/RepoActions';

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
    actions: {
      marginLeft: 60,
    }
  }),
);

export interface RepoListProps extends RepoInfo {
  hasDivider?: boolean;
}

const RepoList: FC<RepoListProps> = (props) => {
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
    hasDivider,
  } = props;
  const classes = useStyles();

  const handleGoRepo = () => {
    window.location.href = repoURL;
  };
  return (
    <div onClick={handleGoRepo}>
      <ListItem alignItems="flex-start" component="div">
        <ListItemAvatar>
          <Avatar alt="avatar" src={avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={author}
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                [{repoName}]{' '}
              </Typography>
              <span>{repoDesc}</span>
            </>
          }
        />
      </ListItem>
      <RepoActions
        className={classes.actions}
        lang={lang}
        stars={stars}
        forks={forks}
        openIssues={openIssues}
      />
      {hasDivider && <Divider />}
    </div>
  );
};

RepoList.defaultProps = {
  hasDivider: true,
};

export default RepoList;