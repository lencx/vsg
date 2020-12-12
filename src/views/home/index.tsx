/**
 * @author: lencx
 * @create_at: Dec 12, 2020
 */

import React from 'react';
import { Grid } from '@material-ui/core';
import RepoCard from 'components/RepoCard';
import { GhRepo } from 'github/type';

import data from './data.test.json';

const repos = data.items as GhRepo[];

const HomeView = () => {
  return (
    <div className="page-container">
      <Grid container spacing={2}>
        {repos.map((item: GhRepo) => {
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
    </div>
  );
};

export default HomeView;
