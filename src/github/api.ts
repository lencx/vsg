/**
 * @author: lencx
 * @create_at: Dec 12, 2020
 */

import { Octokit } from '@octokit/core';
import dayjs from 'dayjs';

import { useGhState, useGhDispatch } from './GhStore';

export type transformFilters = {
  language?: string;
  range?: string;
};
export type ghSearchQuery = {
  q: string;
  sort: 'stars';
  order: 'desc';
};

const getStart = (type: string = 'weekly') => {
  const range: any = {
    yearly: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
    monthly: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
    weekly: dayjs().subtract(1, 'week').format('YYYY-MM-DD'),
    daily: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
  };
  return range[type];
};

const transformQuery = (filters: transformFilters) => {
  const reposDate = `created:${getStart(filters.range)}..${dayjs().format('YYYY-MM-DD')}`;
  const reposLang = filters.language !== 'all_languages' ? `language:"${filters.language}" ` : '';
  return encodeURIComponent(reposLang + reposDate);
};

export const useTrending = () => {
  const ghState: any = useGhState();
  const dispatch = useGhDispatch();

  const octokit = new Octokit({ auth: ghState?.token });

  const config = ghState?.config || {};

  const req = async (data: any = {}) => {
    dispatch({
      type: 'setData',
      payload: { trendingLoading: true, trendingList: null },
    });
    try {
      let query = { language: config['search.language'], range: config['search.range'] };
      if (data['search.language']) {
        query.language = data['search.language'];
      }
      if (data['search.range']) {
        query.range = data['search.range'];
      }

      const res = await octokit.request(
        `GET /search/repositories?q=${transformQuery(query)}`,
        {
          sort: 'stars',
          order: 'desc',
        }
      );
      if (res) {
        dispatch({
          type: 'trending',
          payload: {
            trendingList: res.data.items,
            trendingStatus: 'ok',
            trendingLoading: false,
          },
        });
      }
    } catch (e) {
      dispatch({
        type: 'trending',
        payload: {
          trendingList: [],
          trendingStatus: 'error',
          trendingLoading: false,
        },
      });
    }
  };
  return [req];
};
