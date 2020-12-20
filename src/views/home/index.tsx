/**
 * @author: lencx
 * @create_at: Dec 12, 2020
 */

import React, { memo, useEffect } from 'react';

import { useGhDispatch, useGhState } from 'github';
import Header from 'components/Header';
import ReopLayout from 'components/ReopLayout';

const HomeView = () => {
  const dispatch = useGhDispatch();
  const ghState = useGhState();
  const config = JSON.parse(window.localStorage.getItem('vsg') || '{}');

  useEffect(() => {
    dispatch({
      type: 'config',
      payload: {
        'search.layout': config['search.layout'] || 'all_languages',
        'search.range': config['search.range'] || 'weekly',
        'search.language': config['search.language'] || 'all_languages',
      }
    });
  }, []);


  if (!Object.keys(ghState).length) {
    return <div>Configuration loading...</div>;
  }

  return (
    <div className="page-container">
      <Header />
      <ReopLayout />
    </div>
  );
};

export default memo(HomeView);
