/**
 * @author: lencx
 * @create_at: Dec 12, 2020
 */

export type GhOwner = {
  id: number;
  login: string;
  avatar_url: string;
  type: 'Organization' | 'User';
};

export type GhRepo = {
  owner: GhOwner;
  id: number;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
};
