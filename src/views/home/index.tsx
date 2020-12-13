/**
 * @author: lencx
 * @create_at: Dec 12, 2020
 */

import React from 'react';
import { Grid } from '@material-ui/core';
import { GhRepo } from 'github/type';
import RepoCard from 'components/RepoCard';
import Header from 'components/Header';
import { useGhState } from 'github';

import data from './data.test.json';

// const repos = data.items as GhRepo[];

const HomeView = () => {
  const ghState: any = useGhState();

  let list = ghState.trendingList as GhRepo[];

  return (
    <div className="page-container">
      <Header />
      {!ghState.trendingList ? (
        <div>loading...</div>
      ) : (
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
      )}
    </div>
  );
};

export default HomeView;
