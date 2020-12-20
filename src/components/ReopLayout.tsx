/**
 * @author: lencx
 * @create_at: Dec 12, 2020
 */

import React, { memo } from 'react';
import { Paper, Grid, List } from '@material-ui/core';

import { GhRepo } from 'github/type';
import { useGhState } from 'github';
import RepoCard from 'components/RepoCard';
import RepoItem from 'components/RepoItem';

const RepoLayout = () => {
  const ghState: any = useGhState();
  const list = ghState?.trendingList as GhRepo[];
  const type = ghState?.config?.layout || 'grid';

  if (!list) {
    return <div>loading...</div>;
  }

  if (type === 'list') {
    return (
      <Paper>
        <List>
          {list.map((item: GhRepo, idx: number) => {
            return (
              <RepoItem
                key={item.id}
                author={item.owner.login}
                avatar={item.owner.avatar_url}
                repoName={item.full_name}
                repoDesc={item.description}
                repoURL={item.html_url}
                lang={item.language}
                stars={item.stargazers_count}
                forks={item.forks_count}
                openIssues={item.open_issues_count}
                hasDivider={idx !== (list.length - 1)}
              />
            );
          })}
        </List>
      </Paper>
    );
  }
  if (type === 'grid') {
    return (
      <Grid container spacing={2}>
        {list.map((item: GhRepo) => {
          return (
            <Grid item md={4} sm={6} xs={12} key={item.id}>
              <RepoCard
                author={item.owner.login}
                avatar={item.owner.avatar_url}
                repoName={item.full_name}
                repoDesc={item.description}
                repoURL={item.html_url}
                lang={item.language}
                stars={item.stargazers_count}
                forks={item.forks_count}
                openIssues={item.open_issues_count}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  }

  return null;
};

export default memo(RepoLayout);
