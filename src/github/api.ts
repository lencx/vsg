/**
 * @author: lencx
 * @create_at: Dec 12, 2020
 */

import { Octokit } from '@octokit/core';
import dayjs from 'dayjs';

import { useGhDispatch } from './GhStore';

export {};

export type transformFilters = {
  lang?: string;
  date?: string;
};
export type ghSearchQuery = {
  q: string;
  sort: 'stars';
  order: 'desc';
};

const transformFilters = (filters: transformFilters) => {
  // let params = {} as ghSearchQuery;
  const startMoment = dayjs('2020-10-20');
  const endMoment = dayjs();
  const reposDate = `created:${startMoment.format()}..${endMoment.format()}`.replace(
    /\+/g,
    '%2B'
  );
  const reposLang = filters.lang ? `language:${filters.lang} ` : '';

  return reposLang + reposDate;
};

export const useTrending = () => {
  const data = window.localStorage.getItem('vsg') || '{}';

  const octokit = new Octokit({ auth: JSON.parse(data).token });
  const dispatch = useGhDispatch();
  const req = async (data: transformFilters) => {
    dispatch({
      type: 'setData',
      payload: { trendingLoading: true },
    });
    try {
      const res = await octokit.request(
        `GET /search/repositories?q=${transformFilters(data)}`,
        {
          sort: 'stars',
          order: 'desc',
        }
      );
      if (res) {
        dispatch({
          type: 'trending',
          payload: { trendingList: res.data.items },
        });
      }
      dispatch({
        type: 'setData',
        payload: { trendingStatus: 'ok', trendingLoading: false },
      });
    } catch (e) {
      dispatch({
        type: 'setData',
        payload: { trendingStatus: 'error', trendingLoading: false },
      });
    }
  };
  return [req];
};
// { lang: 'CSS', date: 'yearly' }
// octokit.request(`GET /search/repositories?q=created:${dayjs().startOf('year').format().replace('+', '%2B')}`, {
//   sort: 'stars',
//   order: 'desc',
// })
//   .then(res => {
//     console.log('«30» /components/App/index.tsx ~> ', res);
//   });

// ttps://api.github.com/search/repositories?q=created:2019-12-13T00:00:00%2B08:00..2020-12-13T00:00:00%2B08:00&sort=stars&order=desc
